
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

    const updateShift = useShiftStore((state) => state.updateShift);

    // 1. Calculate days in month
    const daysInMonth = new Date(filterYear, filterMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(filterYear, filterMonth, 1).getDay(); // 0 = Sunday
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

    const handleToggleStatus = async (shift: Shift) => {
        const newStatus = shift.status === 'planned' ? 'completed' : 'planned';
        await updateShift(shift.id, { status: newStatus });
    };

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
                            new Date().getMonth() === new Date().getMonth() &&
                            new Date().getFullYear() === new Date().getFullYear();

                        // Highlight Today: Red Soft Border as requested
                        const todayStyle = isToday
                            ? 'ring-2 ring-red-200 bg-red-50/20'
                            : 'bg-white hover:bg-slate-50';

                        return (
                            <div key={day} className={`min-h-[100px] p-2 flex flex-col gap-1 transition-colors ${todayStyle}`}>
                                <div className={`text-xs font-semibold mb-1 flex justify-between ${isToday ? 'text-red-500' : 'text-slate-400'}`}>
                                    <span>{day}</span>
                                    {isToday && <span className="text-[10px] uppercase font-bold text-red-400">Bugün</span>}
                                </div>

                                {dayShifts.map(shift => {
                                    const isPlanned = shift.status === 'planned';
                                    const baseColor = getBranchColor(shift.branch);
                                    // Make planned shifts lighter/different
                                    const styleClass = isPlanned
                                        ? "bg-slate-50 border-slate-200 text-slate-400 border-dashed" // Planned Style
                                        : baseColor; // Completed Style

                                    return (
                                        <div
                                            key={shift.id}
                                            className={`
                                                relative group
                                                text-[10px] p-1.5 rounded border border-l-4
                                                flex flex-col gap-0.5 leading-tight shadow-sm
                                                ${styleClass}
                                            `}
                                        >
                                            <div className="font-bold truncate flex items-center justify-between">
                                                {shift.branch}
                                                {isPlanned && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleToggleStatus(shift);
                                                        }}
                                                        title="Tamamlandı olarak işaretle"
                                                        className="ml-1 p-0.5 rounded-full hover:bg-emerald-100 text-slate-300 hover:text-emerald-600 transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex justify-between opacity-90">
                                                <span>{shift.level} • {shift.type}</span>
                                                <span className="font-mono">{shift.hours}s</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
