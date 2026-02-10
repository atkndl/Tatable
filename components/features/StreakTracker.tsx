"use client";

import { useShiftStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarCheck, ChevronRight } from "lucide-react";
import { useState } from "react";

export function StreakTracker() {
    const { filterYear, filterMonth, attendanceGoals, setAttendanceTarget, toggleAttendanceDay } = useShiftStore();

    const key = `${filterYear}-${filterMonth}`;
    const goal = attendanceGoals[key] || { target: 0, days: {} };

    const [isEditingTarget, setIsEditingTarget] = useState(false);
    const [tempTarget, setTempTarget] = useState(goal.target.toString());

    const handleTargetSave = () => {
        const num = parseInt(tempTarget);
        if (!isNaN(num) && num >= 0 && num <= 31) {
            setAttendanceTarget(filterYear, filterMonth, num);
            setIsEditingTarget(false);
        }
    };

    const getDayStatusColor = (index: number) => {
        const status = goal.days[index] || 'neutral';
        if (status === 'present') return 'bg-emerald-500 hover:bg-emerald-600 border-emerald-400 text-white';
        if (status === 'absent') return 'bg-red-500 hover:bg-red-600 border-red-400 text-white';
        return 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 font-medium'; // improved contrast for neutral
    };

    const presentCount = Object.values(goal.days).filter(s => s === 'present').length;
    const progress = goal.target > 0 ? (presentCount / goal.target) * 100 : 0;

    return (
        <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2 text-slate-900 text-sm font-medium">
                    <CalendarCheck className="w-5 h-5 text-indigo-600" />
                    Devamlılık Takibi ({presentCount}/{goal.target})
                </CardTitle>
                <div className="flex items-center gap-2">
                    {isEditingTarget ? (
                        <div className="flex items-center gap-1">
                            <Input
                                type="number"
                                value={tempTarget}
                                onChange={(e) => setTempTarget(e.target.value)}
                                className="h-7 w-16 bg-white border-slate-200 text-center"
                                min="0" max="31"
                            />
                            <Button size="sm" onClick={handleTargetSave} className="h-7 px-2 bg-indigo-600 hover:bg-indigo-700 text-white">OK</Button>
                        </div>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setIsEditingTarget(true); setTempTarget(goal.target.toString()); }}
                            className="h-7 text-xs text-slate-500 hover:text-indigo-600"
                        >
                            Hedef: {goal.target} Gün
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full mb-4 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>

                {/* Grid - Single Line for 31 Days */}
                <div className="flex w-full gap-1 justify-between items-center">
                    {Array.from({ length: 31 }).map((_, i) => {
                        const dayNum = i + 1;
                        // Only show up to the configured target? Or show all 31 but highlight target range?
                        // User requested 31 days to fit. Let's show all 31 days but visually distinct if needed.
                        // Actually, usually user sets target like 20, but maybe they want to track 30 days of the month.
                        // Let's ensure ALL 31 days are rendered fittingly.

                        return (
                            <button
                                key={dayNum}
                                onClick={() => toggleAttendanceDay(filterYear, filterMonth, dayNum)}
                                className={`
                   flex-1 aspect-square flex items-center justify-center rounded-md text-xs transition-all duration-200
                   ${getDayStatusColor(dayNum)}
                   min-w-[0] // allow shrinking
                `}
                                title={`Gün ${dayNum}`}
                            >
                                {dayNum}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 flex gap-4 text-xs text-slate-500 justify-end">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Geldim</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Gelmedim</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200" /> Bekliyor</div>
                </div>
            </CardContent>
        </Card>
    );
}
