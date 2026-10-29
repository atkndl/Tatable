"use client";

import { useState, useMemo } from "react";
import { useShiftStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { getBranchConfig, getBranchHexColor } from "@/lib/branchColors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    BarChart3, 
    TrendingUp, 
    Clock, 
    Banknote, 
    Building2, 
    Calendar, 
    Filter, 
    RotateCcw, 
    CheckCircle2, 
    Layers, 
    PieChart as PieChartIcon,
    ShieldCheck,
    Briefcase,
    ReceiptText,
    ArrowUpRight
} from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export function AnalyticsDashboard() {
    const { shifts, actualSalaries, user } = useShiftStore();

    // Filters
    const [selectedYear, setSelectedYear] = useState<string>("all");
    const [selectedBranch, setSelectedBranch] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [selectedLevel, setSelectedLevel] = useState<string>("all");
    const [chartMetric, setChartMetric] = useState<"hours" | "salary">("salary");
    const [branchChartType, setBranchChartType] = useState<"hours" | "salary">("hours");

    // Available Years
    const availableYears = useMemo(() => {
        const years = new Set<number>();
        shifts.forEach(s => {
            const dateStr = s.date.includes('T') ? s.date : s.date + 'T12:00:00';
            const d = new Date(dateStr);
            if (!isNaN(d.getFullYear())) {
                years.add(d.getFullYear());
            }
        });
        years.add(new Date().getFullYear());
        return Array.from(years).sort((a, b) => b - a);
    }, [shifts]);

    // Available Branches
    const availableBranches = useMemo(() => {
        const branches = new Set<string>();
        shifts.forEach(s => {
            if (s.branch) branches.add(s.branch);
        });
        return Array.from(branches).sort();
    }, [shifts]);

    // Available Levels
    const availableLevels = useMemo(() => {
        const levels = new Set<string>();
        shifts.forEach(s => {
            if (s.level) levels.add(s.level);
        });
        return Array.from(levels).sort();
    }, [shifts]);

    // Filtered Shifts
    const filteredShifts = useMemo(() => {
        return shifts.filter(s => {
            const dateStr = s.date.includes('T') ? s.date : s.date + 'T12:00:00';
            const d = new Date(dateStr);
            if (selectedYear !== "all" && d.getFullYear().toString() !== selectedYear) return false;
            if (selectedBranch !== "all" && s.branch !== selectedBranch) return false;
            if (selectedStatus !== "all" && s.status !== selectedStatus) return false;
            if (selectedLevel !== "all" && s.level !== selectedLevel) return false;
            return true;
        });
    }, [shifts, selectedYear, selectedBranch, selectedStatus, selectedLevel]);

    // Reset Filters
    const hasActiveFilters = selectedYear !== "all" || selectedBranch !== "all" || selectedStatus !== "all" || selectedLevel !== "all";
    const handleResetFilters = () => {
        setSelectedYear("all");
        setSelectedBranch("all");
        setSelectedStatus("all");
        setSelectedLevel("all");
    };

    // Overall KPI Totals
    const totalHours = useMemo(() => filteredShifts.reduce((acc, s) => acc + s.hours, 0), [filteredShifts]);
    const completedHours = useMemo(() => filteredShifts.filter(s => s.status === 'completed').reduce((acc, s) => acc + s.hours, 0), [filteredShifts]);
    const plannedHours = useMemo(() => filteredShifts.filter(s => s.status === 'planned').reduce((acc, s) => acc + s.hours, 0), [filteredShifts]);

    const totalCalculatedSalary = useMemo(() => filteredShifts.reduce((acc, s) => acc + s.totalSalary, 0), [filteredShifts]);
    const completedSalary = useMemo(() => filteredShifts.filter(s => s.status === 'completed').reduce((acc, s) => acc + s.totalSalary, 0), [filteredShifts]);

    // Actual Salaries Totals from user inputs
    const actualSalariesTotals = useMemo(() => {
        let gross = 0;
        let net = 0;
        let count = 0;
        Object.entries(actualSalaries).forEach(([key, rec]) => {
            const [y] = key.split('-');
            if (selectedYear !== "all" && y !== selectedYear) return;
            if (rec.gross) gross += rec.gross;
            if (rec.net) net += rec.net;
            if (rec.gross || rec.net) count++;
        });
        return { gross, net, count };
    }, [actualSalaries, selectedYear]);

    // Monthly Trend Data
    const monthlyTrendData = useMemo(() => {
        const map: Record<string, {
            key: string;
            label: string;
            fullMonthName: string;
            year: number;
            month: number;
            timestamp: number;
            hours: number;
            completedHours: number;
            plannedHours: number;
            salary: number;
            completedSalary: number;
            actualGross: number;
            actualNet: number;
            lessonCount: number;
        }> = {};

        filteredShifts.forEach(s => {
            const dateStr = s.date.includes('T') ? s.date : s.date + 'T12:00:00';
            const d = new Date(dateStr);
            const y = d.getFullYear();
            const m = d.getMonth();
            const key = `${y}-${m}`;

            if (!map[key]) {
                const monthShort = d.toLocaleString('tr-TR', { month: 'short' });
                const fullMonthName = d.toLocaleString('tr-TR', { month: 'long' });
                map[key] = {
                    key,
                    label: `${monthShort} '${y.toString().slice(-2)}`,
                    fullMonthName: `${fullMonthName} ${y}`,
                    year: y,
                    month: m,
                    timestamp: new Date(y, m, 1).getTime(),
                    hours: 0,
                    completedHours: 0,
                    plannedHours: 0,
                    salary: 0,
                    completedSalary: 0,
                    actualGross: actualSalaries[key]?.gross || 0,
                    actualNet: actualSalaries[key]?.net || 0,
                    lessonCount: 0,
                };
            }

            map[key].hours += s.hours;
            map[key].salary += s.totalSalary;
            map[key].lessonCount += 1;
            if (s.status === 'completed') {
                map[key].completedHours += s.hours;
                map[key].completedSalary += s.totalSalary;
            } else {
                map[key].plannedHours += s.hours;
            }
        });

        return Object.values(map).sort((a, b) => a.timestamp - b.timestamp);
    }, [filteredShifts, actualSalaries]);

    // Averages per month
    const distinctMonthsCount = Math.max(monthlyTrendData.length, 1);
    const avgHoursPerMonth = Math.round(totalHours / distinctMonthsCount);
    const avgSalaryPerMonth = Math.round(totalCalculatedSalary / distinctMonthsCount);

    // Branch Breakdown
    const branchStats = useMemo(() => {
        const map: Record<string, {
            branch: string;
            totalHours: number;
            completedHours: number;
            plannedHours: number;
            totalSalary: number;
            lessonCount: number;
            hex: string;
            lastDate: string;
        }> = {};

        filteredShifts.forEach(s => {
            const b = s.branch;
            if (!map[b]) {
                map[b] = {
                    branch: b,
                    totalHours: 0,
                    completedHours: 0,
                    plannedHours: 0,
                    totalSalary: 0,
                    lessonCount: 0,
                    hex: getBranchHexColor(b),
                    lastDate: s.date,
                };
            }
            map[b].totalHours += s.hours;
            map[b].totalSalary += s.totalSalary;
            map[b].lessonCount += 1;
            if (s.status === 'completed') {
                map[b].completedHours += s.hours;
            } else {
                map[b].plannedHours += s.hours;
            }
            if (new Date(s.date) > new Date(map[b].lastDate)) {
                map[b].lastDate = s.date;
            }
        });

        return Object.values(map).sort((a, b) => b.totalHours - a.totalHours);
    }, [filteredShifts]);

    const topBranch = branchStats.length > 0 ? branchStats[0] : null;
    const topBranchPercent = (topBranch && totalHours > 0) ? Math.round((topBranch.totalHours / totalHours) * 100) : 0;

    // Level Breakdown
    const levelStats = useMemo(() => {
        const map: Record<string, { level: string; hours: number; salary: number; count: number }> = {};
        filteredShifts.forEach(s => {
            const lvl = s.level || "Diğer";
            if (!map[lvl]) {
                map[lvl] = { level: lvl, hours: 0, salary: 0, count: 0 };
            }
            map[lvl].hours += s.hours;
            map[lvl].salary += s.totalSalary;
            map[lvl].count += 1;
        });
        return Object.values(map).sort((a, b) => b.hours - a.hours);
    }, [filteredShifts]);

    return (
        <div className="space-y-8 animate-fade-in">
            
            {/* Header & Isolation Note */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600">
                            <BarChart3 className="w-5 h-5" />
                        </span>
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                                Genel Mesai & Gelir Analitikleri
                            </h2>
                            <p className="text-xs text-slate-500">
                                Çalıştığınız tüm ayların toplam saatleri, kümülatif kazançları ve şube detayları.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate max-w-[200px]">{user?.email || "Kişisel Profil"}</span>
                    </div>
                </div>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <Filter className="w-4 h-4 text-indigo-600" />
                        <span>Analitik Filtreleri</span>
                        <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {filteredShifts.length} Kayıt Bulundu
                        </span>
                    </div>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleResetFilters}
                            className="h-7 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Filtreleri Temizle
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Year Filter */}
                    <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Dönem Yılı:</label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-full h-8 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 px-2.5 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-colors"
                        >
                            <option value="all">Tüm Yıllar (Tüm Zamanlar)</option>
                            {availableYears.map(y => (
                                <option key={y} value={y.toString()}>{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* Branch Filter */}
                    <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Şube / Atölye:</label>
                        <select
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                            className="w-full h-8 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 px-2.5 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-colors"
                        >
                            <option value="all">Tüm Şubeler</option>
                            {availableBranches.map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Ders Durumu:</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full h-8 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 px-2.5 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-colors"
                        >
                            <option value="all">Tümü (Onaylı + Planlanan)</option>
                            <option value="completed">Yalnızca Onaylananlar (Tamamlandı)</option>
                            <option value="planned">Yalnızca Planlananlar</option>
                        </select>
                    </div>

                    {/* Level Filter */}
                    <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Eğitim Seviyesi:</label>
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="w-full h-8 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 px-2.5 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-colors"
                        >
                            <option value="all">Tüm Seviyeler</option>
                            {availableLevels.map(lvl => (
                                <option key={lvl} value={lvl}>{lvl}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Total Hours */}
                <Card className="border-slate-200 bg-white shadow-xs">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Toplam Çalışma Saati
                            </span>
                            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                                <Clock className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-mono">
                                {totalHours}s
                            </h3>
                            <span className="text-xs text-slate-500">
                                ({avgHoursPerMonth}s / ay ort.)
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                {completedHours}s Onaylı
                            </span>
                            <span className="text-slate-400 font-medium">
                                {plannedHours}s Planlı
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Total Calculated Salary */}
                <Card className="border-slate-200 bg-white shadow-xs">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Hesaplanan Brüt Gelir
                            </span>
                            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                                <Banknote className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-700 font-mono">
                                {formatCurrency(totalCalculatedSalary)}
                            </h3>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500">
                                Ay Başına Ort: <strong className="text-slate-800">{formatCurrency(avgSalaryPerMonth)}</strong>
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Actual Salary (Yatan Maaş) */}
                <Card className="border-slate-200 bg-white shadow-xs">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Yatan Bordro Toplamı
                            </span>
                            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                                <ReceiptText className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="space-y-0.5">
                            <div className="flex items-baseline justify-between">
                                <span className="text-xs font-bold text-slate-500">Net:</span>
                                <span className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono">
                                    {actualSalariesTotals.net > 0 ? formatCurrency(actualSalariesTotals.net) : "—"}
                                </span>
                            </div>
                            <div className="flex items-baseline justify-between text-xs text-slate-500">
                                <span>Brüt:</span>
                                <span className="font-mono font-bold text-slate-700">
                                    {actualSalariesTotals.gross > 0 ? formatCurrency(actualSalariesTotals.gross) : "—"}
                                </span>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                            {actualSalariesTotals.count > 0 ? `${actualSalariesTotals.count} ay için kayıt girildi` : "Henüz bordro verisi girilmedi"}
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Top Branch */}
                <Card className="border-slate-200 bg-white shadow-xs">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                En Çok Çalışılan Şube
                            </span>
                            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                                <Building2 className="w-4 h-4" />
                            </div>
                        </div>
                        {topBranch ? (
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span 
                                        className="w-3 h-3 rounded-full shrink-0" 
                                        style={{ backgroundColor: topBranch.hex }}
                                    />
                                    <h3 className="text-xl font-extrabold text-slate-900 truncate">
                                        {topBranch.branch}
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-500">
                                    <strong className="text-slate-800">{topBranch.totalHours} Saat</strong> (%{topBranchPercent} pay)
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm font-semibold text-slate-400">Kayıt bulunamadı</p>
                        )}
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <span>Toplam Şube: <strong>{branchStats.length}</strong></span>
                            <span>Toplam Ders: <strong>{filteredShifts.length}</strong></span>
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Monthly Trend Area Chart (2 Cols) */}
                <Card className="lg:col-span-2 border-slate-200 bg-white shadow-xs">
                    <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-slate-900 text-base font-bold">
                                <TrendingUp className="w-4 h-4 text-indigo-600" />
                                Aylık Gelişim & Trend Analizi
                            </CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Aylara göre çalışma saatleri ve kazanç seyri
                            </p>
                        </div>

                        {/* Metric Toggle */}
                        <div className="flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200 self-start sm:self-auto text-xs">
                            <button
                                type="button"
                                onClick={() => setChartMetric("salary")}
                                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                                    chartMetric === "salary" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                Gelir (₺)
                            </button>
                            <button
                                type="button"
                                onClick={() => setChartMetric("hours")}
                                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                                    chartMetric === "hours" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                Saat (s)
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {monthlyTrendData.length === 0 ? (
                            <div className="h-[280px] flex items-center justify-center text-xs text-slate-400">
                                Seçilen filtreye uygun veri bulunamadı.
                            </div>
                        ) : (
                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    {chartMetric === "salary" ? (
                                        <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                                                </linearGradient>
                                                <linearGradient id="actualGrossGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                            <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
                                            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value: any, name: any) => [
                                                    formatCurrency(Number(value)),
                                                    name === "salary" ? "Hesaplanan Brüt" : name === "actualGross" ? "Yatan Brüt" : name === "actualNet" ? "Yatan Net" : name
                                                ]}
                                            />
                                            <Area type="monotone" dataKey="salary" name="Hesaplanan Brüt" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#salaryGrad)" />
                                            {actualSalariesTotals.count > 0 && (
                                                <Area type="monotone" dataKey="actualNet" name="Yatan Net" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                                            )}
                                        </AreaChart>
                                    ) : (
                                        <BarChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                            <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
                                            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value: any, name: any) => [`${value} Saat`, name === "completedHours" ? "Onaylanan" : name === "plannedHours" ? "Planlanan" : "Toplam"]}
                                            />
                                            <Bar dataKey="completedHours" name="Onaylanan" fill="#6366f1" radius={[4, 4, 0, 0]} stackId="a" />
                                            <Bar dataKey="plannedHours" name="Planlanan" fill="#cbd5e1" radius={[4, 4, 0, 0]} stackId="a" />
                                            <Legend verticalAlign="top" height={30} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
                                        </BarChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 2. Branch Distribution Pie Chart (1 Col) */}
                <Card className="border-slate-200 bg-white shadow-xs">
                    <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-slate-900 text-base font-bold">
                                <PieChartIcon className="w-4 h-4 text-emerald-600" />
                                Şube Dağılımı
                            </CardTitle>
                            <p className="text-xs text-slate-500">
                                Şubelere göre çalışma yüzdesi
                            </p>
                        </div>

                        {/* Metric switcher */}
                        <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[11px]">
                            <button
                                type="button"
                                onClick={() => setBranchChartType("hours")}
                                className={`px-2 py-0.5 rounded-md font-semibold ${branchChartType === "hours" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"}`}
                            >
                                Saat
                            </button>
                            <button
                                type="button"
                                onClick={() => setBranchChartType("salary")}
                                className={`px-2 py-0.5 rounded-md font-semibold ${branchChartType === "salary" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"}`}
                            >
                                Gelir
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                        {branchStats.length === 0 ? (
                            <div className="h-[280px] flex items-center justify-center text-xs text-slate-400">
                                Veri yok
                            </div>
                        ) : (
                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={branchStats}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={80}
                                            paddingAngle={4}
                                            dataKey={branchChartType === "hours" ? "totalHours" : "totalSalary"}
                                            nameKey="branch"
                                            stroke="none"
                                        >
                                            {branchStats.map((entry) => (
                                                <Cell key={entry.branch} fill={entry.hex} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                            formatter={(value: any) => [
                                                branchChartType === "hours" ? `${value} Saat` : formatCurrency(Number(value)),
                                                branchChartType === "hours" ? "Süre" : "Kazanç"
                                            ]}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={50}
                                            iconType="circle"
                                            wrapperStyle={{ fontSize: '11px', color: '#475569', overflowY: 'auto', maxHeight: '60px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>

            {/* Detailed Branch Performance Table */}
            <Card className="border-slate-200 bg-white shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-indigo-600" />
                            Şube Bazlı Detaylı Performans & Dağılım
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Çalıştığınız tüm atölyelerin ders sayısı, toplam saat ve kazanç oranları
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 uppercase tracking-wider font-extrabold text-[10px]">
                                <th className="py-3 px-4">Şube / Atölye</th>
                                <th className="py-3 px-4 text-center">Ders Sayısı</th>
                                <th className="py-3 px-4 text-center">Onaylı Saat</th>
                                <th className="py-3 px-4 text-center">Planlı Saat</th>
                                <th className="py-3 px-4 text-center">Toplam Saat</th>
                                <th className="py-3 px-4 text-right">Toplam Brüt Gelir</th>
                                <th className="py-3 px-4 text-center">Payı (%)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {branchStats.map((b) => {
                                const sharePct = totalHours > 0 ? Math.round((b.totalHours / totalHours) * 100) : 0;
                                const branchConfig = getBranchConfig(b.branch);

                                return (
                                    <tr key={b.branch} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${branchConfig.badge}`}>
                                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b.hex }} />
                                                <span>{b.branch}</span>
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center font-bold text-slate-700">
                                            {b.lessonCount} Ders
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono font-semibold text-emerald-700">
                                            {b.completedHours}s
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono text-slate-400">
                                            {b.plannedHours}s
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono font-extrabold text-slate-900">
                                            {b.totalHours}s
                                        </td>
                                        <td className="py-3 px-4 text-right font-mono font-extrabold text-slate-900">
                                            {formatCurrency(b.totalSalary)}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                                    <div className="h-full rounded-full" style={{ width: `${sharePct}%`, backgroundColor: b.hex }} />
                                                </div>
                                                <span className="font-bold text-[11px] text-slate-700 w-8 text-right font-mono">
                                                    %{sharePct}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {branchStats.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-slate-400">
                                        Filtreye uygun şube kaydı bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {/* Monthly Comparison Table */}
            <Card className="border-slate-200 bg-white shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-600" />
                            Aylık Bordro & Kazanç Geçmişi
                        </CardTitle>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Çalışılan her ayın hesaplanan ve bankaya yatan maaş karşılaştırması
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 uppercase tracking-wider font-extrabold text-[10px]">
                                <th className="py-3 px-4">Dönem</th>
                                <th className="py-3 px-4 text-center">Ders Sayısı</th>
                                <th className="py-3 px-4 text-center">Onaylı Saat</th>
                                <th className="py-3 px-4 text-center">Planlı Saat</th>
                                <th className="py-3 px-4 text-right">Hesaplanan Brüt</th>
                                <th className="py-3 px-4 text-right">Yatan Brüt</th>
                                <th className="py-3 px-4 text-right">Yatan Net</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {monthlyTrendData.slice().reverse().map((m) => {
                                return (
                                    <tr key={m.key} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3 px-4 font-bold text-slate-900">
                                            {m.fullMonthName}
                                        </td>
                                        <td className="py-3 px-4 text-center font-bold text-slate-700">
                                            {m.lessonCount} Ders
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">
                                            {m.completedHours}s
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono text-slate-400">
                                            {m.plannedHours}s
                                        </td>
                                        <td className="py-3 px-4 text-right font-mono font-extrabold text-emerald-700">
                                            {formatCurrency(m.salary)}
                                        </td>
                                        <td className="py-3 px-4 text-right font-mono font-semibold text-slate-800">
                                            {m.actualGross > 0 ? formatCurrency(m.actualGross) : "—"}
                                        </td>
                                        <td className="py-3 px-4 text-right font-mono font-bold text-indigo-700">
                                            {m.actualNet > 0 ? formatCurrency(m.actualNet) : "—"}
                                        </td>
                                    </tr>
                                );
                            })}
                            {monthlyTrendData.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-slate-400">
                                        Kayıt bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

        </div>
    );
}
