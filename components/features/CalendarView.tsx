
"use client";

import { useShiftStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { Branch, Shift } from "@/lib/types";
import { getBranchConfig } from "@/lib/branchColors";

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
        const dateStr = s.date.includes('T') ? s.date : s.date + 'T12:00:00';
        const d = new Date(dateStr);
        return d.getFullYear() === filterYear && d.getMonth() === filterMonth;
    });

    filteredShifts.forEach(shift => {
        const dateStr = shift.date.includes('T') ? shift.date : shift.date + 'T12:00:00';
        const day = new Date(dateStr).getDate();
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
                                    const branchConfig = getBranchConfig(shift.branch);

                                    return (
                                        <div
                                            key={shift.id}
                                            className={`
                                                relative group
                                                text-[10px] p-1.5 rounded-md border leading-tight shadow-xs transition-all duration-200
                                                ${isPlanned
                                                    ? "bg-slate-50/90 border-slate-300 text-slate-400 border-dashed border-l-4 border-l-slate-300 hover:border-slate-400 hover:bg-white"
                                                    : `${branchConfig.className} border-l-4 shadow-sm hover:brightness-95`
                                                }
                                            `}
                                        >
                                            <div className="font-bold truncate flex items-center justify-between gap-1">
                                                <span className={`truncate ${isPlanned ? "text-slate-500 font-semibold" : "font-extrabold"}`}>
                                                    {shift.branch}
                                                </span>

                                                {/* Toggle / Confirm Button */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleStatus(shift);
                                                    }}
                                                    title={isPlanned ? "İşi onayla (tamamlandı olarak işaretle)" : "Planlandı durumuna geri al"}
                                                    className={`p-0.5 rounded-full transition-all shrink-0 cursor-pointer ${
                                                        isPlanned
                                                            ? "text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 hover:scale-125"
                                                            : "text-emerald-700 hover:bg-black/10 hover:text-emerald-900"
                                                    }`}
                                                >
                                                    {isPlanned ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="12" r="9" />
                                                        </svg>
                                                    ) : (
                                                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </button>
                                            </div>
                                            <div className={`flex justify-between items-center text-[9px] mt-0.5 ${isPlanned ? "text-slate-400" : "opacity-90 font-medium"}`}>
                                                <span className="truncate">{shift.level} • {shift.type}</span>
                                                <span className="font-mono font-bold shrink-0 ml-1">{shift.hours}s</span>
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
