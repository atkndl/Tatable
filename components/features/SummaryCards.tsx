"use client";

import { useShiftStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet, Clock, BookOpen, PiggyBank } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

export function SummaryCards() {
    const { shifts, filterYear, filterMonth, separateTraining, toggleSeparateTraining, includePlanned, toggleIncludePlanned, actualSalaries, setActualSalary } = useShiftStore();

    // Local state for actual salary input to avoid jitter
    const [actualInput, setActualInput] = useState("");

    const key = `${filterYear}-${filterMonth}`;

    useEffect(() => {
        setActualInput(actualSalaries[key]?.toString() || "");
    }, [key, actualSalaries]);

    const handleActualChange = (val: string) => {
        setActualInput(val);
        const num = parseFloat(val);
        if (!isNaN(num)) {
            setActualSalary(filterYear, filterMonth, num);
        }
    };

    const stats = useMemo(() => {
        const monthlyShifts = shifts.filter(s => {
            const d = new Date(s.date);
            // Filter by date
            if (d.getFullYear() !== filterYear || d.getMonth() !== filterMonth) return false;

            // Filter by status (planned)
            if (!includePlanned && s.status === 'planned') return false;

            return true;
        });

        const totalStats = monthlyShifts.reduce((acc, curr) => {
            acc.hours += curr.hours;
            acc.salary += curr.totalSalary;

            if (curr.branch === "Eğitim") {
                acc.trainingHours += curr.hours;
                acc.trainingSalary += curr.totalSalary;
            }
            return acc;
        }, { hours: 0, salary: 0, trainingHours: 0, trainingSalary: 0 });

        return totalStats;
    }, [shifts, filterYear, filterMonth, includePlanned]);

    const displayStats = separateTraining ? {
        hours: stats.hours - stats.trainingHours,
        salary: stats.salary - stats.trainingSalary
    } : stats;

    const actual = actualSalaries[key] || 0;
    const difference = actual - stats.salary;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. Calculated Salary */}
            <Card className="bg-emerald-50 border-emerald-200 shadow-sm transition-all duration-300 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-emerald-800">
                        Hesaplanan ({separateTraining ? "Eğitim Hariç" : "Tümü"})
                    </CardTitle>
                    <Wallet className="h-4 w-4 text-emerald-700" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-extrabold text-emerald-900 tracking-tight">
                        {formatCurrency(displayStats.salary)}
                    </div>
                    <p className="text-xs text-emerald-700/80 font-medium mt-1">Sistemdeki kayıtlara göre</p>
                </CardContent>
            </Card>

            {/* 2. Actual Salary Input */}
            <Card className="bg-white border-emerald-100 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-600">
                        Yatan Maaş
                    </CardTitle>
                    <PiggyBank className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-emerald-600">₺</span>
                        <Input
                            type="number"
                            value={actualInput}
                            onChange={(e) => handleActualChange(e.target.value)}
                            className="h-8 bg-emerald-50 border-emerald-200 text-emerald-700 font-bold"
                            placeholder="0.00"
                        />
                    </div>
                    <p className={`text-xs mt-2 ${difference >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        Fark: {difference > 0 ? '+' : ''}{formatCurrency(difference)}
                    </p>
                </CardContent>
            </Card>

            {/* 3. Total Hours */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">
                        Toplam Saat ({separateTraining ? "Eğitim Hariç" : "Tümü"})
                    </CardTitle>
                    <Clock className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-900">
                        {displayStats.hours} Saat
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Çalışılan süre</p>
                </CardContent>
            </Card>

            {/* 4. Training Toggle */}
            <Card
                className={`cursor-pointer transition-all duration-300 shadow-sm ${separateTraining ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                onClick={toggleSeparateTraining}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${separateTraining ? 'text-amber-700' : 'text-slate-500'}`}>
                        Eğitimleri Ayır
                    </CardTitle>
                    <BookOpen className={`h-4 w-4 ${separateTraining ? 'text-amber-600' : 'text-slate-400'}`} />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${separateTraining ? 'text-amber-800' : 'text-slate-400'}`}>
                        {separateTraining ? "Açık" : "Kapalı"}
                    </div>
                    {separateTraining && (
                        <p className="text-xs text-amber-600/70 mt-1">
                            +{stats.trainingHours}s / {formatCurrency(stats.trainingSalary)}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* 5. Planned Toggle */}
            <Card
                className={`cursor-pointer transition-all duration-300 shadow-sm ${includePlanned ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                onClick={toggleIncludePlanned}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${includePlanned ? 'text-indigo-700' : 'text-slate-500'}`}>
                        Planlananları Ekle
                    </CardTitle>
                    <Clock className={`h-4 w-4 ${includePlanned ? 'text-indigo-600' : 'text-slate-400'}`} />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${includePlanned ? 'text-indigo-800' : 'text-slate-400'}`}>
                        {includePlanned ? "Açık" : "Kapalı"}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                        {includePlanned ? "Planlananlar dahil ediliyor" : "Sadece tamamlananlar"}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
