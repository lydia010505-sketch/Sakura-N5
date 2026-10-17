// Notification and Study Reminder utility

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
}

const JAPANESE_MOTIVATIONS = [
  { ja: '一歩一歩、前進！', id: 'Selangkah demi selangkah maju ke depan!' },
  { ja: '七転び八起き (Nanakorobi yaoki)', id: 'Jatuh 7 kali, bangkit 8 kali! Jangan pernah menyerah.' },
  { ja: '継続は力なり (Keizoku wa chikara nari)', id: 'Konsistensi adalah kunci kekuatan sejati!' },
  { ja: '今日も頑張りましょう！', id: 'Hari ini mari kita semangat belajar lagi!' },
  { ja: '日本語の達人を目指して！', id: 'Menuju target mahir bahasa Jepang!' },
  { ja: '千里の道も一歩から', id: 'Perjalanan seribu mil dimulai dari satu langkah kecil.' },
];

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
    return Notification.permission;
  }
}

export function sendBrowserNotification(payload: NotificationPayload): boolean {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    try {
      new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icon.svg',
        badge: '/icon.svg',
      });
      return true;
    } catch (e) {
      console.warn('Notification trigger error:', e);
      return false;
    }
  }
  return false;
}

export function getRandomMotivation() {
  const item = JAPANESE_MOTIVATIONS[Math.floor(Math.random() * JAPANESE_MOTIVATIONS.length)];
  return item;
}
