import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Eye, Sparkles } from 'lucide-react';

interface KanjiCanvasProps {
  kanjiChar: string;
  kanjiMeaning: string;
  onDrawComplete?: () => void;
}

export const KanjiCanvas: React.FC<KanjiCanvasProps> = ({
  kanjiChar,
  kanjiMeaning,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [strokeCount, setStrokeCount] = useState(0);

  useEffect(() => {
    clearCanvas();
  }, [kanjiChar]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeCount(0);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#0f172a'; // Sumi-e black ink
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setStrokeCount(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl p-4 border border-rose-100 shadow-sm">
      <div className="text-center mb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600">
          Kanji Practice Canvas (Latihan Menulis)
        </h4>
        <p className="text-sm font-semibold text-slate-700">
          Kanji: <span className="text-rose-600 text-lg font-bold">{kanjiChar}</span> ({kanjiMeaning})
        </p>
      </div>

      {/* Canvas Container with Grid and Watermark Guide */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 border-2 border-dashed border-rose-300 rounded-2xl bg-rose-50/20 overflow-hidden shadow-inner flex items-center justify-center select-none touch-none">
        {/* Traditional Japanese Quad Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-rose-200" />
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-rose-200" />
          {/* Diagonal guidelines */}
          <svg className="w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="100" stroke="#f43f5e" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="#f43f5e" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>
        </div>

        {/* Faint Watermark Kanji for Tracing */}
        {showGuide && (
          <div className="absolute pointer-events-none text-slate-300/40 font-bold select-none text-[160px] sm:text-[180px] leading-none font-serif flex items-center justify-center">
            {kanjiChar}
          </div>
        )}

        {/* Active Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="relative z-10 w-full h-full cursor-crosshair"
        />
      </div>

      {/* Canvas Toolbars */}
      <div className="flex items-center justify-between w-full mt-3 px-2 gap-2">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl border transition cursor-pointer font-medium ${
            showGuide
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
          title="Tampilkan / sembunyikan panduan karakter"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showGuide ? 'Panduan Aktif' : 'Panduan Tutup'}</span>
        </button>

        <div className="text-xs text-slate-500 font-medium">
          Goresan: <span className="font-bold text-slate-800">{strokeCount}</span>
        </div>

        <button
          onClick={clearCanvas}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Hapus</span>
        </button>
      </div>

      <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 text-center">
        <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
        <span>Goreskan jari atau kursor mengikuti alur garis kanji di atas.</span>
      </div>
    </div>
  );
};
