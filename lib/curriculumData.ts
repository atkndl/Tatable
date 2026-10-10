export type LevelType = "Seviye 1" | "Seviye 2" | "Seviye 3";
export type ContentType = "code" | "arduino" | "unity" | "text" | "tasks" | "notes";

export interface PlanTab {
    id: string;
    title: string;
    type: ContentType;
    filename?: string;
    language?: string;
    content: string;
    output?: string;
}

export interface WeekPlan {
    week: number;
    title: string;
    summary: string;
    category?: string;
    docUrl?: string;
    hasRealData: boolean;
    tabs: PlanTab[];
}

export const INITIAL_CURRICULUM: Record<LevelType, WeekPlan[]> = {
    // =========================================================================
    // SEVİYE 1: AKILLI ŞEHİR & ROBOTİK (Scratch, Tinkercad 3D, Kriptografi, Canva)
    // =========================================================================
    "Seviye 1": [
        // HAFTA 1
        {
            week: 1,
            title: "Tanışma, BİD Mantığı, Atölye Kuralları ve Scratch'e Giriş",
            summary: "Bilgi İşlemsel Düşünme (BİD), unplugged robot simülasyonu, olay tabanlı tetikleme ve Scratch Şehir Kaşifi projesi.",
            category: "Scratch & BİD Temelleri",
            docUrl: "https://docs.google.com/document/d/1lU94dfMFVExHK-51MWck7HBZuaKfmyIW/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "scratch_sehir_kasifi",
                    title: "sehir_kasifi.scratch",
                    type: "code",
                    filename: "sehir_kasifi_algoritma.txt",
                    language: "python",
                    content: `# ==============================================================================
# SCRATCH BLOK ALGORİTMASI: "ŞEHİR KAŞİFİ ROBOTU" (Hafta 1 / Ders 4)
# Olay Tabanlı Tetikleme (Events) ve Başlangıç Hareketi
# ==============================================================================

[OLAY: Yeşil Bayrak Tıklandığında]
├── konumu_belirle(x: -180, y: -120)    # Şehrin giriş kapısı
├── yönüne_dön(90)                     # Sağa doğru bak
├── görünüm("Merhaba Akıllı Şehir!", 2 saniye)
└── sonraki_kostüme_geç()

[OLAY: Boşluk Tuşuna Basıldığında]
├── 20 adım git
├── ses_çal("robot_bip")
└── eğer <kenara geldiyse> sektir

[OLAY: Sağ Ok Tuşuna Basıldığında]
├── yönüne_dön(90)
└── 15 adım git

[OLAY: Sol Ok Tuşuna Basıldığında]
├── yönüne_dön(-90)
└── 15 adım git`,
                    output: `[Scratch Simülatörü Başlatıldı]
✓ Robot kuklası (-180, -120) koordinatlarına yerleşti.
✓ Robot: "Merhaba Akıllı Şehir!" dedi.
✓ Sağ ok tetiklendi -> 15 adım ilerlendi.`
                },
                {
                    id: "unplugged_lab",
                    title: "Bilgisayarsız Robot Lab",
                    type: "tasks",
                    filename: "unplugged_gorev.md",
                    language: "markdown",
                    content: `### 🤖 Bilgisayarsız Robotik Lab (Unplugged Computing):
1. **El Yıkama Algoritması:** Adımları sıralayın: (1-Musluğu aç, 2-Elleri ıslat, 3-Sabunla köpürt, 4-Durula, 5-Kurula). Adımlardan biri atlansa ne olur?
2. **Robotu Masaya Götür:** Arkadaşınız bir robot! Yalnızca "İleri Git", "Sağa Dön (90°)", "Sola Dön (90°)" komutlarıyla onu engele çarpmadan hedef sandalyeye ulaştırın.
3. **Makine Oyunu:** Her öğrenci bir makine parçasını ve sesini taklit ederek çemberde ortak senkron ritim oluşturur.`
                },
                {
                    id: "ders_plani_ozeti",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 1. Hafta Ders Akışı:
- **Ders 1 (BİD Giriş):** Bilgi İşlemsel Düşünme nedir? Günlük hayat algoritma örnekleri ve tanışma oyunu.
- **Ders 2 (Atölye Kuralları & Şifreli İletişim):** Güvenlik kuralları ve gizli iletişim giriş.
- **Ders 3 (Robotu Programlıyorum - Unplugged):** Bilgisayarsız algoritma tasarımı.
- **Ders 4 (Scratch - Olaylar & Şehir Kaşifi):** Yeşil bayrak, tuş kontrolleri ve koordinat düzlemine ilk adım.`
                },
                {
                    id: "egitmen_tuyolari",
                    title: "Eğitmen Rehberi",
                    type: "notes",
                    filename: "egitmen_rehberi.md",
                    language: "markdown",
                    content: `🤖 Eğitmen Tüyoları:
- Scratch'e geçmeden önce tahtada X ve Y koordinat eksenlerini bir şehir haritası gibi çizin.
- "Bilgisayarın aklı yoktur, verdiğimiz her adımı körü körüne yapar" fikrini robot oyunuyla somutlaştırın.`
                }
            ]
        },

        // HAFTA 2
        {
            week: 2,
            title: "Tinkercad ile 3D Şasi Tasarımı & Scratch Koordinat Pilotu",
            summary: "Tinkercad 3B formlar, X-Y-Z eksenleri, gruplama aracı ve Scratch X-Y koordinat simülasyonu.",
            category: "3D Tasarım & Scratch Koordinatlar",
            docUrl: "https://docs.google.com/document/d/14zEIZF7kMGY2QZ7KLpYjCT4nS3ziMowf/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "scratch_koordinat_kodu",
                    title: "koordinat_pilotu.scratch",
                    type: "code",
                    filename: "koordinat_pilotu.txt",
                    language: "python",
                    content: `# ==============================================================================
# SCRATCH: "KOORDİNAT PİLOTU" ŞEHİR ROTA SİMÜLASYONU (Hafta 2 / Ders 4)
# X (-240 ile +240) ve Y (-180 ile +180) Koordinat Kontrolü
# ==============================================================================

[OLAY: Yeşil Bayrak Tıklandığında]
├── başlangıç_noktası: x: 0, y: 0       # Şehir Meydanı
├── kalem_rengini_yap(#2ecc71)           # Yeşil rota çizgisi
├── kalemi_bastır()
├── "Hedef 1: Hastaneye Gidiliyor..." de (1 saniye)
├── 2 saniyede x: 120, y: 80 konumuna süzül     # Hastane Konumu
├── bekle(1 saniye)
├── "Hedef 2: İtfaiyeye Gidiliyor..." de (1 saniye)
└── 2 saniyede x: -140, y: 60 konumuna süzül    # İtfaiye Konumu`,
                    output: `[Koordinat Pilotu Aktif]
✓ Başlangıç: (0, 0)
✓ Hedef 1 (Hastane): (120, 80) koordinatına süzüldü.
✓ Hedef 2 (İtfaiye): (-140, 60) koordinatına süzüldü.`
                },
                {
                    id: "tinkercad_3d_rehber",
                    title: "Tinkercad 3D Şasi Rehberi",
                    type: "tasks",
                    filename: "tinkercad_sasi.md",
                    language: "markdown",
                    content: `### 🛠️ Tinkercad 3D Robot Şasisi Adımları:
1. **Ana Gövde:** Çalışma düzlemine bir Kutu (Box) ekleyin. Ölçüler: Genişlik: 60mm, Uzunluk: 40mm, Yükseklik: 15mm.
2. **Tekerlek Yuvaları:** Silindir nesnesini 90 derece döndürün, şasinin yanlarına hizalayın.
3. **Gruplama (Group / Ctrl+G):** Tüm gövde parçalarını seçip tek bir katı nesne haline getirin.
4. **Hata Kontrolü:** Parçaların havada kalmadığını ve tabana oturduğunu kontrol edin.`
                },
                {
                    id: "kazanimlar_hafta2",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 2. Hafta Ders Akışı:
- **Ders 1 (Tinkercad Formlar):** 3B formlar, X-Y-Z çalışma eksenleri.
- **Ders 2 (3D Şasi Tasarımı):** Gruplama aracıyla robot gövdesi üretimi.
- **Ders 3 (Scratch Grid):** X-Y koordinat düzlemi kavramı.
- **Ders 4 (Koordinat Pilotu):** Şehir haritasında belirli koordinatlara süzülme simülasyonu.`
                }
            ]
        },

        // HAFTA 3
        {
            week: 3,
            title: "Tinkercad Cetvel Aracı & Scratch Döngüler (Otonom Devriye)",
            summary: "Cetvel ile hassas ölçülendirme, kargo haznesi hizalama ve Scratch '...defa tekrarla' devriye döngüsü.",
            category: "3D Ölçülendirme & Döngüler",
            docUrl: "https://docs.google.com/document/d/101FC7kS3P5XmT-Zd7Q0ffAwjdL_0jkAwquPKgzDS800/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "scratch_devriye_kodu",
                    title: "otonom_devriye.scratch",
                    type: "code",
                    filename: "otonom_devriye.txt",
                    language: "python",
                    content: `# ==============================================================================
# SCRATCH: "OTONOM DEVRİYE" KARE VE DİKDÖRTGEN ROTA (Hafta 3 / Ders 4)
# Kod Tekrarını Önleme: [4 defa tekrarla] Döngüsü
# ==============================================================================

[OLAY: Yeşil Bayrak Tıklandığında]
├── konumu_belirle(x: -100, y: -100)
├── yönüne_dön(90)
├── kalemi_temizle()
├── kalemi_bastır()
└── [DÖNGÜ: 4 defa tekrarla]
    ├── 100 adım git            # Kare kenarı
    ├── ses_çal("adim_sesi")
    ├── bekle(0.5 saniye)
    └── 90 derece dön(sağa)     # Köşe dönüşü`,
                    output: `[Devriye Modu Başlatıldı]
✓ 1. Kenar: 100 adım ileri, 90° sağa dönüldü.
✓ 2. Kenar: 100 adım ileri, 90° sağa dönüldü.
✓ 3. Kenar: 100 adım ileri, 90° sağa dönüldü.
✓ 4. Kenar: 100 adım ileri, 90° sağa dönüldü.
[Devriye Turu Tamamlandı]`
                },
                {
                    id: "tinkercad_cetvel_rehber",
                    title: "Tinkercad Cetvel & Kargo Yuvası",
                    type: "tasks",
                    filename: "tinkercad_cetvel.md",
                    language: "markdown",
                    content: `### 📏 Tinkercad Cetvel (Ruler) ve Hizalama:
1. **Cetveli Yerleştirme:** 'R' tuşuna basıp çalışma düzleminin sol alt köşesine cetveli bırakın.
2. **Kargo Yuvası:** 30x25x10 mm ölçülerinde ikinci bir kutu oluşturun.
3. **Hizalama (Align / L):** Her iki nesneyi seçip üstten ve ortadan tam merkeze kilitleyin.`
                },
                {
                    id: "kazanimlar_hafta3",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 3. Hafta Ders Akışı:
- **Ders 1 (Cetvel Aracı):** Hassas mm ölçülendirme.
- **Ders 2 (Kargo Yuvası & Hizalama):** Align aracıyla montaj.
- **Ders 3 (Scratch Döngüler):** Tekrarlı blokların mantığı.
- **Ders 4 (Otonom Devriye):** Sokakları turlayan devriye robotu simülasyonu.`
                }
            ]
        },

        // HAFTA 4
        {
            week: 4,
            title: "Tinkercad Delik Açma (Hole) & Scratch Mesafe Sensörü",
            summary: "Metin ekleme, delik (hole) ile model oyma ve Scratch karşılaştırma operatörleriyle (<, >, =) otonom karar.",
            category: "3D Delik Açma & Mesafe Sensörü",
            docUrl: "https://docs.google.com/document/d/1gShzpgorp4FFyaiiNE33VwSWtJeA23hl5DjCkpYwxfM/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "scratch_park_sensoru",
                    title: "mesafe_sensoru.scratch",
                    type: "code",
                    filename: "otonom_park_sensoru.txt",
                    language: "python",
                    content: `# ==============================================================================
# SCRATCH: "OTONOM PARK & ENGEL ALGILAMA SENSÖRÜ" (Hafta 4 / Ders 4)
# Operatör Blokları: <, >, = ile Mesafe Karşılaştırması
# ==============================================================================

[OLAY: Yeşil Bayrak Tıklandığında]
├── değişken_yap(mesafe = 100)
└── [DÖNGÜ: Sürekli Tekrarla]
    ├── mesafe_oku(engel_mesafesi)
    ├── [KOŞUL: Eğer <mesafe < 40> ise]
    │   ├── durdur("tüm hareket")
    │   ├── ses_çal("tehlike_bip")
    │   └── "ENGEL YAKIN! FREN YAPILDI" de
    └── [DEĞİLSE]
        ├── 5 adım git
        └── "Yol Açık, Devam Ediliyor..." de`,
                    output: `[Mesafe Sensörü Aktif]
✓ Mesafe: 85 cm -> Yol Açık
✓ Mesafe: 35 cm -> ENGEL YAKIN! FREN YAPILDI.`
                },
                {
                    id: "tinkercad_hole_rehber",
                    title: "Tinkercad Delik Açma & Metin",
                    type: "tasks",
                    filename: "hole_ve_metin.md",
                    language: "markdown",
                    content: `### 🕳️ Tinkercad Model Oyma (Hole) ve Kimlik Plakası:
1. **Metin Ekleme:** Robotun üstüne isminizi veya 'ECO-BOT' metnini yazın.
2. **Delik Açma (Hole Modu):** Kargo haznesi kutusunu 'Delik' (Şeffaf gri) moduna getirin.
3. **Gruplama ile Oyuk:** Gövde ile delik kutuyu seçip gruplayın; şasinin içinde gerçek bir kargo boşluğu oluşur.`
                },
                {
                    id: "kazanimlar_hafta4",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 4. Hafta Ders Akışı:
- **Ders 1 (Metin & Delik Açma):** Model oyma ve etiketleme.
- **Ders 2 (Teknik Boyutlandırma):** Kargo yuvası kontrolü.
- **Ders 3 (Scratch Operatörler):** Büyüktür, küçüktür, eşittir mantığı.
- **Ders 4 (Mesafe ile Otonom Karar):** Engelden kaçan akıllı araç.`
                }
            ]
        },

        // HAFTA 5
        {
            week: 5,
            title: "Tinkercad 3D Detaylandırma & Scratch Renk Algılama (Şerit Takibi)",
            summary: "3D tekerlek ve sensör yuvaları montajı, Scratch renk sensörü ile otonom şerit takibi ve engelden kaçınma.",
            category: "Sensör Montajı & Şerit Takibi",
            docUrl: "https://docs.google.com/document/d/1V-jQcR3w3Y71LvIYO-f7qQTHYSRH3aJwHJdhBWLk-Go/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "scratch_serit_takip",
                    title: "serit_takibi.scratch",
                    type: "code",
                    filename: "serit_takip_algoritma.txt",
                    language: "python",
                    content: `# ==============================================================================
# SCRATCH: RENK ALGILAMA İLE ÇİZGİ İZLEYEN ROBOT (Hafta 5 / Ders 4)
# Algılama Blokları: [rengine dokunuyor mu?]
# ==============================================================================

[OLAY: Yeşil Bayrak Tıklandığında]
├── başlangıç_noktası: x: -150, y: 0
└── [DÖNGÜ: Sürekli Tekrarla]
    ├── [KOŞUL: Eğer <kırmızı_renge dokunuyor mu?> ise]
    │   ├── "Kırmızı Işık! Bekleniyor..." de
    │   └── bekle(2 saniye)
    ├── [KOŞUL: Eğer <siyah_şerit rengine dokunuyor mu?> ise]
    │   ├── 4 adım git               # Şerit üzerinde düz ilerle
    └── [DEĞİLSE]
        ├── 5 derece sağa dön       # Şeridi aramak için hafif dön
        └── 2 adım git`,
                    output: `[Şerit Takip Modülü Aktif]
✓ Siyah çizgi algılandı -> Düz ilerleniyor.
✓ Kırmızı alan algılandı -> Araç durdu ve 2 saniye bekledi.`
                },
                {
                    id: "tinkercad_detay_rehber",
                    title: "Tinkercad Detaylandırma",
                    type: "tasks",
                    filename: "tinkercad_detay.md",
                    language: "markdown",
                    content: `### 🚗 3D Tekerlek ve Sensör Montajı:
1. Ön kısma 2 adet ultrasonik sensör gözü yuvası (delik silindirler) ekleyin.
2. Arka kısma 2 adet tekerlek aksı yerleştirin.
3. Renk paletini Akıllı Şehir temasına uygun olarak yeşil ve gri tonlarında seçin.`
                },
                {
                    id: "kazanimlar_hafta5",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 5. Hafta Ders Akışı:
- **Ders 1 (Sensör Yuvaları):** 3D gövdeye sensör yuvası açma.
- **Ders 2 (Görsel Düzenleme):** Malzeme ve renk seçimi.
- **Ders 3 (Renk Algılama):** Scratch renk paletinden damlalıkla renk seçimi.
- **Ders 4 (Şerit Takibi):** Çizgi izleyen robot simülasyonu.`
                }
            ]
        },

        // HAFTA 6
        {
            week: 6,
            title: "Tinkercad .STL Dışa Aktarım & Scratch Değişkenler (Enerji & Batarya)",
            summary: "3D baskı için .STL ihracı, Scratch Değişkenler (Batarya, Hız, Skor) ve Akıllı Şehir Görevi ara dönem projesi.",
            category: "3D Baskı (.STL) & Değişkenler",
            docUrl: "https://docs.google.com/document/d/1xa0W_UM0kmqlP2IwDr-0bdyPA-MrbWYSfDoy0g364Pg/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "scratch_enerji_yonetimi",
                    title: "enerji_yonetimi.scratch",
                    type: "code",
                    filename: "enerji_skor_sistemi.txt",
                    language: "python",
                    content: `# ==============================================================================
# SCRATCH: AKILLI ŞEHİR ENERJİ VE SKOR YÖNETİMİ (Hafta 6 / Ders 3)
# Değişkenler: [batarya], [skor], [teslim_edilen_paket]
# ==============================================================================

[OLAY: Yeşil Bayrak Tıklandığında]
├── değişken_yap(batarya = 100)
├── değişken_yap(skor = 0)
└── [DÖNGÜ: Sürekli Tekrarla]
    ├── klavye_ile_hareket_et()
    ├── değişkeni_değiştir(batarya, -0.5)     # Hareket ettikçe enerji harcanır
    ├── [KOŞUL: Eğer <kargo_paketine dokunuyor mu?> ise]
    │   ├── değişkeni_değiştir(skor, 10)
    │   ├── gizle("kargo_paketi")
    │   └── ses_çal("basari_zil")
    ├── [KOŞUL: Eğer <şarj_istasyonuna dokunuyor mu?> ise]
    │   └── değişken_yap(batarya = 100)       # Batarya fulle
    └── [KOŞUL: Eğer <batarya <= 0> ise]
        ├── "Batarya Bitti! Görev Başarısız." de
        └── durdur("tümü")`,
                    output: `[Enerji ve Görev Sistemi]
✓ Başlangıç: Batarya: %100, Skor: 0
✓ Kargo teslim edildi -> Skor: +10
✓ Şarj istasyonuna uğrandı -> Batarya: %100.`
                },
                {
                    id: "stl_uretim_rehber",
                    title: "3D Yazıcı (.STL) Hazırlığı",
                    type: "tasks",
                    filename: "stl_baski.md",
                    language: "markdown",
                    content: `### 🖨️ 3D Yazıcı Üretim Dosyası (.STL):
1. Tasarımın tek bir parça halinde gruplandığından emin olun.
2. Sağ üstteki **Dışa Aktar (Export)** butonuna tıklayın.
3. Format olarak **.STL** seçeneğini seçip bilgisayarınıza kaydedin.
4. Dilimleyici (Slicer) programında dolgu oranını %20 (infill) olarak ayarlayın.`
                },
                {
                    id: "kazanimlar_hafta6",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 6. Hafta Ders Akışı:
- **Ders 1 (Final Montaj & STL):** 3D model ihracı.
- **Ders 2 (Scratch Değişkenler):** Batarya, hız ve skor değişkenleri.
- **Ders 3 (Akıllı Şehir Projesi):** Görev ve enerji simülasyonu.
- **Ders 4 (Hata Avı & Sunum):** Debugging ve akran değerlendirmesi.`
                }
            ]
        },

        // HAFTA 7
        {
            week: 7,
            title: "Şehir İçi Güvenli İletişim & Sezar Şifreleme (Unplugged)",
            summary: "Veri güvenliği temelleri, Sezar şifreleme çarkı, harf öteleme matematiği ve şifreleme akış şeması.",
            category: "Siber Güvenlik & Kriptografi",
            docUrl: "https://docs.google.com/document/d/1Tqb8rsqI7PmPykBBNkpKJV7J2wVQsiDUGLFhsevTGY0/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "sezar_sifre_python",
                    title: "sezar_sifreleyici.py",
                    type: "code",
                    filename: "sezar_kripto.py",
                    language: "python",
                    content: `# ==============================================================================
# SEZAR ŞİFRELEME ALGORİTMASI SİMÜLASYONU (Hafta 7 / Ders 2)
# Harf Öteleme (Caesar Cipher) ile Mesaj Güvenliği
# ==============================================================================

alfabe = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ"

def sezar_sifrele(mesaj, anahtar):
    sifreli = ""
    for harf in mesaj.upper():
        if harf in alfabe:
            eski_indeks = alfabe.index(harf)
            yeni_indeks = (eski_indeks + anahtar) % len(alfabe)
            sifreli += alfabe[yeni_indeks]
        else:
            sifreli += harf
    return sifreli

# Örnek Şehir Güvenlik Mesajı:
gizli_mesaj = "ROBOT DUR"
anahtar = 3
sifreli_metin = sezar_sifrele(gizli_mesaj, anahtar)

print("Orijinal Mesaj :", gizli_mesaj)
print("Kaydırma (Key) :", anahtar)
print("Şifreli Metin  :", sifreli_metin)`,
                    output: `Orijinal Mesaj : ROBOT DUR
Kaydırma (Key) : 3
Şifreli Metin  : UÖERÜ GVT
[Mesaj Güvenli Şekilde Şifrelendi]`
                },
                {
                    id: "kripto_cark_rehberi",
                    title: "Şifre Çarkı & Akış Şeması",
                    type: "tasks",
                    filename: "sifre_carki.md",
                    language: "markdown",
                    content: `### 🔐 Sezar Şifreleme Çarkı Etkinliği:
1. İç içe geçmiş iki daire şablonunu kesin ve ortadan raptiye ile birleştirin.
2. Dış çarktaki 'A' harfini iç çarktaki 'D' harfine hizalayın (Anahtar = +3).
3. 'ROBOT' kelimesinin her harfini çarktan bakarak arkadaşınıza şifreli gönderin.
4. Akış Şeması: Başla → Harfi al → Alfabede +3 ileri git → Şifreli harfi yaz → Bitir.`
                },
                {
                    id: "kazanimlar_hafta7",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 7. Hafta Ders Akışı:
- **Ders 1 (Veri Güvenliği):** Bayraklarda gizli şifre analizi.
- **Ders 2 (Sezar Çarkı):** Harf öteleme matematiği.
- **Ders 3 (Özgün Şifreleme):** Öğrencilerin kendi kripto anahtarları.
- **Ders 4 (Akış Şeması):** Şifreleme algoritması flowchart çizimi.`
                }
            ]
        },

        // HAFTA 8
        {
            week: 8,
            title: "Akıllı Şehir Kampanyası & Afiş Tasarımı (Canva)",
            summary: "Görsel medya tasarımı, odak noktası, katman yönetimi, Serif vs Sans-Serif tipografi ve final afiş yayını.",
            category: "Grafik Tasarım & Canva",
            docUrl: "https://docs.google.com/document/d/1qbG29PfROVPP6T_BLTTtZL-6JRjeCONCjAr0upPYaCI/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "afis_tasarim_rehberi",
                    title: "afis_tasarim_kurallari.md",
                    type: "text",
                    filename: "canva_rehberi.md",
                    language: "markdown",
                    content: `### 🎨 Canva ile Akıllı Şehir Afiş Tasarımı İlkeleri:

1. **Odak Noktası (Focal Point):**
   - Afişe ilk bakan kişinin gözü doğrudan ana mesaja veya robot görseline gitmelidir.
   - Her görsel aynı anda bağırmamalıdır; 1 ana görsel seçin.

2. **Katman Yönetimi (Layers):**
   - Arka plan görselini şeffaflaştırarak (opacity: %80) metinlerin okunmasını sağlayın.
   - Öne çıkan öğeleri katman listesinde en üste taşıyın.

3. **Tipografi Hiyerarşisi:**
   - **Ana Başlık (60-80 pt):** Güçlü, modern ve net (Sans-Serif - Montserrat, Poppins).
   - **Alt Başlık (30-40 pt):** Sloganı özetleyen açıklama.
   - **Gövde Metni (16-24 pt):** Akıllı Şehrin özelliklerini anlatan kısa madde işaretleri.`
                },
                {
                    id: "afis_kontrol_listesi",
                    title: "Afiş Kontrol Listesi",
                    type: "tasks",
                    filename: "kontrol_listesi.md",
                    language: "markdown",
                    content: `### ✅ Final Afiş Teslim Kontrolü:
- [ ] Afiş boyutu A4 veya Poster (1080x1920) seçildi mi?
- [ ] 3-4 renkten oluşan tutarlı bir renk paleti kullanıldı mı?
- [ ] Kullanılan tüm görseller telifsiz (Canva Free kütüphanesi) mi?
- [ ] Yazılar arka plan rengiyle yeterli kontrasta sahip mi?
- [ ] Yüksek çözünürlüklü .PNG veya .PDF Baskı formatında indirildi mi?`
                },
                {
                    id: "kazanimlar_hafta8",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 8. Hafta Ders Akışı:
- **Ders 1 (Görsel Medya Temelleri):** Afişte odak noktası ve denge.
- **Ders 2 (Katman Yönetimi):** Arka plan temizleme ve derinlik.
- **Ders 3 (Tipografi):** Punto büyüklükleri ve yazı tipleri.
- **Ders 4 (Final Yayın):** Akıllı Şehir afişinin teslimi ve sunumu.`
                }
            ]
        }
    ],

    // =========================================================================
    // SEVİYE 2: Henüz link verilmedi (Placeholder)
    // =========================================================================
    "Seviye 2": Array.from({ length: 8 }, (_, i) => ({
        week: i + 1,
        title: `Hafta ${i + 1} Ders Planı`,
        summary: "Bu hafta için henüz ders planı tanımlanmadı. Google Docs linki veya içerik ekleyebilirsiniz.",
        hasRealData: false,
        docUrl: "",
        category: "Genel",
        tabs: []
    })),

    // =========================================================================
    // SEVİYE 3: EKOKAMPÜS (Sürdürülebilir Kampüs Projesi - Python & UI)
    // =========================================================================
    "Seviye 3": [
        // HAFTA 1
        {
            week: 1,
            title: "EkoKampüs: Python Temelleri, Değişkenler & Veri Tipleri",
            summary: "SKA 4, 11, 12 entegrasyonu, okul krokisi 5 bölge haritalama, Google Colab akış şeması, değişkenler, tip dönüşümleri ve Canva moodboard.",
            category: "Yazılım / Python",
            docUrl: "https://docs.google.com/document/d/15dPpS36dixuKTY6SnWyoWlWS-SAMWW3C/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "python_code_w1",
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
bolge_adi = "Ulaşım"             # string (metin)
bolge_puani = 80                 # integer (tam sayı)
enerji_sarfiyati = 120.5         # float (ondalıklı sayı - kWh)
ogrenci_sayisi = 450             # integer (tam sayı)
surdurulebilir_mi = True         # boolean (mantıksal değer)

print("--- Veri Tipleri Kontrolü ---")
print("Bölge Adı Tipi        :", type(bolge_adi))
print("Bölge Puanı Tipi      :", type(bolge_puani))
print("Enerji Sarfiyatı Tipi :", type(enerji_sarfiyati))
print("Sürdürülebilirlik     :", type(surdurulebilir_mi))
print()

# 2. DERS 3: Tip Dönüşümü (Type Casting) & TypeError Çözümü
gelen_puan = "90"                # string tipinde veri
print(f"Gelen Ham Puan: '{gelen_puan}' | Veri Tipi: {type(gelen_puan)}")

puan_sayisal = int(gelen_puan)
bonus_puan = 10
yeni_puan = puan_sayisal + bonus_puan
print("Hesaplanan Yeni Puan (Bonus Dahil):", yeni_puan)

# Çözüm: f-string veya str() dönüşümü
print(f"[EkoKampüs Özet] {bolge_adi} bölgesi için güncel skor: {yeni_puan}/100")

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
[EkoKampüs Özet] Ulaşım bölgesi için güncel skor: 100/100
Günlük Tahmini Karbon Salınımı: 120.5 kg CO2

[Program başarıyla tamamlandı - Exit Code: 0]`
                },
                {
                    id: "tasks_w1",
                    title: "Öğrenci Görevleri",
                    type: "tasks",
                    filename: "ekokampus_gorevler.py",
                    language: "python",
                    content: `# GÖREV 1 (Kantin): 'tabak_atik_miktari = "35.5"' float'a çevirip 10 kg azaltın.
# GÖREV 2 (Enerji): 'harcanan_kwh = "125"' int'e çevirip 2.5 TL ile çarpın.
# GÖREV 3 (Hata Ayıklama): 'print("Bölge: " + 12)' TypeError hatasını düzeltin.
# GÖREV 4 (Moodboard): Doğa dostu 4 hex renk kodunu (#2ecc71 vb.) ekrana yazdırın.`
                },
                {
                    id: "notes_w1",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 1. Hafta Kazanımları:
- Okul krokisinde 5 bölge haritalama.
- Google Colab akış şeması ve ilk \`print()\` fonksiyonu.
- Değişken kuralları ve \`int()\`, \`float()\`, \`str()\` dönüşümleri.
- Canva dijital moodboard ve renk paleti.`
                }
            ]
        },

        // HAFTA 2
        {
            week: 2,
            title: "Tek Bölgeden Karar Üretme: Ulaşım Modülü & User Flow",
            summary: "input() veri girişi, if/elif/else karar mekanizmaları, and/or mantık bağlaçları, User Flow ve Figma ile ilk 3 ekran tasarımı.",
            category: "Çoklu Koşullar & UI/UX",
            docUrl: "https://docs.google.com/document/d/1hwpDzm_QHFLk-iW11-7f_t7jWwJvPArE/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "python_ulasim_modulu",
                    title: "ulasim_modulu.py",
                    type: "code",
                    filename: "ulasim_modulu.py",
                    language: "python",
                    content: `# ==============================================================================
# PROJE: EkoKampüs - HAFTA 2: ULAŞIM KARAR MODÜLÜ
# input() Fonksiyonu, if/elif/else Blokları & and/or Bağlaçları
# ==============================================================================

print("=== 🌱 EKOKAMPÜS ULAŞIM MODÜLÜ ===")
print("Okula nasıl geldiniz?")
print("1 - Yürüyerek veya Bisikletle")
print("2 - Okul Servisi ile")
print("3 - Özel Araç ile\\n")

secim = input("Lütfen seçiminiz (1-3): ")

if secim in ["1", "2", "3"]:
    mesafe = float(input("Okul ile eviniz arası mesafe (km): "))
    
    # 1. Yürüyüş / Bisiklet Tercihi
    if secim == "1":
        ulasim_puani = 100
        oneri = "Harika! Karbon ayak izinizi sıfır tuttunuz."
    
    # 2. Okul Servisi Tercihi
    elif secim == "2":
        ulasim_puani = 70
        oneri = "Toplu ulaşım kullanarak bireysel araç trafiğini önlediniz."
    
    # 3. Özel Araç Tercihi
    elif secim == "3":
        ulasim_puani = 30
        if mesafe < 1.0:
            oneri = "1 km'den kısa mesafedesiniz! Yürümeyi veya bisikleti deneyebilirsiniz."
        else:
            oneri = "Karbon salınımı yüksek. Mümkünse servis veya araç paylaşımını tercih edin."
    
    print("\\n--- DEĞERLENDİRME SONUCU ---")
    print(f"Ulaşım Çevre Puanınız : {ulasim_puani} / 100")
    print(f"Özel Tavsiye          : {oneri}")

else:
    print("⚠️ Hatalı seçim! Lütfen sadece 1, 2 veya 3 giriniz.")`,
                    output: `=== 🌱 EKOKAMPÜS ULAŞIM MODÜLÜ ===
Okula nasıl geldiniz?
1 - Yürüyerek veya Bisikletle
2 - Okul Servisi ile
3 - Özel Araç ile

Lütfen seçiminiz (1-3): 3
Okul ile eviniz arası mesafe (km): 0.8

--- DEĞERLENDİRME SONUCU ---
Ulaşım Çevre Puanınız : 30 / 100
Özel Tavsiye          : 1 km'den kısa mesafedesiniz! Yürümeyi veya bisikleti deneyebilirsiniz.`
                },
                {
                    id: "user_flow_ux",
                    title: "User Flow & Figma Ekranları",
                    type: "tasks",
                    filename: "user_flow_rehberi.md",
                    language: "markdown",
                    content: `### 📱 Figma / Canva İlk 3 Ekran Tasarımı:
1. **Ekran 1 (Hoş Geldin):** EkoKampüs logosu, 'Okulunu Dönüştür' sloganı ve 'Başla' butonu.
2. **Ekran 2 (Ulaşım Sorusu):** 3 radyo buton / kart (Yürüyerek, Servis, Özel Araç) ve mesafe giriş kutusu.
3. **Ekran 3 (Sonuç & Tavsiye):** Puan kartı (0-100), çevre rozeti ve dinamik tavsiye metni.`
                },
                {
                    id: "kazanimlar_w2",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 2. Hafta Ders Akışı:
- **Ders 1 (Kullanıcı Etkileşimi):** \`input()\` ve karşılaştırma operatörleri.
- **Ders 2 (Ulaşım Modülü):** \`if/elif/else\` ve \`and/or\` bağlaçları.
- **Ders 3 (User Flow):** UX akış şeması çizimi.
- **Ders 4 (Arayüz Tasarımı):** Figma ile ilk 3 mobil ekran prototipi.`
                }
            ]
        },

        // HAFTA 3
        {
            week: 3,
            title: "Tek Bölgeden Çoklu Bölgeye: Döngüler, Listeler & Check-up (v0.3)",
            summary: "DRY prensibi, for ve while döngüleri, liste veri yapısı (answers = []), while True çıkış kontrolü ve 5 bölge otomasyonu.",
            category: "Döngüler, Listeler & User Flow",
            docUrl: "https://docs.google.com/document/d/1nXvAUtUn8EWTu3rKGqlriKZ6oZYWN4_8/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "python_coklu_bolge",
                    title: "coklu_bolge_checkup.py",
                    type: "code",
                    filename: "ekokampus_v03.py",
                    language: "python",
                    content: `# ==============================================================================
# PROJE: EkoKampüs v0.3 - ÇOK BÖLGELİ CHECK-UP (Hafta 3)
# for Döngüsü, Listeler (answers = []), sum(), len() & while True
# ==============================================================================

bolgeler = ["Kantin", "Sınıf/Enerji", "Ulaşım", "Atık", "Bahçe/Yeşil Alan"]
sorular = [
    "Bugün tabağındaki yemeği bitirdin mi? (1-5 puan): ",
    "Kullanılmayan lambaları kapattın mı? (1-5 puan): ",
    "Okula çevre dostu yöntemle mi geldin? (1-5 puan): ",
    "Çöplerini geri dönüşüm kutusuna attın mı? (1-5 puan): ",
    "Yeşil alanları ve bitkileri korudun mu? (1-5 puan): "
]

while True:
    print("\\n=== 🌱 EKOKAMPÜS 5 BÖLGE DEĞERLENDİRMESİ ===")
    answers = []
    
    # 5 Bölgeyi for döngüsüyle sırayla soralım:
    for i in range(len(bolgeler)):
        while True:
            try:
                puan = int(input(f"[{bolgeler[i]}] {sorular[i]}"))
                if 1 <= puan <= 5:
                    answers.append(puan)
                    break
                else:
                    print("Lütfen 1 ile 5 arasında bir puan giriniz!")
            except ValueError:
                print("Geçerli bir sayı giriniz.")
    
    # Liste İstatistikleri
    toplam_puan = sum(answers)
    ortalama_puan = toplam_puan / len(answers)
    yuzdelik_skor = (toplam_puan / 25) * 100
    
    print("\\n--- DEĞERLENDİRME RAPORU ---")
    print(f"Bölge Puanları Listesi : {answers}")
    print(f"Toplam Puan            : {toplam_puan} / 25")
    print(f"Ortalama Bölge Skoru   : {ortalama_puan:.2f} / 5")
    print(f"Genel EkoKampüs Skoru  : %{yuzdelik_skor:.1f}")
    
    # while döngüsü çıkış mekanizması
    devam = input("\\nBaşka bir öğrenci değerlendirmek ister misiniz? (E/H): ").strip().lower()
    if devam == "h":
        print("EkoKampüs değerlendirmesi tamamlandı. Teşekkürler!")
        break`,
                    output: `=== 🌱 EKOKAMPÜS 5 BÖLGE DEĞERLENDİRMESİ ===
[Kantin] Bugün tabağındaki yemeği bitirdin mi? (1-5 puan): 5
[Sınıf/Enerji] Kullanılmayan lambaları kapattın mı? (1-5 puan): 4
[Ulaşım] Okula çevre dostu yöntemle mi geldin? (1-5 puan): 4
[Atık] Çöplerini geri dönüşüm kutusuna attın mı? (1-5 puan): 5
[Bahçe/Yeşil Alan] Yeşil alanları ve bitkileri korudun mu? (1-5 puan): 5

--- DEĞERLENDİRME RAPORU ---
Bölge Puanları Listesi : [5, 4, 4, 5, 5]
Toplam Puan            : 23 / 25
Ortalama Bölge Skoru   : 4.60 / 5
Genel EkoKampüs Skoru  : %92.0`
                },
                {
                    id: "liste_operasyonlari",
                    title: "Listeler & DRY Prensibi",
                    type: "tasks",
                    filename: "liste_gorevleri.py",
                    language: "python",
                    content: `# GÖREV 1: answers listesindeki en düşük puanı (min) ve en yüksek puanı (max) bulun.
# GÖREV 2: Eğer ortalama 4.0 üzerindeyse "Yeşil Kampüs Rozeti" kazandınız mesajı verin.
# GÖREV 3: answers.pop() ile son girilen cevabı silip yeniden sorma fonksiyonu ekleyin.`
                },
                {
                    id: "kazanimlar_w3",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 3. Hafta Ders Akışı:
- **Ders 1 & 2 (Döngüler):** \`for\`, \`range()\`, 5 bölge döngüsü ve DRY prensibi.
- **Ders 3 (Listeler):** \`answers = []\`, \`append()\`, \`len()\`, \`sum()\` metotları.
- **Ders 4 (while Çıkış Kontrolü):** Sonsuz döngüden \`break\` ile güvenli çıkış ve v0.3 çıktısı.`
                }
            ]
        },

        // HAFTA 4
        {
            week: 4,
            title: "Fonksiyonlar & Modüler Bölge Skorlama Motoru",
            summary: "Parametre alan ve değer döndüren fonksiyonlar (def / return), modüler kodlama ve her bölgeye özel hesaplayıcılar.",
            category: "Fonksiyonlar & Modüler Mimari",
            docUrl: "https://docs.google.com/document/d/1nXvAUtUn8EWTu3rKGqlriKZ6oZYWN4_8/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "python_fonksiyonlar",
                    title: "fonksiyonlar_modul.py",
                    type: "code",
                    filename: "ekokampus_fonksiyonlar.py",
                    language: "python",
                    content: `# ==============================================================================
# PROJE: EkoKampüs - HAFTA 4: MODÜLER HESAPLAMA MOTORU
# def, Parametreler, return Değerleri & Scope (Değişken Kapsamı)
# ==============================================================================

def kantin_puani_hesapla(tabak_temiz, atik_gram):
    """Kantin puanını hesaplar ve döndürür."""
    puan = 100 if tabak_temiz else 50
    puan -= int(atik_gram / 20)
    return max(puan, 0)

def enerji_puani_hesapla(lamba_acik_sayisi, akilli_tahta_kapanmis_mi):
    """Sınıf enerji tasarrufu puanını hesaplar."""
    puan = 100 - (lamba_acik_sayisi * 15)
    if akilli_tahta_kapanmis_mi:
        puan += 10
    return max(min(puan, 100), 0)

def genel_skor_birlestir(kantin, enerji, ulasim=80):
    """Tüm bölgelerin ağırlıklı ortalamasını üretir."""
    agirlikli_toplam = (kantin * 0.3) + (enerji * 0.4) + (ulasim * 0.3)
    return round(agirlikli_toplam, 1)

# Fonksiyonları Test Edelim:
k_skor = kantin_puani_hesapla(tabak_temiz=True, atik_gram=50)
e_skor = enerji_puani_hesapla(lamba_acik_sayisi=1, akilli_tahta_kapanmis_mi=True)
genel = genel_skor_birlestir(k_skor, e_skor)

print(f"Kantin Skoru : {k_skor}/100")
print(f"Enerji Skoru : {e_skor}/100")
print(f"Genel Kampüs : {genel}/100")`,
                    output: `Kantin Skoru : 98/100
Enerji Skoru : 95/100
Genel Kampüs : 93.9/100`
                },
                {
                    id: "fonksiyon_gorevleri",
                    title: "Fonksiyon Tasarım Görevleri",
                    type: "tasks",
                    filename: "fonksiyon_odev.py",
                    language: "python",
                    content: `# GÖREV 1: 'atik_puani_hesapla(plastik_kutu, kagit_kutu)' fonksiyonunu tanımlayın.
# GÖREV 2: 'agac_dikim_katkisi(puan)' fonksiyonu yazıp kazanılan ağaç fidanı sayısını döndürün.`
                },
                {
                    id: "kazanimlar_w4",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 4. Hafta Kazanımları:
- \`def\` ile fonksiyon oluşturma ve parametre tanımlama.
- \`return\` ile hesaplanan değeri çağıran yere gönderme.
- Lokal (Local) vs Global değişken kapsamı kuralları.`
                }
            ]
        },

        // HAFTA 5
        {
            week: 5,
            title: "Veri Yapıları & Sözlükler (Dictionaries) ile Bölge Modeli",
            summary: "Python sözlükleri (key-value), iç içe veri yapıları, JSON veri modeli ve bölge bazlı durum analizi.",
            category: "Gelişmiş Veri Yapıları (Dict)",
            docUrl: "https://docs.google.com/document/d/1nXvAUtUn8EWTu3rKGqlriKZ6oZYWN4_8/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "python_sozlukler",
                    title: "bolge_veri_modeli.py",
                    type: "code",
                    filename: "bolge_modelleri.py",
                    language: "python",
                    content: `# ==============================================================================
# PROJE: EkoKampüs - HAFTA 5: SÖZLÜKLER (DICTIONARIES) İLE BÖLGE MODELİ
# Key-Value Veri Yönetimi & Kampüs Veri Tabanı
# ==============================================================================

kampus_bolgeleri = {
    "Kantin": {"puan": 85, "oncelik": "Düşük", "sorumlu": "Ayşe Öğretmen"},
    "Enerji": {"puan": 45, "oncelik": "YÜKSEK", "sorumlu": "Mehmet Bey"},
    "Ulaşım": {"puan": 70, "oncelik": "Orta", "sorumlu": "Ali Kaptan"},
    "Atık": {"puan": 90, "oncelik": "Düşük", "sorumlu": "Zeynep Kulüp"},
    "Bahçe": {"puan": 95, "oncelik": "Düşük", "sorumlu": "Canan Hoca"}
}

print("=== ACİL İYİLEŞTİRME GEREKTİREN BÖLGELER ===")
for bolge, veri in kampus_bolgeleri.items():
    if veri["puan"] < 60:
        print(f"🚨 DİKKAT: {bolge} bölgesi puanı: {veri['puan']} | Sorumlu: {veri['sorumlu']}")
    else:
        print(f"✅ {bolge} bölgesi sürdürülebilir durumda ({veri['puan']} puan).")`,
                    output: `=== ACİL İYİLEŞTİRME GEREKTİREN BÖLGELER ===
✅ Kantin bölgesi sürdürülebilir durumda (85 puan).
🚨 DİKKAT: Enerji bölgesi puanı: 45 | Sorumlu: Mehmet Bey
✅ Ulaşım bölgesi sürdürülebilir durumda (70 puan).
✅ Atık bölgesi sürdürülebilir durumda (90 puan).
✅ Bahçe bölgesi sürdürülebilir durumda (95 puan).`
                },
                {
                    id: "kazanimlar_w5",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 5. Hafta Kazanımları:
- Sözlüklerde anahtar (key) ve değer (value) ilişkisi.
- \`.items()\`, \`.keys()\`, \`.values()\` metotlarıyla gezinme.
- Karmaşık verilerin organize edilmesi.`
                }
            ]
        },

        // HAFTA 6
        {
            week: 6,
            title: "Nesne Yönelimli Programlama (OOP) Giriş & Sınıflar",
            summary: "Class ve Object kavramları, __init__ yapıcı metodu, özellikler (attributes) ve EkoKampüs Bölge Sınıfı.",
            category: "Nesne Yönelimli Programlama (OOP)",
            docUrl: "https://docs.google.com/document/d/1nXvAUtUn8EWTu3rKGqlriKZ6oZYWN4_8/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "python_oop",
                    title: "ekokampus_siniflar.py",
                    type: "code",
                    filename: "oop_bolge_sinifi.py",
                    language: "python",
                    content: `# ==============================================================================
# PROJE: EkoKampüs - HAFTA 6: NESNE YÖNELİMLİ PROGRAMLAMA (OOP)
# Class, Object, __init__ Metodu & Kapsülleme
# ==============================================================================

class EkoBolge:
    def __init__(self, ad, baslangic_puani):
        self.ad = ad
        self.puan = baslangic_puani
        self.iyilestirmeler = []

    def puan_ekle(self, miktar):
        self.puan = min(self.puan + miktar, 100)

    def puan_dusur(self, miktar):
        self.puan = max(self.puan - miktar, 0)

    def iyilestirme_kaydet(self, mesaj):
        self.iyilestirmeler.append(mesaj)

    def durum_raporu(self):
        return f"[{self.ad}] Güncel Skor: {self.puan}/100 | İyileştirme Sayısı: {len(self.iyilestirmeler)}"

# Nesneleri Oluşturalım:
kantin = EkoBolge("Kantin", 70)
kantin.puan_ekle(15)
kantin.iyilestirme_kaydet("Kompost kutusu yerleştirildi.")

enerji = EkoBolge("Sınıf Enerji", 50)
enerji.puan_dusur(10)

print(kantin.durum_raporu())
print(enerji.durum_raporu())`,
                    output: `[Kantin] Güncel Skor: 85/100 | İyileştirme Sayısı: 1
[Sınıf Enerji] Güncel Skor: 40/100 | İyileştirme Sayısı: 0`
                },
                {
                    id: "kazanimlar_w6",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 6. Hafta Kazanımları:
- Sınıf (Class) şablonu ve Nesne (Object) üretimi.
- \`__init__\` ve \`self\` kavramı.
- Metotlarla nesne durumunu güvenli güncelleme.`
                }
            ]
        },

        // HAFTA 7
        {
            week: 7,
            title: "Hata Yönetimi (Try-Except) & Rapor Loglama",
            summary: "Programın çökmesini önleme, try/except blokları, dosya yazma (File I/O) ve haftalık sürdürülebilirlik raporu çıktısı.",
            category: "Hata Yönetimi & Dosya İşlemleri",
            docUrl: "https://docs.google.com/document/d/1nXvAUtUn8EWTu3rKGqlriKZ6oZYWN4_8/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "python_hata_ve_dosya",
                    title: "rapor_kaydedici.py",
                    type: "code",
                    filename: "log_yonetimi.py",
                    language: "python",
                    content: `# ==============================================================================
# PROJE: EkoKampüs - HAFTA 7: HATA YÖNETİMİ & RAPOR LOGLAMA
# try - except Blokları ve Dosya Yazma (File I/O)
# ==============================================================================

def guvenli_veri_al(mesaj):
    while True:
        try:
            deger = float(input(mesaj))
            return deger
        except ValueError:
            print("❌ Geçersiz giriş! Lütfen sadece sayısal bir değer giriniz.")

# Güvenli Girdi Testi:
atik_kg = guvenli_veri_al("Günlük plastik atık miktarı (kg): ")

# Raporu Metin Dosyasına Kaydetme:
rapor_metni = f"EKOKAMPÜS RAPORU\\nPlastik Atık: {atik_kg} kg\\nDurum: Kaydedildi."

with open("ekokampus_log.txt", "w", encoding="utf-8") as f:
    f.write(rapor_metni)

print("✓ Rapor başarıyla 'ekokampus_log.txt' dosyasına yazıldı.")`,
                    output: `Günlük plastik atık miktarı (kg): 14.5
✓ Rapor başarıyla 'ekokampus_log.txt' dosyasına yazıldı.`
                },
                {
                    id: "kazanimlar_w7",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 7. Hafta Kazanımları:
- \`ValueError\` ve çalışma zamanı hatalarını \`try/except\` ile yakalama.
- Dosya açma (\`open\`), yazma (\`write\`) ve \`with\` bağlamı.`
                }
            ]
        },

        // HAFTA 8
        {
            week: 8,
            title: "EkoKampüs Final Entegrasyonu & Proje Sunumu",
            summary: "Tüm 5 bölgenin birleştirilmesi, genel EkoKampüs Skorunun hesaplanması, idareye öneri sunumu ve mezuniyet demosu.",
            category: "Final Projesi & Demo",
            docUrl: "https://docs.google.com/document/d/1nXvAUtUn8EWTu3rKGqlriKZ6oZYWN4_8/edit",
            hasRealData: true,
            tabs: [
                {
                    id: "python_final_proje",
                    title: "ekokampus_final.py",
                    type: "code",
                    filename: "ekokampus_final_v1.py",
                    language: "python",
                    content: `# ==============================================================================
# PROJE: EkoKampüs - HAFTA 8: FİNAL ENTEGRASYONU VE DÖNEM SONU SUNUMU
# Tüm Modüllerin Birleşimi & Okul Yönetimi Raporlama Motoru
# ==============================================================================

class EkoKampusSistemi:
    def __init__(self, okul_adi):
        self.okul_adi = okul_adi
        self.skorlar = {
            "Kantin": 85,
            "Enerji": 75,
            "Ulaşım": 90,
            "Atık": 80,
            "Yeşil Alan": 95
        }

    def genel_ortalama(self):
        return sum(self.skorlar.values()) / len(self.skorlar)

    def sertifika_bas(self):
        skor = self.genel_ortalama()
        print("=" * 50)
        print(f"🏅 {self.okul_adi.upper()} SÜRDÜRÜLEBİLİRLİK RAPORU")
        print("=" * 50)
        for bolge, puan in self.skorlar.items():
            print(f"• {bolge:<15}: {'█' * int(puan // 10)} {puan}/100")
        print("-" * 50)
        print(f"GENEL EKOKAMPÜS SKORU: %{skor:.1f}")
        if skor >= 80:
            print("TEBRİKLER! OKULUNUZ 'ALTIN YEŞİL BAYRAK' ÖDÜLÜNÜ KAZANDI! 🌱")
        print("=" * 50)

# Final Demo:
sistem = EkoKampusSistemi("Atatürk Ortaokulu")
sistem.sertifika_bas()`,
                    output: `==================================================
🏅 ATATÜRK ORTAOKULU SÜRDÜRÜLEBİLİRLİK RAPORU
==================================================
• Kantin         : ████████ 85/100
• Enerji         : ███████ 75/100
• Ulaşım         : █████████ 90/100
• Atık           : ████████ 80/100
• Yeşil Alan     : █████████ 95/100
--------------------------------------------------
GENEL EKOKAMPÜS SKORU: %85.0
TEBRİKLER! OKULUNUZ 'ALTIN YEŞİL BAYRAK' ÖDÜLÜNÜ KAZANDI! 🌱
==================================================`
                },
                {
                    id: "kazanimlar_w8",
                    title: "Kazanımlar & 4 Ders",
                    type: "text",
                    filename: "kazanimlar.md",
                    language: "markdown",
                    content: `### 🎯 8. Hafta Kazanımları:
- Proje kodlarının modüler entegrasyonu.
- Veri görselleştirme ve rapor üretimi.
- Final akran sunumu ve portfolyo teslimi.`
                }
            ]
        }
    ]
};
