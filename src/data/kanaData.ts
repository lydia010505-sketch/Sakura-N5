import { KanaItem } from '../types';

export const HIRAGANA_DATA: KanaItem[] = [
  // Vowels
  { id: 'h-a', char: 'あ', romaji: 'a', type: 'hiragana', group: 'vowel', mnemonic: 'Bentuk seperti huruf A yang meliuk' },
  { id: 'h-i', char: 'い', romaji: 'i', type: 'hiragana', group: 'vowel', mnemonic: 'Dua garis sejajar melengkung' },
  { id: 'h-u', char: 'う', romaji: 'u', type: 'hiragana', group: 'vowel', mnemonic: 'Orang membungkuk kepalanya' },
  { id: 'h-e', char: 'え', romaji: 'e', type: 'hiragana', group: 'vowel', mnemonic: 'Bentuk seperti burung eksotis terbang' },
  { id: 'h-o', char: 'お', romaji: 'o', type: 'hiragana', group: 'vowel', mnemonic: 'Orang sedang bermain bola' },

  // K-row
  { id: 'h-ka', char: 'か', romaji: 'ka', type: 'hiragana', group: 'k', mnemonic: 'Pedang samurai yang memotong cepat' },
  { id: 'h-ki', char: 'き', romaji: 'ki', type: 'hiragana', group: 'k', mnemonic: 'Bentuk seperti kunci (key)' },
  { id: 'h-ku', char: 'く', romaji: 'ku', type: 'hiragana', group: 'k', mnemonic: 'Paruh burung kukang membuka' },
  { id: 'h-ke', char: 'け', romaji: 'ke', type: 'hiragana', group: 'k', mnemonic: 'Tong (keg) anggur kayu' },
  { id: 'h-ko', char: 'こ', romaji: 'ko', type: 'hiragana', group: 'k', mnemonic: 'Dua garis sudut kotak' },

  // S-row
  { id: 'h-sa', char: 'さ', romaji: 'sa', type: 'hiragana', group: 's', mnemonic: 'Gelas sake dengan sedotan' },
  { id: 'h-shi', char: 'し', romaji: 'shi', type: 'hiragana', group: 's', mnemonic: 'Kail pancing ikan di laut' },
  { id: 'h-su', char: 'す', romaji: 'su', type: 'hiragana', group: 's', mnemonic: 'Spiral mie soba' },
  { id: 'h-se', char: 'せ', romaji: 'se', type: 'hiragana', group: 's', mnemonic: 'Orang sedang duduk santai di kursi' },
  { id: 'h-so', char: 'そ', romaji: 'so', type: 'hiragana', group: 's', mnemonic: 'Jalanan zig-zag di bukit' },

  // T-row
  { id: 'h-ta', char: 'た', romaji: 'ta', type: 'hiragana', group: 't', mnemonic: 'Bentuk menyerupai huruf TA' },
  { id: 'h-chi', char: 'ち', romaji: 'chi', type: 'hiragana', group: 't', mnemonic: 'Pemandu sorak (cheerleader) dengan pom-pom' },
  { id: 'h-tsu', char: 'つ', romaji: 'tsu', type: 'hiragana', group: 't', mnemonic: 'Gelombang tsunami menggulung' },
  { id: 'h-te', char: 'て', romaji: 'te', type: 'hiragana', group: 't', mnemonic: 'Telapak tangan melambai' },
  { id: 'h-to', char: 'と', romaji: 'to', type: 'hiragana', group: 't', mnemonic: 'Jari kaki (toe) yang terkena duri' },

  // N-row
  { id: 'h-na', char: 'な', romaji: 'na', type: 'hiragana', group: 'n', mnemonic: 'Suster berdoa di hadapan salib' },
  { id: 'h-ni', char: 'に', romaji: 'ni', type: 'hiragana', group: 'n', mnemonic: 'Jarum dan benang menjahit' },
  { id: 'h-nu', char: 'ぬ', romaji: 'nu', type: 'hiragana', group: 'n', mnemonic: 'Sumpit mengangkat mie (noodle)' },
  { id: 'h-ne', char: 'ね', romaji: 'ne', type: 'hiragana', group: 'n', mnemonic: 'Kucing (neko) dengan ekor melingkar' },
  { id: 'h-no', char: 'の', romaji: 'no', type: 'hiragana', group: 'n', mnemonic: 'Tanda larangan bundar satu garis' },

  // H-row
  { id: 'h-ha', char: 'は', romaji: 'ha', type: 'hiragana', group: 'h', mnemonic: 'Pondok dengan tiang dan atap' },
  { id: 'h-hi', char: 'ひ', romaji: 'hi', type: 'hiragana', group: 'h', mnemonic: 'Mulut tersenyum lebar tertawa hihi' },
  { id: 'h-fu', char: 'ふ', romaji: 'fu', type: 'hiragana', group: 'h', mnemonic: 'Puncak Gunung Fuji yang megah' },
  { id: 'h-he', char: 'へ', romaji: 'he', type: 'hiragana', group: 'h', mnemonic: 'Bentuk bukit (hill) naik dan turun' },
  { id: 'h-ho', char: 'ほ', romaji: 'ho', type: 'hiragana', group: 'h', mnemonic: 'Prajurit memakai topi bertali' },

  // M-row
  { id: 'h-ma', char: 'ま', romaji: 'ma', type: 'hiragana', group: 'm', mnemonic: 'Topeng wajah dengan mata dan alis' },
  { id: 'h-mi', char: 'み', romaji: 'mi', type: 'hiragana', group: 'm', mnemonic: 'Angka 21 yang digabung anggun' },
  { id: 'h-mu', char: 'む', romaji: 'mu', type: 'hiragana', group: 'm', mnemonic: 'Kepala sapi melenguh mooo' },
  { id: 'h-me', char: 'め', romaji: 'me', type: 'hiragana', group: 'm', mnemonic: 'Bentuk mata (me) manusia' },
  { id: 'h-mo', char: 'も', romaji: 'mo', type: 'hiragana', group: 'm', mnemonic: 'Kail pancing ikan monster yang kuat' },

  // Y-row
  { id: 'h-ya', char: 'や', romaji: 'ya', type: 'hiragana', group: 'y', mnemonic: 'Kepala yak (hewan lembu berbulu)' },
  { id: 'h-yu', char: 'ゆ', romaji: 'yu', type: 'hiragana', group: 'y', mnemonic: 'Ikan berenang gesit di air' },
  { id: 'h-yo', char: 'よ', romaji: 'yo', type: 'hiragana', group: 'y', mnemonic: 'Orang bermain yoyo' },

  // R-row
  { id: 'h-ra', char: 'ら', romaji: 'ra', type: 'hiragana', group: 'r', mnemonic: 'Kelinci (rabbit) berdiri dua kaki' },
  { id: 'h-ri', char: 'り', romaji: 'ri', type: 'hiragana', group: 'r', mnemonic: 'Pita rambut pita (ribbon) menjuntai' },
  { id: 'h-ru', char: 'る', romaji: 'ru', type: 'hiragana', group: 'r', mnemonic: 'Rute jalan dengan putaran bundar' },
  { id: 'h-re', char: 'れ', romaji: 're', type: 'hiragana', group: 'r', mnemonic: 'Orang sedang berlutut berdoa' },
  { id: 'h-ro', char: 'ろ', romaji: 'ro', type: 'hiragana', group: 'r', mnemonic: 'Jalan melingkar tanpa lingkaran ujung' },

  // W-row & N
  { id: 'h-wa', char: 'わ', romaji: 'wa', type: 'hiragana', group: 'w', mnemonic: 'Angsa putih elegan bersayap melengkung' },
  { id: 'h-wo', char: 'を', romaji: 'wo (o)', type: 'hiragana', group: 'w', mnemonic: 'Partikel objek penanda aksi' },
  { id: 'h-n', char: 'ん', romaji: 'n', type: 'hiragana', group: 'w', mnemonic: 'Mirip huruf n latin dalam tulisan sambung' },
];

export const KATAKANA_DATA: KanaItem[] = [
  { id: 'k-a', char: 'ア', romaji: 'a', type: 'katakana', group: 'vowel', mnemonic: 'Kapak tajam mengarah ke bawah' },
  { id: 'k-i', char: 'イ', romaji: 'i', type: 'katakana', group: 'vowel', mnemonic: 'Bentuk kuda-kuda bela diri' },
  { id: 'k-u', char: 'ウ', romaji: 'u', type: 'katakana', group: 'vowel', mnemonic: 'Atap rumah tradisional' },
  { id: 'k-e', char: 'エ', romaji: 'e', type: 'katakana', group: 'vowel', mnemonic: 'Balok elevator lift baja' },
  { id: 'k-o', char: 'オ', romaji: 'o', type: 'katakana', group: 'vowel', mnemonic: 'Pria gagah memakai jas panjang' },

  { id: 'k-ka', char: 'カ', romaji: 'ka', type: 'katakana', group: 'k', mnemonic: 'Mirip huruf Hiragana か versi tegas' },
  { id: 'k-ki', char: 'キ', romaji: 'ki', type: 'katakana', group: 'k', mnemonic: 'Kunci logam segi empat' },
  { id: 'k-ku', char: 'ク', romaji: 'ku', type: 'katakana', group: 'k', mnemonic: 'Koki memasak dengan topi miring' },
  { id: 'k-ke', char: 'ケ', romaji: 'ke', type: 'katakana', group: 'k', mnemonic: 'Bentuk kemoceng pembersih' },
  { id: 'k-ko', char: 'コ', romaji: 'ko', type: 'katakana', group: 'k', mnemonic: 'Siku sudut kotak 90 derajat' },

  { id: 'k-sa', char: 'サ', romaji: 'sa', type: 'katakana', group: 's', mnemonic: 'Tiga bilah bambu pagar' },
  { id: 'k-shi', char: 'シ', romaji: 'shi', type: 'katakana', group: 's', mnemonic: 'Tiga cipratan ombak tsunami dari bawah ke atas' },
  { id: 'k-su', char: 'ス', romaji: 'su', type: 'katakana', group: 's', mnemonic: 'Papan seluncur ski es' },
  { id: 'k-se', char: 'セ', romaji: 'se', type: 'katakana', group: 's', mnemonic: 'Satu set meja makan' },
  { id: 'k-so', char: 'ソ', romaji: 'so', type: 'katakana', group: 's', mnemonic: 'Dua jarum kompas menunjuk dari atas ke bawah' },

  { id: 'k-ta', char: 'タ', romaji: 'ta', type: 'katakana', group: 't', mnemonic: 'Tenda kemping terbuka' },
  { id: 'k-chi', char: 'チ', romaji: 'chi', type: 'katakana', group: 't', mnemonic: 'Pemandu sorak memegang bendera' },
  { id: 'k-tsu', char: 'ツ', romaji: 'tsu', type: 'katakana', group: 't', mnemonic: 'Cipratan air jatuh dari atas ke bawah' },
  { id: 'k-te', char: 'テ', romaji: 'te', type: 'katakana', group: 't', mnemonic: 'Tiang antena televisi (TV)' },
  { id: 'k-to', char: 'ト', romaji: 'to', type: 'katakana', group: 't', mnemonic: 'Pohon pinus berdiri kokoh' },

  { id: 'k-na', char: 'ナ', romaji: 'na', type: 'katakana', group: 'n', mnemonic: 'Pedang silang ninja' },
  { id: 'k-ni', char: 'ニ', romaji: 'ni', type: 'katakana', group: 'n', mnemonic: 'Dua garis lurus sejajar (angka 2 kanji)' },
  { id: 'k-nu', char: 'ヌ', romaji: 'nu', type: 'katakana', group: 'n', mnemonic: 'Sumpit kayu tajam' },
  { id: 'k-ne', char: 'ネ', romaji: 'ne', type: 'katakana', group: 'n', mnemonic: 'Tiang bendera berayun' },
  { id: 'k-no', char: 'ノ', romaji: 'no', type: 'katakana', group: 'n', mnemonic: 'Satu tebasan pedang miring' },

  { id: 'k-ha', char: 'ハ', romaji: 'ha', type: 'katakana', group: 'h', mnemonic: 'Dua kaki melangkah tegak' },
  { id: 'k-hi', char: 'ヒ', romaji: 'hi', type: 'katakana', group: 'h', mnemonic: 'Pijakan kaki pendaki' },
  { id: 'k-fu', char: 'フ', romaji: 'fu', type: 'katakana', group: 'h', mnemonic: 'Gagang payung lipat' },
  { id: 'k-he', char: 'ヘ', romaji: 'he', type: 'katakana', group: 'h', mnemonic: 'Bentuk atap sama persis dengan hiragana' },
  { id: 'k-ho', char: 'ホ', romaji: 'ho', type: 'katakana', group: 'h', mnemonic: 'Salib suci berhiaskan mahkota' },

  { id: 'k-ma', char: 'マ', romaji: 'ma', type: 'katakana', group: 'm', mnemonic: 'Mata uang koin yang dimasukkan' },
  { id: 'k-mi', char: 'ミ', romaji: 'mi', type: 'katakana', group: 'm', mnemonic: 'Tiga helai bulu burung merak' },
  { id: 'k-mu', char: 'ム', romaji: 'mu', type: 'katakana', group: 'm', mnemonic: 'Bentuk segitiga piramida sudut' },
  { id: 'k-me', char: 'メ', romaji: 'me', type: 'katakana', group: 'm', mnemonic: 'Tanda silang samurai X' },
  { id: 'k-mo', char: 'モ', romaji: 'mo', type: 'katakana', group: 'm', mnemonic: 'Versi siku tegak dari も' },

  { id: 'k-ya', char: 'ヤ', romaji: 'ya', type: 'katakana', group: 'y', mnemonic: 'Tanduk rusa jantan' },
  { id: 'k-yu', char: 'ユ', romaji: 'yu', type: 'katakana', group: 'y', mnemonic: 'Kait derek derek derekan' },
  { id: 'k-yo', char: 'ヨ', romaji: 'yo', type: 'katakana', group: 'y', mnemonic: 'Bentuk mainan yoyo bertingkat' },

  { id: 'k-ra', char: 'ラ', romaji: 'ra', type: 'katakana', group: 'r', mnemonic: 'Lampu gantung plafon' },
  { id: 'k-ri', char: 'リ', romaji: 'ri', type: 'katakana', group: 'r', mnemonic: 'Dua batang sungai mengalir' },
  { id: 'k-ru', char: 'ル', romaji: 'ru', type: 'katakana', group: 'r', mnemonic: 'Dua kaki melompat lincah' },
  { id: 'k-re', char: 'レ', romaji: 're', type: 'katakana', group: 'r', mnemonic: 'Tanda centang checklist periksa' },
  { id: 'k-ro', char: 'ロ', romaji: 'ro', type: 'katakana', group: 'r', mnemonic: 'Kotak jendela persegi penuh' },

  { id: 'k-wa', char: 'ワ', romaji: 'wa', type: 'katakana', group: 'w', mnemonic: 'Pintu gerbang gapura' },
  { id: 'k-wo', char: 'ヲ', romaji: 'wo', type: 'katakana', group: 'w', mnemonic: 'Kait derek pelabuhan kapal' },
  { id: 'k-n', char: 'ン', romaji: 'n', type: 'katakana', group: 'w', mnemonic: 'Dua garis meluncur dari kiri bawah ke kanan atas' },
];
