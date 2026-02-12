"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, Table as TableIcon, Info, RefreshCw } from "lucide-react";
import Link from "next/link";
import { calculateYearlySalary, TAX_CONSTANTS } from "@/lib/tax-utils";
import { formatCurrency } from "@/lib/utils";
import { useShiftStore } from "@/lib/store";
import { Shift } from "@/lib/types";

export default function SalaryCalculatorPage() {
    const { shifts } = useShiftStore();

    // State for 12 months of gross salary inputs
    const [monthlyGrosses, setMonthlyGrosses] = useState<number[]>(Array(12).fill(0));
    const [autoFilled, setAutoFilled] = useState(false);

    // Initialize with data from store
    useEffect(() => {
        if (shifts.length > 0 && !autoFilled) {
            const currentYear = new Date().getFullYear(); // Or use filterYear from store if preferred, but usually tax calc is for current year
            const newGrosses = [...monthlyGrosses];

            // Aggregate shifts by month for the current year
            const monthlyData = shifts.reduce((acc, shift) => {
                const date = new Date(shift.date);
                if (date.getFullYear() === currentYear) {
                    const monthIndex = date.getMonth(); // 0-11
                    acc[monthIndex] = (acc[monthIndex] || 0) + (shift.totalSalary || 0);
                }
                return acc;
            }, {} as Record<number, number>);

            // Fill the array
            Object.entries(monthlyData).forEach(([monthIndex, totalGross]) => {
                newGrosses[Number(monthIndex)] = totalGross;
            });

            // If no data found (e.g. shifts are empty or not in this year), maybe set default? 
            // Let's keep 0 as default to allow user entry.

            setMonthlyGrosses(newGrosses);
            setAutoFilled(true);
        }
    }, [shifts, autoFilled]);


    const handleGrossChange = (index: number, value: string) => {
        const newGrosses = [...monthlyGrosses];
        newGrosses[index] = Number(value);
        setMonthlyGrosses(newGrosses);
    };

    const results = useMemo(() => {
        return calculateYearlySalary(monthlyGrosses);
    }, [monthlyGrosses]);

    const totalNet = results.reduce((acc, curr) => acc + curr.netSalary, 0);
    const averageNet = totalNet / 12;

    const currentMonthIndex = new Date().getMonth();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="hover:bg-slate-200 text-slate-600">
                                <ArrowLeft className="w-6 h-6" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Calculator className="w-6 h-6 text-indigo-600" />
                                Maaş Hesaplayıcı (2026 Tahmini)
                            </h1>
                            <p className="text-slate-500 text-sm">Part-time (Saatlik) çalışma için brütten nete maaş hesabı.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { setAutoFilled(false); /* Trigger re-fill logic */ }}
                            className="text-slate-600 border-slate-200 hover:bg-white"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Mevcut Verilerle Doldur
                        </Button>
                    </div>
                </div>

                {/* Input Grid */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader className="pb-4 border-b border-slate-100">
                        <CardTitle className="text-base font-semibold text-slate-800">Aylık Brüt Kazançlar</CardTitle>
                        <p className="text-sm text-slate-500">Her ay için brüt kazancınızı giriniz. Sistem mevcut kayıtlarınızdan otomatik veri çekmeye çalışır.</p>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {monthlyGrosses.map((gross, index) => {
                                const isCurrentMonth = index === currentMonthIndex;
                                const monthName = new Date(0, index).toLocaleString('tr-TR', { month: 'long' });

                                return (
                                    <div key={index} className={`space-y-1.5 p-3 rounded-lg border ${isCurrentMonth ? 'bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-200' : 'bg-slate-50/50 border-slate-200'}`}>
                                        <label className={`text-xs font-semibold uppercase tracking-wider ${isCurrentMonth ? 'text-indigo-600' : 'text-slate-500'}`}>
                                            {monthName}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-2.5 top-2 text-slate-400 text-xs font-bold">₺</span>
                                            <Input
                                                type="number"
                                                value={gross || ''}
                                                onChange={(e) => handleGrossChange(index, e.target.value)}
                                                className={`pl-6 h-9 text-sm font-medium ${isCurrentMonth ? 'border-indigo-200 focus:ring-indigo-500' : 'border-slate-200'}`}
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <span className="font-semibold text-slate-700">Parametreler (2026):</span>
                            <span>Asgari Ücret (Brüt): <span className="font-medium text-slate-900">{formatCurrency(TAX_CONSTANTS.A_MIN_WAGE_GROSS)}</span></span>
                            <span>•</span>
                            <span>GV Muafiyeti: <span className="font-medium text-slate-900">Uygulanıyor</span></span>
                            <span>•</span>
                            <span>DV Muafiyeti: <span className="font-medium text-slate-900">Uygulanıyor</span></span>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-indigo-50 border-indigo-100 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Ortalama Aylık Net</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-extrabold text-indigo-900">
                                    {formatCurrency(averageNet)}
                                </div>
                                <p className="text-xs text-indigo-500 mt-1">Yıl geneli ortalaması</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-50 border-emerald-100 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold text-emerald-600 uppercase tracking-wider">Toplam Ele Geçen</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-extrabold text-emerald-900">
                                    {formatCurrency(totalNet)}
                                </div>
                                <p className="text-xs text-emerald-500 mt-1">12 ay toplam tutar</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Table */}
                    <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4">
                            <div className="flex items-center gap-2">
                                <TableIcon className="w-4 h-4 text-slate-500" />
                                <CardTitle className="text-base font-semibold text-slate-800">Hesaplama Detayları</CardTitle>
                            </div>
                        </CardHeader>
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-xs md:text-sm text-left text-slate-600">
                                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold sticky top-0">
                                    <tr>
                                        <th className="px-4 py-3 border-b">Ay</th>
                                        <th className="px-4 py-3 border-b text-right">Brüt Toplam</th>
                                        <th className="px-4 py-3 border-b text-right hidden md:table-cell">Küm. Vergi Matrahı</th>
                                        <th className="px-4 py-3 border-b text-right">SGK+İşsizlik</th>
                                        <th className="px-4 py-3 border-b text-right">Ödenecek Vergi</th>
                                        <th className="px-4 py-3 border-b text-right bg-indigo-50/50 text-indigo-700">Net Ücret</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {results.map((row) => (
                                        <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.monthName}</td>
                                            <td className="px-4 py-3 text-right font-medium">
                                                <div className="relative max-w-[110px] ml-auto">
                                                    <span className="absolute left-2.5 top-1.5 text-slate-400 text-xs font-bold">₺</span>
                                                    <Input
                                                        type="number"
                                                        value={row.grossSalary || ''}
                                                        onChange={(e) => handleGrossChange(row.month - 1, e.target.value)}
                                                        className="pl-6 h-8 text-sm font-medium text-right border-slate-200 focus:ring-indigo-500 bg-white"
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right text-slate-400 hidden md:table-cell">{formatCurrency(row.cumulativeIncomeTaxBase)}</td>
                                            <td className="px-4 py-3 text-right text-red-400">-{formatCurrency(row.sgkWorker + row.unemploymentWorker)}</td>
                                            <td className="px-4 py-3 text-right text-amber-600">
                                                -{formatCurrency(row.payableIncomeTax + row.payableStampTax)}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-indigo-700 bg-indigo-50/30">
                                                {formatCurrency(row.netSalary)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <CardContent className="pt-3 pb-4 bg-slate-50/30 border-t border-slate-100">
                            <p className="text-[10px] md:text-xs text-slate-400">
                                * Ödenecek Vergi: Gelir Vergisi ve Damga Vergisi toplamından, asgari ücret istisnaları düşüldükten sonra kalan tutardır.
                            </p>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
