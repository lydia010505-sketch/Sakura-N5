import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  Headphones, 
  Shuffle, 
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizMode, QuizQuestion } from '../types';
import { audioEngine } from '../utils/audio';

interface QuizSectionProps {
  audioSpeed: number;
  onQuizComplete: (xpEarned: number) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  audioSpeed,
  onQuizComplete,
}) => {
  const [selectedMode, setSelectedMode] = useState<QuizMode>('multiple_choice');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [arrangedWords, setArrangedWords] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Filter questions for the selected mode
  const currentQuestions: QuizQuestion[] = QUIZ_QUESTIONS.filter(q => q.mode === selectedMode);
  const currentQ = currentQuestions[currentIndex] || currentQuestions[0];

  const handlePlayAudio = (text: string) => {
    setIsPlayingAudio(true);
    audioEngine.speak(text, {
      rate: audioSpeed,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const startQuizMode = (mode: QuizMode) => {
    setSelectedMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setArrangedWords([]);
    setHasSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleCheckAnswer = () => {
    if (hasSubmitted) return;

    let isCorrect = false;

    if (currentQ.mode === 'sentence_arrange') {
      const sentenceAttempt = arrangedWords.join(' ');
      isCorrect = sentenceAttempt === currentQ.correctAnswer;
    } else {
      isCorrect = selectedOption === currentQ.correctAnswer;
    }

    setHasSubmitted(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
      audioEngine.playCorrectSound();
    } else {
      audioEngine.playIncorrectSound();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setArrangedWords([]);
      setHasSubmitted(false);
    } else {
      // Quiz complete!
      setIsFinished(true);
      const earnedXp = (score + 1) * 20;
      onQuizComplete(earnedXp);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#fbbf24', '#34d399'],
        });
      } catch {
        // Silently catch
      }
    }
  };

  const toggleWordChip = (word: string) => {
    if (hasSubmitted) return;
    if (arrangedWords.includes(word)) {
      setArrangedWords(arrangedWords.filter(w => w !== word));
    } else {
      setArrangedWords([...arrangedWords, word]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector Header */}
      <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Pilih Mode Kuis Interaktif
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => startQuizMode('multiple_choice')}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
              selectedMode === 'multiple_choice'
                ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="font-bold text-sm">Pilihan Ganda</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Kosakata, kanji & tata bahasa pilihan ganda.
            </p>
          </button>

          <button
            onClick={() => startQuizMode('audio_listen')}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
              selectedMode === 'audio_listen'
                ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Headphones className="w-4 h-4 text-rose-500" />
              <span className="font-bold text-sm">Tebak Audio (Choukai)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Dengarkan audio penutur asli dan tebak maknanya.
            </p>
          </button>

          <button
            onClick={() => startQuizMode('sentence_arrange')}
            className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
              selectedMode === 'sentence_arrange'
                ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Shuffle className="w-4 h-4 text-rose-500" />
              <span className="font-bold text-sm">Susun Kalimat</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Rangkai potongan kata menjadi kalimat N5 yang tepat.
            </p>
          </button>
        </div>
      </div>

      {/* QUIZ ARENA */}
      {!isFinished && currentQ ? (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-rose-100 shadow-sm space-y-6">
          {/* Progress and Question Counter */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Pertanyaan {currentIndex + 1} dari {currentQuestions.length}
            </span>

            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>Skor: {score}</span>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Kategori: {currentQ.category}
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {currentQ.question}
            </h4>

            {/* Audio Listening Player Banner */}
            {currentQ.audioText && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Audio Penutur Asli Jepang
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Tekan tombol untuk mendengarkan lafal berulang kali
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlayAudio(currentQ.audioText!)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-white border border-rose-300 text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? 'Memutar...' : 'Putar Audio'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Answer Options: Standard Multiple Choice */}
          {currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswer;

                let optStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';
                if (hasSubmitted) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200 font-bold';
                  } else if (isSelected) {
                    optStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-200 font-bold';
                  } else {
                    optStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-200 font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !hasSubmitted && setSelectedOption(idx)}
                    disabled={hasSubmitted}
                    className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {hasSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Answer Options: Sentence Arranging Puzzle */}
          {currentQ.scrambledWords && (
            <div className="space-y-4 pt-2">
              {/* Drop / Assembled Area */}
              <div className="p-4 rounded-2xl bg-rose-50/50 border-2 border-dashed border-rose-300 min-h-[64px] flex items-center flex-wrap gap-2">
                {arrangedWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">
                    Klik kata-kata acak di bawah ini untuk menyusun urutan kalimat...
                  </span>
                ) : (
                  arrangedWords.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      onClick={() => toggleWordChip(word)}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-rose-300 text-rose-800 font-bold text-xs sm:text-sm shadow-xs cursor-pointer hover:bg-rose-100 transition"
                      title="Klik untuk menghapus"
                    >
                      {word} ✕
                    </span>
                  ))
                )}
              </div>

              {/* Word Chips Bank */}
              <div className="flex flex-wrap gap-2">
                {currentQ.scrambledWords.map((word, wIdx) => {
                  const isUsed = arrangedWords.includes(word);
                  return (
                    <button
                      key={wIdx}
                      onClick={() => toggleWordChip(word)}
                      disabled={hasSubmitted || isUsed}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
                        isUsed
                          ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                          : 'bg-white border-slate-300 text-slate-800 hover:border-rose-400 hover:bg-rose-50/50 shadow-xs'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Explanation Box upon Submission */}
          {hasSubmitted && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1 animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <HelpCircle className="w-4 h-4 text-rose-500" />
                <span>Penjelasan Jawaban:</span>
              </div>
              <p className="leading-relaxed pl-5">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            {!hasSubmitted ? (
              <button
                onClick={handleCheckAnswer}
                disabled={
                  currentQ.mode === 'sentence_arrange'
                    ? arrangedWords.length === 0
                    : selectedOption === null
                }
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              >
                Periksa Jawaban
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>{currentIndex + 1 < currentQuestions.length ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished View */
        <div className="bg-white rounded-3xl p-8 text-center border border-rose-100 shadow-sm space-y-4 max-w-lg mx-auto animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-black text-slate-900">
            Kuis Selesai! 🎉
          </h3>

          <p className="text-xs sm:text-sm text-slate-600">
            Kamu berhasil menjawab <strong className="text-rose-600 font-bold">{score}</strong> dari <strong>{currentQuestions.length}</strong> soal dengan benar!
          </p>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-around text-center">
            <div>
              <span className="block text-2xl font-black text-rose-600">+{score * 20} XP</span>
              <span className="text-[11px] text-slate-500 font-bold">Poin Pengalaman</span>
            </div>
            <div className="h-8 w-px bg-rose-200" />
            <div>
              <span className="block text-2xl font-black text-amber-600">{Math.round((score / currentQuestions.length) * 100)}%</span>
              <span className="text-[11px] text-slate-500 font-bold">Akurasi</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startQuizMode(selectedMode)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>

            <button
              onClick={() => startQuizMode(selectedMode === 'multiple_choice' ? 'audio_listen' : 'multiple_choice')}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Coba Mode Lain</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
