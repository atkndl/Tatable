import { Shift, Branch, Level, ShiftType } from "./types";

export const OFFICIAL_HOLIDAYS_2026 = [
    { date: "2026-01-01", name: "Yılbaşı", duration: 1 },
    { date: "2026-03-19", name: "Ramazan Bayramı Arifesi", duration: 0.5 },
    { date: "2026-03-20", name: "Ramazan Bayramı 1. Gün", duration: 1 },
    { date: "2026-03-21", name: "Ramazan Bayramı 2. Gün", duration: 1 },
    { date: "2026-03-22", name: "Ramazan Bayramı 3. Gün", duration: 1 },
    { date: "2026-04-23", name: "Ulusal Egemenlik ve Çocuk Bayramı", duration: 1 },
    { date: "2026-05-01", name: "Emek ve Dayanışma Günü", duration: 1 },
    { date: "2026-05-19", name: "Atatürk'ü Anma, Gençlik ve Spor Bayramı", duration: 1 },
    { date: "2026-05-26", name: "Kurban Bayramı Arifesi", duration: 0.5 },
    { date: "2026-05-27", name: "Kurban Bayramı 1. Gün", duration: 1 },
    { date: "2026-05-28", name: "Kurban Bayramı 2. Gün", duration: 1 },
    { date: "2026-05-29", name: "Kurban Bayramı 3. Gün", duration: 1 },
    { date: "2026-05-30", name: "Kurban Bayramı 4. Gün", duration: 1 },
    { date: "2026-07-15", name: "Demokrasi ve Millî Birlik Günü", duration: 1 },
    { date: "2026-08-30", name: "Zafer Bayramı", duration: 1 },
    { date: "2026-10-28", name: "Cumhuriyet Bayramı Arifesi", duration: 0.5 },
    { date: "2026-10-29", name: "Cumhuriyet Bayramı", duration: 1 },
];

export const HOLIDAY_HOURLY_RATE = 809; // Fixed rate for holidays
export const HOLIDAY_STANDARD_HOURS = 8; // Standard shift length for holiday pay calculation

export function generateHolidayShifts(year: number): Shift[] {
    if (year !== 2026) return []; // Only 2026 logic requested for now

    return OFFICIAL_HOLIDAYS_2026.map(h => {
        const hours = h.duration * HOLIDAY_STANDARD_HOURS;
        const totalSalary = hours * HOLIDAY_HOURLY_RATE;

        return {
            id: `holiday-${h.date}`,
            date: h.date,
            branch: "Merkez" as Branch, // Placeholder
            level: "Seviye 1" as Level, // Placeholder
            type: "Resmi Tatil" as any, // Cast to any to avoid strict type error if not yet added
            hours: hours,
            hourlyRate: HOLIDAY_HOURLY_RATE,
            totalSalary: totalSalary,
            status: "completed", // Always completed/paid
            isHoliday: true // Flag to distinguish
        };
    });
}
