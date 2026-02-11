export type Branch = "Ümraniye" | "Küçükçekmece" | "Fatih" | "Eğitim" | "Bakırköy" | "Beyoğlu" | "Esenler" | "Esenyurt" | "Güngören" | "Tuzla";

export type Level = "Seviye 1" | "Seviye 2" | "Seviye 3" | "C#" | "Python" | "Eğitim";

export type ShiftType = "Tek" | "Çift";

export interface Shift {
    id: string;
    date: string; // ISO string
    branch: Branch;
    level: Level;
    hours: number;
    type: ShiftType;
    hourlyRate: number;
    totalSalary: number;
}

export interface MonthlyStats {
    month: string; // YYYY-MM
    totalHours: number;
    totalSalary: number;
    trainingHours: number; // For "Eğitim" branch
    trainingSalary: number; // For "Eğitim" branch
}

export interface ShiftTemplate {
    id: string;
    name: string;
    branch: Branch;
    level: Level;
    type: ShiftType;
    hours: number;
}
