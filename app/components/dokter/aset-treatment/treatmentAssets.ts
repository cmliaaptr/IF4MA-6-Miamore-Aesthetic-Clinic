import type { TreatmentAsset } from "./TreatmentAssetTypes";

export const treatmentAssets: TreatmentAsset[] = [
  {
    slug: "hydraglow-facial",
    name: "HydraGlow Facial",
    category: "Facial",
    categoryTone: "bg-violet-500",
    image: "/images/brightening.jpg",
    description:
      "Perawatan untuk membersihkan, menghidrasi, dan mencerahkan kulit secara menyeluruh.",
    duration: "60 Menit",
    steps: [
      {
        title: "Cleansing",
        product: "Gentle Facial Cleanser",
        dosage: "2 pump",
        usage: "Ratakan pada wajah lembap selama 60 detik, lalu bilas bersih.",
      },
      {
        title: "Hydrating Toner",
        product: "Hydra Balance Toner",
        dosage: "4-5 tetes",
        usage: "Tap ringan ke seluruh wajah sampai meresap.",
      },
      {
        title: "Serum Glow",
        product: "Niacinamide Glow Serum",
        dosage: "3 tetes",
        usage: "Aplikasikan merata pada wajah dan leher.",
      },
      {
        title: "Masker",
        product: "Hydra Jelly Mask",
        dosage: "20 gram bubuk + 40 ml air",
        usage: "Diamkan 12-15 menit, lalu angkat perlahan.",
      },
      {
        title: "Moisturizer",
        product: "Barrier Moist Cream",
        dosage: "1 ruas jari",
        usage: "Kunci hidrasi dengan pijatan ringan.",
      },
      {
        title: "Sunscreen",
        product: "Daily UV Shield SPF 50",
        dosage: "2 ruas jari",
        usage: "Gunakan sebagai langkah akhir pada treatment pagi/siang.",
      },
    ],
  },
  {
    slug: "acne-treatment",
    name: "Acne Treatment",
    category: "Acne Care",
    categoryTone: "bg-emerald-500",
    image: "/images/acne.jpg",
    description:
      "Perawatan khusus untuk kulit berjerawat, mengurangi peradangan dan mencegah jerawat baru.",
    duration: "75 Menit",
    steps: [
      {
        title: "Cleansing",
        product: "Acne Gentle Cleanser",
        dosage: "2 pump",
        usage: "Bersihkan wajah tanpa menggosok area radang terlalu kuat.",
      },
      {
        title: "Soft Exfoliation",
        product: "BHA Clarifying Toner",
        dosage: "3-4 tetes",
        usage: "Aplikasikan tipis pada area berminyak dan komedo.",
      },
      {
        title: "Extraction",
        product: "Sterile Comedo Tools",
        dosage: "Sesuai kebutuhan",
        usage: "Lakukan ekstraksi pada komedo matang dengan tekanan minimal.",
      },
      {
        title: "Calming Serum",
        product: "Centella Acne Serum",
        dosage: "3 tetes",
        usage: "Fokuskan pada area kemerahan dan bekas jerawat.",
      },
      {
        title: "LED Therapy",
        product: "Blue LED Acne Mode",
        dosage: "10 menit",
        usage: "Gunakan pelindung mata dan arahkan merata ke area wajah.",
      },
      {
        title: "Acne Mask",
        product: "Tea Tree Clay Mask",
        dosage: "1 spatula",
        usage: "Diamkan 10 menit, hindari area mata dan bibir.",
      },
      {
        title: "Spot Care",
        product: "Acne Spot Gel",
        dosage: "Tipis di titik jerawat",
        usage: "Gunakan hanya pada jerawat aktif.",
      },
      {
        title: "Sunscreen",
        product: "Oil Control SPF 50",
        dosage: "2 ruas jari",
        usage: "Aplikasikan merata untuk melindungi kulit pasca tindakan.",
      },
    ],
  },
  {
    slug: "brightening-facial",
    name: "Brightening Facial",
    category: "Brightening",
    categoryTone: "bg-rose-500",
    image: "/images/flek.jpg",
    description:
      "Perawatan yang membantu mencerahkan kulit kusam dan menyamarkan noda hitam.",
    duration: "60 Menit",
    steps: [
      {
        title: "Cleansing",
        product: "Brightening Cleanser",
        dosage: "2 pump",
        usage: "Bersihkan wajah sampai sisa sunscreen dan makeup terangkat.",
      },
      {
        title: "Vitamin Toner",
        product: "Vitamin C Toner",
        dosage: "5 tetes",
        usage: "Tap ringan untuk mempersiapkan kulit.",
      },
      {
        title: "Bright Serum",
        product: "Tranexamic Bright Serum",
        dosage: "3 tetes",
        usage: "Fokuskan pada area kusam dan hiperpigmentasi.",
      },
      {
        title: "Massage Cream",
        product: "Pearl Massage Cream",
        dosage: "1 spatula",
        usage: "Pijat lembut 8-10 menit mengikuti arah lifting.",
      },
      {
        title: "Bright Mask",
        product: "Vitamin Radiance Mask",
        dosage: "1 sachet",
        usage: "Diamkan 12 menit lalu bersihkan dengan sponge lembap.",
      },
      {
        title: "Sunscreen",
        product: "Tone Up SPF 50",
        dosage: "2 ruas jari",
        usage: "Ratakan sampai tidak ada garis putih berlebih.",
      },
    ],
  },
  {
    slug: "chemical-peeling",
    name: "Chemical Peeling",
    category: "Peeling",
    categoryTone: "bg-orange-400",
    image: "/images/co2 fractional.jpg",
    description:
      "Mengangkat sel kulit mati dan membantu mengatasi flek, bekas jerawat, dan tekstur kulit tidak rata.",
    duration: "45 Menit",
    steps: [
      {
        title: "Pre Cleanse",
        product: "pH Balance Cleanser",
        dosage: "2 pump",
        usage: "Pastikan kulit bersih dan kering sebelum peeling.",
      },
      {
        title: "Skin Prep",
        product: "Pre Peel Solution",
        dosage: "Secukupnya pada kapas",
        usage: "Usapkan merata untuk menurunkan minyak permukaan.",
      },
      {
        title: "Peeling",
        product: "AHA/BHA Peel",
        dosage: "1-2 ml",
        usage: "Aplikasikan 2-5 menit sesuai toleransi kulit.",
      },
      {
        title: "Neutralizer",
        product: "Peel Neutralizer",
        dosage: "2 ml",
        usage: "Netralisir menyeluruh sebelum kulit terasa terlalu panas.",
      },
      {
        title: "Recovery",
        product: "Cica Recovery Cream",
        dosage: "1 ruas jari",
        usage: "Tutup dengan krim penenang dan edukasi home care.",
      },
    ],
  },
  {
    slug: "microneedling",
    name: "Microneedling",
    category: "Rejuvenation",
    categoryTone: "bg-sky-500",
    image: "/images/anti-aging.jpeg",
    description:
      "Merangsang produksi kolagen untuk memperbaiki tekstur kulit, pori-pori, dan bekas jerawat.",
    duration: "60 Menit",
    steps: [
      {
        title: "Cleansing",
        product: "Sterile Cleanser",
        dosage: "2 pump",
        usage: "Bersihkan area tindakan dan keringkan dengan kasa steril.",
      },
      {
        title: "Numbing",
        product: "Anesthetic Cream",
        dosage: "Tipis merata",
        usage: "Diamkan 20-30 menit lalu bersihkan total.",
      },
      {
        title: "Disinfection",
        product: "Skin Antiseptic",
        dosage: "Secukupnya",
        usage: "Usapkan pada seluruh area tindakan.",
      },
      {
        title: "Needling Serum",
        product: "Hyaluronic Repair Serum",
        dosage: "1 ampoule",
        usage: "Gunakan sebagai slip saat microneedling.",
      },
      {
        title: "Microneedling",
        product: "Sterile Needle Cartridge",
        dosage: "0.25-1.0 mm",
        usage: "Sesuaikan kedalaman dengan area dan kondisi kulit.",
      },
      {
        title: "Soothing Mask",
        product: "Post Needling Mask",
        dosage: "1 sheet",
        usage: "Diamkan 10-15 menit untuk menenangkan kulit.",
      },
      {
        title: "Recovery Cream",
        product: "Barrier Recovery Cream",
        dosage: "1 ruas jari",
        usage: "Aplikasikan tipis tanpa pijatan keras.",
      },
    ],
  },
  {
    slug: "anti-aging-facial",
    name: "Anti-Aging Facial",
    category: "Anti-Aging",
    categoryTone: "bg-violet-500",
    image: "/images/why-product.jpg",
    description:
      "Perawatan untuk mengurangi tanda-tanda penuaan seperti garis halus dan kerutan.",
    duration: "60 Menit",
    steps: [
      {
        title: "Cleansing",
        product: "Creamy Anti-Aging Cleanser",
        dosage: "2 pump",
        usage: "Bersihkan wajah dengan gerakan lifting lembut.",
      },
      {
        title: "Firming Toner",
        product: "Peptide Firming Toner",
        dosage: "5 tetes",
        usage: "Tap sampai kulit terasa lembap.",
      },
      {
        title: "Peptide Serum",
        product: "Multi Peptide Serum",
        dosage: "3 tetes",
        usage: "Fokuskan pada garis halus dan area kering.",
      },
      {
        title: "Lifting Massage",
        product: "Collagen Massage Cream",
        dosage: "1 spatula",
        usage: "Pijat 10 menit mengikuti arah kontur wajah.",
      },
      {
        title: "Collagen Mask",
        product: "Firming Collagen Mask",
        dosage: "1 sheet",
        usage: "Diamkan 15 menit lalu tepuk sisa essence.",
      },
      {
        title: "Eye Cream",
        product: "Peptide Eye Cream",
        dosage: "Sebesar biji beras tiap sisi",
        usage: "Aplikasikan di tulang orbital dengan jari manis.",
      },
    ],
  },
  {
    slug: "laser-rejuvenation",
    name: "Laser Rejuvenation",
    category: "Laser",
    categoryTone: "bg-red-500",
    image: "/images/treatment-hero.png",
    description:
      "Perawatan dengan teknologi laser untuk meremajakan kulit dan menyamarkan noda hitam.",
    duration: "30 Menit",
    steps: [
      {
        title: "Cleansing",
        product: "Laser Prep Cleanser",
        dosage: "2 pump",
        usage: "Bersihkan wajah dan pastikan tidak ada residu produk.",
      },
      {
        title: "Eye Protection",
        product: "Laser Safety Goggles",
        dosage: "1 pasang",
        usage: "Pastikan mata pasien dan operator terlindungi.",
      },
      {
        title: "Laser Pass",
        product: "Rejuvenation Laser Mode",
        dosage: "Sesuai parameter dokter",
        usage: "Lakukan pass merata sesuai area indikasi.",
      },
      {
        title: "Cooling",
        product: "Cooling Gel Mask",
        dosage: "1 layer tipis",
        usage: "Diamkan 10 menit untuk menenangkan kulit.",
      },
    ],
  },
  {
    slug: "hydrafacial-premium",
    name: "Hydrafacial Premium",
    category: "Premium",
    categoryTone: "bg-amber-500",
    image: "/images/hero-landing.JPG",
    description:
      "Perawatan premium dengan hidrasi mendalam untuk kulit sehat, kenyal, dan bercahaya.",
    duration: "75 Menit",
    steps: [
      {
        title: "Deep Cleanse",
        product: "Premium Foam Cleanser",
        dosage: "2 pump",
        usage: "Bersihkan wajah dan leher sebelum tindakan.",
      },
      {
        title: "Aqua Peel",
        product: "Hydra Peel Solution",
        dosage: "15 ml",
        usage: "Gunakan pada mode suction rendah sampai sedang.",
      },
      {
        title: "Infusion",
        product: "Hyaluronic Infusion Serum",
        dosage: "1 ampoule",
        usage: "Infuskan serum pada area wajah secara merata.",
      },
      {
        title: "Booster",
        product: "Premium Glow Booster",
        dosage: "3 tetes",
        usage: "Aplikasikan pada area kusam dan dehidrasi.",
      },
      {
        title: "Oxygen Spray",
        product: "Oxygen Hydration Mist",
        dosage: "3 menit",
        usage: "Semprotkan dengan jarak aman dari wajah.",
      },
      {
        title: "Premium Mask",
        product: "Gold Hydrogel Mask",
        dosage: "1 sheet",
        usage: "Diamkan 15 menit untuk efek plumping.",
      },
      {
        title: "Moisturizer",
        product: "Premium Barrier Cream",
        dosage: "1 ruas jari",
        usage: "Kunci kelembapan dengan pijatan ringan.",
      },
      {
        title: "Sunscreen",
        product: "Glow Shield SPF 50",
        dosage: "2 ruas jari",
        usage: "Gunakan sebagai perlindungan akhir.",
      },
    ],
  },
];

export const treatmentAssetCategories = [
  "Semua Kategori",
  ...Array.from(new Set(treatmentAssets.map((asset) => asset.category))),
];
