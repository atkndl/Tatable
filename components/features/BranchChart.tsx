"use client";

import { useShiftStore } from "@/lib/store";
import { useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as PieChartIcon } from "lucide-react";

export function BranchChart() {
    const { shifts, filterYear, filterMonth, includePlanned } = useShiftStore();

    const data = useMemo(() => {
        const branchStats: Record<string, number> = {};

        shifts.forEach(shift => {
            const d = new Date(shift.date);
            // Time Filter
            if (d.getFullYear() === filterYear && d.getMonth() === filterMonth) {
                // Status Filter
                if (!includePlanned && shift.status === 'planned') return;

                branchStats[shift.branch] = (branchStats[shift.branch] || 0) + shift.hours;
            }
        });

        return Object.entries(branchStats).map(([name, value]) => ({ name, value }));
    }, [shifts, filterYear, filterMonth, includePlanned]);

    const COLORS = [
        '#f97316', // Ümraniye (Orange)
        '#db2777', // Fatih (Pink)
        '#bc16f9ff', // Küçükçekmece (Purple)
        '#0b4a8f',  // Eğitim (Dark Blue)
        '#10b981', // Bakırköy (Emerald)
        '#ef4444', // Beyoğlu (Red)
        '#eab308', // Esenler (Yellow)
        '#06b6d4', // Esenyurt (Cyan)
        '#6366f1', // Güngören (Indigo)
        '#84cc16', // Tuzla (Lime)
    ];

    if (data.length === 0) {
        return null;
    }

    return (
        <Card className="col-span-1 border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-indigo-800 text-sm font-bold">
                    <PieChartIcon className="w-4 h-4" />
                    Şube Dağılımı (Saat)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#1e293b', padding: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#1e293b', fontWeight: '500' }}
                                formatter={(value: any) => [`${value} Saat`, 'Süre']}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ fontSize: '12px', color: '#475569', paddingTop: '20px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
