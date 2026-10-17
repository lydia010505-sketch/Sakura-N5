import React, { useState } from 'react';
import { 
  PenTool, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { KANJI_N5_DATA } from '../data/kanjiN5Data';
import { HIRAGANA_DATA, KATAKANA_DATA } from '../data/kanaData';
import { KanjiCanvas } from './KanjiCanvas';
import { KanjiItem } from '../types';
import { audioEngine } from '../utils/audio';

interface KanjiKanaSectionProps {
  masteredKanjiIds: string[];
  onToggleMasteredKanji: (id: string) => void;
  audioSpeed: number;
  onAddXp: (amount: number) => void;
}

export const KanjiKanaSection: React.FC<KanjiKanaSectionProps> = ({
  masteredKanjiIds,
  onToggleMasteredKanji,
  audioSpeed,
  onAddXp,
}) => {
  const [subTab, setSubTab] = useState<'kanji' | 'hiragana' | 'katakana'>('kanji');
  const [activeKanji, setActiveKanji] = useState<KanjiItem>(KANJI_N5_DATA[0]);
  const [showCanvasModal, setShowCanvasModal] = useState(false);
  const [playingChar, setPlayingChar] = useState<string | null>(null);

  const handlePlayAudio = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingChar(text);
    audioEngine.speak(text, {
      rate: audioSpeed,
      onEnd: () => setPlayingChar(null),
      onError: () => setPlayingChar(null),
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs Selector */}
      <div className="flex items-center justify-center p-1.5 bg-slate-200/70 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setSubTab('kanji')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === 'kanji'
              ? 'bg-white text-rose-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Kanji N5 ({KANJI_N5_DATA.length})</span>
        </button>

        <button
          onClick={() => setSubTab('hiragana')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === 'hiragana'
              ? 'bg-white text-rose-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Hiragana (平仮名)</span>
        </button>

        <button
          onClick={() => setSubTab('katakana')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === 'katakana'
              ? 'bg-white text-rose-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Katakana (片仮名)</span>
        </button>
      </div>

      {/* KANJI SUBTAB */}
      {subTab === 'kanji' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Desktop Canvas Practice Widget */}
          <div className="lg:col-span-5 order-2 lg:order-1 sticky top-20">
            <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-rose-600 font-serif">
                    {activeKanji.kanji}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{activeKanji.meaning}</h4>
                    <span className="text-xs text-slate-500 font-medium">Goresan: {activeKanji.strokes} gores</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlayAudio(activeKanji.kanji)}
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                  title="Dengarkan pengucapan kanji"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Interactive Writing Canvas */}
              <KanjiCanvas
                kanjiChar={activeKanji.kanji}
                kanjiMeaning={activeKanji.meaning}
              />

              {/* Readings & Mnemonic Story */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-400 block text-[10px] uppercase">Onyomi (China)</span>
                    <span className="font-semibold text-rose-700">{activeKanji.onyomi.join(', ')}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-400 block text-[10px] uppercase">Kunyomi (Jepang)</span>
                    <span className="font-semibold text-slate-800">{activeKanji.kunyomi.join(', ')}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950">
                  <span className="font-bold block text-amber-800 mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" /> Jembatan Keledai (Mnemonic)
                  </span>
                  {activeKanji.mnemonicHint}
                </div>

                {/* Compound Words */}
                <div>
                  <span className="font-bold text-slate-500 block mb-1">Contoh Kata Gabungan (Jukugo):</span>
                  <div className="space-y-1.5">
                    {activeKanji.examples.map((ex, i) => (
                      <div 
                        key={i} 
                        onClick={() => handlePlayAudio(ex.word)}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 transition flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <strong className="text-slate-900 font-bold mr-2">{ex.word}</strong>
                          <span className="text-rose-600 mr-2">{ex.reading}</span>
                          <span className="text-slate-500 text-[11px]">= {ex.meaning}</span>
                        </div>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Kanji Grid Cards */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Klik salah satu kanji untuk membuka lembar latihan coretan:</span>
              <span className="text-emerald-600 font-semibold">{masteredKanjiIds.length} Kanji dihafal</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {KANJI_N5_DATA.map((k) => {
                const isSelected = activeKanji.id === k.id;
                const isMastered = masteredKanjiIds.includes(k.id);

                return (
                  <div
                    key={k.id}
                    onClick={() => setActiveKanji(k)}
                    className={`p-3.5 rounded-2xl bg-white border transition-all cursor-pointer relative hover:shadow-md ${
                      isSelected
                        ? 'border-rose-500 ring-2 ring-rose-200 bg-rose-50/20 shadow-xs'
                        : isMastered
                        ? 'border-emerald-200 bg-emerald-50/10'
                        : 'border-slate-200 hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="text-3xl font-black text-slate-900 font-serif leading-none">
                        {k.kanji}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleMasteredKanji(k.id);
                          if (!isMastered) onAddXp(15);
                        }}
                        className={`p-1 rounded-lg transition ${
                          isMastered ? 'text-emerald-600' : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={isMastered ? 'Tandai belum hafal' : 'Tandai hafal (+15 XP)'}
                      >
                        <CheckCircle className={`w-4 h-4 ${isMastered ? 'fill-emerald-100' : ''}`} />
                      </button>
                    </div>

                    <div className="mt-2 text-xs font-bold text-slate-800 truncate">
                      {k.meaning}
                    </div>

                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      On: {k.onyomi.join(', ')}
                    </div>
                    <div className="text-[10px] text-rose-600 truncate">
                      Kun: {k.kunyomi.join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* HIRAGANA SUBTAB */}
      {subTab === 'hiragana' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-rose-100 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Tabel Hiragana Lengkap (平仮名 46 Huruf Inti)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Klik kartu huruf mana saja untuk mendengarkan pelafalan asli dan melihat jembatan keledai ingatan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {HIRAGANA_DATA.map((item) => {
              const isPlaying = playingChar === item.char;

              return (
                <div
                  key={item.id}
                  onClick={() => handlePlayAudio(item.char)}
                  className={`group p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-400 hover:shadow-md transition text-center cursor-pointer relative ${
                    isPlaying ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-200' : ''
                  }`}
                  title={`${item.mnemonic} - Klik untuk mendengar audio`}
                >
                  <div className="text-2xl font-black text-slate-900 font-sans group-hover:text-rose-600 transition">
                    {item.char}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5">
                    {item.romaji}
                  </div>
                  <div className="mt-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Volume2 className="w-3 h-3 text-rose-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* KATAKANA SUBTAB */}
      {subTab === 'katakana' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-rose-100 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Tabel Katakana Lengkap (片仮名)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Katakana digunakan untuk kata serapan asing, nama negara, nama orang non-Jepang, dan onomatopoeia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {KATAKANA_DATA.map((item) => {
              const isPlaying = playingChar === item.char;

              return (
                <div
                  key={item.id}
                  onClick={() => handlePlayAudio(item.char)}
                  className={`group p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-400 hover:shadow-md transition text-center cursor-pointer relative ${
                    isPlaying ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-200' : ''
                  }`}
                  title={`${item.mnemonic} - Klik untuk mendengar audio`}
                >
                  <div className="text-2xl font-black text-slate-900 font-sans group-hover:text-rose-600 transition">
                    {item.char}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5">
                    {item.romaji}
                  </div>
                  <div className="mt-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Volume2 className="w-3 h-3 text-rose-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
