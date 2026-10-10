# Nişan Dəvətnaməsi (Render Static Site)

Bu layihə **MyInviteDay** üçün hazırlanmış mobil-first, zərif və interaktiv nişan dəvətnaməsi React + TypeScript şablonudur.

## Render.com üzərində Yerləşdirmə (Static Site)

Layihəni Render-də **Static Site** kimi yayımlamaq üçün aşağıdakı parametrlərdən istifadə edin:

- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**: Heç bir environment variable tələb olunmur (boş saxlayın).

### SPA Marşrutları və Yeniləmə (Refresh / 404 Qoruması)

Səhifə yeniləndikdə və ya URL parametrləri (məsələn, `?guest=Ad+Soyad`) ilə açıldıqda 404 xətası yaranmaması üçün:
- Layihə kökündə `render.yaml` konfiqurasiya faylı əlavə edilib (`source: /*` -> `destination: /index.html`).
- Eyni zamanda `public/_redirects` faylı vasitəsilə SPA rewrite qaydası təmin olunub (`/* /index.html 200`).
- Render Dashboard üzərindən əl ilə qurulduqda: **Redirects/Rewrites** bölməsində `/*` marşrutunu `/index.html` ünvanına **Rewrite** kimi təyin etmək kifayətdir.

### Media Faylları

Bütün real media faylları `public` qovluğunda yerləşir və build zamanı birbaşa `dist` qovluğunun kök ünvanına çıxarılır:
- `/engagement-cover.webp` — Açılış videosu yüklənənədək poster və fallback şəkli
- `/intro-opening.webm` — Ekrana toxunduqda başlayan açılış animasiyası
- `/background-motion.webm` — Əsas məzmun boyunca sabit (`position: fixed`) arxa fon videosu

### Lokal Yoxlama Əmrləri

```bash
# Tip yoxlaması
npx tsc --noEmit

# İstehsalat (production) build
npm run build

# Nəticənin lokal önbaxışı
npm run preview
```
