
"use client";

import { useShiftStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { Branch, Shift } from "@/lib/types";

// Helper to get soft background colors for branches
const getBranchColor = (branch: Branch) => {
    switch (branch) {
        case "Ümraniye": return "bg-orange-100 text-orange-700 border-orange-200";
        case "Fatih": return "bg-pink-100 text-pink-700 border-pink-200";
        case "Küçükçekmece": return "bg-purple-100 text-purple-700 border-purple-200";
        case "Eğitim": return "bg-blue-100 text-blue-700 border-blue-200";
        case "Bakırköy": return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "Beyoğlu": return "bg-red-100 text-red-700 border-red-200";
        case "Esenler": return "bg-yellow-100 text-yellow-700 border-yellow-200";
        case "Esenyurt": return "bg-cyan-100 text-cyan-700 border-cyan-200";
        case "Güngören": return "bg-indigo-100 text-indigo-700 border-indigo-200";
        case "Tuzla": return "bg-lime-100 text-lime-700 border-lime-200";
        default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
};

export function CalendarView() {
    const { shifts, filterYear, filterMonth } = useShiftStore();

    // 1. Calculate days in month
    const daysInMonth = new Date(filterYear, filterMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(filterYear, filterMonth, 1).getDay(); // 0 = Sunday

    // Adjust 0 (Sunday) to be 7 for Monday-start calendars if needed, 
    // but usually standard grids start Sunday. Let's start Monday (1) as is common in TR.
    // JS: 0=Sun, 1=Mon...6=Sat.
    // TR Calendar: Mon=1, ..., Sun=7.
    const startingBlankDays = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanksArray = Array.from({ length: startingBlankDays }, (_, i) => i);

    const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

    // 2. Map shifts to days
    const shiftsByDay: Record<number, Shift[]> = {};
    const filteredShifts = shifts.filter(s => {
        const d = new Date(s.date);
        return d.getFullYear() === filterYear && d.getMonth() === filterMonth;
    });

    filteredShifts.forEach(shift => {
        const day = new Date(shift.date).getDate();
        if (!shiftsByDay[day]) shiftsByDay[day] = [];
        shiftsByDay[day].push(shift);
    });

    return (
        <Card className="bg-white border-slate-200 shadow-sm mt-8">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-slate-900 text-lg font-bold">
                    <CalendarDays className="w-5 h-5 text-indigo-600" />
                    Takvim Görünümü
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 mb-2">
                    {weekDays.map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 bg-slate-100 gap-px border border-slate-200 rounded-lg overflow-hidden">
                    {/* Blanks */}
                    {blanksArray.map(blank => (
                        <div key={`blank-${blank}`} className="bg-slate-50 min-h-[100px]" />
                    ))}

                    {/* Days */}
                    {daysArray.map(day => {
                        const dayShifts = shiftsByDay[day] || [];
                        const isToday =
                            new Date().getDate() === day &&
                            new Date().getMonth() === filterMonth &&
                            new Date().getFullYear() === filterYear;

                        return (
                            <div key={day} className={`bg-white min-h-[100px] p-2 flex flex-col gap-1 transition-colors hover:bg-slate-50 ${isToday ? 'bg-indigo-50/30' : ''}`}>
                                <div className={`text-xs font-semibold mb-1 ${isToday ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    {day}
                                </div>

                                {dayShifts.map(shift => (
                                    <div
                                        key={shift.id}
                                        className={`
                                            text-[10px] p-1.5 rounded border border-l-4
                                            flex flex-col gap-0.5 leading-tight shadow-sm
                                            ${getBranchColor(shift.branch)}
                                        `}
                                    >
                                        <div className="font-bold truncate">{shift.branch}</div>
                                        <div className="flex justify-between opacity-80">
                                            <span>{shift.level} • {shift.type}</span>
                                            <span className="font-mono">{shift.hours}s</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
