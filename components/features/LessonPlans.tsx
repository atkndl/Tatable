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
    Play, 
    Edit3, 
    Save, 
    FileCode, 
    HelpCircle, 
    ListChecks,
    ChevronRight,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LessonPlansProps {
    onBackToHub: () => void;
    onSwitchToMesai: () => void;
}

type LevelType = "Seviye 1" | "Seviye 2" | "Seviye 3";

interface WeekPlan {
    week: number;
    title: string;
    summary: string;
    docUrl?: string; // Google Docs link
    codeFile: {
        filename: string;
        language: "csharp" | "python" | "javascript" | "markdown";
        code: string;
        output: string;
    };
    tasks: {
        filename: string;
        code: string;
    };
    notesMarkdown: string;
    teacherAiNotes: string;
}

// Default Google Docs link provided by user for Seviye 3 Hafta 1
const DEFAULT_SEVIYE_3_HAFTA_1_DOC = "https://docs.google.com/document/d/15dPpS36dixuKTY6SnWyoWlWS-SAMWW3C/edit";

// Curriculum definitions for Seviye 1, Seviye 2, Seviye 3 (8 weeks each)
const INITIAL_CURRICULUM: Record<LevelType, WeekPlan[]> = {
    "Seviye 1": [
        {
            week: 1,
            title: "Algoritma Mantığı ve Problem Çözme",
            summary: "Günlük hayattaki algoritmalar, adım adım düşünme ve akış şemalarına giriş.",
            docUrl: "",
            codeFile: {
                filename: "algoritma_temelleri.py",
                language: "python",
                code: `# ==========================================
# SEVİYE 1 - HAFTA 1: ALGORİTMA VE AKIŞ MANTIĞI
# Problem Çözme & Adım Adım Düşünme
# ==========================================

# Algoritma: Bir problemi çözmek için izlenen sıralı adımlar bütünüdür.
# Örnek Senaryo: Çay Demleme veya Karakter Yürütme Algoritması

def adim_adim_hareket():
    print("Adım 1: Karakter başlangıç noktasında duruyor.")
    print("Adım 2: 3 adım ileri yürü.")
    print("Adım 3: Sağa dön (90 derece).")
    print("Adım 4: 2 adım ileri yürü ve elmayı topla.")
    print("Adım 5: Hedefe ulaşıldı! Görev tamamlandı.")

# Algoritmayı çalıştıralım:
adim_adim_hareket()`,
                output: `Adım 1: Karakter başlangıç noktasında duruyor.
Adım 2: 3 adım ileri yürü.
Adım 3: Sağa dön (90 derece).
Adım 4: 2 adım ileri yürü ve elmayı topla.
Adım 5: Hedefe ulaşıldı! Görev tamamlandı.
[Program başarıyla tamamlandı]`
            },
            tasks: {
                filename: "hafta1_gorevler.py",
                code: `# HAFTA 1 ÖĞRENCİ GÖREVLERİ:
# Görev 1: Karakterin labirentten çıkması için 5 adımlı bir rota yazın.
# Görev 2: Eğer önüne taş çıkarsa zıplamasını sağlayacak adımı ekleyin.
# Görev 3: Kendi sabah uyanma algoritmanızı print komutlarıyla listeleyin.`
            },
            notesMarkdown: `### 🎯 Hafta 1 Kazanımları:
- Algoritma kavramını ve önemini kavrama
- Günlük hayat problemleri ile kodlama arasındaki ilişkiyi kurma
- Sıralı işlem (Sequential Execution) mantığı
- Hata ayıklama (Debugging) temelleri`,
            teacherAiNotes: `🤖 AI Eğitmen Tavsiyesi:
- Öğrencilere algoritmayı anlatırken robot taklidi yaptırın: "Beni masaya götürün ama sadece ileri, dön komutları verin."
- Bir adımı atlarlarsa (örneğin kapıyı açmadan içeri girmeye çalışmak) algoritmanın neden hata verdiğini somut gösterin.`
        },
        {
            week: 2,
            title: "Blok Tabanlı Kodlamaya Giriş & Karakter Hareketi",
            summary: "Çalışma ortamının tanıtımı, sahne ve koordinat düzlemi üzerinde karakter kontrolleri.",
            docUrl: "",
            codeFile: {
                filename: "karakter_hareketi.py",
                language: "python",
                code: `# ==========================================
# SEVİYE 1 - HAFTA 2: KOORDİNATLAR VE HAREKET
# X ve Y Düzleminde Konumlandırma
# ==========================================

x = 0
y = 0

def saga_git(adim):
    global x
    x += adim
    print(f"Karakter sağa gitti -> Yeni Konum: (X: {x}, Y: {y})")

def yukari_git(adim):
    global y
    y += adim
    print(f"Karakter yukarı gitti -> Yeni Konum: (X: {x}, Y: {y})")

saga_git(10)
yukari_git(15)`,
                output: `Karakter sağa gitti -> Yeni Konum: (X: 10, Y: 0)
Karakter yukarı gitti -> Yeni Konum: (X: 10, Y: 15)`
            },
            tasks: {
                filename: "gorevler.py",
                code: `# Karakteri (X: 50, Y: 50) noktasına götüren fonksiyon çağrılarını yapın.`
            },
            notesMarkdown: `X ve Y koordinatları ile 2 boyutlu düzlem mantığı pekiştirilir.`,
            teacherAiNotes: `Merkez noktanın (0,0) olduğunu ve sağa gittikçe X'in, yukarı gittikçe Y'nin arttığını görselleştirin.`
        },
        {
            week: 3,
            title: "Döngüler (Loops) ile Tekrarlı Hareketler",
            summary: "Kod tekrarını önleme, sürekli ve belirli sayıda tekrarlayan blokların kullanımı.",
            docUrl: "",
            codeFile: {
                filename: "donguler.py",
                language: "python",
                code: `# 5 kere kare çizdirme döngüsü
for i in range(1, 6):
    print(f"Döngü Adımı {i}: 10 adım ileri git, 90 derece dön.")`,
                output: `Döngü Adımı 1: 10 adım ileri git, 90 derece dön.
Döngü Adımı 2: 10 adım ileri git, 90 derece dön.
Döngü Adımı 3: 10 adım ileri git, 90 derece dön.
Döngü Adımı 4: 10 adım ileri git, 90 derece dön.
Döngü Adımı 5: 10 adım ileri git, 90 derece dön.`
            },
            tasks: { filename: "gorevler.py", code: `# 10'dan geriye doğru sayan bir döngü yazın.` },
            notesMarkdown: `Döngülerin zaman ve kod tasarrufu sağladığı anlatılır.`,
            teacherAiNotes: `Aynı satırı 100 kere yazmanın zorluğunu hissettirin.`
        },
        { week: 4, title: "Koşullu Durumlar (If-Else) ve Karar Yapıları", summary: "Şartlı ifadeler, algılama blokları ve kullanıcı etkileşimli mini senaryolar.", docUrl: "", codeFile: { filename: "kosullar.py", language: "python", code: `can = 100\nif can <= 0:\n    print("Oyun Bitti!")\nelse:\n    print(f"Oyuna devam, canınız: {can}")`, output: `Oyuna devam, canınız: 100` }, tasks: { filename: "gorevler.py", code: `# Puan 50'den büyükse kazandın mesajı verin.` }, notesMarkdown: `Karar mekanizmaları.`, teacherAiNotes: `Trafik ışıkları benzetmesi yapın.` },
        { week: 5, title: "Değişkenler ve Puan Sistemi", summary: "Skor, can, sayaç gibi verilerin saklanması ve güncellenmesi.", docUrl: "", codeFile: { filename: "puan_sistemi.py", language: "python", code: `skor = 0\nskor += 10\nprint("Yeni Skor:", skor)`, output: `Yeni Skor: 10` }, tasks: { filename: "gorevler.py", code: `# Altın toplandığında skoru 5 artıran kodu yazın.` }, notesMarkdown: `Değişkenlerin kutu benzetmesi ile anlatımı.`, teacherAiNotes: `Değişkeni etiketli bir kutu gibi hayal ettirin.` },
        { week: 6, title: "Karakterler Arası Mesajlaşma & Olaylar", summary: "Haber salma, sinyal gönderme ve çoklu karakter yönetimi.", docUrl: "", codeFile: { filename: "olaylar.py", language: "python", code: `print("Haber salındı: 'Oyun_Basladi'")\nprint("Karakter 2 mesajı aldı ve koşmaya başladı.")`, output: `Haber salındı: 'Oyun_Basladi'\nKarakter 2 mesajı aldı ve koşmaya başladı.` }, tasks: { filename: "gorevler.py", code: `# Oyun bitti mesajı yollayın.` }, notesMarkdown: `Event-driven programlama temelleri.`, teacherAiNotes: `Telsiz konuşması benzetmesi kullanın.` },
        { week: 7, title: "Labirent ve Engel Algılama Oyunu", summary: "Çarpışma kontrolleri, sensörler ve bitiş çizgisi mantığı.", docUrl: "", codeFile: { filename: "labirent.py", language: "python", code: `def carpisma_kontrol(duvar):\n    if duvar:\n        return "Geri sek!"\n    return "İlerlemeye devam et."\nprint(carpisma_kontrol(True))`, output: `Geri sek!` }, tasks: { filename: "gorevler.py", code: `# Labirentin sonundaki hazineye ulaşma şartı yazın.` }, notesMarkdown: `Oyun mantığının birleştirilmesi.`, teacherAiNotes: `Öğrencilerin kendi labirent haritalarını çizmelerini sağlayın.` },
        { week: 8, title: "Dönem Sonu Projesi & Sunum", summary: "Öğrencilerin bağımsız oyun geliştirmesi ve sunumu.", docUrl: "", codeFile: { filename: "final_proje.py", language: "python", code: `print("=== DÖNEM PROJESİ ===")\nprint("Tüm öğrenilen bloklar birleştirildi!")`, output: `=== DÖNEM PROJESİ ===\nTüm öğrenilen bloklar birleştirildi!` }, tasks: { filename: "gorevler.py", code: `# Projenizi tamamlayıp arkadaşlarınıza anlatın.` }, notesMarkdown: `Proje sunumu ve değerlendirme.`, teacherAiNotes: `Her öğrenciye olumlu geri bildirim verin.` }
    ],
    "Seviye 2": [
        {
            week: 1,
            title: "Metin Tabanlı Kodlamaya Giriş ve Değişkenler",
            summary: "Sözdizimi (syntax), veri tipleri (string, int, float, bool) ve terminal kullanımı.",
            docUrl: "",
            codeFile: {
                filename: "degiskenler.py",
                language: "python",
                code: `# Metin tabanlı programlama temelleri
ad = "Ali"
yas = 14
boy = 1.68
ogrenci_mi = True

print(f"Adı: {ad}, Yaşı: {yas}, Boyu: {boy}m")
print(f"Öğrenci Durumu: {ogrenci_mi}")`,
                output: `Adı: Ali, Yaşı: 14, Boyu: 1.68m\nÖğrenci Durumu: True`
            },
            tasks: { filename: "gorevler.py", code: `# Kendi bilgilerinizi değişkenlere atayıp ekrana yazdırın.` },
            notesMarkdown: `Syntax hatalarını okuma ve terminal etkileşimi.`,
            teacherAiNotes: `Tırnak işaretleri ve veri tipi uyumsuzluklarını vurgulayın.`
        },
        { week: 2, title: "Aritmetik ve Mantıksal Operatörler", summary: "Matematiksel hesaplamalar, karşılaştırma operatörleri (==, !=, >, <) ve mantık bağlaçları.", docUrl: "", codeFile: { filename: "operatorler.py", language: "python", code: `a = 15\nb = 4\nprint("Bölüm:", a / b)\nprint("Kalan (Mod):", a % b)\nprint("Eşit mi:", a == b)`, output: `Bölüm: 3.75\nKalan (Mod): 3\nEşit mi: False` }, tasks: { filename: "gorevler.py", code: `# Sayının çift olup olmadığını mod (%) operatörüyle bulun.` }, notesMarkdown: `İşlem önceliği ve boolean mantık.`, teacherAiNotes: `Mod operatörünü saat veya takvim örneğiyle anlatın.` },
        { week: 3, title: "Koşullu Yapılar (If - Else If - Else)", summary: "Dallanma, iç içe koşullar ve çoklu şart kontrolü.", docUrl: "", codeFile: { filename: "kosullar.py", language: "python", code: `notu = 85\nif notu >= 85:\n    print("Takdir aldınız!")\nelif notu >= 70:\n    print("Teşekkür aldınız!")\nelse:\n    print("Biraz daha gayret!")`, output: `Takdir aldınız!` }, tasks: { filename: "gorevler.py", code: `# Hız sınırına göre ceza hesaplayan program yazın.` }, notesMarkdown: `elif sırasının önemi.`, teacherAiNotes: `Yukarıdan aşağıya doğru ilk sağlanan koşulun çalıştığını gösterin.` },
        { week: 4, title: "For ve While Döngüleri", summary: "Sayaçlı döngüler, koşula bağlı döngüler ve break/continue ifadeleri.", docUrl: "", codeFile: { filename: "donguler.py", language: "python", code: `toplam = 0\nfor sayi in range(1, 6):\n    toplam += sayi\nprint("1'den 5'e kadar toplam:", toplam)`, output: `1'den 5'e kadar toplam: 15` }, tasks: { filename: "gorevler.py", code: `# While döngüsü ile şifre doğru girilene kadar soran kod yazın.` }, notesMarkdown: `Sonsuz döngü (infinite loop) tehlikesi.`, teacherAiNotes: `While döngüsünde sayaç artırmayı unutmanın neye yol açtığını gösterin.` },
        { week: 5, title: "Listeler ve Dizi Operasyonları", summary: "Veri koleksiyonları, index erişimi, eleman ekleme (append), silme ve sıralama.", docUrl: "", codeFile: { filename: "listeler.py", language: "python", code: `oyuncular = ["Kerem", "Zeynep", "Mert"]\noyuncular.append("Selin")\nprint("İlk Oyuncu:", oyuncular[0])\nprint("Tüm Liste:", oyuncular)`, output: `İlk Oyuncu: Kerem\nTüm Liste: ['Kerem', 'Zeynep', 'Mert', 'Selin']` }, tasks: { filename: "gorevler.py", code: `# Listedeki en büyük sayıyı bulan kodu yazın.` }, notesMarkdown: `Index numarasının 0'dan başladığı kavramı.`, teacherAiNotes: `0. indeksi bir binanın zemin katı olarak anlatın.` },
        { week: 6, title: "Kullanıcı Girdileri ve Veri Doğrulama", summary: "input() fonksiyonu, tip dönüştürme (type casting) ve hata yakalama.", docUrl: "", codeFile: { filename: "girdi_kontrol.py", language: "python", code: `try:\n    sayi = int("42")\n    print("Karesi:", sayi ** 2)\nexcept ValueError:\n    print("Geçersiz sayı!")`, output: `Karesi: 1764` }, tasks: { filename: "gorevler.py", code: `# Kullanıcıdan iki sayı alıp toplayın, hata olursa yakalayın.` }, notesMarkdown: `String olarak gelen girdinin int'e çevrilmesi.`, teacherAiNotes: `Tip dönüşümü yapılmadığında "5" + "5" işleminin "55" olduğunu gösterin.` },
        { week: 7, title: "Metotlara Giriş ve Kod Modülerliği", summary: "Kendi fonksiyonlarımızı tanımlama, parametreler ve dönüş değerleri.", docUrl: "", codeFile: { filename: "fonksiyonlar.py", language: "python", code: `def dikdortgen_alan(kisa, uzun):\n    return kisa * uzun\n\nalan = dikdortgen_alan(5, 12)\nprint("Alan:", alan)`, output: `Alan: 60` }, tasks: { filename: "gorevler.py", code: `# Dairenin alanını hesaplayan fonksiyon yazın.` }, notesMarkdown: `Kodun tekrar kullanılabilirliği (Reusability).`, teacherAiNotes: `Fonksiyonları bir fabrikadaki montaj hattı gibi modelleyin.` },
        { week: 8, title: "Mini Konsol Uygulaması & Proje Sunumu", summary: "Öğrencilerin metin tabanlı macera oyunu veya hesap makinesi geliştirmesi.", docUrl: "", codeFile: { filename: "konsol_oyunu.py", language: "python", code: `print("=== METİN TABANLI OYUN BAŞLADI ===")\nprint("Canavar belirdi! 1-Saldır 2-Kaç")`, output: `=== METİN TABANLI OYUN BAŞLADI ===\nCanavar belirdi! 1-Saldır 2-Kaç` }, tasks: { filename: "gorevler.py", code: `# Kendi oyun senaryonuzu tamamlayın.` }, notesMarkdown: `Dönem sonu değerlendirmesi.`, teacherAiNotes: `Öğrencilerin birbirlerinin kodlarını test etmelerini sağlayın.` }
    ],
    "Seviye 3": [
        {
            week: 1,
            title: "Fonksiyonlar, Metotlar ve Modüler Kodlama",
            summary: "Parametre alan ve değer döndüren fonksiyonlar, kodun modüler yapısı ve kapsam (scope) kuralları.",
            docUrl: DEFAULT_SEVIYE_3_HAFTA_1_DOC,
            codeFile: {
                filename: "ModulerKodlama.cs",
                language: "csharp",
                code: `// ==========================================
// SEVİYE 3 - HAFTA 1: FONKSİYONLAR & METOTLAR
// Modüler Kodlama, Parametreler & Dönüş Tipleri
// ==========================================

using System;

class Program 
{
    // 1. Değer döndürmeyen (void) bilgilendirme metodu
    static void SelamVer(string ogrenciAdi) 
    {
        Console.WriteLine($"[SİSTEM] Hoş geldin {ogrenciAdi}! Derse başlıyoruz.");
    }

    // 2. Parametre alan ve değer döndüren (return) metot
    static int SkorHesapla(int temelPuan, int bonus, int carpan) 
    {
        int toplamPuan = (temelPuan + bonus) * carpan;
        return toplamPuan; // Değeri çağrıldığı yere geri fırlatır
    }

    // 3. Karar yapısı barındıran kontrol metodu
    static bool SeviyeGecildiMi(int puan, int baraj) 
    {
        if (puan >= baraj) 
        {
            return true;
        } 
        else 
        {
            return false;
        }
    }

    static void Main(string[] args) 
    {
        // Metot çağrısı (Method Call)
        SelamVer("Mert");

        int finalPuani = SkorHesapla(100, 25, 2);
        Console.WriteLine($"Hesaplanan Toplam Puan: {finalPuani}");

        bool basarili = SeviyeGecildiMi(finalPuani, 200);
        if (basarili) 
        {
            Console.WriteLine("🎉 Tebrikler! Seviye 3 - Hafta 1 başarıyla tamamlandı.");
        } 
        else 
        {
            Console.WriteLine("Baraj puanına ulaşılamadı. Tekrar deneyiniz.");
        }
    }
}`,
                output: `[SİSTEM] Hoş geldin Mert! Derse başlıyoruz.
Hesaplanan Toplam Puan: 250
🎉 Tebrikler! Seviye 3 - Hafta 1 başarıyla tamamlandı.

Process finished with exit code 0 (Execution time: 0.08s)`
            },
            tasks: {
                filename: "Hafta1_Gorevler.cs",
                code: `// ==========================================
// SEVİYE 3 - HAFTA 1 ALIŞTIRMALARI & GÖREVLER
// ==========================================

// GÖREV 1: İki tam sayının ortalamasını double tipinde döndüren 
// 'OrtalamaHesapla(int s1, int s2)' metodunu yazın.

// GÖREV 2: Verilen sıcaklık değerine göre:
// Derece < 10 ise "Soğuk", 10-25 arası ise "Ilık", > 25 ise "Sıcak"
// döndüren 'HavaDurumuAnaliz(int derece)' metodunu tamamlayın.

// GÖREV 3: Can ve alınan hasar değerlerini alıp, 
// kalan can 0'ın altına inerse 0 döndüren 'HasarUygula' fonksiyonunu kodlayın.`
            },
            notesMarkdown: `### 🎯 Hafta 1 Hedef & Kazanımlar:
1. **DRY Prensibi (Don't Repeat Yourself):** Kod tekrarını önleyip aynı mantığı fonksiyonlaştırma.
2. **Parametre ve Argüman:** Fonksiyon tanımındaki değişkenler parametre, gönderilen somut değerler argümandır.
3. **Void vs Return:** Çıktı üreten fonksiyonlar ile sadece işlem yapan fonksiyonların ayrımı.
4. **Scope (Değişken Kapsamı):** Fonksiyon içinde tanımlanan lokal değişkenlerin dışarıdan erişilememesi.`,
            teacherAiNotes: `🤖 Yapay Zeka Eğitmen Rehberi:
- **Kritik Yanılgı:** Öğrenciler 'Console.WriteLine' ile 'return' arasındaki farkı sıklıkla karıştırır. Console.WriteLine sadece ekrana yazı yazar, return ise programın diğer parçalarının o değeri hafızada kullanmasını sağlar.
- **Sınıfta Sor:** "SkorHesapla fonksiyonundaki toplamPuan değişkenini Main içinde yazdırmaya çalışırsak neden hata alırız?"
- **Canlı Kodlama:** Fonksiyon parametrelerini değiştirerek dinamik davranışları tahtada test edin.`
        },
        {
            week: 2,
            title: "Parametreler, Aşırı Yükleme (Overloading) ve Kapsam",
            summary: "Aynı isimde farklı parametreli metotlar (Overloading), varsayılan parametreler ve Scope kuralları.",
            docUrl: "",
            codeFile: {
                filename: "MethodOverloading.cs",
                language: "csharp",
                code: `using System;

class Program 
{
    // Aynı isimde, farklı parametre tipleri
    static int Topla(int a, int b) 
    {
        return a + b;
    }

    static double Topla(double a, double b) 
    {
        return a + b;
    }

    static int Topla(int a, int b, int c) 
    {
        return a + b + c;
    }

    static void Main() 
    {
        Console.WriteLine(Topla(5, 10));        // int versiyon
        Console.WriteLine(Topla(3.5, 4.2));     // double versiyon
        Console.WriteLine(Topla(1, 2, 3));      // 3 parametreli versiyon
    }
}`,
                output: `15\n7.7\n6`
            },
            tasks: { filename: "Gorevler.cs", code: `// Farklı sayıda parametre alan Carp metotlarını overload edin.` },
            notesMarkdown: `Method Overloading sayesinde aynı işi yapan metotlara tek isim verilir.`,
            teacherAiNotes: `Console.WriteLine metodunun da bir overload örneği olduğunu belirtin (hem int hem string basabilmesi).`
        },
        {
            week: 3,
            title: "Diziler ve Koleksiyonlar ile Veri Yönetimi",
            summary: "Tek ve çok boyutlu diziler, List<T> yapısı, foreach döngüleri ve dinamik eleman yönetimi.",
            docUrl: "",
            codeFile: {
                filename: "Koleksiyonlar.cs",
                language: "csharp",
                code: `using System;
using System.Collections.Generic;

class Program 
{
    static void Main() 
    {
        List<string> envanter = new List<string>();
        envanter.Add("Kılıç");
        envanter.Add("Kalkan");
        envanter.Add("İksir");

        Console.WriteLine($"Toplam Eşya: {envanter.Count}");
        foreach (string esya in envanter) 
        {
            Console.WriteLine($"- {esya}");
        }
    }
}`,
                output: `Toplam Eşya: 3\n- Kılıç\n- Kalkan\n- İksir`
            },
            tasks: { filename: "Gorevler.cs", code: `// Listeden belirli bir eşyayı silen ve güncel listeyi yazdıran kodu yazın.` },
            notesMarkdown: `Sabit boyutlu diziler (Array) ile dinamik List<T> farkı.`,
            teacherAiNotes: `Oyun envanteri benzetmesi konuyu çok akılda kalıcı kılar.`
        },
        {
            week: 4,
            title: "Nesne Yönelimli Programlamaya (OOP) Giriş",
            summary: "Sınıf (Class) ve Nesne (Object) mantığı, field/property tanımları, Constructor (Yapıcı Metot).",
            docUrl: "",
            codeFile: {
                filename: "OopGiris.cs",
                language: "csharp",
                code: `using System;

class Karakter 
{
    public string Ad;
    public int Can;

    public Karakter(string ad, int can) 
    {
        this.Ad = ad;
        this.Can = can;
    }

    public void BilgiVer() 
    {
        Console.WriteLine($"Kahraman: {Ad}, Can: {Can}");
    }
}

class Program 
{
    static void Main() 
    {
        Karakter k1 = new Karakter("Savaşçı", 100);
        k1.BilgiVer();
    }
}`,
                output: `Kahraman: Savaşçı, Can: 100`
            },
            tasks: { filename: "Gorevler.cs", code: `// Dusman adında bir sınıf oluşturup can ve hasar özellikleri ekleyin.` },
            notesMarkdown: `Class bir şablon / mimari çizimdir, Object ise o çizimden inşa edilen evdir.`,
            teacherAiNotes: `Kalıp ve kurabiye örneği veya mimari plan ve bina örneği verin.`
        },
        { week: 5, title: "Kapsülleme (Encapsulation) & Erişim Belirteçleri", summary: "public, private anahtar sözcükleri, Getter/Setter metodları ve veri güvenliği.", docUrl: "", codeFile: { filename: "Kapsulleme.cs", language: "csharp", code: `class BankaHesabi {\n    private double bakiye;\n    public void ParaYatir(double miktar) { if(miktar > 0) bakiye += miktar; }\n    public double BakiyeGoster() { return bakiye; }\n}`, output: `[Banka Hesabı Kapsüllendi]` }, tasks: { filename: "Gorevler.cs", code: `// Negatif değer atanmasını engelleyen bir Can property'si yazın.` }, notesMarkdown: `Doğrudan değişken manipülasyonunu engelleme.`, teacherAiNotes: `Arabanın motoruna doğrudan dokunmak yerine pedala basmak benzetmesi.` },
        { week: 6, title: "Kalıtım (Inheritance) ve Çok Biçimlilik (Polymorphism)", summary: "Temel sınıf (Base Class) ve Türetilmiş sınıf (Derived Class), override ve virtual kullanımı.", docUrl: "", codeFile: { filename: "Kalitim.cs", language: "csharp", code: `class Hayvan { public virtual void SesCikar() { Console.WriteLine("Ses"); } }\nclass Kopek : Hayvan { public override void SesCikar() { Console.WriteLine("Hav hav!"); } }`, output: `Hav hav!` }, tasks: { filename: "Gorevler.cs", code: `// Kedi sınıfı oluşturup SesCikar metodunu override edin.` }, notesMarkdown: `Kod tekrarını sınıflar arasında önleme hiyerarşisi.`, teacherAiNotes: `Aile soy ağacı benzetmesini kullanın.` },
        { week: 7, title: "Hata Yönetimi (Try-Catch) ve İstisnalar", summary: "Exception handling, çalışma zamanı hatalarını güvenli şekilde yönetme.", docUrl: "", codeFile: { filename: "HataYonetimi.cs", language: "csharp", code: `try {\n    int a = 10, b = 0;\n    int sonuc = a / b;\n} catch (DivideByZeroException) {\n    Console.WriteLine("Sıfıra bölme hatası yakalandı!");\n}`, output: `Sıfıra bölme hatası yakalandı!` }, tasks: { filename: "Gorevler.py", code: `// Dizi sınırlarını aşma hatasını (IndexOutOfRange) yakalayın.` }, notesMarkdown: `Programın çökmesini engelleme ve loglama.`, teacherAiNotes: `Emniyet kemeri benzetmesi yapın.` },
        { week: 8, title: "İleri Düzey Proje Geliştirme & Dönem Sonu Sunumu", summary: "Öğrenilen tüm OOP prensiplerinin birleştirildiği kapsamlı final projesi.", docUrl: "", codeFile: { filename: "FinalProje.cs", language: "csharp", code: `Console.WriteLine("=== SEVİYE 3 FİNAL PROJE GELİŞTİRME ===");\nConsole.WriteLine("OOP Mimarisi başarıyla kuruldu.");`, output: `=== SEVİYE 3 FİNAL PROJE GELİŞTİRME ===\nOOP Mimarisi başarıyla kuruldu.` }, tasks: { filename: "Gorevler.cs", code: `// Proje dokümantasyonunu ve kod sunumunuzu hazırlayın.` }, notesMarkdown: `Öğrenci proje sunumları ve portfolyo hazırlığı.`, teacherAiNotes: `Her projeye mimari açıdan yapıcı geri bildirimler sunun.` }
    ]
};

// Helper: converts a Google Docs edit URL to an iframe-embeddable preview URL
function getDocEmbedUrl(url: string): string {
    if (!url) return "";
    const trimmed = url.trim();
    // If it already contains /preview
    if (trimmed.includes("/preview")) {
        return trimmed;
    }
    // If it has /edit
    if (trimmed.includes("/edit")) {
        return trimmed.replace(/\/edit(\?.*)?$/, "/preview");
    }
    // If it is a generic docs document link
    if (trimmed.includes("docs.google.com/document/d/")) {
        return trimmed.replace(/\/$/, "") + "/preview";
    }
    return trimmed;
}

export function LessonPlans({ onBackToHub, onSwitchToMesai }: LessonPlansProps) {
    const [selectedLevel, setSelectedLevel] = useState<LevelType>("Seviye 3");
    const [selectedWeek, setSelectedWeek] = useState<number>(1);
    
    // Custom doc URLs stored in localStorage
    const [customDocUrls, setCustomDocUrls] = useState<Record<string, string>>({});
    const [isEditingDocUrl, setIsEditingDocUrl] = useState(false);
    const [inputDocUrl, setInputDocUrl] = useState("");

    // Active tab in right-side code/AI compiler panel
    const [activeCodeTab, setActiveCodeTab] = useState<"code" | "tasks" | "notes" | "ai">("code");
    const [copied, setCopied] = useState(false);
    const [showTerminal, setShowTerminal] = useState(true);

    // Fullscreen expansion modes (none, left, right)
    const [expandMode, setExpandMode] = useState<"none" | "left" | "right">("none");

    // Load custom doc URLs from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem("lesson_plan_doc_urls");
            if (saved) {
                setCustomDocUrls(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Failed to load custom doc urls:", e);
        }
    }, []);

    // Get current week plan
    const currentWeekPlan = useMemo(() => {
        const list = INITIAL_CURRICULUM[selectedLevel] || [];
        return list.find(p => p.week === selectedWeek) || list[0] || {
            week: 1,
            title: "Ders Planı",
            summary: "",
            codeFile: { filename: "main.cs", language: "csharp", code: "", output: "" },
            tasks: { filename: "gorevler.cs", code: "" },
            notesMarkdown: "",
            teacherAiNotes: ""
        };
    }, [selectedLevel, selectedWeek]);

    // Active Google Docs URL (custom override or default)
    const activeDocKey = `${selectedLevel}-W${selectedWeek}`;
    const effectiveDocUrl = customDocUrls[activeDocKey] ?? currentWeekPlan.docUrl ?? "";
    const embedUrl = getDocEmbedUrl(effectiveDocUrl);

    // When active week changes, sync edit input
    useEffect(() => {
        setInputDocUrl(effectiveDocUrl);
        setIsEditingDocUrl(false);
        setCopied(false);
    }, [selectedLevel, selectedWeek, effectiveDocUrl]);

    // Save custom Google Docs link
    const handleSaveDocUrl = () => {
        const next = { ...customDocUrls, [activeDocKey]: inputDocUrl.trim() };
        setCustomDocUrls(next);
        try {
            localStorage.setItem("lesson_plan_doc_urls", JSON.stringify(next));
        } catch (e) {
            console.error(e);
        }
        setIsEditingDocUrl(false);
    };

    // Copy active code content
    const handleCopy = () => {
        let textToCopy = "";
        if (activeCodeTab === "code") textToCopy = currentWeekPlan.codeFile.code;
        else if (activeCodeTab === "tasks") textToCopy = currentWeekPlan.tasks.code;
        else if (activeCodeTab === "notes") textToCopy = currentWeekPlan.notesMarkdown;
        else if (activeCodeTab === "ai") textToCopy = currentWeekPlan.teacherAiNotes;

        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Syntax colorizer helper for code lines
    const renderColoredLine = (line: string, lang: string) => {
        if (!line) return <span>&nbsp;</span>;

        // Comments
        const trimmed = line.trimStart();
        if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
            return <span className="text-slate-400 italic font-mono">{line}</span>;
        }

        // Keywords detection
        const keywords = [
            "using", "class", "public", "private", "protected", "static", "void", "int", "string", 
            "bool", "double", "float", "return", "if", "else", "for", "foreach", "while", "new", 
            "def", "import", "from", "try", "catch", "virtual", "override", "global"
        ];
        
        // Tokenize by word boundaries, strings, and symbols
        const parts = line.split(/(\"[^\"]*\"|\'[^\']*\'|[a-zA-Z_][a-zA-Z0-9_]*|==|!=|<=|>=|=>|\/\/.+)/g);

        return (
            <span>
                {parts.map((token, i) => {
                    if (!token) return null;
                    if (token.startsWith("//") || token.startsWith("#")) {
                        return <span key={i} className="text-slate-400 italic">{token}</span>;
                    }
                    if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
                        return <span key={i} className="text-emerald-400 font-medium">{token}</span>;
                    }
                    if (keywords.includes(token)) {
                        return <span key={i} className="text-indigo-400 font-semibold">{token}</span>;
                    }
                    if (["Console", "List", "Math", "Program", "Karakter", "Hayvan", "Kopek", "Exception"].includes(token)) {
                        return <span key={i} className="text-sky-300 font-medium">{token}</span>;
                    }
                    if (["WriteLine", "SelamVer", "SkorHesapla", "SeviyeGecildiMi", "Main", "Topla", "Add", "print"].includes(token)) {
                        return <span key={i} className="text-amber-300">{token}</span>;
                    }
                    if (/^\d+(\.\d+)?$/.test(token)) {
                        return <span key={i} className="text-orange-300">{token}</span>;
                    }
                    return <span key={i} className="text-slate-200">{token}</span>;
                })}
            </span>
        );
    };

    const levels: LevelType[] = ["Seviye 1", "Seviye 2", "Seviye 3"];

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-text">
            
            {/* Top Navigation & Controls Bar */}
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3 shrink-0">
                <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Left: Back & Title */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBackToHub}
                            className="text-slate-400 hover:text-white hover:bg-slate-800 h-9 px-2.5 rounded-lg text-xs"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1.5" />
                            Ana Menü
                        </Button>
                        <div className="h-4 w-px bg-slate-800" />
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-sm md:text-base font-bold text-white tracking-tight">
                                        Ders Planları & Kod Çalışma Alanı
                                    </h1>
                                    <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                        Canlı Entegrasyon
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 hidden sm:block">
                                    Sol: Google Docs Planı • Sağ: Yapay Zeka Kod Derleyicisi & Notlar
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Center: Level Switcher (Strictly Seviye 1, 2, 3) */}
                    <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
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

                    {/* Right: Switch to Mesai & View Controls */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onSwitchToMesai}
                            className="bg-slate-900 border-slate-800 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 text-xs h-9 font-medium"
                        >
                            <Clock className="w-3.5 h-3.5 mr-1.5" />
                            Mesai Takip
                        </Button>
                    </div>

                </div>

                {/* Week Selector Bar (Hafta 1 ... Hafta 8) */}
                <div className="max-w-[1920px] mx-auto mt-2.5 pt-2.5 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                        Haftalar:
                    </span>
                    {(INITIAL_CURRICULUM[selectedLevel] || []).map((item) => {
                        const isWeekSelected = selectedWeek === item.week;
                        const hasCustomDoc = Boolean(customDocUrls[`${selectedLevel}-W${item.week}`] || item.docUrl);
                        return (
                            <button
                                key={item.week}
                                type="button"
                                onClick={() => setSelectedWeek(item.week)}
                                className={`
                                    px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0
                                    ${isWeekSelected
                                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold"
                                        : "bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/60"
                                    }
                                `}
                            >
                                <span>Hafta {item.week}</span>
                                {hasCustomDoc && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Google Docs planı ekli" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* Sub-header: Current Week Title & Quick Info */}
            <div className="bg-slate-950/40 border-b border-slate-800/80 px-4 py-2 shrink-0">
                <div className="max-w-[1920px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                            {selectedLevel} • Hafta {currentWeekPlan.week}
                        </span>
                        <h2 className="text-xs md:text-sm font-semibold text-slate-200 truncate">
                            {currentWeekPlan.title}
                        </h2>
                        <span className="text-slate-500 text-xs hidden md:inline">•</span>
                        <p className="text-xs text-slate-400 truncate hidden md:block">
                            {currentWeekPlan.summary}
                        </p>
                    </div>

                    {/* Split View Toggles */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 text-xs">
                        {expandMode !== "none" && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandMode("none")}
                                className="h-7 px-2 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
                            >
                                <Minimize2 className="w-3 h-3 mr-1" />
                                İki Paneli Gör
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandMode(expandMode === "left" ? "none" : "left")}
                            className={`h-7 px-2 text-[11px] ${expandMode === "left" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                            title="Sol Paneli Büyüt (Google Docs)"
                        >
                            <FileText className="w-3 h-3 mr-1" />
                            {expandMode === "left" ? "Küçült" : "Yalnızca Plan"}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandMode(expandMode === "right" ? "none" : "right")}
                            className={`h-7 px-2 text-[11px] ${expandMode === "right" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                            title="Sağ Paneli Büyüt (Kod Derleyicisi)"
                        >
                            <Code2 className="w-3 h-3 mr-1" />
                            {expandMode === "right" ? "Küçült" : "Yalnızca Kod"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Area: Split Screen (Left: Google Docs, Right: Code/AI Editor) */}
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
                        <div className="bg-slate-950 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-xl">
                            
                            {/* Left Header */}
                            <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                                        <FileText className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-bold text-slate-200 truncate">
                                                Haftalık Ders Planı (Google Docs)
                                            </span>
                                            {embedUrl && (
                                                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Aktif Önizleme" />
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
                                            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                                            title="Belgeyi yeni sekmede aç"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            <span>Sekmede Aç</span>
                                        </a>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingDocUrl(!isEditingDocUrl)}
                                        className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors"
                                        title="Bu haftanın Google Docs linkini değiştir veya ekle"
                                    >
                                        <Edit3 className="w-3 h-3" />
                                        <span>Link Düzenle</span>
                                    </button>
                                </div>
                            </div>

                            {/* Google Docs URL Edit Drawer/Input */}
                            {isEditingDocUrl && (
                                <div className="bg-slate-900 p-2.5 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Google Docs linki yapıştırın (https://docs.google.com/document/d/...)"
                                            value={inputDocUrl}
                                            onChange={(e) => setInputDocUrl(e.target.value)}
                                            className="h-8 bg-slate-950 border-slate-700 text-xs text-slate-200 placeholder:text-slate-500"
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
                                            className="h-8 px-2 text-xs text-slate-400 hover:text-white"
                                        >
                                            İptal
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Google Docs Embed Container */}
                            <div className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
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
                                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-slate-200 mb-1">
                                            Bu Hafta İçin Google Docs Linki Tanımlanmamış
                                        </h3>
                                        <p className="text-xs text-slate-500 max-w-sm mb-4">
                                            {selectedLevel} Hafta {selectedWeek} için Google Docs ders planı linkinizi ekleyerek burada doğrudan önizleyebilirsiniz.
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
                            <div className="bg-slate-900/60 border-t border-slate-800/80 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
                                <span>Google Docs Viewer Entegrasyonu</span>
                                <span>{selectedLevel} • Hafta {selectedWeek}</span>
                            </div>

                        </div>
                    )}

                    {/* ======================================================== */}
                    {/* RIGHT HALF: Code Compiler & AI Examples (IDE View)       */}
                    {/* ======================================================== */}
                    {expandMode !== "left" && (
                        <div className="bg-[#181825] rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-xl">
                            
                            {/* IDE Top Bar / Window Controls & File Tabs */}
                            <div className="bg-[#11111b] border-b border-slate-800/80 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
                                
                                {/* Mac Window Dots + Active File Tabs */}
                                <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
                                    <div className="flex items-center gap-1.5 shrink-0 pr-1">
                                        <span className="w-3 h-3 rounded-full bg-[#f38ba8]/80 block" />
                                        <span className="w-3 h-3 rounded-full bg-[#f9e2af]/80 block" />
                                        <span className="w-3 h-3 rounded-full bg-[#a6e3a1]/80 block" />
                                    </div>

                                    {/* Tabs */}
                                    <div className="flex items-center gap-1 shrink-0">
                                        {/* Main Code Tab */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveCodeTab("code")}
                                            className={`
                                                px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5
                                                ${activeCodeTab === "code" 
                                                    ? "bg-[#1e1e2e] text-[#cdd6f4] border border-slate-700/60 shadow-xs font-semibold" 
                                                    : "text-slate-400 hover:text-slate-200 hover:bg-[#181825]"
                                                }
                                            `}
                                        >
                                            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                                            <span>{currentWeekPlan.codeFile.filename}</span>
                                        </button>

                                        {/* Tasks / Exercises Tab */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveCodeTab("tasks")}
                                            className={`
                                                px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5
                                                ${activeCodeTab === "tasks" 
                                                    ? "bg-[#1e1e2e] text-[#cdd6f4] border border-slate-700/60 shadow-xs font-semibold" 
                                                    : "text-slate-400 hover:text-slate-200 hover:bg-[#181825]"
                                                }
                                            `}
                                        >
                                            <ListChecks className="w-3.5 h-3.5 text-amber-400" />
                                            <span>{currentWeekPlan.tasks.filename}</span>
                                        </button>

                                        {/* Notes Tab */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveCodeTab("notes")}
                                            className={`
                                                px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5
                                                ${activeCodeTab === "notes" 
                                                    ? "bg-[#1e1e2e] text-[#cdd6f4] border border-slate-700/60 shadow-xs font-semibold" 
                                                    : "text-slate-400 hover:text-slate-200 hover:bg-[#181825]"
                                                }
                                            `}
                                        >
                                            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                                            <span>kazanimlar.md</span>
                                        </button>

                                        {/* AI Teacher Notes Tab */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveCodeTab("ai")}
                                            className={`
                                                px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5
                                                ${activeCodeTab === "ai" 
                                                    ? "bg-[#1e1e2e] text-[#cdd6f4] border border-slate-700/60 shadow-xs font-semibold" 
                                                    : "text-slate-400 hover:text-slate-200 hover:bg-[#181825]"
                                                }
                                            `}
                                        >
                                            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                                            <span>ai_egitmen_notu.md</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Right Controls: Copy, Terminal Toggle */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-white px-2 py-1 rounded bg-[#1e1e2e] hover:bg-[#313244] border border-slate-700/40 transition-colors"
                                        title="Kodu kopyala"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-3 h-3 text-emerald-400" />
                                                <span className="text-emerald-400">Kopyalandı</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3 h-3 text-slate-400" />
                                                <span>Kopyala</span>
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowTerminal(!showTerminal)}
                                        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded transition-colors ${
                                            showTerminal 
                                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" 
                                                : "bg-[#1e1e2e] text-slate-400 hover:text-slate-200"
                                        }`}
                                        title="Konsol çıktısını göster / gizle"
                                    >
                                        <Terminal className="w-3 h-3" />
                                        <span>Konsol</span>
                                    </button>
                                </div>

                            </div>

                            {/* Code Area with Line Numbers */}
                            <div className="flex-1 overflow-auto bg-[#181825] p-3 text-xs md:text-sm font-mono scrollbar-thin">
                                {activeCodeTab === "code" && (
                                    <div className="flex">
                                        {/* Line Numbers */}
                                        <div className="select-none text-slate-600 pr-4 text-right border-r border-slate-800 mr-4 font-mono text-xs leading-relaxed shrink-0">
                                            {currentWeekPlan.codeFile.code.split("\n").map((_, i) => (
                                                <div key={i}>{i + 1}</div>
                                            ))}
                                        </div>
                                        {/* Code lines */}
                                        <div className="flex-1 overflow-x-auto leading-relaxed">
                                            {currentWeekPlan.codeFile.code.split("\n").map((line, i) => (
                                                <div key={i} className="whitespace-pre">
                                                    {renderColoredLine(line, currentWeekPlan.codeFile.language)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeCodeTab === "tasks" && (
                                    <div className="flex">
                                        <div className="select-none text-slate-600 pr-4 text-right border-r border-slate-800 mr-4 font-mono text-xs leading-relaxed shrink-0">
                                            {currentWeekPlan.tasks.code.split("\n").map((_, i) => (
                                                <div key={i}>{i + 1}</div>
                                            ))}
                                        </div>
                                        <div className="flex-1 overflow-x-auto leading-relaxed">
                                            {currentWeekPlan.tasks.code.split("\n").map((line, i) => (
                                                <div key={i} className="whitespace-pre">
                                                    {renderColoredLine(line, "csharp")}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeCodeTab === "notes" && (
                                    <div className="p-2 space-y-3 font-sans text-slate-300 text-xs md:text-sm leading-relaxed">
                                        <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
                                            <div className="flex items-center gap-2 font-bold mb-1">
                                                <BookOpen className="w-4 h-4 text-indigo-400" />
                                                <span>Haftalık Konu Özeti & Kazanımlar</span>
                                            </div>
                                            <p className="text-xs text-indigo-300/80">
                                                {currentWeekPlan.summary}
                                            </p>
                                        </div>

                                        <div className="bg-[#1e1e2e] p-4 rounded-lg border border-slate-800 whitespace-pre-wrap font-sans">
                                            {currentWeekPlan.notesMarkdown}
                                        </div>
                                    </div>
                                )}

                                {activeCodeTab === "ai" && (
                                    <div className="p-2 space-y-3 font-sans text-slate-300 text-xs md:text-sm leading-relaxed">
                                        <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-200">
                                            <div className="flex items-center gap-2 font-bold mb-1">
                                                <Sparkles className="w-4 h-4 text-violet-400" />
                                                <span>Yapay Zeka Eğitmen Rehberi</span>
                                            </div>
                                            <p className="text-xs text-violet-300/80">
                                                Ders esnasında öğrencilerin dikkatini çekebilecek soru kalıpları ve yaygın hata ipuçları
                                            </p>
                                        </div>

                                        <div className="bg-[#1e1e2e] p-4 rounded-lg border border-slate-800 whitespace-pre-wrap font-sans text-slate-200">
                                            {currentWeekPlan.teacherAiNotes}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Terminal / Compiler Output Panel */}
                            {showTerminal && (
                                <div className="border-t border-slate-800 bg-[#11111b] shrink-0 max-h-48 flex flex-col font-mono text-xs">
                                    <div className="px-3 py-1.5 bg-[#181825] border-b border-slate-800 flex items-center justify-between text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Terminal className="w-3 h-3 text-emerald-400" />
                                            <span className="font-semibold text-slate-300">TERMINAL ÇIKTISI</span>
                                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                Exit Code: 0
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-slate-500">
                                            {currentWeekPlan.codeFile.language === "csharp" ? "dotnet run" : "python3 main.py"}
                                        </div>
                                    </div>
                                    <div className="p-3 overflow-y-auto max-h-36 font-mono text-emerald-400 whitespace-pre leading-relaxed select-text">
                                        {currentWeekPlan.codeFile.output}
                                    </div>
                                </div>
                            )}

                            {/* IDE Bottom Status Bar */}
                            <div className="bg-[#11111b] border-t border-slate-800/80 px-3 py-1 flex items-center justify-between text-[11px] text-slate-500 font-mono shrink-0">
                                <div className="flex items-center gap-3">
                                    <span className="text-indigo-400 flex items-center gap-1">
                                        <Code2 className="w-3 h-3" />
                                        {currentWeekPlan.codeFile.language.toUpperCase()}
                                    </span>
                                    <span>UTF-8</span>
                                    <span>Spaces: 4</span>
                                </div>
                                <div className="text-slate-400 text-[10px]">
                                    AI Kod Alanı Hazır • İçerikler güncellenebilir
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </main>

        </div>
    );
}
