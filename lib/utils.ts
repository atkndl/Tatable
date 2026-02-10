import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
    }).format(amount);
}

export const HOURLY_RATES = {
    Tek: 1213.5,
    Çift: 809,
};

export const calculateSalary = (hours: number, type: "Tek" | "Çift") => {
    return hours * HOURLY_RATES[type];
};
