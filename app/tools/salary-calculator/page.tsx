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
    const { shifts, actualSalaries, filterYear, setActualSalary } = useShiftStore();
    const currentYear = filterYear || new Date().getFullYear();

    // Compute base monthly grosses prioritizing actualSalaries (Yatan Brüt from DB) over shift calculations
    const computedGrosses = useMemo(() => {
        const arr = Array(12).fill(0);

        // 1. Calculate shift totals for each month of the current year
        shifts.forEach((shift) => {
            const dateStr = shift.date.includes('T') ? shift.date : shift.date + 'T12:00:00';
            const d = new Date(dateStr);
            if (d.getFullYear() === currentYear) {
                const m = d.getMonth();
                arr[m] += (shift.totalSalary || 0);
            }
        });

        // 2. Override with actual "Yatan Brüt" from database if entered
        for (let m = 0; m < 12; m++) {
            const key = `${currentYear}-${m}`;
            const record = actualSalaries[key];
            if (record && record.gross !== undefined && record.gross !== null && record.gross > 0) {
                arr[m] = record.gross;
            }
        }

        return arr;
    }, [shifts, actualSalaries, currentYear]);

    // State for 12 months of gross salary inputs
    const [monthlyGrosses, setMonthlyGrosses] = useState<number[]>(computedGrosses);

    // Sync whenever database/store actualSalaries or shifts change
    useEffect(() => {
        setMonthlyGrosses(computedGrosses);
    }, [computedGrosses]);

    const handleGrossChange = (monthIndex: number, value: string) => {
        const valNum = value === "" ? 0 : Number(value);
        const newGrosses = [...monthlyGrosses];
        newGrosses[monthIndex] = valNum;
        setMonthlyGrosses(newGrosses);

        // Save to database & store, keeping Aylık Takip synced!
        const key = `${currentYear}-${monthIndex}`;
        const existingNet = actualSalaries[key]?.net;
        setActualSalary(currentYear, monthIndex, {
            gross: valNum > 0 ? valNum : undefined,
            net: existingNet
        });
    };

    const handleResetToShifts = () => {
        const arr = Array(12).fill(0);
        shifts.forEach((shift) => {
            const dateStr = shift.date.includes('T') ? shift.date : shift.date + 'T12:00:00';
            const d = new Date(dateStr);
            if (d.getFullYear() === currentYear) {
                const m = d.getMonth();
                arr[m] += (shift.totalSalary || 0);
            }
        });
        setMonthlyGrosses(arr);
        arr.forEach((grossVal, m) => {
            const key = `${currentYear}-${m}`;
            setActualSalary(currentYear, m, {
                gross: grossVal > 0 ? grossVal : undefined,
                net: actualSalaries[key]?.net
            });
        });
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
                            onClick={handleResetToShifts}
                            className="text-slate-600 border-slate-200 hover:bg-white"
                            title="Tüm ayları girilen Yatan Brütler yerine mesai toplamlarıyla doldurur"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Mesai Verileriyle Sıfırla
                        </Button>
                    </div>
                </div>

                {/* Parameters Bar */}
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <span className="font-semibold text-slate-700">Parametreler (2026):</span>
                    <span>Asgari Ücret (Brüt): <span className="font-medium text-slate-900">{formatCurrency(TAX_CONSTANTS.A_MIN_WAGE_GROSS)}</span></span>
                    <span>•</span>
                    <span>GV Muafiyeti: <span className="font-medium text-slate-900">Uygulanıyor</span></span>
                    <span>•</span>
                    <span>DV Muafiyeti: <span className="font-medium text-slate-900">Uygulanıyor</span></span>
                </div>

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
                                                    <span className="absolute left-2.5 top-1.5 text-slate-700 text-xs font-bold">₺</span>
                                                    <Input
                                                        type="number"
                                                        value={row.grossSalary || ''}
                                                        onChange={(e) => handleGrossChange(row.month - 1, e.target.value)}
                                                        className="pl-6 h-8 text-sm font-black text-right border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white !text-slate-950 shadow-sm"
                                                        style={{ color: '#020617' }}
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
