"use client";

import { useState } from "react";
import { useShiftStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Branch, Level, ShiftType } from "@/lib/types";
import { CalendarIcon, Plus } from "lucide-react";

export function AddShiftForm() {
    const addShifts = useShiftStore((state) => state.addShifts);
    const templates = useShiftStore((state) => state.templates);
    const addTemplate = useShiftStore((state) => state.addTemplate);
    const removeTemplate = useShiftStore((state) => state.removeTemplate);


    const [dates, setDates] = useState<string[]>([new Date().toISOString().split('T')[0]]);

    // Date Picker State
    const [pickerDate, setPickerDate] = useState(new Date()); // For navigation

    // Generate days for the picker
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Mon=0, Sun=6
    };

    const pickerYear = pickerDate.getFullYear();
    const pickerMonth = pickerDate.getMonth();
    const pickerDaysInMonth = getDaysInMonth(pickerYear, pickerMonth);
    const pickerFirstDay = getFirstDayOfMonth(pickerYear, pickerMonth);
    const pickerBlanks = Array.from({ length: pickerFirstDay }, (_, i) => i);
    const pickerDays = Array.from({ length: pickerDaysInMonth }, (_, i) => i + 1);

    const toggleDate = (day: number) => {
        // Create date object correctly handling local time
        const d = new Date(pickerYear, pickerMonth, day);
        // Using strict formatting to avoid timezone shifts
        const dateStr = `${pickerYear}-${String(pickerMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        if (dates.includes(dateStr)) {
            setDates(dates.filter(d => d !== dateStr));
        } else {
            setDates([...dates, dateStr].sort());
        }
    };

    const changePickerMonth = (offset: number) => {
        const newDate = new Date(pickerDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setPickerDate(newDate);
    };

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    const [branch, setBranch] = useState<Branch>("Ümraniye");
    const [level, setLevel] = useState<Level>("Seviye 1");
    const [hours, setHours] = useState<string>("");
    const [type, setType] = useState<ShiftType>("Tek");

    // Template State
    const [isTemplateMode, setIsTemplateMode] = useState(false);
    const [templateName, setTemplateName] = useState("");



    const handleRemoveDate = (dateToRemove: string) => {
        setDates(dates.filter(d => d !== dateToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!hours || isNaN(Number(hours))) return;
        if (dates.length === 0) return;

        // Save as template if requested
        if (isTemplateMode && templateName) {
            addTemplate({
                name: templateName,
                branch,
                level,
                type,
                hours: Number(hours),
            });
            setIsTemplateMode(false);
            setTemplateName("");
        }

        addShifts(dates, {
            branch,
            level,
            hours: Number(hours),
            type,
        });

        // Reset some fields
        setHours("");
        setDates([new Date().toISOString().split('T')[0]]);
    };

    const handleTemplateSelect = (templateId: string) => {
        const template = templates.find(t => t.id === templateId);
        if (template) {
            setBranch(template.branch);
            setLevel(template.level);
            setType(template.type);
            setHours(template.hours.toString());
        }
    };

    return (
        <Card className="w-full bg-white border-slate-200 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-slate-900">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-indigo-600" />
                        Yeni Mesai Ekle
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Template Selector */}
                {templates.length > 0 && (
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <Label className="text-xs text-slate-500 mb-2 block">Taslaklardan Hızlı Ekle</Label>
                        <div className="flex flex-wrap gap-2">
                            {templates.map(t => (
                                <div key={t.id} className="group flex items-center gap-1">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs bg-white border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-200"
                                        onClick={() => handleTemplateSelect(t.id)}
                                    >
                                        {t.name}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeTemplate(t.id)}
                                    >
                                        <span className="sr-only">Sil</span>
                                        &times;
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* NEW: Inline Multi-Date Picker */}
                    <div className="col-span-2 space-y-2">
                        <Label className="text-slate-700">Tarih Seçimi ({dates.length} gün)</Label>
                        <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                            {/* Picker Header */}
                            <div className="flex items-center justify-between mb-3 px-1">
                                <button type="button" onClick={() => changePickerMonth(-1)} className="p-1 hover:bg-slate-200 rounded text-slate-500 font-bold">
                                    &lt;
                                </button>
                                <span className="text-sm font-semibold text-slate-700">
                                    {monthNames[pickerMonth]} {pickerYear}
                                </span>
                                <button type="button" onClick={() => changePickerMonth(1)} className="p-1 hover:bg-slate-200 rounded text-slate-500 font-bold">
                                    &gt;
                                </button>
                            </div>

                            {/* Picker Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                                {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pa"].map(d => (
                                    <div key={d} className="text-[10px] uppercase text-slate-400 font-bold">{d}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {pickerBlanks.map((b, i) => <div key={`b-${i}`} />)}
                                {pickerDays.map(day => {
                                    const dateStr = `${pickerYear}-${String(pickerMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                    const isSelected = dates.includes(dateStr);

                                    // Check if it's today
                                    const todayStr = new Date().toISOString().split('T')[0];
                                    const isToday = dateStr === todayStr;

                                    return (
                                        <button
                                            key={day}
                                            type="button"
                                            onClick={() => toggleDate(day)}
                                            className={`
                                                h-8 rounded text-sm font-medium transition-all flex items-center justify-center relative
                                                ${isSelected
                                                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 scale-105'
                                                    : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                                                }
                                                ${isToday && !isSelected ? 'ring-2 ring-indigo-200 border-indigo-300 z-10' : ''}
                                            `}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                            {/* Selected Dates Summary (Mini List) */}
                            {dates.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-1">
                                    <span className="text-xs text-slate-400 block w-full mb-1">Seçili Tarihler:</span>
                                    {dates.map(d => (
                                        <span key={d} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-medium text-slate-500">
                                            {new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="branch" className="text-slate-700">Şube</Label>
                        <Select
                            id="branch"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value as Branch)}
                            className="bg-white border-slate-200 text-slate-900"
                        >
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
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="level" className="text-slate-700">Seviye</Label>
                        <Select
                            id="level"
                            value={level}
                            onChange={(e) => setLevel(e.target.value as Level)}
                            className="bg-white border-slate-200 text-slate-900"
                        >
                            <option value="Seviye 1">Seviye 1</option>
                            <option value="Seviye 2">Seviye 2</option>
                            <option value="Seviye 3">Seviye 3</option>
                            <option value="C#">C#</option>
                            <option value="Python">Python</option>
                            <option value="Eğitim">Eğitim</option>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hours" className="text-slate-700">Saat</Label>
                        <Input
                            id="hours"
                            type="number"
                            placeholder="3"
                            step="0.5"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            required
                            className="bg-white border-slate-200 text-slate-900"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-slate-700">Tip</Label>
                        <Select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value as ShiftType)}
                            className="bg-white border-slate-200 text-slate-900"
                        >
                            <option value="Tek">Tek</option>
                            <option value="Çift">Çift</option>
                        </Select>
                    </div>

                    {/* Template Checkbox */}
                    <div className="col-span-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                id="saveTemplate"
                                checked={isTemplateMode}
                                onChange={(e) => setIsTemplateMode(e.target.checked)}
                                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <Label htmlFor="saveTemplate" className="text-slate-600 text-sm cursor-pointer select-none">
                                Bu kaydı taslak olarak sakla
                            </Label>
                        </div>
                        {isTemplateMode && (
                            <Input
                                placeholder="Taslak adı (örn: Standart Fatih)"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                className="bg-slate-50 border-slate-200 text-sm h-8"
                                required={isTemplateMode}
                            />
                        )}
                    </div>

                    <Button type="submit" className="col-span-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2 shadow-sm" disabled={dates.length === 0}>
                        <Plus className="w-4 h-4 mr-2" /> {dates.length > 1 ? `${dates.length} Mesai Kaydet` : 'Kaydet'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
