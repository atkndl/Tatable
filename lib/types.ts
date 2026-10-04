export type Branch = "Ümraniye" | "Küçükçekmece" | "Fatih" | "Eğitim" | "Bakırköy" | "Beyoğlu" | "Esenler" | "Esenyurt" | "Güngören" | "Tuzla" | "Pendik" | "Şişli" | "Diğer" | "Resmi Tatil";

export type Level = "Seviye 1" | "Seviye 2" | "Seviye 3" | "Unity" | "Python" | "Eğitim" | "Diğer" | "Resmi Tatil";

export type ShiftType = "Tek" | "Çift" | "Eğitim" | "Resmi Tatil";

export interface ActualSalaryRecord {
    gross?: number;
    net?: number;
    amount?: number;
}

export interface Shift {
    id: string;
    date: string; // ISO string
    branch: Branch;
    level: Level;
    hours: number;
    type: ShiftType;
    hourlyRate: number;
    totalSalary: number;
    status: 'completed' | 'planned';
    isHoliday?: boolean; // Optional flag for official holidays
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
