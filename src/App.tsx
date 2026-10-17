/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  PenTool, 
  Trophy, 
  TrendingUp, 
  Bookmark, 
  Heart,
  Volume2,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { Header } from './components/Header';
import { VocabSection } from './components/VocabSection';
import { GrammarSection } from './components/GrammarSection';
import { KanjiKanaSection } from './components/KanjiKanaSection';
import { QuizSection } from './components/QuizSection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { ReminderModal } from './components/ReminderModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { loadUserStats, saveUserStats, addXpAndActivity } from './utils/storage';
import { UserStats } from './types';
import { sendBrowserNotification, getRandomMotivation } from './utils/notifications';
import { audioEngine } from './utils/audio';

type ActiveTab = 'vocab' | 'grammar' | 'kanji' | 'quiz' | 'analytics';

export default function App() {
  const [stats, setStats] = useState<UserStats>(loadUserStats());
  const [activeTab, setActiveTab] = useState<ActiveTab>('vocab');
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
  const [inAppNotice, setInAppNotice] = useState<string | null>(null);

  // Background reminder scheduler
  useEffect(() => {
    const timer = setInterval(() => {
      if (!stats.reminders.enabled) return;

      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;

      if (currentTimeStr === stats.reminders.time) {
        const lastNotifKey = `sakura_last_notif_${now.toISOString().split('T')[0]}`;
        if (!localStorage.getItem(lastNotifKey)) {
          localStorage.setItem(lastNotifKey, 'true');
          const mot = getRandomMotivation();
          
          sendBrowserNotification({
            title: '🌸 Waktunya Belajar N5!',
            body: `${mot.ja} — Pertahankan streak ${stats.streakCount} harimu!`,
          });

          setInAppNotice(`Waktunya belajar N5! ${mot.ja} (${mot.id})`);
          audioEngine.playChime();
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(timer);
  }, [stats.reminders, stats.streakCount]);

  const handleToggleAudioSpeed = () => {
    const nextSpeed = audioSpeed === 1.0 ? 0.75 : 1.0;
    setAudioSpeed(nextSpeed);
    audioEngine.speak(nextSpeed === 1.0 ? 'ふつうのスピードです' : 'ゆっくりはなします', { rate: nextSpeed });
  };

  const handleToggleBookmark = (id: string) => {
    setStats(prev => {
      const exists = prev.bookmarkedVocabIds.includes(id);
      const updatedList = exists 
        ? prev.bookmarkedVocabIds.filter(vId => vId !== id)
        : [...prev.bookmarkedVocabIds, id];
      const updated = { ...prev, bookmarkedVocabIds: updatedList };
      saveUserStats(updated);
      return updated;
    });
  };

  const handleToggleMasteredVocab = (id: string) => {
    setStats(prev => {
      const exists = prev.masteredVocabIds.includes(id);
      const updatedList = exists 
        ? prev.masteredVocabIds.filter(vId => vId !== id)
        : [...prev.masteredVocabIds, id];
      const updated = { ...prev, masteredVocabIds: updatedList };
      saveUserStats(updated);
      return updated;
    });
  };

  const handleToggleMasteredGrammar = (id: string) => {
    setStats(prev => {
      const exists = prev.masteredGrammarIds.includes(id);
      const updatedList = exists
        ? prev.masteredGrammarIds.filter(gId => gId !== id)
        : [...prev.masteredGrammarIds, id];
      const updated = { ...prev, masteredGrammarIds: updatedList };
      saveUserStats(updated);
      return updated;
    });
  };

  const handleToggleMasteredKanji = (id: string) => {
    setStats(prev => {
      const exists = prev.masteredKanjiIds.includes(id);
      const updatedList = exists
        ? prev.masteredKanjiIds.filter(kId => kId !== id)
        : [...prev.masteredKanjiIds, id];
      const updated = { ...prev, masteredKanjiIds: updatedList };
      saveUserStats(updated);
      return updated;
    });
  };

  const handleAddXp = (amount: number) => {
    setStats(prev => addXpAndActivity(prev, amount, 2, 1, false));
  };

  const handleQuizComplete = (xpEarned: number) => {
    setStats(prev => addXpAndActivity(prev, xpEarned, 5, 5, true));
  };

  const handleSaveReminder = (enabled: boolean, time: string) => {
    setStats(prev => {
      const updated = {
        ...prev,
        reminders: {
          ...prev.reminders,
          enabled,
          time,
        },
      };
      saveUserStats(updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#fff9f9] text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        stats={stats}
        audioSpeed={audioSpeed}
        onToggleAudioSpeed={handleToggleAudioSpeed}
        onOpenReminderModal={() => setShowReminderModal(true)}
      />

      {/* In-App Study Reminder Notice Toast */}
      {inAppNotice && (
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-md">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>{inAppNotice}</span>
          <button 
            onClick={() => setInAppNotice(null)} 
            className="ml-2 text-white/80 hover:text-white underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Main Navigation Tabs */}
      <div className="bg-white border-b border-rose-100 shadow-2xs sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2.5">
            <button
              onClick={() => setActiveTab('vocab')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'vocab'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Kosakata (単語)</span>
            </button>

            <button
              onClick={() => setActiveTab('grammar')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'grammar'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Tata Bahasa (文法)</span>
            </button>

            <button
              onClick={() => setActiveTab('kanji')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'kanji'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/60'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Kanji & Aksara (漢字)</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/60'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Kuis Interaktif (クイズ)</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/60'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Perkembangan Harian</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'vocab' && (
          <VocabSection
            bookmarkedIds={stats.bookmarkedVocabIds}
            masteredIds={stats.masteredVocabIds}
            onToggleBookmark={handleToggleBookmark}
            onToggleMastered={handleToggleMasteredVocab}
            audioSpeed={audioSpeed}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarSection
            masteredGrammarIds={stats.masteredGrammarIds}
            onToggleMasteredGrammar={handleToggleMasteredGrammar}
            audioSpeed={audioSpeed}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'kanji' && (
          <KanjiKanaSection
            masteredKanjiIds={stats.masteredKanjiIds}
            onToggleMasteredKanji={handleToggleMasteredKanji}
            audioSpeed={audioSpeed}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection
            audioSpeed={audioSpeed}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsSection
            stats={stats}
          />
        )}
      </main>

      {/* Study Reminder & Notification Settings Modal */}
      <ReminderModal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        reminderTime={stats.reminders.time}
        isEnabled={stats.reminders.enabled}
        onSaveReminder={handleSaveReminder}
      />

      {/* Offline Mode Indicator */}
      <OfflineIndicator />

      {/* Modern Japanese Footer */}
      <footer className="bg-white border-t border-rose-100 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-rose-600">SakuraN5</span>
            <span>— Belajar Bahasa Jepang Mandiri & Siap Ujian JLPT N5</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Audio Native ja-JP</span>
            <span>•</span>
            <span>PWA Offline Ready</span>
            <span>•</span>
            <span>頑張ってください (Semangat!)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
