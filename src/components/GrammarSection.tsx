import React, { useState } from 'react';
import { 
  BookMarked, 
  Volume2, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Sparkles, 
  Check, 
  X as XIcon 
} from 'lucide-react';
import { GRAMMAR_N5_DATA } from '../data/grammarN5Data';
import { audioEngine } from '../utils/audio';

interface GrammarSectionProps {
  masteredGrammarIds: string[];
  onToggleMasteredGrammar: (id: string) => void;
  audioSpeed: number;
  onAddXp: (amount: number) => void;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({
  masteredGrammarIds,
  onToggleMasteredGrammar,
  audioSpeed,
  onAddXp,
}) => {
  const [expandedId, setExpandedId] = useState<string>(GRAMMAR_N5_DATA[0].id);
  const [practiceAnswers, setPracticeAnswers] = useState<{ [qKey: string]: number }>({});
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const handlePlayAudio = (text: string, key: string) => {
    setPlayingKey(key);
    audioEngine.speak(text, {
      rate: audioSpeed,
      onEnd: () => setPlayingKey(null),
      onError: () => setPlayingKey(null),
    });
  };

  const handleSelectAnswer = (qKey: string, optIndex: number, correctIndex: number) => {
    if (practiceAnswers[qKey] !== undefined) return; // already answered
    setPracticeAnswers(prev => ({ ...prev, [qKey]: optIndex }));
    if (optIndex === correctIndex) {
      audioEngine.playCorrectSound();
      onAddXp(15);
    } else {
      audioEngine.playIncorrectSound();
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white rounded-3xl p-5 sm:p-6 shadow-md shadow-rose-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-rose-200 bg-rose-800/40 px-2.5 py-0.5 rounded-full mb-1">
              Tata Bahasa Inti (Bunpou)
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              18 Pola Tata Bahasa JLPT N5 Terpenting
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-xl leading-relaxed">
              Dilengkapi rumus jelas, contoh percakapan dengan audio penutur asli, dan kuis latihan mini langsung di setiap materi.
            </p>
          </div>
          <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="block text-2xl font-black">{masteredGrammarIds.length} / {GRAMMAR_N5_DATA.length}</span>
            <span className="text-[11px] text-rose-100 font-medium">Dikuasai</span>
          </div>
        </div>
      </div>

      {/* Grammar Cards Accordion */}
      <div className="space-y-4">
        {GRAMMAR_N5_DATA.map((item, index) => {
          const isExpanded = expandedId === item.id;
          const isMastered = masteredGrammarIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-2xl bg-white border transition-all duration-200 shadow-xs ${
                isMastered ? 'border-emerald-200 bg-emerald-50/15' : 'border-slate-200/80'
              }`}
            >
              {/* Header / Clickable Toggle */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-rose-50 text-rose-700 text-xs font-black shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <span className="text-xs text-slate-400 italic font-normal hidden sm:inline">
                        ({item.romaji})
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      {item.meaning}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMasteredGrammar(item.id);
                      if (!isMastered) onAddXp(20);
                    }}
                    className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
                      isMastered
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                    title={isMastered ? 'Tandai belum hafal' : 'Tandai sudah paham (+20 XP)'}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="hidden md:inline">{isMastered ? 'Paham' : 'Tandai Paham'}</span>
                  </button>

                  <div className="p-1 text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                  {/* Formula Box */}
                  <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80">
                    <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">
                      📐 Rumus Pola Kalimat
                    </span>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">
                      {item.formula}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Penjelasan & Penggunaan
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>

                  {/* Examples with Native Audio */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                      Contoh Kalimat & Audio Penutur Asli
                    </h5>

                    <div className="space-y-2">
                      {item.examples.map((ex, exIdx) => {
                        const playKey = `${item.id}-ex-${exIdx}`;
                        const isPlaying = playingKey === playKey;

                        return (
                          <div
                            key={exIdx}
                            className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5">
                              <div className="text-sm sm:text-base font-bold text-slate-900">
                                {ex.ja}
                              </div>
                              <div className="text-xs text-rose-600 font-medium">
                                {ex.reading}
                              </div>
                              <div className="text-[11px] text-slate-400 italic">
                                {ex.romaji}
                              </div>
                              <div className="text-xs font-semibold text-slate-700 pt-1">
                                Arti: &quot;{ex.id}&quot;
                              </div>
                            </div>

                            <button
                              onClick={() => handlePlayAudio(ex.ja, playKey)}
                              className={`p-2.5 rounded-xl border transition shrink-0 cursor-pointer ${
                                isPlaying
                                  ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                                  : 'bg-white text-rose-600 border-slate-200 hover:bg-rose-50'
                              }`}
                              title="Dengarkan pengucapan audio"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mini Practice Questions */}
                  {item.practice && item.practice.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2.5 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Latihan Pemahaman Cepat
                      </h5>

                      <div className="space-y-3">
                        {item.practice.map((prac, pIdx) => {
                          const qKey = `${item.id}-p-${pIdx}`;
                          const selectedOpt = practiceAnswers[qKey];
                          const hasAnswered = selectedOpt !== undefined;

                          return (
                            <div key={pIdx} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                              <p className="text-xs sm:text-sm font-bold text-slate-800 mb-2.5">
                                {prac.question}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {prac.options.map((opt, optIdx) => {
                                  const isCorrect = optIdx === prac.answerIndex;
                                  const isChosen = selectedOpt === optIdx;

                                  let btnClass = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                                  if (hasAnswered) {
                                    if (isCorrect) {
                                      btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold';
                                    } else if (isChosen) {
                                      btnClass = 'bg-rose-50 border-rose-400 text-rose-800 font-bold';
                                    } else {
                                      btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                                    }
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleSelectAnswer(qKey, optIdx, prac.answerIndex)}
                                      disabled={hasAnswered}
                                      className={`text-left text-xs p-2.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${btnClass}`}
                                    >
                                      <span>{opt}</span>
                                      {hasAnswered && isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                                      {hasAnswered && isChosen && !isCorrect && <XIcon className="w-4 h-4 text-rose-600" />}
                                    </button>
                                  );
                                })}
                              </div>

                              {hasAnswered && (
                                <p className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                  <strong className="text-slate-800">Penjelasan:</strong> {prac.explanation}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
