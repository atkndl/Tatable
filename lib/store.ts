import { create } from "zustand";
import { Shift, Branch, ShiftType, Level, ShiftTemplate, ActualSalaryRecord } from "./types";
import { supabase } from "./supabase";
import { generateHolidayShifts } from "./holidays";

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
    includeOfficialHolidays: boolean; // New toggle

    actualSalaries: Record<string, ActualSalaryRecord>;
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
    toggleIncludeOfficialHolidays: () => void; // New action

    setActualSalary: (year: number, month: number, values: { gross?: number, net?: number }) => Promise<void>;
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
    includePlanned: true,
    includeOfficialHolidays: false, // Default false
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
            hourlyRate: Number(s.hourly_rate) || 809, // Map from DB snake_case
            totalSalary: Number(s.total_salary) || (Number(s.hours) * (Number(s.hourly_rate) || 809)), // Fallback calculation if DB has 0 or null
            status: s.status || (new Date(s.date) > new Date() ? 'planned' : 'completed') // Default status logic if missing
        })) as Shift[]) || [];

        // 2. Fetch Templates
        const { data: templatesData } = await supabase.from('shift_templates').select('*');

        // 3. Fetch Actual Salaries
        const { data: salariesData } = await supabase.from('actual_salaries').select('*');
        const salariesMap: Record<string, ActualSalaryRecord> = {};

        let localSalaries: Record<string, ActualSalaryRecord> = {};
        if (typeof window !== 'undefined') {
            try {
                const cached = localStorage.getItem('tatable_actual_salaries');
                if (cached) localSalaries = JSON.parse(cached);
            } catch (e) {}
        }

        salariesData?.forEach((item: any) => {
            const dbGross = item.gross_amount !== undefined && item.gross_amount !== null ? Number(item.gross_amount) : undefined;
            const dbNet = item.net_amount !== undefined && item.net_amount !== null ? Number(item.net_amount) : (item.amount !== undefined && item.amount !== null ? Number(item.amount) : undefined);
            const local = localSalaries[item.month_key] || {};

            salariesMap[item.month_key] = {
                gross: dbGross ?? local.gross,
                net: dbNet ?? local.net,
                amount: Number(item.amount ?? dbNet ?? dbGross ?? 0)
            };
        });

        // Merge local data that might not be synced yet
        Object.entries(localSalaries).forEach(([k, v]) => {
            if (!salariesMap[k]) {
                salariesMap[k] = v;
            }
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

        const hourlyRate = 809;
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

            const attendanceStatus = shift.status === 'planned' ? 'planned' : 'present';

            currentGoals[key].days = {
                ...currentGoals[key].days,
                [day]: attendanceStatus
            };
        });

        set({ attendanceGoals: currentGoals });

        // 3. DB Updates (Parallel)
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
        } else if (data) {
            await get().fetchData();
            return;
        }

        // 4. Update Attendance DB
        const monthsToUpdate = new Set<string>();
        newShifts.forEach(s => {
            const d = new Date(s.date);
            monthsToUpdate.add(`${d.getFullYear()}-${d.getMonth()}`);
        });

        for (const monthKey of monthsToUpdate) {
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
                const hours = shiftData.hours || s.hours;
                const hourlyRate = 809;
                const totalSalary = hours * hourlyRate;
                return { ...s, ...shiftData, hourlyRate, totalSalary };
            })
        }));

        // DB Update
        const hours = shiftData.hours || oldShift.hours;
        const hourlyRate = 809;
        const totalSalary = hours * hourlyRate;

        const { error } = await supabase.from('shifts').update({
            ...shiftData,
            hourly_rate: hourlyRate,
            total_salary: totalSalary
        }).eq('id', id);

        if (!error) {
            if (shiftData.status) {
                const { user, attendanceGoals } = get();
                const d = new Date(oldShift.date);
                const key = `${d.getFullYear()}-${d.getMonth()}`;
                const day = d.getDate();

                const currentGoal = attendanceGoals[key] || { target: 0, days: {} };
                const attendanceStatus: 'planned' | 'present' = shiftData.status === 'planned' ? 'planned' : 'present';

                const newDays: Record<number, 'present' | 'absent' | 'neutral' | 'planned'> = {
                    ...(currentGoal.days as Record<number, 'present' | 'absent' | 'neutral' | 'planned'>),
                    [day]: attendanceStatus
                };

                set((state) => ({
                    attendanceGoals: {
                        ...state.attendanceGoals,
                        [key]: { ...currentGoal, days: newDays }
                    }
                }));

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
                    delete newDays[day];

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
    toggleIncludeOfficialHolidays: () => set((state) => ({ includeOfficialHolidays: !state.includeOfficialHolidays })),

    setActualSalary: async (year, month, values) => {
        const { user } = get();
        const key = `${year}-${month}`;

        const existing = get().actualSalaries[key] || {};
        const updated: ActualSalaryRecord = {
            gross: values.gross,
            net: values.net,
            amount: values.net ?? values.gross ?? existing.amount ?? 0
        };

        const newSalaries = { ...get().actualSalaries, [key]: updated };
        set({ actualSalaries: newSalaries });

        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('tatable_actual_salaries', JSON.stringify(newSalaries));
            } catch (e) {}
        }

        if (!user) return;

        try {
            const { error } = await supabase.from('actual_salaries').upsert({
                user_id: user.id,
                month_key: key,
                amount: updated.net ?? updated.gross ?? 0,
                gross_amount: updated.gross ?? null,
                net_amount: updated.net ?? null,
            }, { onConflict: 'user_id, month_key' });

            if (error) {
                // Fallback to legacy amount column if gross_amount/net_amount are not yet present in SQL
                await supabase.from('actual_salaries').upsert({
                    user_id: user.id,
                    month_key: key,
                    amount: updated.net ?? updated.gross ?? 0,
                }, { onConflict: 'user_id, month_key' });
            }
        } catch (err) {
            console.error("Error saving actual salary:", err);
        }
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

        let nextStatus: 'present' | 'absent' | 'neutral' | 'planned' = 'planned';

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
        const newTemplate = { id: tempId, ...templateData, hourlyRate: 0 };

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
