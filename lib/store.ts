
import { create } from "zustand";
import { Shift, Branch, ShiftType, Level, ShiftTemplate } from "./types";
import { supabase } from "./supabase";

interface ShiftStore {
    // User State
    user: any | null;
    setUser: (user: any | null) => void;
    initialized: boolean;

    shifts: Shift[];
    filterYear: number;
    filterMonth: number; // 0-11
    itemsPerPage: number;
    separateTraining: boolean;
    includePlanned: boolean;

    actualSalaries: Record<string, number>;
    attendanceGoals: Record<string, { target: number, days: Record<number, 'present' | 'absent' | 'neutral' | 'planned'> }>;
    templates: ShiftTemplate[];

    // Actions
    fetchData: () => Promise<void>;
    addShift: (shift: Omit<Shift, "id" | "totalSalary" | "hourlyRate" | "status">) => Promise<void>;
    addShifts: (dates: string[], shiftData: Omit<Shift, "id" | "totalSalary" | "hourlyRate" | "status" | "date">) => Promise<void>;
    updateShift: (id: string, shift: Partial<Omit<Shift, "id" | "totalSalary" | "hourlyRate">>) => Promise<void>;
    removeShift: (id: string) => Promise<void>;

    setFilterYear: (year: number) => void;
    setFilterMonth: (month: number) => void;
    toggleSeparateTraining: () => void;
    toggleIncludePlanned: () => void;

    setActualSalary: (year: number, month: number, amount: number) => Promise<void>;
    setAttendanceTarget: (year: number, month: number, target: number) => Promise<void>;
    toggleAttendanceDay: (year: number, month: number, day: number) => Promise<void>;

    addTemplate: (template: Omit<ShiftTemplate, "id">) => Promise<void>;
    removeTemplate: (id: string) => Promise<void>;
}

export const useShiftStore = create<ShiftStore>((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    initialized: false,

    shifts: [],
    filterYear: new Date().getFullYear(),
    filterMonth: new Date().getMonth(),
    itemsPerPage: 10,

    separateTraining: false,
    includePlanned: false,
    actualSalaries: {},
    attendanceGoals: {},
    templates: [],

    fetchData: async () => {
        const { user } = get();
        if (!user) return;

        // 1. Fetch Shifts
        const { data: shiftsData } = await supabase.from('shifts').select('*').order('date', { ascending: false });

        const mappedShifts: Shift[] = (shiftsData?.map((s: any) => ({
            id: s.id,
            date: s.date,
            branch: s.branch,
            level: s.level,
            type: s.type,
            hours: Number(s.hours),
            hourlyRate: Number(s.hourly_rate), // Map from DB snake_case
            totalSalary: Number(s.total_salary), // Map from DB snake_case
            status: s.status || (new Date(s.date) > new Date() ? 'planned' : 'completed') // Default status logic if missing
        })) as Shift[]) || [];

        // 2. Fetch Templates
        const { data: templatesData } = await supabase.from('shift_templates').select('*');

        // 3. Fetch Actual Salaries
        const { data: salariesData } = await supabase.from('actual_salaries').select('*');
        const salariesMap: Record<string, number> = {};
        salariesData?.forEach((item: any) => {
            salariesMap[item.month_key] = Number(item.amount);
        });

        // 4. Fetch Attendance Goals
        const { data: goalsData } = await supabase.from('attendance_goals').select('*');
        const goalsMap: Record<string, any> = {};
        goalsData?.forEach((item: any) => {
            goalsMap[item.month_key] = {
                target: item.target,
                days: item.days || {}
            };
        });

        set({
            shifts: mappedShifts,
            templates: (templatesData as unknown as ShiftTemplate[]) || [],
            actualSalaries: salariesMap,
            attendanceGoals: goalsMap,
            initialized: true
        });
    },

    addShift: async (shiftData) => {
        // Wrapper for bulk add for consistency
        await get().addShifts([shiftData.date], {
            branch: shiftData.branch,
            level: shiftData.level,
            type: shiftData.type,
            hours: shiftData.hours
        });
    },

    addShifts: async (dates, shiftData) => {
        const { user } = get();
        if (!user) return;

        const hourlyRate = (shiftData.type === "Tek" ? 1213.5 : 809);
        const totalSalary = shiftData.hours * hourlyRate;

        const newShifts: Shift[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Prepare new shifts
        dates.forEach(dateStr => {
            const shiftDate = new Date(dateStr);
            shiftDate.setHours(0, 0, 0, 0);

            const isFuture = shiftDate > today;
            const status: 'completed' | 'planned' = isFuture ? 'planned' : 'completed';

            const newShift: Shift = {
                id: crypto.randomUUID(), // Temp ID
                date: dateStr,
                ...shiftData,
                hourlyRate,
                totalSalary,
                status
            };
            newShifts.push(newShift);
        });

        // 1. Optimistic Update SHIFTS
        set((state) => ({ shifts: [...newShifts, ...state.shifts] }));

        // 2. Sync ATTENDANCE GOALS (Optimistic)
        // We need to update attendance for each date
        const currentGoals = { ...get().attendanceGoals };

        newShifts.forEach(shift => {
            const d = new Date(shift.date);
            const year = d.getFullYear();
            const month = d.getMonth(); // 0-11
            const day = d.getDate();
            const key = `${year}-${month}`;

            if (!currentGoals[key]) {
                currentGoals[key] = { target: 0, days: {} };
            }

            // Sync logic: 'planned' shift -> 'planned' status (Yellow), 'completed' -> 'present' (Green)
            const attendanceStatus = shift.status === 'planned' ? 'planned' : 'present';

            currentGoals[key].days = {
                ...currentGoals[key].days,
                [day]: attendanceStatus
            };
        });

        set({ attendanceGoals: currentGoals });

        // 3. DB Updates (Parallel)
        // Insert Shifts
        const shiftsToInsert = newShifts.map(s => ({
            user_id: user.id,
            date: s.date,
            branch: s.branch,
            level: s.level,
            type: s.type,
            hours: s.hours,
            hourly_rate: s.hourlyRate,
            total_salary: s.totalSalary,
            status: s.status
        }));

        const { data, error } = await supabase.from('shifts').insert(shiftsToInsert).select();

        if (error) {
            console.error("Error adding shifts:", error);
            // In a real app we might revert, but keeping simple for now
        } else if (data) {
            // Update IDs in state with real DB IDs? 
            // Ideally yes, but bulk replace is tricky. 
            // Since we use optimistic rendering, we might just let fetchData refresh eventually or replace IDs if critical.
            // For now, let's assume fetch on next load fixes IDs or just fetchData manually?
            // Or better: map temp IDs to real IDs if possible.
            // Since we have multiple, matching them back is hard without a unique key other than UUID.
            // Let's just re-fetch data to be safe and consistent.
            await get().fetchData();
            return;
        }

        // 4. Update Attendance DB
        // We need to upsert the attendance goals we modified
        // Group by month to minimize requests
        const monthsToUpdate = new Set<string>();
        newShifts.forEach(s => {
            const d = new Date(s.date);
            monthsToUpdate.add(`${d.getFullYear()}-${d.getMonth()}`);
        });

        for (const monthKey of monthsToUpdate) {
            const [y, m] = monthKey.split('-').map(Number);
            const goal = currentGoals[monthKey];
            if (goal) {
                await supabase.from('attendance_goals').upsert({
                    user_id: user.id,
                    month_key: monthKey,
                    target: goal.target,
                    days: goal.days
                }, { onConflict: 'user_id, month_key' });
            }
        }
    },

    updateShift: async (id, shiftData) => {
        const { shifts } = get();
        const oldShift = shifts.find(s => s.id === id);
        if (!oldShift) return;

        // Optimistic
        set((state) => ({
            shifts: state.shifts.map((s) => {
                if (s.id !== id) return s;
                const type = shiftData.type || s.type;
                const hours = shiftData.hours || s.hours;
                const hourlyRate = (type === "Tek" ? 1213.5 : 809);
                const totalSalary = hours * hourlyRate;
                return { ...s, ...shiftData, hourlyRate, totalSalary };
            })
        }));

        // DB Update
        // Calculate fields manually for DB
        const type = shiftData.type || oldShift.type;
        const hours = shiftData.hours || oldShift.hours;
        const hourlyRate = (type === "Tek" ? 1213.5 : 809);
        const totalSalary = hours * hourlyRate;
        const status = shiftData.status || oldShift.status;

        const { error } = await supabase.from('shifts').update({
            ...shiftData,
            hourly_rate: hourlyRate,
            total_salary: totalSalary
        }).eq('id', id);

        if (!error) {
            // If status changed, update attendance too
            if (shiftData.status) {
                const { user, attendanceGoals } = get();
                const d = new Date(oldShift.date);
                const key = `${d.getFullYear()}-${d.getMonth()}`;
                const day = d.getDate();

                const currentGoal = attendanceGoals[key] || { target: 0, days: {} };
                // Map shift status to attendance status
                const attendanceStatus: 'planned' | 'present' = shiftData.status === 'planned' ? 'planned' : 'present';

                const newDays: Record<number, 'present' | 'absent' | 'neutral' | 'planned'> = {
                    ...(currentGoal.days as Record<number, 'present' | 'absent' | 'neutral' | 'planned'>),
                    [day]: attendanceStatus
                };

                // Update Local
                set((state) => ({
                    attendanceGoals: {
                        ...state.attendanceGoals,
                        [key]: { ...currentGoal, days: newDays }
                    }
                }));

                // Update DB
                if (user) {
                    await supabase.from('attendance_goals').upsert({
                        user_id: user.id,
                        month_key: key,
                        target: currentGoal.target,
                        days: newDays
                    }, { onConflict: 'user_id, month_key' });
                }
            }
        }
    },

    removeShift: async (id) => {
        const { shifts } = get();
        const oldShifts = [...shifts];

        set((state) => ({ shifts: state.shifts.filter((s) => s.id !== id) }));

        const { error } = await supabase.from('shifts').delete().eq('id', id);
        if (error) {
            set({ shifts: oldShifts }); // Revert
        } else {
            // Sync: Remove from attendance (set to neutral)
            const shift = oldShifts.find(s => s.id === id);
            if (shift) {
                const d = new Date(shift.date);
                const { user, attendanceGoals } = get();
                const key = `${d.getFullYear()}-${d.getMonth()}`;
                const day = d.getDate();

                const currentGoal = attendanceGoals[key];
                if (currentGoal && user) {
                    const newDays: Record<number, 'present' | 'absent' | 'neutral' | 'planned'> = {
                        ...(currentGoal.days as Record<number, 'present' | 'absent' | 'neutral' | 'planned'>)
                    };
                    delete newDays[day]; // or set to 'neutral'
                    // Deleting key might default to neutral/empty in UI, which is safer?
                    // UI uses: goal.days[day] || 'neutral'. So deleting is fine.

                    set((state) => ({
                        attendanceGoals: {
                            ...state.attendanceGoals,
                            [key]: { ...currentGoal, days: newDays }
                        }
                    }));

                    await supabase.from('attendance_goals').upsert({
                        user_id: user.id,
                        month_key: key,
                        target: currentGoal.target,
                        days: newDays
                    }, { onConflict: 'user_id, month_key' });
                }
            }
        }
    },

    setFilterYear: (year) => set({ filterYear: year }),
    setFilterMonth: (month) => set({ filterMonth: month }),
    toggleSeparateTraining: () => set((state) => ({ separateTraining: !state.separateTraining })),
    toggleIncludePlanned: () => set((state) => ({ includePlanned: !state.includePlanned })),

    setActualSalary: async (year, month, amount) => {
        const { user } = get();
        if (!user) return;

        const key = `${year}-${month}`;
        set((state) => ({
            actualSalaries: { ...state.actualSalaries, [key]: amount }
        }));

        await supabase.from('actual_salaries').upsert({
            user_id: user.id,
            month_key: key,
            amount,
        }, { onConflict: 'user_id, month_key' });
    },

    setAttendanceTarget: async (year, month, target) => {
        const { user } = get();
        if (!user) return;

        const key = `${year}-${month}`;
        const currentGoal = get().attendanceGoals[key] || { days: {} };

        set((state) => ({
            attendanceGoals: {
                ...state.attendanceGoals,
                [key]: { ...currentGoal, target }
            }
        }));

        await supabase.from('attendance_goals').upsert({
            user_id: user.id,
            month_key: key,
            target,
            days: currentGoal.days
        }, { onConflict: 'user_id, month_key' });
    },

    toggleAttendanceDay: async (year, month, day) => {
        const { user } = get();
        if (!user) return;

        const key = `${year}-${month}`;
        const currentGoal = get().attendanceGoals[key] || { target: 0, days: {} };
        const currentStatus = currentGoal.days[day] || 'neutral';

        let nextStatus: 'present' | 'absent' | 'neutral' | 'planned' = 'planned'; // Default next from neutral

        if (currentStatus === 'neutral') nextStatus = 'planned';
        else if (currentStatus === 'planned') nextStatus = 'present';
        else if (currentStatus === 'present') nextStatus = 'absent';
        else if (currentStatus === 'absent') nextStatus = 'neutral';

        const newDays = { ...currentGoal.days, [day]: nextStatus };

        set((state) => ({
            attendanceGoals: {
                ...state.attendanceGoals,
                [key]: {
                    ...currentGoal,
                    days: newDays
                }
            }
        }));

        await supabase.from('attendance_goals').upsert({
            user_id: user.id,
            month_key: key,
            target: currentGoal.target,
            days: newDays
        }, { onConflict: 'user_id, month_key' });
    },

    addTemplate: async (templateData) => {
        const { user } = get();
        if (!user) return;

        const tempId = crypto.randomUUID();
        const newTemplate = { id: tempId, ...templateData, hourlyRate: 0 }; // hourlyRate not needed for template display

        set((state) => ({ templates: [...state.templates, newTemplate] }));

        const { data } = await supabase.from('shift_templates').insert({
            user_id: user.id,
            ...templateData
        }).select().single();

        if (data) {
            set((state) => ({
                templates: state.templates.map(t => t.id === tempId ? { ...t, id: data.id } : t)
            }));
        }
    },

    removeTemplate: async (id) => {
        const { templates } = get();
        const oldTemplates = [...templates];
        set((state) => ({ templates: state.templates.filter((t) => t.id !== id) }));

        const { error } = await supabase.from('shift_templates').delete().eq('id', id);
        if (error) set({ templates: oldTemplates });
    },
}));
