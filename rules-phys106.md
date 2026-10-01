# PHYSICS 106 (PHYSICS 2) - DEVELOPMENT RULES

Bu kurallar, ODTÜ Visual Learn platformundaki `phys106-physics-2` modülü için özel olarak tanımlanmıştır. Tüm ajanlar (Özellikle Ajan 1 ve Ajan 2) bu kurallara uymak ZORUNDADIR.

## 1. Fiziksel Sabitler ve Birimler (SI)
Tüm fiziksel hesaplamalarda aşağıdaki sabitler ve değişken isimleri kullanılmalıdır:
- `k_e = 8.9875517923e9` (Coulomb sabiti, $N \cdot m^2 / C^2$)
- `epsilon_0 = 8.8541878128e-12` (Boşluğun elektriksel geçirgenliği, $F / m$)
- `mu_0 = 4 * Math.PI * 1e-7` (Boşluğun manyetik geçirgenliği, $T \cdot m / A$)
- `e = 1.602176634e-19` (Elementer yük, $C$)
- Aksi belirtilmedikçe kütle `kg`, uzaklık `m`, yük `C`, zaman `s` cinsinden tutulacaktır. UI üzerinde (gösterim amacıyla) `cm`, `\mu C` gibi önekler kullanılabilir ancak state içinde daima SI temel birimleri tutulmalıdır.

## 2. Renk Kodlaması (Mintlify Uyumlu)
Tasarımda kavramsal tutarlılığı sağlamak adına standart renkler:
- **Pozitif Yük / Elektrik Alan Vektörü (+):** Rose / Kırmızı (`#ef4444` veya Tailwind `rose-500`)
- **Negatif Yük (-):** Mavi (`#3b82f6` veya Tailwind `blue-500`)
- **Manyetik Alan (B):** Zümrüt / Yeşil (`#10b981` veya Tailwind `emerald-500`)
- **Akım (I) / Hız (v):** Amber / Turuncu (`#f59e0b` veya Tailwind `amber-500`)
- **Kuvvet (F):** Mor (`#8b5cf6` veya Tailwind `violet-500`)

## 3. Görselleştirme Altyapısı
- **3D Simülasyonlar:** Gauss Yasası (silindirik, küresel simetri) ve karmaşık Manyetik Alan topolojileri ZORUNLU olarak `@react-three/fiber` ve `@react-three/drei` ile 3 boyutlu render edilecektir.
- **2D Şemalar:** Basit nokta yük etkileşimleri, doğru akım (DC) devreleri ve kesit görünümleri için `mafs`, `d3` veya `lucide-react` destekli ikonlar kullanılabilir.
- Her simülasyonda mutlaka eksenleri belirten oklar veya grid sistemi bulunmalıdır (x, y, z eksenleri).

## 4. Matematiksel Modeller
- `src/lib/types/` altında vektör işlemleri için kendi katı veri yapılarımızı (örn. `Vector3D`) veya `three.js` in `Vector3` sınıfını Typescript ile modelleyin.
- Ajan 1'in modelleme yaparken alan şiddetlerinin sonsuza gitmemesi için epsilon payı eklemesine (örn. $1 / (r^2 + \epsilon)$) dikkat edilmelidir, aksi takdirde render çöker.

KULLANICININ VERDİĞİ TEMEL 4-AJAN KURALI (rules.md) GEÇERLİLİĞİNİ KORUR.
