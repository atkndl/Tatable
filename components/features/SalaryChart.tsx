"use client";

import { useShiftStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { useMemo, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SalaryChart() {
    const { shifts, filterYear, filterMonth, includePlanned } = useShiftStore();
    const [view, setView] = useState<"monthly" | "weekly" | "daily">("monthly");

    const data = useMemo(() => {
        if (view === "monthly") {
            // Monthly view logic (Existing)
            const monthlyData = Array.from({ length: 12 }, (_, i) => ({
                name: new Date(filterYear, i).toLocaleString('tr-TR', { month: 'short' }),
                salary: 0,
                hours: 0,
            }));

            shifts.forEach(shift => {
                const d = new Date(shift.date);
                if (d.getFullYear() === filterYear) {
                    if (!includePlanned && shift.status === 'planned') return;
                    monthlyData[d.getMonth()].salary += shift.totalSalary;
                    monthlyData[d.getMonth()].hours += shift.hours;
                }
            });
            return monthlyData;

        } else if (view === "weekly") {
            // Weekly view logic
            const weeklyData = [
                { name: "Hafta 1", salary: 0, hours: 0 },
                { name: "Hafta 2", salary: 0, hours: 0 },
                { name: "Hafta 3", salary: 0, hours: 0 },
                { name: "Hafta 4", salary: 0, hours: 0 },
                { name: "Hafta 5", salary: 0, hours: 0 },
            ];

            shifts.forEach(shift => {
                const d = new Date(shift.date);
                if (d.getFullYear() === filterYear && d.getMonth() === filterMonth) {
                    if (!includePlanned && shift.status === 'planned') return;

                    const day = d.getDate();
                    const weekIndex = Math.min(Math.floor((day - 1) / 7), 4);
                    weeklyData[weekIndex].salary += shift.totalSalary;
                    weeklyData[weekIndex].hours += shift.hours;
                }
            });
            return weeklyData.filter(w => w.salary > 0 || w.name === "Hafta 1");
        } else {
            // Daily view logic
            const daysInMonth = new Date(filterYear, filterMonth + 1, 0).getDate();
            const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
                name: (i + 1).toString(),
                salary: 0,
                hours: 0,
                fullDate: new Date(filterYear, filterMonth, i + 1).toLocaleDateString('tr-TR')
            }));

            shifts.forEach(shift => {
                const d = new Date(shift.date);
                if (d.getFullYear() === filterYear && d.getMonth() === filterMonth) {
                    if (!includePlanned && shift.status === 'planned') return;

                    dailyData[d.getDate() - 1].salary += shift.totalSalary;
                    dailyData[d.getDate() - 1].hours += shift.hours;
                }
            });

            return dailyData;
        }
    }, [shifts, filterYear, filterMonth, view, includePlanned]);

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg">
                    <p className="text-slate-900 font-medium mb-1">{label}</p>
                    <p className="text-indigo-600 text-sm font-bold">
                        {formatCurrency(payload[0].value)}
                    </p>
                    <p className="text-slate-500 text-xs">
                        {payload[0].payload.hours} Saat
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="col-span-1 border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {view === "monthly" ? `Yıllık Gelir (${filterYear})` : `Aylık Dağılım (${filterMonth + 1}/${filterYear})`}
                </CardTitle>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-md border border-slate-200">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 px-2 text-xs ${view === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        onClick={() => setView('monthly')}
                    >
                        Yıllık
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 px-2 text-xs ${view === 'weekly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        onClick={() => setView('weekly')}
                    >
                        Haftalık
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 px-2 text-xs ${view === 'daily' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        onClick={() => setView('daily')}
                    >
                        Günlük
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `₺${value}`}
                                width={50}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                            <Bar dataKey="salary" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.salary > 0 ? '#4f46e5' : '#cbd5e1'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
