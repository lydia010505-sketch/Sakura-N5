import React, { useState } from 'react';
import { 
  Flame, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Trophy, 
  CheckCircle, 
  Target, 
  Award,
  Sparkles
} from 'lucide-react';
import { UserStats } from '../types';

interface AnalyticsSectionProps {
  stats: UserStats;
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ stats }) => {
  const [metricView, setMetricView] = useState<'xp' | 'minutes' | 'words'>('xp');

  // Prepare past 7 days data for the chart
  const daysList = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('id-ID', { weekday: 'short' });
    const activity = stats.history[dateStr] || {
      xp: 0,
      minutes: 0,
      wordsReviewed: 0,
      quizzesTaken: 0,
    };
    daysList.push({
      dateStr,
      dayName,
      ...activity,
    });
  }

  // Calculate maximum for chart scale
  const maxVal = Math.max(...daysList.map(d => (metricView === 'xp' ? d.xp : metricView === 'minutes' ? d.minutes : d.wordsReviewed)), 10);

  // Mastery Percentages
  const vocabPercent = Math.min(100, Math.round((stats.masteredVocabIds.length / 52) * 100));
  const grammarPercent = Math.min(100, Math.round((stats.masteredGrammarIds.length / 15) * 100));
  const kanjiPercent = Math.min(100, Math.round((stats.masteredKanjiIds.length / 24) * 100));
  const overallReadiness = Math.round((vocabPercent + grammarPercent + kanjiPercent) / 3);

  // Today activity
  const todayStr = now.toISOString().split('T')[0];
  const todayRec = stats.history[todayStr] || { xp: 0, minutes: 0, wordsReviewed: 0, quizzesTaken: 0 };
  const dailyGoalPercent = Math.min(100, Math.round((todayRec.minutes / (stats.dailyGoalMinutes || 20)) * 100));

  return (
    <div className="space-y-6">
      {/* Top Banner: JLPT N5 Readiness & Streak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Streak Card */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-5 text-white shadow-md shadow-amber-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-100 bg-amber-700/40 px-2 py-0.5 rounded-full">
                Konsistensi Harian
              </span>
              <Flame className="w-5 h-5 text-amber-200 fill-amber-200 animate-pulse" />
            </div>
            <div className="text-3xl sm:text-4xl font-black">
              {stats.streakCount} <span className="text-lg font-bold">Hari Berturut-turut</span>
            </div>
            <p className="text-xs text-amber-100 mt-1 leading-relaxed">
              Hebat! Konsistensi belajar harian adalah kunci utama lulus ujian JLPT N5.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-400/40 flex items-center justify-between text-xs font-semibold">
            <span>Target Harian: 20 Menit</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg">Terjaga 🔥</span>
          </div>
        </div>

        {/* Total XP & Level */}
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl p-5 text-white shadow-md shadow-rose-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-100 bg-rose-700/40 px-2 py-0.5 rounded-full">
                Peringkat & XP
              </span>
              <Trophy className="w-5 h-5 text-rose-200" />
            </div>
            <div className="text-3xl sm:text-4xl font-black">
              Level {stats.level} <span className="text-sm font-semibold opacity-90">({stats.totalXp} XP)</span>
            </div>
            <p className="text-xs text-rose-100 mt-1 leading-relaxed">
              Gelar: <strong className="text-white">Calon Penakluk N5</strong>. Terus selesaikan kuis untuk naik level!
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-400/40 flex items-center justify-between text-xs font-semibold">
            <span>Total Waktu Belajar:</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg">{stats.totalStudyMinutes} Menit</span>
          </div>
        </div>

        {/* JLPT Readiness Gauge */}
        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Kesiapan Ujian N5
              </span>
              <Award className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{overallReadiness}%</span>
              <span className="text-xs font-semibold text-emerald-600">Menuju Siap Ujian</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-rose-500 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${overallReadiness}%` }}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-bold">KATA</span>
              <strong className="text-slate-800">{vocabPercent}%</strong>
            </div>
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-bold">TATA</span>
              <strong className="text-slate-800">{grammarPercent}%</strong>
            </div>
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-bold">KANJI</span>
              <strong className="text-slate-800">{kanjiPercent}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 7-Day Activity Chart */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-rose-100 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-600" />
              Grafik Perkembangan Harian (7 Hari Terakhir)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pantau aktivitas belajar, menit latihan, dan perolehan XP kamu setiap hari.
            </p>
          </div>

          {/* Metric Selector Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setMetricView('xp')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                metricView === 'xp' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              XP Poin
            </button>
            <button
              onClick={() => setMetricView('minutes')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                metricView === 'minutes' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Menit Belajar
            </button>
            <button
              onClick={() => setMetricView('words')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                metricView === 'words' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kata Diulang
            </button>
          </div>
        </div>

        {/* Custom SVG Interactive Bar / Area Chart */}
        <div className="pt-4">
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 sm:h-56 pb-2 border-b border-slate-100">
            {daysList.map((day, idx) => {
              const currentVal = metricView === 'xp' ? day.xp : metricView === 'minutes' ? day.minutes : day.wordsReviewed;
              const heightPercent = Math.max(8, Math.round((currentVal / maxVal) * 100));
              const isToday = idx === 6;

              return (
                <div key={day.dateStr} className="flex flex-col items-center justify-end h-full group">
                  {/* Tooltip value */}
                  <div className="text-[10px] sm:text-xs font-bold text-slate-600 mb-1 group-hover:text-rose-600 transition">
                    {currentVal}
                    {metricView === 'minutes' ? 'm' : ''}
                  </div>

                  {/* Bar */}
                  <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden flex items-end h-full">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 group-hover:opacity-90 ${
                        isToday
                          ? 'bg-gradient-to-t from-rose-600 to-rose-400 shadow-md shadow-rose-200'
                          : 'bg-gradient-to-t from-slate-700 to-slate-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  {/* Day Label */}
                  <div className="mt-2 text-center">
                    <span className={`block text-xs font-bold ${isToday ? 'text-rose-600' : 'text-slate-600'}`}>
                      {day.dayName}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {isToday ? 'Hari Ini' : day.dateStr.slice(5)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Goal Progress */}
        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Target Harian Hari Ini: {todayRec.minutes} / {stats.dailyGoalMinutes} Menit Belajar
              </span>
              <span className="text-[11px] text-slate-500">
                {dailyGoalPercent >= 100 
                  ? 'Selamat! Target belajarmu hari ini sudah tercapai penuh! 🌸' 
                  : `Tinggal ${Math.max(0, stats.dailyGoalMinutes - todayRec.minutes)} menit lagi untuk menyelesaikan target.`}
              </span>
            </div>
          </div>

          <div className="w-full sm:w-48 bg-white h-3 rounded-full border border-rose-200 overflow-hidden">
            <div 
              className="h-full bg-rose-600 rounded-full transition-all duration-500"
              style={{ width: `${dailyGoalPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-rose-100 shadow-sm space-y-4">
        <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Pencapaian & Lencana Keberhasilan
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
            <span className="text-2xl">🔥</span>
            <strong className="block text-xs font-bold text-amber-900">Streak 7 Hari</strong>
            <span className="text-[10px] text-amber-700">Tercapai</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-1">
            <span className="text-2xl">📖</span>
            <strong className="block text-xs font-bold text-rose-900">50 Kosakata N5</strong>
            <span className="text-[10px] text-rose-700">Tercapai</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
            <span className="text-2xl">📐</span>
            <strong className="block text-xs font-bold text-emerald-900">Master Tata Bahasa</strong>
            <span className="text-[10px] text-emerald-700">Tercapai</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
            <span className="text-2xl">🎧</span>
            <strong className="block text-xs font-bold text-blue-900">Pendengar Handal</strong>
            <span className="text-[10px] text-blue-700">Tercapai</span>
          </div>
        </div>
      </div>
    </div>
  );
};
