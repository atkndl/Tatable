"use client";

import { useShiftStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet, Clock, BookOpen, PiggyBank } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

export function SummaryCards() {
    const { shifts, filterYear, filterMonth, separateTraining, toggleSeparateTraining, includePlanned, toggleIncludePlanned, actualSalaries, setActualSalary } = useShiftStore();

    // Local state for actual salary inputs (gross & net)
    const [grossInput, setGrossInput] = useState("");
    const [netInput, setNetInput] = useState("");

    const key = `${filterYear}-${filterMonth}`;
    const actualRecord = actualSalaries[key];

    useEffect(() => {
        const item = actualSalaries[key] as any;
        if (item && typeof item === 'object') {
            setGrossInput(item.gross !== undefined && item.gross !== null ? item.gross.toString() : "");
            setNetInput(item.net !== undefined && item.net !== null ? item.net.toString() : "");
        } else if (typeof item === 'number') {
            setGrossInput("");
            setNetInput(item ? item.toString() : "");
        } else {
            setGrossInput("");
            setNetInput("");
        }
    }, [key, actualSalaries]);

    const handleGrossChange = (val: string) => {
        setGrossInput(val);
        const grossNum = val === "" ? undefined : parseFloat(val);
        const netNum = netInput === "" ? undefined : parseFloat(netInput);
        setActualSalary(filterYear, filterMonth, { gross: grossNum, net: netNum });
    };

    const handleNetChange = (val: string) => {
        setNetInput(val);
        const grossNum = grossInput === "" ? undefined : parseFloat(grossInput);
        const netNum = val === "" ? undefined : parseFloat(val);
        setActualSalary(filterYear, filterMonth, { gross: grossNum, net: netNum });
    };

    const buckets = useMemo(() => {
        const monthlyShifts = shifts.filter(s => {
            const dateStr = s.date.includes('T') ? s.date : s.date + 'T12:00:00';
            const d = new Date(dateStr);
            return d.getFullYear() === filterYear && d.getMonth() === filterMonth;
        });

        return monthlyShifts.reduce((acc, curr) => {
            // Seviyesi veya Branşı "Eğitim", "Resmi Tatil" veya "Diğer" olan işler
            const isOtherSpecial = 
                curr.level === "Eğitim" || 
                curr.level === "Resmi Tatil" || 
                curr.level === "Diğer" ||
                curr.branch === "Eğitim" || 
                curr.branch === "Resmi Tatil" || 
                curr.branch === "Diğer";
            const isPlanned = curr.status === 'planned';

            if (isOtherSpecial) {
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

    const enteredGross = actualRecord?.gross;
    const enteredNet = actualRecord?.net;
    const diffGross = enteredGross !== undefined 
        ? enteredGross - displayStats.salary 
        : (enteredNet !== undefined ? enteredNet - displayStats.salary : null);

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
            className={`cursor-pointer transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-center px-3.5 py-2.5 h-full border ${
                active 
                    ? activeBorderClass + ' ' + activeColorClass 
                    : 'bg-white border-slate-200 hover:bg-slate-50/80 text-slate-600'
            }`}
            onClick={onClick}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${active ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon className="h-3 w-3" />
                    </div>
                    <span className={`text-xs font-bold ${active ? activeTextClass : 'text-slate-700'}`}>
                        {title}
                    </span>
                </div>
                <div className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    active 
                        ? 'bg-amber-200/60 text-amber-900 border border-amber-300' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}>
                    {active ? "AYRILDI" : "DAHİL"}
                </div>
            </div>
            {subtitle && (
                <div className={`text-[10px] font-semibold mt-1 truncate ${active ? activeTextClass : 'text-slate-400'}`}>
                    {subtitle}
                </div>
            )}
        </Card>
    );

    return (
        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. Calculated Salary */}
            <Card className="bg-white border-slate-200/90 shadow-xs hover:shadow-md transition-all min-h-[145px] flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3.5 px-4">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Hesaplanan Maaş
                    </CardTitle>
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                        <Wallet className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-3.5 pt-0">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {formatCurrency(displayStats.salary)}
                    </div>
                    <p className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="truncate">{separateTraining ? "Eğitim / Tatil / Diğer Hariç" : "Tüm Mesailer Dahil"}</span>
                    </p>
                </CardContent>
            </Card>

            {/* 2. Actual Salary (Yatan Brüt & Yatan Net) */}
            <Card className="bg-white border-slate-200/90 shadow-xs hover:shadow-md transition-all min-h-[145px] flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3.5 px-4">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Yatan Maaş
                    </CardTitle>
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                        <PiggyBank className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-3.5 pt-0 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                                Yatan Brüt
                            </label>
                            <div className="relative">
                                <span className="absolute left-2.5 top-1.5 text-slate-500 text-xs font-bold">₺</span>
                                <Input
                                    type="number"
                                    value={grossInput}
                                    onChange={(e) => handleGrossChange(e.target.value)}
                                    className="h-8 pl-6 text-xs font-bold bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                                Yatan Net
                            </label>
                            <div className="relative">
                                <span className="absolute left-2.5 top-1.5 text-emerald-600 text-xs font-bold">₺</span>
                                <Input
                                    type="number"
                                    value={netInput}
                                    onChange={(e) => handleNetChange(e.target.value)}
                                    className="h-8 pl-6 text-xs font-bold bg-emerald-50/70 border-emerald-300 text-emerald-950 placeholder:text-emerald-400 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 rounded-md"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-0.5">
                        <span className="text-slate-500 text-[10px] font-medium truncate max-w-[120px]">
                            {enteredGross ? `Brüt: ${formatCurrency(enteredGross)}` : (enteredNet ? `Net: ${formatCurrency(enteredNet)}` : 'Ay sonu maaşı')}
                        </span>
                        {diffGross !== null ? (
                            <span className={`font-bold text-[10px] px-1.5 py-0.5 rounded ${
                                diffGross >= 0 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                                Fark: {diffGross > 0 ? '+' : ''}{formatCurrency(diffGross)}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
            </Card>

            {/* 3. Total Hours */}
            <Card className="bg-white border-slate-200/90 shadow-xs hover:shadow-md transition-all min-h-[145px] flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3.5 px-4">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Toplam Saat
                    </CardTitle>
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                        <Clock className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-3.5 pt-0">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {displayStats.hours} <span className="text-base font-bold text-slate-500">Saat</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-600 mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span className="truncate">{separateTraining ? "Eğitim / Tatil / Diğer Hariç" : "Tüm Saatler Dahil"}</span>
                    </p>
                </CardContent>
            </Card>

            {/* 4. Toggles Column (Stacked) */}
            <div className="flex flex-col gap-2 min-h-[145px]">
                {/* Diğerlerini Ayır (Eğitim, Resmi Tatil, Diğer) */}
                <div className="flex-1">
                    <CompactToggleCard
                        active={separateTraining}
                        onClick={toggleSeparateTraining}
                        title="Diğerlerini Ayır"
                        icon={BookOpen}
                        activeColorClass="bg-amber-50"
                        activeBorderClass="border-amber-300"
                        activeTextClass="text-amber-800"
                        subtitle={`-${trainingTotalLimit}s / -${formatCurrency(trainingSalaryLimit)} (Eğitim, Tatil, Diğer)`}
                    />
                </div>

                {/* Planlananları Dahil Et */}
                <div className="flex-1">
                    <CompactToggleCard
                        active={includePlanned}
                        onClick={toggleIncludePlanned}
                        title="Planlananlar"
                        icon={Clock}
                        activeColorClass="bg-indigo-50"
                        activeBorderClass="border-indigo-300"
                        activeTextClass="text-indigo-800"
                        subtitle={`+${plannedTotalAddon}s / +${formatCurrency(plannedSalaryAddon)}`}
                    />
                </div>
            </div>
        </div>
    );
}
