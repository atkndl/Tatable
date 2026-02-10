import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Shift, Branch, ShiftType, Level, ShiftTemplate } from "./types";
import { calculateSalary } from "./utils";

interface ShiftStore {
    shifts: Shift[];
    filterYear: number;
    filterMonth: number; // 0-11
    itemsPerPage: number;
    separateTraining: boolean; // Toggle for "Eğitim" separation

    // New: Actual Salary Record (Key: "YYYY-MM")
    actualSalaries: Record<string, number>;

    // New: Attendance Goals (Key: "YYYY-MM")
    // Value: { target: number, days: Record<number, 'present' | 'absent' | 'neutral'> }
    attendanceGoals: Record<string, { target: number, days: Record<number, 'present' | 'absent' | 'neutral'> }>;

    // Actions
    addShift: (shift: Omit<Shift, "id" | "totalSalary" | "hourlyRate">) => void;
    updateShift: (id: string, shift: Partial<Omit<Shift, "id" | "totalSalary" | "hourlyRate">>) => void;
    removeShift: (id: string) => void;
    setFilterYear: (year: number) => void;
    setFilterMonth: (month: number) => void;
    toggleSeparateTraining: () => void;
    setActualSalary: (year: number, month: number, amount: number) => void;
    setAttendanceTarget: (year: number, month: number, target: number) => void;
    toggleAttendanceDay: (year: number, month: number, day: number) => void;

    // Shift Templates
    templates: ShiftTemplate[];
    addTemplate: (template: Omit<ShiftTemplate, "id">) => void;
    removeTemplate: (id: string) => void;
}

export const useShiftStore = create<ShiftStore>()(
    persist(
        (set) => ({
            shifts: [],
            filterYear: new Date().getFullYear(),
            filterMonth: new Date().getMonth(),
            itemsPerPage: 10,
            separateTraining: false,
            actualSalaries: {},
            attendanceGoals: {},
            templates: [],

            addShift: (shiftData) =>
                set((state) => {
                    const hourlyRate = (shiftData.type === "Tek" ? 1213.5 : 809);
                    const totalSalary = shiftData.hours * hourlyRate;

                    const newShift: Shift = {
                        id: crypto.randomUUID(),
                        ...shiftData,
                        hourlyRate,
                        totalSalary
                    };

                    return { shifts: [newShift, ...state.shifts] };
                }),

            updateShift: (id, shiftData) => set((state) => ({
                shifts: state.shifts.map((s) => {
                    if (s.id !== id) return s;

                    // Recalculate if critical fields change
                    const type = shiftData.type || s.type;
                    const hours = shiftData.hours || s.hours;
                    const hourlyRate = (type === "Tek" ? 1213.5 : 809);
                    const totalSalary = hours * hourlyRate;

                    return { ...s, ...shiftData, hourlyRate, totalSalary };
                })
            })),

            removeShift: (id) =>
                set((state) => ({
                    shifts: state.shifts.filter((s) => s.id !== id),
                })),

            setFilterYear: (year) => set({ filterYear: year }),
            setFilterMonth: (month) => set({ filterMonth: month }),
            toggleSeparateTraining: () => set((state) => ({ separateTraining: !state.separateTraining })),

            setActualSalary: (year, month, amount) => set((state) => ({
                actualSalaries: {
                    ...state.actualSalaries,
                    [`${year}-${month}`]: amount
                }
            })),

            setAttendanceTarget: (year, month, target) => set((state) => {
                const key = `${year}-${month}`;
                const current = state.attendanceGoals[key] || { days: {} };
                return {
                    attendanceGoals: {
                        ...state.attendanceGoals,
                        [key]: { ...current, target }
                    }
                };
            }),

            toggleAttendanceDay: (year, month, dayIndex) => set((state) => {
                const key = `${year}-${month}`;
                const currentGoal = state.attendanceGoals[key] || { target: 0, days: {} };
                const currentStatus = currentGoal.days[dayIndex] || 'neutral';

                let nextStatus: 'present' | 'absent' | 'neutral' = 'present';
                if (currentStatus === 'present') nextStatus = 'absent';
                else if (currentStatus === 'absent') nextStatus = 'neutral';

                return {
                    attendanceGoals: {
                        ...state.attendanceGoals,
                        [key]: {
                            ...currentGoal,
                            days: {
                                ...currentGoal.days,
                                [dayIndex]: nextStatus
                            }
                        }
                    }
                };
            }),

            // Template Actions
            addTemplate: (templateData) =>
                set((state) => ({
                    templates: [
                        ...state.templates,
                        { id: crypto.randomUUID(), ...templateData }
                    ]
                })),
            removeTemplate: (id) =>
                set((state) => ({
                    templates: state.templates.filter((t) => t.id !== id)
                })),
        }),
        {
            name: "shift-storage",
        }
    )
);
