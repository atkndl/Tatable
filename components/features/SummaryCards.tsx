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

    const buckets = useMemo(() => {
        const monthlyShifts = shifts.filter(s => {
            const d = new Date(s.date);
            return d.getFullYear() === filterYear && d.getMonth() === filterMonth;
        });

        return monthlyShifts.reduce((acc, curr) => {
            const isTraining = curr.branch === "Eğitim";
            const isPlanned = curr.status === 'planned';

            if (isTraining) {
                if (isPlanned) {
                    acc.trainingPlannedHours += curr.hours;
                    acc.trainingPlannedSalary += curr.totalSalary;
                } else {
                    acc.trainingCompletedHours += curr.hours;
                    acc.trainingCompletedSalary += curr.totalSalary;
                }
            } else {
                if (isPlanned) {
                    acc.normalPlannedHours += curr.hours;
                    acc.normalPlannedSalary += curr.totalSalary;
                } else {
                    acc.normalCompletedHours += curr.hours;
                    acc.normalCompletedSalary += curr.totalSalary;
                }
            }
            return acc;
        }, {
            normalCompletedHours: 0, normalCompletedSalary: 0,
            normalPlannedHours: 0, normalPlannedSalary: 0,
            trainingCompletedHours: 0, trainingCompletedSalary: 0,
            trainingPlannedHours: 0, trainingPlannedSalary: 0
        });
    }, [shifts, filterYear, filterMonth]);

    const displayStats = useMemo(() => {
        let hours = buckets.normalCompletedHours;
        let salary = buckets.normalCompletedSalary;

        if (!separateTraining) {
            hours += buckets.trainingCompletedHours;
            salary += buckets.trainingCompletedSalary;
        }

        if (includePlanned) {
            hours += buckets.normalPlannedHours;
            salary += buckets.normalPlannedSalary;

            if (!separateTraining) {
                hours += buckets.trainingPlannedHours;
                salary += buckets.trainingPlannedSalary;
            }
        }

        return { hours, salary };
    }, [buckets, separateTraining, includePlanned]);

    // Derived values for labels
    const trainingTotalLimit = includePlanned
        ? buckets.trainingCompletedHours + buckets.trainingPlannedHours
        : buckets.trainingCompletedHours;

    const trainingSalaryLimit = includePlanned
        ? buckets.trainingCompletedSalary + buckets.trainingPlannedSalary
        : buckets.trainingCompletedSalary;

    const plannedTotalAddon = separateTraining
        ? buckets.normalPlannedHours
        : buckets.normalPlannedHours + buckets.trainingPlannedHours;

    const plannedSalaryAddon = separateTraining
        ? buckets.normalPlannedSalary
        : buckets.normalPlannedSalary + buckets.trainingPlannedSalary;


    const actual = actualSalaries[key] || 0;
    const difference = actual - displayStats.salary;

    // Compact Card Component for Toggles
    const CompactToggleCard = ({
        active,
        onClick,
        title,
        icon: Icon,
        activeColorClass,
        activeTextClass,
        activeBorderClass,
        subtitle
    }: any) => (
        <Card
            className={`cursor-pointer transition-all duration-300 shadow-sm flex flex-col justify-center px-4 py-3 h-full border ${active ? activeBorderClass + ' ' + activeColorClass : 'bg-white border-slate-200 hover:bg-slate-50'}`}
            onClick={onClick}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${active ? activeTextClass : 'text-slate-400'}`} />
                    <span className={`text-xs font-semibold ${active ? activeTextClass : 'text-slate-500'}`}>{title}</span>
                </div>
                <div className={`text-sm font-bold ${active ? activeTextClass : 'text-slate-300'}`}>
                    {active ? "AÇIK" : "KAPALI"}
                </div>
            </div>
            {active && subtitle && (
                <div className={`text-[10px] font-medium mt-1 ${activeTextClass} opacity-80`}>
                    {subtitle}
                </div>
            )}
        </Card>
    );

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. Calculated Salary */}
            <Card className="bg-emerald-50 border-emerald-200 shadow-sm transition-all duration-300 hover:shadow-md h-[140px] flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                    <CardTitle className="text-sm font-bold text-emerald-800">
                        Hesaplanan
                    </CardTitle>
                    <Wallet className="h-4 w-4 text-emerald-700" />
                </CardHeader>
                <CardContent className="pb-4">
                    <div className="text-2xl font-extrabold text-emerald-900 tracking-tight">
                        {formatCurrency(displayStats.salary)}
                    </div>
                    <p className="text-xs text-emerald-700/80 font-medium mt-1">{separateTraining ? "Eğitim Hariç" : "Tümü"}</p>
                </CardContent>
            </Card>

            {/* 2. Actual Salary */}
            <Card className="bg-white border-emerald-100 shadow-sm h-[140px] flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                    <CardTitle className="text-sm font-medium text-emerald-600">
                        Yatan Maaş
                    </CardTitle>
                    <PiggyBank className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent className="pb-4">
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
            <Card className="bg-white border-slate-200 shadow-sm h-[140px] flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                    <CardTitle className="text-sm font-medium text-slate-500">
                        Toplam Saat
                    </CardTitle>
                    <Clock className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent className="pb-4">
                    <div className="text-2xl font-bold text-slate-900">
                        {displayStats.hours} Saat
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-1">{separateTraining ? "Eğitim Hariç" : "Tümü"}</p>
                </CardContent>
            </Card>

            {/* 4. Toggles Column (Stacked) */}
            <div className="flex flex-col gap-2 h-[140px]">
                {/* Training Toggle */}
                <div className="flex-1">
                    <CompactToggleCard
                        active={separateTraining}
                        onClick={toggleSeparateTraining}
                        title="Eğitimleri Ayır"
                        icon={BookOpen}
                        activeColorClass="bg-amber-50"
                        activeBorderClass="border-amber-200"
                        activeTextClass="text-amber-700"
                        subtitle={`-${trainingTotalLimit}s / -${formatCurrency(trainingSalaryLimit)}`}
                    />
                </div>

                {/* Planned Toggle */}
                <div className="flex-1">
                    <CompactToggleCard
                        active={includePlanned}
                        onClick={toggleIncludePlanned}
                        title="Planlananlar"
                        icon={Clock}
                        activeColorClass="bg-indigo-50"
                        activeBorderClass="border-indigo-200"
                        activeTextClass="text-indigo-700"
                        subtitle={`+${plannedTotalAddon}s / +${formatCurrency(plannedSalaryAddon)}`}
                    />
                </div>
            </div>
        </div>
    );
    );
}
