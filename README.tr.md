<div align="center">
  <img src="./assets/logo.svg" alt="SpecForge Logo" width="112" height="112" />
  <h1>SpecForge — Yapay Zekâ Destekli Spesifikasyon Odaklı Geliştirme</h1>
  <p><strong>Sıfır Halüsinasyon. Sıfır Spagetti Kod. Spesifikasyonlar Onaylanmadan Tek Satır Kod Yok.</strong></p>
  <p>
    <a href="./README.md">🇬🇧 English</a> &nbsp;|&nbsp;
    <a href="./README.fr.md">🇫🇷 Français</a> &nbsp;|&nbsp;
    <strong>🇹🇷 Türkçe</strong>
  </p>
</div>

---

## Neden SpecForge?

Yapay zekâ kodlama ajanları belirsiz bir istemle (prompt) doğrudan kod yazmaya başladığında uç noktalar (endpoint) uydurur, sınır durumlarını (edge cases) atlar, isimlendirmeleri karıştırır ve bakımı imkânsız devasa dosyalar üretir.

**SpecForge**, kullandığınız yapay zekâ asistanını (**Google Antigravity, Cursor, Claude Code, Windsurf, GitHub Copilot**) **Spec-Driven AI Development** disipliniyle çalışan kıdemli bir Yazılım Mimarına dönüştürür:

1. **Akıllı Teknik Kilit (`PreToolUse` Hook + Global Kural)**: Yeni başlayan her projede `docs/` dokümantasyonu ve `AGENTS.md` anayasası %100 tamamlanıp onaylanmadan uygulama kodu yazılması **fiziksel olarak engellenir**.
2. **Çok Modlu CTO Keşif Motoru (`spec-init`)**: Klasöre attığınız PDF'leri, ders/müşteri şartnamelerini, fiyat tablolarını ve Figma ekran görüntülerini (`docs/maquettes/`) okur; paylaştığınız harici API veya referans site linklerini inceler; projenize en uygun teknoloji yığınını (stack) ve mimariyi önerir; **kendi dilinizde (Türkçe, Fransızca, İngilizce vb.)** kaldığı yerden devam edebilen **4 aşamalı bir mülakat** yürütür.
3. **Tam Yaşam Döngüsü Yönetimi**: Dikey dilimler halinde kodlama (`spec-slice`), proje ortasında ADR kayıtlı özellik ekleme (`spec-evolve`) ve canlıya çıkış öncesi güvenlik denetimi (`spec-audit`).
4. **Tüm Platform ve Teknolojilerle Uyumlu**: **Web/SaaS, Mobil (Flutter/iOS/Android), Masaüstü (Tauri/Electron/.NET), Backend API ve CLI** projeleri için TypeScript, Dart/Flutter, Python, Java/Spring Boot, C#/.NET, Go ve Rust'a özel kod kuralları ve tek satırlık `verify` doğrulama komutları üretir.

---

## Global Kurulum (1 Dakikada)

### ✨ Seçenek 1 — Tek Tıkla Yapay Zekâ Promptu ile Otomatik Kurulum (Kopyala & Yapıştır)

Terminal komutlarıyla uğraşmak istemiyor musunuz? **Aşağıdaki istemi (prompt) kopyalayıp kullandığınız yapay zekâ asistanına** (Antigravity, Cursor, Claude Code veya Windsurf) **yapıştırın**; kurulumu sizin yerinize yapsın ve sistemi anlatsın:

```text
https://github.com/Ismael-sang98/spec-forge-skill.git adresindeki SpecForge eklentisini ve yeteneklerini (skills) bilgisayarıma global olarak kur:
1. https://github.com/Ismael-sang98/spec-forge-skill.git deposunu geçici bir klasöre klonla.
2. İşletim sistemimi algıla ve macOS/Linux ise "./install.sh", Windows ise "powershell -ExecutionPolicy Bypass -File .\install.ps1" komutunu çalıştırarak tam eklentiyi, Smart Gate kilidini ve 4 skill'i (spec-init, spec-slice, spec-evolve, spec-audit) global olarak yükle.
3. Dosyaların başarıyla kurulduğunu doğrula, geçici klon klasörünü temizle ve ardından bana Türkçe olarak SpecForge'un nasıl çalıştığını, "Spesifikasyon Olmadan Kod Yok" kilidinin projelerimi nasıl koruduğunu, 4 skill'in ne zaman kullanıldığını açıkla ve IDE'mi bir kez yeniden başlatmamı hatırlat.
```

---

### 🛠️ Seçenek 2 — Terminal ile Manuel Kurulum (Tam Eklenti + Akıllı Kilit Hook)

**macOS ve Linux:**
```bash
git clone https://github.com/Ismael-sang98/spec-forge-skill.git
cd spec-forge-skill
chmod +x install.sh && ./install.sh
```

**Windows (PowerShell):**
```powershell
git clone https://github.com/Ismael-sang98/spec-forge-skill.git
cd spec-forge-skill
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

**Veya doğrudan Antigravity CLI ile:**
```bash
agy plugin install ./spec-forge-skill
```

> **Not:** Kurulumdan sonra global eklentinin, `PreToolUse` kilidinin ve 4 yeteneğin (skill) yüklenmesi için yapay zekâ IDE'nizi bir kez yeniden başlatın.

### 🌐 Seçenek 3 — Evrensel `npx skills` CLI (Cursor, Claude Code, Windsurf, Copilot, Antigravity)

```bash
npx skills add Ismael-sang98/spec-forge-skill -g
```

---

## Yaşam Döngüsünü Yöneten 4 Skill

| Skill | Ne Zaman Kullanılır? | Ne Yapar? |
| :--- | :--- | :--- |
| **`spec-init`** | Yeni bir projeye başlarken (veya mevcut bir projeyi dokümante ederken) | Yerel dosyaları/tasarımları ve URL linklerini tarar, CTO düzeyinde `(Recommended)` önerilerle **4 Aşamalı** sorular sorar, ilerlemeyi `docs/.spec-state.json` içinde saklar, **sıfır `[TODO]`** içeren eksiksiz `docs/` paketini + ekip anayasalarını (`AGENTS.md`, `.cursorrules`, `CLAUDE.md`, `.env.example`, `verify`) üretir ve `READY_TO_CODE` kilidini açar. |
| **`spec-slice`** | Özellikleri adım adım kodlarken | `docs/07_IMPLEMENTATION_PLAN.md` içindeki sıradaki `[ ]` dikey dilimi alır; Doğrulama -> Veritabanı -> Servis/ACID -> Birim Testleri -> Arayüz sırasıyla kodlar, `verify` komutunu çalıştırır, `[x]` olarak işaretler ve ilerleme raporu sunar. |
| **`spec-evolve`** | Proje devam ederken yeni özellik veya kural değişikliği gerektiğinde | Kod ile doküman arasındaki kopukluğu önler: Kod yazmadan **önce** `docs/adr/NNNN-*.md` altında mimari karar kaydı oluşturur, etkilenen `docs/` dosyalarını ve uygulama planını günceller. |
| **`spec-audit`** | Kalite kontrolü ve canlıya (production) geçiş öncesi | Kodun dokümanlara uyumunu (`any`/`dynamic` yasağı, dosya satır sınırı, RBAC yetkileri, ACID işlemler) denetler, `verify` testlerini koşar ve `docs/PROD_CONFIG.md` güvenlik listesini %100 kontrol eder. |

---

## Akıllı Kilit (*Smart Gate*) Global Olarak Nasıl Çalışır?

SpecForge bilgisayarınıza global kurulduğunda `scripts/spec-gate.mjs` açtığınız her klasörü akıllıca analiz eder:

- **Sıfırdan Yeni Proje (`< 3` kod dosyası, `docs/` yok)**: Kod yazımını otomatik durdurur (`deny`) ve yapay zekâyı önce **`spec-init`** çalıştırmaya yönlendirir.
- **Devam Eden Tasarım (`docs/.spec-state.json` = `IN_PROGRESS`)**: `docs/` ve kök anayasa dosyalarının yazılmasına izin verir; ancak 4. Aşama onaylanıp `READY_TO_CODE` olana kadar uygulama kodunu kilitli tutar.
- **Spesifikasyonu Tamamlanmış Proje (`READY_TO_CODE` veya `docs/01_PRD.md` + `07_IMPLEMENTATION_PLAN.md` mevcut)**: `AGENTS.md` kuralları altında akıcı geliştirmeye izin verir.
- **Mevcut Eski (Legacy) Kod Tabanı (`>= 3` kod dosyası var, `docs/` yok)**: Sizi zorla kilitlemez; onay sorarak ister **`spec-init` (Geriye Dönük Dokümantasyon)** başlatmanıza ister kök dizine `.spec-ignore` ekleyerek hızlı düzeltme yapmanıza olanak tanır.

---

## Üretilen Proje Mimarisi (14 Dokümanlık Tam Paket + Ekip Koruma Paketi)

*(Küçük projeler, hackathonlar veya üniversite ders projeleri için başlangıçta **8 Dokümanlık Lean / MVP / Akademik Profil** seçeneği de sunulur!)*

```text
Projeniz/
├── AGENTS.md                          # Proje Anayasası ve Stack'e Özel 12 Altın Kural
├── .cursorrules                       # Cursor kullanan ekip arkadaşları için otomatik kural aynası
├── CLAUDE.md                          # Claude Code kullanan ekip arkadaşları için kural aynası
├── .env.example                       # Açıklamalı ortam değişkenleri şablonu (gerçek şifre içermez)
└── docs/
    ├── .spec-state.json               # Kaldığı yerden devam etme ve READY_TO_CODE kilit durumu
    ├── README.md                      # Merkezi dokümantasyon indeksi
    ├── GLOSSARY.md                    # Ortak Alan Dili (Türkçe Terim <-> İngilizce Kod Karşılığı)
    ├── ERROR_CATALOG.md               # Standart hata zarfı ve hata kodları kataloğu
    ├── 01_PRD.md                      # İş vizyonu, personalar, değişmez kurallar ve net formüller
    ├── 02_TRD_TECHNICAL_SPEC.md       # Mimari, teknoloji yığını, API sözleşmeleri ve ACID sınırları
    ├── 03_APPFLOW.md                  # Ekran/komut haritası, akış şemaları ve Durum Makineleri (FSM)
    ├── 04_DATABASE_SCHEMA.md          # Mermaid ERD, tam ORM/SQL şeması, indeksler ve ilişkiler
    ├── 05_UI_UX_DESIGN.md             # Tasarım token'ları ve ekran eşleşmeleri (veya 05_INTERFACE_CONTRACT.md)
    ├── 06_CODING_RULES.md             # Temiz mimari katmanları, <= 200 satır sınırı ve yasaklı kalıplar
    ├── 07_IMPLEMENTATION_PLAN.md      # [ ] / [x] onay kutulu dikey dilim uygulama yol haritası
    ├── 08_TESTING_STRATEGY.md         # Test piramidi, test fabrikaları ve kapsama kuralları
    ├── 09_RBAC_PERMISSIONS.md         # Rol x Kaynak CRUD yetki matrisi
    ├── PROD_CONFIG.md                 # 6 sütunlu canlıya geçiş ve güvenlik sıkılaştırma denetimi
    ├── adr/                           # Değiştirilemez Mimari Karar Kayıtları (ADR)
    │   └── 0001-stack-and-architecture.md
    └── maquettes/                     # İsteğe bağlı Figma çıktıları / ekran görüntüleri
```

---

## Lisans

[MIT Lisansı](./LICENSE) altında açık kaynak olarak sunulmuştur — ekip arkadaşlarınızla ve sınıf arkadaşlarınızla özgürce paylaşabilirsiniz!
