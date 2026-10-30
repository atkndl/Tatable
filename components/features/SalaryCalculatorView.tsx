"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Table as TableIcon, RefreshCw, Sparkles, TrendingUp } from "lucide-react";
import { calculateYearlySalary, TAX_CONSTANTS } from "@/lib/tax-utils";
import { formatCurrency } from "@/lib/utils";
import { useShiftStore } from "@/lib/store";

export function SalaryCalculatorView() {
    const { shifts } = useShiftStore();

    // State for 12 months of gross salary inputs
    const [monthlyGrosses, setMonthlyGrosses] = useState<number[]>(Array(12).fill(0));
    const [autoFilled, setAutoFilled] = useState(false);

    // Initialize with data from store
    useEffect(() => {
        if (shifts.length > 0 && !autoFilled) {
            const currentYear = new Date().getFullYear();
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

            Object.entries(monthlyData).forEach(([monthIndex, totalGross]) => {
                newGrosses[Number(monthIndex)] = totalGross;
            });

            setMonthlyGrosses(newGrosses);
            setAutoFilled(true);
        }
    }, [shifts, autoFilled, monthlyGrosses]);

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

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Subheader / Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div>
                    <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                            <Calculator className="w-4 h-4" />
                        </div>
                        Maaş Hesaplayıcı (2026 Tahmini)
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Part-time (saatlik) çalışma için gelir vergisi dilimleri ve asgari ücret istisnalı brütten nete hesap.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setAutoFilled(false); }}
                        className="text-xs font-semibold text-slate-700 border-slate-300 hover:bg-slate-50 shadow-2xs h-8"
                    >
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                        Mevcut Mesailerle Doldur
                    </Button>
                </div>
            </div>

            {/* Parameters Bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 bg-indigo-50/60 p-3 rounded-lg border border-indigo-100">
                <span className="font-bold text-indigo-900">2026 Yasal Parametreleri:</span>
                <span>Asgari Ücret (Brüt): <strong className="text-slate-900">{formatCurrency(TAX_CONSTANTS.A_MIN_WAGE_GROSS)}</strong></span>
                <span>•</span>
                <span>Gelir Vergisi İstisnası: <strong className="text-emerald-700">Aktif</strong></span>
                <span>•</span>
                <span>Damga Vergisi İstisnası: <strong className="text-emerald-700">Aktif</strong></span>
            </div>

            {/* Results Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="bg-white border-slate-200 shadow-xs">
                        <CardHeader className="pb-1 pt-3.5 px-4 flex flex-row items-center justify-between">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                                Ortalama Aylık Net
                            </CardTitle>
                            <TrendingUp className="w-4 h-4 text-indigo-500" />
                        </CardHeader>
                        <CardContent className="px-4 pb-3.5 pt-0">
                            <div className="text-3xl font-extrabold text-indigo-950 tracking-tight">
                                {formatCurrency(averageNet)}
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium mt-1">Yıl geneli 12 ayın ortalaması</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-xs">
                        <CardHeader className="pb-1 pt-3.5 px-4 flex flex-row items-center justify-between">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                                Yıllık Toplam Net Kazanç
                            </CardTitle>
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent className="px-4 pb-3.5 pt-0">
                            <div className="text-3xl font-extrabold text-emerald-950 tracking-tight">
                                {formatCurrency(totalNet)}
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium mt-1">12 ayın ele geçen net toplamı</p>
                        </CardContent>
                    </Card>

                    <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
                        <div className="font-bold text-slate-800">💡 Nasıl Hesaplanır?</div>
                        <p>
                            Brüt kazancınızdan SGK İşçi Payı (%14) ve İşsizlik Sigortası (%1) düşülür.
                            Kalan matrah kümülatif vergi dilimine sokulur, asgari ücret istisnası uygulandıktan sonra net tutar belirlenir.
                        </p>
                    </div>
                </div>

                {/* 12 Months Breakdown Table */}
                <Card className="lg:col-span-2 bg-white border-slate-200 shadow-xs overflow-hidden flex flex-col">
                    <CardHeader className="border-b border-slate-200 bg-slate-50/70 py-3 px-4">
                        <div className="flex items-center gap-2">
                            <TableIcon className="w-4 h-4 text-slate-600" />
                            <CardTitle className="text-sm font-bold text-slate-900">Aylık Hesaplama Tablosu</CardTitle>
                        </div>
                    </CardHeader>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-xs text-left text-slate-600">
                            <thead className="bg-slate-50 text-[11px] uppercase text-slate-500 font-bold sticky top-0 border-b border-slate-200">
                                <tr>
                                    <th className="px-3 py-2.5">Ay</th>
                                    <th className="px-3 py-2.5 text-right">Brüt Ücret</th>
                                    <th className="px-3 py-2.5 text-right hidden sm:table-cell">Küm. Matrah</th>
                                    <th className="px-3 py-2.5 text-right">SGK Kesintisi</th>
                                    <th className="px-3 py-2.5 text-right">Ödenecek Vergi</th>
                                    <th className="px-3 py-2.5 text-right bg-indigo-50/70 text-indigo-900 font-bold">Net Ücret</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                                {results.map((row) => (
                                    <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-3 py-2 font-bold text-slate-900 whitespace-nowrap">{row.monthName}</td>
                                        <td className="px-3 py-2 text-right">
                                            <div className="relative max-w-[105px] ml-auto">
                                                <span className="absolute left-2 top-1.5 text-slate-400 text-xs font-bold">₺</span>
                                                <Input
                                                    type="number"
                                                    value={row.grossSalary || ''}
                                                    onChange={(e) => handleGrossChange(row.month - 1, e.target.value)}
                                                    className="pl-5 h-7 text-xs font-bold text-right border-slate-300 focus:border-indigo-500 bg-white text-slate-900 shadow-2xs rounded"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-right text-slate-400 hidden sm:table-cell">{formatCurrency(row.cumulativeIncomeTaxBase)}</td>
                                        <td className="px-3 py-2 text-right text-rose-600 font-semibold">-{formatCurrency(row.sgkWorker + row.unemploymentWorker)}</td>
                                        <td className="px-3 py-2 text-right text-amber-700 font-semibold">
                                            -{formatCurrency(row.payableIncomeTax + row.payableStampTax)}
                                        </td>
                                        <td className="px-3 py-2 text-right font-extrabold text-indigo-700 bg-indigo-50/40">
                                            {formatCurrency(row.netSalary)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
