export type JLPTLevel = 'N5';

export interface VocabItem {
  id: string;
  word: string; // Kanji or Kana, e.g. 食べる
  reading: string; // Hiragana, e.g. たべる
  romaji: string; // Romaji, e.g. taberu
  meaning: string; // Indonesian, e.g. Makan
  category: string; // e.g. 'Kata Kerja', 'Makanan', 'Salam'
  exampleJa: string; // e.g. 毎朝パンを食べます。
  exampleReading: string; // e.g. まいあさ パンを たべます。
  exampleRomaji: string; // e.g. Maiasa pan o tabemasu.
  exampleId: string; // e.g. Setiap pagi saya makan roti.
  notes?: string;
  pitchAccent?: string; // e.g. '◎' (atamadaka), '①', etc.
}

export interface GrammarExample {
  ja: string;
  reading: string;
  romaji: string;
  id: string;
}

export interface GrammarPractice {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface GrammarItem {
  id: string;
  title: string; // e.g. ～は～です (wa... desu)
  romaji: string;
  meaning: string; // e.g. Menunjukkan subjek dan predikat kalimat
  formula: string; // e.g. [KB1] は [KB2] です
  explanation: string; // Detailed Indonesian explanation
  examples: GrammarExample[];
  practice: GrammarPractice[];
  keyParticle?: string;
}

export interface KanjiExample {
  word: string;
  reading: string;
  meaning: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string; // Indonesian
  strokes: number;
  radical: string;
  jlpt: 'N5';
  examples: KanjiExample[];
  mnemonicHint: string;
}

export interface KanaItem {
  id: string;
  char: string;
  romaji: string;
  type: 'hiragana' | 'katakana' | 'dakuten' | 'youon';
  group: string; // e.g. 'a-gyo', 'ka-gyo'
  mnemonic: string;
}

export type QuizMode = 'multiple_choice' | 'audio_listen' | 'sentence_arrange' | 'kanji_match' | 'flashcard';

export interface QuizQuestion {
  id: string;
  mode: QuizMode;
  question: string;
  audioText?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  category: string;
  scrambledWords?: string[]; // for sentence arrange
}

export interface DayActivity {
  date: string; // YYYY-MM-DD
  xp: number;
  minutes: number;
  wordsReviewed: number;
  quizzesTaken: number;
}

export interface UserStats {
  streakCount: number;
  lastStudiedDate: string; // YYYY-MM-DD
  totalXp: number;
  level: number;
  totalStudyMinutes: number;
  dailyGoalMinutes: number;
  dailyGoalWords: number;
  history: { [dateStr: string]: DayActivity };
  bookmarkedVocabIds: string[];
  masteredVocabIds: string[];
  masteredGrammarIds: string[];
  masteredKanjiIds: string[];
  quizzesCompletedCount: number;
  reminders: {
    enabled: boolean;
    time: string; // "19:00"
    days: number[]; // [0,1,2,3,4,5,6]
  };
}
