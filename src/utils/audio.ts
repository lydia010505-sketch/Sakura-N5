// Audio utility with native Japanese speech synthesis and Web Audio sound effects

class JapaneseAudioEngine {
  private synth: SpeechSynthesis | null = null;
  private jaVoice: SpeechSynthesisVoice | null = null;
  private audioCtx: AudioContext | null = null;
  private isVoiceLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize natural Japanese voices
    const jaVoices = voices.filter(v => v.lang.startsWith('ja') || v.lang.includes('JP'));
    
    // Pick the best natural voice if possible
    const preferred = jaVoices.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Kyoko') || 
      v.name.includes('Otoya') || 
      v.name.includes('Nanami') ||
      v.name.includes('Natural')
    );

    this.jaVoice = preferred || jaVoices[0] || null;
    this.isVoiceLoaded = true;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public speak(
    text: string, 
    options?: { 
      rate?: number; 
      pitch?: number; 
      onEnd?: () => void;
      onError?: () => void;
    }
  ) {
    if (typeof window === 'undefined') return;

    if (!this.synth) {
      // Fallback: beep tone indicating audio was attempted
      this.playTone(440, 'sine', 0.15);
      options?.onEnd?.();
      return;
    }

    try {
      this.synth.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';

      if (!this.jaVoice) {
        this.initVoices();
      }

      if (this.jaVoice) {
        utterance.voice = this.jaVoice;
      }

      utterance.rate = options?.rate ?? 0.9; // Slightly natural for learners
      utterance.pitch = options?.pitch ?? 1.0;

      utterance.onend = () => {
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis notice:', e);
        options?.onError?.();
        options?.onEnd?.();
      };

      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      options?.onError?.();
      options?.onEnd?.();
    }
  }

  // Play acoustic sound effects for UI feedback
  public playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.1, gainVal: number = 0.1) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio context errors silently
    }
  }

  public playCorrectSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } catch {
      // Silently fail if blocked
    }
  }

  public playIncorrectSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Silently fail
    }
  }

  public playChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [880, 1108.73].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.1, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.4);
      });
    } catch {
      // Silently fail
    }
  }
}

export const audioEngine = new JapaneseAudioEngine();
