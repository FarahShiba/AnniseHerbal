import type { Product } from "../types";

import mpr1 from "../assets/MPR1.png";
import mprDesc1 from "../assets/MPRdesc1.1.jpeg";
import mprDesc2 from "../assets/MPRdesc2.jpeg";
import hemo1 from "../assets/HemoClear1.png";
import hemoDesc1 from "../assets/HemoCleardesc1.jpeg";
import hemoDesc2 from "../assets/HemoCleardesc2.jpeg";
import hemoDesc3 from "../assets/HemoCleardesc3.jpeg";
import skin1 from "../assets/Skincare1.png";
import skinDesc1 from "../assets/Skincaredesc1.jpeg";
import skinDesc2 from "../assets/skincaredesc2.jpeg";
import progest1 from "../assets/Progest1.png";
import progestDesc1 from "../assets/Progestdesc1.jpeg";
import progestDesc2 from "../assets/Progestdesc2.jpeg";
import nozze1 from "../assets/nozzeDewasa1.png";
import fluxent1 from "../assets/fluxent1.png";
import fluxentDesc1 from "../assets/Fluxentdesc1.jpeg";
import fluxentKids1 from "../assets/fluxentKids1.png";
import fluxentKidsDesc1 from "../assets/Fluxentkidsdesc1.jpeg";
import respiroKids1 from "../assets/respirokids1.png";
import respiroKidsDesc1 from "../assets/RespiroKidsdesc1.jpeg";
import respiroKidsDesc2 from "../assets/RespiroKidsdesc2.2.jpeg";

export const translations = {
  id: {
    nav: {
      home: "Beranda",
      shop: "Belanja",
      story: "Tentang Kami",
      resources: "Edukasi",
      contact: "Kontak",
    },
    hero: {
      s1_title: "Essential Oil Alami",
      s1_sub: "Solusi Perawatan Keluarga",
      s1_desc:
        "100% Murni. Diformulasikan oleh praktisi bersertifikat sejak 2005.",
      s1_btn: "Belanja Sekarang",
      s2_title: "Bebas Nyeri Otot",
      s2_sub: "Max Pain Relief",
      s2_desc:
        "Redakan pegal, nyeri sendi, dan kram otot dengan kekuatan alami rempah pilihan.",
      s2_btn: "Lihat Produk",
      s3_title: "Perlindungan Si Kecil",
      s3_sub: "Kids Series",
      s3_desc:
        "Formula lembut & aman untuk menjaga pernapasan dan kesehatan anak Anda.",
      s3_btn: "Lihat Kids Series",
    },
    trust: {
      t1: "100% Alami",
      t1_desc: "Tanpa bahan kimia berbahaya",
      t2: "Praktisi Ahli",
      t2_desc: "Diformulasi founder bersertifikat",
      t3: "Sejak 2005",
      t3_desc: "Terpercaya selama 20 tahun",
      t4: "Aman Keluarga",
      t4_desc: "Di racik khusus untuk dewasa & anak",
    },
    section: {
      best_seller: "Koleksi Terlaris",
      best_seller_sub:
        "Produk favorit keluarga untuk mengatasi berbagai keluhan kesehatan sehari-hari secara alami.",
      view_all: "Lihat Semua Produk",
      how_to: "Cara Menggunakan",
      how_to_sub:
        "Dapatkan manfaat maksimal dengan metode penggunaan yang tepat dan aman.",
      story_title: "Dibalik Setiap Tetes Annise Herbal",
      story_desc:
        "Setiap formulasi dikembangkan berdasarkan prinsip aromatherapy, pengobatan tradisional, dan pengalaman praktik lebih dari dua dekade.",
      read_story: "Baca Cerita Kami",
      help: "Butuh bantuan memilih produk?",
      chat: "Chat via WhatsApp",
    },
    shop: {
      title: "Belanja Essential Oil",
      sub: "Temukan solusi alami untuk setiap kebutuhan keluarga Anda.",
      add: "+ Keranjang",
      detail: "Detail",
    },
    product: {
      benefits: "Manfaat Utama",
      composition: "Komposisi Utama",
      usage: "Cara Pakai",
      back: "Kembali ke Belanja",
      add_cart: "Masukkan Keranjang",
      ask_wa: "Tanya via WA",
      caution: "Peringatan",
    },
    cart: {
      title: "Keranjang Belanja",
      empty: "Keranjang Anda kosong",
      empty_sub: "Yuk, mulai belanja produk kesehatan alami!",
      checkout: "Checkout Sekarang",
      subtotal: "Subtotal",
    },
    checkout: {
      title: "Checkout",
      step1: "Alamat Pengiriman",
      step2: "Metode Pengiriman",
      step3: "Metode Pembayaran",
      next_ship: "Lanjut ke Pengiriman",
      next_pay: "Lanjut Pembayaran",
      pay_now: "Bayar Sekarang",
      back: "Kembali",
      summary: "Ringkasan Pesanan",
      total: "Total",
      success_title: "Pembayaran Berhasil!",
      success_desc:
        "Terima kasih telah berbelanja di Annise Herbal. Pesanan Anda akan segera diproses dan dikirim.",
      home_btn: "Kembali ke Beranda",
    },
    search: {
      placeholder: "Cari produk, keluhan, atau manfaat...",
      popular: "Pencarian Populer",
      no_result: "Tidak ada produk yang ditemukan.",
    },
    footer: {
      text: "Solusi perawatan alami terpercaya untuk keluarga Indonesia sejak 2005.",
      privacy: "Kebijakan Privasi",
      terms: "Syarat & Ketentuan",
    },
    story: {
      title: "Cerita Annise Herbal",
      sub: "Membangun kesehatan keluarga Indonesia dengan kekuatan alam sejak 2005.",
      about_title: "Tentang Kami",
      about_text1:
        "Annise Herbal adalah brand aromatherapy dan perawatan kesehatan berbasis 100% bahan alami yang dikembangkan untuk membantu menjaga keseimbangan tubuh secara alami dan aman.",
      about_text2:
        "Didirikan pada tahun 2005, kami telah menggunakan lebih dari 60 jenis Essential Oil pilihan yang berasal dari berbagai negara dan memenuhi standar internasional.",
      commitment_title: "Komitmen Kami",
      founder_title: "Founder & Sertifikasi",
      cert_title: "Sertifikasi & Pelatihan",
      commitments: [
        "Bahan alami berkualitas",
        "Keamanan pengguna",
        "Solusi kesehatan alami",
        "Praktisi berpengalaman",
      ],
    },
    resources: {
      title: "Edukasi & Sumber Daya",
      sub: "Pelajari lebih lanjut tentang keamanan dan cara penggunaan essential oil.",
      safety_title: "Panduan Keamanan",
      safety_desc:
        "Essential oil sangat pekat. Pelajari dosis yang aman untuk bayi, anak-anak, dan ibu hamil.",
      science_title: "Cara Kerja Aromatherapy",
      science_desc:
        "Bagaimana molekul aroma mempengaruhi sistem limbik di otak dan memberikan efek relaksasi.",
      download_title: "Download Brosur Digital",
      download_desc:
        "Dapatkan katalog lengkap produk Annise Herbal dalam format PDF.",
      btn_read: "Baca Selengkapnya",
      btn_download: "Download PDF",
    },
    contact: {
      title: "Hubungi Kami",
      sub: "Punya pertanyaan tentang produk atau butuh konsultasi? Tim kami siap membantu.",
      form_name: "Nama Lengkap",
      form_contact: "Email / WhatsApp",
      form_msg: "Pesan",
      btn_send: "Kirim Pesan",
      info_title: "Informasi Kontak",
      hours_title: "Jam Operasional",
      hours_wd: "Senin - Jumat: 09:00 - 17:00",
      hours_we: "Sabtu: 09:00 - 14:00",
    },
    faq: {
      title: "Pertanyaan Umum",
      sub: "Temukan jawaban untuk pertanyaan yang sering diajukan seputar produk dan layanan kami.",
      search_placeholder: "Cari pertanyaan...",
      categories: {
        all: "Semua",
        products: "Produk",
        orders: "Pemesanan",
        shipping: "Pengiriman",
        safety: "Keamanan",
      },
      ui: {
        support_badge: "Pusat Bantuan",
        categories_title: "Kategori",
        no_result: "Tidak ada pertanyaan yang cocok dengan",
        clear_search: "Hapus Pencarian",
        cta_title: "Masih ada pertanyaan?",
        cta_desc:
          "Tidak menemukan jawaban yang Anda cari? Silakan chat dengan tim kami.",
        cta_btn: "Chat via WhatsApp",
      },
      items: [
        {
          q: "Apakah produk Annise Herbal aman untuk bayi?",
          a: "Ya, kami memiliki Kids Series (Fluxent Kids, Respiro Kids) yang diformulasikan khusus dengan konsentrasi aman untuk anak-anak. Selalu ikuti petunjuk penggunaan.",
          category: "safety",
        },
        {
          q: "Bagaimana cara melacak pesanan saya?",
          a: "Setelah pesanan dikirim, Anda akan menerima nomor resi melalui WhatsApp atau email yang terdaftar.",
          category: "shipping",
        },
        {
          q: "Apakah essential oil bisa diminum?",
          a: "Tidak. Produk Annise Herbal diformulasikan untuk penggunaan luar (dioles) atau dihirup (inhalasi). Jangan menelan essential oil.",
          category: "safety",
        },
        {
          q: "Berapa lama estimasi pengiriman?",
          a: "Pengiriman reguler membutuhkan waktu 2-3 hari kerja untuk Jabodetabek dan 3-5 hari kerja untuk luar pulau Jawa.",
          category: "shipping",
        },
        {
          q: "Apakah bisa dropship atau reseller?",
          a: "Ya, kami membuka peluang kemitraan. Silakan hubungi kami via WhatsApp untuk informasi lebih lanjut mengenai program reseller.",
          category: "orders",
        },
        {
          q: "Apa perbedaan Max Pain Relief dan Hemo Clear?",
          a: "Max Pain Relief diformulasikan untuk nyeri otot dan sendi, sedangkan Hemo Clear dikhususkan untuk membantu meredakan wasir (hemorrhoids).",
          category: "products",
        },
      ],
    },
  },
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      story: "Our Story",
      resources: "Resources",
      contact: "Contact",
    },
    hero: {
      s1_title: "Natural Essential Oils",
      s1_sub: "Family Care Solutions",
      s1_desc: "100% Pure. Formulated by certified practitioners since 2005.",
      s1_btn: "Shop Now",
      s2_title: "Relieve Muscle Pain",
      s2_sub: "Max Pain Relief",
      s2_desc:
        "Soothe aches, joint pain, and cramps with the natural power of selected herbs.",
      s2_btn: "View Product",
      s3_title: "Protection for Kids",
      s3_sub: "Kids Series",
      s3_desc:
        "Gentle & safe formula to maintain your child's respiratory health.",
      s3_btn: "View Kids Series",
    },
    trust: {
      t1: "100% Natural",
      t1_desc: "No harmful chemicals",
      t2: "Certified Expert",
      t2_desc: "Formulated by certified founder",
      t3: "Since 2005",
      t3_desc: "Trusted for 20 years",
      t4: "Family Safe",
      t4_desc: "For adults & children",
    },
    section: {
      best_seller: "Best Seller Collection",
      best_seller_sub:
        "Favorite products for Indonesian families to treat daily health issues naturally.",
      view_all: "View All Products",
      how_to: "How to Use",
      how_to_sub: "Get maximum benefits with the right and safe usage methods.",
      story_title: "Behind Every Drop of Annise Herbal",
      story_desc:
        "Every formulation is developed based on aromatherapy principles, traditional medicine, and over two decades of practice.",
      read_story: "Read Our Story",
      help: "Need help choosing?",
      chat: "Chat via WhatsApp",
    },
    shop: {
      title: "Shop Essential Oils",
      sub: "Find natural solutions for your family's needs.",
      add: "+ Add",
      detail: "Details",
    },
    product: {
      benefits: "Key Benefits",
      composition: "Ingredients",
      usage: "How to Use",
      back: "Back to Shop",
      add_cart: "Add to Cart",
      ask_wa: "Ask via WA",
      caution: "Caution",
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      empty_sub: "Let's start shopping for natural health products!",
      checkout: "Checkout Now",
      subtotal: "Subtotal",
    },
    checkout: {
      title: "Checkout",
      step1: "Shipping Address",
      step2: "Shipping Method",
      step3: "Payment Method",
      next_ship: "Next to Shipping",
      next_pay: "Next to Payment",
      pay_now: "Pay Now",
      back: "Back",
      summary: "Order Summary",
      total: "Total",
      success_title: "Payment Successful!",
      success_desc:
        "Thank you for shopping at Annise Herbal. Your order will be processed and shipped soon.",
      home_btn: "Back to Home",
    },
    search: {
      placeholder: "Search products, symptoms, or benefits...",
      popular: "Popular Searches",
      no_result: "No products found.",
    },
    footer: {
      text: "Trusted natural care solutions for Indonesian families since 2005.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    story: {
      title: "The Annise Herbal Story",
      sub: "Building Indonesian family health with the power of nature since 2005.",
      about_title: "About Us",
      about_text1:
        "Annise Herbal is a 100% natural aromatherapy and healthcare brand developed to help maintain body balance naturally and safely.",
      about_text2:
        "Founded in 2005, we have used over 60 types of selected Essential Oils sourced from various countries and meeting international standards.",
      commitment_title: "Our Commitment",
      founder_title: "Founder & Certification",
      cert_title: "Certifications & Training",
      commitments: [
        "High quality natural ingredients",
        "User safety first",
        "Natural health support solutions",
        "Developed by experienced practitioners",
      ],
    },
    resources: {
      title: "Resources & Education",
      sub: "Learn more about the safety and usage of essential oils.",
      safety_title: "Safety Guide",
      safety_desc:
        "Essential oils are highly concentrated. Learn safe dosages for babies, children, and pregnant women.",
      science_title: "How Aromatherapy Works",
      science_desc:
        "How aroma molecules affect the limbic system in the brain and provide relaxation effects.",
      download_title: "Download Digital Brochure",
      download_desc:
        "Get the complete Annise Herbal product catalog in PDF format.",
      btn_read: "Read More",
      btn_download: "Download PDF",
    },
    contact: {
      title: "Contact Us",
      sub: "Have questions about products or need consultation? Our team is ready to help.",
      form_name: "Full Name",
      form_contact: "Email / WhatsApp",
      form_msg: "Message",
      btn_send: "Send Message",
      info_title: "Contact Information",
      hours_title: "Operating Hours",
      hours_wd: "Mon - Fri: 09:00 - 17:00",
      hours_we: "Sat: 09:00 - 14:00",
    },
    faq: {
      title: "Frequently Asked Questions",
      sub: "Find answers to common questions about our products and services.",
      search_placeholder: "Search questions...",
      categories: {
        all: "All",
        products: "Products",
        orders: "Orders",
        shipping: "Shipping",
        safety: "Safety",
      },
      ui: {
        support_badge: "Support Center",
        categories_title: "Categories",
        no_result: "No questions found matching",
        clear_search: "Clear Search",
        cta_title: "Still have questions?",
        cta_desc:
          "Can't find the answer you're looking for? Please chat with our friendly team.",
        cta_btn: "Chat on WhatsApp",
      },
      items: [
        {
          q: "Are Annise Herbal products safe for babies?",
          a: "Yes, we have a Kids Series (Fluxent Kids, Respiro Kids) specifically formulated with safe concentrations for children. Always follow usage instructions.",
          category: "safety",
        },
        {
          q: "How do I track my order?",
          a: "Once shipped, you will receive a tracking number via WhatsApp or the registered email.",
          category: "shipping",
        },
        {
          q: "Can essential oils be ingested?",
          a: "No. Annise Herbal products are formulated for external use (topical) or inhalation only. Do not ingest essential oils.",
          category: "safety",
        },
        {
          q: "How long is the shipping estimation?",
          a: "Regular shipping takes 2-3 working days for Greater Jakarta and 3-5 working days for outside Java.",
          category: "shipping",
        },
        {
          q: "Do you offer dropship or reseller programs?",
          a: "Yes, we offer partnership opportunities. Please contact us via WhatsApp for more information about our reseller program.",
          category: "orders",
        },
        {
          q: "What is the difference between Max Pain Relief and Hemo Clear?",
          a: "Max Pain Relief is formulated for muscle and joint pain, while Hemo Clear is specifically designed to help relieve hemorrhoids.",
          category: "products",
        },
      ],
    },
  },
};

export type TranslationData = typeof translations.id;

export const products: Product[] = [
  {
    id: 1,
    name: "Max Pain Relief Oil - 100 ml",
    category: "Pain Relief",
    price: 185000,
    shortDesc: "Minyak Pijat Herbal Pegal Linu, Nyeri Otot & Sendi",
    description:
      "Max Pain Relief Oil (MPR) adalah minyak oles herbal hangat yang diformulasikan dari bahan herbal pilihan untuk membantu meredakan pegal linu, nyeri otot, rematik, saraf terjepit, dan ketidaknyamanan pada sendi. Sensasi hangatnya membantu merilekskan otot, melancarkan sirkulasi darah, dan memberikan kenyamanan pada tubuh.",
    benefits: [
      "Cocok sebagai minyak pijat harian setelah kerja / olahraga ganti menjadi membantu mengatasi keseleo, saraf terjepit dan masuk angin",
      "Memberi sensasi hangat... ditaruh paling bawah",
    ],
    ingredients: [
      "Olea europaea (Olive oil)",
      "Calendula officinalis",
      "Arnica",
      "Matricaria Chamomila",
      "Rosmarin officinale folium",
      "Kombinasi herbal pilihan untuk minyak pijat nyeri otot & sendi dengan aroma alami yang menenangkan.",
    ],
    usage:
      "Oleskan secukupnya MPR pada area yang bermasalah sambil dipijat perlahan-lahan hingga meresap. Dianjurkan tidak dibasuh minimal 4jam.",
    caution:
      "Hanya untuk pemakaian luar. Hindari kontak dengan mata dan luka terbuka. Jauhkan dari jangkauan anak-anak. Simpan di tempat sejuk dan kering.",
    imageColor: "bg-white",
    image: mpr1,
    images: [mpr1, mprDesc1, mprDesc2],
    tags: ["nyeri", "otot", "sendi", "pegal", "rematik"],
  },
  {
    id: 2,
    name: "Hemo Clear Oil - 100 ml",
    category: "Specialty",
    price: 195000,
    shortDesc: "Membantu meredakan wasir luar dan iritasi secara alami.",
    description:
      "Merupakan inovasi perawatan herbal premium yang dirancang untuk membantu meredakan wasir secara alami, menghadirkan kenyamanan optimal dan mendukung pemulihan dengan lembut.",
    benefits: [
      "Membantu meredakan bengkak dan radang pada wasir luar",
      "Membantu mengurangi rasa tidak nyaman akibat wasir",
      "Mendukung penyembuhan secara alami",
    ],
    ingredients: [
      "Juniperus recurva",
      "Boswellia rivae",
      "Helichrysum italicum",
    ],
    usage:
      "Oleskan tipis pada area wasir luar yang bersih dan kering. Diamkan sejenak, hingga meresap. Ulangi sesuai kebutuhan.",
    caution:
      "Hanya untuk pemakaian luar pada area yang terkena wasir. Hentikan penggunaan jika terjadi iritasi. Konsultasikan dengan dokter jika gejala berlanjut.",
    imageColor: "bg-white",
    image: hemo1,
    images: [hemo1, hemoDesc1, hemoDesc2, hemoDesc3],
    tags: ["wasir", "ambeien", "bengkak"],
  },
  {
    id: 3,
    name: "Skincare Oil - 100 ml",
    category: "Skincare",
    price: 210000,
    shortDesc: "Perawatan Kulit Alami",
    description:
      "Perpaduan eksklusif botanical premium dan essential oil alami untuk membantu merawat, melembapkan, dan menyempurnakan tampilan kulit. Menghadirkan sensasi kulit yang lebih halus, lebih bercahaya, dan tampak sempurna dengan kemewahan alami.",
    benefits: ["Menghaluskan kulit", "Melembabkan kulit"],
    ingredients: [
      "Olea europaea (Olive Oil)",
      "Simmondsia chinensis (Jojoba oil)",
      "Rosa damascane (Rose)",
      "Citrus aurantium (Neroli)",
      "Daucus carota (Carrot seed)",
    ],
    usage:
      "Oleskan Skin Care herbal oil pada seluruh tubuh / area yang diperlukan sampai meresap. Digunakan setiap hari setelah mandi. Agar penyerapan efektif maka dianjurkan tidak mandi / dibasuh selama 6 jam.",
    caution:
      "Hanya untuk pemakaian luar. Lakukan uji tempel (patch test) sebelum penggunaan pertama. Hentikan jika terjadi reaksi alergi.",
    imageColor: "bg-white",
    image: skin1,
    images: [skin1, skinDesc1, skinDesc2],
    tags: ["kulit", "wajah", "cantik", "lembab"],
  },
  {
    id: 4,
    name: "Progest Oil - 100 ml",
    category: "Digestion",
    price: 175000,
    shortDesc: "Meringankan maag dan masalah pencernaan.",
    description:
      "Membantu mengatasi gangguan pencernaan seperti maag, kembung, diare, sembelit dan mual.",
    benefits: [
      "Membantu mengatasi gangguan pencernaan seperti : maag, kembung, diare, sembelit dan mual",
    ],
    ingredients: [
      "Olea europaea fructus",
      "Calendula officinalis",
      "Foeniculi vulgrate fructus",
      "Mentha piperita",
      "Lavendula angustifolia",
      "Rosmarin officinale folium",
    ],
    usage:
      "Oleskan secukupnya progest pada area lambung memutar searah dengan jarum jam. Khusus diare, pijat memutar berlawanan arah jarum jam. Dilakukan 2-3 kali sehari sampai keluhan berkurang / reda.",
    caution:
      "Hanya untuk pemakaian luar. Tidak untuk diminum. Jauhkan dari jangkauan anak-anak.",
    imageColor: "bg-white",
    image: progest1,
    images: [progest1, progestDesc1, progestDesc2],
    tags: ["maag", "perut", "kembung", "mual", "pencernaan"],
  },
  {
    id: 5,
    name: "Nozze Oil - 15 ml",
    category: "Respiratory",
    price: 165000,
    shortDesc: "Minyak Hidung Tersumbat, Minyak Oil Hidung Mampet",
    description:
      "Nozze Oil adalah minyak herbal berbahan essential oil yang membantu melegakan hidung tersumbat serta memberikan rasa segar dan lega pada saluran pernapasan. Cocok digunakan sebagai minyak oles hidung mampet dan aromaterapi pernapasan untuk penggunaan harian.",
    benefits: [
      "Membantu melegakan hidung tersumbat dan hidung mampet",
      "Membantu meredakan pilek & bersin-bersin",
      "Membantu memberikan rasa lega pada pernapasan",
    ],
    ingredients: [
      "Eucalyptus globulus labiil",
      "Melaleuca alternifolia (Tea Tree Oil)",
      "Mentha piperita (Peppermint Oil)",
    ],
    usage:
      "Oleskan 3-5 tetes pada telapak tangan. Balurkan perlahan pada area : Batang hidung, Tulang pipi, Kening, Tenggorokan dan Gunakan sesuai kebutuhan.",
    caution:
      "Hanya untuk pemakaian luar. Hindari area mata dan selaput lendir. Tidak disarankan untuk anak di bawah 2 tahun tanpa pengawasan medis.",
    imageColor: "bg-teal-100",
    image: nozze1,
    tags: ["sinus", "hidung", "pilek", "pernapasan", "napas"],
  },
  {
    id: 6,
    name: "Fluxent oil - 10ml",
    category: "Respiratory",
    price: 165000,
    shortDesc: "Batuk, Flu & Amandel, Pernapasan",
    description:
      "Fluxent Oil adalah minyak aromaterapi herbal berbahan essential oil murni yang membantu melegakan pernapasan serta meredakan ketidak nyamanan akibat flu, pilek, batuk dan sakit tenggorokan.",
    benefits: [
      "Membantu meredakan flu & pilek",
      "Membantu melegakan pernapasan",
      "Membantu mengurangi batuk & rasa tidak nyaman di tenggorokan",
    ],
    ingredients: [
      "Mentha piperita (Peppermint oil)",
      "Rosmarinus officlinale folium (Rosemary oil)",
      "Pinus slyvestris",
      "Salvia sclarea",
      "Cedrus atlantica",
    ],
    usage:
      "Tuangkan 2-3 tetes pada tisu, saputangan dan masker. Hirup perlahan seperti bernapas biasanya. Dapat digunakan beberapa kali sehari sesuai kebutuhan. Bisa juga digunakan pada diffuser.",
    caution:
      "Hanya untuk inhalasi (dihirup) atau penggunaan pada diffuser. Hindari kontak langsung dengan kulit sensitif tanpa pengenceran. Hindari penggunaan pada anak usia dibawah 8 tahun.",
    imageColor: "bg-white",
    image: fluxent1,
    images: [fluxent1, fluxentDesc1],
    tags: ["flu", "batuk", "virus", "imun"],
  },
  {
    id: 7,
    name: "Fluxent Kids - 10 ml",
    category: "Kids",
    price: 155000,
    shortDesc: "Essential Oil Pernapasan Anak, Batuk, Flu & Pilek",
    description:
      "Fluxent Oil Kids adalah minyak aromaterapi herbal khusus anak berbahan essential oil murni yang membantu melegakan pernapasan anak serta memberikan rasa nyaman saat mengalami flu, pilek, batuk dan ketidak nyamanan tenggorokan (amandel). Memiliki aroma lembut & ramah anak, cocok digunakan sebagai aromaterapi pernapasan anak sehari-hari.",
    benefits: [
      "Membantu melegakan pernapasan anak",
      "Membantu meredakan flu & pilek anak",
      "Memberikan rasa nyaman saat batuk ringan",
      "Aroma lembut, menenangkan & tidak menyengat",
      "Aman digunakan sehari-hari sesuai anjuran",
    ],
    ingredients: [
      "Citrus sinensis (Sweet orange)",
      "Lavandula angustifolia (Lavender)",
      "Citrus bergamia (Bergemot)",
      "Pelargonium Roseum (Geranium)",
    ],
    usage:
      "Tuangkan 2-3 tetes pada tisu, saputangan / masker. Hirupkan perlahan seperti bernapas biasa. Dianjurkan digunakan saat anak beristirahat dan tidur. Gunakan dengan pengawasan orang tua.",
    caution:
      "Produk khusus anak. Gunakan di bawah pengawasan orang tua. Hentikan penggunaan jika terjadi reaksi negatif.",
    imageColor: "bg-white",
    image: fluxentKids1,
    images: [fluxentKids1, fluxentKidsDesc1],
    tags: ["anak", "bayi", "flu anak", "pilek anak"],
  },
  {
    id: 8,
    name: "Respiro Kids - 100 ml",
    category: "Kids",
    price: 155000,
    shortDesc: "Minyak Herbal Anak untuk Batuk & Lendir",
    description:
      "Respiro Oil Kids adalah minyak herbal khusus anak dengan aroma lembut yang membantu memberikan rasa nyaman pada saluran pernapasan anak saat mengalami batuk dan penumpukan lendir / dahak. Digunakan sebagai minyak pijat aromaterapi anak, membantu pernapasan terasa lebih lega dan nyaman, terutama saat anak beristirahat atau sebelum tidur.",
    benefits: [
      "Membantu meredakan batuk pada anak",
      "Membantu mencairkan lendir / dahak",
      "Membantu melegakan pernapasan anak",
      "Memberikan rasa hangat & nyaman saat dipijat",
      "Aroma lembut & ramah anak",
    ],
    ingredients: [
      "Anthermis nobllis (Chamomile Oil)",
      "Pelargonium Roseum (Geranium Oil)",
      "Helichrysum italicum",
      "Citrus bergamia (Bergemot oil)",
    ],
    usage:
      "Tuangkan Respiro Oil Kids secukupnya pada telapak tangan / mangkuk kecil. Pijat perlahan pada dada dan punggung anak. Dianjurkan digunakan setelah mandi atau sebelum tidur. Sebaiknya anak tidak mandi selama ±4 jam setelah pemijatan. Gunakan dengan pengawasan orang tua.",
    caution:
      "Produk khusus anak. Hanya untuk pemakaian luar. Hindari area wajah dan mata.",
    imageColor: "bg-white",
    image: respiroKids1,
    images: [respiroKids1, respiroKidsDesc1, respiroKidsDesc2],
    tags: ["batuk anak", "dahak", "lendir", "napas anak"],
  },
];

// ... (biarkan kode di atasnya)
