"use client";

import { useShiftStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Shift, Branch, Level, ShiftType } from "@/lib/types";

export function ShiftList() {
    const { shifts, removeShift, updateShift, filterYear, filterMonth } = useShiftStore();
    const [mode, setMode] = useState<"view" | "edit" | "delete">("view");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Shift>>({});

    const filteredShifts = shifts.filter(s => {
        const d = new Date(s.date);
        return d.getFullYear() === filterYear && d.getMonth() === filterMonth;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleEditClick = (shift: Shift) => {
        setEditingId(shift.id);
        setEditForm(shift);
    };

    const handleSave = () => {
        if (editingId && editForm) {
            updateShift(editingId, {
                date: editForm.date,
                branch: editForm.branch,
                level: editForm.level,
                hours: Number(editForm.hours),
                type: editForm.type,
            });
            setEditingId(null);
            setEditForm({});
        }
    };

    const sortedShifts = filteredShifts; // Already sorted above

    return (
        <div className="space-y-4">
            {/* Mode Toggles */}
            <div className="flex justify-end gap-2">
                <Button
                    variant={mode === "edit" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMode(mode === "edit" ? "view" : "edit")}
                    className={mode === "edit" ? "bg-amber-600 hover:bg-amber-700 text-white" : "border-slate-200 text-slate-500 hover:text-slate-900"}
                >
                    <Edit2 className="w-4 h-4 mr-2" /> Düzenle
                </Button>
                <Button
                    variant={mode === "delete" ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setMode(mode === "delete" ? "view" : "delete")}
                    className={mode === "delete" ? "bg-red-600 hover:bg-red-700 text-white" : "border-slate-200 text-slate-500 hover:text-slate-900"}
                >
                    <Trash2 className="w-4 h-4 mr-2" /> Sil
                </Button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-sm text-left text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Tarih</th>
                            <th className="px-6 py-3 font-semibold">Şube</th>
                            <th className="px-6 py-3 font-semibold">Seviye</th>
                            <th className="px-6 py-3 font-semibold">Tip</th>
                            <th className="px-6 py-3 text-right font-semibold">Saat</th>
                            <th className="px-6 py-3 text-right font-semibold">Kazanç</th>
                            {(mode !== "view" || editingId) && <th className="px-6 py-3 text-center font-semibold">İşlem</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedShifts.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                                    Bu ay için kayıt bulunamadı.
                                </td>
                            </tr>
                        ) : sortedShifts.map((shift) => (
                            <tr key={shift.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                {editingId === shift.id ? (
                                    // Edit Mode Row
                                    <>
                                        <td className="px-2 py-4"><Input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} className="h-8 w-32 bg-white text-slate-900 border-slate-200" /></td>
                                        <td className="px-2 py-4">
                                            <Select value={editForm.branch} onChange={(e) => setEditForm({ ...editForm, branch: e.target.value as Branch })} className="h-8 bg-white text-slate-900 border-slate-200">
                                                <option value="Ümraniye">Ümraniye</option>
                                                <option value="Küçükçekmece">Küçükçekmece</option>
                                                <option value="Fatih">Fatih</option>
                                                <option value="Eğitim">Eğitim</option>
                                                <option value="Bakırköy">Bakırköy</option>
                                                <option value="Beyoğlu">Beyoğlu</option>
                                                <option value="Esenler">Esenler</option>
                                                <option value="Esenyurt">Esenyurt</option>
                                                <option value="Güngören">Güngören</option>
                                                <option value="Tuzla">Tuzla</option>
                                            </Select>
                                        </td>
                                        <td className="px-2 py-4">
                                            <Select value={editForm.level} onChange={(e) => setEditForm({ ...editForm, level: e.target.value as Level })} className="h-8 bg-white text-slate-900 border-slate-200">
                                                <option value="1">1</option>
                                                <option value="3">3</option>
                                                <option value="E">E</option>
                                                <option value="C">C</option>
                                                <option value="P">P</option>
                                            </Select>
                                        </td>
                                        <td className="px-2 py-4">
                                            <Select value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value as ShiftType })} className="h-8 bg-white text-slate-900 border-slate-200">
                                                <option value="Tek">Tek</option>
                                                <option value="Çift">Çift</option>
                                            </Select>
                                        </td>
                                        <td className="px-2 py-4"><Input type="number" value={editForm.hours} onChange={(e) => setEditForm({ ...editForm, hours: Number(e.target.value) })} className="h-8 w-16 text-right bg-white text-slate-900 border-slate-200" /></td>
                                        <td className="px-6 py-4 text-right text-slate-400">-</td>
                                        <td className="px-2 py-4 text-center flex justify-center gap-1">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50" onClick={handleSave}><Check className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:bg-slate-100" onClick={() => setEditingId(null)}><X className="w-4 h-4" /></Button>
                                        </td>
                                    </>
                                ) : (
                                    // View Mode Row
                                    <>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {new Date(shift.date).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="px-6 py-4">{shift.branch}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                                                {shift.level}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{shift.type}</td>
                                        <td className="px-6 py-4 text-right font-medium text-emerald-600">{shift.hours}s</td>
                                        <td className="px-6 py-4 text-right font-medium text-slate-900">
                                            {formatCurrency(shift.totalSalary)}
                                        </td>

                                        {/* Actions Column based on Mode */}
                                        {mode === "edit" && (
                                            <td className="px-6 py-4 text-center">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-amber-600 hover:bg-amber-50" onClick={() => handleEditClick(shift)}>
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        )}
                                        {mode === "delete" && (
                                            <td className="px-6 py-4 text-center">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-50" onClick={() => removeShift(shift.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        )}
                                        {mode === "view" && editingId === null && null}
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
