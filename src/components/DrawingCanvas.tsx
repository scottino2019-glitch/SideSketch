import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Undo, Redo, Trash2, Download, Eye, Grid, Palette, Sliders, 
  Sparkles, CornerDownRight, CheckCircle2, RefreshCw, Layers, Info, HelpCircle
} from 'lucide-react';
import { DrawingTool, CanvasState, DrawingTemplate, CanvasBackground } from '../types';

interface DrawingCanvasProps {
  canvasState: CanvasState;
  setCanvasState: React.Dispatch<React.SetStateAction<CanvasState>>;
  selectedTemplate: DrawingTemplate;
  currentStepIndex: number;
  uploadedImageUrl: string | null;
  onSaveComparison: (canvasDataUrl: string) => void;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  canvasState,
  setCanvasState,
  selectedTemplate,
  currentStepIndex,
  uploadedImageUrl,
  onSaveComparison,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement>(null); // For drawing live shape previews (line, rect, circle)
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Undo/Redo history stack (stores data URLs)
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Dynamic coordinates translation: 800x800 internal workspace
  const INTERNAL_WIDTH = 800;
  const INTERNAL_HEIGHT = 800;

  // Curated artistic palette sets
  const [activePalette, setActivePalette] = useState<'classica' | 'vivaci' | 'pastello'>('classica');

  const palettes = {
    classica: [
      { name: 'Nero Carboncino', hex: '#1e1e24' },
      { name: 'Grigio Grafite', hex: '#5e6472' },
      { name: 'Sanguigna Rinascimentale', hex: '#9e2a2b' },
      { name: 'Seppia Caldo', hex: '#6f4e37' },
      { name: 'Terra d\'Ombra', hex: '#4a3b32' },
      { name: 'Ocra Gialla', hex: '#c49a45' },
      { name: 'Gesso Bianco', hex: '#ffffff' },
      { name: 'Azzurro Cenere', hex: '#7a9e9f' },
    ],
    vivaci: [
      { name: 'Nero Inchiostro', hex: '#0f172a' },
      { name: 'Rosso Cadmio', hex: '#ef4444' },
      { name: 'Blu Oltremare', hex: '#2563eb' },
      { name: 'Verde Smeraldo', hex: '#059669' },
      { name: 'Giallo Sole', hex: '#ca8a04' },
      { name: 'Viola Imperiale', hex: '#7c3aed' },
      { name: 'Arancione Zucca', hex: '#ea580c' },
      { name: 'Rosa Magenta', hex: '#db2777' },
    ],
    pastello: [
      { name: 'Salvia Chiaro', hex: '#b5c4b1' },
      { name: 'Lavanda Polvere', hex: '#c3bef7' },
      { name: 'Rosa Cipria', hex: '#fbc3bc' },
      { name: 'Giallo Primula', hex: '#fbe29f' },
      { name: 'Celeste Pastello', hex: '#aed9e0' },
      { name: 'Pesca Soft', hex: '#fcd5a3' },
      { name: 'Menta Fresca', hex: '#d4eedb' },
      { name: 'Grigio Fumo', hex: '#94a3b8' },
    ]
  };

  const colorPresets = palettes[activePalette];

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear canvas with transparency for tracing mode compatibility
        ctx.clearRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
        // Save initial blank state to history
        const initialData = canvas.toDataURL();
        setHistory([initialData]);
        setHistoryIndex(0);
      }
    }
  }, []);

  // Sync size of canvas
  const saveStateToHistory = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      // Truncate future redo stack if drawing after an undo
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(dataUrl);
      
      // Limit history to 35 actions to avoid memory bloat
      if (newHistory.length > 35) {
        newHistory.shift();
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      } else {
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      loadHistoryState(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      loadHistoryState(history[newIndex]);
    }
  };

  const loadHistoryState = (dataUrl: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          ctx.clearRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
          ctx.drawImage(img, 0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
        };
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
        saveStateToHistory();
      }
    }
  };

  // Convert client coordinate to internal 800x800 coordinate
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Scale appropriately based on bounding rect
    const x = ((clientX - rect.left) / rect.width) * INTERNAL_WIDTH;
    const y = ((clientY - rect.top) / rect.height) * INTERNAL_HEIGHT;

    return { x, y };
  };

  const drawSymmetrical = (
    ctx: CanvasRenderingContext2D,
    drawFunc: (context: CanvasRenderingContext2D, px: number, py: number) => void,
    x: number,
    y: number
  ) => {
    // Primary draw
    drawFunc(ctx, x, y);

    // Symmetrical draw
    if (canvasState.symmetry === 'vertical' || canvasState.symmetry === 'both') {
      const symX = INTERNAL_WIDTH - x;
      drawFunc(ctx, symX, y);
    }
    if (canvasState.symmetry === 'horizontal' || canvasState.symmetry === 'both') {
      const symY = INTERNAL_HEIGHT - y;
      drawFunc(ctx, x, symY);
    }
    if (canvasState.symmetry === 'both') {
      const symX = INTERNAL_WIDTH - x;
      const symY = INTERNAL_HEIGHT - y;
      drawFunc(ctx, symX, symY);
    }
  };

  const drawSegmentSymmetrical = (
    ctx: CanvasRenderingContext2D,
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) => {
    // 1. Primary segment
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // 2. Vertical symmetry
    if (canvasState.symmetry === 'vertical' || canvasState.symmetry === 'both') {
      ctx.beginPath();
      ctx.moveTo(INTERNAL_WIDTH - p1.x, p1.y);
      ctx.lineTo(INTERNAL_WIDTH - p2.x, p2.y);
      ctx.stroke();
    }

    // 3. Horizontal symmetry
    if (canvasState.symmetry === 'horizontal' || canvasState.symmetry === 'both') {
      ctx.beginPath();
      ctx.moveTo(p1.x, INTERNAL_HEIGHT - p1.y);
      ctx.lineTo(p2.x, INTERNAL_HEIGHT - p2.y);
      ctx.stroke();
    }

    // 4. Quad/Both symmetry
    if (canvasState.symmetry === 'both') {
      ctx.beginPath();
      ctx.moveTo(INTERNAL_WIDTH - p1.x, INTERNAL_HEIGHT - p1.y);
      ctx.lineTo(INTERNAL_WIDTH - p2.x, INTERNAL_HEIGHT - p2.y);
      ctx.stroke();
    }
  };

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);
    if (!coords) return;

    setIsDrawing(true);
    setStartPoint(coords);
    lastPointRef.current = coords;

    const canvas = canvasRef.current;
    const tempCanvas = tempCanvasRef.current;
    if (!canvas || !tempCanvas) return;

    const ctx = canvas.getContext('2d');
    const tempCtx = tempCanvas.getContext('2d');
    if (!ctx || !tempCtx) return;

    // Set drawing styles
    ctx.lineWidth = canvasState.brushSize;
    ctx.strokeStyle = canvasState.color;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Eraser vs regular brush
    if (canvasState.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = canvasState.brushSize * 1.5; // Slightly larger for eraser
    } else if (canvasState.tool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = canvasState.brushSize * 2.2; // Thicker for highlight/coloring
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    // Handle brush opacity
    if (canvasState.tool === 'highlighter') {
      ctx.globalAlpha = canvasState.opacity * 0.35; // Translucent marker overlay
    } else {
      ctx.globalAlpha = canvasState.opacity;
    }

    if (
      canvasState.tool === 'pencil' || 
      canvasState.tool === 'brush' || 
      canvasState.tool === 'eraser' ||
      canvasState.tool === 'spray' ||
      canvasState.tool === 'highlighter'
    ) {
      const drawPoint = (context: CanvasRenderingContext2D, px: number, py: number) => {
        context.beginPath();
        context.moveTo(px, py);
        context.lineTo(px + 0.1, py + 0.1);
        context.stroke();
      };

      drawSymmetrical(ctx, drawPoint, coords.x, coords.y);
    } else {
      // Shape tools use the preview canvas
      tempCtx.clearRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint) return;
    e.preventDefault();

    // Prevent drawing if mouse button is not pressed (e.g. if mouse was released outside canvas)
    if (!('touches' in e) && e.buttons !== 1) {
      endDrawing();
      return;
    }

    const coords = getCanvasCoords(e);
    if (!coords) {
      endDrawing();
      return;
    }

    const canvas = canvasRef.current;
    const tempCanvas = tempCanvasRef.current;
    if (!canvas || !tempCanvas) return;

    const ctx = canvas.getContext('2d');
    const tempCtx = tempCanvas.getContext('2d');
    if (!ctx || !tempCtx) return;

    // Shape drawing preview on temp canvas
    if (canvasState.tool === 'line' || canvasState.tool === 'rect' || canvasState.tool === 'circle') {
      tempCtx.clearRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
      tempCtx.lineWidth = canvasState.brushSize;
      tempCtx.strokeStyle = canvasState.color;
      tempCtx.globalAlpha = canvasState.opacity;
      tempCtx.lineCap = 'round';
      tempCtx.lineJoin = 'round';

      const drawShape = (tCtx: CanvasRenderingContext2D, sx: number, sy: number, ex: number, ey: number) => {
        tCtx.beginPath();
        if (canvasState.tool === 'line') {
          tCtx.moveTo(sx, sy);
          tCtx.lineTo(ex, ey);
        } else if (canvasState.tool === 'rect') {
          tCtx.strokeRect(sx, sy, ex - sx, ey - sy);
        } else if (canvasState.tool === 'circle') {
          const radius = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2));
          tCtx.arc(sx, sy, radius, 0, 2 * Math.PI);
        }
        tCtx.stroke();
      };

      // Draw primary preview shape
      drawShape(tempCtx, startPoint.x, startPoint.y, coords.x, coords.y);

      // Draw symmetrical preview shape
      if (canvasState.symmetry === 'vertical' || canvasState.symmetry === 'both') {
        const symSx = INTERNAL_WIDTH - startPoint.x;
        const symEx = INTERNAL_WIDTH - coords.x;
        drawShape(tempCtx, symSx, startPoint.y, symEx, coords.y);
      }
      if (canvasState.symmetry === 'horizontal' || canvasState.symmetry === 'both') {
        const symSy = INTERNAL_HEIGHT - startPoint.y;
        const symEy = INTERNAL_HEIGHT - coords.y;
        drawShape(tempCtx, startPoint.x, symSy, coords.x, symEy);
      }
      if (canvasState.symmetry === 'both') {
        const symSx = INTERNAL_WIDTH - startPoint.x;
        const symEx = INTERNAL_WIDTH - coords.x;
        const symSy = INTERNAL_HEIGHT - startPoint.y;
        const symEy = INTERNAL_HEIGHT - coords.y;
        drawShape(tempCtx, symSx, symSy, symEx, symEy);
      }
    } else if (canvasState.tool === 'spray') {
      // Spray/airbrush dots
      const drawSpray = (context: CanvasRenderingContext2D, px: number, py: number) => {
        context.fillStyle = canvasState.color;
        const radius = canvasState.brushSize * 1.6;
        const density = 15 + Math.floor(canvasState.brushSize / 2);
        for (let i = 0; i < density; i++) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * radius;
          const sx = px + Math.cos(angle) * r;
          const sy = py + Math.sin(angle) * r;
          context.fillRect(sx, sy, 1.5, 1.5);
        }
      };

      drawSymmetrical(ctx, drawSpray, coords.x, coords.y);
    } else {
      // Direct pencil/brush/eraser painting on actual canvas using segment drawing
      if (lastPointRef.current) {
        drawSegmentSymmetrical(ctx, lastPointRef.current, coords);
      }
      lastPointRef.current = coords;
    }
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPointRef.current = null;

    const canvas = canvasRef.current;
    const tempCanvas = tempCanvasRef.current;
    if (canvas && tempCanvas) {
      const ctx = canvas.getContext('2d');
      const tempCtx = tempCanvas.getContext('2d');
      
      // If we used a shape tool, paint it permanently on the primary canvas
      if (
        ctx && 
        tempCtx && 
        (canvasState.tool === 'line' || canvasState.tool === 'rect' || canvasState.tool === 'circle')
      ) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = canvasState.opacity;
        ctx.drawImage(tempCanvas, 0, 0);
        tempCtx.clearRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
      }

      saveStateToHistory();
    }
    setStartPoint(null);
  };

  // Export full user drawing as standalone image with white background pre-baked
  const exportImageOnly = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Create off-screen canvas to bake solid white background
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = INTERNAL_WIDTH;
      exportCanvas.height = INTERNAL_HEIGHT;
      const exportCtx = exportCanvas.getContext('2d');
      if (exportCtx) {
        exportCtx.fillStyle = '#ffffff';
        exportCtx.fillRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
        exportCtx.drawImage(canvas, 0, 0);
        
        // Trigger download
        const url = exportCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `mio-disegno-${selectedTemplate.id || 'libero'}.png`;
        link.href = url;
        link.click();
      }
    }
  };

  // Triggers Comparison saving: merges Left reference (or photo) + Right canvas side-by-side
  const handleExportComparison = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      onSaveComparison(canvas.toDataURL());
    }
  };

  // Helper grid renderer inside canvas frame
  const renderGridLines = () => {
    if (!canvasState.showGrid) return null;
    const lines = [];
    const stepPercent = 100 / canvasState.gridSize;
    // Chalkboard grid is pale yellow/white, others are red/slate
    const gridColor = canvasState.background === 'chalkboard' ? 'rgba(254, 240, 138, 0.45)' : 'rgba(239, 68, 68, 0.6)';
    const textColor = canvasState.background === 'chalkboard' ? '#fef08a' : '#ef4444';
    for (let i = 1; i < canvasState.gridSize; i++) {
      const pos = i * stepPercent;
      lines.push(
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 border-l border-dashed pointer-events-none"
          style={{ left: `${pos}%`, borderColor: gridColor }}
        />
      );
      lines.push(
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 border-t border-dashed pointer-events-none"
          style={{ top: `${pos}%`, borderColor: gridColor }}
        />
      );
    }

    // Add beautiful and helpful grid coordinate watermarks (A1, B2, etc.) matching ReferenceViewer
    const labels = [];
    for (let r = 0; r < canvasState.gridSize; r++) {
      for (let c = 0; c < canvasState.gridSize; c++) {
        const letter = String.fromCharCode(65 + c);
        const num = r + 1;
        const xPos = `${(c + 0.5) * stepPercent}%`;
        const yPos = `${(r + 0.5) * stepPercent}%`;
        labels.push(
          <div
            key={`lbl-${r}-${c}`}
            className="absolute pointer-events-none select-none font-bold transform -translate-x-1/2 -translate-y-1/2 text-center"
            style={{
              left: xPos,
              top: yPos,
              color: textColor,
              fontSize: canvasState.gridSize === 8 ? "9px" : "11px",
              opacity: 0.25,
            }}
          >
            {letter}{num}
          </div>
        );
      }
    }

    return (
      <>
        {lines}
        {labels}
      </>
    );
  };

  return (
    <div id="drawing-workspace-container" className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-full">
      {/* Canvas Tool Belt Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Palette className="w-4 h-4 text-violet-500" />
            2. Il Tuo Foglio da Disegno
          </h2>
          {/* Undo, Redo, Clear */}
          <div className="flex gap-1.5 items-center">
            <button
              id="undo-btn"
              disabled={historyIndex <= 0}
              onClick={handleUndo}
              title="Annulla ultima azione"
              className="p-1.5 rounded-lg hover:bg-slate-200/80 text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              id="redo-btn"
              disabled={historyIndex >= history.length - 1}
              onClick={handleRedo}
              title="Ripristina azione annullata"
              className="p-1.5 rounded-lg hover:bg-slate-200/80 text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <Redo className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-slate-300 mx-1" />
            
            {showClearConfirm ? (
              <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-lg">
                <span className="text-[10px] font-bold text-red-600 uppercase pr-1">Svuotare?</span>
                <button
                  onClick={() => {
                    clearCanvas();
                    setShowClearConfirm(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                >
                  Sì
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[9px] font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                id="clear-all-btn"
                onClick={() => setShowClearConfirm(true)}
                title="Cancella tutto e ricomincia"
                className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Toolbar & Tools selection */}
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'pencil', label: '✏️ Matita', tip: 'Tratto fine e preciso per contorni' },
              { id: 'brush', label: '🖌️ Pennello', tip: 'Tratto morbido per sfumature ed ombre' },
              { id: 'spray', label: '💨 Spray', tip: 'Effetto aerografo / texture gessetto' },
              { id: 'highlighter', label: '🖍️ Evidenziatore', tip: 'Pennarello traslucido per colorare' },
              { id: 'eraser', label: '🧽 Gomma', tip: 'Cancella tratti sul disegno' },
              { id: 'line', label: '📏 Linea', tip: 'Traccia linee rette' },
              { id: 'rect', label: '⬜ Rettangolo', tip: 'Forme geometriche squadrate' },
              { id: 'circle', label: '⭕ Cerchio', tip: 'Crea cerchi perfetti' },
            ].map((toolSpec) => (
              <button
                key={toolSpec.id}
                onClick={() => setCanvasState(prev => ({ ...prev, tool: toolSpec.id as DrawingTool }))}
                title={toolSpec.tip}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  canvasState.tool === toolSpec.id
                    ? 'bg-violet-600 border-violet-600 text-white shadow-sm font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {toolSpec.label}
              </button>
            ))}
          </div>

          {/* Quick instructions and easy Grid/Trace controllers */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/50">
            <div className="flex flex-wrap gap-1.5">
              {/* Easy-to-use Grid Toggle inside Canvas */}
              <button
                onClick={() => setCanvasState(prev => ({ ...prev, showGrid: !prev.showGrid }))}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  canvasState.showGrid
                    ? 'bg-red-50 border-red-200 text-red-600 shadow-3xs font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Sincronizza la griglia proporzionale sul tuo foglio"
              >
                <Grid className="w-3.5 h-3.5" />
                Griglia {canvasState.showGrid ? 'Attiva' : 'Disattivata'}
              </button>

              {/* Easy-to-use Tracing Toggle inside Canvas */}
              <button
                onClick={() => setCanvasState(prev => ({ ...prev, isTracingMode: !prev.isTracingMode }))}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  canvasState.isTracingMode
                    ? 'bg-violet-50 border-violet-200 text-violet-600 shadow-3xs font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Mostra l'immagine del modello in trasparenza sotto il tuo disegno"
              >
                <Eye className="w-3.5 h-3.5" />
                {canvasState.isTracingMode ? 'Ricalco Attivo' : 'Attiva Ricalco'}
              </button>
            </div>

            {/* Symmetry selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5">Simmetria:</span>
              {[
                { id: 'none', label: 'No' },
                { id: 'vertical', label: 'Vert.' },
                { id: 'horizontal', label: 'Orizz.' },
                { id: 'both', label: 'Doppia ✛' },
              ].map((sym) => (
                <button
                  key={sym.id}
                  onClick={() => setCanvasState(prev => ({ ...prev, symmetry: sym.id as any }))}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded transition-all cursor-pointer ${
                    canvasState.symmetry === sym.id
                      ? 'bg-white text-slate-800 font-bold shadow-2xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {sym.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Informational Help Banner right above the drawing area */}
      <div className="px-4 py-2 bg-amber-50/80 border-b border-amber-100/60 text-[11px] text-amber-800 leading-relaxed flex items-start gap-1.5">
        <span className="text-xs shrink-0 mt-0.5">💡</span>
        <div>
          <span className="font-bold">Come sovrapporre il disegno?</span> Clicca sul pulsante <span className="font-bold text-violet-700">Ricalca Modello</span> qui sopra per proiettare la traccia originale, oppure attiva la <span className="font-bold text-red-600">Griglia</span> per ricopiarla cella per cella!
        </div>
      </div>

      {/* Main Canvas Drawing Stage */}
      <div 
        ref={containerRef}
        id="canvas-stage-wrapper" 
        className="flex-1 relative bg-slate-100 min-h-[350px] flex items-center justify-center p-4 border-b border-slate-100 touch-none"
      >
        <div 
          className={`relative w-full max-w-[360px] aspect-square rounded-xl shadow-md border border-slate-200/50 overflow-hidden select-none touch-none transition-all duration-300 ${
            canvasState.background === 'chalkboard'
              ? 'bg-[#232a2f]'
              : canvasState.background === 'vintage'
              ? 'bg-[#f4ebd0]'
              : canvasState.background === 'graph'
              ? 'bg-white bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]'
              : 'bg-white'
          }`}
        >
          
          {/* Tracing Underlay Background layer (Modalità Ricalco) */}
          {canvasState.isTracingMode && (
            <div 
              className={`absolute inset-0 pointer-events-none select-none flex items-center justify-center p-4 touch-none bg-transparent`}
              style={{ opacity: canvasState.traceOpacity }}
            >
              {uploadedImageUrl ? (
                <img
                  src={uploadedImageUrl}
                  alt="Ricalco"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : (
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full object-contain"
                >
                  {selectedTemplate.steps[currentStepIndex].svgPaths.map((path, idx) => (
                    <path
                      key={idx}
                      d={path.d}
                      fill="none"
                      stroke={path.color}
                      strokeWidth={path.strokeWidth}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                </svg>
              )}
            </div>
          )}

          {/* Interactive HTML5 Canvas (Primary drawing layer) */}
          <canvas
            ref={canvasRef}
            width={INTERNAL_WIDTH}
            height={INTERNAL_HEIGHT}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
            onTouchCancel={endDrawing}
            className="absolute inset-0 w-full h-full cursor-crosshair z-10 bg-transparent touch-none"
          />

          {/* Shape preview Canvas (Drawn live on top of the drawing canvas while dragging) */}
          <canvas
            ref={tempCanvasRef}
            width={INTERNAL_WIDTH}
            height={INTERNAL_HEIGHT}
            className="absolute inset-0 w-full h-full pointer-events-none z-20 bg-transparent touch-none"
          />

          {/* Horizontal and vertical grids in sync with ReferenceViewer */}
          {renderGridLines()}

          {/* Symmetrical Guide Lines (shows faint lines where drawings will mirror) */}
          {canvasState.symmetry !== 'none' && (
            <div className="absolute inset-0 pointer-events-none z-30">
              {(canvasState.symmetry === 'vertical' || canvasState.symmetry === 'both') && (
                <div className="absolute left-1/2 top-0 bottom-0 border-l border-violet-400/40 border-dashed" />
              )}
              {(canvasState.symmetry === 'horizontal' || canvasState.symmetry === 'both') && (
                <div className="absolute top-1/2 left-0 right-0 border-t border-violet-400/40 border-dashed" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Advanced Stylers: Color presets, Size, and Export Options */}
      <div className="p-4 bg-slate-50 flex flex-col gap-3">
        {/* Sliders: Size and Opacity */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex justify-between items-center text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                Spessore Tratto:
              </span>
              <span className="font-bold text-slate-700">{canvasState.brushSize}px</span>
            </div>
            <input
              type="range"
              min={canvasState.tool === 'pencil' ? '1' : '3'}
              max="50"
              value={canvasState.brushSize}
              onChange={(e) => setCanvasState(prev => ({ ...prev, brushSize: parseInt(e.target.value) }))}
              className="w-full accent-violet-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <div className="flex justify-between items-center text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                Opacità Tratto:
              </span>
              <span className="font-bold text-slate-700">{Math.round(canvasState.opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={canvasState.opacity}
              onChange={(e) => setCanvasState(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))}
              className="w-full accent-violet-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Color presets and picker */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-slate-400" /> Tavolozza Artistica
            </span>
            {/* Palette selection chips */}
            <div className="flex gap-1 bg-slate-200/50 p-0.5 rounded-lg border border-slate-200/60 shadow-3xs">
              {[
                { id: 'classica', label: '🏛️ Accademia' },
                { id: 'vivaci', label: '🎨 Vivace' },
                { id: 'pastello', label: '🌸 Pastello' },
              ].map((pSpec) => (
                <button
                  key={pSpec.id}
                  onClick={() => {
                    setActivePalette(pSpec.id as any);
                    // Set color to the first preset of the active palette automatically
                    const newPal = pSpec.id as 'classica' | 'vivaci' | 'pastello';
                    setCanvasState(prev => ({ ...prev, color: palettes[newPal][0].hex }));
                  }}
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                    activePalette === pSpec.id
                      ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {pSpec.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {colorPresets.map((preset) => (
                <button
                  key={preset.hex}
                  onClick={() => setCanvasState(prev => ({ ...prev, color: preset.hex }))}
                  title={preset.name}
                  className={`w-6 h-6 rounded-full shrink-0 border relative transition-all cursor-pointer hover:scale-105 ${
                    canvasState.color === preset.hex 
                      ? 'border-slate-900 ring-2 ring-violet-500/50 scale-105 shadow-xs' 
                      : 'border-slate-200'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                >
                  {canvasState.color === preset.hex && (
                    <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white rounded-full shadow-xs" />
                  )}
                </button>
              ))}
            </div>

            <div className="w-[1px] h-6 bg-slate-300 shrink-0" />

            {/* Custom color picker */}
            <div className="relative group shrink-0" title="Scegli colore personalizzato">
              <input
                type="color"
                value={canvasState.color}
                onChange={(e) => setCanvasState(prev => ({ ...prev, color: e.target.value }))}
                className="w-7 h-7 rounded-lg border border-slate-300 p-0 cursor-pointer overflow-hidden opacity-0 absolute inset-0 z-10"
              />
              <div 
                className="w-7 h-7 rounded-lg border border-slate-300 shadow-3xs flex items-center justify-center text-[10px] font-bold text-slate-600 bg-white"
                style={{ backgroundColor: canvasState.color }}
              >
                {/* Visual marker inside custom picker box */}
                <div className="w-2.5 h-2.5 bg-white rounded-full shadow-md border border-slate-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Paper Texture/Style Selection */}
        <div className="flex flex-col gap-1.5 border-t border-slate-200/50 pt-2.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" /> Stile del Foglio
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'white', label: '📄 Bianco', desc: 'Semplice carta bianca' },
              { id: 'graph', label: '📐 Quadretti', desc: 'Carta tecnica millimetrata' },
              { id: 'vintage', label: '📜 Vintage', desc: 'Pergamena artistica' },
              { id: 'chalkboard', label: '🎚️ Lavagna', desc: 'Sfondo lavagna nera' },
            ].map((bgSpec) => (
              <button
                key={bgSpec.id}
                onClick={() => {
                  setCanvasState(prev => {
                    const nextBg = bgSpec.id as CanvasBackground;
                    // Auto-suggest white/light yellow paint on Chalkboard background
                    let nextColor = prev.color;
                    if (nextBg === 'chalkboard' && (prev.color === '#1e293b' || prev.color === '#000000')) {
                      nextColor = '#ffffff';
                    } else if (nextBg !== 'chalkboard' && prev.color === '#ffffff') {
                      nextColor = '#1e293b';
                    }
                    return { ...prev, background: nextBg, color: nextColor };
                  });
                }}
                className={`py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                  canvasState.background === bgSpec.id
                    ? 'bg-slate-800 border-slate-800 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {bgSpec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Downloads: Download drawing OR Download Dual comparison */}
        <div className="border-t border-slate-200/50 pt-3 flex items-center justify-end gap-2">
          {/* Comparison download (Left + Right side by side) */}
          <button
            id="download-comparison-btn"
            onClick={handleExportComparison}
            title="Salva l'immagine di confronto (Modello + Tuo disegno)"
            className="px-3 py-1.5 rounded-lg border border-violet-200 bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Salva con Confronto
          </button>

          {/* Simple Drawing only download */}
          <button
            id="download-drawing-btn"
            onClick={exportImageOnly}
            title="Salva solo il tuo capolavoro!"
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Scarica Solo Disegno
          </button>
        </div>
      </div>
    </div>
  );
};
