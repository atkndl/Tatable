"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { 
    BookOpen, 
    ArrowLeft, 
    Clock, 
    Layers, 
    GraduationCap, 
    Code2, 
    ExternalLink, 
    Copy, 
    Check, 
    Terminal, 
    FileText, 
    Sparkles, 
    Maximize2, 
    Minimize2, 
    Edit3, 
    Save, 
    FileCode, 
    ListChecks,
    Sun,
    Moon,
    Plus,
    Trash2,
    RotateCcw,
    X,
    Info,
    Cpu,
    Gamepad2,
    FileQuestion,
    MoreVertical,
    Columns,
    ChevronUp,
    ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LessonPlansProps {
    onBackToHub: () => void;
    onSwitchToMesai: () => void;
}

import { 
    INITIAL_CURRICULUM, 
    LevelType, 
    ContentType, 
    PlanTab, 
    WeekPlan 
} from "@/lib/curriculumData";

import { 
    COLAB_NOTEBOOKS, 
    ColabNotebook, 
    ColabCell 
} from "@/lib/colabData";

// Helper: converts a Google Docs edit URL to an iframe-embeddable preview URL
function getDocEmbedUrl(url: string): string {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.includes("/preview")) return trimmed;
    if (trimmed.includes("/edit")) return trimmed.replace(/\/edit(\?.*)?$/, "/preview");
    if (trimmed.includes("docs.google.com/document/d/")) return trimmed.replace(/\/$/, "") + "/preview";
    return trimmed;
}

// Helper: Renders markdown text from Colab cells
function renderMarkdownCell(content: string, isLight: boolean) {
    const lines = content.split("\n");
    return (
        <div className="space-y-1.5 text-xs md:text-sm font-sans leading-relaxed">
            {lines.map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={idx} className="h-0.5" />;
                if (trimmed.startsWith("# ")) {
                    return (
                        <h2 key={idx} className={`text-sm md:text-base font-extrabold pb-1 border-b ${
                            isLight ? "text-indigo-950 border-amber-200" : "text-amber-400 border-amber-900/40"
                        }`}>
                            {trimmed.replace(/^#\s+/, "")}
                        </h2>
                    );
                }
                if (trimmed.startsWith("## ")) {
                    return (
                        <h3 key={idx} className={`text-xs md:text-sm font-bold mt-1.5 ${
                            isLight ? "text-slate-900" : "text-amber-300"
                        }`}>
                            {trimmed.replace(/^##\s+/, "")}
                        </h3>
                    );
                }
                if (trimmed.startsWith("### ")) {
                    return (
                        <h4 key={idx} className={`text-xs font-bold ${
                            isLight ? "text-slate-800" : "text-slate-200"
                        }`}>
                            {trimmed.replace(/^###\s+/, "")}
                        </h4>
                    );
                }
                if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                    return (
                        <div key={idx} className="flex items-start gap-2 pl-2">
                            <span className="text-amber-500 font-bold">•</span>
                            <span className={isLight ? "text-slate-800 font-medium" : "text-slate-200"}>
                                {trimmed.replace(/^[-*]\s+/, "")}
                            </span>
                        </div>
                    );
                }
                return (
                    <p key={idx} className={isLight ? "text-slate-800 font-medium" : "text-slate-300"}>
                        {trimmed}
                    </p>
                );
            })}
        </div>
    );
}

export function LessonPlans({ onBackToHub, onSwitchToMesai }: LessonPlansProps) {
    const [selectedLevel, setSelectedLevel] = useState<LevelType>("Seviye 3");
    const [selectedWeek, setSelectedWeek] = useState<number>(1);
    
    // Theme Mode: "dark" or "light"
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    // Custom doc URLs stored in localStorage
    const [customDocUrls, setCustomDocUrls] = useState<Record<string, string>>({});
    const [isEditingDocUrl, setIsEditingDocUrl] = useState(false);
    const [inputDocUrl, setInputDocUrl] = useState("");

    // Custom week plans edited by user directly on the platform
    const [customPlans, setCustomPlans] = useState<Record<string, WeekPlan>>({});
    
    // Edit mode for right-side panel
    const [isEditingContent, setIsEditingContent] = useState(false);
    const [editForm, setEditForm] = useState<{
        title: string;
        summary: string;
        category: string;
        tabs: PlanTab[];
    }>({ title: "", summary: "", category: "Genel", tabs: [] });

    // Active tab in right-side code/AI compiler panel
    const [activeTabId, setActiveTabId] = useState<string>("");
    const [copied, setCopied] = useState(false);
    const [showTerminal, setShowTerminal] = useState(true);

    // Fullscreen expansion modes (none, left, right)
    const [expandMode, setExpandMode] = useState<"none" | "left" | "right">("none");

    // Compact navigation toggle (for saving vertical space and expanding code/docs area)
    const [isNavCompact, setIsNavCompact] = useState(false);

    // 3-dots dropdown menu states for Left & Right panels
    const [leftMenuOpen, setLeftMenuOpen] = useState(false);
    const [rightMenuOpen, setRightMenuOpen] = useState(false);

    // Close 3-dots menus on outside click
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-dropdown="left-menu"]')) {
                setLeftMenuOpen(false);
            }
            if (!target.closest('[data-dropdown="right-menu"]')) {
                setRightMenuOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    // Google Colab Dropdown state for Seviye 3: "none" | "hafta-1" | "hafta-2" | "hafta-3" | "hafta-4" | "all"
    const [selectedColab, setSelectedColab] = useState<string>("none");
    const [colabViewMode, setColabViewMode] = useState<"notebook" | "code">("notebook");
    const [copiedColab, setCopiedColab] = useState(false);
    const [copiedCellId, setCopiedCellId] = useState<string | null>(null);

    // Reset Colab selection when level changes away from Seviye 3
    useEffect(() => {
        if (selectedLevel !== "Seviye 3") {
            setSelectedColab("none");
        }
    }, [selectedLevel]);

    // Active Colab Notebook object
    const currentColabNotebook = useMemo(() => {
        if (selectedColab === "none" || selectedColab === "all") return null;
        return COLAB_NOTEBOOKS[selectedColab] || null;
    }, [selectedColab]);

    // All colabs merged code
    const allColabsMergedCode = useMemo(() => {
        return ["hafta-1", "hafta-2", "hafta-3", "hafta-4"]
            .map((id) => {
                const nb = COLAB_NOTEBOOKS[id];
                return `# ${"=".repeat(50)}\n# ${nb.title.toUpperCase()}\n# Colab URL: ${nb.url}\n# ${"=".repeat(50)}\n\n${nb.mergedCode}`;
            })
            .join("\n\n\n");
    }, []);

    const handleCopyColab = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedColab(true);
        setTimeout(() => setCopiedColab(false), 2000);
    };

    const handleCopySingleCell = (code: string, cellId: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCellId(cellId);
        setTimeout(() => setCopiedCellId(null), 1800);
    };

    // Load theme, custom doc URLs and custom plans from localStorage
    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem("lesson_plans_theme");
            if (savedTheme === "light" || savedTheme === "dark") {
                setTheme(savedTheme);
            }

            const savedUrls = localStorage.getItem("lesson_plan_doc_urls");
            if (savedUrls) {
                setCustomDocUrls(JSON.parse(savedUrls));
            }

            const savedPlans = localStorage.getItem("lesson_plan_custom_contents");
            if (savedPlans) {
                setCustomPlans(JSON.parse(savedPlans));
            }
        } catch (e) {
            console.error("Failed to load local storage data:", e);
        }
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        try {
            localStorage.setItem("lesson_plans_theme", nextTheme);
        } catch (e) {
            console.error(e);
        }
    };

    // Current plan calculation
    const planKey = `${selectedLevel}-W${selectedWeek}`;
    const currentWeekPlan = useMemo(() => {
        if (customPlans[planKey]) {
            return customPlans[planKey];
        }
        const list = INITIAL_CURRICULUM[selectedLevel] || [];
        const found = list.find(p => p.week === selectedWeek);
        if (found) return found;
        return {
            week: selectedWeek,
            title: `Hafta ${selectedWeek} Ders Planı`,
            summary: "Henüz plan eklenmedi.",
            hasRealData: false,
            tabs: []
        };
    }, [selectedLevel, selectedWeek, customPlans, planKey]);

    // Active Google Docs URL (custom override or default)
    const effectiveDocUrl = customDocUrls[planKey] ?? currentWeekPlan.docUrl ?? "";
    const embedUrl = getDocEmbedUrl(effectiveDocUrl);

    // Sync active tab ID when week changes
    useEffect(() => {
        if (currentWeekPlan.tabs && currentWeekPlan.tabs.length > 0) {
            setActiveTabId(currentWeekPlan.tabs[0].id);
        } else {
            setActiveTabId("");
        }
        setInputDocUrl(effectiveDocUrl);
        setIsEditingDocUrl(false);
        setIsEditingContent(false);
        setCopied(false);
    }, [selectedLevel, selectedWeek, currentWeekPlan, effectiveDocUrl]);

    // Active tab object
    const activeTab = useMemo(() => {
        return currentWeekPlan.tabs?.find(t => t.id === activeTabId) || currentWeekPlan.tabs?.[0] || null;
    }, [currentWeekPlan, activeTabId]);

    // Save custom Google Docs link
    const handleSaveDocUrl = () => {
        const next = { ...customDocUrls, [planKey]: inputDocUrl.trim() };
        setCustomDocUrls(next);
        try {
            localStorage.setItem("lesson_plan_doc_urls", JSON.stringify(next));
        } catch (e) {
            console.error(e);
        }
        setIsEditingDocUrl(false);
    };

    // Copy all saved Google Docs links to clipboard for AI Assistant
    const handleCopyAllDocUrls = () => {
        const allUrls: Record<string, string> = { ...customDocUrls };
        Object.entries(INITIAL_CURRICULUM).forEach(([lvl, weeks]) => {
            weeks.forEach((w) => {
                const k = `${lvl}-W${w.week}`;
                if (!allUrls[k] && w.docUrl) {
                    allUrls[k] = w.docUrl;
                }
            });
        });
        const entries = Object.entries(allUrls).filter(([_, url]) => Boolean(url && url.trim()));
        if (entries.length === 0) {
            alert("Henüz kayıtlı bir Google Docs linki bulunamadı. Lütfen önce link ekleyin.");
            return;
        }
        const formatted = entries
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, url]) => `${key}: ${url}`)
            .join("\n");
        navigator.clipboard.writeText(formatted);
        alert(`Toplam ${entries.length} adet ders planı linki panoya kopyalandı!\nŞimdi sohbete yapıştırabilirsiniz.`);
    };

    // Open Edit Mode for Right Content
    const handleStartEditing = () => {
        setEditForm({
            title: currentWeekPlan.title,
            summary: currentWeekPlan.summary,
            category: currentWeekPlan.category || "Genel",
            tabs: currentWeekPlan.tabs && currentWeekPlan.tabs.length > 0 
                ? JSON.parse(JSON.stringify(currentWeekPlan.tabs))
                : [
                    {
                        id: "tab_1",
                        title: "Ders İçeriği & Notlar",
                        type: "text",
                        filename: "icerik.md",
                        language: "markdown",
                        content: "# Bu Hafta Anlatılacaklar\n- Konu başlıkları ve açıklamaları buraya yazabilirsiniz."
                    }
                ]
        });
        setIsEditingContent(true);
    };

    // Save Content Changes
    const handleSaveContent = () => {
        const updatedPlan: WeekPlan = {
            ...currentWeekPlan,
            title: editForm.title.trim() || `Hafta ${selectedWeek} Planı`,
            summary: editForm.summary.trim(),
            category: editForm.category.trim(),
            hasRealData: true,
            tabs: editForm.tabs
        };

        const nextPlans = { ...customPlans, [planKey]: updatedPlan };
        setCustomPlans(nextPlans);

        try {
            localStorage.setItem("lesson_plan_custom_contents", JSON.stringify(nextPlans));
        } catch (e) {
            console.error(e);
        }

        setIsEditingContent(false);
        if (updatedPlan.tabs.length > 0) {
            setActiveTabId(updatedPlan.tabs[0].id);
        }
    };

    // Reset Custom Content for current week
    const handleResetContent = () => {
        if (!confirm("Bu hafta için yaptığınız özel düzenlemeleri sıfırlamak istediğinize emin misiniz?")) return;
        const nextPlans = { ...customPlans };
        delete nextPlans[planKey];
        setCustomPlans(nextPlans);
        try {
            localStorage.setItem("lesson_plan_custom_contents", JSON.stringify(nextPlans));
        } catch (e) {
            console.error(e);
        }
        setIsEditingContent(false);
    };

    // Add new tab in edit form
    const handleAddTab = (type: ContentType) => {
        const newId = `tab_${Date.now()}`;
        const newTab: PlanTab = {
            id: newId,
            title: type === "code" 
                ? "kod_ornek.py" 
                : type === "arduino" 
                ? "arduino_devre.ino" 
                : type === "unity" 
                ? "GameController.cs" 
                : type === "tasks"
                ? "Gorevler.md"
                : type === "notes"
                ? "Ogretmen_Notlari.md"
                : "Etkinlik & Bilgiler",
            type: type,
            filename: type === "code" 
                ? "main.py" 
                : type === "arduino" 
                ? "circuit.ino" 
                : type === "unity" 
                ? "script.cs" 
                : type === "tasks"
                ? "tasks.md"
                : type === "notes"
                ? "notlar.md"
                : "icerik.md",
            language: type === "code" 
                ? "python" 
                : type === "arduino" 
                ? "cpp" 
                : type === "unity" 
                ? "csharp" 
                : "markdown",
            content: type === "code" 
                ? "# Örnek Python Kodunuzu buraya yazın\nprint('Merhaba!')" 
                : type === "arduino"
                ? "// Arduino C++ Devre Kodu\nvoid setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}"
                : type === "unity"
                ? "using UnityEngine;\n\npublic class Controller : MonoBehaviour {\n    void Start() {\n        Debug.Log(\"Oyun Başladı\");\n    }\n\n    void Update() {\n        // Oyun döngüsü\n    }\n}"
                : type === "tasks"
                ? "### Haftalık Öğrenci Görevleri\n- [ ] 1. Temel Seviye Görev\n- [ ] 2. İleri Seviye Görev\n- [ ] 3. Meydan Okuma (Bonus)"
                : type === "notes"
                ? "### Eğitmen İpuçları & Dikkat Edilecek Noktalar\n- Öğrencilere bu hafta aktarılacak kritik noktalar..."
                : "### Ders Açıklamaları ve Etkinlikler\n- Bu derste uygulanacak etkinlikler ve açıklamalar...",
            output: type === "code" ? ">>> python3 main.py\nMerhaba!" : undefined
        };
        setEditForm(prev => ({ ...prev, tabs: [...prev.tabs, newTab] }));
    };

    // Delete a tab in edit form
    const handleDeleteTab = (index: number) => {
        const tabToDelete = editForm.tabs[index];
        const tabName = tabToDelete?.title || `Sekme ${index + 1}`;
        if (!confirm(`"${tabName}" sekmesini silmek istediğinize emin misiniz?`)) {
            return;
        }
        setEditForm(prev => ({
            ...prev,
            tabs: prev.tabs.filter((_, i) => i !== index)
        }));
    };

    // Copy active content
    const handleCopy = () => {
        if (!activeTab) return;
        navigator.clipboard.writeText(activeTab.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Syntax colorizer helper for code lines (adapts to light & dark mode)
    const renderColoredLine = (line: string, isLight: boolean) => {
        if (!line) return <span>&nbsp;</span>;

        const trimmed = line.trimStart();
        if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
            return <span className={isLight ? "text-slate-500 italic font-mono" : "text-slate-400 italic font-mono"}>{line}</span>;
        }

        const keywords = [
            "using", "class", "public", "private", "protected", "static", "void", "int", "string", 
            "bool", "double", "float", "return", "if", "else", "for", "foreach", "while", "new", 
            "def", "import", "from", "try", "catch", "virtual", "override", "global", "setup", "loop", "pinMode", "digitalWrite"
        ];
        
        const parts = line.split(/(\"[^\"]*\"|\'[^\']*\'|[a-zA-Z_][a-zA-Z0-9_]*|==|!=|<=|>=|=>|\/\/.+)/g);

        return (
            <span>
                {parts.map((token, i) => {
                    if (!token) return null;
                    if (token.startsWith("//") || token.startsWith("#")) {
                        return <span key={i} className={isLight ? "text-slate-500 italic" : "text-slate-400 italic"}>{token}</span>;
                    }
                    if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
                        return <span key={i} className={isLight ? "text-emerald-700 font-medium" : "text-emerald-400 font-medium"}>{token}</span>;
                    }
                    if (keywords.includes(token)) {
                        return <span key={i} className={isLight ? "text-indigo-700 font-bold" : "text-indigo-400 font-semibold"}>{token}</span>;
                    }
                    if (["Console", "List", "Math", "Program", "Karakter", "Serial", "GameObject", "MonoBehaviour", "Debug"].includes(token)) {
                        return <span key={i} className={isLight ? "text-sky-700 font-medium" : "text-sky-300 font-medium"}>{token}</span>;
                    }
                    if (["WriteLine", "SelamVer", "SkorHesapla", "Main", "Topla", "Add", "print", "Log", "delay"].includes(token)) {
                        return <span key={i} className={isLight ? "text-amber-700" : "text-amber-300"}>{token}</span>;
                    }
                    if (/^\d+(\.\d+)?$/.test(token)) {
                        return <span key={i} className={isLight ? "text-orange-700" : "text-orange-300"}>{token}</span>;
                    }
                    return <span key={i} className={isLight ? "text-slate-800" : "text-slate-200"}>{token}</span>;
                })}
            </span>
        );
    };

    const levels: LevelType[] = ["Seviye 1", "Seviye 2", "Seviye 3"];
    const isLight = theme === "light";

    // Tab Type Icon Helper
    const getTabIcon = (type: ContentType) => {
        switch (type) {
            case "code": return <FileCode className="w-3.5 h-3.5 text-indigo-400" />;
            case "arduino": return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
            case "unity": return <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />;
            case "tasks": return <ListChecks className="w-3.5 h-3.5 text-amber-400" />;
            case "notes": return <Sparkles className="w-3.5 h-3.5 text-violet-400" />;
            default: return <Info className="w-3.5 h-3.5 text-sky-400" />;
        }
    };

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 select-text ${
            isLight ? "bg-slate-100 text-slate-900" : "bg-slate-900 text-slate-100"
        }`}>
            
            {/* Top Navigation & Controls Bar */}
            <header className={`border-b sticky top-0 z-40 px-4 py-2.5 shrink-0 backdrop-blur-md transition-colors ${
                isLight 
                    ? "bg-white/95 border-slate-200 text-slate-900 shadow-xs" 
                    : "bg-slate-950/80 border-slate-800 text-white"
            }`}>
                <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-3">
                    
                    {/* Left: Back & Title */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBackToHub}
                            className={`h-8 px-2.5 rounded-lg text-xs font-semibold transition-colors ${
                                isLight 
                                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" 
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-1.5" />
                            Ana Menü
                        </Button>
                        <div className={`h-4 w-px ${isLight ? "bg-slate-200" : "bg-slate-800"}`} />
                        <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                isLight ? "bg-indigo-50 border border-indigo-200 text-indigo-600" : "bg-indigo-600/20 border border-indigo-500/30 text-indigo-400"
                            }`}>
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <h1 className="text-sm md:text-base font-extrabold tracking-tight">
                                Ders Planları
                            </h1>
                        </div>
                    </div>

                    {/* Right: Layout Switcher, Theme Toggle, Mesai Button */}
                    <div className="flex items-center gap-2">
                        {/* Compact Split View Toggles */}
                        <div className={`hidden sm:flex items-center p-0.5 rounded-lg border text-xs ${
                            isLight ? "bg-slate-100 border-slate-200" : "bg-slate-900 border-slate-800"
                        }`}>
                            <button
                                type="button"
                                onClick={() => setExpandMode("none")}
                                title="İki Paneli Gör"
                                className={`px-2 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                                    expandMode === "none"
                                        ? "bg-indigo-600 text-white shadow-xs"
                                        : isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                <Columns className="w-3.5 h-3.5" />
                                <span className="hidden md:inline">İki Panel</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setExpandMode("left")}
                                title="Yalnızca Plan (Sol)"
                                className={`px-2 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                                    expandMode === "left"
                                        ? "bg-indigo-600 text-white shadow-xs"
                                        : isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                <FileText className="w-3.5 h-3.5" />
                                <span className="hidden md:inline">Yalnız Plan</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setExpandMode("right")}
                                title="Yalnızca İçerik (Sağ)"
                                className={`px-2 py-1 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                                    expandMode === "right"
                                        ? "bg-indigo-600 text-white shadow-xs"
                                        : isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                <Code2 className="w-3.5 h-3.5" />
                                <span className="hidden md:inline">Yalnız Kod</span>
                            </button>
                        </div>

                        {/* Theme Toggle Button with Sun/Moon */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleTheme}
                            className={`h-8 px-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                                isLight 
                                    ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900" 
                                    : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                            title={isLight ? "Koyu Mod'a geç" : "Açık (Gündüz) Mod'a geç"}
                        >
                            {isLight ? (
                                <>
                                    <Moon className="w-3.5 h-3.5 text-indigo-600" />
                                    <span className="hidden sm:inline">Koyu</span>
                                </>
                            ) : (
                                <>
                                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                                    <span className="hidden sm:inline">Açık</span>
                                </>
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onSwitchToMesai}
                            className={`text-xs h-8 font-semibold ${
                                isLight 
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" 
                                    : "bg-slate-900 border-slate-800 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300"
                            }`}
                        >
                            <Clock className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                            Mesai Takip
                        </Button>
                    </div>

                </div>
            </header>

            {/* Streamlined & Responsive Navigation Bar (Seviye, Hafta, Başlık & Özet) */}
            <div className={`border-b px-3 sm:px-4 shrink-0 transition-all duration-200 ${
                isLight ? "bg-white/80 border-slate-200" : "bg-slate-950/60 border-slate-800/80"
            } ${isNavCompact ? "py-1.5" : "py-2.5"}`}>
                <div className="max-w-[1920px] mx-auto">
                    
                    {/* MOD 1: KOMPAKT (TEK SATIR) GÖRÜNÜM */}
                    {isNavCompact ? (
                        <div className="flex items-center justify-between gap-2.5 flex-wrap">
                            {/* Left: Compact Seviye & Hafta */}
                            <div className="flex items-center gap-2 min-w-0 flex-wrap flex-1">
                                {/* Seviye Butonları */}
                                <div className={`inline-flex items-center p-0.5 rounded-lg border shadow-2xs shrink-0 ${
                                    isLight ? "bg-slate-100 border-slate-200" : "bg-slate-900 border-slate-800"
                                }`}>
                                    {levels.map((lvl) => {
                                        const isSelected = selectedLevel === lvl;
                                        return (
                                            <button
                                                key={lvl}
                                                type="button"
                                                onClick={() => setSelectedLevel(lvl)}
                                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                                                    isSelected
                                                        ? lvl === "Seviye 1"
                                                            ? "bg-emerald-600 text-white shadow-2xs"
                                                            : lvl === "Seviye 2"
                                                            ? "bg-blue-600 text-white shadow-2xs"
                                                            : "bg-indigo-600 text-white shadow-2xs"
                                                        : isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
                                                }`}
                                            >
                                                {lvl}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className={`hidden sm:block h-4 w-px ${isLight ? "bg-slate-300" : "bg-slate-700"}`} />

                                {/* Hafta Butonları (Kompakt H1-H8) */}
                                <div className={`inline-flex items-center p-0.5 rounded-lg border gap-0.5 shrink-0 ${
                                    isLight ? "bg-slate-100/90 border-slate-200" : "bg-slate-900/80 border-slate-800"
                                }`}>
                                    {(INITIAL_CURRICULUM[selectedLevel] || []).map((item) => {
                                        const isWeekSelected = selectedWeek === item.week;
                                        return (
                                            <button
                                                key={item.week}
                                                type="button"
                                                onClick={() => setSelectedWeek(item.week)}
                                                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                                                    isWeekSelected
                                                        ? "bg-indigo-600 text-white shadow-2xs"
                                                        : isLight ? "text-slate-600 hover:bg-white" : "text-slate-400 hover:bg-slate-800"
                                                }`}
                                            >
                                                H{item.week}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Başlık Özeti */}
                                <span className={`text-xs font-bold truncate max-w-md hidden md:inline-block ${
                                    isLight ? "text-slate-800" : "text-slate-200"
                                }`}>
                                    • {currentWeekPlan.title}
                                </span>
                            </div>

                            {/* Right: Genişlet Butonu */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setIsNavCompact(false)}
                                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md border transition-colors ${
                                        isLight 
                                            ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" 
                                            : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700"
                                    }`}
                                    title="Detaylı gezinme ve haftalık özeti görmek için genişlet"
                                >
                                    <ChevronDown className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Genişlet</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* MOD 2: GENİŞLETİLMİŞ VE YATAYDA DENGELİ GÖRÜNÜM */
                        <div className="space-y-2">
                            {/* Satır 1: Seviye Seçimi, Hafta Seçimi ve Aksiyonlar (Tüm genişliğe yayılır) */}
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                
                                {/* Sol: Seviye + Hafta Seçimleri */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                    {/* Seviye Seçimi */}
                                    <div className={`inline-flex items-center p-0.5 rounded-lg border shadow-2xs ${
                                        isLight ? "bg-slate-100 border-slate-200" : "bg-slate-900 border-slate-800"
                                    }`}>
                                        {levels.map((lvl) => {
                                            const isSelected = selectedLevel === lvl;
                                            return (
                                                <button
                                                    key={lvl}
                                                    type="button"
                                                    onClick={() => setSelectedLevel(lvl)}
                                                    className={`
                                                        px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5
                                                        ${isSelected
                                                            ? lvl === "Seviye 1" 
                                                                ? "bg-emerald-600 text-white shadow-2xs"
                                                                : lvl === "Seviye 2"
                                                                ? "bg-blue-600 text-white shadow-2xs"
                                                                : "bg-indigo-600 text-white shadow-2xs"
                                                            : isLight 
                                                                ? "text-slate-600 hover:text-slate-900 hover:bg-white" 
                                                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                                                        }
                                                    `}
                                                >
                                                    {lvl === "Seviye 1" && <Layers className="w-3 h-3" />}
                                                    {lvl === "Seviye 2" && <GraduationCap className="w-3 h-3" />}
                                                    {lvl === "Seviye 3" && <Code2 className="w-3 h-3" />}
                                                    <span>{lvl}</span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className={`hidden sm:block h-5 w-px ${isLight ? "bg-slate-200" : "bg-slate-800"}`} />

                                    {/* Hafta Seçimi */}
                                    <div className={`inline-flex items-center p-0.5 rounded-lg border flex-wrap gap-0.5 ${
                                        isLight ? "bg-slate-100/90 border-slate-200" : "bg-slate-900/80 border-slate-800"
                                    }`}>
                                        {(INITIAL_CURRICULUM[selectedLevel] || []).map((item) => {
                                            const isWeekSelected = selectedWeek === item.week;
                                            const key = `${selectedLevel}-W${item.week}`;
                                            const hasCustom = Boolean(customPlans[key]?.hasRealData || customDocUrls[key] || item.hasRealData);
                                            return (
                                                <button
                                                    key={item.week}
                                                    type="button"
                                                    onClick={() => setSelectedWeek(item.week)}
                                                    className={`
                                                        px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5
                                                        ${isWeekSelected
                                                            ? isLight 
                                                                ? "bg-indigo-600 text-white shadow-2xs font-bold" 
                                                                : "bg-indigo-500/30 text-indigo-200 border border-indigo-400/50 font-bold"
                                                            : isLight 
                                                                ? "text-slate-600 hover:bg-white hover:text-slate-900" 
                                                                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                                        }
                                                    `}
                                                >
                                                    <span>Hafta {item.week}</span>
                                                    {hasCustom && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="İçerik hazır" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Sağ: Daralt Butonu */}
                                <div className="flex items-center gap-2 shrink-0 ml-auto">
                                    <button
                                        type="button"
                                        onClick={() => setIsNavCompact(true)}
                                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md border transition-colors ${
                                            isLight 
                                                ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" 
                                                : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700"
                                        }`}
                                        title="Daha fazla çalışma alanı için gezinme çubuğunu daralt"
                                    >
                                        <ChevronUp className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Alanı Daralt</span>
                                    </button>
                                </div>
                            </div>

                            {/* Satır 2: Aktif Hafta Detayları & Sağ Boşluğu Dolduran Haftalık Hedef/Özet */}
                            <div className={`pt-2 border-t flex items-center justify-between gap-3 text-xs flex-wrap ${
                                isLight ? "border-slate-200/80" : "border-slate-800/80"
                            }`}>
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider shrink-0 ${
                                        isLight 
                                            ? "bg-indigo-100 text-indigo-950 border border-indigo-200" 
                                            : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                    }`}>
                                        {selectedLevel} • Hafta {currentWeekPlan.week}
                                    </span>

                                    <h2 className={`font-bold truncate text-xs sm:text-sm ${isLight ? "text-slate-900" : "text-slate-100"}`}>
                                        {currentWeekPlan.title}
                                    </h2>

                                    {currentWeekPlan.category && (
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 hidden md:inline-block ${
                                            isLight ? "bg-slate-200 text-slate-700" : "bg-slate-800 text-slate-300"
                                        }`}>
                                            {currentWeekPlan.category}
                                        </span>
                                    )}
                                </div>

                                {/* Sağ Boşluğu Dolduran Haftalık Kazanım / Hedef */}
                                {currentWeekPlan.summary && (
                                    <div className={`hidden lg:flex items-center gap-1.5 text-[11px] max-w-xl text-right truncate ${
                                        isLight ? "text-slate-500" : "text-slate-400"
                                    }`}>
                                        <span className="font-semibold text-slate-400 dark:text-slate-500 shrink-0">🎯 Hedef:</span>
                                        <span className="truncate italic">{currentWeekPlan.summary}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Main Content Area: Split Screen (Left: Google Docs, Right: Code/AI/Editor) */}
            <main className="flex-1 p-2 md:p-3 overflow-hidden">
                <div className={`
                    ${isNavCompact ? "h-[calc(100vh-130px)]" : "h-[calc(100vh-175px)]"} min-h-[500px]
                    grid gap-3 transition-all duration-200
                    ${expandMode === "left" 
                        ? "grid-cols-1" 
                        : expandMode === "right" 
                        ? "grid-cols-1" 
                        : "grid-cols-1 lg:grid-cols-2"
                    }
                `}>

                    {/* ======================================================== */}
                    {/* LEFT HALF: Google Docs Document Preview & Management     */}
                    {/* ======================================================== */}
                    {expandMode !== "right" && (
                        <div className={`rounded-xl border flex flex-col overflow-hidden shadow-sm transition-colors ${
                            isLight ? "bg-white border-slate-200" : "bg-slate-950 border-slate-800"
                        }`}>
                            
                            {/* Left Header */}
                            <div className={`border-b px-3 py-2 flex items-center justify-between gap-2 shrink-0 relative ${
                                selectedColab !== "none"
                                    ? isLight ? "bg-amber-50/90 border-amber-200" : "bg-[#1f1b13] border-amber-900/50"
                                    : isLight ? "bg-slate-50 border-slate-200" : "bg-slate-900/90 border-slate-800"
                            }`}>
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                                        selectedColab !== "none"
                                            ? "bg-amber-500/20 text-amber-500 font-bold"
                                            : isLight ? "bg-blue-100 text-blue-600" : "bg-blue-500/20 text-blue-400"
                                    }`}>
                                        {selectedColab !== "none" ? "⚡" : <FileText className="w-3.5 h-3.5" />}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className={`text-xs font-bold truncate ${
                                                selectedColab !== "none"
                                                    ? isLight ? "text-amber-950 font-extrabold" : "text-amber-300 font-extrabold"
                                                    : isLight ? "text-slate-800" : "text-slate-200"
                                            }`}>
                                                {selectedColab === "all" 
                                                    ? "Google Colab • Tüm Python Dersleri (Hafta 1-4)" 
                                                    : selectedColab !== "none" 
                                                    ? `Google Colab • ${currentColabNotebook?.title}` 
                                                    : "Haftalık Ders Planı (Google Docs)"}
                                            </span>
                                            {selectedColab === "none" && embedUrl && (
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Aktif Önizleme" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Colab/Docs Selector + Primary Link Button + 3-Dots Dropdown */}
                                <div className="flex items-center gap-1.5 shrink-0 relative">
                                    {/* Seviye 3: Google Docs / Colab Seçim Dropdown */}
                                    {selectedLevel === "Seviye 3" && (
                                        <select
                                            value={selectedColab}
                                            onChange={(e) => setSelectedColab(e.target.value)}
                                            className={`h-7 text-xs font-bold rounded-md px-2 outline-none cursor-pointer border transition-colors shadow-2xs ${
                                                selectedColab !== "none"
                                                    ? "bg-amber-500 text-white border-amber-600 hover:bg-amber-600"
                                                    : isLight
                                                    ? "bg-white text-slate-800 border-slate-300 hover:border-amber-400"
                                                    : "bg-slate-900 text-slate-200 border-slate-700 hover:border-amber-400"
                                            }`}
                                            title="Görüntülenecek içeriği seçin (Google Docs veya Python Colab)"
                                        >
                                            <option value="none" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium">
                                                📄 Google Docs Planı
                                            </option>
                                            <option value="hafta-1" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium">
                                                Python Hafta 1
                                            </option>
                                            <option value="hafta-2" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium">
                                                Python Hafta 2
                                            </option>
                                            <option value="hafta-3" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium">
                                                Python Hafta 3
                                            </option>
                                            <option value="hafta-4" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium">
                                                Python Hafta 4
                                            </option>
                                            <option value="all" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium">
                                                Tümü (Hafta 1-4)
                                            </option>
                                        </select>
                                    )}

                                    {selectedColab !== "none" ? (
                                        selectedColab !== "all" && currentColabNotebook?.url ? (
                                            <a
                                                href={currentColabNotebook.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white shadow-xs transition-colors"
                                                title="Google Colab'da Aç"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                <span>Colab&apos;da Aç</span>
                                            </a>
                                        ) : null
                                    ) : (
                                        effectiveDocUrl ? (
                                            <a
                                                href={effectiveDocUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                                                    isLight 
                                                        ? "bg-slate-200 text-slate-700 hover:bg-slate-300" 
                                                        : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                                                }`}
                                                title="Belgeyi yeni sekmede aç"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                <span>Sekmede Aç</span>
                                            </a>
                                        ) : null
                                    )}

                                    {/* 3-Dots Menu Trigger */}
                                    <div className="relative" data-dropdown="left-menu">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setLeftMenuOpen(!leftMenuOpen);
                                                setRightMenuOpen(false);
                                            }}
                                            className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                                                leftMenuOpen
                                                    ? isLight ? "bg-slate-300 text-slate-900" : "bg-slate-700 text-white"
                                                    : isLight ? "hover:bg-slate-200 text-slate-600" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                                            }`}
                                            title="Daha fazla seçenek"
                                        >
                                            <MoreVertical className="w-3.5 h-3.5" />
                                        </button>

                                        {/* Dropdown Popover */}
                                        {leftMenuOpen && (
                                            <div className={`absolute right-0 top-full mt-1 w-56 rounded-lg border shadow-xl py-1 z-50 text-xs ${
                                                isLight 
                                                    ? "bg-white border-slate-200 text-slate-800" 
                                                    : "bg-slate-900 border-slate-700 text-slate-200"
                                            }`}>
                                                {selectedColab !== "none" ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                handleCopyColab(selectedColab === "all" ? allColabsMergedCode : (currentColabNotebook?.mergedCode || ""));
                                                                setLeftMenuOpen(false);
                                                            }}
                                                            className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                                                                copiedColab ? "text-emerald-500 font-bold" : ""
                                                            }`}
                                                        >
                                                            {copiedColab ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-amber-500" />}
                                                            <span>{copiedColab ? "Kopyalandı!" : "Tüm Python Kodunu Kopyala"}</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setColabViewMode(colabViewMode === "notebook" ? "code" : "notebook");
                                                                setLeftMenuOpen(false);
                                                            }}
                                                            className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                        >
                                                            <FileCode className="w-3.5 h-3.5 text-indigo-500" />
                                                            <span>{colabViewMode === "notebook" ? "Ham Kod Görünümüne Geç" : "Notebook Kartlarına Geç"}</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedColab("none");
                                                                setLeftMenuOpen(false);
                                                            }}
                                                            className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-t border-slate-200 dark:border-slate-800 text-blue-500 font-medium"
                                                        >
                                                            <FileText className="w-3.5 h-3.5" />
                                                            <span>Docs Planına Geri Dön</span>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setIsEditingDocUrl(!isEditingDocUrl);
                                                                setLeftMenuOpen(false);
                                                            }}
                                                            className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
                                                            <span>{isEditingDocUrl ? "Link Düzenlemeyi Kapat" : "Docs Linkini Düzenle"}</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                handleCopyAllDocUrls();
                                                                setLeftMenuOpen(false);
                                                            }}
                                                            className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                        >
                                                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                                                            <span>Tüm Docs Linklerini Kopyala</span>
                                                        </button>
                                                    </>
                                                )}

                                                <div className="border-t border-slate-200 dark:border-slate-800 my-1" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setExpandMode(expandMode === "left" ? "none" : "left");
                                                        setLeftMenuOpen(false);
                                                    }}
                                                    className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                >
                                                    <Columns className="w-3.5 h-3.5 text-slate-500" />
                                                    <span>{expandMode === "left" ? "Yan Yana Görünüme Dön" : "Bu Paneli Tam Ekran Yap"}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Google Docs URL Edit Drawer/Input */}
                            {selectedColab === "none" && isEditingDocUrl && (
                                <div className={`p-2.5 border-b flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ${
                                    isLight ? "bg-slate-100 border-slate-200" : "bg-slate-900 border-slate-800"
                                }`}>
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Google Docs linki yapıştırın (https://docs.google.com/document/d/...)"
                                            value={inputDocUrl}
                                            onChange={(e) => setInputDocUrl(e.target.value)}
                                            className={`h-8 text-xs ${
                                                isLight 
                                                    ? "bg-white border-slate-300 text-slate-900" 
                                                    : "bg-slate-950 border-slate-700 text-slate-200"
                                            }`}
                                        />
                                    </div>
                                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                                        <Button
                                            size="sm"
                                            onClick={handleSaveDocUrl}
                                            className="h-8 px-2.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                                        >
                                            <Save className="w-3.5 h-3.5 mr-1" />
                                            Kaydet
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsEditingDocUrl(false)}
                                            className={`h-8 px-2 text-xs ${isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
                                        >
                                            İptal
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* MAIN PANEL CONTENT: GOOGLE COLAB CODES OR GOOGLE DOCS PREVIEW */}
                            {selectedColab !== "none" ? (
                                <div className={`flex-1 overflow-y-auto p-3 md:p-4 space-y-4 ${
                                    isLight ? "bg-slate-100/70" : "bg-[#14141f]"
                                }`}>
                                    {/* If 'all' selected: week anchor navigation bar */}
                                    {selectedColab === "all" && (
                                        <div className={`sticky top-0 z-20 -mt-2 -mx-2 p-2.5 mb-3 border-b backdrop-blur-md flex items-center justify-between gap-2 flex-wrap ${
                                            isLight ? "bg-white/95 border-slate-200 shadow-xs" : "bg-[#181825]/95 border-slate-800"
                                        }`}>
                                            <span className="text-[11px] font-extrabold uppercase text-amber-600 dark:text-amber-400">
                                                Hızlı Geçiş:
                                            </span>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                {["hafta-1", "hafta-2", "hafta-3", "hafta-4"].map((wId) => {
                                                    const nb = COLAB_NOTEBOOKS[wId];
                                                    return (
                                                        <a
                                                            key={wId}
                                                            href={`#section-${wId}`}
                                                            className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors ${
                                                                isLight 
                                                                    ? "bg-slate-100 text-slate-800 hover:bg-amber-100 hover:text-amber-900 border border-slate-200" 
                                                                    : "bg-slate-800/80 text-slate-300 hover:bg-amber-950/60 hover:text-amber-200 border border-slate-700"
                                                            }`}
                                                        >
                                                            {nb.title} ({nb.cells.length} Hücre)
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Content Rendering: single week OR all weeks */}
                                    {(selectedColab === "all" ? ["hafta-1", "hafta-2", "hafta-3", "hafta-4"] : [selectedColab]).map((wId) => {
                                        const nb = COLAB_NOTEBOOKS[wId];
                                        if (!nb) return null;

                                        return (
                                            <div key={wId} id={`section-${wId}`} className="space-y-3 pt-1">
                                                {/* Week Title & External Link Card */}
                                                <div className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs ${
                                                    isLight ? "bg-white border-amber-200/80" : "bg-[#1e1e2e] border-amber-900/40"
                                                }`}>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                                                                Colab Notebook
                                                            </span>
                                                            <h3 className={`text-sm md:text-base font-extrabold ${isLight ? "text-slate-900" : "text-white"}`}>
                                                                {nb.title}
                                                            </h3>
                                                            <span className="text-xs text-slate-500">
                                                                • {nb.cells.length} Hücre
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <a
                                                            href={nb.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white shadow-xs transition-colors"
                                                        >
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                            <span>Google Colab&apos;da Aç</span>
                                                        </a>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleCopyColab(nb.mergedCode)}
                                                            className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                                                                isLight ? "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100" : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                                                            }`}
                                                            title="Bu haftanın tüm kodlarını kopyala"
                                                        >
                                                            <Copy className="w-3.5 h-3.5 text-amber-500" />
                                                            <span>Kodu Kopyala</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Cells / Code view */}
                                                {colabViewMode === "code" ? (
                                                    <div className={`p-4 rounded-xl border font-mono text-xs md:text-sm overflow-x-auto leading-relaxed shadow-xs ${
                                                        isLight ? "bg-white border-slate-300 text-slate-950 font-medium" : "bg-[#181825] border-slate-800 text-slate-100"
                                                    }`}>
                                                        {nb.mergedCode.split("\n").map((line, lIdx) => (
                                                            <div key={lIdx} className="whitespace-pre">
                                                                {renderColoredLine(line, isLight)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {nb.cells.map((cell, cIdx) => {
                                                            const cellKey = `${wId}-c-${cIdx}`;
                                                            const isCode = cell.type === "code";

                                                            if (!isCode) {
                                                                return (
                                                                    <div 
                                                                        key={cellKey}
                                                                        className={`p-3.5 rounded-xl border shadow-xs ${
                                                                            isLight 
                                                                                ? "bg-amber-50/50 border-amber-200/60 text-slate-900" 
                                                                                : "bg-[#181825] border-slate-800/80 text-slate-200"
                                                                        }`}
                                                                    >
                                                                        {renderMarkdownCell(cell.content, isLight)}
                                                                    </div>
                                                                );
                                                            }

                                                            return (
                                                                <div 
                                                                    key={cellKey}
                                                                    className={`rounded-xl border overflow-hidden shadow-xs ${
                                                                        isLight ? "bg-white border-slate-300" : "bg-[#1e1e2e] border-slate-800"
                                                                    }`}
                                                                >
                                                                    <div className={`px-3 py-1.5 border-b flex items-center justify-between text-[11px] font-mono ${
                                                                        isLight ? "bg-slate-100/80 border-slate-200 text-slate-600" : "bg-[#181825] border-slate-800 text-slate-400"
                                                                    }`}>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                                                                Python [Hücre {cIdx + 1}]
                                                                            </span>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleCopySingleCell(cell.content, cellKey)}
                                                                            className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-colors ${
                                                                                isLight ? "hover:bg-slate-200 text-slate-700" : "hover:bg-slate-700 text-slate-300"
                                                                            }`}
                                                                        >
                                                                            {copiedCellId === cellKey ? (
                                                                                <>
                                                                                    <Check className="w-3 h-3 text-emerald-500" />
                                                                                    <span className="text-emerald-500 font-bold">Kopyalandı</span>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <Copy className="w-3 h-3" />
                                                                                    <span>Kopyala</span>
                                                                                </>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                    <div className={`p-3 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed ${
                                                                        isLight ? "bg-slate-50 text-slate-950 font-medium" : "bg-[#181825] text-slate-100"
                                                                    }`}>
                                                                        {cell.content.split("\n").map((line, lIdx) => (
                                                                            <div key={lIdx} className="whitespace-pre">
                                                                                {renderColoredLine(line, isLight)}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                /* Google Docs Embed Container */
                                <div className="flex-1 relative overflow-hidden flex flex-col bg-white">
                                    {embedUrl ? (
                                        <div className="w-full h-full relative bg-white">
                                            <iframe
                                                src={embedUrl}
                                                className="w-full h-full border-0 absolute inset-0 bg-white"
                                                title={`${selectedLevel} Hafta ${selectedWeek} Ders Planı`}
                                                allow="autoplay"
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : (
                                        <div className={`flex-1 flex flex-col items-center justify-center p-6 text-center ${
                                            isLight ? "bg-slate-50 text-slate-500" : "bg-slate-950 text-slate-400"
                                        }`}>
                                            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-3 ${
                                                isLight ? "bg-white border-slate-200 text-slate-400" : "bg-slate-900 border-slate-800 text-slate-500"
                                            }`}>
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <h3 className={`text-sm font-semibold mb-1 ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                                                Bu Hafta İçin Google Docs Linki Tanımlanmamış
                                            </h3>
                                            <p className="text-xs max-w-sm mb-4 opacity-80">
                                                {selectedLevel} Hafta {selectedWeek} için Google Docs plan linkinizi ekleyerek burada doğrudan önizleyebilirsiniz.
                                            </p>
                                            <Button
                                                size="sm"
                                                onClick={() => setIsEditingDocUrl(true)}
                                                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-8"
                                            >
                                                <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                                                Google Docs Linki Ekle
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Left Footer Info */}
                            <div className={`border-t px-3 py-1.5 flex items-center justify-between text-[11px] shrink-0 ${
                                selectedColab !== "none"
                                    ? isLight ? "bg-amber-50/60 border-amber-200 text-amber-900 font-medium" : "bg-[#181825] border-slate-800 text-amber-300 font-medium"
                                    : isLight ? "bg-slate-50 border-slate-200 text-slate-500" : "bg-slate-900/60 border-slate-800/80 text-slate-500"
                            }`}>
                                <span>
                                    {selectedColab !== "none" ? "Google Colab Entegrasyonu" : "Google Docs Entegrasyonu"}
                                </span>
                                <span>
                                    {selectedColab === "all"
                                        ? "Python Hafta 1-4 (Tümü)"
                                        : selectedColab !== "none"
                                        ? currentColabNotebook?.title
                                        : `${selectedLevel} • Hafta ${selectedWeek}`}
                                </span>
                            </div>

                        </div>
                    )}

                    {/* ======================================================== */}
                    {/* RIGHT HALF: Flexible Content, Code, Arduino, Tasks, Edit */}
                    {/* ======================================================== */}
                    {expandMode !== "left" && (
                        <div className={`rounded-xl border flex flex-col overflow-hidden shadow-sm transition-colors ${
                            isLight ? "bg-white border-slate-200" : "bg-[#181825] border-slate-800"
                        }`}>
                            
                            {/* Header: Tabs & Actions */}
                            <div className={`border-b px-3 py-2 flex items-center justify-between gap-2 shrink-0 ${
                                isLight ? "bg-slate-100 border-slate-200" : "bg-[#11111b] border-slate-800/80"
                            }`}>
                                
                                {/* Tabs List */}
                                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none min-w-0">
                                    {/* Mac Window Dots */}
                                    <div className="flex items-center gap-1 shrink-0 pr-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400 block" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                                    </div>

                                    {/* Tab Buttons */}
                                    {currentWeekPlan.tabs && currentWeekPlan.tabs.length > 0 ? (
                                        currentWeekPlan.tabs.map((tab) => {
                                            const isActive = activeTabId === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    onClick={() => { setActiveTabId(tab.id); setIsEditingContent(false); }}
                                                    className={`
                                                        px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 shrink-0
                                                        ${isActive
                                                            ? isLight 
                                                                ? "bg-white text-indigo-950 border border-indigo-400 shadow-sm font-bold ring-1 ring-indigo-500/20" 
                                                                : "bg-[#1e1e2e] text-[#cdd6f4] border border-slate-700/60 shadow-xs font-semibold"
                                                            : isLight 
                                                                ? "text-slate-700 hover:text-slate-950 hover:bg-slate-200/80 font-medium" 
                                                                : "text-slate-400 hover:text-slate-200 hover:bg-[#181825]"
                                                        }
                                                    `}
                                                >
                                                    {getTabIcon(tab.type)}
                                                    <span>{tab.title}</span>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <span className={`text-xs italic font-medium ${isLight ? "text-slate-600" : "text-slate-500"}`}>
                                            (İçerik Sekmesi Yok)
                                        </span>
                                    )}
                                </div>

                                {/* Right Actions: Copy, Terminal, Save/Cancel, and 3-Dots Menu */}
                                <div className="flex items-center gap-1.5 shrink-0 relative">
                                    {!isEditingContent && currentWeekPlan.tabs && currentWeekPlan.tabs.length > 0 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={handleCopy}
                                                className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded border transition-colors ${
                                                    isLight 
                                                        ? "bg-white text-slate-700 hover:bg-slate-50 border-slate-300" 
                                                        : "bg-[#1e1e2e] text-slate-300 hover:text-white border-slate-700/40"
                                                }`}
                                                title="İçeriği kopyala"
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check className="w-3 h-3 text-emerald-500" />
                                                        <span className="text-emerald-500 font-bold">Kopyalandı</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3 h-3" />
                                                        <span>Kopyala</span>
                                                    </>
                                                )}
                                            </button>

                                            {activeTab?.output && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowTerminal(!showTerminal)}
                                                    className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded transition-colors ${
                                                        showTerminal
                                                            ? isLight 
                                                                ? "bg-indigo-100 text-indigo-700 border border-indigo-200" 
                                                                : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                                            : isLight 
                                                                ? "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200" 
                                                                : "bg-[#1e1e2e] text-slate-400 hover:text-slate-200"
                                                    }`}
                                                >
                                                    <Terminal className="w-3 h-3" />
                                                    <span>Konsol</span>
                                                </button>
                                            )}
                                        </>
                                    )}

                                    {/* Edit Mode Save & Cancel Buttons */}
                                    {isEditingContent && (
                                        <div className="flex items-center gap-1">
                                            <Button
                                                size="sm"
                                                onClick={handleSaveContent}
                                                className="h-7 px-2.5 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
                                            >
                                                <Save className="w-3 h-3 mr-1" />
                                                <span>Kaydet</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsEditingContent(false)}
                                                className={`h-7 px-2 text-[11px] ${isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
                                                title="İptal et"
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    )}

                                    {/* 3-Dots Menu Trigger */}
                                    <div className="relative" data-dropdown="right-menu">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setRightMenuOpen(!rightMenuOpen);
                                                setLeftMenuOpen(false);
                                            }}
                                            className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                                                rightMenuOpen
                                                    ? isLight ? "bg-slate-300 text-slate-900" : "bg-slate-700 text-white"
                                                    : isLight ? "hover:bg-slate-200 text-slate-600" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                                            }`}
                                            title="Daha fazla seçenek"
                                        >
                                            <MoreVertical className="w-3.5 h-3.5" />
                                        </button>

                                        {/* Dropdown Popover */}
                                        {rightMenuOpen && (
                                            <div className={`absolute right-0 top-full mt-1 w-52 rounded-lg border shadow-xl py-1 z-50 text-xs ${
                                                isLight 
                                                    ? "bg-white border-slate-200 text-slate-800" 
                                                    : "bg-slate-900 border-slate-700 text-slate-200"
                                            }`}>
                                                {!isEditingContent ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            handleStartEditing();
                                                            setRightMenuOpen(false);
                                                        }}
                                                        className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                    >
                                                        <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
                                                        <span>İçeriği & Sekmeleri Düzenle</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            handleResetContent();
                                                            setRightMenuOpen(false);
                                                        }}
                                                        className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-rose-500 font-medium"
                                                    >
                                                        <RotateCcw className="w-3.5 h-3.5" />
                                                        <span>Varsayılana Sıfırla</span>
                                                    </button>
                                                )}

                                                <div className="border-t border-slate-200 dark:border-slate-800 my-1" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setExpandMode(expandMode === "right" ? "none" : "right");
                                                        setRightMenuOpen(false);
                                                    }}
                                                    className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                                >
                                                    <Columns className="w-3.5 h-3.5 text-slate-500" />
                                                    <span>{expandMode === "right" ? "Yan Yana Görünüme Dön" : "Bu Paneli Tam Ekran Yap"}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* BODY CONTENT: EDIT MODE vs VIEW MODE */}
                            <div className="flex-1 overflow-auto flex flex-col">

                                {/* 1. EDIT MODE */}
                                {isEditingContent ? (
                                    <div className={`p-4 space-y-4 flex-1 overflow-y-auto ${isLight ? "bg-slate-50 text-slate-950" : "bg-[#181825] text-slate-100"}`}>
                                        
                                        {/* Edit Header */}
                                        <div className={`flex items-center justify-between border-b pb-3 ${isLight ? "border-slate-200" : "border-slate-800"}`}>
                                            <div>
                                                <h3 className={`text-sm md:text-base font-extrabold ${isLight ? "text-slate-950" : "text-white"}`}>
                                                    Haftalık İçeriği & Sekmeleri Düzenle
                                                </h3>
                                                <p className={`text-xs font-medium mt-0.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                                    Bu haftaya ait kodları, devreleri, Unity scriptlerini veya konu anlatımlarını ekleyin, düzenleyin ya da silin.
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleResetContent}
                                                className={`text-xs h-8 font-semibold transition-colors ${
                                                    isLight 
                                                        ? "text-rose-700 border-rose-300 hover:bg-rose-50" 
                                                        : "text-rose-400 border-rose-900/60 hover:bg-rose-950/40"
                                                }`}
                                                title="Özel içeriği sil ve varsayılana dön"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                                                Sıfırla
                                            </Button>
                                        </div>

                                        {/* Meta fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className={`text-xs font-bold block mb-1.5 ${isLight ? "text-slate-950" : "text-slate-100"}`}>
                                                    Ders Başlığı:
                                                </label>
                                                <Input
                                                    value={editForm.title}
                                                    onChange={(e) => setEditForm(p => ({ ...p, title: e.target.value }))}
                                                    placeholder="Örn: Arduino ile Mesafe Sensörü Uygulaması"
                                                    className={`h-9 text-xs font-medium ${
                                                        isLight 
                                                            ? "bg-white text-slate-950 border-slate-300 placeholder:text-slate-400 focus:border-indigo-600" 
                                                            : "bg-slate-900 border-slate-700 text-slate-100"
                                                    }`}
                                                />
                                            </div>
                                            <div>
                                                <label className={`text-xs font-bold block mb-1.5 ${isLight ? "text-slate-950" : "text-slate-100"}`}>
                                                    Kategori / Alan:
                                                </label>
                                                <Input
                                                    value={editForm.category}
                                                    onChange={(e) => setEditForm(p => ({ ...p, category: e.target.value }))}
                                                    placeholder="Örn: Arduino / Robotik, Unity / C#, Python, Algoritma"
                                                    className={`h-9 text-xs font-medium ${
                                                        isLight 
                                                            ? "bg-white text-slate-950 border-slate-300 placeholder:text-slate-400 focus:border-indigo-600" 
                                                            : "bg-slate-900 border-slate-700 text-slate-100"
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={`text-xs font-bold block mb-1.5 ${isLight ? "text-slate-950" : "text-slate-100"}`}>
                                                Kısa Özet / Kazanım Açıklaması:
                                            </label>
                                            <Input
                                                value={editForm.summary}
                                                onChange={(e) => setEditForm(p => ({ ...p, summary: e.target.value }))}
                                                placeholder="Bu hafta öğrencilere kazandırılacak beceriler ve hedefler..."
                                                className={`h-9 text-xs font-medium ${
                                                    isLight 
                                                        ? "bg-white text-slate-950 border-slate-300 placeholder:text-slate-400 focus:border-indigo-600" 
                                                        : "bg-slate-900 border-slate-700 text-slate-100"
                                                }`}
                                            />
                                        </div>

                                        {/* Tabs Section Header & Quick Add Toolbar */}
                                        <div className="space-y-3 pt-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
                                                <label className={`text-xs font-extrabold flex items-center gap-2 ${isLight ? "text-slate-950" : "text-slate-100"}`}>
                                                    <span>Sekmeler ve Materyaller:</span>
                                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                                        isLight 
                                                            ? "bg-indigo-100 text-indigo-950 border border-indigo-300" 
                                                            : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                                    }`}>
                                                        {editForm.tabs.length} Sekme
                                                    </span>
                                                </label>
                                                
                                                {/* Prominent Tab Creation Toolbar */}
                                                <div className="flex flex-wrap items-center gap-1.5">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider mr-1 hidden md:inline-block ${
                                                        isLight ? "text-slate-500" : "text-slate-400"
                                                    }`}>
                                                        Sekme Ekle:
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleAddTab("code")}
                                                        className="h-7 px-2.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xs"
                                                    >
                                                        <Plus className="w-3 h-3 mr-1" />
                                                        + Python
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleAddTab("arduino")}
                                                        className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-xs"
                                                    >
                                                        <Plus className="w-3 h-3 mr-1" />
                                                        + Arduino
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleAddTab("unity")}
                                                        className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-xs"
                                                    >
                                                        <Plus className="w-3 h-3 mr-1" />
                                                        + Unity
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleAddTab("text")}
                                                        className="h-7 px-2.5 text-xs bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-xs"
                                                    >
                                                        <Plus className="w-3 h-3 mr-1" />
                                                        + Bilgi/Not
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleAddTab("tasks")}
                                                        className="h-7 px-2.5 text-xs bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-xs"
                                                    >
                                                        <Plus className="w-3 h-3 mr-1" />
                                                        + Görevler
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Empty State if All Tabs are Deleted */}
                                            {editForm.tabs.length === 0 && (
                                                <div className={`p-8 rounded-xl border border-dashed text-center flex flex-col items-center justify-center my-3 ${
                                                    isLight 
                                                        ? "bg-white border-slate-300 text-slate-800" 
                                                        : "bg-slate-900 border-slate-800 text-slate-300"
                                                }`}>
                                                    <p className="text-sm font-bold mb-1">Henüz sekme bulunmuyor</p>
                                                    <p className="text-xs text-slate-500 mb-4 max-w-sm">
                                                        Yukarıdaki veya aşağıdaki butonlara tıklayarak bu haftaya dilediğiniz sayıda sekme ekleyebilirsiniz.
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 justify-center">
                                                        <Button size="sm" onClick={() => handleAddTab("code")} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-8">
                                                            <Plus className="w-3 h-3 mr-1" /> + Python Kod Sekmesi Ekle
                                                        </Button>
                                                        <Button size="sm" onClick={() => handleAddTab("arduino")} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-8">
                                                            <Plus className="w-3 h-3 mr-1" /> + Arduino Sekmesi Ekle
                                                        </Button>
                                                        <Button size="sm" onClick={() => handleAddTab("unity")} className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-8">
                                                            <Plus className="w-3 h-3 mr-1" /> + Unity Sekmesi Ekle
                                                        </Button>
                                                        <Button size="sm" onClick={() => handleAddTab("text")} className="bg-amber-600 hover:bg-amber-500 text-white text-xs h-8">
                                                            <Plus className="w-3 h-3 mr-1" /> + Bilgi/Not Ekle
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tabs List */}
                                            {editForm.tabs.map((tab, idx) => (
                                                <div 
                                                    key={tab.id}
                                                    className={`p-3.5 rounded-xl border space-y-3 transition-all ${
                                                        isLight 
                                                            ? "bg-white border-slate-300 shadow-xs" 
                                                            : "bg-slate-900/90 border-slate-800"
                                                    }`}
                                                >
                                                    {/* Tab Card Header: Badge, Title Input, Type Dropdown, Delete Button */}
                                                    <div className={`flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b ${
                                                        isLight ? "border-slate-200" : "border-slate-800"
                                                    }`}>
                                                        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
                                                            {/* Tab Index Badge */}
                                                            <span className={`px-2 py-1 rounded text-[11px] font-extrabold shrink-0 ${
                                                                isLight 
                                                                    ? "bg-slate-100 text-slate-900 border border-slate-300" 
                                                                    : "bg-slate-800 text-slate-200 border border-slate-700"
                                                            }`}>
                                                                Sekme {idx + 1}
                                                            </span>

                                                            {/* Tab Title Input */}
                                                            <div className="flex-1 min-w-[160px]">
                                                                <label className={`text-[10px] font-extrabold block uppercase tracking-wider mb-0.5 ${
                                                                    isLight ? "text-slate-900" : "text-slate-200"
                                                                }`}>
                                                                    Sekme Adı:
                                                                </label>
                                                                <Input
                                                                    value={tab.title}
                                                                    onChange={(e) => {
                                                                        const val = e.target.value;
                                                                        setEditForm(p => ({
                                                                            ...p,
                                                                            tabs: p.tabs.map((t, i) => i === idx ? { ...t, title: val } : t)
                                                                        }));
                                                                    }}
                                                                    placeholder="Örn: ornek.py, arduino.ino, gorevler.md"
                                                                    className={`h-8 text-xs font-mono font-bold ${
                                                                        isLight 
                                                                            ? "bg-slate-50 text-slate-950 border-slate-300 focus:bg-white focus:border-indigo-600" 
                                                                            : "bg-slate-950 border-slate-700 text-slate-100"
                                                                    }`}
                                                                />
                                                            </div>

                                                            {/* Tab Type Dropdown */}
                                                            <div className="w-36 shrink-0">
                                                                <label className={`text-[10px] font-extrabold block uppercase tracking-wider mb-0.5 ${
                                                                    isLight ? "text-slate-900" : "text-slate-200"
                                                                }`}>
                                                                    Sekme Türü:
                                                                </label>
                                                                <select
                                                                    value={tab.type}
                                                                    onChange={(e) => {
                                                                        const newType = e.target.value as ContentType;
                                                                        setEditForm(p => ({
                                                                            ...p,
                                                                            tabs: p.tabs.map((t, i) => i === idx ? { 
                                                                                ...t, 
                                                                                type: newType,
                                                                                language: newType === "code" ? "python" : newType === "arduino" ? "cpp" : newType === "unity" ? "csharp" : "markdown"
                                                                            } : t)
                                                                        }));
                                                                    }}
                                                                    className={`h-8 w-full rounded-md border text-xs px-2 font-bold outline-none transition-colors ${
                                                                        isLight 
                                                                            ? "bg-slate-50 text-slate-950 border-slate-300 focus:bg-white focus:border-indigo-600" 
                                                                            : "bg-slate-950 text-slate-100 border-slate-700 focus:border-indigo-500"
                                                                    }`}
                                                                >
                                                                    <option value="code">Kod (Python)</option>
                                                                    <option value="arduino">Arduino (C++)</option>
                                                                    <option value="unity">Unity (C#)</option>
                                                                    <option value="text">Bilgi / Açıklama</option>
                                                                    <option value="tasks">Görevler</option>
                                                                    <option value="notes">Öğretmen Notu</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        {/* Prominent Red Delete Tab Button */}
                                                        <div className="flex items-end self-end sm:self-auto">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleDeleteTab(idx)}
                                                                className={`h-8 px-2.5 text-xs font-bold transition-all border-rose-300 text-rose-600 hover:text-white hover:bg-rose-600 bg-rose-50/60 dark:bg-rose-950/20 dark:border-rose-900/60 dark:text-rose-400 dark:hover:bg-rose-600`}
                                                                title="Bu sekmeyi listeden sil"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5 mr-1" />
                                                                <span>Sekmeyi Sil</span>
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Tab Content Editor */}
                                                    <div>
                                                        <label className={`text-[10px] font-extrabold block uppercase tracking-wider mb-1 ${
                                                            isLight ? "text-slate-900" : "text-slate-200"
                                                        }`}>
                                                            Sekme İçeriği (Kod, Not veya Şema Metni):
                                                        </label>
                                                        <textarea
                                                            rows={7}
                                                            value={tab.content}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                setEditForm(p => ({
                                                                    ...p,
                                                                    tabs: p.tabs.map((t, i) => i === idx ? { ...t, content: val } : t)
                                                                }));
                                                            }}
                                                            placeholder="Kod, devre bağlantı şeması veya açıklama metni girin..."
                                                            className={`w-full p-2.5 rounded-lg text-xs font-mono border leading-relaxed outline-none transition-colors ${
                                                                isLight 
                                                                    ? "bg-slate-50 border-slate-300 text-slate-950 placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-medium" 
                                                                    : "bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                            }`}
                                                        />
                                                    </div>

                                                    {/* Optional Console Output field if code tab */}
                                                    {(tab.type === "code" || tab.type === "arduino" || tab.type === "unity") && (
                                                        <div className="pt-1">
                                                            <label className={`text-[10px] font-bold block uppercase tracking-wider mb-1 ${
                                                                isLight ? "text-slate-700" : "text-slate-400"
                                                            }`}>
                                                                Konsol / Çıktı Önizlemesi (İsteğe bağlı):
                                                            </label>
                                                            <textarea
                                                                rows={2}
                                                                value={tab.output || ""}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setEditForm(p => ({
                                                                        ...p,
                                                                        tabs: p.tabs.map((t, i) => i === idx ? { ...t, output: val } : t)
                                                                    }));
                                                                }}
                                                                placeholder="Simüle edilecek konsol çıktısı..."
                                                                className={`w-full p-2 rounded-lg text-xs font-mono border leading-relaxed outline-none transition-colors ${
                                                                    isLight 
                                                                        ? "bg-slate-100 border-slate-300 text-emerald-800 placeholder:text-slate-400 font-medium" 
                                                                        : "bg-black/40 border-slate-800 text-emerald-400 placeholder:text-slate-600"
                                                                }`}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Bottom Quick-Add Toolbar for Convenience when user has tabs */}
                                            {editForm.tabs.length > 0 && (
                                                <div className={`p-3.5 rounded-xl border border-dashed flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left ${
                                                    isLight ? "border-slate-300 bg-slate-100/70" : "border-slate-800 bg-slate-900/40"
                                                }`}>
                                                    <div>
                                                        <p className={`text-xs font-bold ${isLight ? "text-slate-900" : "text-slate-200"}`}>
                                                            Yeni bir sekme daha eklemek ister misiniz?
                                                        </p>
                                                        <p className={`text-[11px] ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                                                            Python kodu, Arduino devresi, Unity scripti veya genel not sekmeleri ekleyebilirsiniz.
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={() => handleAddTab("code")}
                                                            className="h-7 px-2.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                                                        >
                                                            <Plus className="w-3 h-3 mr-1" />
                                                            + Kod
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={() => handleAddTab("arduino")}
                                                            className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                                                        >
                                                            <Plus className="w-3 h-3 mr-1" />
                                                            + Arduino
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={() => handleAddTab("unity")}
                                                            className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                                                        >
                                                            <Plus className="w-3 h-3 mr-1" />
                                                            + Unity
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={() => handleAddTab("text")}
                                                            className="h-7 px-2.5 text-xs bg-amber-600 hover:bg-amber-500 text-white font-semibold"
                                                        >
                                                            <Plus className="w-3 h-3 mr-1" />
                                                            + Bilgi/Not
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Action Buttons */}
                                        <div className={`pt-3 border-t flex justify-end gap-2.5 ${isLight ? "border-slate-200" : "border-slate-800"}`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setIsEditingContent(false)}
                                                className={`text-xs h-8 px-3 font-semibold ${
                                                    isLight ? "border-slate-300 text-slate-700 hover:bg-slate-100" : "border-slate-700 text-slate-300"
                                                }`}
                                            >
                                                İptal
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={handleSaveContent}
                                                className="text-xs h-8 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-xs"
                                            >
                                                <Save className="w-3.5 h-3.5 mr-1.5" />
                                                Değişiklikleri Kaydet
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    /* 2. VIEW MODE */
                                    <div className="flex-1 flex flex-col overflow-hidden">
                                        {/* If no real content exists yet */}
                                        {!currentWeekPlan.hasRealData && (!currentWeekPlan.tabs || currentWeekPlan.tabs.length === 0) ? (
                                            <div className={`flex-1 flex flex-col items-center justify-center p-8 text-center ${
                                                isLight ? "bg-slate-50 text-slate-500" : "bg-[#181825] text-slate-400"
                                            }`}>
                                                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-3 ${
                                                    isLight ? "bg-white border-slate-200 text-slate-400 shadow-xs" : "bg-slate-900 border-slate-800 text-slate-500"
                                                }`}>
                                                    <FileQuestion className="w-7 h-7" />
                                                </div>
                                                <h3 className={`text-sm md:text-base font-bold mb-1 ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                                                    {selectedLevel} • Hafta {selectedWeek} İçin Henüz İçerik Eklenmedi
                                                </h3>
                                                <p className="text-xs max-w-md mb-5 leading-relaxed opacity-85">
                                                    Bu hafta için sahte/örnek veri kaldırılmıştır. İlgili ders planı linkini sol tarafa ekleyebilir, ya da sağdaki &quot;İçerik Ekle&quot; butonuyla Python, Arduino, Unity veya teorik notlarınızı doğrudan sisteme kaydedebilirsiniz.
                                                </p>
                                                <div className="flex flex-wrap items-center justify-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={handleStartEditing}
                                                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-8 font-medium"
                                                    >
                                                        <Plus className="w-3.5 h-3.5 mr-1.5" />
                                                        Bu Haftaya İçerik & Kod Ekle
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setIsEditingDocUrl(true)}
                                                        className={`text-xs h-8 ${isLight ? "border-slate-300 bg-white" : "border-slate-700 bg-slate-900"}`}
                                                    >
                                                        <FileText className="w-3.5 h-3.5 mr-1.5" />
                                                        Google Docs Linki Ekle
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Active Content Viewer */
                                            <div className="flex-1 flex flex-col overflow-hidden">
                                                {/* Code / Content Area */}
                                                <div className={`flex-1 overflow-auto p-3 text-xs md:text-sm font-mono scrollbar-thin ${
                                                    isLight ? "bg-white text-slate-950" : "bg-[#181825] text-slate-100"
                                                }`}>
                                                    {activeTab && (activeTab.type === "code" || activeTab.type === "arduino" || activeTab.type === "unity") ? (
                                                        <div className="flex">
                                                            {/* Line Numbers */}
                                                            <div className={`select-none pr-4 text-right border-r mr-4 font-mono text-xs leading-relaxed shrink-0 font-medium ${
                                                                isLight ? "text-slate-500 border-slate-200" : "text-slate-600 border-slate-800"
                                                            }`}>
                                                                {activeTab.content.split("\n").map((_, i) => (
                                                                    <div key={i}>{i + 1}</div>
                                                                ))}
                                                            </div>
                                                            {/* Code Lines */}
                                                            <div className="flex-1 overflow-x-auto leading-relaxed">
                                                                {activeTab.content.split("\n").map((line, i) => (
                                                                    <div key={i} className="whitespace-pre">
                                                                        {renderColoredLine(line, isLight)}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : activeTab ? (
                                                        /* Markdown / Text View */
                                                        <div className="p-2 space-y-3 font-sans text-xs md:text-sm leading-relaxed">
                                                            <div className={`p-3.5 rounded-lg border ${
                                                                isLight 
                                                                    ? "bg-indigo-50/90 border border-indigo-300 text-indigo-950 shadow-xs" 
                                                                    : "bg-indigo-500/10 border-indigo-500/20 text-indigo-200"
                                                            }`}>
                                                                <div className={`flex items-center gap-2 font-extrabold mb-1 ${
                                                                    isLight ? "text-indigo-950" : "text-indigo-200"
                                                                }`}>
                                                                    {getTabIcon(activeTab.type)}
                                                                    <span>{activeTab.title}</span>
                                                                </div>
                                                                <p className={`text-xs leading-relaxed ${
                                                                    isLight ? "text-indigo-900 font-medium" : "text-indigo-300 opacity-90"
                                                                }`}>
                                                                    {currentWeekPlan.summary}
                                                                </p>
                                                            </div>

                                                            <div className={`p-4 rounded-lg border whitespace-pre-wrap font-sans leading-relaxed ${
                                                                isLight 
                                                                    ? "bg-white border-slate-300 text-slate-950 font-medium shadow-xs" 
                                                                    : "bg-[#1e1e2e] border-slate-800 text-slate-200"
                                                            }`}>
                                                                {activeTab.content}
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>

                                                {/* Simulated Terminal Output Panel (if output provided) */}
                                                {showTerminal && activeTab?.output && (
                                                    <div className={`border-t shrink-0 max-h-48 flex flex-col font-mono text-xs ${
                                                        isLight ? "bg-slate-100 border-slate-200" : "bg-[#11111b] border-slate-800"
                                                    }`}>
                                                        <div className={`px-3 py-1.5 border-b flex items-center justify-between ${
                                                            isLight ? "bg-slate-200 border-slate-300 text-slate-700" : "bg-[#181825] border-slate-800 text-slate-400"
                                                        }`}>
                                                            <div className="flex items-center gap-2">
                                                                <Terminal className="w-3 h-3 text-emerald-500" />
                                                                <span className="font-semibold">KONSOL / DERLEYİCİ ÇIKTISI</span>
                                                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                                    Exit Code: 0
                                                                </span>
                                                            </div>
                                                            <div className="text-[11px] opacity-75">
                                                                {activeTab.language === "python" ? "python3 main.py" : "output"}
                                                            </div>
                                                        </div>
                                                        <div className="p-3 overflow-y-auto max-h-36 font-mono text-emerald-500 whitespace-pre leading-relaxed select-text bg-slate-950">
                                                            {activeTab.output}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>

                            {/* IDE Bottom Status Bar */}
                            <div className={`border-t px-3 py-1 flex items-center justify-between text-[11px] font-mono shrink-0 ${
                                isLight ? "bg-slate-100 border-slate-200 text-slate-500" : "bg-[#11111b] border-slate-800/80 text-slate-500"
                            }`}>
                                <div className="flex items-center gap-3">
                                    <span className="text-indigo-500 flex items-center gap-1 font-semibold">
                                        <Code2 className="w-3 h-3" />
                                        {activeTab ? (activeTab.language || activeTab.type).toUpperCase() : "HAZIR"}
                                    </span>
                                    <span>UTF-8</span>
                                    <span>{theme.toUpperCase()} MODE</span>
                                </div>
                                <div className="text-[10px] opacity-80">
                                    {currentWeekPlan.hasRealData ? "Gerçek Müfredat Aktif" : "Yeni İçerik Bekleniyor"}
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </main>

        </div>
    );
}
