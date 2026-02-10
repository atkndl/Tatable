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
    const addShift = useShiftStore((state) => state.addShift);
    const templates = useShiftStore((state) => state.templates);
    const addTemplate = useShiftStore((state) => state.addTemplate);
    const removeTemplate = useShiftStore((state) => state.removeTemplate);

    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [branch, setBranch] = useState<Branch>("Ümraniye");
    const [level, setLevel] = useState<Level>("1");
    const [hours, setHours] = useState<string>("");
    const [type, setType] = useState<ShiftType>("Tek");

    // Template State
    const [isTemplateMode, setIsTemplateMode] = useState(false);
    const [templateName, setTemplateName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!hours || isNaN(Number(hours))) return;

        // Save as template if requested
        if (isTemplateMode && templateName) {
            addTemplate({
                name: templateName,
                branch,
                level,
                type,
                hours: Number(hours),
            });
            // Reset template mode after saving? Or keep it? Let's reset.
            setIsTemplateMode(false);
            setTemplateName("");
        }

        addShift({
            date,
            branch,
            level,
            hours: Number(hours),
            type,
        });

        // Reset some fields
        setHours("");
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
                    {/* Recent Templates Dropdown could go here or inside content */}
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
                    <div className="col-span-2 space-y-2">
                        <Label htmlFor="date" className="text-slate-700">Tarih</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="bg-white border-slate-200 focus:border-indigo-500 text-slate-900"
                        />
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
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="E">E</option>
                            <option value="C">C</option>
                            <option value="P">P</option>
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

                    <Button type="submit" className="col-span-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2 shadow-sm">
                        <Plus className="w-4 h-4 mr-2" /> Kaydet
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
