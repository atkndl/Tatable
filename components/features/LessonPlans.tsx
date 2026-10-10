"use client";

import { useState, useEffect, useMemo } from "react";
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
    FileQuestion
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LessonPlansProps {
    onBackToHub: () => void;
    onSwitchToMesai: () => void;
}

type LevelType = "Seviye 1" | "Seviye 2" | "Seviye 3";
type ContentType = "code" | "arduino" | "unity" | "text" | "tasks" | "notes";

export interface PlanTab {
    id: string;
    title: string;
    type: ContentType;
    filename?: string;
    language?: string; // python, csharp, cpp, javascript, markdown, etc.
    content: string;
    output?: string;
}

export interface WeekPlan {
    week: number;
    title: string;
    summary: string;
    category?: string;
    docUrl?: string; // Google Docs link
    hasRealData: boolean; // true ONLY when verified real data exists
    tabs: PlanTab[];
}

// Default Google Docs link provided by user for Seviye 3 Hafta 1
const DEFAULT_SEVIYE_3_HAFTA_1_DOC = "https://docs.google.com/document/d/15dPpS36dixuKTY6SnWyoWlWS-SAMWW3C/edit";

// Real curriculum base data: ONLY Seviye 3 Hafta 1 has real data! All other weeks are clean placeholders.
const INITIAL_CURRICULUM: Record<LevelType, WeekPlan[]> = {
    "Seviye 1": Array.from({ length: 8 }, (_, i) => ({
        week: i + 1,
        title: `Hafta ${i + 1} Ders Planı`,
        summary: "Bu hafta için henüz ders planı tanımlanmadı. Google Docs linki veya içerik ekleyebilirsiniz.",
        hasRealData: false,
        docUrl: "",
        category: "Genel",
        tabs: []
    })),
    "Seviye 2": Array.from({ length: 8 }, (_, i) => ({
        week: i + 1,
        title: `Hafta ${i + 1} Ders Planı`,
        summary: "Bu hafta için henüz ders planı tanımlanmadı. Google Docs linki veya içerik ekleyebilirsiniz.",
        hasRealData: false,
        docUrl: "",
        category: "Genel",
        tabs: []
    })),
    "Seviye 3": [
        // Hafta 1: REAL DATA verified from user's Google Doc
        {
            week: 1,
            title: "EkoKampüs: Python Temelleri, Değişkenler & Veri Tipleri",
            summary: "SKA 4, 11, 12 entegrasyonu, okul krokisi 5 bölge haritalama, Google Colab akış şeması, değişkenler, tip dönüşümleri ve Canva moodboard.",
            category: "Yazılım / Python",
            docUrl: DEFAULT_SEVIYE_3_HAFTA_1_DOC,
            hasRealData: true,
            tabs: [
                {
                    id: "python_code",
                    title: "ekokampus_hafta1.py",
                    type: "code",
                    filename: "ekokampus_hafta1.py",
                    language: "python",
                    content: `# ==============================================================================
# PROJE: EkoKampüs (Sürdürülebilir Okul Sistemi) - HAFTA 1
# SKA Entegrasyonu: SKA 4 (Nitelikli Eğitim) + SKA 11 + SKA 12
# Konu: Python Temelleri, Değişkenler, Veri Tipleri & Tip Dönüşümleri
# ==============================================================================

print("========================================")
print("🌱 EKOKAMPÜS: SÜRDÜRÜLEBİLİR OKUL SİSTEMİ")
print("========================================")
print("Odak Bölgeleri: Kantin | Enerji | Ulaşım | Atık | Bahçe\\n")

# 1. DERS 3: Değişken Tanımlama & Veri Tipleri (str, int, float, bool)
# Kurallar: Anlamlı isimler, snake_case, Türkçe karakter/boşluk kullanmama
bolge_adi = "Ulaşım"             # string (metin)
bolge_puani = 80                 # integer (tam sayı)
enerji_sarfiyati = 120.5         # float (ondalıklı sayı - kWh)
ogrenci_sayisi = 450             # integer (tam sayı)
surdurulebilir_mi = True         # boolean (mantıksal değer)

# Değişken tiplerini type() fonksiyonu ile inceleyelim:
print("--- Veri Tipleri Kontrolü ---")
print("Bölge Adı Tipi        :", type(bolge_adi))
print("Bölge Puanı Tipi      :", type(bolge_puani))
print("Enerji Sarfiyatı Tipi :", type(enerji_sarfiyati))
print("Sürdürülebilirlik     :", type(surdurulebilir_mi))
print()

# 2. DERS 3: Tip Dönüşümü (Type Casting) & TypeError Çözümü
# Kullanıcıdan/anketten gelen veriler hafızada genellikle metin (str) olarak gelir:
gelen_puan = "90"                # string tipinde veri
print(f"Gelen Ham Puan: '{gelen_puan}' | Veri Tipi: {type(gelen_puan)}")

# Metni tam sayıya dönüştürüp bonus puan ekliyoruz:
puan_sayisal = int(gelen_puan)
bonus_puan = 10
yeni_puan = puan_sayisal + bonus_puan
print("Hesaplanan Yeni Puan (Bonus Dahil):", yeni_puan)

# DİKKAT: print("Ulaşım puanın: " + yeni_puan) -> TypeError verir!
# Çözüm 1: str() ile tip dönüştürme
print("Ulaşım Bölgesi Puanı (str dönüşümü): " + str(yeni_puan))

# Çözüm 2: Modern f-string formatı (Tavsiye Edilen)
print(f"[EkoKampüs Özet] {bolge_adi} bölgesi için güncel skor: {yeni_puan}/100")

# Ondalıklı tip dönüşümü (float casting)
karbon_salinimi = float("120.5")
print(f"Günlük Tahmini Karbon Salınımı: {karbon_salinimi} kg CO2")`,
                    output: `========================================
🌱 EKOKAMPÜS: SÜRDÜRÜLEBİLİR OKUL SİSTEMİ
========================================
Odak Bölgeleri: Kantin | Enerji | Ulaşım | Atık | Bahçe

--- Veri Tipleri Kontrolü ---
Bölge Adı Tipi        : <class 'str'>
Bölge Puanı Tipi      : <class 'int'>
Enerji Sarfiyatı Tipi : <class 'float'>
Sürdürülebilirlik     : <class 'bool'>

Gelen Ham Puan: '90' | Veri Tipi: <class 'str'>
Hesaplanan Yeni Puan (Bonus Dahil): 100
Ulaşım Bölgesi Puanı (str dönüşümü): 100
[EkoKampüs Özet] Ulaşım bölgesi için güncel skor: 100/100
Günlük Tahmini Karbon Salınımı: 120.5 kg CO2

[Program başarıyla tamamlandı - Exit Code: 0]`
                },
                {
                    id: "tasks",
                    title: "Öğrenci Görevleri",
                    type: "tasks",
                    filename: "ekokampus_gorevler.py",
                    language: "python",
                    content: `# ==============================================================================
# SEVİYE 3 - HAFTA 1 ÖĞRENCİ GÖREVLERİ & ALIŞTIRMALARI
# ==============================================================================

# GÖREV 1 (Kantin Bölgesi & Float Dönüşümü):
# Bir öğrencinin öğle yemeğinde ürettiği atık miktarı 'tabak_atik_miktari = "35.5"' 
# olarak kaydedilmiştir. Bu metni float'a çevirip 10 kg azaltarak yeni değeri yazdırın.

# GÖREV 2 (Enerji Modülü & Aritmetik Hesaplama):
# Bir sınıfta harcanan kilovatı 'harcanan_kwh = "125"' metninden int'e çevirin.
# Birim fiyat olan 2.5 TL (float) ile çarparak toplam elektrik maliyetini hesaplayın.

# GÖREV 3 (TypeError Düzeltme):
# Aşağıdaki kod satırındaki TypeError hatasını str() veya f-string kullanarak düzeltin:
# bolge = "Atık ve Geri Dönüşüm"
# kutu_sayisi = 12
# print(bolge + " alanında toplam kutu sayısı: " + kutu_sayisi)

# GÖREV 4 (Tasarım & Moodboard Renk Paleti):
# EkoKampüs için seçtiğiniz doğa dostu 3-4 renk kodunu (örn: #2ecc71, #27ae60) 
# ve 1 yazı tipi adını ekrana yazdıracak Python kodunu yazın.`
                },
                {
                    id: "curriculum_notes",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 Hafta 1 Ders Planı & Kazanımlar (EkoKampüs)

#### 1. Ders: Okul Krokisi ve Bölge Haritalama
- SKA 4 (Nitelikli Eğitim), SKA 11 (Sürdürülebilir Şehirler) ve SKA 12 (Sorumlu Tüketim).
- Okul krokisi üzerinde 5 ana bölge: **Kantin, Sınıf/Enerji, Ulaşım, Atık, Bahçe/Yeşil Alan**.

#### 2. Ders: Colab, Algoritma ve Akış Şeması
- EkoKampüs akış şeması: **Başla → Bölge seç → Soru sor → Puan hesapla → Öneri sun → Bitir**.
- Google Colab ortamı ve ilk \`print()\` komutlarının çalıştırılması.

#### 3. Ders: Python Değişkenler ve Veri Tipleri
- Değişken isimlendirme kuralları (snake_case, boşluk ve Türkçe karakter kullanmama).
- Temel veri tipleri: \`str\`, \`int\`, \`float\`, \`bool\` ve \`type()\` kontrolleri.
- Tip dönüşümü: \`int("90")\`, \`float("120.5")\`, \`str(sayi)\`.
- \`TypeError\` hatası ve çözümü.

#### 4. Ders: Grafik Tasarım Temelleri & Dijital Moodboard
- Canva ile 3-4 renkli doğa paleti, 1 yazı tipi ve telif kurallarına uygun görsel kolajı.
- Dosya türleri (.png, .jpg, .svg) ve ekran tasarımına hazırlık.`
                },
                {
                    id: "teacher_tips",
                    title: "Eğitmen Rehberi",
                    type: "notes",
                    filename: "egitmen_notlari.md",
                    language: "markdown",
                    content: `🤖 Yapay Zeka Eğitmen Tavsiyeleri & Kritik Noktalar:

1. **Kritik Yanılgı:** Öğrenciler \`print("Ulaşım puanın: " + yeni_puan)\` yazdıklarında Python metin ile tam sayıyı doğrudan birleştiremez. Bu hatayı tahtada bilerek aldırın ve \`TypeError\` ile nasıl başa çıkacaklarını (str() veya f-string) gösterin.

2. **Hafta 2 Bağlantısı:** Öğrencilere hatırlatın: "Hafta 2'de kullanıcıdan \`input()\` ile veri alacağız. \`input()\` her zaman metin (str) döndürdüğü için bu tip dönüşümleri projenin belkemiği olacak."

3. **Sınıf İçi Soru:** "Kantinde tabağını bitiren bir öğrenciye neden düşük öncelikli ceza, yüksek çevre puanı veririz?"

4. **Tasarım:** Canva moodboard çalışmasında telif haklarına dikkat çekin; telifsiz veya kaynak belirtilmiş görseller kullandırın.`
                }
            ]
        },
        // Haftalar 2-8: clean placeholders without fake data
        ...Array.from({ length: 7 }, (_, i) => ({
            week: i + 2,
            title: `Hafta ${i + 2} Ders Planı`,
            summary: "Bu hafta için henüz ders planı tanımlanmadı. Google Docs linki veya içerik ekleyebilirsiniz.",
            hasRealData: false,
            docUrl: "",
            category: "Genel",
            tabs: []
        }))
    ]
};

// Helper: converts a Google Docs edit URL to an iframe-embeddable preview URL
function getDocEmbedUrl(url: string): string {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.includes("/preview")) return trimmed;
    if (trimmed.includes("/edit")) return trimmed.replace(/\/edit(\?.*)?$/, "/preview");
    if (trimmed.includes("docs.google.com/document/d/")) return trimmed.replace(/\/$/, "") + "/preview";
    return trimmed;
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
            title: type === "code" ? "kod_ornek.py" : type === "arduino" ? "arduino_devre.ino" : type === "unity" ? "GameController.cs" : "Etkinlik & Bilgiler",
            type: type,
            filename: type === "code" ? "main.py" : type === "arduino" ? "circuit.ino" : type === "unity" ? "script.cs" : "notlar.md",
            language: type === "code" ? "python" : type === "arduino" ? "cpp" : type === "unity" ? "csharp" : "markdown",
            content: type === "code" 
                ? "# Örnek kodunuzu buraya yazın\nprint('Merhaba!')" 
                : type === "arduino"
                ? "// Arduino C++ Devre Kodu\nvoid setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}"
                : type === "unity"
                ? "using UnityEngine;\n\npublic class Controller : MonoBehaviour {\n    void Start() {\n        Debug.Log(\"Oyun Başladı\");\n    }\n}"
                : "### Ders Açıklamaları ve Etkinlikler\n- Öğrencilere aktarılacak bilgiler..."
        };
        setEditForm(prev => ({ ...prev, tabs: [...prev.tabs, newTab] }));
    };

    // Delete a tab in edit form
    const handleDeleteTab = (index: number) => {
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
            <header className={`border-b sticky top-0 z-40 px-4 py-3 shrink-0 backdrop-blur-md transition-colors ${
                isLight 
                    ? "bg-white/95 border-slate-200 text-slate-900 shadow-xs" 
                    : "bg-slate-950/80 border-slate-800 text-white"
            }`}>
                <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Left: Back & Title */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBackToHub}
                            className={`h-9 px-2.5 rounded-lg text-xs transition-colors ${
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
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isLight ? "bg-indigo-50 border border-indigo-200 text-indigo-600" : "bg-indigo-600/20 border border-indigo-500/30 text-indigo-400"
                            }`}>
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-sm md:text-base font-bold tracking-tight">
                                        Ders Planları & Çalışma Alanı
                                    </h1>
                                    <span className={`hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                        isLight 
                                            ? "bg-indigo-50 text-indigo-700 border border-indigo-200" 
                                            : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                    }`}>
                                        Sol: Plan • Sağ: İçerik & Kod
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center: Level Switcher (Strictly Seviye 1, 2, 3) */}
                    <div className={`flex items-center p-1 rounded-xl border transition-colors ${
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
                                        px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5
                                        ${isSelected
                                            ? lvl === "Seviye 1" 
                                                ? "bg-emerald-600 text-white shadow-sm"
                                                : lvl === "Seviye 2"
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "bg-indigo-600 text-white shadow-sm"
                                            : isLight 
                                                ? "text-slate-600 hover:text-slate-900 hover:bg-white" 
                                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                                        }
                                    `}
                                >
                                    {lvl === "Seviye 1" && <Layers className="w-3.5 h-3.5" />}
                                    {lvl === "Seviye 2" && <GraduationCap className="w-3.5 h-3.5" />}
                                    {lvl === "Seviye 3" && <Code2 className="w-3.5 h-3.5" />}
                                    <span>{lvl}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Theme Toggle (Sun/Moon), Mesai Button */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle Button with Sun/Moon */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleTheme}
                            className={`h-9 px-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                                isLight 
                                    ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900" 
                                    : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                            title={isLight ? "Koyu Mod'a geç" : "Açık (Gündüz) Mod'a geç"}
                        >
                            {isLight ? (
                                <>
                                    <Moon className="w-4 h-4 text-indigo-600" />
                                    <span>Koyu Mod</span>
                                </>
                            ) : (
                                <>
                                    <Sun className="w-4 h-4 text-amber-400" />
                                    <span>Açık Mod</span>
                                </>
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onSwitchToMesai}
                            className={`text-xs h-9 font-medium ${
                                isLight 
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" 
                                    : "bg-slate-900 border-slate-800 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300"
                            }`}
                        >
                            <Clock className="w-3.5 h-3.5 mr-1.5" />
                            Mesai Takip
                        </Button>
                    </div>

                </div>

                {/* Week Selector Bar (Hafta 1 ... Hafta 8) */}
                <div className={`max-w-[1920px] mx-auto mt-2.5 pt-2.5 border-t flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin ${
                    isLight ? "border-slate-200" : "border-slate-800/60"
                }`}>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider mr-1 shrink-0 ${
                        isLight ? "text-slate-500" : "text-slate-400"
                    }`}>
                        Haftalar:
                    </span>
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
                                    px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0
                                    ${isWeekSelected
                                        ? isLight 
                                            ? "bg-indigo-600 text-white shadow-xs font-bold" 
                                            : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold"
                                        : isLight 
                                            ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200" 
                                            : "bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/60"
                                    }
                                `}
                            >
                                <span>Hafta {item.week}</span>
                                {hasCustom && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Gerçek içerik / plan ekli" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* Sub-header: Current Week Title & Quick Info */}
            <div className={`border-b px-4 py-2 shrink-0 transition-colors ${
                isLight ? "bg-white/60 border-slate-200" : "bg-slate-950/40 border-slate-800/80"
            }`}>
                <div className="max-w-[1920px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                            isLight 
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-200" 
                                : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        }`}>
                            {selectedLevel} • Hafta {currentWeekPlan.week}
                        </span>
                        <h2 className={`text-xs md:text-sm font-semibold truncate ${isLight ? "text-slate-900" : "text-slate-200"}`}>
                            {currentWeekPlan.title}
                        </h2>
                        {currentWeekPlan.category && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full hidden sm:inline-block ${
                                isLight ? "bg-slate-200 text-slate-700" : "bg-slate-800 text-slate-300"
                            }`}>
                                {currentWeekPlan.category}
                            </span>
                        )}
                    </div>

                    {/* Split View Toggles */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 text-xs">
                        {expandMode !== "none" && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandMode("none")}
                                className={`h-7 px-2 text-[11px] ${
                                    isLight ? "text-slate-700 bg-slate-200 hover:bg-slate-300" : "text-slate-300 bg-slate-800 hover:bg-slate-700"
                                }`}
                            >
                                <Minimize2 className="w-3 h-3 mr-1" />
                                İki Paneli Gör
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandMode(expandMode === "left" ? "none" : "left")}
                            className={`h-7 px-2 text-[11px] ${
                                expandMode === "left" 
                                    ? "bg-indigo-600 text-white" 
                                    : isLight ? "text-slate-600 hover:bg-slate-200" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                            title="Sol Paneli Büyüt (Google Docs)"
                        >
                            <FileText className="w-3 h-3 mr-1" />
                            {expandMode === "left" ? "Küçült" : "Yalnızca Plan"}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandMode(expandMode === "right" ? "none" : "right")}
                            className={`h-7 px-2 text-[11px] ${
                                expandMode === "right" 
                                    ? "bg-indigo-600 text-white" 
                                    : isLight ? "text-slate-600 hover:bg-slate-200" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                            title="Sağ Paneli Büyüt (İçerik & Kod)"
                        >
                            <Code2 className="w-3 h-3 mr-1" />
                            {expandMode === "right" ? "Küçült" : "Yalnızca İçerik"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Area: Split Screen (Left: Google Docs, Right: Code/AI/Editor) */}
            <main className="flex-1 p-2 md:p-3 overflow-hidden">
                <div className={`
                    h-[calc(100vh-165px)] min-h-[550px]
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
                            <div className={`border-b px-3 py-2 flex items-center justify-between gap-2 shrink-0 ${
                                isLight ? "bg-slate-50 border-slate-200" : "bg-slate-900/90 border-slate-800"
                            }`}>
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                                        isLight ? "bg-blue-100 text-blue-600" : "bg-blue-500/20 text-blue-400"
                                    }`}>
                                        <FileText className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-xs font-bold truncate ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                                                Haftalık Ders Planı (Google Docs)
                                            </span>
                                            {embedUrl && (
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Aktif Önizleme" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Doc Actions */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                    {effectiveDocUrl && (
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
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingDocUrl(!isEditingDocUrl)}
                                        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                                            isLight 
                                                ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100" 
                                                : "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                                        }`}
                                        title="Bu haftanın Google Docs linkini değiştir veya ekle"
                                    >
                                        <Edit3 className="w-3 h-3" />
                                        <span>Link Düzenle</span>
                                    </button>
                                </div>
                            </div>

                            {/* Google Docs URL Edit Drawer/Input */}
                            {isEditingDocUrl && (
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

                            {/* Google Docs Embed Container */}
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

                            {/* Left Footer Info */}
                            <div className={`border-t px-3 py-1.5 flex items-center justify-between text-[11px] shrink-0 ${
                                isLight ? "bg-slate-50 border-slate-200 text-slate-500" : "bg-slate-900/60 border-slate-800/80 text-slate-500"
                            }`}>
                                <span>Google Docs Entegrasyonu</span>
                                <span>{selectedLevel} • Hafta {selectedWeek}</span>
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
                                                                ? "bg-white text-indigo-700 border border-slate-300 shadow-xs font-bold" 
                                                                : "bg-[#1e1e2e] text-[#cdd6f4] border border-slate-700/60 shadow-xs font-semibold"
                                                            : isLight 
                                                                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200" 
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
                                        <span className={`text-xs italic ${isLight ? "text-slate-400" : "text-slate-500"}`}>
                                            (İçerik Sekmesi Yok)
                                        </span>
                                    )}
                                </div>

                                {/* Right Actions: Copy, Terminal, Edit/Save */}
                                <div className="flex items-center gap-1.5 shrink-0">
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
                                                        <span className="text-emerald-500">Kopyalandı</span>
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

                                    {/* Edit Button */}
                                    {!isEditingContent ? (
                                        <Button
                                            size="sm"
                                            onClick={handleStartEditing}
                                            className={`h-7 px-2 text-[11px] font-medium transition-colors ${
                                                isLight 
                                                    ? "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200" 
                                                    : "bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40"
                                            }`}
                                        >
                                            <Edit3 className="w-3 h-3 mr-1" />
                                            <span>Düzenle</span>
                                        </Button>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <Button
                                                size="sm"
                                                onClick={handleSaveContent}
                                                className="h-7 px-2.5 text-[11px] font-medium bg-emerald-600 hover:bg-emerald-500 text-white"
                                            >
                                                <Save className="w-3 h-3 mr-1" />
                                                <span>Kaydet</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsEditingContent(false)}
                                                className={`h-7 px-2 text-[11px] ${isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* BODY CONTENT: EDIT MODE vs VIEW MODE */}
                            <div className="flex-1 overflow-auto flex flex-col">

                                {/* 1. EDIT MODE */}
                                {isEditingContent ? (
                                    <div className={`p-4 space-y-4 flex-1 overflow-y-auto ${isLight ? "bg-slate-50 text-slate-900" : "bg-[#181825] text-slate-100"}`}>
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <div>
                                                <h3 className="text-sm font-bold">Haftalık İçeriği & Sekmeleri Düzenle</h3>
                                                <p className="text-xs opacity-75">Bu haftaya özgü kod, Arduino/Unity çalışması veya konu notları ekleyin.</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleResetContent}
                                                className="text-rose-600 hover:text-rose-700 text-xs h-7"
                                                title="Özel içeriği sil ve varsayılana dön"
                                            >
                                                <RotateCcw className="w-3 h-3 mr-1" />
                                                Sıfırla
                                            </Button>
                                        </div>

                                        {/* Meta fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[11px] font-bold block mb-1">Ders Başlığı:</label>
                                                <Input
                                                    value={editForm.title}
                                                    onChange={(e) => setEditForm(p => ({ ...p, title: e.target.value }))}
                                                    placeholder="Örn: Arduino ile Mesafe Sensörü Uygulaması"
                                                    className={`h-8 text-xs ${isLight ? "bg-white" : "bg-slate-900 border-slate-700"}`}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-bold block mb-1">Kategori / Alan:</label>
                                                <Input
                                                    value={editForm.category}
                                                    onChange={(e) => setEditForm(p => ({ ...p, category: e.target.value }))}
                                                    placeholder="Örn: Arduino / Robotik, Unity / C#, Python, Tasarım"
                                                    className={`h-8 text-xs ${isLight ? "bg-white" : "bg-slate-900 border-slate-700"}`}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[11px] font-bold block mb-1">Kısa Özet / Kazanım Açıklaması:</label>
                                            <Input
                                                value={editForm.summary}
                                                onChange={(e) => setEditForm(p => ({ ...p, summary: e.target.value }))}
                                                placeholder="Bu hafta öğrencilere aktarılacak temel hedefler..."
                                                className={`h-8 text-xs ${isLight ? "bg-white" : "bg-slate-900 border-slate-700"}`}
                                            />
                                        </div>

                                        {/* Tabs Editor */}
                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold flex items-center gap-1.5">
                                                    <span>Sekmeler ve Materyaller:</span>
                                                    <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                                                        {editForm.tabs.length} Sekme
                                                    </span>
                                                </label>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleAddTab("code")}
                                                        className="h-6 px-2 text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white"
                                                    >
                                                        <Plus className="w-2.5 h-2.5 mr-1" />
                                                        + Kod
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleAddTab("arduino")}
                                                        className="h-6 px-2 text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white"
                                                    >
                                                        <Plus className="w-2.5 h-2.5 mr-1" />
                                                        + Arduino
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleAddTab("unity")}
                                                        className="h-6 px-2 text-[10px] bg-blue-600 hover:bg-blue-500 text-white"
                                                    >
                                                        <Plus className="w-2.5 h-2.5 mr-1" />
                                                        + Unity
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleAddTab("text")}
                                                        className="h-6 px-2 text-[10px] bg-amber-600 hover:bg-amber-500 text-white"
                                                    >
                                                        <Plus className="w-2.5 h-2.5 mr-1" />
                                                        + Bilgi/Not
                                                    </Button>
                                                </div>
                                            </div>

                                            {editForm.tabs.map((tab, idx) => (
                                                <div 
                                                    key={tab.id}
                                                    className={`p-3 rounded-xl border space-y-2 ${
                                                        isLight ? "bg-white border-slate-200" : "bg-slate-900/80 border-slate-800"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex items-center gap-2 flex-1">
                                                            <Input
                                                                value={tab.title}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setEditForm(p => ({
                                                                        ...p,
                                                                        tabs: p.tabs.map((t, i) => i === idx ? { ...t, title: val } : t)
                                                                    }));
                                                                }}
                                                                placeholder="Sekme Adı (örn: ornek.py, arduino.ino, gorevler.md)"
                                                                className={`h-7 text-xs font-mono font-bold max-w-[220px] ${
                                                                    isLight ? "bg-slate-50" : "bg-slate-950 border-slate-700"
                                                                }`}
                                                            />
                                                            <span className="text-[10px] uppercase font-bold text-slate-500">
                                                                {tab.type}
                                                            </span>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDeleteTab(idx)}
                                                            className="text-rose-500 hover:text-rose-600 h-6 w-6 p-0"
                                                            title="Sekmeyi Sil"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </div>

                                                    <textarea
                                                        rows={6}
                                                        value={tab.content}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setEditForm(p => ({
                                                                ...p,
                                                                tabs: p.tabs.map((t, i) => i === idx ? { ...t, content: val } : t)
                                                            }));
                                                        }}
                                                        placeholder="Kod, devre bağlantı şeması veya açıklama metni girin..."
                                                        className={`w-full p-2.5 rounded-lg text-xs font-mono border leading-relaxed outline-none focus:ring-1 focus:ring-indigo-500 ${
                                                            isLight 
                                                                ? "bg-slate-50 border-slate-200 text-slate-900" 
                                                                : "bg-slate-950 border-slate-700 text-slate-200"
                                                        }`}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-2 flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setIsEditingContent(false)}
                                                className="text-xs"
                                            >
                                                İptal
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={handleSaveContent}
                                                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                                            >
                                                <Save className="w-3.5 h-3.5 mr-1" />
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
                                                    isLight ? "bg-slate-50 text-slate-900" : "bg-[#181825] text-slate-100"
                                                }`}>
                                                    {activeTab && (activeTab.type === "code" || activeTab.type === "arduino" || activeTab.type === "unity") ? (
                                                        <div className="flex">
                                                            {/* Line Numbers */}
                                                            <div className={`select-none pr-4 text-right border-r mr-4 font-mono text-xs leading-relaxed shrink-0 ${
                                                                isLight ? "text-slate-400 border-slate-200" : "text-slate-600 border-slate-800"
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
                                                            <div className={`p-3 rounded-lg border ${
                                                                isLight ? "bg-indigo-50 border-indigo-200 text-indigo-900" : "bg-indigo-500/10 border-indigo-500/20 text-indigo-200"
                                                            }`}>
                                                                <div className="flex items-center gap-2 font-bold mb-1">
                                                                    {getTabIcon(activeTab.type)}
                                                                    <span>{activeTab.title}</span>
                                                                </div>
                                                                <p className="text-xs opacity-80">
                                                                    {currentWeekPlan.summary}
                                                                </p>
                                                            </div>

                                                            <div className={`p-4 rounded-lg border whitespace-pre-wrap font-sans ${
                                                                isLight ? "bg-white border-slate-200 text-slate-800" : "bg-[#1e1e2e] border-slate-800 text-slate-200"
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
