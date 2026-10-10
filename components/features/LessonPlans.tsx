"use client";

import { useState, useMemo } from "react";
import { 
    BookOpen, 
    ArrowLeft, 
    Clock, 
    Search, 
    Layers, 
    GraduationCap, 
    Code, 
    Gamepad2, 
    Terminal, 
    FolderGit2, 
    CheckCircle2, 
    ChevronRight,
    FileText,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Level } from "@/lib/types";

interface LessonPlansProps {
    onBackToHub: () => void;
    onSwitchToMesai: () => void;
}

interface LessonItem {
    id: string;
    level: "Seviye 1" | "Seviye 2" | "Seviye 3" | "Unity" | "Python" | "Diğer";
    week: number;
    title: string;
    summary: string;
    duration: string;
    objectives: string[];
    tags: string[];
}

// Sample structured curriculum data for all levels
const SAMPLE_LESSONS: LessonItem[] = [
    // Seviye 1
    {
        id: "s1-w1",
        level: "Seviye 1",
        week: 1,
        title: "Algoritma Mantığı ve Problem Çözme",
        summary: "Günlük hayattaki algoritmalar, adım adım düşünme ve akış şemalarına giriş.",
        duration: "3 Saat",
        objectives: ["Algoritma kavramını anlama", "Problem adımlarını sıralama", "Hata ayıklama mantığı"],
        tags: ["Algoritma", "Problem Çözme"]
    },
    {
        id: "s1-w2",
        level: "Seviye 1",
        week: 2,
        title: "Blok Tabanlı Kodlamaya Giriş & Karakter Hareketi",
        summary: "Çalışma ortamının tanıtımı, sahne ve koordinat düzlemi üzerinde karakter kontrolleri.",
        duration: "3 Saat",
        objectives: ["Arayüzü tanıma", "X ve Y koordinatları", "Temel hareket blokları"],
        tags: ["Blok Kodlama", "Koordinatlar"]
    },
    {
        id: "s1-w3",
        level: "Seviye 1",
        week: 3,
        title: "Döngüler (Loops) ile Tekrarlı Hareketler",
        summary: "Kod tekrarını önleme, sürekli ve belirli sayıda tekrarlayan blokların kullanımı.",
        duration: "3 Saat",
        objectives: ["Döngü mantığını kavrama", "Sayaçlı döngüler", "Labirent çözümü"],
        tags: ["Döngüler", "Labirent"]
    },
    {
        id: "s1-w4",
        level: "Seviye 1",
        week: 4,
        title: "Koşullu Durumlar (If-Else) ve Karar Yapıları",
        summary: "Şartlı ifadeler, algılama blokları ve kullanıcı etkileşimli mini senaryolar.",
        duration: "3 Saat",
        objectives: ["Eğer/ise koşulları", "Sensör/algılama kullanımı", "Puan sistemi"],
        tags: ["Koşullar", "Karar Yapıları"]
    },

    // Seviye 2
    {
        id: "s2-w1",
        level: "Seviye 2",
        week: 1,
        title: "Metin Tabanlı Kodlamaya Geçiş & Değişkenler",
        summary: "Bloklardan metin kodlamaya geçiş mantığı, veri tipleri (string, int, float, boolean).",
        duration: "3 Saat",
        objectives: ["Sözdizimi (Syntax) kuralları", "Değişken tanımlama", "Veri tipleri ve dönüşümler"],
        tags: ["Sözdizimi", "Değişkenler"]
    },
    {
        id: "s2-w2",
        level: "Seviye 2",
        week: 2,
        title: "Mantıksal Operatörler ve Gelişmiş Şartlar",
        summary: "Ve / Veya bağlaçları, iç içe koşul blokları ve hata yönetimi temelleri.",
        duration: "3 Saat",
        objectives: ["Mantıksal karşılaştırmalar", "İç içe if-else", "Girdi doğrulama"],
        tags: ["Mantık", "Karşılaştırma"]
    },
    {
        id: "s2-w3",
        level: "Seviye 2",
        week: 3,
        title: "Listeler ve Koleksiyonlar",
        summary: "Birden fazla veriyi saklama, diziler (array/list), eleman ekleme, çıkarma ve index yapısı.",
        duration: "3 Saat",
        objectives: ["Liste index mantığı", "Eleman arama ve filtreleme", "Koleksiyon döngüleri"],
        tags: ["Listeler", "Diziler"]
    },

    // Seviye 3
    {
        id: "s3-w1",
        level: "Seviye 3",
        week: 1,
        title: "Fonksiyonlar ve Modüler Kodlama",
        summary: "Parametre alan ve değer döndüren fonksiyonlar, kodun yeniden kullanılabilirliği.",
        duration: "3 Saat",
        objectives: ["Fonksiyon tanımlama", "Parametre ve return", "Kapsam (Scope) kuralları"],
        tags: ["Fonksiyonlar", "Modülerlik"]
    },
    {
        id: "s3-w2",
        level: "Seviye 3",
        week: 2,
        title: "Nesne Yönelimli Programlamaya (OOP) Giriş",
        summary: "Sınıf (Class) ve Nesne (Object) mantığı, özellikler ve metotlar.",
        duration: "3 Saat",
        objectives: ["Class yapısı", "Instance oluşturma", "Kapsülleme (Encapsulation)"],
        tags: ["OOP", "Sınıflar"]
    },

    // Unity
    {
        id: "unity-w1",
        level: "Unity",
        week: 1,
        title: "Unity Arayüzü, GameObjects & Bileşenler",
        summary: "Unity Editor kurulumu, sahne hiyerarşisi, Transform, Rigidbody ve Collider kavramları.",
        duration: "3 Saat",
        objectives: ["Unity arayüzüne hakimiyet", "2D/3D sahne yapısı", "Temel fizik bileşenleri"],
        tags: ["Unity Editor", "Fizik"]
    },
    {
        id: "unity-w2",
        level: "Unity",
        week: 2,
        title: "C# Scripting ile Karakter Hareketi",
        summary: "Klavye ve fare girdilerini okuma (Input), hareket vektörleri ve kamera takibi.",
        duration: "3 Saat",
        objectives: ["MonoBehaviour döngüsü (Update, Start)", "Input alma", "Hareket fiziği"],
        tags: ["C# Scripting", "Karakter Kontrolü"]
    },
    {
        id: "unity-w3",
        level: "Unity",
        week: 3,
        title: "Çarpışma Algılama (Collisions & Triggers)",
        summary: "OnCollisionEnter ve OnTriggerEnter olayları, puan toplama ve engeller.",
        duration: "3 Saat",
        objectives: ["Trigger ve Collider farkı", "Etkileşim kodlama", "Ses ve efekt tetikleme"],
        tags: ["Çarpışmalar", "Oyun Mekaniği"]
    },

    // Python
    {
        id: "py-w1",
        level: "Python",
        week: 1,
        title: "Python ile Programlamaya Giriş",
        summary: "Python kurulumu, terminal kullanımı, değişkenler, print ve input fonksiyonları.",
        duration: "3 Saat",
        objectives: ["Python temelleri", "Konsol etkileşimi", "Aritmetik işlemler"],
        tags: ["Python", "Giriş"]
    },
    {
        id: "py-w2",
        level: "Python",
        week: 2,
        title: "Veri Yapıları & Dosya İşlemleri",
        summary: "Sözlükler (Dictionaries), setler, metin dosyaları okuma ve yazma.",
        duration: "3 Saat",
        objectives: ["Key-value veri modeli", "Dosya I/O", "Hata yakalama (try-except)"],
        tags: ["Veri Yapıları", "Dosya I/O"]
    },

    // Diğer
    {
        id: "diger-w1",
        level: "Diğer",
        week: 1,
        title: "Özel Atölye ve Hackathon Çalışması",
        summary: "Öğrencilerin bağımsız proje geliştirmesi, mentorluk ve sunum hazırlığı.",
        duration: "3-4 Saat",
        objectives: ["Takım çalışması", "Proje planlama", "Sunum ve demo"],
        tags: ["Atölye", "Proje"]
    }
];

export function LessonPlans({ onBackToHub, onSwitchToMesai }: LessonPlansProps) {
    const [selectedLevel, setSelectedLevel] = useState<string>("Tümü");
    const [searchQuery, setSearchQuery] = useState("");

    const levels = ["Tümü", "Seviye 1", "Seviye 2", "Seviye 3", "Unity", "Python", "Diğer"];

    const getLevelIcon = (level: string) => {
        switch (level) {
            case "Seviye 1": return <Layers className="w-4 h-4 text-emerald-600" />;
            case "Seviye 2": return <GraduationCap className="w-4 h-4 text-indigo-600" />;
            case "Seviye 3": return <Code className="w-4 h-4 text-violet-600" />;
            case "Unity": return <Gamepad2 className="w-4 h-4 text-blue-600" />;
            case "Python": return <Terminal className="w-4 h-4 text-amber-600" />;
            default: return <FolderGit2 className="w-4 h-4 text-slate-600" />;
        }
    };

    const getLevelBadgeColor = (level: string) => {
        switch (level) {
            case "Seviye 1": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Seviye 2": return "bg-indigo-50 text-indigo-700 border-indigo-200";
            case "Seviye 3": return "bg-violet-50 text-violet-700 border-violet-200";
            case "Unity": return "bg-blue-50 text-blue-700 border-blue-200";
            case "Python": return "bg-amber-50 text-amber-700 border-amber-200";
            default: return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    const filteredLessons = useMemo(() => {
        return SAMPLE_LESSONS.filter(lesson => {
            const matchesLevel = selectedLevel === "Tümü" || lesson.level === selectedLevel;
            const query = searchQuery.toLowerCase().trim();
            const matchesQuery = !query || 
                lesson.title.toLowerCase().includes(query) ||
                lesson.summary.toLowerCase().includes(query) ||
                lesson.tags.some(t => t.toLowerCase().includes(query)) ||
                lesson.level.toLowerCase().includes(query) ||
                `hafta ${lesson.week}`.includes(query);

            return matchesLevel && matchesQuery;
        });
    }, [selectedLevel, searchQuery]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans animate-fade-in">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Top Navigation Bar */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBackToHub}
                            className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1.5" />
                            Ana Menü
                        </Button>
                        <div className="h-5 w-px bg-slate-200" />
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                                    Ders Planları & Müfredat
                                </h1>
                                <p className="text-xs text-slate-500">
                                    Seviyelere göre haftalık ders kazanımları ve eğitim içerikleri
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onSwitchToMesai}
                            className="w-full md:w-auto text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-semibold"
                        >
                            <Clock className="w-4 h-4 mr-1.5" />
                            Mesai Takip'e Geç
                        </Button>
                    </div>
                </header>

                {/* Level Tabs & Search Filter */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    {/* Level Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                        {levels.map((lvl) => {
                            const isSelected = selectedLevel === lvl;
                            return (
                                <button
                                    key={lvl}
                                    type="button"
                                    onClick={() => setSelectedLevel(lvl)}
                                    className={`
                                        px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5
                                        ${isSelected 
                                            ? 'bg-indigo-600 text-white shadow-xs scale-102' 
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                                        }
                                    `}
                                >
                                    {lvl !== "Tümü" && getLevelIcon(lvl)}
                                    <span>{lvl}</span>
                                    <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                        {lvl === "Tümü" 
                                            ? SAMPLE_LESSONS.length 
                                            : SAMPLE_LESSONS.filter(l => l.level === lvl).length
                                        }
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <Input
                            placeholder="Konu başlığı, kazanım veya hafta ara... (örn: Döngüler, C# Scripting, Hafta 1)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-10 bg-slate-50 border-slate-200 text-sm focus:bg-white"
                        />
                    </div>
                </div>

                {/* Notice Banner */}
                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-900 flex items-start gap-3 text-xs md:text-sm">
                    <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                        <span className="font-semibold">Ders Planları Altyapısı Hazır: </span>
                        Seviyelere göre modüler ders planı yapısı kuruldu. İlerleyen aşamalarda haftalık ders materyallerini, PDF indirebilmeyi veya düzenleyebilmeyi ekleyebiliriz.
                    </div>
                </div>

                {/* Lesson Cards Grid */}
                {filteredLessons.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                        <FileText className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                        <h3 className="text-base font-semibold text-slate-700">Aramanıza uygun ders planı bulunamadı</h3>
                        <p className="text-xs text-slate-400 mt-1">Farklı bir seviye veya arama kelimesi deneyebilirsiniz.</p>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => { setSelectedLevel("Tümü"); setSearchQuery(""); }} 
                            className="mt-4 text-xs"
                        >
                            Filtreleri Temizle
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {filteredLessons.map((lesson) => (
                            <Card 
                                key={lesson.id} 
                                className="bg-white border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between hover:border-indigo-300"
                            >
                                <CardHeader className="pb-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getLevelBadgeColor(lesson.level)}`}>
                                            {lesson.level}
                                        </span>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                                Hafta {lesson.week}
                                            </span>
                                            <span>•</span>
                                            <span>{lesson.duration}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-base font-bold text-slate-900 leading-snug">
                                        {lesson.title}
                                    </CardTitle>
                                    <CardDescription className="text-xs text-slate-500 line-clamp-2">
                                        {lesson.summary}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="pt-0 space-y-3">
                                    {/* Objectives */}
                                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                                            Temel Kazanımlar:
                                        </span>
                                        <ul className="space-y-1">
                                            {lesson.objectives.map((obj, i) => (
                                                <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>{obj}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tags */}
                                    <div className="pt-2 flex flex-wrap gap-1">
                                        {lesson.tags.map((tag, i) => (
                                            <span key={i} className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
