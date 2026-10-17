import React, { useState } from 'react';
import { 
  Volume2, 
  Search, 
  Bookmark, 
  CheckCircle, 
  Sparkles, 
  BookOpen, 
  Layers, 
  X,
  Play
} from 'lucide-react';
import { VocabItem } from '../types';
import { VOCAB_CATEGORIES, VOCAB_N5_DATA } from '../data/vocabN5Data';
import { audioEngine } from '../utils/audio';

interface VocabSectionProps {
  bookmarkedIds: string[];
  masteredIds: string[];
  onToggleBookmark: (id: string) => void;
  onToggleMastered: (id: string) => void;
  audioSpeed: number;
  onAddXp: (amount: number) => void;
}

export const VocabSection: React.FC<VocabSectionProps> = ({
  bookmarkedIds,
  masteredIds,
  onToggleBookmark,
  onToggleMastered,
  audioSpeed,
  onAddXp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRomaji, setShowRomaji] = useState(true);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [activeVocab, setActiveVocab] = useState<VocabItem | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayAudio = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingId(id);
    audioEngine.speak(text, {
      rate: audioSpeed,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  const filteredVocab = VOCAB_N5_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = 
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmark = !onlyBookmarks || bookmarkedIds.includes(item.id);
    return matchesCategory && matchesSearch && matchesBookmark;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls: Search, Romaji Toggle, Bookmark filter */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kosakata, kanji, romaji, atau arti (cth: makan, taberu)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Romaji & Bookmark Toggles */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowRomaji(!showRomaji)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                showRomaji
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Tampilkan atau sembunyikan alfabet Romaji untuk melatih membaca tulisan Jepang"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Romaji: {showRomaji ? 'Aktif' : 'Tutup'}</span>
            </button>

            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                onlyBookmarks
                  ? 'bg-amber-500 border-amber-600 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Disimpan ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {VOCAB_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vocab Summary & Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Menampilkan <strong className="text-slate-800">{filteredVocab.length}</strong> kosakata N5</span>
        <span className="flex items-center gap-1 text-emerald-600 font-medium">
          <CheckCircle className="w-3.5 h-3.5" />
          {masteredIds.length} kosakata telah dikuasai
        </span>
      </div>

      {/* Vocab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredVocab.map((vocab) => {
          const isMastered = masteredIds.includes(vocab.id);
          const isBookmarked = bookmarkedIds.includes(vocab.id);
          const isPlaying = playingId === vocab.id;

          return (
            <div
              key={vocab.id}
              onClick={() => setActiveVocab(vocab)}
              className={`group relative rounded-2xl p-4 bg-white border transition-all duration-200 hover:shadow-md hover:border-rose-300 cursor-pointer flex flex-col justify-between ${
                isMastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200/80'
              }`}
            >
              <div>
                {/* Card Header: Category & Action Buttons */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    {vocab.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(vocab.id);
                      }}
                      className={`p-1.5 rounded-lg transition ${
                        isBookmarked 
                          ? 'text-amber-500 hover:bg-amber-50' 
                          : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'
                      }`}
                      title={isBookmarked ? 'Hapus dari simpanan' : 'Simpan kosakata'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMastered(vocab.id);
                        if (!isMastered) onAddXp(10);
                      }}
                      className={`p-1.5 rounded-lg transition ${
                        isMastered 
                          ? 'text-emerald-600 hover:bg-emerald-50' 
                          : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'
                      }`}
                      title={isMastered ? 'Tandai belum hafal' : 'Tandai sudah hafal (+10 XP)'}
                    >
                      <CheckCircle className={`w-4 h-4 ${isMastered ? 'fill-emerald-100' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Japanese Word & Reading */}
                <div className="my-1.5">
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-wide font-sans">
                    {vocab.word}
                  </div>
                  <div className="text-xs font-medium text-rose-600 mt-0.5">
                    {vocab.reading}
                  </div>
                  {showRomaji && (
                    <div className="text-[11px] text-slate-400 italic">
                      {vocab.romaji}
                    </div>
                  )}
                </div>

                {/* Meaning */}
                <p className="text-sm font-semibold text-slate-700 mt-2">
                  {vocab.meaning}
                </p>
              </div>

              {/* Bottom Card Footer: Audio Play Trigger & Example preview */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 group-hover:text-rose-600 transition flex items-center gap-1 font-medium">
                  <Layers className="w-3 h-3" />
                  Lihat contoh kalimat
                </span>

                <button
                  onClick={(e) => handlePlayAudio(vocab.word, vocab.id, e)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer ${
                    isPlaying 
                      ? 'bg-rose-500 text-white animate-pulse' 
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                  title="Putar pengucapan penutur asli"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVocab.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="text-base font-bold text-slate-700">Kosakata tidak ditemukan</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Coba gunakan kata kunci lain atau pilih kategori &quot;Semua&quot;.
          </p>
        </div>
      )}

      {/* Vocab Detailed Modal with Example Sentence & Audio */}
      {activeVocab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 relative border border-rose-100">
            <button
              onClick={() => setActiveVocab(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">
                {activeVocab.category}
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                JLPT N5 Core
              </span>
            </div>

            {/* Main Word Display */}
            <div className="text-center py-4 bg-gradient-to-b from-rose-50/50 to-white rounded-2xl border border-rose-100/60 mb-5">
              <div className="text-4xl font-extrabold text-slate-900 mb-1">
                {activeVocab.word}
              </div>
              <div className="text-sm font-semibold text-rose-600">
                {activeVocab.reading}
              </div>
              <div className="text-xs text-slate-400 italic mt-0.5">
                {activeVocab.romaji}
              </div>
              <div className="text-base font-bold text-slate-800 mt-3 px-4">
                {activeVocab.meaning}
              </div>

              {/* Native Voice Audio Button */}
              <button
                onClick={() => handlePlayAudio(activeVocab.word, 'modal-word')}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-200 transition cursor-pointer active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Audio Penutur Asli ({audioSpeed === 1.0 ? '1.0x' : '0.75x'})</span>
              </button>
            </div>

            {/* Example Sentence Section */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                Contoh Kalimat Sehari-hari
              </h5>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-base font-bold text-slate-900 leading-snug">
                      {activeVocab.exampleJa}
                    </div>
                    <div className="text-xs text-rose-600 font-medium">
                      {activeVocab.exampleReading}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      {activeVocab.exampleRomaji}
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(activeVocab.exampleJa, 'modal-sentence')}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 transition shrink-0"
                    title="Dengarkan seluruh kalimat"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs font-semibold text-slate-700 pt-1 border-t border-slate-200/50">
                  Arti: &quot;{activeVocab.exampleId}&quot;
                </p>
              </div>

              {activeVocab.notes && (
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <span className="font-bold">Tips Belajar:</span> {activeVocab.notes}
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => {
                  onToggleMastered(activeVocab.id);
                  if (!masteredIds.includes(activeVocab.id)) onAddXp(10);
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  masteredIds.includes(activeVocab.id)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{masteredIds.includes(activeVocab.id) ? 'Sudah Dihafal' : 'Tandai Hafal (+10 XP)'}</span>
              </button>

              <button
                onClick={() => onToggleBookmark(activeVocab.id)}
                className={`p-2.5 rounded-xl border transition cursor-pointer ${
                  bookmarkedIds.includes(activeVocab.id)
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(activeVocab.id) ? 'fill-amber-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
