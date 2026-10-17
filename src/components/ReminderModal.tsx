import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Clock, 
  Check, 
  Volume2, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { 
  requestNotificationPermission, 
  sendBrowserNotification, 
  getRandomMotivation 
} from '../utils/notifications';
import { audioEngine } from '../utils/audio';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminderTime: string;
  isEnabled: boolean;
  onSaveReminder: (enabled: boolean, time: string) => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  reminderTime,
  isEnabled,
  onSaveReminder,
}) => {
  const [enabled, setEnabled] = useState(isEnabled);
  const [time, setTime] = useState(reminderTime || '19:30');
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>('default');
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotifPermission(Notification.permission);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const perm = await requestNotificationPermission();
    setNotifPermission(perm);
    if (perm === 'granted') {
      audioEngine.playChime();
    }
  };

  const handleTestNotification = () => {
    const motivation = getRandomMotivation();
    const sent = sendBrowserNotification({
      title: '🌸 Pengingat Belajar SakuraN5',
      body: `${motivation.ja} — Waktunya luangkan 5-10 menit memantapkan kosakata dan tata bahasa N5!`,
    });

    audioEngine.playChime();
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const handleSave = () => {
    onSaveReminder(enabled, time);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 relative border border-rose-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Sistem Pengingat Belajar Harian
            </h3>
            <p className="text-xs text-slate-500">
              Pertahankan streak belajar agar tidak lupa
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              Aktifkan Pengingat Harian
            </span>
            <span className="text-[11px] text-slate-500">
              Kirim notifikasi belajar konsisten setiap hari
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
          </label>
        </div>

        {/* Time Picker */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 mb-4 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-rose-500" />
            <span>Pilih Jam Pengingat:</span>
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!enabled}
            className="w-full px-3.5 py-2.5 text-sm font-bold text-slate-900 rounded-xl border border-slate-300 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 disabled:opacity-50"
          />

          <p className="text-[11px] text-slate-400">
            Waktu rekomendasi: Malam hari pukul 19:30 atau 20:00 untuk review sebelum tidur.
          </p>
        </div>

        {/* Browser Permission Box */}
        <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 mb-5 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Izin Notifikasi Browser:</span>
            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
              notifPermission === 'granted' 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {notifPermission === 'granted' ? 'Diizinkan ✓' : 'Belum Diizinkan'}
            </span>
          </div>

          {notifPermission !== 'granted' && (
            <button
              onClick={handleRequestPermission}
              className="w-full py-2 rounded-xl bg-white border border-rose-300 font-bold text-rose-700 hover:bg-rose-100/50 transition cursor-pointer text-center block"
            >
              Minta Izin Notifikasi Browser
            </button>
          )}

          {/* Test Notification Trigger */}
          <button
            onClick={handleTestNotification}
            className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{testSent ? 'Notifikasi Berhasil Dikirim! 🌸' : 'Kirim Uji Coba Notifikasi Sekarang'}</span>
          </button>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            Batal
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition cursor-pointer"
          >
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
};
