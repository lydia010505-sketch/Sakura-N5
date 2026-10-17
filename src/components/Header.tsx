import React from 'react';
import { Flame, Bell, Volume2, Sparkles, Wifi } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { UserStats } from '../types';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface HeaderProps {
  stats: UserStats;
  audioSpeed: number;
  onToggleAudioSpeed: () => void;
  onOpenReminderModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  audioSpeed,
  onToggleAudioSpeed,
  onOpenReminderModal,
}) => {
  const isOnline = useOnlineStatus();
  const xpInCurrentLevel = stats.totalXp % 150;
  const levelProgress = Math.min(100, Math.round((xpInCurrentLevel / 150) * 100));

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* App Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-md shadow-rose-200">
            <span className="font-bold text-lg tracking-tight font-serif">桜</span>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-amber-950 ring-2 ring-white">
              5
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Sakura<span className="text-rose-600">N5</span>
              </h1>
              <span className="hidden sm:inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200/60">
                JLPT N5
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-500 leading-none">
              Belajar Bahasa Jepang Lengkap & Mandiri
            </p>
          </div>
        </div>

        {/* Right Action & Stats Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Counter */}
          <div 
            className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1.2 rounded-full cursor-pointer hover:bg-amber-100/80 transition"
            title={`Streak konsisten belajar: ${stats.streakCount} hari berturut-turut!`}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-xs font-bold text-amber-800">{stats.streakCount} Hari</span>
          </div>

          {/* Level & XP */}
          <div className="hidden sm:flex items-center gap-2 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-[11px] font-bold text-rose-700">Lv.{stats.level}</span>
                <span className="text-[10px] text-slate-500">({stats.totalXp} XP)</span>
              </div>
              <div className="w-16 h-1 bg-rose-200 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Audio Speed Toggle */}
          <button
            onClick={onToggleAudioSpeed}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition cursor-pointer"
            title={`Kecepatan Audio: ${audioSpeed === 1.0 ? 'Kecepatan Normal (1.0x)' : 'Kecepatan Pelan (0.75x) untuk pemula'}`}
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-600" />
            <span className="text-[11px] font-bold">{audioSpeed === 1.0 ? '1.0x' : '0.75x'}</span>
          </button>

          {/* Study Reminder Bell */}
          <button
            onClick={onOpenReminderModal}
            className="relative p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 transition cursor-pointer"
            title="Atur pengingat & notifikasi harian"
          >
            <Bell className="w-4 h-4" />
            {stats.reminders.enabled && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Offline / Online indicator */}
          <div 
            className="hidden lg:flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200/60 px-2 py-1 rounded-full"
            title={isOnline ? 'Terhubung online' : 'Mode offline aktif - materi tetap lengkap'}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* PWA Install Button */}
          <PWAInstallButton />
        </div>
      </div>
    </header>
  );
};
