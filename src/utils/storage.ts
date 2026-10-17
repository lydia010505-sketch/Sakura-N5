import { UserStats, DayActivity } from '../types';

const STORAGE_KEY = 'sakura_n5_user_stats';

function getTodayString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function getPastDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

// Generate friendly default seed so the analytics and streak charts look vibrant immediately
function createInitialStats(): UserStats {
  const today = getTodayString();
  const history: { [dateStr: string]: DayActivity } = {};

  // Seed last 6 days + today
  const seedData = [
    { daysAgo: 6, xp: 80, minutes: 18, words: 12, quizzes: 3 },
    { daysAgo: 5, xp: 120, minutes: 25, words: 16, quizzes: 4 },
    { daysAgo: 4, xp: 95, minutes: 20, words: 14, quizzes: 3 },
    { daysAgo: 3, xp: 140, minutes: 30, words: 20, quizzes: 5 },
    { daysAgo: 2, xp: 110, minutes: 22, words: 15, quizzes: 4 },
    { daysAgo: 1, xp: 150, minutes: 28, words: 22, quizzes: 5 },
    { daysAgo: 0, xp: 60, minutes: 12, words: 10, quizzes: 2 },
  ];

  seedData.forEach(item => {
    const dStr = getPastDateString(item.daysAgo);
    history[dStr] = {
      date: dStr,
      xp: item.xp,
      minutes: item.minutes,
      wordsReviewed: item.words,
      quizzesTaken: item.quizzes,
    };
  });

  return {
    streakCount: 7,
    lastStudiedDate: today,
    totalXp: 755,
    level: 4,
    totalStudyMinutes: 155,
    dailyGoalMinutes: 20,
    dailyGoalWords: 15,
    history,
    bookmarkedVocabIds: ['v1', 'v5', 'v12', 'v23'],
    masteredVocabIds: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8'],
    masteredGrammarIds: ['g1', 'g2', 'g3'],
    masteredKanjiIds: ['k1', 'k2', 'k3', 'k4', 'k5'],
    quizzesCompletedCount: 26,
    reminders: {
      enabled: true,
      time: '19:30',
      days: [0, 1, 2, 3, 4, 5, 6],
    },
  };
}

export function loadUserStats(): UserStats {
  if (typeof window === 'undefined') return createInitialStats();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialStats();
      saveUserStats(initial);
      return initial;
    }
    const parsed = JSON.parse(raw) as UserStats;

    // Check streak continuation
    const today = getTodayString();
    if (parsed.lastStudiedDate) {
      const last = new Date(parsed.lastStudiedDate);
      const cur = new Date(today);
      const diffDays = Math.round((cur.getTime() - last.getTime()) / (1000 * 3600 * 24));

      if (diffDays > 1) {
        // Streak lost
        parsed.streakCount = 1;
        parsed.lastStudiedDate = today;
      }
    }

    // Ensure today's record exists in history
    if (!parsed.history[today]) {
      parsed.history[today] = {
        date: today,
        xp: 0,
        minutes: 0,
        wordsReviewed: 0,
        quizzesTaken: 0,
      };
    }

    return parsed;
  } catch (err) {
    console.warn('Error loading stats:', err);
    return createInitialStats();
  }
}

export function saveUserStats(stats: UserStats) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.warn('Error saving stats:', err);
  }
}

export function addXpAndActivity(
  stats: UserStats,
  xpEarned: number,
  minutesStudied: number = 2,
  wordsCount: number = 0,
  quizTaken: boolean = false
): UserStats {
  const today = getTodayString();
  const updated = { ...stats };

  updated.totalXp += xpEarned;
  updated.totalStudyMinutes += minutesStudied;

  // Level calculation: 100 XP per level
  updated.level = Math.floor(updated.totalXp / 150) + 1;

  if (!updated.history[today]) {
    updated.history[today] = {
      date: today,
      xp: 0,
      minutes: 0,
      wordsReviewed: 0,
      quizzesTaken: 0,
    };
  }

  const dayRec = updated.history[today];
  dayRec.xp += xpEarned;
  dayRec.minutes += minutesStudied;
  dayRec.wordsReviewed += wordsCount;
  if (quizTaken) {
    dayRec.quizzesTaken += 1;
    updated.quizzesCompletedCount += 1;
  }

  // Update streak if today is new
  if (updated.lastStudiedDate !== today) {
    updated.streakCount += 1;
    updated.lastStudiedDate = today;
  }

  saveUserStats(updated);
  return updated;
}
