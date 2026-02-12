"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, Table as TableIcon, Info } from "lucide-react";
import Link from "next/link";
import { calculateYearlySalary, TAX_CONSTANTS } from "@/lib/tax-utils";
import { formatCurrency } from "@/lib/utils";

export default function SalaryCalculatorPage() {
    const [grossSalary, setGrossSalary] = useState<number>(30000); // Default start

    const results = useMemo(() => {
        return calculateYearlySalary(grossSalary);
    }, [grossSalary]);

    const totalNet = results.reduce((acc, curr) => acc + curr.netSalary, 0);
    const averageNet = totalNet / 12;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">

                {/* Header */}
                <div className="flex items-center justify-between">
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
                            <p className="text-slate-500 text-sm">Brüt maaşınızdan net maaşınızı hesaplayın.</p>
                        </div>
                    </div>
                </div>

                {/* Input & Summary Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Input Card */}
                    <Card className="bg-white border-slate-200 shadow-sm md:col-span-1">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Aylık Brüt Maaş</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-slate-400">₺</span>
                                <Input
                                    type="number"
                                    value={grossSalary}
                                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                                    className="text-xl font-bold text-slate-900 h-12"
                                />
                            </div>
                            <div className="mt-4 text-xs text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <p className="font-semibold mb-1">Parametreler (2026 Tahmini):</p>
                                <p>Asgari Ücret (Brüt): {formatCurrency(TAX_CONSTANTS.A_MIN_WAGE_GROSS)}</p>
                                <p>Gelir Vergisi İlk Dilim: {formatCurrency(TAX_CONSTANTS.INCOME_TAX_BRACKETS[0].limit)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary Cards */}
                    <Card className="bg-indigo-50 border-indigo-100 shadow-sm md:col-span-1">
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

                    <Card className="bg-emerald-50 border-emerald-100 shadow-sm md:col-span-1">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-emerald-600 uppercase tracking-wider">Toplam Ele Geçen (Yıllık)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-emerald-900">
                                {formatCurrency(totalNet)}
                            </div>
                            <p className="text-xs text-emerald-500 mt-1">12 ay toplam tutar</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Table */}
                <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <TableIcon className="w-4 h-4 text-slate-500" />
                            <CardTitle className="text-base font-semibold text-slate-800">Aylık Detay Tablosu</CardTitle>
                        </div>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-600">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                                <tr>
                                    <th className="px-4 py-3 border-b">Ay</th>
                                    <th className="px-4 py-3 border-b text-right">Brüt</th>
                                    <th className="px-4 py-3 border-b text-right">SGK İşçi (%14)</th>
                                    <th className="px-4 py-3 border-b text-right">İşsizlik (%1)</th>
                                    <th className="px-4 py-3 border-b text-right">Gelir Vergisi</th>
                                    <th className="px-4 py-3 border-b text-right">Damga V.</th>
                                    <th className="px-4 py-3 border-b text-right bg-indigo-50/50 text-indigo-700">Net Ücret</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {results.map((row) => (
                                    <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-slate-900">{row.monthName}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(row.grossSalary)}</td>
                                        <td className="px-4 py-3 text-right text-red-400">-{formatCurrency(row.sgkWorker)}</td>
                                        <td className="px-4 py-3 text-right text-red-400">-{formatCurrency(row.unemploymentWorker)}</td>
                                        <td className="px-4 py-3 text-right text-amber-600">
                                            -{formatCurrency(row.payableIncomeTax)}
                                        </td>
                                        <td className="px-4 py-3 text-right text-amber-600">
                                            -{formatCurrency(row.payableStampTax)}
                                        </td>
                                        <td className="px-4 py-3 text-right font-bold text-indigo-700 bg-indigo-50/30">
                                            {formatCurrency(row.netSalary)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <CardContent className="pt-4 pb-6">
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            <span>
                                Gelir Vergisi ve Damga Vergisi tutarları, Asgari Ücret İstisnası düşüldükten sonra kalan ve ödenen net vergi tutarlarıdır.
                            </span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
