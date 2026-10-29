export interface ColabCell {
    type: 'code' | 'markdown';
    content: string;
}

export interface ColabNotebook {
    id: string;
    week: number;
    title: string;
    url: string;
    cells: ColabCell[];
    mergedCode: string;
}

export const COLAB_NOTEBOOKS: Record<string, ColabNotebook> = {
  "hafta-1": {
    "id": "hafta-1",
    "week": 1,
    "title": "Python Hafta 1",
    "url": "https://colab.research.google.com/drive/1IyLYWhkORsbjebK9bZY6Wr56CYOlwgCq?usp=sharing#scrollTo=3kHjdR-AHsb0",
    "cells": [
      {
        "type": "markdown",
        "content": "# HAFTA 1 DERS 2"
      },
      {
        "type": "markdown",
        "content": "**PRINT FONKSİYONU**\n"
      },
      {
        "type": "code",
        "content": "print(\"hello world!\") #ekrana hello world! yazar"
      },
      {
        "type": "code",
        "content": "\n_isim = \"John Doe\" #degisken adında bir değişken oluşturup kelime değişkeni atanır\nprint(_isim) #degisken değişkeni ekrana yazdırılır\nprint(\"isim\") #ekrana degisken kelimesini yazar"
      },
      {
        "type": "code",
        "content": "yil=2004\nprint('Benim doğum yılım ', yil) #hem aynı hem farklı türler , ile yan yana yazdırılabilir"
      },
      {
        "type": "markdown",
        "content": "**Kaçış Dizileri**"
      },
      {
        "type": "code",
        "content": "print(\"hello \\nworld!\") #kendinden sonra geleni yeni satıra geçerek yazar"
      },
      {
        "type": "code",
        "content": "print(\"hello \\t world!\") #kendinden sonra geleni bir tab boşluklu yazar\nprint(\"hello \\f world!\") #kendinden sonra geleni 2 boşluklu yazar\n"
      },
      {
        "type": "code",
        "content": "print(\"hello \\r world!\") #kendinden önce geleni siler"
      },
      {
        "type": "code",
        "content": "print(\"hello \\\\ world!\") # \\ parametresini yazdırır\nprint('hello \\' world!') # ' parametresini yazdırır\nprint(\"hello \\\" world!\") # \" parametresini yazdırır. \\ olmadan yazılmaya çalışılırsa hata verir"
      },
      {
        "type": "code",
        "content": "#kendinden önce gelen 1 karakteri siler. boşluk varsa sadece boşluk siler.\nprint(\"Sil\\b o\")"
      },
      {
        "type": "code",
        "content": "print(\"Alt\\n satır\")\nprint(\"Alt\\n \\bsatır\") #alt satıra geçildiğinde oluşan satır başı boşluğunu siler"
      },
      {
        "type": "code",
        "content": "#kelime2'yi tırnak içinde yazar\nprint(\"kelime1 \\\"kelime2\\\" kelime3\")\n\n#kelime1 kelime2 kelime3 arasında boşluk olmadan yazar\nprint(\"kelime1\" \"kelime2\" \"kelime3\")\n\n#kelime1 kelime2 kelime3 arasında birer boşluk bırakır\nprint(\"kelime1\", \"kelime2\", \"kelime3\")"
      },
      {
        "type": "code",
        "content": "#kelime1 kelime2 kelime3 arasına yıldız karakteri ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"*\")\n\n#kelime1 kelime2 kelime3 herbirini yeni satırda yazar\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\n\")\n\n#kelime1 kelime2 kelime3 arasına boşluk ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\t\")\n\n#sonuncu kelimeyi yazdırır\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\r\")\n\n#her birinin arasına bir adet \\ karakteri ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\\\\")\n\n#her birinin arasına bir adet ' karakteri ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\'\")\n\n#her birinin arasına bir adet \"\" karakteri ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\\"\")\n"
      },
      {
        "type": "markdown",
        "content": "# HAFTA 1 DERS 3"
      },
      {
        "type": "code",
        "content": "# Sayıların tanımlanması\nsayi1 = 10\nsayi2 = 5\n\n# Toplama işlemi\ntoplam = sayi1 + sayi2\nprint(toplam)\n# Çıkarma işlemi\nfark = sayi1 - sayi2\n\n# Çarpma işlemi\ncarpim = sayi1 * sayi2\n\n# Bölme işlemi\nbolum = sayi1 / sayi2 #2\n\n# Mod (kalan) işlemi\nmod = sayi1 % sayi2 #0\n\n# Karesini alma\nkare_sayi1 = sayi1 ** 2\n\n# Sonuçların ekrana yazdırılması\nprint(\"Toplam:\", toplam)\nprint(\"Fark:\", fark)\nprint(\"Çarpım:\", carpim)\nprint(\"Bölüm:\", bolum)\nprint(\"Mod (kalan):\", mod)\nprint(sayi1, \"sayısının karesi:\", kare_sayi1)\n"
      },
      {
        "type": "code",
        "content": "ilk_kelime= 'selam'\nikinci_kelime= 'nasılsın?'\nprint(5 + 10) #15\nprint( ilk_kelime + ' '+ ikinci_kelime)\n\nsayi=10\n\nprint(sayi) #10\n\nprint('sayi')\n\nprint('sayının değeri: ', sayi)\nprint('sayının 2 katı: ', 2*sayi)\nprint(2*sayi)\nprint(sayi+2)\nprint(2*'sayi')\nprint(2*'sayi ')\n"
      },
      {
        "type": "markdown",
        "content": "**LOWER, UPPER VE LEN FONKSİYONU**"
      },
      {
        "type": "code",
        "content": "string = \"ibbteknoloji  \"\nprint(len(string))\n"
      },
      {
        "type": "code",
        "content": "film = 'OPPENHEIMER'\nprint(\"Başlangıçta\",film) #OPPENHEIMER\nfilm = film.lower() #film değişkeni içeriği küçük harfe çevrilir\nprint(\"En son hali\", film)"
      },
      {
        "type": "code",
        "content": "film2= \"barbie\"\nfilm2=film2.upper()\nprint(film2)"
      },
      {
        "type": "markdown",
        "content": "**INTEGER, FLOAT VE TYPE KAVRAMLARI**"
      },
      {
        "type": "code",
        "content": "#integer: kısaltması int, tamsayı (2, 157, 3476, -2, 56, -394)\nx=46\n#type methodu\nprint(type(x))\n\n#float: ondalık sayılar (2.0, 34.0, -76.3, 15.6 )"
      },
      {
        "type": "code",
        "content": "sicaklik= 38.2\nprint(sicaklik)\nprint(type(sicaklik))"
      },
      {
        "type": "code",
        "content": "sicaklik= 38\nprint(sicaklik)\nprint(type(sicaklik))"
      },
      {
        "type": "markdown",
        "content": "**BOOLEAN VERİ TİPİ**"
      },
      {
        "type": "code",
        "content": "saglam=True\nbozuk=False\nprint(type(saglam))\nprint(type(bozuk))\n"
      },
      {
        "type": "code",
        "content": "\nprint(10 > 9) #true\nprint(10 == 9) # false\nprint(10 < 9) #false"
      },
      {
        "type": "markdown",
        "content": "**LİSTE VERİ TİPİ**\n\nListe, birden fazla değeri tek bir değişkende saklamak için kullanılan bir veri tipidir.\n\nListeler köşeli parantez [] içinde oluşturulur ve elemanlar virgül ile ayrılır.\n\nListeler hem aynı türde hem de farklı türde veri içerebilir."
      },
      {
        "type": "code",
        "content": "# Boş bir liste oluşturma\nogrenci_isimleri = []\nprint(ogrenci_isimleri)\n\n# Öğrenci isimlerini listeye ekleme\nogrenci_isimleri.append(\"Ahmet\")\nprint(ogrenci_isimleri)\nogrenci_isimleri.append(\"Ayşe\")\nprint(ogrenci_isimleri)\nogrenci_isimleri.append(\"Mehmet\")\n\n# Listeyi ekrana yazdırma\nprint(\"Öğrenci İsimleri:\", ogrenci_isimleri)"
      },
      {
        "type": "markdown",
        "content": "**SORU 1**\n\nTabanı 5 metre ve yüksekliği 12 metre olan bir üçgenin alanını hesaplayan bir python kodu yazın. Yazdığınız koddaki alan değerini yarıçap olarak tanımlayın ve pi'yi 3.14 alarak bir çember yarıçapı hesaplayın."
      },
      {
        "type": "code",
        "content": "# Üçgenin alanını hesaplayalım\ntaban = 5\nyukseklik = 12\nalan = 0.5 * taban * yukseklik\n\n# Sonucu ekrana yazdıralım\nprint(\"Üçgenin alanı:\", alan)\n\n# Çemberin yarıçapı\nyaricap = alan\n\n# Pi sayısı\npi = 3.14\n\n# Çemberin alanını hesapla\nalan = pi * yaricap ** 2\n\n# Sonucu ekrana yazdır\nprint(\"Çemberin alanı:\", alan)"
      },
      {
        "type": "markdown",
        "content": "**SORU 2**\n\nAşağıdaki ürünlerin fiyatlarının küsüratları olmadan hesaplanması isteniyor. Ürünlerin tutarını (150.20->150.0) yuvarladıktan sonra ürün1'e yüzde 20 indirim\nürün2'ye yüzde 50 indirim yaparak tüm üç ürünü alan müşterinin ödemesi gereken\ntutarı küsürat olmadan yazdırınız.\n\nürün1= 53.26 TL\n\nürün2= 78.965 TL\n\nürün3= 102.65 TL\n\n"
      },
      {
        "type": "code",
        "content": "urun1 =int(53.26)\nurun2=int(78.975)\nurun3=int(102.65)\n\nurun1=urun1- (urun1*0.2)\nurun2=urun2- (urun2*0.5)\n\ntoplam=urun1+urun2+urun3\n\nprint('toplam ücret: ', int(toplam))"
      },
      {
        "type": "markdown",
        "content": "# HAFTA 1 DERS 4\n"
      },
      {
        "type": "markdown",
        "content": "**STRING'E DETAYLI BAKIŞ**"
      },
      {
        "type": "code",
        "content": "#string: çift tırnak içindedir. (\"İSİM\", \"soyad\", \"1256\", \"3.gyt56_\")\nisim=\"Ahmet\"\nyas=\"16\"\nprint(isim + ' '+ yas)\nprint(isim , yas)\nprint(type(yas)) # string"
      },
      {
        "type": "markdown",
        "content": "**STRING INDEXLEME VE BÖLME**"
      },
      {
        "type": "code",
        "content": "# bir string tanımla\ntext = \"Hello, World!\"\n# tanımladığın stringi yazdır\nprint(\"Orijinal string:\", text)"
      },
      {
        "type": "code",
        "content": "# Pozitif indexlemeyle harflere erişim\ntext = \"Hello, World!\"\nilk_harf = text[0]\nikinci_harf = text[1]\nson_harf = text[-1]  # negatif indexlemeyle sondan itibaren erişim\n\nprint(\"ilk harf:\", ilk_harf)\nprint(\"ikinci harf:\", ikinci_harf)\nprint(\"son karakter:\", son_harf)"
      },
      {
        "type": "markdown",
        "content": "**SORU 3**\n\nAlfabedeki harfleri bir string'e tanımladıktan sonra isminizin harflerini yukarıdan aşağı yazdırın."
      },
      {
        "type": "code",
        "content": "# İngiliz alfabesindeki bütün harfleri içeren bir string oluşturalım\nalfabe = \"abcdefghijklmnopqrstuvwxyz\"\n\n# Herhangi bir ismi yukarıdan aşağıya tek tek yazdıralım\nprint(alfabe[0])\nprint(alfabe[1])\nprint(alfabe[2])\nprint(alfabe[3])\n# ... devam eder\n\n# Gerekli harfleri yazdırdıktan sonra program sonlanır"
      },
      {
        "type": "code",
        "content": "# stringi parçalayarak yazdırma\ntext = \"Hello, World!\"\nsubstring1 = text[0:5]  # 0'dan 4'üncü indexe kadarki harfler (5-1)\nsubstring2 = text[7:]   # 7'den en sona kadarki harfler\nsubstring3 = text[:5]   # baştan 4'üncü indexe kadarki harfler\nsubstring4 = text[7:-1] # 7'den sondan ikinci harfe kadarki kısım\nprint(\"Substring 1:\", substring1)\nprint(\"Substring 2:\", substring2)\nprint(\"Substring 3:\", substring3)\nprint(\"Substring 4:\", substring4)\n"
      },
      {
        "type": "code",
        "content": "# Negatif indexlemeyle stringi parçalama\ntext = \"Hello, World!\"\nsubstring5 = text[-6:-1] # -6'dan -2'ye\nsubstring6 = text[:-8]   # -9'dan başa\n\nprint(\"Substring 5:\", substring5)\nprint(\"Substring 6:\", substring6)\n"
      },
      {
        "type": "code",
        "content": "#@title Step Kullanımı (zıplama)\n# İkinci iki noktanın sağındaki atlama sıklığını belirler\nsayilar = \"0123456789\"\n\ncift_sayilar = sayilar[0::4]  # Her 2 karakterde bir (çıktı: 02468)\ntek_sayilar = sayilar[1::3]  # Her 2 karakterde bir, başlangıç indeksi 1 (çıktı: 13579)\n\nprint(cift_sayilar, tek_sayilar)\n"
      },
      {
        "type": "code",
        "content": "# String kelime gruplarını bölme\n# Split parantezinin içine ne yazarsanız bölünen kelimeler arasına onu ekler\ncumle = \"Bu bir örnek cümle.\"\nkelimeler = cumle.split()\n\nprint(kelimeler)\nprint(kelimeler[0][0])"
      },
      {
        "type": "markdown",
        "content": "**SORU 4**\n\nVerilen işlemleri sırasıyla yapın.\n\nSubstring 1: Cümlenin ilk 5 karakterini yazdırın.\n\nSubstring 2: Cümlenin 7. karakterinden sonrasını yazdırın.\n\nSubstring 3: Cümlenin baştan 5. karaktere kadar olan kısmını yazdırın.\n\nSubstring 4: Cümlenin 7. karakterinden sondan ikinci karaktere kadar olan kısmını yazdırın.\n\nSubstring 5: Negatif indeksleme kullanarak, sondan 6. karakterden sondan 2. karaktere kadar olan kısmı yazdırın.\n\nSubstring 6: Negatif indeksleme kullanarak, sondan 8. karakterden başa kadar olan kısmı yazdırın.\n\nÇift Sayılar: 0123456789 dizisinden her iki karakterde bir olan karakterleri yazdırın.\n\nTek Sayılar: 0123456789 dizisinden, başlangıç indeksi 1 olan ve her iki karakterde bir olan karakterleri yazdırın.\n\nKelime Bölme: Cümleyi kelimelere bölerek her kelimeyi ayrı ayrı yazdırın.\n"
      },
      {
        "type": "code",
        "content": "# Metin\ntext = \"Python programlama dilini öğrenmek çok eğlenceli.\"\n\n# Stringi parçalayarak yazdırma\nsubstring1 = text[0:5]  # 0'dan 4'üncü indexe kadarki harfler (5-1)\nsubstring2 = text[7:]   # 7'den en sona kadarki harfler\nsubstring3 = text[:5]   # baştan 4'üncü indexe kadarki harfler\nsubstring4 = text[7:-1] # 7'den sondan ikinci harfe kadarki kısım\n\nprint(\"Substring 1:\", substring1)\nprint(\"Substring 2:\", substring2)\nprint(\"Substring 3:\", substring3)\nprint(\"Substring 4:\", substring4)\n\n# Negatif indexlemeyle stringi parçalama\nsubstring5 = text[-6:-1] # -6'dan -2'ye\nsubstring6 = text[:-8]   # -8'den başa\n\nprint(\"Substring 5:\", substring5)\nprint(\"Substring 6:\", substring6)\n\n# String indexlemede \"step\" yani zıplama\n# İkinci iki noktanın sağındaki atlama sıklığını belirler\nsayilar = \"0123456789\"\n\ncift_sayilar = sayilar[::2]  # Her 2 karakterde bir (çıktı: 02468)\ntek_sayilar = sayilar[1::2]  # Her 2 karakterde bir, başlangıç indeksi 1 (çıktı: 13579)\n\nprint(\"Çift sayılar:\", cift_sayilar)\nprint(\"Tek sayılar:\", tek_sayilar)\n\n# String kelime gruplarını bölme\n# Split parantezinin içine ne yazarsanız bölünen kelimeler arasına onu eklemektedir.\ncumle = \"Bu, Python programlama diline giriş için örnek bir cümledir.\"\nkelimeler = cumle.split()\n\nprint(\"Kelimeler:\", kelimeler)\n"
      }
    ],
    "mergedCode": "\n# ========================================\n# # HAFTA 1 DERS 2\n# ========================================\n\n\n\n# ========================================\n# **PRINT FONKSİYONU**\n# \n# ========================================\n\n\nprint(\"hello world!\") #ekrana hello world! yazar\n\n\n_isim = \"John Doe\" #degisken adında bir değişken oluşturup kelime değişkeni atanır\nprint(_isim) #degisken değişkeni ekrana yazdırılır\nprint(\"isim\") #ekrana degisken kelimesini yazar\n\nyil=2004\nprint('Benim doğum yılım ', yil) #hem aynı hem farklı türler , ile yan yana yazdırılabilir\n\n\n# ========================================\n# **Kaçış Dizileri**\n# ========================================\n\n\nprint(\"hello \\nworld!\") #kendinden sonra geleni yeni satıra geçerek yazar\n\nprint(\"hello \\t world!\") #kendinden sonra geleni bir tab boşluklu yazar\nprint(\"hello \\f world!\") #kendinden sonra geleni 2 boşluklu yazar\n\n\nprint(\"hello \\r world!\") #kendinden önce geleni siler\n\nprint(\"hello \\\\ world!\") # \\ parametresini yazdırır\nprint('hello \\' world!') # ' parametresini yazdırır\nprint(\"hello \\\" world!\") # \" parametresini yazdırır. \\ olmadan yazılmaya çalışılırsa hata verir\n\n#kendinden önce gelen 1 karakteri siler. boşluk varsa sadece boşluk siler.\nprint(\"Sil\\b o\")\n\nprint(\"Alt\\n satır\")\nprint(\"Alt\\n \\bsatır\") #alt satıra geçildiğinde oluşan satır başı boşluğunu siler\n\n#kelime2'yi tırnak içinde yazar\nprint(\"kelime1 \\\"kelime2\\\" kelime3\")\n\n#kelime1 kelime2 kelime3 arasında boşluk olmadan yazar\nprint(\"kelime1\" \"kelime2\" \"kelime3\")\n\n#kelime1 kelime2 kelime3 arasında birer boşluk bırakır\nprint(\"kelime1\", \"kelime2\", \"kelime3\")\n\n#kelime1 kelime2 kelime3 arasına yıldız karakteri ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"*\")\n\n#kelime1 kelime2 kelime3 herbirini yeni satırda yazar\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\n\")\n\n#kelime1 kelime2 kelime3 arasına boşluk ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\t\")\n\n#sonuncu kelimeyi yazdırır\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\r\")\n\n#her birinin arasına bir adet \\ karakteri ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\\\\")\n\n#her birinin arasına bir adet ' karakteri ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\'\")\n\n#her birinin arasına bir adet \"\" karakteri ekler\nprint(\"kelime1\", \"kelime2\", \"kelime3\", sep=\"\\\"\")\n\n\n\n# ========================================\n# # HAFTA 1 DERS 3\n# ========================================\n\n\n# Sayıların tanımlanması\nsayi1 = 10\nsayi2 = 5\n\n# Toplama işlemi\ntoplam = sayi1 + sayi2\nprint(toplam)\n# Çıkarma işlemi\nfark = sayi1 - sayi2\n\n# Çarpma işlemi\ncarpim = sayi1 * sayi2\n\n# Bölme işlemi\nbolum = sayi1 / sayi2 #2\n\n# Mod (kalan) işlemi\nmod = sayi1 % sayi2 #0\n\n# Karesini alma\nkare_sayi1 = sayi1 ** 2\n\n# Sonuçların ekrana yazdırılması\nprint(\"Toplam:\", toplam)\nprint(\"Fark:\", fark)\nprint(\"Çarpım:\", carpim)\nprint(\"Bölüm:\", bolum)\nprint(\"Mod (kalan):\", mod)\nprint(sayi1, \"sayısının karesi:\", kare_sayi1)\n\n\nilk_kelime= 'selam'\nikinci_kelime= 'nasılsın?'\nprint(5 + 10) #15\nprint( ilk_kelime + ' '+ ikinci_kelime)\n\nsayi=10\n\nprint(sayi) #10\n\nprint('sayi')\n\nprint('sayının değeri: ', sayi)\nprint('sayının 2 katı: ', 2*sayi)\nprint(2*sayi)\nprint(sayi+2)\nprint(2*'sayi')\nprint(2*'sayi ')\n\n\n\n# ========================================\n# **LOWER, UPPER VE LEN FONKSİYONU**\n# ========================================\n\n\nstring = \"ibbteknoloji  \"\nprint(len(string))\n\n\nfilm = 'OPPENHEIMER'\nprint(\"Başlangıçta\",film) #OPPENHEIMER\nfilm = film.lower() #film değişkeni içeriği küçük harfe çevrilir\nprint(\"En son hali\", film)\n\nfilm2= \"barbie\"\nfilm2=film2.upper()\nprint(film2)\n\n\n# ========================================\n# **INTEGER, FLOAT VE TYPE KAVRAMLARI**\n# ========================================\n\n\n#integer: kısaltması int, tamsayı (2, 157, 3476, -2, 56, -394)\nx=46\n#type methodu\nprint(type(x))\n\n#float: ondalık sayılar (2.0, 34.0, -76.3, 15.6 )\n\nsicaklik= 38.2\nprint(sicaklik)\nprint(type(sicaklik))\n\nsicaklik= 38\nprint(sicaklik)\nprint(type(sicaklik))\n\n\n# ========================================\n# **BOOLEAN VERİ TİPİ**\n# ========================================\n\n\nsaglam=True\nbozuk=False\nprint(type(saglam))\nprint(type(bozuk))\n\n\n\nprint(10 > 9) #true\nprint(10 == 9) # false\nprint(10 < 9) #false\n\n\n# ========================================\n# **LİSTE VERİ TİPİ**\n# \n# Liste, birden fazla değeri tek bir değişkende saklamak için kullanılan bir veri tipidir.\n# \n# Listeler köşeli parantez [] içinde oluşturulur ve elemanlar virgül ile ayrılır.\n# \n# Listeler hem aynı türde hem de farklı türde veri içerebilir.\n# ========================================\n\n\n# Boş bir liste oluşturma\nogrenci_isimleri = []\nprint(ogrenci_isimleri)\n\n# Öğrenci isimlerini listeye ekleme\nogrenci_isimleri.append(\"Ahmet\")\nprint(ogrenci_isimleri)\nogrenci_isimleri.append(\"Ayşe\")\nprint(ogrenci_isimleri)\nogrenci_isimleri.append(\"Mehmet\")\n\n# Listeyi ekrana yazdırma\nprint(\"Öğrenci İsimleri:\", ogrenci_isimleri)\n\n\n# ========================================\n# **SORU 1**\n# \n# Tabanı 5 metre ve yüksekliği 12 metre olan bir üçgenin alanını hesaplayan bir python kodu yazın. Yazdığınız koddaki alan değerini yarıçap olarak tanımlayın ve pi'yi 3.14 alarak bir çember yarıçapı hesaplayın.\n# ========================================\n\n\n# Üçgenin alanını hesaplayalım\ntaban = 5\nyukseklik = 12\nalan = 0.5 * taban * yukseklik\n\n# Sonucu ekrana yazdıralım\nprint(\"Üçgenin alanı:\", alan)\n\n# Çemberin yarıçapı\nyaricap = alan\n\n# Pi sayısı\npi = 3.14\n\n# Çemberin alanını hesapla\nalan = pi * yaricap ** 2\n\n# Sonucu ekrana yazdır\nprint(\"Çemberin alanı:\", alan)\n\n\n# ========================================\n# **SORU 2**\n# \n# Aşağıdaki ürünlerin fiyatlarının küsüratları olmadan hesaplanması isteniyor. Ürünlerin tutarını (150.20->150.0) yuvarladıktan sonra ürün1'e yüzde 20 indirim\n# ürün2'ye yüzde 50 indirim yaparak tüm üç ürünü alan müşterinin ödemesi gereken\n# tutarı küsürat olmadan yazdırınız.\n# \n# ürün1= 53.26 TL\n# \n# ürün2= 78.965 TL\n# \n# ürün3= 102.65 TL\n# \n# \n# ========================================\n\n\nurun1 =int(53.26)\nurun2=int(78.975)\nurun3=int(102.65)\n\nurun1=urun1- (urun1*0.2)\nurun2=urun2- (urun2*0.5)\n\ntoplam=urun1+urun2+urun3\n\nprint('toplam ücret: ', int(toplam))\n\n\n# ========================================\n# # HAFTA 1 DERS 4\n# \n# ========================================\n\n\n\n# ========================================\n# **STRING'E DETAYLI BAKIŞ**\n# ========================================\n\n\n#string: çift tırnak içindedir. (\"İSİM\", \"soyad\", \"1256\", \"3.gyt56_\")\nisim=\"Ahmet\"\nyas=\"16\"\nprint(isim + ' '+ yas)\nprint(isim , yas)\nprint(type(yas)) # string\n\n\n# ========================================\n# **STRING INDEXLEME VE BÖLME**\n# ========================================\n\n\n# bir string tanımla\ntext = \"Hello, World!\"\n# tanımladığın stringi yazdır\nprint(\"Orijinal string:\", text)\n\n# Pozitif indexlemeyle harflere erişim\ntext = \"Hello, World!\"\nilk_harf = text[0]\nikinci_harf = text[1]\nson_harf = text[-1]  # negatif indexlemeyle sondan itibaren erişim\n\nprint(\"ilk harf:\", ilk_harf)\nprint(\"ikinci harf:\", ikinci_harf)\nprint(\"son karakter:\", son_harf)\n\n\n# ========================================\n# **SORU 3**\n# \n# Alfabedeki harfleri bir string'e tanımladıktan sonra isminizin harflerini yukarıdan aşağı yazdırın.\n# ========================================\n\n\n# İngiliz alfabesindeki bütün harfleri içeren bir string oluşturalım\nalfabe = \"abcdefghijklmnopqrstuvwxyz\"\n\n# Herhangi bir ismi yukarıdan aşağıya tek tek yazdıralım\nprint(alfabe[0])\nprint(alfabe[1])\nprint(alfabe[2])\nprint(alfabe[3])\n# ... devam eder\n\n# Gerekli harfleri yazdırdıktan sonra program sonlanır\n\n# stringi parçalayarak yazdırma\ntext = \"Hello, World!\"\nsubstring1 = text[0:5]  # 0'dan 4'üncü indexe kadarki harfler (5-1)\nsubstring2 = text[7:]   # 7'den en sona kadarki harfler\nsubstring3 = text[:5]   # baştan 4'üncü indexe kadarki harfler\nsubstring4 = text[7:-1] # 7'den sondan ikinci harfe kadarki kısım\nprint(\"Substring 1:\", substring1)\nprint(\"Substring 2:\", substring2)\nprint(\"Substring 3:\", substring3)\nprint(\"Substring 4:\", substring4)\n\n\n# Negatif indexlemeyle stringi parçalama\ntext = \"Hello, World!\"\nsubstring5 = text[-6:-1] # -6'dan -2'ye\nsubstring6 = text[:-8]   # -9'dan başa\n\nprint(\"Substring 5:\", substring5)\nprint(\"Substring 6:\", substring6)\n\n\n#@title Step Kullanımı (zıplama)\n# İkinci iki noktanın sağındaki atlama sıklığını belirler\nsayilar = \"0123456789\"\n\ncift_sayilar = sayilar[0::4]  # Her 2 karakterde bir (çıktı: 02468)\ntek_sayilar = sayilar[1::3]  # Her 2 karakterde bir, başlangıç indeksi 1 (çıktı: 13579)\n\nprint(cift_sayilar, tek_sayilar)\n\n\n# String kelime gruplarını bölme\n# Split parantezinin içine ne yazarsanız bölünen kelimeler arasına onu ekler\ncumle = \"Bu bir örnek cümle.\"\nkelimeler = cumle.split()\n\nprint(kelimeler)\nprint(kelimeler[0][0])\n\n\n# ========================================\n# **SORU 4**\n# \n# Verilen işlemleri sırasıyla yapın.\n# \n# Substring 1: Cümlenin ilk 5 karakterini yazdırın.\n# \n# Substring 2: Cümlenin 7. karakterinden sonrasını yazdırın.\n# \n# Substring 3: Cümlenin baştan 5. karaktere kadar olan kısmını yazdırın.\n# \n# Substring 4: Cümlenin 7. karakterinden sondan ikinci karaktere kadar olan kısmını yazdırın.\n# \n# Substring 5: Negatif indeksleme kullanarak, sondan 6. karakterden sondan 2. karaktere kadar olan kısmı yazdırın.\n# \n# Substring 6: Negatif indeksleme kullanarak, sondan 8. karakterden başa kadar olan kısmı yazdırın.\n# \n# Çift Sayılar: 0123456789 dizisinden her iki karakterde bir olan karakterleri yazdırın.\n# \n# Tek Sayılar: 0123456789 dizisinden, başlangıç indeksi 1 olan ve her iki karakterde bir olan karakterleri yazdırın.\n# \n# Kelime Bölme: Cümleyi kelimelere bölerek her kelimeyi ayrı ayrı yazdırın.\n# \n# ========================================\n\n\n# Metin\ntext = \"Python programlama dilini öğrenmek çok eğlenceli.\"\n\n# Stringi parçalayarak yazdırma\nsubstring1 = text[0:5]  # 0'dan 4'üncü indexe kadarki harfler (5-1)\nsubstring2 = text[7:]   # 7'den en sona kadarki harfler\nsubstring3 = text[:5]   # baştan 4'üncü indexe kadarki harfler\nsubstring4 = text[7:-1] # 7'den sondan ikinci harfe kadarki kısım\n\nprint(\"Substring 1:\", substring1)\nprint(\"Substring 2:\", substring2)\nprint(\"Substring 3:\", substring3)\nprint(\"Substring 4:\", substring4)\n\n# Negatif indexlemeyle stringi parçalama\nsubstring5 = text[-6:-1] # -6'dan -2'ye\nsubstring6 = text[:-8]   # -8'den başa\n\nprint(\"Substring 5:\", substring5)\nprint(\"Substring 6:\", substring6)\n\n# String indexlemede \"step\" yani zıplama\n# İkinci iki noktanın sağındaki atlama sıklığını belirler\nsayilar = \"0123456789\"\n\ncift_sayilar = sayilar[::2]  # Her 2 karakterde bir (çıktı: 02468)\ntek_sayilar = sayilar[1::2]  # Her 2 karakterde bir, başlangıç indeksi 1 (çıktı: 13579)\n\nprint(\"Çift sayılar:\", cift_sayilar)\nprint(\"Tek sayılar:\", tek_sayilar)\n\n# String kelime gruplarını bölme\n# Split parantezinin içine ne yazarsanız bölünen kelimeler arasına onu eklemektedir.\ncumle = \"Bu, Python programlama diline giriş için örnek bir cümledir.\"\nkelimeler = cumle.split()\n\nprint(\"Kelimeler:\", kelimeler)\n"
  },
  "hafta-2": {
    "id": "hafta-2",
    "week": 2,
    "title": "Python Hafta 2",
    "url": "https://colab.research.google.com/drive/15jKKoKkROyWE0U_kRIQpxj7PqTEZgV8w?usp=sharing",
    "cells": [
      {
        "type": "markdown",
        "content": "# HAFTA 2 DERS 1"
      },
      {
        "type": "markdown",
        "content": "**INPUT ALMAK**\n\nPython'da `input()` fonksiyonu, kullanıcıdan metin veya değer almak için kullanılır. Bu fonksiyon çalıştırıldığında, kullanıcıdan bir girdi bekler ve kullanıcının girdiği metni veya değeri bir string olarak döndürür. Kullanıcıdan alınan girdi, genellikle bir değişkene atanır ve daha sonra programın geri kalanında kullanılır.\n\nİşte `input()` fonksiyonunun temel kullanımı:\n\n```python\n# Kullanıcıdan bir isim almak\nisim = input(\"Adınızı girin: \")\nprint(\"Merhaba,\", isim)\n\n# Kullanıcıdan bir sayı almak (sayı girişi bekleniyor)\nyas = int(input(\"Yaşınızı girin: \"))\nprint(\"Doğum yılınız:\", 2023 - yas)\n```\n\nBu örnekte, `input()` fonksiyonu ile kullanıcıdan isim ve yaş gibi veriler alıyoruz. `input()` fonksiyonu, kullanıcıdan aldığı girdiyi her zaman bir string olarak döndürür, bu nedenle sayı girişi yaparken `int()` veya `float()` gibi dönüşümler yaparak girdiyi sayıya çeviriyoruz."
      },
      {
        "type": "code",
        "content": "# Basit bir egzersiz ile input mantığını gösterelim\nisim=input('Adın ne?')\nprint('Merhaba ' + isim)\n\nyas=input('Kaç yaşındasın?')\nprint(yas + ' yaşındasın')"
      },
      {
        "type": "markdown",
        "content": "Bu örnekte, input() fonksiyonu ile kullanıcıdan 1. ve 2. sayı gibi veriler alıyoruz. input() fonksiyonu, kullanıcıdan aldığı girdiyi her zaman bir string olarak döndürür, bu nedenle sayı girişi yaparken int() veya float() gibi dönüşümler yaparak girdiyi sayıya çeviriyoruz."
      },
      {
        "type": "code",
        "content": "# Kullanıcıdan iki sayı alarak aritmetik öperatör egzersizleri yapalım\n\nx=int(input('ilk sayıyı giriniz: '))\ny=float(input('ikinci sayıyı giriniz: '))\n\n"
      },
      {
        "type": "code",
        "content": "# 4 işlemin kullanımı:\n\ntoplama=x+y\nprint(toplama)\nprint('toplama '+str(toplama))\n\nçıkarma=x-y\nprint('çıkarma '+ str(çıkarma))\n\nbölme=x/y\nprint('bölme '+str(bölme))\n\nçarpma=x*y\nprint('çarpma '+str(çarpma))\n\n"
      },
      {
        "type": "code",
        "content": "# Mod alma ve ileri aritmetik operatörlerin kullanımı:\n\nmod=x%y\nprint('mod '+str(mod))\n\nislem=2*x-y\nprint('islem sonucu '+ str(islem))\n\nparantezli_islem=2*(x-y)\nprint('parantezli islem sonucu '+ str(parantezli_islem))\n\nx=x+1\nprint('x değişkeninin 1 fazlası:'+ str(x))\n\nx=x*2\nprint('x değişkeninin 2 katı: ' + str(x))"
      },
      {
        "type": "markdown",
        "content": "**SORU 1**\n\nGelir-gider hesaplayıcı yapmak için kullanıcıdan çeşitli gider kalemlerini (örneğin, yemek, ulaşım, eğlence) alarak toplam harcamayı hesaplayın."
      },
      {
        "type": "code",
        "content": "# Kullanıcıdan gider kalemlerini alma\nbutce = float(input(\"Bütçenizi girin: \"))\nyemek = float(input(\"Yemek giderinizi girin: \"))\nulasim = float(input(\"Ulaşım giderinizi girin: \"))\neglence = float(input(\"Eğlence giderinizi girin: \"))\n\n# Toplam gideri hesaplama\ntoplam_gider = yemek + ulasim + eglence\n\n# Bütçeyi hesaplama\nkalan_butce = butce - toplam_gider\n\n# Sonuçları ekrana yazdırma\nprint(\"Toplam gideriniz:\", toplam_gider)\nprint(\"Kalan bütçeniz:\", kalan_butce)\n"
      },
      {
        "type": "markdown",
        "content": "# Hafta 2 Ders 2"
      },
      {
        "type": "markdown",
        "content": "**KARŞILAŞTIRMA OPERATÖRLERİ**"
      },
      {
        "type": "markdown",
        "content": "Öğrencilere anlatırken kullanabileceğiniz, karşılaştırma operatörlerinin görevlerini madde madde açıklayan bir liste:\n\n1. `<` (Küçüktür): Sol tarafındaki değerin, sağ tarafındaki değerden küçük olup olmadığını kontrol eder.\n2. `>` (Büyüktür): Sol tarafındaki değerin, sağ tarafındaki değerden büyük olup olmadığını kontrol eder.\n3. `<=` (Küçük Eşit): Sol tarafındaki değirin, sağ tarafındaki değere küçük veya eşit olup olmadığını kontrol eder.\n4. `>=` (Büyük Eşit): Sol tarafındaki değirin, sağ tarafındaki değere büyük veya eşit olup olmadığını kontrol eder.\n5. `==` (Eşit): Sol tarafındaki değirin, sağ tarafındaki değere eşit olup olmadığını kontrol eder.\n6. `!=` (Eşit Değil): Sol tarafındaki değirin, sağ tarafındaki değere eşit olmadığını kontrol eder.\n7. **and** operatörü, iki veya daha fazla koşulun hepsinin doğru olması\ndurumunda True döner. Eğer herhangi bir koşul False ise sonuç False olur.\n8. **or** operatörü, iki veya daha fazla koşuldan en az birinin doğru olması durumunda True döner. Eğer tüm koşullar False ise sonuç False olur.\n\nBu operatörler, iki değerin ilişkisini değerlendirir ve sonuç olarak `True` (doğru) veya `False` (yanlış) değerini döndürür. Özellikle koşullu ifadelerde, döngülerde ve karşılaştırma işlemlerinde kullanılırlar."
      },
      {
        "type": "code",
        "content": "# Değişkenler\na = 10\nb = 5\nc = 10\n\n# Karşılaştırma operatörleri\nprint(\"a =\", a)\nprint(\"b =\", b)\nprint(\"c =\", c)\nprint() #boş satır bırakır\n\n# == (eşit mi?)\nprint(\"a == b:\", a == b)  # False\nprint(\"a == c:\", a == c)  # True\nprint()\n\n# != (eşit değil mi?)\nprint(\"a != b:\", a != b)  # True\nprint(\"a != c:\", a != c)  # False\nprint()\n\n# > (büyük mü?)\nprint(\"a > b:\", a > b)    # True\nprint(\"b > c:\", b > c)    # False\nprint()\n\n# < (küçük mü?)\nprint(\"a < b:\", a < b)    # False\nprint(\"b < c:\", b < c)    # True\nprint()\n\n# >= (büyük veya eşit mi?)\nprint(\"a >= b:\", a >= b)  # True\nprint(\"b >= c:\", b >= c)  # False\nprint()\n\n# <= (küçük veya eşit mi?)\nprint(\"a <= b:\", a <= b)  # False\nprint(\"b <= c:\", b <= c)  # True\nprint()\n\n# and (ve) operatörü\nprint(\"a == b and a == c:\", a == b and a == c)  # False\nprint(\"a != b and a == c:\", a != b and a == c)  # True\nprint()\n\n# or (veya) operatörü\nprint(\"a == b or a == c:\", a == b or a == c)    # True\nprint(\"a == b or a != c:\", a == b or a != c)    # False\n"
      },
      {
        "type": "markdown",
        "content": "**IF, ELIF VE ELSE**\n\nPython'da `if`, `elif` ve `else` ifadeleri, koşullu durumları kontrol etmek ve program akışını yönlendirmek için kullanılan yapılar olarak kullanılır. Bu ifadeler, belirli koşulların doğruluk durumuna göre farklı kod bloklarının çalıştırılmasını sağlar.\n\n- **if:** Bir koşulun doğru olduğu durumda belirli bir kod bloğunu çalıştırmak için kullanılır.\n\n- **elif (else if):** Birden fazla koşulu sırayla kontrol etmek için kullanılır. İlk `if` koşulu sağlanmazsa, ardışık `elif` koşulları kontrol edilir ve ilk sağlanan koşulun olduğu blok çalıştırılır.\n\n- **else:** Yukarıdaki tüm koşullar sağlanmazsa, `else` bloğu çalışır. Herhangi bir `if` veya `elif` bloğu sağlanırsa, `else` bloğu çalıştırılmaz.\n\nAşağıda `if`, `elif` ve `else` ifadelerini içeren bir örnek verilmiştir:\n\n```python\nyas = int(input(\"Yaşınızı girin: \"))\n\nif yas < 18:\n    print(\"Henüz reşit değilsiniz.\")\nelif yas >= 18 and yas < 65:\n    print(\"İş hayatında aktif bir yaşta gibisiniz.\")\nelse:\n    print(\"Emekli yaşındasınız ve dinlenmeyi hak ediyorsunuz!\")\n```\n\nBu örnekte, kullanıcının yaşına göre farklı mesajlar gönderiliyor. İlk `if` koşulu sağlanıyorsa sadece o blok çalışır, aksi takdirde sırayla `elif` koşulları kontrol edilir. Eğer hiçbir koşul sağlanmazsa `else` bloğu çalışır."
      },
      {
        "type": "code",
        "content": "# Kullanıcıdan bir sayı alın\nsayi = int(input(\"Yaşınızı girin: \"))\n\n# Koşullu if-elif-else yapısı\nif sayi == 18:\n    print(\"İyi ki doğdunuz!\")\nelif sayi < 18:\n    print(\"İçeri giremezsiniz.\")\nelse:\n    print(\"Hoşgeldiniz.\")\n"
      },
      {
        "type": "code",
        "content": "# Kullanıcıdan iki değer alalım\ngidilen_yol=int(input('gidilen yol: '))\nkalan_yol=int(input('kalan yol: '))\n\nif gidilen_yol > kalan_yol:\n  print('yolun yarısını geçtin')\nelif gidilen_yol < kalan_yol:\n  print('yolun yarısına gelemedin')\nelse:\n  print('yolun tam yarısındasın')"
      },
      {
        "type": "code",
        "content": "# Verilen üç değeri or yapısı ile birleştirme\na=5\nb=7\nc=10\nif a<b or b<c or c< a:\n  print('koşullardan biri doğru')\nif a<b and b<c and a<c:\n  print('tüm koşullar doğru')"
      },
      {
        "type": "code",
        "content": "#ikisinin farkı\n\na=5\nb=7\nc=10\nif a<b or b<c or c< a:\n  print('koşullardan biri doğru')\nelif a<b and b<c and a<c:\n  print('tüm koşullar doğru')"
      },
      {
        "type": "markdown",
        "content": "# HAFTA 2 DERS 3"
      },
      {
        "type": "markdown",
        "content": "**SORU 2**\n\nBu program, kullanıcının girdiği üç sayıyı karşılaştırarak en büyüğünü belirler ve ekrana yazdırır. İlk olarak kullanıcıdan üç sayıyı alır, ardından if kontrolleriyle her bir sayının en büyük sayı olarak atanıp atanmayacağını kontrol eder. Sonuç olarak, en büyük sayıyı ekrana yazdırır."
      },
      {
        "type": "code",
        "content": "sayi1 = float(input(\"Birinci sayıyı girin: \"))\nsayi2 = float(input(\"İkinci sayıyı girin: \"))\nsayi3 = float(input(\"Üçüncü sayıyı girin: \"))\n\nen_buyuk = sayi1\n\nif sayi2 > en_buyuk:\n    en_buyuk = sayi2\n\nif sayi3 > en_buyuk:\n    en_buyuk = sayi3\n\nprint(f\"En büyük sayı: {en_buyuk}\")"
      },
      {
        "type": "code",
        "content": "# SORU 2 ALTERNATİF\nnum1 = int(input(\"İlk sayıyı giriniz \"))\nnum2 = int(input(\"İkinci sayıyı giriniz \"))\nnum3 = int(input(\"Üçüncü sayıyı giriniz \"))\nif num1 > num2 and num1 > num3:\n      print(\"En büyük sayı \", num1)\nif num2 > num1 and num2 > num3:\n      print(\"En büyük sayı \", num2)\nif num3 > num2 and num3 > num1:\n     print(\"En büyük sayı \", num3)"
      },
      {
        "type": "markdown",
        "content": "**SORU 3**\n\nBu program, kullanıcının girdiği birim sayısına göre elektrik faturasını hesaplar. İlk olarak kullanıcıdan birim sayısını alır. Ardından if-elif-else yapısıyla fatura ücretini belirler:\n\n* İlk 100 birim ücretsizdir, bu durumu kontrol eder.\n\n* Eğer 100 birimden fazla ve 200 birim veya daha az kullanılmışsa, 100 birim sonrası birim başına 5 TL ödenir.\n\n* Eğer 200 birimden fazla kullanılmışsa, ilk 100 birim ücretsiz, sonraki 100 birim 5 birim başına ve 200 birimden sonraki her bir birim 10 birim başına ücret ödenir.\n\n* Son olarak, hesaplanan toplam ücreti ekrana yazdırır."
      },
      {
        "type": "code",
        "content": "birim = int(input(\"Kullanılan birim sayısını girin: \"))\ntoplam_ucret = 0\n\nif birim <= 100:\n    toplam_ucret = 0\nelif birim <= 200 and birim > 100:\n    toplam_ucret = (birim - 100) * 5\nelse:\n    toplam_ucret = (100 * 5) + (birim - 200) * 10\n\nprint(f\"Toplam fatura tutarı: {toplam_ucret} TL\")\n"
      },
      {
        "type": "code",
        "content": "# SORU 3 ALTERNATİF\nunit=int(input('Elektrik ünitesinin giriş birimi miktarını giriniz.'))\nif unit<=100:\n     amount=0\nif unit>100 and unit<=200:\n     amount=(unit-100)*5\nif unit>200:\n     amount=500+(unit-200)*10\nprint(\"Ödenecek tutar:\",amount)"
      },
      {
        "type": "markdown",
        "content": "# HAFTA 2 DERS 4"
      },
      {
        "type": "markdown",
        "content": "**SORU 4**\n\n Kullanıcıdan not ortalamasını alarak, bu ortalamaya göre bir harf notu belirleyen bir program yazın. Program, not ortalamasına göre farklı mesajlar vermeli. Ayrıca, koşullu if-elif-else yapısını ve and operatörünü kullanarak iki farklı versiyon oluşturun.\n\nNot Aralıkları:\n\n90 ve üstü: AA\n\n80 - 89: BA\n\n70 - 79: BB\n\n60 - 69: CB\n\n50 - 59: CC\n\n40 - 49: DC\n\n30 - 39: DD\n\n30'un altı: FF"
      },
      {
        "type": "code",
        "content": "# Bir not hesaplama etkinliği\nnot_ortalamasi = float(input(\"Not ortalamanızı girin: \"))\n# Koşullu if-elif-else yapısı\nif not_ortalamasi >= 90:\n    print(\"Harika! Notunuz AA.\")\nelif not_ortalamasi >= 80:\n    print(\"Tebrikler! Notunuz BA.\")\nelif not_ortalamasi >= 70 :\n    print(\"İyi iş! Notunuz BB.\")\nelif not_ortalamasi >= 60 :\n    print(\"Fena değil! Notunuz CB.\")\nelif not_ortalamasi >= 50 :\n    print(\"Ortalama! Notunuz CC.\")\nelif not_ortalamasi >= 40 :\n    print(\"Daha çok çaba gerekebilir. Notunuz DC.\")\nelif not_ortalamasi >= 30:\n    print(\"Dersi geçtiniz ancak zorlanabilirsiniz. Notunuz DD.\")\nelse:\n    print(\"Üzgünüm, dersten başarısız oldunuz. Notunuz FF.\")\n    print(\"Lütfen dersi tekrar almayı düşünün.\")\n\n# and operatörünü de pratik yaptığımız hali\nif not_ortalamasi >= 90:\n    print(\"Harika! Notunuz AA.\")\nelif not_ortalamasi >= 80 and not_ortalamasi < 90:\n    print(\"Tebrikler! Notunuz BA.\")\nelif not_ortalamasi >= 70 and not_ortalamasi < 80:\n    print(\"İyi iş! Notunuz BB.\")\nelif not_ortalamasi >= 60 and not_ortalamasi < 70:\n    print(\"Fena değil! Notunuz CB.\")\nelif not_ortalamasi >= 50 and not_ortalamasi < 60:\n    print(\"Ortalama! Notunuz CC.\")\nelif not_ortalamasi >= 40 and not_ortalamasi < 50:\n    print(\"Daha çok çaba gerekebilir. Notunuz DC.\")\nelif not_ortalamasi >= 30:\n    print(\"Dersi geçtiniz ancak zorlanabilirsiniz. Notunuz DD.\")\nelse:\n    print(\"Üzgünüm, dersten başarısız oldunuz. Notunuz FF.\")\n    print(\"Lütfen dersi tekrar almayı düşünün.\")\n"
      },
      {
        "type": "markdown",
        "content": "**SORU 5**\n\nKullanıcıdan bir bankacılık işlemi seçmesini isteyen ve buna göre işlemler yapan bir program yazın. Kullanıcıya üç seçenek sunulacak: bakiye sorgulama, para yatırma ve para çekme. Her işlem sonucunda kullanıcının bakiyesi güncellenip ekrana yazdırılacak. Aşağıdaki adımları takip ederek programı yazın:\n\n"
      },
      {
        "type": "code",
        "content": "bakiye = 1000\n\nprint(\"Banka Hesap İşlemleri:\")\nprint(\"1. Bakiye Sorgulama\")\nprint(\"2. Para Yatırma\")\nprint(\"3. Para Çekme\")\n\nislem = int(input(\"Yapmak istediğiniz işlemi seçin (1, 2, 3): \"))\n\nif islem == 1:\n    print(f\"Mevcut bakiyeniz: {bakiye} TL\")\nelif islem == 2:\n    miktar = float(input(\"Yatırmak istediğiniz miktarı girin: \"))\n    if miktar > 0:\n        bakiye += miktar\n        print(f\"Yeni bakiyeniz: {bakiye} TL\")\n    else:\n        print(\"Geçersiz miktar.\")\nelif islem == 3:\n    miktar = float(input(\"Çekmek istediğiniz miktarı girin: \"))\n    if 0 < miktar <= bakiye:\n        bakiye -= miktar\n        print(f\"Kalan bakiyeniz: {bakiye} TL\")\n    else:\n        print(\"Yetersiz bakiye veya geçersiz miktar.\")\nelse:\n    print(\"Geçersiz işlem.\")\n"
      },
      {
        "type": "markdown",
        "content": "**SORU 6 (Extra sonraki haftalara kaydırılabilir)**\n\n**Hızlı giden sınıflar için bir maaş hesaplama etkinliği**\n\nBir şirket çalışanlarına mevcut maaaşlarının aralığına karşılık gelen değerler oranında zam yapacak. Örneğin;\n\n* Maaş 11.500 ile 15.000 arasında ise %15\n* Maaş 15.000 ile 20.000 arasında ise %20\n* Maaş 20.000 ile 25.000 arasında ise %25 zam yapılacaktır.\n\n*Not: bir çalışanın alabileceği minimum mmaş asgari ücrettir(11.500) Ve şirket bu sene 25.000'den fazla para alan çalışanlarına zam yapmayacaktır. Kullanıcı bu bilgilere göre yanlış değer girerse onu uyarın*"
      },
      {
        "type": "code",
        "content": "asgari_ucret = 11500\nust_sinir = 25000\n\n# Kullanıcıdan maaş girişi alın\nmaas = float(input(\"Mevcut maaşınızı girin: \"))\n\n# Hatalı girişleri kontrol etmek\nif maas < asgari_ucret or maas > ust_sinir:\n    print(\"Geçersiz maaş değeri. Lütfen asgari ücret ile 25.000 arasında bir değer girin.\")\nelse:\n    zam_orani = 0\n\n    if maas >= 11500 and maas < 15000:\n        zam_orani = 0.15\n    elif maas >= 15000 and maas < 20000:\n        zam_orani = 0.20\n    elif maas >= 20000 and maas <= 25000:\n        zam_orani = 0.25\n\n    if zam_orani > 0:\n        zam_miktari = maas * zam_orani\n        yeni_maas = maas + zam_miktari\n        print(\"Yapılacak zam miktarı:\", zam_miktari)\n        print(\"Yeni maaşınız:\", yeni_maas)\n    else:\n        print(\"Zam yapılmayacaktır.\")\n"
      }
    ],
    "mergedCode": "\n# ========================================\n# # HAFTA 2 DERS 1\n# ========================================\n\n\n\n# ========================================\n# **INPUT ALMAK**\n# \n# Python'da `input()` fonksiyonu, kullanıcıdan metin veya değer almak için kullanılır. Bu fonksiyon çalıştırıldığında, kullanıcıdan bir girdi bekler ve kullanıcının girdiği metni veya değeri bir string olarak döndürür. Kullanıcıdan alınan girdi, genellikle bir değişkene atanır ve daha sonra programın geri kalanında kullanılır.\n# \n# İşte `input()` fonksiyonunun temel kullanımı:\n# \n# ```python\n# # Kullanıcıdan bir isim almak\n# isim = input(\"Adınızı girin: \")\n# print(\"Merhaba,\", isim)\n# \n# # Kullanıcıdan bir sayı almak (sayı girişi bekleniyor)\n# yas = int(input(\"Yaşınızı girin: \"))\n# print(\"Doğum yılınız:\", 2023 - yas)\n# ```\n# \n# Bu örnekte, `input()` fonksiyonu ile kullanıcıdan isim ve yaş gibi veriler alıyoruz. `input()` fonksiyonu, kullanıcıdan aldığı girdiyi her zaman bir string olarak döndürür, bu nedenle sayı girişi yaparken `int()` veya `float()` gibi dönüşümler yaparak girdiyi sayıya çeviriyoruz.\n# ========================================\n\n\n# Basit bir egzersiz ile input mantığını gösterelim\nisim=input('Adın ne?')\nprint('Merhaba ' + isim)\n\nyas=input('Kaç yaşındasın?')\nprint(yas + ' yaşındasın')\n\n\n# ========================================\n# Bu örnekte, input() fonksiyonu ile kullanıcıdan 1. ve 2. sayı gibi veriler alıyoruz. input() fonksiyonu, kullanıcıdan aldığı girdiyi her zaman bir string olarak döndürür, bu nedenle sayı girişi yaparken int() veya float() gibi dönüşümler yaparak girdiyi sayıya çeviriyoruz.\n# ========================================\n\n\n# Kullanıcıdan iki sayı alarak aritmetik öperatör egzersizleri yapalım\n\nx=int(input('ilk sayıyı giriniz: '))\ny=float(input('ikinci sayıyı giriniz: '))\n\n\n\n# 4 işlemin kullanımı:\n\ntoplama=x+y\nprint(toplama)\nprint('toplama '+str(toplama))\n\nçıkarma=x-y\nprint('çıkarma '+ str(çıkarma))\n\nbölme=x/y\nprint('bölme '+str(bölme))\n\nçarpma=x*y\nprint('çarpma '+str(çarpma))\n\n\n\n# Mod alma ve ileri aritmetik operatörlerin kullanımı:\n\nmod=x%y\nprint('mod '+str(mod))\n\nislem=2*x-y\nprint('islem sonucu '+ str(islem))\n\nparantezli_islem=2*(x-y)\nprint('parantezli islem sonucu '+ str(parantezli_islem))\n\nx=x+1\nprint('x değişkeninin 1 fazlası:'+ str(x))\n\nx=x*2\nprint('x değişkeninin 2 katı: ' + str(x))\n\n\n# ========================================\n# **SORU 1**\n# \n# Gelir-gider hesaplayıcı yapmak için kullanıcıdan çeşitli gider kalemlerini (örneğin, yemek, ulaşım, eğlence) alarak toplam harcamayı hesaplayın.\n# ========================================\n\n\n# Kullanıcıdan gider kalemlerini alma\nbutce = float(input(\"Bütçenizi girin: \"))\nyemek = float(input(\"Yemek giderinizi girin: \"))\nulasim = float(input(\"Ulaşım giderinizi girin: \"))\neglence = float(input(\"Eğlence giderinizi girin: \"))\n\n# Toplam gideri hesaplama\ntoplam_gider = yemek + ulasim + eglence\n\n# Bütçeyi hesaplama\nkalan_butce = butce - toplam_gider\n\n# Sonuçları ekrana yazdırma\nprint(\"Toplam gideriniz:\", toplam_gider)\nprint(\"Kalan bütçeniz:\", kalan_butce)\n\n\n\n# ========================================\n# # Hafta 2 Ders 2\n# ========================================\n\n\n\n# ========================================\n# **KARŞILAŞTIRMA OPERATÖRLERİ**\n# ========================================\n\n\n\n# ========================================\n# Öğrencilere anlatırken kullanabileceğiniz, karşılaştırma operatörlerinin görevlerini madde madde açıklayan bir liste:\n# \n# 1. `<` (Küçüktür): Sol tarafındaki değerin, sağ tarafındaki değerden küçük olup olmadığını kontrol eder.\n# 2. `>` (Büyüktür): Sol tarafındaki değerin, sağ tarafındaki değerden büyük olup olmadığını kontrol eder.\n# 3. `<=` (Küçük Eşit): Sol tarafındaki değirin, sağ tarafındaki değere küçük veya eşit olup olmadığını kontrol eder.\n# 4. `>=` (Büyük Eşit): Sol tarafındaki değirin, sağ tarafındaki değere büyük veya eşit olup olmadığını kontrol eder.\n# 5. `==` (Eşit): Sol tarafındaki değirin, sağ tarafındaki değere eşit olup olmadığını kontrol eder.\n# 6. `!=` (Eşit Değil): Sol tarafındaki değirin, sağ tarafındaki değere eşit olmadığını kontrol eder.\n# 7. **and** operatörü, iki veya daha fazla koşulun hepsinin doğru olması\n# durumunda True döner. Eğer herhangi bir koşul False ise sonuç False olur.\n# 8. **or** operatörü, iki veya daha fazla koşuldan en az birinin doğru olması durumunda True döner. Eğer tüm koşullar False ise sonuç False olur.\n# \n# Bu operatörler, iki değerin ilişkisini değerlendirir ve sonuç olarak `True` (doğru) veya `False` (yanlış) değerini döndürür. Özellikle koşullu ifadelerde, döngülerde ve karşılaştırma işlemlerinde kullanılırlar.\n# ========================================\n\n\n# Değişkenler\na = 10\nb = 5\nc = 10\n\n# Karşılaştırma operatörleri\nprint(\"a =\", a)\nprint(\"b =\", b)\nprint(\"c =\", c)\nprint() #boş satır bırakır\n\n# == (eşit mi?)\nprint(\"a == b:\", a == b)  # False\nprint(\"a == c:\", a == c)  # True\nprint()\n\n# != (eşit değil mi?)\nprint(\"a != b:\", a != b)  # True\nprint(\"a != c:\", a != c)  # False\nprint()\n\n# > (büyük mü?)\nprint(\"a > b:\", a > b)    # True\nprint(\"b > c:\", b > c)    # False\nprint()\n\n# < (küçük mü?)\nprint(\"a < b:\", a < b)    # False\nprint(\"b < c:\", b < c)    # True\nprint()\n\n# >= (büyük veya eşit mi?)\nprint(\"a >= b:\", a >= b)  # True\nprint(\"b >= c:\", b >= c)  # False\nprint()\n\n# <= (küçük veya eşit mi?)\nprint(\"a <= b:\", a <= b)  # False\nprint(\"b <= c:\", b <= c)  # True\nprint()\n\n# and (ve) operatörü\nprint(\"a == b and a == c:\", a == b and a == c)  # False\nprint(\"a != b and a == c:\", a != b and a == c)  # True\nprint()\n\n# or (veya) operatörü\nprint(\"a == b or a == c:\", a == b or a == c)    # True\nprint(\"a == b or a != c:\", a == b or a != c)    # False\n\n\n\n# ========================================\n# **IF, ELIF VE ELSE**\n# \n# Python'da `if`, `elif` ve `else` ifadeleri, koşullu durumları kontrol etmek ve program akışını yönlendirmek için kullanılan yapılar olarak kullanılır. Bu ifadeler, belirli koşulların doğruluk durumuna göre farklı kod bloklarının çalıştırılmasını sağlar.\n# \n# - **if:** Bir koşulun doğru olduğu durumda belirli bir kod bloğunu çalıştırmak için kullanılır.\n# \n# - **elif (else if):** Birden fazla koşulu sırayla kontrol etmek için kullanılır. İlk `if` koşulu sağlanmazsa, ardışık `elif` koşulları kontrol edilir ve ilk sağlanan koşulun olduğu blok çalıştırılır.\n# \n# - **else:** Yukarıdaki tüm koşullar sağlanmazsa, `else` bloğu çalışır. Herhangi bir `if` veya `elif` bloğu sağlanırsa, `else` bloğu çalıştırılmaz.\n# \n# Aşağıda `if`, `elif` ve `else` ifadelerini içeren bir örnek verilmiştir:\n# \n# ```python\n# yas = int(input(\"Yaşınızı girin: \"))\n# \n# if yas < 18:\n#     print(\"Henüz reşit değilsiniz.\")\n# elif yas >= 18 and yas < 65:\n#     print(\"İş hayatında aktif bir yaşta gibisiniz.\")\n# else:\n#     print(\"Emekli yaşındasınız ve dinlenmeyi hak ediyorsunuz!\")\n# ```\n# \n# Bu örnekte, kullanıcının yaşına göre farklı mesajlar gönderiliyor. İlk `if` koşulu sağlanıyorsa sadece o blok çalışır, aksi takdirde sırayla `elif` koşulları kontrol edilir. Eğer hiçbir koşul sağlanmazsa `else` bloğu çalışır.\n# ========================================\n\n\n# Kullanıcıdan bir sayı alın\nsayi = int(input(\"Yaşınızı girin: \"))\n\n# Koşullu if-elif-else yapısı\nif sayi == 18:\n    print(\"İyi ki doğdunuz!\")\nelif sayi < 18:\n    print(\"İçeri giremezsiniz.\")\nelse:\n    print(\"Hoşgeldiniz.\")\n\n\n# Kullanıcıdan iki değer alalım\ngidilen_yol=int(input('gidilen yol: '))\nkalan_yol=int(input('kalan yol: '))\n\nif gidilen_yol > kalan_yol:\n  print('yolun yarısını geçtin')\nelif gidilen_yol < kalan_yol:\n  print('yolun yarısına gelemedin')\nelse:\n  print('yolun tam yarısındasın')\n\n# Verilen üç değeri or yapısı ile birleştirme\na=5\nb=7\nc=10\nif a<b or b<c or c< a:\n  print('koşullardan biri doğru')\nif a<b and b<c and a<c:\n  print('tüm koşullar doğru')\n\n#ikisinin farkı\n\na=5\nb=7\nc=10\nif a<b or b<c or c< a:\n  print('koşullardan biri doğru')\nelif a<b and b<c and a<c:\n  print('tüm koşullar doğru')\n\n\n# ========================================\n# # HAFTA 2 DERS 3\n# ========================================\n\n\n\n# ========================================\n# **SORU 2**\n# \n# Bu program, kullanıcının girdiği üç sayıyı karşılaştırarak en büyüğünü belirler ve ekrana yazdırır. İlk olarak kullanıcıdan üç sayıyı alır, ardından if kontrolleriyle her bir sayının en büyük sayı olarak atanıp atanmayacağını kontrol eder. Sonuç olarak, en büyük sayıyı ekrana yazdırır.\n# ========================================\n\n\nsayi1 = float(input(\"Birinci sayıyı girin: \"))\nsayi2 = float(input(\"İkinci sayıyı girin: \"))\nsayi3 = float(input(\"Üçüncü sayıyı girin: \"))\n\nen_buyuk = sayi1\n\nif sayi2 > en_buyuk:\n    en_buyuk = sayi2\n\nif sayi3 > en_buyuk:\n    en_buyuk = sayi3\n\nprint(f\"En büyük sayı: {en_buyuk}\")\n\n# SORU 2 ALTERNATİF\nnum1 = int(input(\"İlk sayıyı giriniz \"))\nnum2 = int(input(\"İkinci sayıyı giriniz \"))\nnum3 = int(input(\"Üçüncü sayıyı giriniz \"))\nif num1 > num2 and num1 > num3:\n      print(\"En büyük sayı \", num1)\nif num2 > num1 and num2 > num3:\n      print(\"En büyük sayı \", num2)\nif num3 > num2 and num3 > num1:\n     print(\"En büyük sayı \", num3)\n\n\n# ========================================\n# **SORU 3**\n# \n# Bu program, kullanıcının girdiği birim sayısına göre elektrik faturasını hesaplar. İlk olarak kullanıcıdan birim sayısını alır. Ardından if-elif-else yapısıyla fatura ücretini belirler:\n# \n# * İlk 100 birim ücretsizdir, bu durumu kontrol eder.\n# \n# * Eğer 100 birimden fazla ve 200 birim veya daha az kullanılmışsa, 100 birim sonrası birim başına 5 TL ödenir.\n# \n# * Eğer 200 birimden fazla kullanılmışsa, ilk 100 birim ücretsiz, sonraki 100 birim 5 birim başına ve 200 birimden sonraki her bir birim 10 birim başına ücret ödenir.\n# \n# * Son olarak, hesaplanan toplam ücreti ekrana yazdırır.\n# ========================================\n\n\nbirim = int(input(\"Kullanılan birim sayısını girin: \"))\ntoplam_ucret = 0\n\nif birim <= 100:\n    toplam_ucret = 0\nelif birim <= 200 and birim > 100:\n    toplam_ucret = (birim - 100) * 5\nelse:\n    toplam_ucret = (100 * 5) + (birim - 200) * 10\n\nprint(f\"Toplam fatura tutarı: {toplam_ucret} TL\")\n\n\n# SORU 3 ALTERNATİF\nunit=int(input('Elektrik ünitesinin giriş birimi miktarını giriniz.'))\nif unit<=100:\n     amount=0\nif unit>100 and unit<=200:\n     amount=(unit-100)*5\nif unit>200:\n     amount=500+(unit-200)*10\nprint(\"Ödenecek tutar:\",amount)\n\n\n# ========================================\n# # HAFTA 2 DERS 4\n# ========================================\n\n\n\n# ========================================\n# **SORU 4**\n# \n#  Kullanıcıdan not ortalamasını alarak, bu ortalamaya göre bir harf notu belirleyen bir program yazın. Program, not ortalamasına göre farklı mesajlar vermeli. Ayrıca, koşullu if-elif-else yapısını ve and operatörünü kullanarak iki farklı versiyon oluşturun.\n# \n# Not Aralıkları:\n# \n# 90 ve üstü: AA\n# \n# 80 - 89: BA\n# \n# 70 - 79: BB\n# \n# 60 - 69: CB\n# \n# 50 - 59: CC\n# \n# 40 - 49: DC\n# \n# 30 - 39: DD\n# \n# 30'un altı: FF\n# ========================================\n\n\n# Bir not hesaplama etkinliği\nnot_ortalamasi = float(input(\"Not ortalamanızı girin: \"))\n# Koşullu if-elif-else yapısı\nif not_ortalamasi >= 90:\n    print(\"Harika! Notunuz AA.\")\nelif not_ortalamasi >= 80:\n    print(\"Tebrikler! Notunuz BA.\")\nelif not_ortalamasi >= 70 :\n    print(\"İyi iş! Notunuz BB.\")\nelif not_ortalamasi >= 60 :\n    print(\"Fena değil! Notunuz CB.\")\nelif not_ortalamasi >= 50 :\n    print(\"Ortalama! Notunuz CC.\")\nelif not_ortalamasi >= 40 :\n    print(\"Daha çok çaba gerekebilir. Notunuz DC.\")\nelif not_ortalamasi >= 30:\n    print(\"Dersi geçtiniz ancak zorlanabilirsiniz. Notunuz DD.\")\nelse:\n    print(\"Üzgünüm, dersten başarısız oldunuz. Notunuz FF.\")\n    print(\"Lütfen dersi tekrar almayı düşünün.\")\n\n# and operatörünü de pratik yaptığımız hali\nif not_ortalamasi >= 90:\n    print(\"Harika! Notunuz AA.\")\nelif not_ortalamasi >= 80 and not_ortalamasi < 90:\n    print(\"Tebrikler! Notunuz BA.\")\nelif not_ortalamasi >= 70 and not_ortalamasi < 80:\n    print(\"İyi iş! Notunuz BB.\")\nelif not_ortalamasi >= 60 and not_ortalamasi < 70:\n    print(\"Fena değil! Notunuz CB.\")\nelif not_ortalamasi >= 50 and not_ortalamasi < 60:\n    print(\"Ortalama! Notunuz CC.\")\nelif not_ortalamasi >= 40 and not_ortalamasi < 50:\n    print(\"Daha çok çaba gerekebilir. Notunuz DC.\")\nelif not_ortalamasi >= 30:\n    print(\"Dersi geçtiniz ancak zorlanabilirsiniz. Notunuz DD.\")\nelse:\n    print(\"Üzgünüm, dersten başarısız oldunuz. Notunuz FF.\")\n    print(\"Lütfen dersi tekrar almayı düşünün.\")\n\n\n\n# ========================================\n# **SORU 5**\n# \n# Kullanıcıdan bir bankacılık işlemi seçmesini isteyen ve buna göre işlemler yapan bir program yazın. Kullanıcıya üç seçenek sunulacak: bakiye sorgulama, para yatırma ve para çekme. Her işlem sonucunda kullanıcının bakiyesi güncellenip ekrana yazdırılacak. Aşağıdaki adımları takip ederek programı yazın:\n# \n# \n# ========================================\n\n\nbakiye = 1000\n\nprint(\"Banka Hesap İşlemleri:\")\nprint(\"1. Bakiye Sorgulama\")\nprint(\"2. Para Yatırma\")\nprint(\"3. Para Çekme\")\n\nislem = int(input(\"Yapmak istediğiniz işlemi seçin (1, 2, 3): \"))\n\nif islem == 1:\n    print(f\"Mevcut bakiyeniz: {bakiye} TL\")\nelif islem == 2:\n    miktar = float(input(\"Yatırmak istediğiniz miktarı girin: \"))\n    if miktar > 0:\n        bakiye += miktar\n        print(f\"Yeni bakiyeniz: {bakiye} TL\")\n    else:\n        print(\"Geçersiz miktar.\")\nelif islem == 3:\n    miktar = float(input(\"Çekmek istediğiniz miktarı girin: \"))\n    if 0 < miktar <= bakiye:\n        bakiye -= miktar\n        print(f\"Kalan bakiyeniz: {bakiye} TL\")\n    else:\n        print(\"Yetersiz bakiye veya geçersiz miktar.\")\nelse:\n    print(\"Geçersiz işlem.\")\n\n\n\n# ========================================\n# **SORU 6 (Extra sonraki haftalara kaydırılabilir)**\n# \n# **Hızlı giden sınıflar için bir maaş hesaplama etkinliği**\n# \n# Bir şirket çalışanlarına mevcut maaaşlarının aralığına karşılık gelen değerler oranında zam yapacak. Örneğin;\n# \n# * Maaş 11.500 ile 15.000 arasında ise %15\n# * Maaş 15.000 ile 20.000 arasında ise %20\n# * Maaş 20.000 ile 25.000 arasında ise %25 zam yapılacaktır.\n# \n# *Not: bir çalışanın alabileceği minimum mmaş asgari ücrettir(11.500) Ve şirket bu sene 25.000'den fazla para alan çalışanlarına zam yapmayacaktır. Kullanıcı bu bilgilere göre yanlış değer girerse onu uyarın*\n# ========================================\n\n\nasgari_ucret = 11500\nust_sinir = 25000\n\n# Kullanıcıdan maaş girişi alın\nmaas = float(input(\"Mevcut maaşınızı girin: \"))\n\n# Hatalı girişleri kontrol etmek\nif maas < asgari_ucret or maas > ust_sinir:\n    print(\"Geçersiz maaş değeri. Lütfen asgari ücret ile 25.000 arasında bir değer girin.\")\nelse:\n    zam_orani = 0\n\n    if maas >= 11500 and maas < 15000:\n        zam_orani = 0.15\n    elif maas >= 15000 and maas < 20000:\n        zam_orani = 0.20\n    elif maas >= 20000 and maas <= 25000:\n        zam_orani = 0.25\n\n    if zam_orani > 0:\n        zam_miktari = maas * zam_orani\n        yeni_maas = maas + zam_miktari\n        print(\"Yapılacak zam miktarı:\", zam_miktari)\n        print(\"Yeni maaşınız:\", yeni_maas)\n    else:\n        print(\"Zam yapılmayacaktır.\")\n"
  },
  "hafta-3": {
    "id": "hafta-3",
    "week": 3,
    "title": "Python Hafta 3",
    "url": "https://colab.research.google.com/drive/1aDmDLX7Pg-6Go41z2jnYcvvLvJk8tqzh?usp=sharing",
    "cells": [
      {
        "type": "markdown",
        "content": "# HAFTA 3 DERS 1\n\n\n"
      },
      {
        "type": "markdown",
        "content": "**FOR DÖNGÜSÜNE GİRİŞ**\n\nPython'da `for` döngüsü, bir veri koleksiyonu (liste, demet, dize vb.) üzerinde dolaşarak her bir elemanı sırayla işlemek için kullanılan bir döngü türüdür. `for` döngüsü, koleksiyondaki her bir elemanın üzerinde tek tek işlem yapmak için kullanılır. Döngü, koleksiyondaki elemanlar tükenene kadar devam eder.\n\n`for` döngüsünün genel yapısı şu şekildedir:\n\n```python\nfor eleman in koleksiyon:\n    # Her eleman üzerinde çalışacak kod bloğu\n    # Döngü içinde yapılması gereken işlemler burada yer alır\n```\n\nÖrnek olarak, bir liste içindeki elemanları `for` döngüsü kullanarak yazdırmak için aşağıdaki kodu kullanabilirsiniz:\n\n```python\nliste = [1, 2, 3, 4, 5]\nfor eleman in liste:\n    print(eleman)\n```\n\nBu kodda `liste` adlı bir liste içindeki elemanları sırayla `eleman` adlı bir değişkene atayarak her bir elemanı yazdırıyoruz. `for` döngüsü, listenin her bir elemanını dolaşarak her birini ekrana yazdırır."
      },
      {
        "type": "code",
        "content": "# Bir liste oluşturalım\nliste = [10, 20, 30, 40, 50]\n\n# Liste üzerinde for döngüsü kullanarak her bir elemanı yazdıralım\nfor eleman in liste:\n    print(eleman)"
      },
      {
        "type": "code",
        "content": "for i in range(1,7):\n  print(i)"
      },
      {
        "type": "code",
        "content": "# Verilen bir liste\nliste = [5, 10, 15, 20, 25]\n\n# Liste içindeki elemanları toplayan bir for döngüsü\ntoplam = 0\nfor sayi in liste:\n    toplam += sayi\n\nprint(\"Toplam:\", toplam)\n"
      },
      {
        "type": "markdown",
        "content": "**SORU 1**\n\nBir for döngüsü kullanarak bir dizideki çift ve tek sayıları ayrı ayrı listelere ekleyen bir program yazın."
      },
      {
        "type": "code",
        "content": "sayilar = [10, 15, 23, 42, 37, 50, 61]\ncift_sayilar = []\ntek_sayilar = []\n\nfor sayi in sayilar:\n    if sayi % 2 == 0:\n        cift_sayilar.append(sayi)\n    else:\n        tek_sayilar.append(sayi)\n\nprint(f\"Çift sayılar: {cift_sayilar}\")\nprint(f\"Tek sayılar: {tek_sayilar}\")\n"
      },
      {
        "type": "markdown",
        "content": "**SORU 2**\n\nKullanıcıdan öğrenci sayısını ve her bir öğrencinin notunu alan, bu notları bir listede saklayan ve sonrasında notların toplamını ve ortalamasını hesaplayan bir program yazın."
      },
      {
        "type": "code",
        "content": "ogrenci_notlari = []\n\n# Öğrenci sayısını alır\nogrenci_sayisi = int(input(\"Öğrenci sayısını girin: \"))\n\n# Her öğrencinin notunu alır ve listeye ekler\nfor i in range(ogrenci_sayisi):\n    not_ = float(input(f\"{i+1}. öğrencinin notunu girin: \"))\n    ogrenci_notlari.append(not_)\n\n# Notların toplamını ve ortalamasını hesapla\ntoplam_not = 0\nfor notlar in ogrenci_notlari:\n    toplam_not += notlar\n\nortalama_not = toplam_not / ogrenci_sayisi\n\nprint(\"Sınıfın not ortalaması:\" ,ortalama_not)\n"
      },
      {
        "type": "code",
        "content": "# Çarpım tablosunu oluşturan bir for döngüsü\nfor i in range(1, 11):\n    for j in range(1, 11):\n        carpim = i * j\n        print(f\"{i} * {j} = {carpim}\")\n# Bu kod parçası, Python'da iç içe geçmiş iki `for` döngüsü kullanılarak 1'den 10'a kadar olan sayıların çarpım tablosunu oluşturmayı amaçlar. Her bir çarpım işlemi, iki `for` döngüsünün değişkenlerinin kombinasyonları üzerinde yapılır. İşte kodun ayrıntılı açıklaması:\n\n# İlk `for` Döngüsü (`for i in range(1, 11):`):\n   # Bu döngü, `i` değişkenini 1 ile 10 arasındaki (10 dahil değil) değerlerle sırayla dolaşır.\n   # Her bir `i` değeri için ikinci `for` döngüsü içeriğini çalıştırır.\n\n# İkinci `for` Döngüsü (`for j in range(1, 11):`):\n   #Bu döngü, `j` değişkenini 1 ile 10 arasındaki (10 dahil değil) değerlerle sırayla dolaşır.\n   # Her bir `j` değeri için yapılacak işlemler aşağıdaki adımlarda açıklanmıştır.\n\n# Çarpım İşlemi:\n   # İkinci `for` döngüsü içinde, her bir `i` ve `j` değeri üzerinden bir çarpım işlemi yapılır.\n   # `carpim` değişkenine `i * j` çarpım sonucu atanır.\n\n# Sonuçları Yazdırma:\n   # `print()` fonksiyonu kullanılarak, her bir çarpım işleminin sonucu ekrana yazdırılır.\n   # `f-string` formatı kullanılarak, çarpım işleminin detayları ve sonucu belirtilir. Örneğin, \"2 * 3 = 6\" gibi bir çıktı oluşturulur.\n\n# Döngülerin İç İçe Kullanımı:\n   #İlk `for` döngüsü, her bir `i` değeri için ikinci `for` döngüsünü çalıştırır. Bu durumda, her `i` değeri için 1'den 10'a kadar olan tüm `j` değerleri üzerinden çarpım işlemi yapılır.\n\n# Sonuç olarak, bu kod parçası 1 ile 10 arasındaki sayıların çarpım tablosunu ekrana yazdırır. İç içe geçmiş `for` döngüleri sayesinde, her bir `i` değeri için tüm `j` değerleri üzerinden çarpım işlemleri yapılır ve sonuçları formatlı bir şekilde yazdırılır."
      },
      {
        "type": "markdown",
        "content": "# HAFTA 3 DERS 2"
      },
      {
        "type": "markdown",
        "content": "**SORU 3**\n\nKullanıcıdan 5 adet sayı alın ve bu sayıları bir listede saklayın. Ardından bu listeyi ve kullanıcının girdiği 5 sayının karelerini sırasıyla ekrana yazdıran programı yazın."
      },
      {
        "type": "code",
        "content": "# Girilen sayıları saklayacağımız boş liste\nnumbers = []\n\n# Kullanıcıdan 5 adet sayı alınır\nfor i in range(5):\n    girdiler = int(input(f\"{i+1}. sayıyı girin: \")) # Kullanıcıdan sayıyı al\n    numbers.append(girdiler) # Sayıyı listeye ekle\n\n# Kareleri saklayacağımız boş liste\nkareler = []\n\n# For döngüsü ile listenin elemanlarının karelerini hesapla\nfor num in numbers:\n    kareler.append(num ** 2)\n\n# Sonucu ekrana yazdır\nprint(\"Orijinal liste:\", numbers)\nprint(\"Karelerinin listesi:\", kareler)"
      },
      {
        "type": "code",
        "content": "# Verilen bir liste\nkelimeler = [\"Merhaba\", \"Dünya\", \"Nasılsınız\"]\n\n# Kelimeleri birleştirip tek bir string oluşturan bir for döngüsü\nbirlesik_kelime = \"\"\nfor kelime in kelimeler:\n    birlesik_kelime += kelime + \" \"\n\nprint(\"Birleştirilmiş Kelime:\", birlesik_kelime)\n"
      },
      {
        "type": "code",
        "content": "# Kullanıcıdan alınan satır sayısıyla orantılı üçgen çizme\nsatir = int(input(\"üçgen satır sayısı: \"))\nfor sayi in range(1,satir+1):\n  print(sayi*\"*\")"
      },
      {
        "type": "code",
        "content": "# For döngüsü ile koşullu operatörün kullanımı\nfor x in range(1,15):\n  if x%7==0:\n    continue\n  print(x)\n\nprint('\\n')\n\nfor x in range(1,15):\n  if x%7==0:\n    break\n  print(x)"
      },
      {
        "type": "markdown",
        "content": "**SORU 4**\n\nKullanıcıdan 5 sayı alın ve bu sayılardan pozitif olanları bir listeye\nekleyecek bir program yazın. Eğer kullanıcı 0 veya negatif bir sayı girerse, o\nsayıyı atlayın. Eğer kullanıcı 100'den büyük bir sayı girerse, program\nsonlandırılsın.Pozitif liste ekrana yazdırılsın.\n\n"
      },
      {
        "type": "code",
        "content": "pozitif_sayilar = []\n\n# Kullanıcıdan 5 sayı al\nfor i in range(5):\n    sayi = int(input(f\"{i+1}. sayıyı girin: \"))\n\n    # 100'den büyük bir sayı girilirse döngüyü sonlandır\n    if sayi > 100:\n        print(\"100'den büyük bir sayı girildi. Program sonlandırılıyor.\")\n        break\n\n    # 0 veya negatif sayı girilirse bu sayıyı atla\n    if sayi <= 0:\n        continue\n\n    # Pozitif sayıları listeye ekle\n    pozitif_sayilar.append(sayi)\n\n# Sonuçları ekrana yazdır\nprint(\"Girilen pozitif sayılar:\", pozitif_sayilar)\n"
      },
      {
        "type": "markdown",
        "content": "# HAFTA 3 DERS 3\n"
      },
      {
        "type": "markdown",
        "content": "**WHILE DÖNGÜSÜ**\n\nPython'da `while` döngüsü, belirli bir koşul sağlandığı sürece belirli bir kod bloğunu tekrar tekrar çalıştırmak için kullanılan bir döngü türüdür. `while` döngüsü, koşulun `True` (doğru) olduğu sürece döngü içindeki kod bloğunu yürütmeye devam eder. Koşul `False` (yanlış) olduğunda döngü sonlanır ve program akışı döngüden çıkar.\n\n`while` döngüsünün genel yapısı şu şekildedir:\n\n```python\nwhile koşul:\n    # Koşul doğru olduğu sürece çalışacak kod bloğu\n    # Döngü içinde yapılması gereken işlemler burada yer alır\n```\n\nÖrnek olarak, bir sayaç kullanarak `while` döngüsünü kullanarak 1'den 5'e kadar olan sayıları ekrana yazdırmak için aşağıdaki kodu kullanabilirsiniz:\n\n```python\nsayac = 1\nwhile sayac <= 5:\n    print(sayac)\n    sayac += 1\n```\n\nBu kodda `sayac` adlı bir değişkeni kullanarak 1'den 5'e kadar olan sayıları yazdırıyoruz. `while` döngüsü, `sayac` 5'e ulaşana kadar çalışmaya devam eder."
      },
      {
        "type": "code",
        "content": "sayac = 1\nwhile sayac <= 5:\n    print(sayac)\n    sayac += 1"
      },
      {
        "type": "code",
        "content": "sayi = 64\n\nwhile sayi > 1:\n    sayi /= 2\n    print(sayi)\n"
      },
      {
        "type": "markdown",
        "content": "Bu döngü her adımda sayi değerini 2'ye böler ve sonucu ekrana yazdırır. Döngü, sayi 1'den küçük veya eşit olduğunda sona erer.\n\n"
      },
      {
        "type": "code",
        "content": "# While döngüsünün mantığını anlatan basit bir örnek\ni = 1\nwhile i < 10:\n  print(i)\n  i= i+1"
      },
      {
        "type": "code",
        "content": "# Döngünün koşullu durum kullanmadan koşullu bir durum gibi davranması\nsayac = 0\n\nwhile sayac < 5:\n    print(sayac)\n    print(\"döngünün içinde\")\n    sayac = sayac + 1\n\nprint(\"döngünün dışında\")"
      },
      {
        "type": "code",
        "content": "# Koşullu bir durum kullanarak oluşturulan döngü\nx = 1\nwhile x <= 100:\n    if x % 2==1:\n        print('sayı tek:' + str(x))\n    else:\n        print('sayı çift:' + str(x))\n    x += 1\n\nprint('bitti...')"
      },
      {
        "type": "markdown",
        "content": "**SORU 5**\n\nKullanıcıdan şifre alın ve doğru şifre ile girilen şifreyi kontrol edin. Eğer girilen şifre yanlışsa tekrar denemesini söyleyin. Şİfre doğruysa hoş geldiniz yazan kodu yazın."
      },
      {
        "type": "code",
        "content": "dogru_sifre = \"12345\"\n\ngirilen_sifre = input(\"Şifrenizi girin: \")\n\nwhile girilen_sifre != dogru_sifre:\n    print(\"Yanlış şifre, tekrar deneyin.\")\n    girilen_sifre = input(\"Şifrenizi girin: \")\n\nprint(\"Şifre doğru, hoş geldiniz!\")\n"
      },
      {
        "type": "markdown",
        "content": "# Hafta 3 Ders 4"
      },
      {
        "type": "markdown",
        "content": "\n\n```\nFaktöriyel Hesaplama\n```\n\n"
      },
      {
        "type": "code",
        "content": "n = int(input(\"Pozitif bir tam sayı girin: \"))\nfaktoriyel = 1\ni = n\nwhile i > 1:\n  faktoriyel *= i\n  i -= 1\nprint(f\"{n}! = {faktoriyel}\")"
      },
      {
        "type": "markdown",
        "content": "**SORU 6**\n\nBu program, kullanıcının girdiği n değeri kadar Fibonacci serisi elemanını hesaplar ve ekrana yazdırır. İlk iki eleman olan 0 ve 1'den başlayarak, her bir sonraki elemanı hesaplayarak diziyi oluşturur. Sonuç olarak, oluşturulan Fibonacci serisi elemanlarını yan yana yazdırır."
      },
      {
        "type": "code",
        "content": "n = int(input(\"Kaç eleman istediğinizi girin: \"))\nfibonacci = [0, 1]\n\nwhile len(fibonacci) < n:\n    yeni_eleman = fibonacci[-1] + fibonacci[-2]\n    fibonacci.append(yeni_eleman)\n\nprint(f\"Fibonacci Serisi: {fibonacci}\")"
      },
      {
        "type": "code",
        "content": "# SORU 6 ALTERNATİF\nn = int(input(\"Kaç eleman istediğinizi girin: \"))\n\nfibonacci = [0, 1]\n\nwhile len(fibonacci) < n:\n    yeni_eleman = fibonacci[-1] + fibonacci[-2]\n    fibonacci.append(yeni_eleman)\n\nprint(\"Fibonacci Serisi:\")\nfor eleman in fibonacci:\n    print(eleman, end=\" \")"
      },
      {
        "type": "markdown",
        "content": "**SORU 7**\n\nKullanıcı 0 'a basana kadar girdiği değerleri toplayan kodu yazın."
      },
      {
        "type": "code",
        "content": "# Toplamı saklayacak değişken\ntoplam = 0\n\n# Kullanıcıdan sayıları almak için while döngüsü\nwhile True: #sonsuz döngü\n    sayi = int(input(\"Bir sayı girin: \"))\n\n    # Kullanıcı 0 girerse döngüyü sonlandır\n    if sayi == 0:\n        break\n\n    # Sayıyı toplam değişkenine ekle\n    toplam += sayi\n\n# Toplamı ekrana yazdır\nprint(\"Girilen sayıların toplamı:\", toplam)"
      },
      {
        "type": "markdown",
        "content": "**SORU 8**\n\nBir kullanıcıdan üst sınır sayısı alın ve 1'den bu sayıya kadar olan aralıktaki asal sayıları tek tek bulup yazdıran bir kod yazın."
      },
      {
        "type": "code",
        "content": "\n# Kullanıcıdan üst sınır değeri al\nust_sinir = int(input(\"Bir üst sınır değeri girin: \"))\nprint(f\"1 ile {ust_sinir} arasındaki asal sayılar:\")\n\nsayi = 2\n\nwhile sayi <= ust_sinir:\n    # bolen_sayac, sayının kaç farklı tam böleni olduğunu saymak için kullanılır\n    bolen_sayac = 0\n\n    # Bölme testlerini yapacak değişken: 1'den başlat (çünkü 1 her sayının bölenidir)\n    bolen = 1\n\n    # İç döngü: potansiyel bölenleri 1'den 'sayi'ya kadar kontrol et\n    while bolen <= sayi:\n        # Eğer sayi, bolen'e tam bölünüyorsa (kalan 0 ise) bolen 'gerçekte' bir bölen\n        if sayi % bolen == 0:\n            # Bölen bulunduğunda sayaç bir artar\n            bolen_sayac += 1\n        # Bir sonraki olası böleni denemek için bolen'i artır\n        bolen += 1\n\n    # Eğer yalnızca 2 bölen bulunduysa (1 ve kendisi) -> asal sayıdır\n    if bolen_sayac == 2:\n        print(sayi)  # 12) Asal sayıyı ekrana yaz\n\n    # Bir sonraki sayıyı kontrol etmek üzere sayi'yi artır\n    sayi += 1\n"
      }
    ],
    "mergedCode": "\n# ========================================\n# # HAFTA 3 DERS 1\n# \n# \n# \n# ========================================\n\n\n\n# ========================================\n# **FOR DÖNGÜSÜNE GİRİŞ**\n# \n# Python'da `for` döngüsü, bir veri koleksiyonu (liste, demet, dize vb.) üzerinde dolaşarak her bir elemanı sırayla işlemek için kullanılan bir döngü türüdür. `for` döngüsü, koleksiyondaki her bir elemanın üzerinde tek tek işlem yapmak için kullanılır. Döngü, koleksiyondaki elemanlar tükenene kadar devam eder.\n# \n# `for` döngüsünün genel yapısı şu şekildedir:\n# \n# ```python\n# for eleman in koleksiyon:\n#     # Her eleman üzerinde çalışacak kod bloğu\n#     # Döngü içinde yapılması gereken işlemler burada yer alır\n# ```\n# \n# Örnek olarak, bir liste içindeki elemanları `for` döngüsü kullanarak yazdırmak için aşağıdaki kodu kullanabilirsiniz:\n# \n# ```python\n# liste = [1, 2, 3, 4, 5]\n# for eleman in liste:\n#     print(eleman)\n# ```\n# \n# Bu kodda `liste` adlı bir liste içindeki elemanları sırayla `eleman` adlı bir değişkene atayarak her bir elemanı yazdırıyoruz. `for` döngüsü, listenin her bir elemanını dolaşarak her birini ekrana yazdırır.\n# ========================================\n\n\n# Bir liste oluşturalım\nliste = [10, 20, 30, 40, 50]\n\n# Liste üzerinde for döngüsü kullanarak her bir elemanı yazdıralım\nfor eleman in liste:\n    print(eleman)\n\nfor i in range(1,7):\n  print(i)\n\n# Verilen bir liste\nliste = [5, 10, 15, 20, 25]\n\n# Liste içindeki elemanları toplayan bir for döngüsü\ntoplam = 0\nfor sayi in liste:\n    toplam += sayi\n\nprint(\"Toplam:\", toplam)\n\n\n\n# ========================================\n# **SORU 1**\n# \n# Bir for döngüsü kullanarak bir dizideki çift ve tek sayıları ayrı ayrı listelere ekleyen bir program yazın.\n# ========================================\n\n\nsayilar = [10, 15, 23, 42, 37, 50, 61]\ncift_sayilar = []\ntek_sayilar = []\n\nfor sayi in sayilar:\n    if sayi % 2 == 0:\n        cift_sayilar.append(sayi)\n    else:\n        tek_sayilar.append(sayi)\n\nprint(f\"Çift sayılar: {cift_sayilar}\")\nprint(f\"Tek sayılar: {tek_sayilar}\")\n\n\n\n# ========================================\n# **SORU 2**\n# \n# Kullanıcıdan öğrenci sayısını ve her bir öğrencinin notunu alan, bu notları bir listede saklayan ve sonrasında notların toplamını ve ortalamasını hesaplayan bir program yazın.\n# ========================================\n\n\nogrenci_notlari = []\n\n# Öğrenci sayısını alır\nogrenci_sayisi = int(input(\"Öğrenci sayısını girin: \"))\n\n# Her öğrencinin notunu alır ve listeye ekler\nfor i in range(ogrenci_sayisi):\n    not_ = float(input(f\"{i+1}. öğrencinin notunu girin: \"))\n    ogrenci_notlari.append(not_)\n\n# Notların toplamını ve ortalamasını hesapla\ntoplam_not = 0\nfor notlar in ogrenci_notlari:\n    toplam_not += notlar\n\nortalama_not = toplam_not / ogrenci_sayisi\n\nprint(\"Sınıfın not ortalaması:\" ,ortalama_not)\n\n\n# Çarpım tablosunu oluşturan bir for döngüsü\nfor i in range(1, 11):\n    for j in range(1, 11):\n        carpim = i * j\n        print(f\"{i} * {j} = {carpim}\")\n# Bu kod parçası, Python'da iç içe geçmiş iki `for` döngüsü kullanılarak 1'den 10'a kadar olan sayıların çarpım tablosunu oluşturmayı amaçlar. Her bir çarpım işlemi, iki `for` döngüsünün değişkenlerinin kombinasyonları üzerinde yapılır. İşte kodun ayrıntılı açıklaması:\n\n# İlk `for` Döngüsü (`for i in range(1, 11):`):\n   # Bu döngü, `i` değişkenini 1 ile 10 arasındaki (10 dahil değil) değerlerle sırayla dolaşır.\n   # Her bir `i` değeri için ikinci `for` döngüsü içeriğini çalıştırır.\n\n# İkinci `for` Döngüsü (`for j in range(1, 11):`):\n   #Bu döngü, `j` değişkenini 1 ile 10 arasındaki (10 dahil değil) değerlerle sırayla dolaşır.\n   # Her bir `j` değeri için yapılacak işlemler aşağıdaki adımlarda açıklanmıştır.\n\n# Çarpım İşlemi:\n   # İkinci `for` döngüsü içinde, her bir `i` ve `j` değeri üzerinden bir çarpım işlemi yapılır.\n   # `carpim` değişkenine `i * j` çarpım sonucu atanır.\n\n# Sonuçları Yazdırma:\n   # `print()` fonksiyonu kullanılarak, her bir çarpım işleminin sonucu ekrana yazdırılır.\n   # `f-string` formatı kullanılarak, çarpım işleminin detayları ve sonucu belirtilir. Örneğin, \"2 * 3 = 6\" gibi bir çıktı oluşturulur.\n\n# Döngülerin İç İçe Kullanımı:\n   #İlk `for` döngüsü, her bir `i` değeri için ikinci `for` döngüsünü çalıştırır. Bu durumda, her `i` değeri için 1'den 10'a kadar olan tüm `j` değerleri üzerinden çarpım işlemi yapılır.\n\n# Sonuç olarak, bu kod parçası 1 ile 10 arasındaki sayıların çarpım tablosunu ekrana yazdırır. İç içe geçmiş `for` döngüleri sayesinde, her bir `i` değeri için tüm `j` değerleri üzerinden çarpım işlemleri yapılır ve sonuçları formatlı bir şekilde yazdırılır.\n\n\n# ========================================\n# # HAFTA 3 DERS 2\n# ========================================\n\n\n\n# ========================================\n# **SORU 3**\n# \n# Kullanıcıdan 5 adet sayı alın ve bu sayıları bir listede saklayın. Ardından bu listeyi ve kullanıcının girdiği 5 sayının karelerini sırasıyla ekrana yazdıran programı yazın.\n# ========================================\n\n\n# Girilen sayıları saklayacağımız boş liste\nnumbers = []\n\n# Kullanıcıdan 5 adet sayı alınır\nfor i in range(5):\n    girdiler = int(input(f\"{i+1}. sayıyı girin: \")) # Kullanıcıdan sayıyı al\n    numbers.append(girdiler) # Sayıyı listeye ekle\n\n# Kareleri saklayacağımız boş liste\nkareler = []\n\n# For döngüsü ile listenin elemanlarının karelerini hesapla\nfor num in numbers:\n    kareler.append(num ** 2)\n\n# Sonucu ekrana yazdır\nprint(\"Orijinal liste:\", numbers)\nprint(\"Karelerinin listesi:\", kareler)\n\n# Verilen bir liste\nkelimeler = [\"Merhaba\", \"Dünya\", \"Nasılsınız\"]\n\n# Kelimeleri birleştirip tek bir string oluşturan bir for döngüsü\nbirlesik_kelime = \"\"\nfor kelime in kelimeler:\n    birlesik_kelime += kelime + \" \"\n\nprint(\"Birleştirilmiş Kelime:\", birlesik_kelime)\n\n\n# Kullanıcıdan alınan satır sayısıyla orantılı üçgen çizme\nsatir = int(input(\"üçgen satır sayısı: \"))\nfor sayi in range(1,satir+1):\n  print(sayi*\"*\")\n\n# For döngüsü ile koşullu operatörün kullanımı\nfor x in range(1,15):\n  if x%7==0:\n    continue\n  print(x)\n\nprint('\\n')\n\nfor x in range(1,15):\n  if x%7==0:\n    break\n  print(x)\n\n\n# ========================================\n# **SORU 4**\n# \n# Kullanıcıdan 5 sayı alın ve bu sayılardan pozitif olanları bir listeye\n# ekleyecek bir program yazın. Eğer kullanıcı 0 veya negatif bir sayı girerse, o\n# sayıyı atlayın. Eğer kullanıcı 100'den büyük bir sayı girerse, program\n# sonlandırılsın.Pozitif liste ekrana yazdırılsın.\n# \n# \n# ========================================\n\n\npozitif_sayilar = []\n\n# Kullanıcıdan 5 sayı al\nfor i in range(5):\n    sayi = int(input(f\"{i+1}. sayıyı girin: \"))\n\n    # 100'den büyük bir sayı girilirse döngüyü sonlandır\n    if sayi > 100:\n        print(\"100'den büyük bir sayı girildi. Program sonlandırılıyor.\")\n        break\n\n    # 0 veya negatif sayı girilirse bu sayıyı atla\n    if sayi <= 0:\n        continue\n\n    # Pozitif sayıları listeye ekle\n    pozitif_sayilar.append(sayi)\n\n# Sonuçları ekrana yazdır\nprint(\"Girilen pozitif sayılar:\", pozitif_sayilar)\n\n\n\n# ========================================\n# # HAFTA 3 DERS 3\n# \n# ========================================\n\n\n\n# ========================================\n# **WHILE DÖNGÜSÜ**\n# \n# Python'da `while` döngüsü, belirli bir koşul sağlandığı sürece belirli bir kod bloğunu tekrar tekrar çalıştırmak için kullanılan bir döngü türüdür. `while` döngüsü, koşulun `True` (doğru) olduğu sürece döngü içindeki kod bloğunu yürütmeye devam eder. Koşul `False` (yanlış) olduğunda döngü sonlanır ve program akışı döngüden çıkar.\n# \n# `while` döngüsünün genel yapısı şu şekildedir:\n# \n# ```python\n# while koşul:\n#     # Koşul doğru olduğu sürece çalışacak kod bloğu\n#     # Döngü içinde yapılması gereken işlemler burada yer alır\n# ```\n# \n# Örnek olarak, bir sayaç kullanarak `while` döngüsünü kullanarak 1'den 5'e kadar olan sayıları ekrana yazdırmak için aşağıdaki kodu kullanabilirsiniz:\n# \n# ```python\n# sayac = 1\n# while sayac <= 5:\n#     print(sayac)\n#     sayac += 1\n# ```\n# \n# Bu kodda `sayac` adlı bir değişkeni kullanarak 1'den 5'e kadar olan sayıları yazdırıyoruz. `while` döngüsü, `sayac` 5'e ulaşana kadar çalışmaya devam eder.\n# ========================================\n\n\nsayac = 1\nwhile sayac <= 5:\n    print(sayac)\n    sayac += 1\n\nsayi = 64\n\nwhile sayi > 1:\n    sayi /= 2\n    print(sayi)\n\n\n\n# ========================================\n# Bu döngü her adımda sayi değerini 2'ye böler ve sonucu ekrana yazdırır. Döngü, sayi 1'den küçük veya eşit olduğunda sona erer.\n# \n# \n# ========================================\n\n\n# While döngüsünün mantığını anlatan basit bir örnek\ni = 1\nwhile i < 10:\n  print(i)\n  i= i+1\n\n# Döngünün koşullu durum kullanmadan koşullu bir durum gibi davranması\nsayac = 0\n\nwhile sayac < 5:\n    print(sayac)\n    print(\"döngünün içinde\")\n    sayac = sayac + 1\n\nprint(\"döngünün dışında\")\n\n# Koşullu bir durum kullanarak oluşturulan döngü\nx = 1\nwhile x <= 100:\n    if x % 2==1:\n        print('sayı tek:' + str(x))\n    else:\n        print('sayı çift:' + str(x))\n    x += 1\n\nprint('bitti...')\n\n\n# ========================================\n# **SORU 5**\n# \n# Kullanıcıdan şifre alın ve doğru şifre ile girilen şifreyi kontrol edin. Eğer girilen şifre yanlışsa tekrar denemesini söyleyin. Şİfre doğruysa hoş geldiniz yazan kodu yazın.\n# ========================================\n\n\ndogru_sifre = \"12345\"\n\ngirilen_sifre = input(\"Şifrenizi girin: \")\n\nwhile girilen_sifre != dogru_sifre:\n    print(\"Yanlış şifre, tekrar deneyin.\")\n    girilen_sifre = input(\"Şifrenizi girin: \")\n\nprint(\"Şifre doğru, hoş geldiniz!\")\n\n\n\n# ========================================\n# # Hafta 3 Ders 4\n# ========================================\n\n\n\n# ========================================\n# \n# \n# ```\n# Faktöriyel Hesaplama\n# ```\n# \n# \n# ========================================\n\n\nn = int(input(\"Pozitif bir tam sayı girin: \"))\nfaktoriyel = 1\ni = n\nwhile i > 1:\n  faktoriyel *= i\n  i -= 1\nprint(f\"{n}! = {faktoriyel}\")\n\n\n# ========================================\n# **SORU 6**\n# \n# Bu program, kullanıcının girdiği n değeri kadar Fibonacci serisi elemanını hesaplar ve ekrana yazdırır. İlk iki eleman olan 0 ve 1'den başlayarak, her bir sonraki elemanı hesaplayarak diziyi oluşturur. Sonuç olarak, oluşturulan Fibonacci serisi elemanlarını yan yana yazdırır.\n# ========================================\n\n\nn = int(input(\"Kaç eleman istediğinizi girin: \"))\nfibonacci = [0, 1]\n\nwhile len(fibonacci) < n:\n    yeni_eleman = fibonacci[-1] + fibonacci[-2]\n    fibonacci.append(yeni_eleman)\n\nprint(f\"Fibonacci Serisi: {fibonacci}\")\n\n# SORU 6 ALTERNATİF\nn = int(input(\"Kaç eleman istediğinizi girin: \"))\n\nfibonacci = [0, 1]\n\nwhile len(fibonacci) < n:\n    yeni_eleman = fibonacci[-1] + fibonacci[-2]\n    fibonacci.append(yeni_eleman)\n\nprint(\"Fibonacci Serisi:\")\nfor eleman in fibonacci:\n    print(eleman, end=\" \")\n\n\n# ========================================\n# **SORU 7**\n# \n# Kullanıcı 0 'a basana kadar girdiği değerleri toplayan kodu yazın.\n# ========================================\n\n\n# Toplamı saklayacak değişken\ntoplam = 0\n\n# Kullanıcıdan sayıları almak için while döngüsü\nwhile True: #sonsuz döngü\n    sayi = int(input(\"Bir sayı girin: \"))\n\n    # Kullanıcı 0 girerse döngüyü sonlandır\n    if sayi == 0:\n        break\n\n    # Sayıyı toplam değişkenine ekle\n    toplam += sayi\n\n# Toplamı ekrana yazdır\nprint(\"Girilen sayıların toplamı:\", toplam)\n\n\n# ========================================\n# **SORU 8**\n# \n# Bir kullanıcıdan üst sınır sayısı alın ve 1'den bu sayıya kadar olan aralıktaki asal sayıları tek tek bulup yazdıran bir kod yazın.\n# ========================================\n\n\n\n# Kullanıcıdan üst sınır değeri al\nust_sinir = int(input(\"Bir üst sınır değeri girin: \"))\nprint(f\"1 ile {ust_sinir} arasındaki asal sayılar:\")\n\nsayi = 2\n\nwhile sayi <= ust_sinir:\n    # bolen_sayac, sayının kaç farklı tam böleni olduğunu saymak için kullanılır\n    bolen_sayac = 0\n\n    # Bölme testlerini yapacak değişken: 1'den başlat (çünkü 1 her sayının bölenidir)\n    bolen = 1\n\n    # İç döngü: potansiyel bölenleri 1'den 'sayi'ya kadar kontrol et\n    while bolen <= sayi:\n        # Eğer sayi, bolen'e tam bölünüyorsa (kalan 0 ise) bolen 'gerçekte' bir bölen\n        if sayi % bolen == 0:\n            # Bölen bulunduğunda sayaç bir artar\n            bolen_sayac += 1\n        # Bir sonraki olası böleni denemek için bolen'i artır\n        bolen += 1\n\n    # Eğer yalnızca 2 bölen bulunduysa (1 ve kendisi) -> asal sayıdır\n    if bolen_sayac == 2:\n        print(sayi)  # 12) Asal sayıyı ekrana yaz\n\n    # Bir sonraki sayıyı kontrol etmek üzere sayi'yi artır\n    sayi += 1\n"
  },
  "hafta-4": {
    "id": "hafta-4",
    "week": 4,
    "title": "Python Hafta 4",
    "url": "https://colab.research.google.com/drive/1qgg_cLInzta2k668nSbvrZ17_QRXMlLk?usp=sharing",
    "cells": [
      {
        "type": "markdown",
        "content": "# HAFTA 4 DERS 1"
      },
      {
        "type": "markdown",
        "content": "**SORU 1**\n\nBu program, kullanıcıdan alınan n değeri kadar terimi hesaplar ve ekrana yazdırır. Her terim, i'nin karesi olarak hesaplanır ve ekrana yazdırılır. end=\" \" ifadesi, terimleri yan yana yazdırmak için kullanılır. Ekrana sayıları yazdırma işlemi terim sayısı 10'u geçtiğinde durdurulacaktır.\n\n\n\n\n\n\n"
      },
      {
        "type": "code",
        "content": "# While ile yapımı:\nn = int(input(\"Kaç adet terim olacağını yazınız: \"))\ni = 1\n\nwhile i <= n:\n    terim = i * i\n    if n > 10:  # Eğer terim 10'u aşarsa sadece uyarı mesajı ver ve döngüyü durdur\n        print(\"Tekrar deneyin, çünkü terim sayısı 10'u aştı.\")\n        break\n    print(terim, end = \" \")  # Sadece 10 veya daha küçük terimleri yazdırır\n    i += 1\n"
      },
      {
        "type": "code",
        "content": "#For ile yapımı:\nn = int(input(\"Kaç terim yazdırmak istediğinizi girin: \"))\n\nfor i in range(1, n + 1):\n    terim = i ** 2\n    if n > 10:  # Eğer terim 50'yi aşarsa döngüyü durdur\n        print(\"Tekrar deneyin, çünkü terim sayısı 10'u aştı.\")\n        break\n    print(terim, end=\" \")"
      },
      {
        "type": "markdown",
        "content": "**SORU 2**\n\n12 ile 37 (her iki sayı dahil) arasındaki tek ve çift sayıların toplamını gösteren bir program yazınız\n"
      },
      {
        "type": "code",
        "content": "sayi_cift = 0\n\nsayi_tek = 0\n\nfor sayi in range(12,38):\n   if sayi % 2 == 0:\n      sayi_cift = sayi_cift + sayi\n   else:\n      sayi_tek = sayi_tek + sayi\n\nprint(\"Çift sayıların toplamı \",sayi_cift)\nprint(\"Tek sayıların toplamı \",sayi_tek)"
      },
      {
        "type": "markdown",
        "content": "**RANDOM FONKSİYONU**\n\nPython'da `random` modülü, rastgele (random) sayılar üretmek ve rasgele seçimler yapmak için kullanılan bir modüldür. Bu modülü kullanarak rastgele sayılar, liste elemanları veya karakter dizileri seçebilirsiniz. İşte `random` modülünü kullanarak bazı örnekler:\n\n**Rastgele Sayı Üretme:**\n\n```python\nimport random\n\n# 0 ile 1 arasında rastgele bir ondalıklı sayı üretme\nrasgele_ondalikli = random.random()\nprint(\"Rastgele ondalıklı sayı:\", rasgele_ondalikli)\n\n# Belirli bir aralıkta rastgele tam sayı üretme\nrasgele_tam_sayi = random.randint(1, 10)\nprint(\"Rastgele tam sayı:\", rasgele_tam_sayi)\n```\n\n**Rastgele Eleman Seçme:**\n\n`random` modülünü kullanarak rasgele işlemler gerçekleştirerek, örneğin oyunlar, simülasyonlar veya test senaryoları için rasgele veriler oluşturabilirsiniz."
      },
      {
        "type": "code",
        "content": "import random\n\nliste = [10, 20, 30, 40, 50]\n\n# Liste içinden rastgele bir eleman seçme\nrasgele_eleman = random.choice(liste)\nprint(\"Rastgele seçilen eleman:\", rasgele_eleman)"
      },
      {
        "type": "code",
        "content": "import random\nx = random.randint(0,10)\nprint(x)\n"
      },
      {
        "type": "code",
        "content": "import random\nx = random.randint(0,10)\n\nwhile x!=5:\n  print(x)\n  x = random.randint(0,10)\n\nprint('tebrikler rastgele sayı 5 oldu')"
      },
      {
        "type": "markdown",
        "content": "# HAFTA 4 DERS 2\n\n\n"
      },
      {
        "type": "markdown",
        "content": "**SORU 3**\n\n1 ile 50 arasında rastgele 5 sayı üretin. Bu sayıları bir listeye ekleyin ve\nortalamayı hesaplayın. Hem üretilen sayıları hem de ortalamayı ekrana yazdırın."
      },
      {
        "type": "code",
        "content": "import random\n\n# 1 ile 50 arasında rastgele 5 sayı üretir\nsayilar = []\nfor i in range(5):\n    sayilar.append(random.randint(1, 50))\n\n# Sayıların toplamını hesaplar\ntoplam = 0\nfor sayi in sayilar:\n    toplam += sayi\n\n# Ortalama hesaplar\nortalama = toplam / len(sayilar)\n\n# Sayıları ve ortalamayı ekrana yazdırır\nprint(\"Rastgele üretilen sayılar:\", sayilar)\nprint(\"Sayıların ortalaması:\", ortalama)\n"
      },
      {
        "type": "markdown",
        "content": "**SORU 4**\n\nRastgele üretilen boyutta yıldız karakterinden oluşan dikdörtgen şeklini ekrana yazan program yazın.\n\n* Not: Genişlik ve yükseklik değerleri en fazla 20 birim olsun."
      },
      {
        "type": "code",
        "content": "import random\nx=random.randint(1,20)\ny=random.randint(1,20)\n\ni=0\nwhile(i<x):\n  print(\"* \"*y)\n  i+=1"
      },
      {
        "type": "markdown",
        "content": "# HAFTA 4 DERS 3"
      },
      {
        "type": "markdown",
        "content": "**Liste, Tuple, Dictionary**"
      },
      {
        "type": "markdown",
        "content": "*Liste, birden fazla öğeyi tek bir değişkende saklamamıza olanak tanır.\n\n*Liste köşeli parantez [] içinde oluşturulur ve öğeler virgülle ayrılır.\n\n*Liste üzerinde sayısal işlemler yapılabilir.\n"
      },
      {
        "type": "code",
        "content": "#List\n# Alışveriş listesi ve fiyatları\nurunler = [\"Elma\", \"Ekmek\", \"Süt\", \"Peynir\"]\nfiyatlar = [1.5, 2.0, 3.0, 4.5]\n\ntoplam_maliyet = sum(fiyatlar)\nprint(f\"Toplam maliyet: {toplam_maliyet} TL\")"
      },
      {
        "type": "markdown",
        "content": "\n*Tuple, listeler gibi birden fazla öğeyi tek bir değişkende saklar, ancak değiştirilemez (immutable).\n\n*Tuple, parantez () içinde oluşturulur ve öğeler virgülle ayrılır."
      },
      {
        "type": "code",
        "content": "#Tuple\n# Kitap bilgileri: (isim, yazar, basım yılı)\nkitaplar = (\n(\"1984\", \"George Orwell\", 1949),\n(\"Savaş ve Barış\", \"Lev Tolstoy\", 1869),\n(\"Bülbülü Öldürmek\", \"Harper Lee\", 1960)\n)\n\nfor kitap in kitaplar:\n    isim, yazar, yil = kitap\n    print(f\"Kitap Adı: {isim}, Yazar: {yazar}, Basım Yılı: {yil}\")"
      },
      {
        "type": "markdown",
        "content": "\n*Dictionary, anahtar-değer çiftleri saklamamıza olanak tanır.\n\n*Dictionary, süslü parantez içinde oluşturulur ve her çift iki nokta : ile ayrılır."
      },
      {
        "type": "code",
        "content": "#Dictionary\n# Film bilgileri ve IMDB puanları\nfilmler = {\n\"Inception\": {\"tur\": \"Bilim Kurgu\", \"imdb_puani\": 8.8},\n\"The Godfather\": {\"tur\": \"Suç\", \"imdb_puani\": 9.2},\n\"The Dark Knight\": {\"tur\": \"Aksiyon\", \"imdb_puani\": 9.0}\n}\n\n#items() metodu, dictionary'da her bir anahtar-değer çiftini tuple olarak döndürür.\n#Burada her bir çift, film adı ve film bilgilerini içeren iç sözlükten oluşur.\nfor film, bilgiler in filmler.items():\n print(f\"Film Adı: {film}, Tür: {bilgiler['tur']}, IMDB Puanı: {bilgiler['imdb_puani']}\")"
      },
      {
        "type": "markdown",
        "content": "**SORU 5**\n\nÖğrencilerin notlarını ve ortalamayı hesaplayıp başarı durumlarını belirten bir program yazın.\n\n\n*    Her bir öğrencinin isim ve not bilgisini içeren bir liste oluşturun.\n\n*   Tüm öğrencilerin notlarının toplamını bulun ve ortalamayı hesaplayın.\n\n*   Her öğrencinin notunu kontrol ederek, 85 ve üstü not alanları \"Başarılı\", daha düşük not alanları \"Başarısız\" olarak sınıflandırın.\n* Toplam not, ortalama not ve her öğrencinin başarı durumu ekrana yazdırın."
      },
      {
        "type": "code",
        "content": "ogrenciler = [\n    {\"isim\": \"Ahmet\", \"not\": 85},\n    {\"isim\": \"Ayşe\", \"not\": 92},\n    {\"isim\": \"Mehmet\", \"not\": 78},\n    {\"isim\": \"Fatma\", \"not\": 95},\n    {\"isim\": \"Ali\", \"not\": 88}\n]\n\n# Notların toplamını ve ortalamasını hesaplama\ntoplam_not = sum(ogrenci[\"not\"] for ogrenci in ogrenciler)\nortalama_not = toplam_not / len(ogrenciler)\n\nprint(f\"Toplam Not: {toplam_not}\")\nprint(f\"Ortalama Not: {ortalama_not:.2f}\")\n\n# Başarı durumunu yazdırma\nprint(\"\\nÖğrenciler ve Başarı Durumları:\")\nfor ogrenci in ogrenciler:\n    durum = \"Başarılı\" if ogrenci[\"not\"] >= 85 else \"Başarısız\"\n    print(f\"{ogrenci['isim']}: {durum}\")\n"
      },
      {
        "type": "markdown",
        "content": "# Hafta 4 Ders 4"
      },
      {
        "type": "markdown",
        "content": "**SORU 6**\n\nTuple kullanarak bir şehirdeki turistik yerlerin adlarını ve giriş ücretlerini saklayan bir program yazınız."
      },
      {
        "type": "code",
        "content": "# Turistik yerler: (yer adı, giriş ücreti)\nturistik_yerler = (\n    (\"Ayasofya\", 50),\n    (\"Topkapı Sarayı\", 40),\n    (\"Sultanahmet Camii\", 0),\n    (\"Galata Kulesi\", 30)\n)\n\n# Turistik yer bilgilerini yazdırma\nprint(\"Şehirdeki Turistik Yerler ve Giriş Ücretleri:\")\nfor yer, ucret in turistik_yerler:\n    print(f\"{yer}: Giriş Ücreti {ucret} TL\")\n"
      },
      {
        "type": "markdown",
        "content": "**SORU 7**\n\nBir ürünün stok bilgilerini saklayan bir program yazınız.\n\n*   Ürünlerin fiyat ve stok bilgilerini içeren bir dictionary oluşturun.\n*   Toplam stok değerini hesaplayın. Her bir ürünün fiyatı ile stok miktarını çarpıp toplam değeri bulun.\n\n*   Ürün bilgilerini ekrana yazdırın.\n*   Her bir ürünün adını, fiyatını ve stok miktarını yazdırın.\n"
      },
      {
        "type": "code",
        "content": "# Ürün bilgileri dictionary\nurunler = {\n    \"elma\": {\"fiyat\": 3.5, \"stok\": 100},\n    \"muz\": {\"fiyat\": 2.0, \"stok\": 150},\n    \"portakal\": {\"fiyat\": 4.0, \"stok\": 80},\n    \"kiraz\": {\"fiyat\": 5.0, \"stok\": 60}\n}\n\n# Toplam stok değerini hesaplama\ntoplam_stok_degeri = 0\nfor urun, bilgiler in urunler.items():  # items() ile anahtar ve değerleri alıyoruz\n    toplam_stok_degeri += bilgiler[\"fiyat\"] * bilgiler[\"stok\"]\n\nprint(f\"Toplam Stok Değeri: {toplam_stok_degeri:.2f} TL\")\n\n# Ürün bilgilerini yazdırma\nprint(\"\\nÜrün Bilgileri:\")\nfor urun, bilgiler in urunler.items():  # Yine items() ile anahtar ve değerleri alıyoruz\n    fiyat = bilgiler[\"fiyat\"]\n    stok = bilgiler[\"stok\"]\n    print(f\"{urun.capitalize()} - Fiyat: {fiyat} TL, Stok: {stok}\")\n"
      }
    ],
    "mergedCode": "\n# ========================================\n# # HAFTA 4 DERS 1\n# ========================================\n\n\n\n# ========================================\n# **SORU 1**\n# \n# Bu program, kullanıcıdan alınan n değeri kadar terimi hesaplar ve ekrana yazdırır. Her terim, i'nin karesi olarak hesaplanır ve ekrana yazdırılır. end=\" \" ifadesi, terimleri yan yana yazdırmak için kullanılır. Ekrana sayıları yazdırma işlemi terim sayısı 10'u geçtiğinde durdurulacaktır.\n# \n# \n# \n# \n# \n# \n# \n# ========================================\n\n\n# While ile yapımı:\nn = int(input(\"Kaç adet terim olacağını yazınız: \"))\ni = 1\n\nwhile i <= n:\n    terim = i * i\n    if n > 10:  # Eğer terim 10'u aşarsa sadece uyarı mesajı ver ve döngüyü durdur\n        print(\"Tekrar deneyin, çünkü terim sayısı 10'u aştı.\")\n        break\n    print(terim, end = \" \")  # Sadece 10 veya daha küçük terimleri yazdırır\n    i += 1\n\n\n#For ile yapımı:\nn = int(input(\"Kaç terim yazdırmak istediğinizi girin: \"))\n\nfor i in range(1, n + 1):\n    terim = i ** 2\n    if n > 10:  # Eğer terim 50'yi aşarsa döngüyü durdur\n        print(\"Tekrar deneyin, çünkü terim sayısı 10'u aştı.\")\n        break\n    print(terim, end=\" \")\n\n\n# ========================================\n# **SORU 2**\n# \n# 12 ile 37 (her iki sayı dahil) arasındaki tek ve çift sayıların toplamını gösteren bir program yazınız\n# \n# ========================================\n\n\nsayi_cift = 0\n\nsayi_tek = 0\n\nfor sayi in range(12,38):\n   if sayi % 2 == 0:\n      sayi_cift = sayi_cift + sayi\n   else:\n      sayi_tek = sayi_tek + sayi\n\nprint(\"Çift sayıların toplamı \",sayi_cift)\nprint(\"Tek sayıların toplamı \",sayi_tek)\n\n\n# ========================================\n# **RANDOM FONKSİYONU**\n# \n# Python'da `random` modülü, rastgele (random) sayılar üretmek ve rasgele seçimler yapmak için kullanılan bir modüldür. Bu modülü kullanarak rastgele sayılar, liste elemanları veya karakter dizileri seçebilirsiniz. İşte `random` modülünü kullanarak bazı örnekler:\n# \n# **Rastgele Sayı Üretme:**\n# \n# ```python\n# import random\n# \n# # 0 ile 1 arasında rastgele bir ondalıklı sayı üretme\n# rasgele_ondalikli = random.random()\n# print(\"Rastgele ondalıklı sayı:\", rasgele_ondalikli)\n# \n# # Belirli bir aralıkta rastgele tam sayı üretme\n# rasgele_tam_sayi = random.randint(1, 10)\n# print(\"Rastgele tam sayı:\", rasgele_tam_sayi)\n# ```\n# \n# **Rastgele Eleman Seçme:**\n# \n# `random` modülünü kullanarak rasgele işlemler gerçekleştirerek, örneğin oyunlar, simülasyonlar veya test senaryoları için rasgele veriler oluşturabilirsiniz.\n# ========================================\n\n\nimport random\n\nliste = [10, 20, 30, 40, 50]\n\n# Liste içinden rastgele bir eleman seçme\nrasgele_eleman = random.choice(liste)\nprint(\"Rastgele seçilen eleman:\", rasgele_eleman)\n\nimport random\nx = random.randint(0,10)\nprint(x)\n\n\nimport random\nx = random.randint(0,10)\n\nwhile x!=5:\n  print(x)\n  x = random.randint(0,10)\n\nprint('tebrikler rastgele sayı 5 oldu')\n\n\n# ========================================\n# # HAFTA 4 DERS 2\n# \n# \n# \n# ========================================\n\n\n\n# ========================================\n# **SORU 3**\n# \n# 1 ile 50 arasında rastgele 5 sayı üretin. Bu sayıları bir listeye ekleyin ve\n# ortalamayı hesaplayın. Hem üretilen sayıları hem de ortalamayı ekrana yazdırın.\n# ========================================\n\n\nimport random\n\n# 1 ile 50 arasında rastgele 5 sayı üretir\nsayilar = []\nfor i in range(5):\n    sayilar.append(random.randint(1, 50))\n\n# Sayıların toplamını hesaplar\ntoplam = 0\nfor sayi in sayilar:\n    toplam += sayi\n\n# Ortalama hesaplar\nortalama = toplam / len(sayilar)\n\n# Sayıları ve ortalamayı ekrana yazdırır\nprint(\"Rastgele üretilen sayılar:\", sayilar)\nprint(\"Sayıların ortalaması:\", ortalama)\n\n\n\n# ========================================\n# **SORU 4**\n# \n# Rastgele üretilen boyutta yıldız karakterinden oluşan dikdörtgen şeklini ekrana yazan program yazın.\n# \n# * Not: Genişlik ve yükseklik değerleri en fazla 20 birim olsun.\n# ========================================\n\n\nimport random\nx=random.randint(1,20)\ny=random.randint(1,20)\n\ni=0\nwhile(i<x):\n  print(\"* \"*y)\n  i+=1\n\n\n# ========================================\n# # HAFTA 4 DERS 3\n# ========================================\n\n\n\n# ========================================\n# **Liste, Tuple, Dictionary**\n# ========================================\n\n\n\n# ========================================\n# *Liste, birden fazla öğeyi tek bir değişkende saklamamıza olanak tanır.\n# \n# *Liste köşeli parantez [] içinde oluşturulur ve öğeler virgülle ayrılır.\n# \n# *Liste üzerinde sayısal işlemler yapılabilir.\n# \n# ========================================\n\n\n#List\n# Alışveriş listesi ve fiyatları\nurunler = [\"Elma\", \"Ekmek\", \"Süt\", \"Peynir\"]\nfiyatlar = [1.5, 2.0, 3.0, 4.5]\n\ntoplam_maliyet = sum(fiyatlar)\nprint(f\"Toplam maliyet: {toplam_maliyet} TL\")\n\n\n# ========================================\n# \n# *Tuple, listeler gibi birden fazla öğeyi tek bir değişkende saklar, ancak değiştirilemez (immutable).\n# \n# *Tuple, parantez () içinde oluşturulur ve öğeler virgülle ayrılır.\n# ========================================\n\n\n#Tuple\n# Kitap bilgileri: (isim, yazar, basım yılı)\nkitaplar = (\n(\"1984\", \"George Orwell\", 1949),\n(\"Savaş ve Barış\", \"Lev Tolstoy\", 1869),\n(\"Bülbülü Öldürmek\", \"Harper Lee\", 1960)\n)\n\nfor kitap in kitaplar:\n    isim, yazar, yil = kitap\n    print(f\"Kitap Adı: {isim}, Yazar: {yazar}, Basım Yılı: {yil}\")\n\n\n# ========================================\n# \n# *Dictionary, anahtar-değer çiftleri saklamamıza olanak tanır.\n# \n# *Dictionary, süslü parantez içinde oluşturulur ve her çift iki nokta : ile ayrılır.\n# ========================================\n\n\n#Dictionary\n# Film bilgileri ve IMDB puanları\nfilmler = {\n\"Inception\": {\"tur\": \"Bilim Kurgu\", \"imdb_puani\": 8.8},\n\"The Godfather\": {\"tur\": \"Suç\", \"imdb_puani\": 9.2},\n\"The Dark Knight\": {\"tur\": \"Aksiyon\", \"imdb_puani\": 9.0}\n}\n\n#items() metodu, dictionary'da her bir anahtar-değer çiftini tuple olarak döndürür.\n#Burada her bir çift, film adı ve film bilgilerini içeren iç sözlükten oluşur.\nfor film, bilgiler in filmler.items():\n print(f\"Film Adı: {film}, Tür: {bilgiler['tur']}, IMDB Puanı: {bilgiler['imdb_puani']}\")\n\n\n# ========================================\n# **SORU 5**\n# \n# Öğrencilerin notlarını ve ortalamayı hesaplayıp başarı durumlarını belirten bir program yazın.\n# \n# \n# *    Her bir öğrencinin isim ve not bilgisini içeren bir liste oluşturun.\n# \n# *   Tüm öğrencilerin notlarının toplamını bulun ve ortalamayı hesaplayın.\n# \n# *   Her öğrencinin notunu kontrol ederek, 85 ve üstü not alanları \"Başarılı\", daha düşük not alanları \"Başarısız\" olarak sınıflandırın.\n# * Toplam not, ortalama not ve her öğrencinin başarı durumu ekrana yazdırın.\n# ========================================\n\n\nogrenciler = [\n    {\"isim\": \"Ahmet\", \"not\": 85},\n    {\"isim\": \"Ayşe\", \"not\": 92},\n    {\"isim\": \"Mehmet\", \"not\": 78},\n    {\"isim\": \"Fatma\", \"not\": 95},\n    {\"isim\": \"Ali\", \"not\": 88}\n]\n\n# Notların toplamını ve ortalamasını hesaplama\ntoplam_not = sum(ogrenci[\"not\"] for ogrenci in ogrenciler)\nortalama_not = toplam_not / len(ogrenciler)\n\nprint(f\"Toplam Not: {toplam_not}\")\nprint(f\"Ortalama Not: {ortalama_not:.2f}\")\n\n# Başarı durumunu yazdırma\nprint(\"\\nÖğrenciler ve Başarı Durumları:\")\nfor ogrenci in ogrenciler:\n    durum = \"Başarılı\" if ogrenci[\"not\"] >= 85 else \"Başarısız\"\n    print(f\"{ogrenci['isim']}: {durum}\")\n\n\n\n# ========================================\n# # Hafta 4 Ders 4\n# ========================================\n\n\n\n# ========================================\n# **SORU 6**\n# \n# Tuple kullanarak bir şehirdeki turistik yerlerin adlarını ve giriş ücretlerini saklayan bir program yazınız.\n# ========================================\n\n\n# Turistik yerler: (yer adı, giriş ücreti)\nturistik_yerler = (\n    (\"Ayasofya\", 50),\n    (\"Topkapı Sarayı\", 40),\n    (\"Sultanahmet Camii\", 0),\n    (\"Galata Kulesi\", 30)\n)\n\n# Turistik yer bilgilerini yazdırma\nprint(\"Şehirdeki Turistik Yerler ve Giriş Ücretleri:\")\nfor yer, ucret in turistik_yerler:\n    print(f\"{yer}: Giriş Ücreti {ucret} TL\")\n\n\n\n# ========================================\n# **SORU 7**\n# \n# Bir ürünün stok bilgilerini saklayan bir program yazınız.\n# \n# *   Ürünlerin fiyat ve stok bilgilerini içeren bir dictionary oluşturun.\n# *   Toplam stok değerini hesaplayın. Her bir ürünün fiyatı ile stok miktarını çarpıp toplam değeri bulun.\n# \n# *   Ürün bilgilerini ekrana yazdırın.\n# *   Her bir ürünün adını, fiyatını ve stok miktarını yazdırın.\n# \n# ========================================\n\n\n# Ürün bilgileri dictionary\nurunler = {\n    \"elma\": {\"fiyat\": 3.5, \"stok\": 100},\n    \"muz\": {\"fiyat\": 2.0, \"stok\": 150},\n    \"portakal\": {\"fiyat\": 4.0, \"stok\": 80},\n    \"kiraz\": {\"fiyat\": 5.0, \"stok\": 60}\n}\n\n# Toplam stok değerini hesaplama\ntoplam_stok_degeri = 0\nfor urun, bilgiler in urunler.items():  # items() ile anahtar ve değerleri alıyoruz\n    toplam_stok_degeri += bilgiler[\"fiyat\"] * bilgiler[\"stok\"]\n\nprint(f\"Toplam Stok Değeri: {toplam_stok_degeri:.2f} TL\")\n\n# Ürün bilgilerini yazdırma\nprint(\"\\nÜrün Bilgileri:\")\nfor urun, bilgiler in urunler.items():  # Yine items() ile anahtar ve değerleri alıyoruz\n    fiyat = bilgiler[\"fiyat\"]\n    stok = bilgiler[\"stok\"]\n    print(f\"{urun.capitalize()} - Fiyat: {fiyat} TL, Stok: {stok}\")\n"
  }
};
