export interface EducationArticle {
  title: string;
  subtitle: string;
  content: {
    heading: string;
    text: string;
    list?: string[];
  }[];
}

export const educationData: Record<
  "id" | "en",
  { safety: EducationArticle; science: EducationArticle }
> = {
  id: {
    safety: {
      title: "Panduan Keamanan Essential Oil",
      subtitle:
        "Panduan lengkap penggunaan essential oil yang aman untuk seluruh keluarga.",
      content: [
        {
          heading: "Patch Test (Tes Kulit)",
          text: "Sebelum menggunakan produk annise herbal selalu lakukan patch test untuk memastikan tidak ada reaksi alergi.",
          list: [
            "Oleskan sedikit herbal oil dari annise herbal dibagian dalam lengan.",
            "Tunggu 24 jam.",
            "Jika timbul kemerahan atau gatal, hentikan penggunaan.",
          ],
        },
        {
          heading: "Sensitivitas Matahari (Photosensitivity)",
          text: "Beberapa herbal oil juga menggunakan essential oil yang terdiri dari jenis citrus (Lemon, Bergamot, Lime, Grapefruit), bersifat photosensitive. Kulit yang diolesi herbal oil ini bisa mengakibatkan tingginya sensitifity jika terkena sinar matahari langsung.",
          list: [
            "Hindari paparan sinar matahari langsung selama 4 jam setelah penggunaan herbal oil yang mengandung citrus.",
            "Gunakan pada malam hari atau area tertutup pakaian.",
          ],
        },
        {
          heading: "Penyimpanan",
          text: "Simpan produk annise herbal di tempat yang sejuk, kering, dan terhindar dari sinar matahari langsung untuk menjaga kualitasnya. Botol kaca gelap membantu melindungi oil dari kerusakan akibat cahaya.",
        },
      ],
    },
    science: {
      title: "Cara Kerja Aromatherapy",
      subtitle:
        "Memahami bagaimana aroma mempengaruhi tubuh dan pikiran kita secara ilmiah.",
      content: [
        {
          heading: "Sistem Penciuman (Olfactory System)",
          text: "Ketika kita menghirup essential oil, molekul aroma masuk melalui hidung dan ditangkap oleh reseptor olfaktori. Sinyal ini kemudian dikirim langsung ke sistem limbik di otak.",
        },
        {
          heading: "Hubungan dengan Sistem Limbik",
          text: "Sistem limbik adalah pusat emosi dan memori di otak. Inilah mengapa aroma tertentu bisa memicu ingatan atau mengubah suasana hati (mood) secara instan. Essential oil seperti Lavender dapat menenangkan amigdala (pusat rasa takut/cemas), memberikan efek relaksasi yang nyata.",
        },
        {
          heading: "Penyerapan Melalui Kulit",
          text: "Molekul essential oil sangat kecil sehingga dapat menembus lapisan kulit dan masuk ke aliran darah. Melalui pijatan, efek terapeutik minyak bekerja ganda: relaksasi otot dari pijatan dan manfaat kimiawi dari essential oil itu sendiri.",
          list: [
            "Molekul masuk melalui pori-pori kulit.",
            "Masuk ke aliran darah kapiler.",
            "Didistribusikan ke seluruh tubuh untuk memberikan manfaat.",
          ],
        },
        {
          heading: "Manfaat Terapeutik",
          text: "Setiap essential oil memiliki komponen kimia alami (seperti linalool pada lavender atau menthol pada peppermint) yang memberikan efek farmakologis tertentu, mulai dari anti-inflamasi, analgesik (pereda nyeri), hingga sedatif (penenang).",
        },
      ],
    },
  },
  en: {
    safety: {
      title: "Essential Oil Safety Guide",
      subtitle:
        "Complete guide to safe essential oil usage for the whole family.",
      content: [
        {
          heading: "Dilution",
          text: "Essential oils are highly concentrated and must be diluted with a carrier oil (like virgin coconut oil, jojoba, or almond oil) before topical application. Never apply undiluted essential oils directly to skin unless advised by a certified aromatherapist.",
          list: [
            "Babies (0-2 years): 0.5% - 1% (1 drop per 10ml carrier oil)",
            "Children (2-10 years): 1% - 2% (2-4 drops per 10ml carrier oil)",
            "Adults: 2% - 5% (4-10 drops per 10ml carrier oil)",
            "Pregnant/Nursing: 1% (consult with doctor)",
          ],
        },
        {
          heading: "Patch Test",
          text: "Before using a new essential oil, always perform a patch test to ensure no allergic reaction occurs.",
          list: [
            "Apply a small amount of diluted oil to the inner arm.",
            "Wait for 24 hours.",
            "Discontinue use if redness or itching occurs.",
          ],
        },
        {
          heading: "Photosensitivity",
          text: "Some essential oils, especially citrus oils (Lemon, Bergamot, Lime, Grapefruit), are photosensitive. Skin applied with these oils can burn if exposed to direct sunlight.",
          list: [
            "Avoid direct sunlight for 12 hours after using citrus oils.",
            "Use at night or on areas covered by clothing.",
          ],
        },
        {
          heading: "Storage",
          text: "Store essential oils in a cool, dry place away from direct sunlight to maintain quality. Dark glass bottles help protect oils from light damage.",
        },
      ],
    },
    science: {
      title: "How Aromatherapy Works",
      subtitle:
        "Understanding the science behind how scents affect our body and mind.",
      content: [
        {
          heading: "Olfactory System",
          text: "When we inhale essential oils, scent molecules enter through the nose and are captured by olfactory receptors. These signals are sent directly to the limbic system in the brain.",
        },
        {
          heading: "Connection to Limbic System",
          text: "The limbic system is the brain's center for emotion and memory. This is why certain scents can trigger memories or instantly shift mood. Oils like Lavender can calm the amygdala (fear/anxiety center), providing tangible relaxation effects.",
        },
        {
          heading: "Dermal Absorption",
          text: "Essential oil molecules are tiny enough to penetrate the skin barrier and enter the bloodstream. Through massage, the therapeutic effects work doubly: muscle relaxation from touch and chemical benefits from the oil itself.",
          list: [
            "Molecules enter through skin pores.",
            "Absorbed into capillary blood flow.",
            "Distributed throughout the body.",
          ],
        },
        {
          heading: "Therapeutic Benefits",
          text: "Each essential oil contains natural chemical components (like linalool in lavender or menthol in peppermint) that provide specific pharmacological effects, ranging from anti-inflammatory to analgesic (pain relief) and sedative properties.",
        },
      ],
    },
  },
};
