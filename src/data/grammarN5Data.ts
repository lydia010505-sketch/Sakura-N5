import { GrammarItem } from '../types';

export const GRAMMAR_N5_DATA: GrammarItem[] = [
  {
    id: 'g1',
    title: '～は～です',
    romaji: '[A] wa [B] desu',
    meaning: '[A] adalah [B]',
    formula: 'Kata Benda 1 + は (wa) + Kata Benda 2 + です (desu)',
    explanation: 'Pola kalimat paling mendasar dalam bahasa Jepang. Partikel は (ditulis "ha" namun dilafalkan "wa") berfungsi sebagai penanda topik kalimat. Sedangkan です (desu) berfungsi sebagai kopula penegas predikat yang memberikan nuansa sopan.',
    keyParticle: 'は (wa)',
    examples: [
      {
        ja: '私は学生です。',
        reading: 'わたしは がくせいです。',
        romaji: 'Watashi wa gakusei desu.',
        id: 'Saya adalah seorang pelajar / mahasiswa.',
      },
      {
        ja: '田中さんは日本人です。',
        reading: 'たなかさんは にほんじんです。',
        romaji: 'Tanaka-san wa Nihonjin desu.',
        id: 'Tanaka adalah orang Jepang.',
      },
      {
        ja: '今日は月曜日です。',
        reading: 'きょうは げつようびです。',
        romaji: 'Kyou wa getsuyoubi desu.',
        id: 'Hari ini adalah hari Senin.',
      },
    ],
    practice: [
      {
        question: 'Lengkapi kalimat: "Watashi ___ Ridi desu" (Saya adalah Ridi)',
        options: ['は (wa)', 'を (o)', 'に (ni)', 'で (de)'],
        answerIndex: 0,
        explanation: 'Partikel は (wa) digunakan untuk menandai subjek / topik "watashi" (saya).',
      },
      {
        question: 'Pilihlah terjemahan yang tepat untuk: "Tanaka-san adalah dokter"',
        options: [
          'Tanaka-san wa isha desu.',
          'Tanaka-san o isha desu.',
          'Tanaka-san ga isha dewa arimasen.',
          'Tanaka-san no isha desu.',
        ],
        answerIndex: 0,
        explanation: 'Rumusnya adalah [A] wa [B] desu, jadi: Tanaka-san wa isha desu.',
      },
    ],
  },
  {
    id: 'g2',
    title: '～じゃありません / ではありません',
    romaji: '[A] wa [B] ja arimasen / dewa arimasen',
    meaning: '[A] bukan / tidak adalah [B]',
    formula: 'Kata Benda 1 + は + Kata Benda 2 + じゃありません / ではありません',
    explanation: 'Bentuk negatif dari です (desu). Dalam percakapan sehari-hari lebih sering memakai "ja arimasen", sedangkan "dewa arimasen" lebih formal atau digunakan dalam situasi resmi/tulisan.',
    keyParticle: 'じゃありません',
    examples: [
      {
        ja: '私は先生じゃありません。',
        reading: 'わたしは せんせいじゃ ありません。',
        romaji: 'Watashi wa sensei ja arimasen.',
        id: 'Saya bukan seorang guru.',
      },
      {
        ja: 'ここは図書館ではありません。',
        reading: 'ここは としょかんでは ありません。',
        romaji: 'Koko wa toshokan dewa arimasen.',
        id: 'Di sini bukan perpustakaan.',
      },
    ],
    practice: [
      {
        question: 'Bentuk negatif dari "Kore wa hon desu" (Ini adalah buku) adalah...',
        options: [
          'Kore wa hon ja arimasen.',
          'Kore wa hon deshita.',
          'Kore wa hon deshou.',
          'Kore wa hon o tabemasu.',
        ],
        answerIndex: 0,
        explanation: 'Untuk mengubah "desu" menjadi negatif bentuk sopan, ganti dengan "ja arimasen" atau "dewa arimasen".',
      },
    ],
  },
  {
    id: 'g3',
    title: '～ですか (Kalimat Tanya)',
    romaji: '[Kalimat] + ka',
    meaning: 'Apakah... ?',
    formula: 'Kalimat dasar + か (ka) di akhir kalimat',
    explanation: 'Partikel か (ka) di akhir kalimat berfungsi seperti tanda tanya (?) dalam bahasa Indonesia. Tidak memerlukan intonasi tanda tanya yang berlebihan karena "ka" sudah otomatis menandakan pertanyaan.',
    keyParticle: 'か (ka)',
    examples: [
      {
        ja: 'あなたは学生ですか。',
        reading: 'あなたは がくせいですか。',
        romaji: 'Anata wa gakusei desu ka.',
        id: 'Apakah Anda seorang pelajar?',
      },
      {
        ja: 'あれは誰の傘ですか。',
        reading: 'あれは だれの かさですか。',
        romaji: 'Are wa dare no kasa desu ka.',
        id: 'Itu payung milik siapa?',
      },
    ],
    practice: [
      {
        question: 'Cara menanyakan "Apakah ini mobilmu?" yang benar adalah...',
        options: [
          'Kore wa anata no kuruma desu ka.',
          'Kore wa anata no kuruma desu.',
          'Kore wa anata no kuruma deshita.',
          'Kore o anata no kuruma desu ka.',
        ],
        answerIndex: 0,
        explanation: 'Tambahkan partikel か (ka) di akhir kalimat untuk membuat kalimat tanya.',
      },
    ],
  },
  {
    id: 'g4',
    title: 'Partikel の (Kepemilikan & Penjelas)',
    romaji: '[KB 1] no [KB 2]',
    meaning: '[KB 2] milik / tentang [KB 1]',
    formula: 'Kata Benda 1 + の (no) + Kata Benda 2',
    explanation: 'Partikel の (no) menghubungkan dua kata benda. Sering kali menyatakan kepemilikan (seperti "watashi no hon" = buku saya) atau hubungan penjelas (seperti "nihongo no sensei" = guru bahasa Jepang). Urutannya terbalik dari bahasa Indonesia: pemilik/kategori di depan, bendanya di belakang.',
    keyParticle: 'の (no)',
    examples: [
      {
        ja: 'これは私の本です。',
        reading: 'これは わたしの ほんです。',
        romaji: 'Kore wa watashi no hon desu.',
        id: 'Ini adalah buku saya.',
      },
      {
        ja: 'さくらさんは日本語の先生です。',
        reading: 'さくらさんは にほんごの せんせいです。',
        romaji: 'Sakura-san wa nihongo no sensei desu.',
        id: 'Sakura adalah guru bahasa Jepang.',
      },
    ],
    practice: [
      {
        question: 'Bagaimana mengatakan "Mobil ayah" dalam bahasa Jepang?',
        options: [
          'Chichi no kuruma',
          'Kuruma no chichi',
          'Chichi wa kuruma',
          'Kuruma wa chichi',
        ],
        answerIndex: 0,
        explanation: 'Pemilik diletakkan di depan diikuti partikel の: Chichi no kuruma.',
      },
    ],
  },
  {
    id: 'g5',
    title: 'Partikel を (Penanda Objek Penderita)',
    romaji: '[Objek] o + [Kata Kerja]',
    meaning: 'Melakukan [Kata Kerja] terhadap [Objek]',
    formula: 'Kata Benda (Objek) + を (o) + Kata Kerja',
    explanation: 'Huruf hiragana を ditulis "wo", tetapi selalu dilafalkan "o". Partikel ini secara eksklusif menandai objek langsung dari kata kerja transitif (kata kerja yang butuh objek).',
    keyParticle: 'を (o)',
    examples: [
      {
        ja: 'パンを食べます。',
        reading: 'ぱんを たべます。',
        romaji: 'Pan o tabemasu.',
        id: 'Makan roti.',
      },
      {
        ja: '水を飲みます。',
        reading: 'みずを のみます。',
        romaji: 'Mizu o nomimasu.',
        id: 'Minum air putih.',
      },
      {
        ja: '本を読みます。',
        reading: 'ほんを よみます。',
        romaji: 'Hon o yomimasu.',
        id: 'Membaca buku.',
      },
    ],
    practice: [
      {
        question: 'Lengkapi: "Ongaku ___ kikimasu" (Mendengarkan musik)',
        options: ['を (o)', 'は (wa)', 'に (ni)', 'で (de)'],
        answerIndex: 0,
        explanation: 'Musik adalah objek yang didengarkan, jadi gunakan partikel を (o).',
      },
    ],
  },
  {
    id: 'g6',
    title: 'Partikel へ / に (Arah Tujuan Pergi)',
    romaji: '[Tempat] e / ni + ikimasu / kimasu / kaerimasu',
    meaning: 'Pergi / Datang / Pulang ke [Tempat]',
    formula: 'Tempat + へ (dibaca "e") / に (ni) + 行きます / 来ます / 帰ります',
    explanation: 'Menunjukkan arah tujuan pergerakan. Huruf hiragana へ ditulis "he" tetapi saat menjadi partikel arah dibaca "e". Partikel に (ni) juga bisa digunakan dengan makna fokus titik tujuan akhir yang dituju.',
    keyParticle: 'へ (e) / に (ni)',
    examples: [
      {
        ja: '明日、東京へ行きます。',
        reading: 'あした、とうきょうへ いきます。',
        romaji: 'Ashita, Toukyou e ikimasu.',
        id: 'Besok saya pergi ke Tokyo.',
      },
      {
        ja: 'うちへ帰ります。',
        reading: 'うちへ かえります。',
        romaji: 'Uchi e kaerimasu.',
        id: 'Saya pulang ke rumah.',
      },
    ],
    practice: [
      {
        question: 'Partikel mana yang paling tepat untuk: "Gakkou ___ ikimasu" (Pergi ke sekolah)?',
        options: ['へ (e)', 'を (o)', 'で (de)', 'と (to)'],
        answerIndex: 0,
        explanation: 'Partikel へ (e) atau に (ni) digunakan untuk tujuan pergerakan.',
      },
    ],
  },
  {
    id: 'g7',
    title: 'Partikel で (Tempat Aksi & Sarana/Alat)',
    romaji: '[Tempat/Alat] de + [Kata Kerja]',
    meaning: 'Di [Tempat aksi] / Dengan/Naik [Sarana/Alat]',
    formula: 'Tempat + で + Aksi ATAU Alat/Kendaraan + で + Aksi',
    explanation: 'Partikel で (de) memiliki 2 fungsi utama di N5: (1) Menandai tempat terjadinya suatu aktivitas (berbeda dengan に yang hanya untuk letak keberadaan), dan (2) Menandai alat, media, bahasa, atau sarana transportasi yang digunakan.',
    keyParticle: 'で (de)',
    examples: [
      {
        ja: '図書館で本を読みます。',
        reading: 'としょかんで ほんを よみます。',
        romaji: 'Toshokan de hon o yomimasu.',
        id: 'Membaca buku di perpustakaan (tempat aktivitas).',
      },
      {
        ja: '電車で会社へ行きます。',
        reading: 'でんしゃで かいしゃへ いきます。',
        romaji: 'Densha de kaisha e ikimasu.',
        id: 'Pergi ke kantor naik kereta (sarana transportasi).',
      },
      {
        ja: '箸でご飯を食べます。',
        reading: 'はしで ごはんを たべます。',
        romaji: 'Hashi de gohan o tabemasu.',
        id: 'Makan nasi dengan sumpit (alat).',
      },
    ],
    practice: [
      {
        question: '"Basu ___ ikimasu" (Pergi dengan bis). Partikel yang tepat adalah...',
        options: ['で (de)', 'を (o)', 'へ (e)', 'に (ni)'],
        answerIndex: 0,
        explanation: 'Bis adalah alat transportasi, sehingga ditandai dengan partikel で (de).',
      },
    ],
  },
  {
    id: 'g8',
    title: '～があります / います (Keberadaan Ada)',
    romaji: '[Benda/Tempat] ni [Sesuatu] ga arimasu / imasu',
    meaning: 'Ada [Sesuatu] di [Tempat]',
    formula: 'Tempat + に + Benda Mati + があります ATAU Tempat + に + Makhluk Hidup + がいます',
    explanation: 'Dalam bahasa Jepang ada perbedaan tegas untuk kata "ada": (1) あります (arimasu) digunakan untuk benda mati atau tanaman, sedangkan (2) います (imasu) digunakan untuk makhluk bernyawa yang bergerak sendiri seperti manusia dan hewan.',
    keyParticle: 'あります / います',
    examples: [
      {
        ja: '机の上に本があります。',
        reading: 'つくえの うえに ほんが あります。',
        romaji: 'Tsukue no ue ni hon ga arimasu.',
        id: 'Di atas meja ada buku (benda mati).',
      },
      {
        ja: '部屋に猫がいます。',
        reading: 'へやに ねこが います。',
        romaji: 'Heya ni neko ga imasu.',
        id: 'Di dalam kamar ada kucing (makhluk hidup).',
      },
    ],
    practice: [
      {
        question: 'Untuk kalimat: "Di taman ada anak-anak", kata "ada" yang benar adalah...',
        options: ['います (imasu)', 'あります (arimasu)', 'です (desu)', 'します (shimasu)'],
        answerIndex: 0,
        explanation: 'Anak-anak adalah manusia (makhluk bernyawa), jadi menggunakan います (imasu).',
      },
    ],
  },
  {
    id: 'g9',
    title: '～たいです (Keinginan - Ingin Melakukan)',
    romaji: 'KK (Bentuk Masu tanpa masu) + tai desu',
    meaning: 'Ingin melakukan...',
    formula: 'Kata Kerja akar (stem -masu) + たいです (tai desu)',
    explanation: 'Menyatakan keinginan pembicara (orang pertama) untuk melakukan sesuatu. Caranya: buang akhiran -masu dari kata kerja bentuk sopan, lalu tempelkan -tai desu. Contoh: tabemasu -> tabetai desu.',
    keyParticle: 'たいです (tai desu)',
    examples: [
      {
        ja: '日本へ行きたいです。',
        reading: 'にほんへ いきたいです。',
        romaji: 'Nihon e ikitai desu.',
        id: 'Saya ingin pergi ke Jepang.',
      },
      {
        ja: 'ラーメンを食べたいです。',
        reading: 'らーめんを たべたいです。',
        romaji: 'Raamen o tabetai desu.',
        id: 'Saya ingin makan ramen.',
      },
    ],
    practice: [
      {
        question: 'Bentuk keinginan dari "nomimasu" (minum) adalah...',
        options: ['nomitai desu', 'nomimasutai', 'nomite kudasai', 'nomitai ja arimasen'],
        answerIndex: 0,
        explanation: 'Hilangkan "masu" lalu ganti dengan "tai desu": nomimasu -> nomitai desu.',
      },
    ],
  },
  {
    id: 'g10',
    title: '～てください (Permohonan Tolong)',
    romaji: 'KK Bentuk-te + kudasai',
    meaning: 'Tolong / Silakan lakukan...',
    formula: 'Kata Kerja bentuk-Te + ください (kudasai)',
    explanation: 'Digunakan untuk meminta tolong, instruksi sopan, atau mempersilakan orang lain melakukan sesuatu secara ramah dan sopan.',
    keyParticle: 'てください (te kudasai)',
    examples: [
      {
        ja: 'ちょっと待ってください。',
        reading: 'ちょっと まってください。',
        romaji: 'Chotto matte kudasai.',
        id: 'Tolong tunggu sebentar.',
      },
      {
        ja: '日本語で書いてください。',
        reading: 'にほんごで かいてください。',
        romaji: 'Nihongo de kaite kudasai.',
        id: 'Tolong tulis dalam bahasa Jepang.',
      },
    ],
    practice: [
      {
        question: 'Bentuk tolong dari "kikimasu" (mendengar) adalah...',
        options: ['kiite kudasai', 'kikite kudasai', 'kikimasu kudasai', 'kiite arimasu'],
        answerIndex: 0,
        explanation: 'Kikimasu berubah ke bentuk-te menjadi "kiite", lalu ditambah "kudasai": kiite kudasai.',
      },
    ],
  },
  {
    id: 'g11',
    title: '～てもいいです (Izin / Boleh)',
    romaji: 'KK Bentuk-te + mo ii desu',
    meaning: 'Boleh melakukan...',
    formula: 'Kata Kerja bentuk-Te + もいいです (mo ii desu)',
    explanation: 'Digunakan untuk memberikan izin atau jika ditambah "ka" di akhir (～てもいいですか) menjadi permohonan izin: "Bolehkah saya... ?"',
    keyParticle: 'てもいいです (te mo ii desu)',
    examples: [
      {
        ja: '写真を撮ってもいいですか。',
        reading: 'しゃしんを とっても いいですか。',
        romaji: 'Shashin o totte mo ii desu ka.',
        id: 'Bolehkah saya mengambil foto di sini?',
      },
      {
        ja: 'ここに座ってもいいです。',
        reading: 'ここに すわっても いいです。',
        romaji: 'Koko ni suwatte mo ii desu.',
        id: 'Anda boleh duduk di sini.',
      },
    ],
    practice: [
      {
        question: '"Bolehkah saya pulang sekarang?" dalam bahasa Jepang adalah...',
        options: [
          'Ima kaette mo ii desu ka.',
          'Ima kaette kudasai.',
          'Ima kaette wa ikemasen.',
          'Ima kaeritai desu ka.',
        ],
        answerIndex: 0,
        explanation: 'Permintaan izin menggunakan bentuk ～てもいいですか (te mo ii desu ka).',
      },
    ],
  },
  {
    id: 'g12',
    title: '～てはいけません (Larangan / Tidak Boleh)',
    romaji: 'KK Bentuk-te + wa ikemasen',
    meaning: 'Tidak boleh / Dilarang melakukan...',
    formula: 'Kata Kerja bentuk-Te + はいけません (wa ikemasen)',
    explanation: 'Digunakan untuk menyatakan aturan larangan tegas bahwa sesuatu tidak boleh dilakukan.',
    keyParticle: 'てはいけません (te wa ikemasen)',
    examples: [
      {
        ja: 'ここでタバコを吸ってはいけません。',
        reading: 'ここで たばこを すっては いけません。',
        romaji: 'Koko de tabako o sutte wa ikemasen.',
        id: 'Dilarang merokok di sini.',
      },
      {
        ja: 'テスト中に話してはいけません。',
        reading: 'てすとちゅうに はなしては いけません。',
        romaji: 'Tesuto-chuu ni hanashite wa ikemasen.',
        id: 'Tidak boleh berbicara saat ujian berlangsung.',
      },
    ],
    practice: [
      {
        question: 'Terjemahkan: "Tidak boleh makan di sini"',
        options: [
          'Koko de tabete wa ikemasen.',
          'Koko de tabete mo ii desu.',
          'Koko de tabete kudasai.',
          'Koko de tabetakunai desu.',
        ],
        answerIndex: 0,
        explanation: 'Rumus larangan: bentuk-te + wa ikemasen (tabete wa ikemasen).',
      },
    ],
  },
  {
    id: 'g13',
    title: '～から～まで (Rentang Waktu / Tempat)',
    romaji: '[A] kara [B] made',
    meaning: 'Dari [A] sampai [B]',
    formula: '[Titik awal] + から (kara) + [Titik akhir] + まで (made)',
    explanation: 'Menyatakan permulaan (から = dari) dan batas akhir (まで = sampai), baik untuk dimensi waktu (jam/hari) maupun letak geografis (stasiun/tempat).',
    keyParticle: 'から～まで',
    examples: [
      {
        ja: '銀行は９時から３時までです。',
        reading: 'ぎんこうは くじから さんじまでです。',
        romaji: 'Ginkou wa kuji kara sanji made desu.',
        id: 'Bank buka dari jam 9 sampai jam 3.',
      },
      {
        ja: '東京から大阪まで新幹線で行きます。',
        reading: 'とうきょうから おおさかまで しんかんせんで いきます。',
        romaji: 'Toukyou kara Oosaka made shinkansen de ikimasu.',
        id: 'Pergi dari Tokyo sampai Osaka naik Shinkansen.',
      },
    ],
    practice: [
      {
        question: 'Partikel untuk "dari" adalah...',
        options: ['から (kara)', 'まで (made)', 'より (yori)', 'と (to)'],
        answerIndex: 0,
        explanation: 'から (kara) artinya "dari" atau "sejak".',
      },
    ],
  },
  {
    id: 'g14',
    title: '～が好きです / 嫌いです (Suka & Tidak Suka)',
    romaji: '[Objek] ga suki desu / kirai desu',
    meaning: 'Suka / Benci terhadap [Objek]',
    formula: 'Kata Benda + が (ga) + 好きです (suki desu) / 嫌いです (kirai desu)',
    explanation: 'Catatan penting: "Suki" dan "Kirai" dalam bahasa Jepang adalah Kata Sifat -na, BUKAN kata kerja! Karena itu, benda yang disukai ditandai dengan partikel が (ga), bukan を (o).',
    keyParticle: 'が好きです (ga suki desu)',
    examples: [
      {
        ja: '私は日本のアニメが好きです。',
        reading: 'わたしは にほんの あにめが すきです。',
        romaji: 'Watashi wa Nihon no anime ga suki desu.',
        id: 'Saya suka anime Jepang.',
      },
      {
        ja: '辛い食べ物が嫌いです。',
        reading: 'からい たべものが きらいです。',
        romaji: 'Karai tabemono ga kirai desu.',
        id: 'Saya tidak suka/benci makanan pedas.',
      },
    ],
    practice: [
      {
        question: 'Partikel mana yang mendampingi "suki desu"?',
        options: ['が (ga)', 'を (o)', 'で (de)', 'へ (e)'],
        answerIndex: 0,
        explanation: 'Objek yang disukai selalu ditandai dengan partikel が (ga).',
      },
    ],
  },
  {
    id: 'g15',
    title: '～ましょう / ～ましょうか (Ajakan)',
    romaji: 'KK akar + mashou / mashou ka',
    meaning: 'Ayo... / Bagaimana kalau kita... ?',
    formula: 'Kata Kerja akar (stem -masu) + ましょう / ましょうか',
    explanation: 'Bentuk ～ましょう (mashou) berarti "Ayo kita lakukan!" (ajakan tegas bersemangat). Sedangkan ～ましょうか (mashou ka) adalah tawaran ramah atau usulan: "Bagaimana kalau saya bantu?" atau "Mari kita mulai sekarang?".',
    keyParticle: 'ましょう (mashou)',
    examples: [
      {
        ja: '一緒にお茶を飲みましょう。',
        reading: 'いっしょに おちゃを のみましょう。',
        romaji: 'Issho ni ocha o nomimashou.',
        id: 'Mari kita minum teh bersama-sama.',
      },
      {
        ja: '手伝いましょうか。',
        reading: 'てつだいましょうか。',
        romaji: 'Tetsudaimashou ka.',
        id: 'Bolehkah / maukah saya bantu?',
      },
    ],
    practice: [
      {
        question: 'Ajakan untuk kata "Makan" (Tabemasu) menjadi...',
        options: ['Tabemashou', 'Tabetai', 'Tabete kudasai', 'Tabenakereba narimasen'],
        answerIndex: 0,
        explanation: 'Tabemasu -> Tabemashou (Ayo kita makan!).',
      },
    ],
  },
];
