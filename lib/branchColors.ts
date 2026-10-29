import { Branch } from "./types";

export interface BranchColorConfig {
    hex: string;
    bg: string;
    text: string;
    border: string;
    borderLeft: string;
    badge: string;
    className: string;
}

export const BRANCH_COLORS: Record<Branch, BranchColorConfig> = {
    "Ümraniye": {
        hex: "#f97316", // Orange
        bg: "bg-orange-100",
        text: "text-orange-950",
        border: "border-orange-200",
        borderLeft: "border-l-orange-500",
        badge: "bg-orange-100 text-orange-800 border-orange-200",
        className: "bg-orange-100 text-orange-950 border-orange-200 border-l-orange-500",
    },
    "Küçükçekmece": {
        hex: "#a855f7", // Purple
        bg: "bg-purple-100",
        text: "text-purple-950",
        border: "border-purple-200",
        borderLeft: "border-l-purple-500",
        badge: "bg-purple-100 text-purple-800 border-purple-200",
        className: "bg-purple-100 text-purple-950 border-purple-200 border-l-purple-500",
    },
    "Fatih": {
        hex: "#ec4899", // Pink
        bg: "bg-pink-100",
        text: "text-pink-950",
        border: "border-pink-200",
        borderLeft: "border-l-pink-500",
        badge: "bg-pink-100 text-pink-800 border-pink-200",
        className: "bg-pink-100 text-pink-950 border-pink-200 border-l-pink-500",
    },
    "Eğitim": {
        hex: "#2563eb", // Blue
        bg: "bg-blue-100",
        text: "text-blue-950",
        border: "border-blue-200",
        borderLeft: "border-l-blue-600",
        badge: "bg-blue-100 text-blue-800 border-blue-200",
        className: "bg-blue-100 text-blue-950 border-blue-200 border-l-blue-600",
    },
    "Bakırköy": {
        hex: "#10b981", // Emerald
        bg: "bg-emerald-100",
        text: "text-emerald-950",
        border: "border-emerald-200",
        borderLeft: "border-l-emerald-500",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        className: "bg-emerald-100 text-emerald-950 border-emerald-200 border-l-emerald-500",
    },
    "Beyoğlu": {
        hex: "#ef4444", // Red
        bg: "bg-red-100",
        text: "text-red-950",
        border: "border-red-200",
        borderLeft: "border-l-red-500",
        badge: "bg-red-100 text-red-800 border-red-200",
        className: "bg-red-100 text-red-950 border-red-200 border-l-red-500",
    },
    "Esenler": {
        hex: "#eab308", // Yellow / Amber
        bg: "bg-amber-100",
        text: "text-amber-950",
        border: "border-amber-200",
        borderLeft: "border-l-amber-500",
        badge: "bg-amber-100 text-amber-800 border-amber-200",
        className: "bg-amber-100 text-amber-950 border-amber-200 border-l-amber-500",
    },
    "Esenyurt": {
        hex: "#06b6d4", // Cyan
        bg: "bg-cyan-100",
        text: "text-cyan-950",
        border: "border-cyan-200",
        borderLeft: "border-l-cyan-500",
        badge: "bg-cyan-100 text-cyan-800 border-cyan-200",
        className: "bg-cyan-100 text-cyan-950 border-cyan-200 border-l-cyan-500",
    },
    "Güngören": {
        hex: "#6366f1", // Indigo
        bg: "bg-indigo-100",
        text: "text-indigo-950",
        border: "border-indigo-200",
        borderLeft: "border-l-indigo-500",
        badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
        className: "bg-indigo-100 text-indigo-950 border-indigo-200 border-l-indigo-500",
    },
    "Tuzla": {
        hex: "#84cc16", // Lime
        bg: "bg-lime-100",
        text: "text-lime-950",
        border: "border-lime-200",
        borderLeft: "border-l-lime-500",
        badge: "bg-lime-100 text-lime-800 border-lime-200",
        className: "bg-lime-100 text-lime-950 border-lime-200 border-l-lime-500",
    },
    "Pendik": {
        hex: "#0d9488", // Teal
        bg: "bg-teal-100",
        text: "text-teal-950",
        border: "border-teal-200",
        borderLeft: "border-l-teal-600",
        badge: "bg-teal-100 text-teal-800 border-teal-200",
        className: "bg-teal-100 text-teal-950 border-teal-200 border-l-teal-600",
    },
    "Şişli": {
        hex: "#d946ef", // Fuchsia
        bg: "bg-fuchsia-100",
        text: "text-fuchsia-950",
        border: "border-fuchsia-200",
        borderLeft: "border-l-fuchsia-500",
        badge: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
        className: "bg-fuchsia-100 text-fuchsia-950 border-fuchsia-200 border-l-fuchsia-500",
    },
    "Diğer": {
        hex: "#64748b", // Slate
        bg: "bg-slate-200",
        text: "text-slate-950",
        border: "border-slate-300",
        borderLeft: "border-l-slate-500",
        badge: "bg-slate-200 text-slate-800 border-slate-300",
        className: "bg-slate-200 text-slate-950 border-slate-300 border-l-slate-500",
    },
    "Resmi Tatil": {
        hex: "#f43f5e", // Rose
        bg: "bg-rose-100",
        text: "text-rose-950",
        border: "border-rose-200",
        borderLeft: "border-l-rose-500",
        badge: "bg-rose-100 text-rose-800 border-rose-200",
        className: "bg-rose-100 text-rose-950 border-rose-200 border-l-rose-500",
    },
};

export const getBranchConfig = (branch: Branch | string): BranchColorConfig => {
    return BRANCH_COLORS[branch as Branch] || {
        hex: "#94a3b8",
        bg: "bg-slate-100",
        text: "text-slate-900",
        border: "border-slate-200",
        borderLeft: "border-l-slate-400",
        badge: "bg-slate-100 text-slate-800 border-slate-200",
        className: "bg-slate-100 text-slate-900 border-slate-200 border-l-slate-400",
    };
};

export const getBranchHexColor = (branch: Branch | string): string => {
    return getBranchConfig(branch).hex;
};
