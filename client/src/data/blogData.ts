export interface BlogPost {
  id: string;
  date: string;
  author: string;
  imageUrl?: string;
  translations: {
    id: {
      title: string;
      excerpt: string;
      content: string[];
    };
    en: {
      title: string;
      excerpt: string;
      content: string[];
    };
  };
}

export const blogs: BlogPost[] = [
  {
    id: "ritual-tenang-di-tengah-hari-yang-sibuk",
    date: "14 Maret 2026",
    author: "Annise Herbal",
    translations: {
      id: {
        title: "Ritual Tenang di Tengah Hari yang Sibuk dengan Annise Herbal Essential Oil",
        excerpt: "Di tengah hari yang terasa begitu sibuk, kadang kita lupa bahwa tubuh dan pikiran juga butuh jeda. Temukan kedamaian dengan Annise Herbal.",
        content: [
          "Pernah nggak sih, lagi di tengah-tengah kesibukan yang super padat, tiba-tiba merasa napas jadi lebih pendek dan kepala mulai penat?",
          "Kerjaan numpuk, notif HP nggak berhenti bunyi, rasanya dunia muter terlalu cepat. Seringkali, kita jalan terus kayak autopilot tanpa sadar kalau tubuh dan pikiran udah minta istirahat.",
          "Padahal, istirahat itu nggak melulu harus nunggu weekend atau ambil cuti buat liburan ke pantai. Kadang, yang kita butuhin cuma momen kecil 5 menit buat napas lebih pelan dan balikin fokus ke diri sendiri.",
          "Di sinilah keajaiban kecil dari aroma bisa ngasih perubahan besar.",
          "Ketika Aroma Bisa Mengubah Suasana",
          "Pernah masuk ke sebuah ruangan—mungkin spa atau lobi hotel—dan tiba-tiba pundak rasanya langsung turun, lebih rileks, cuma karena nyium aromanya?",
          "Aroma itu punya 'jalan pintas' langsung ke pusat emosi di otak kita. Dia nggak cuma sekadar wangi, tapi bisa ngebangkitin perasaan tenang, memori indah, dan ngerubah mood yang tadinya berantakan jadi lebih tertata.",
          "Nggak heran kalau sekarang makin banyak orang yang mengandalkan essential oil sebagai 'tombol pause' di tengah hari yang chaos.",
          "Momen Self-Care Nggak Harus Ribet",
          "Sering dengar kata self-care dan langsung ngebayangin harus ke salon mahal atau me-time berjam-jam? Padahal, self-care paling efektif itu justru yang gampang dilakuin tiap hari.",
          "Misalnya, nyalain diffuser di meja kerja pas lagi suntuk banget ngerjain laporan. Atau tetesin sedikit essential oil di telapak tangan, gosok perlahan, terus hirup dalam-dalam sebanyak tiga kali.",
          "Cuma butuh waktu kurang dari semenit, tapi efeknya bener-bener kerasa. Pikiran jadi lebih jernih, dan deg-degan karena stres pelan-pelan mereda.",
          "Menemukan 'Tempat Pulang' Bersama Annise Herbal",
          "Rumah (atau bahkan meja kerja) seharusnya jadi tempat yang bikin kita merasa aman dan nyaman. Dengan essential oil dari Annise Herbal, kamu bisa nyiptain 'tempat berlindung' ini kapan aja.",
          "Aroma murni dari tetesan essential oil Annise Herbal nggak cuma wewangian sintetis, melainkan kebaikan alam yang diracik buat nemenin momen-momen kamu. Mulai dari pagi yang butuh semangat, siang yang butuh fokus, sampai malam yang butuh relaksasi total.",
          "Pada akhirnya, merawat diri sendiri itu nggak harus nunggu nanti. Karena kadang, nyempetin berhenti sejenak untuk narik napas dalam diiringi aroma menenangkan aja udah lebih dari cukup buat bantu kita terus jalan."
        ]
      },
      en: {
        title: "A Calm Ritual in the Middle of a Busy Day with Annise Herbal Essential Oil",
        excerpt: "In the middle of a busy day, we often forget that our body and mind need a break too. Find peace with Annise Herbal.",
        content: [
          "Have you ever been right in the middle of a super packed schedule, and suddenly felt your breathing get shallower and your head start spinning?",
          "Work piling up, non-stop phone notifications—it feels like the world is spinning way too fast. Most of the time, we just keep going on autopilot without realizing our body and mind are desperately asking for a break.",
          "But here's the thing: taking a break doesn't always mean waiting for the weekend or taking a week-long beach vacation. Sometimes, all you need is a 5-minute breather to slow down and recenter yourself.",
          "And this is where the tiny magic of scent can make a massive difference.",
          "When Scent Transforms the Vibe",
          "Have you ever walked into a room—maybe a spa or a hotel lobby—and suddenly felt your shoulders drop, instantly more relaxed, just from the smell?",
          "Scent has a literal 'shortcut' right to the emotional center of our brains. It's not just just a fragrance; it has the power to evoke calm, trigger beautiful memories, and shift your mood from total chaos to feeling grounded.",
          "It's really no wonder that more and more people are relying on essential oils as their personal 'pause button' in the middle of a chaotic day.",
          "Self-Care Doesn't Have to Be Complicated",
          "Do you hear the word 'self-care' and immediately picture expensive spa days or hours of me-time? In reality, the most effective self-care is usually the kind you can do easily every single day.",
          "Like turning on a diffuser at your desk when you're incredibly stuck on a report. Or dropping a little essential oil into your palms, rubbing them together gently, and taking three deep, slow breaths.",
          "It takes less than a minute, but the effect is immediate. Your mind feels clearer, and that stressful heart-racing feeling slowly fades away.",
          "Finding Your 'Safe Haven' with Annise Herbal",
          "Your home (or even your workspace) should be a place that makes you feel safe and comfortable. With essential oils from Annise Herbal, you can create this 'safe haven' essentially anytime you want.",
          "The pure scent from a drop of Annise Herbal essential oil isn't just a synthetic fragrance—it's pure goodness from nature, blended to accompany your everyday moments. From mornings that need a boost of energy, afternoons that need focus, to nights that call for total relaxation.",
          "At the end of the day, taking care of yourself shouldn't have to wait. Because sometimes, just giving yourself the grace to stop for a moment and take a deep breath surrounded by a calming scent is more than enough to help you keep moving forward."
        ]
      }
    }
  },
  {
    id: "5-manfaat-essential-oil-untuk-kualitas-tidur",
    date: "12 Maret 2026",
    author: "Tim Editorial",
    translations: {
      id: {
        title: "5 Manfaat Essential Oil untuk Kualitas Tidur yang Lebih Baik",
        excerpt: "Apakah Anda sering kesulitan tidur di malam hari? Temukan bagaimana essential oil dapat membantu menenangkan pikiran dan meningkatkan kualitas tidur Anda secara alami.",
        content: [
          "Sering ngerasa udah rebahan berjam-jam tapi mata susah banget ditutup? Atau sering kebangun di tengah malam dan paginya malah ngerasa makin capek?",
          "Kalau kamu sering ngalamin ini, kamu sama sekali nggak sendirian. Stres kerjaan, overthinking di malam hari, sampai kebiasaan scrolling HP sebelum tidur emang sering jadi 'pencuri' jam tidur ideal kita.",
          "Tapi tahukah kamu? Rahasia buat dapetin tidur yang pulas dan berkualitas bisa jadi sesederhana menghirup wangi-wangian yang tepat sebelum tidur. Alam udah nyediain solusinya lewat essential oil.",
          "Yuk, kita bahas 5 alasan kenapa essential oil bisa jadi 'bestie' baru kamu buat tidur lebih nyenyak:",
          "1. Mengirim Sinyal 'Rileks' ke Otak",
          "Menghirup aroma penenang seperti Lavender udah dibuktikan secara ilmiah bisa memperlambat sistem saraf kita. Efeknya? Detak jantung jadi lebih santai dan napas lebih teratur. Ini adalah gerbang utama buat masuk ke fase ngantuk.",
          "2. Mengusir Overthinking dan Kecemasan",
          "Tau kan rasanya otak berisik banget padahal badan udah capek? Essential oil seperti Chamomile dan Bergamot itu jagonya ngeredain kecemasan. Aromanya ngasih efek 'pelukan hangat' buat pikiran yang lagi ruwet.",
          "3. Mengurangi Pegal-Pegal Ringan yang Mengganggu",
          "Kadang kita susah tidur gara-gara leher kaku atau betis pegal sehabis kerja seharian. Mengoleskan sedikit pijatan dengan blend essential oil (seperti Max Pain Relief dari Annise Herbal) bisa ngelenturin otot yang tegang, bikin badan jauh lebih enteng waktu dibawa rebahan.",
          "4. Mengajarkan Tubuh Jam Tidur yang Baru",
          "Kalau kamu rutin nyalain diffuser aroma tertentu setiap jam 9 malam, lama-kelamaan otak bakal ngenalin aroma itu sebagai alarm alami yang bilang, 'Oke, ini saatnya berhenti kerja dan mulai siap-siap tidur.' Ini ngebantu banget buat memperbaiki jam tidur yang berantakan.",
          "5. Bikin Tidur Lebih Dalam (Deep Sleep)",
          "Tidur lama itu beda lho sama tidur nyenyak. Essential oil bantu manjangin durasi fase 'Deep Sleep' kamu, fase di mana tubuh bener-bener meregenerasi sel dan mengumpulkan energi. Hasilnya? Bangun pagi rasanya jauh lebih seger dan nggak lemes.",
          "Memasukkan essential oil ke rutinitas malam itu gampang banget dan nggak butuh effort ekstra. Mulai aja dengan netesin sedikit di bantal atau nyalain diffuser favoritmu. Selamat mencoba, dan semoga malam ini tidurmu jauh lebih nyenyak ya!"
        ]
      },
      en: {
        title: "5 Benefits of Essential Oils for Better Sleep Quality",
        excerpt: "Do you often have trouble sleeping at night? Discover how essential oils can naturally help calm your mind and improve your sleep quality.",
        content: [
          "Ever feel like you've been lying in bed for hours but absolutely cannot close your eyes? Or constantly waking up in the middle of the night, only to feel even more tired in the morning?",
          "If this sounds familiar, you're definitely not alone. Work stress, late-night overthinking, and doom-scrolling before bed are notorious 'thieves' of our ideal sleep hours.",
          "But did you know? The secret to getting deep, quality sleep could be as simple as breathing in the right scents before turning in. Nature has already provided the solution through essential oils.",
          "Let's dive into 5 reasons why essential oils might just become your new 'bestie' for a better night's sleep:",
          "1. Sending 'Relax' Signals to the Brain",
          "Inhaling calming scents like Lavender has been scientifically proven to slow down our nervous system. The result? Your heart rate relaxes, and your breathing evens out. This is the ultimate gateway to feeling properly sleepy.",
          "2. Chasing Away Overthinking and Anxiety",
          "You know that feeling when your brain is incredibly loud even though your body is exhausted? Essential oils like Chamomile and Bergamot are absolute pros at soothing anxiety. Their scents act like a 'warm hug' for a tangled mind.",
          "3. Easing Minor Aches and Pains",
          "Sometimes we can't sleep simply because our neck is stiff or our calves are aching from a long day. Massaging a little essential oil blend (like Annise Herbal's Max Pain Relief) can loosen up tense muscles, making your body feel so much lighter when you finally lie down.",
          "4. Retraining Your Body's Internal Clock",
          "If you routinely turn on a diffuser with a specific scent every night at 9 PM, eventually your brain will recognize that scent as a natural alarm that says, 'Alright, time to log off and start getting ready for bed.' This is incredibly helpful for fixing a broken sleep schedule.",
          "5. Deepening Your Sleep (Deep Sleep Phase)",
          "Sleeping long is different from sleeping deep. Essential oils help extend the duration of your 'Deep Sleep' phase, which is when your body genuinely regenerates cells and gathers energy. The outcome? Waking up feeling far more refreshed and less sluggish.",
          "Incorporating essential oils into your nightly routine is super easy and doesn't require extra effort. Just start by putting a drop on your pillow or firing up your favorite diffuser. Sweet dreams, and here's hoping you sleep so much better tonight!"
        ]
      }
    }
  },
  {
    id: "cara-menggunakan-essential-oil-dengan-aman",
    date: "08 Maret 2026",
    author: "Annise Herbal",
    translations: {
      id: {
        title: "Cara Menggunakan Essential Oil dengan Aman di Rumah",
        excerpt: "Essential oil sangat bermanfaat, tetapi karena konsentrasinya tinggi, penggunaannya harus dilakukan dengan hati-hati. Pelajari panduan aman menggunakan essential oil di rumah.",
        content: [
          "Banyak yang setuju kalau wangi essential oil itu bener-bener bikin rileks dan nagih. Tapi, tahu nggak sih kalau di balik wanginya yang lembut, essential oil itu sebenarnya adalah konsentrat murni dari tanaman yang 'power'-nya kuat banget?",
          "Saking murninya, kita nggak bisa asal pakai. Biar manfaat dapet maksimal tapi kulit tetap aman, yuk ingat pilar-pilar penting ini waktu pakai essential oil di rumah:",
          "Selalu Encerkan Dulu! (Dilution is Key)",
          "Ini aturan emas yang nggak boleh dilanggar. Karena sangat pekat, essential oil murni (pure eo) jangan pernah dioles langsung ke kulit. Selalu campurkan dengan 'carrier oil' (minyak pembawa) kayak Olive oil, Jojoba oil, atau VCO.",
          "Kabar baiknya, kalau kamu pakai seri produk roll-on atau massage blend dari Annise Herbal (seperti Max Pain Relief), itu semua udah diracik sempurna dengan takaran aman. Tinggal oles, nggak perlu pusing mikirin takaran lagi!",
          "Nyalakan Diffuser dengan Bijak",
          "Menyebarkan aroma pakai diffuser emang ngasih vibe rumah yang ngangenin banget. Tapi, hindari nyalain diffuser 24 jam nonstop ya! Aturan terbaiknya: nyalakan 30-45 menit, terus matikan dulu sekitar 1-2 jam. Beri hidung dan sistem saraf kita waktu buat istirahat.",
          "Hati-Hati dengan Area Sensitif",
          "Sebisa mungkin, jauhkan essential oil dari mata, bagain dalam telinga, dan selaput lendir lainnya. Kalau awur-awuran dan kebetulan kena mata, JANGAN dibilas pakai air lho ya! (Minyak dan air nggak nyampur). Ambil kapas, tetesin Vco atau susu full cream, lalu usap perlahan buat narik minyaknya.",
          "Jauhkan dari Jangkauan Si Kecil (dan Anabul!)",
          "Anak-anak punya kulit yang jauh lebih tipis dan sensitif dari kita. Makanya essential oil untuk dewasa biasanya terlalu keras buat mereka. Simpan botol-botol eo-mu di rak yang tinggi. Kalau mau ngerawat si kecil pakai essential oil, pastikan pakai formula khusus yang memang dibuat untuk anak-anak, kayak Kids Series dari Annise Herbal.",
          "Pakai essential oil itu seru banget dan bisa jadi andalan P3K alami keluarga. Asal tahu cara pakainya, benda mungil beraroma surgawi ini bakal jadi sahabat terbaik di rumahmu."
        ]
      },
      en: {
        title: "How to Safely Use Essential Oils at Home",
        excerpt: "Essential oils are highly beneficial, but due to their high concentration, they must be used with care. Learn the guide to safely using essential oils at home.",
        content: [
          "Most people agree that the scent of essential oils is incredibly relaxing and universally loved. But did you know that behind those gentle aromas, essential oils are actually pure botanical concentrates with a truly potent 'power'?",
          "Because they are so pure, you can't just use them haphazardly. To get the maximum benefits while keeping your skin totally safe, let's keep these key pillars in mind when using essential oils at home:",
          "Always Dilute First! (Dilution is Key)",
          "This is the golden rule you cannot break. Because they are highly concentrated, pure essential oils (pure EO) should never be applied directly to the skin. Always mix them with a 'carrier oil' like Olive oil, Jojoba oil, or VCO (Virgin Coconut Oil).",
          "The good news is, if you're using the roll-on or massage blend series from Annise Herbal (like Max Pain Relief), they're all perfectly formulated with safe measurements. Just swipe and apply—no need to worry about ratios!",
          "Use Your Diffuser Wisely",
          "Diffusing scents genuinely gives your house that cozy, miss-it-when-you're-gone vibe. But try to avoid running your diffuser 24 hours non-stop! The best rule of thumb is: diffuse for 30-45 minutes, then turn it off for about 1-2 hours. Give your nose and nervous system some time to rest.",
          "Be Careful with Sensitive Areas",
          "As much as possible, keep essential oils away from your eyes, the inside of your ears, and other mucous membranes. If you're a bit clumsy and accidentally get it in your eye, DO NOT rinse with water! (Oil and water don't mix). Grab a cotton pad, drop some VCO or full-cream milk on it, and gently wipe to draw out the oil.",
          "Keep Out of Reach of the Little Ones (and Fur Babies!)",
          "Kids have skin that is way thinner and more sensitive than ours. That's why adult essential oils are usually too harsh for them. Keep your EO bottles on high shelves. If you want to care for your little one with essential oils, make sure to use specific formulas made just for kids, like Annise Herbal's Kids Series.",
          "Using essential oils is really fun and can be your family's natural first-aid kit. As long as you know how to use them, these tiny bottles of heavenly scents will become your absolute best friends at home."
        ]
      }
    }
  },
  {
    id: "rutinitas-self-care-malam-hari-aromaterapi",
    date: "01 Maret 2026",
    author: "Tim Editorial",
    translations: {
      id: {
        title: "Rutinitas Self-Care Malam Hari dengan Aromaterapi",
        excerpt: "Manjakan diri Anda setelah seharian sibuk. Simak panduan menciptakan rutinitas self-care malam khusus dengan menggunakan racikan aromaterapi alami.",
        content: [
          "Pernah merhatiin nggak? Gimana suasana hati kita pagi ini sering banget dipengaruhi sama apa yang kita lakuin semalam sebelumnya.",
          "Kalau malamnya grusa-grusu dan penuh pikiran, paginya otomatis kerasa capek dan males ngapa-ngapain. Makanya, punya 'me-time' atau rutinitas self-care sebelum tidur itu investasi penting banget buat mental kita.",
          "Nggak harus yang fancy kayak tidur di hotel bintang lima kok. Cuma dengan modal wangi-wangian alam (aromaterapi), kamu udah bisa bikin ritual malam di kamar sendiri yang nggak kalah bikin rileks.",
          "Langkah 1: Siapin 'Vibe' Ruangan",
          "Coba deh, sejam sebelum niat tidur, matikan notifikasi HP dan redupin layar. Lanjut nyalain diffuser, beri beberapa tetes aroma Lavender, Bergamot, atau Chamomile. Aroma ini punya sifat 'grounding', alias bikin pikiran yang tadinya melayang-layang jadi lebih napak dan tenang.",
          "Langkah 2: Skincare-an Pelan-Pelan (Mindful Skincare)",
          "Banyak dari kita yang pake skincare buru-buru, cuma karena mikir 'yang penting kelar'. Mulai nanti malam, coba ubah mindset-nya. Anggap ini waktu buat manjain diri sendiri. Apalagi kalau kamu pakai face oil atau serum dari Annise Herbal, coba rutinin buat pijat wajah pelan-pelan sambil narik napas nikmatin wanginya. Mewah banget rasanya!",
          "Langkah 3: Rilis Tegang di Pundak",
          "Duduk seharian natap layar kerjaan pasti bikin pundak dan leher berasa keras dan kaku. Coba olesin Max Pain Relief Relief Oil di tengkuk dan bahu, lalu pijat memutar pakai jempol. Sensasi hangat dan relaksasinya langsung bikin otot-otot 'melted'.",
          "Langkah 4: Tarik Napas Panjang...",
          "Duduk di pinggir kasur, taruh satu tangan di perut. Tarik napas lewat hidung pelan-pelan sampai perut mengembang, lalu hembuskan lewat mulut panjang-panjang. Ulangi 3-5 kali sambil nyium wangi aromaterapi yang udah memenuhi kamar.",
          "Tidur yang berkualitas itu butuh persiapan, sama kayak hal penting lainnya. 15 menit komitmen buat diri sendiri ini bakal ngerubah hidup kamu. Selamat mencoba malam ini, ya!"
        ]
      },
      en: {
        title: "Your Nightly Aromatherapy Self-Care Routine",
        excerpt: "Pamper yourself after a busy day. Check out this guide to creating a special nightly self-care routine using natural aromatherapy blends.",
        content: [
          "Ever noticed how your mood in the morning is so often dictated by what you did the night before?",
          "If your evening was rushed and full of stressful thoughts, you automatically wake up feeling drained and unmotivated. That's why having 'me-time' or a solid self-care routine before bed is such a crucial investment for your mental well-being.",
          "It really doesn't have to be anything fancy like sleeping at a five-star hotel. Just by utilizing natural scents (aromatherapy), you can create an equally relaxing nighttime ritual right in your own bedroom.",
          "Step 1: Set the 'Vibe' of the Room",
          "Try this: an hour before you plan to sleep, turn off your phone notifications and dim the screens. Then, turn on your diffuser with a few drops of Lavender, Bergamot, or Chamomile. These scents have a 'grounding' property, meaning they help an overactive, racing mind finally land and settle.",
          "Step 2: Mindful Skincare",
          "So many of us rush through our skincare, just thinking 'let's get this over with'. Starting tonight, try to shift that mindset. Treat it as time to spoil yourself. Especially if you're using a face oil or serum from Annise Herbal, make it a habit to gently massage your face while taking deep breaths to enjoy the scent. It feels incredibly luxurious!",
          "Step 3: Release Shoulder Tension",
          "Sitting and staring at your work screen all day is guaranteed to leave your neck and shoulders feeling stiff as a rock. Try rubbing some Max Pain Relief Oil on the back of your neck and shoulders, then massage it in circles with your thumbs. The warm, relaxing sensation makes muscles practically melt.",
          "Step 4: Take a Deep Breath...",
          "Sit on the edge of your bed, place one hand on your stomach. Inhale slowly through your nose until your stomach expands, then exhale long and slow out through your mouth. Repeat this 3-5 times while breathing in the aromatherapy scent that has now filled the room.",
          "Quality sleep takes preparation, just like any other important thing in life. Committing just 15 minutes to yourself will seriously change your life. Give it a try tonight!"
        ]
      }
    }
  }
];
