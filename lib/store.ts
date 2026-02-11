
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

    actualSalaries: Record<string, number>;
    attendanceGoals: Record<string, { target: number, days: Record<number, 'present' | 'absent' | 'neutral' | 'planned'> }>;
    templates: ShiftTemplate[];

    // Actions
    fetchData: () => Promise<void>;
    addShift: (shift: Omit<Shift, "id" | "totalSalary" | "hourlyRate">) => Promise<void>;
    updateShift: (id: string, shift: Partial<Omit<Shift, "id" | "totalSalary" | "hourlyRate">>) => Promise<void>;
    removeShift: (id: string) => Promise<void>;

    setFilterYear: (year: number) => void;
    setFilterMonth: (month: number) => void;
    toggleSeparateTraining: () => void;

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
            totalSalary: Number(s.total_salary) // Map from DB snake_case
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
        const { user } = get();
        if (!user) return;

        const hourlyRate = (shiftData.type === "Tek" ? 1213.5 : 809);
        const totalSalary = shiftData.hours * hourlyRate;
        const tempId = crypto.randomUUID();

        // Optimistic Update
        const newShift: Shift = {
            id: tempId,
            ...shiftData,
            hourlyRate,
            totalSalary
        };
        set((state) => ({ shifts: [newShift, ...state.shifts] }));

        // DB Update
        const { data, error } = await supabase.from('shifts').insert({
            user_id: user.id,
            date: shiftData.date,
            branch: shiftData.branch,
            level: shiftData.level,
            type: shiftData.type,
            hours: shiftData.hours,
            hourly_rate: hourlyRate,
            total_salary: totalSalary
        }).select().single();

        if (data) {
            // Replace temp ID with real ID
            set((state) => ({
                shifts: state.shifts.map(s => s.id === tempId ? { ...s, id: data.id } : s)
            }));
        } else if (error) {
            console.error(error);
            // Revert on error
            set((state) => ({ shifts: state.shifts.filter(s => s.id !== tempId) }));
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

        await supabase.from('shifts').update({
            ...shiftData,
            hourly_rate: hourlyRate,
            total_salary: totalSalary
        }).eq('id', id);
    },

    removeShift: async (id) => {
        const { shifts } = get();
        const oldShifts = [...shifts];

        set((state) => ({ shifts: state.shifts.filter((s) => s.id !== id) }));

        const { error } = await supabase.from('shifts').delete().eq('id', id);
        if (error) {
            set({ shifts: oldShifts }); // Revert
        }
    },

    setFilterYear: (year) => set({ filterYear: year }),
    setFilterMonth: (month) => set({ filterMonth: month }),
    toggleSeparateTraining: () => set((state) => ({ separateTraining: !state.separateTraining })),

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
