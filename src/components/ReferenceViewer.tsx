import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, ChevronLeft, ChevronRight, Grid, Eye, Image as ImageIcon, Sparkles, AlertCircle, Contrast } from 'lucide-react';
import { DrawingTemplate } from '../types';

interface ReferenceViewerProps {
  templates: DrawingTemplate[];
  selectedTemplate: DrawingTemplate;
  onSelectTemplate: (template: DrawingTemplate) => void;
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  uploadedImageUrl: string | null;
  onImageUpload: (url: string | null) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  gridSize: number;
  onGridSizeChange: (size: number) => void;
  isTracingMode: boolean;
  onToggleTracing: () => void;
  traceOpacity: number;
  onTraceOpacityChange: (opacity: number) => void;
  isChiaroscuro: boolean;
  onToggleChiaroscuro: () => void;
}

export const ReferenceViewer: React.FC<ReferenceViewerProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  currentStepIndex,
  onStepChange,
  uploadedImageUrl,
  onImageUpload,
  showGrid,
  onToggleGrid,
  gridSize,
  onGridSizeChange,
  isTracingMode,
  onToggleTracing,
  traceOpacity,
  onTraceOpacityChange,
  isChiaroscuro,
  onToggleChiaroscuro,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentStep = selectedTemplate.steps[currentStepIndex];

  // Group templates by category
  const categories = ['Fumetti', 'Personaggi', 'Animali', 'Paesaggi', 'Accademia', 'Architettura'] as const;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageUpload(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      onImageUpload(url);
    }
  };

  const renderGridLines = () => {
    if (!showGrid) return null;
    const lines = [];
    const stepPercent = 100 / gridSize;
    for (let i = 1; i < gridSize; i++) {
      const pos = i * stepPercent;
      // Vertical lines
      lines.push(
        <line
          key={`v-${i}`}
          x1={`${pos}%`}
          y1="0"
          x2={`${pos}%`}
          y2="100%"
          stroke="#ef4444"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.65"
        />
      );
      // Horizontal lines
      lines.push(
        <line
          key={`h-${i}`}
          x1="0"
          y1={`${pos}%`}
          x2="100%"
          y2={`${pos}%`}
          stroke="#ef4444"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.65"
        />
      );
    }

    // Add beautiful and helpful grid coordinate watermarks (A1, B2, etc.)
    const labels = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const letter = String.fromCharCode(65 + c);
        const num = r + 1;
        const xPos = `${(c + 0.5) * stepPercent}%`;
        const yPos = `${(r + 0.5) * stepPercent}%`;
        labels.push(
          <text
            key={`lbl-${r}-${c}`}
            x={xPos}
            y={yPos}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ef4444"
            fontSize={gridSize === 8 ? "9" : "11"}
            fontWeight="bold"
            opacity="0.25"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            {letter}{num}
          </text>
        );
      }
    }

    return (
      <g id="reference-grid">
        {lines}
        {labels}
      </g>
    );
  };

  return (
    <div id="reference-viewer-container" className="flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-full">
      {/* Header Panel */}
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            1. Scegli il Modello o Carica
          </h2>
          <div className="flex gap-1.5">
            <button
              id="grid-toggle-btn"
              onClick={onToggleGrid}
              title="Attiva/Disattiva Griglia Proporzionale"
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                showGrid
                  ? 'bg-violet-50 border-violet-200 text-violet-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              id="trace-toggle-btn"
              onClick={onToggleTracing}
              title="Attiva Modalità Ricalco sul foglio da disegno"
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isTracingMode
                  ? 'bg-violet-50 border-violet-200 text-violet-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              id="chiaroscuro-toggle-btn"
              onClick={onToggleChiaroscuro}
              title="Studio Chiaroscuro (Filtro Bianco e Nero ad alto contrasto per studio ombre)"
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isChiaroscuro
                  ? 'bg-slate-800 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Contrast className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories selector */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-slate-200/60 p-1 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                // Find first template of this category
                const matched = templates.find((t) => t.category === cat);
                if (matched) {
                  onSelectTemplate(matched);
                  onImageUpload(null); // Reset custom image on selecting built-in
                }
              }}
              className={`py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                !uploadedImageUrl && selectedTemplate.category === cat
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template sub-selection */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {templates
            .filter((t) => t.category === selectedTemplate.category)
            .map((temp) => (
              <button
                key={temp.id}
                onClick={() => {
                  onSelectTemplate(temp);
                  onImageUpload(null);
                }}
                className={`px-3 py-1 text-xs rounded-full border shrink-0 transition-all cursor-pointer ${
                  !uploadedImageUrl && selectedTemplate.id === temp.id
                    ? 'bg-slate-800 border-slate-800 text-white font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {temp.title}
              </button>
            ))}
          
          {/* Custom Upload Button */}
          <button
            id="custom-upload-pill"
            onClick={() => fileInputRef.current?.click()}
            className={`px-3 py-1 text-xs rounded-full border shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
              uploadedImageUrl
                ? 'bg-violet-600 border-violet-600 text-white font-medium'
                : 'bg-white border-dashed border-violet-300 text-violet-600 hover:bg-violet-50'
            }`}
          >
            <Upload className="w-3 h-3" />
            {uploadedImageUrl ? 'Foto Caricata' : 'Usa la tua Foto'}
          </button>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div 
        id="reference-canvas-wrapper"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex-1 relative bg-slate-100 min-h-[350px] flex items-center justify-center p-4 border-b border-slate-100 group transition-all"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* SVG Drawing / Image Viewer Container */}
        <div className="relative w-full max-w-[360px] aspect-square bg-white rounded-xl shadow-md border border-slate-200/50 overflow-hidden flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            {uploadedImageUrl ? (
              // Custom User Photo Reference Mode
              <motion.div
                key="uploaded-image"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full h-full flex items-center justify-center bg-slate-50"
              >
                <img
                  src={uploadedImageUrl}
                  alt="Riferimento Personale"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain pointer-events-none select-none transition-all duration-300"
                  style={{ filter: isChiaroscuro ? 'grayscale(100%) contrast(170%) brightness(95%)' : 'none' }}
                />

                {/* Overlaid Grid lines for Custom Uploaded Reference */}
                {showGrid && (
                  <svg
                    viewBox="0 0 400 400"
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  >
                    {renderGridLines()}
                  </svg>
                )}
                
                {/* Remove Photo Overlay */}
                <button
                  id="remove-photo-btn"
                  onClick={() => onImageUpload(null)}
                  className="absolute bottom-3 right-3 bg-red-500 hover:bg-red-600 text-white text-xs px-2.5 py-1 rounded-lg shadow-md transition-all font-medium cursor-pointer z-20"
                >
                  Rimuovi Foto
                </button>
              </motion.div>
            ) : (
              // Step-by-Step Interactive SVG reference
              <motion.div
                key={`${selectedTemplate.id}-${currentStepIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full p-4 relative flex items-center justify-center select-none"
              >
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full object-contain transition-all duration-300"
                  style={{ filter: isChiaroscuro ? 'grayscale(100%) contrast(170%) brightness(90%)' : 'none' }}
                >
                  {/* Grid layout */}
                  {renderGridLines()}

                  {/* Render step paths */}
                  {currentStep.svgPaths.map((path, idx) => (
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fallback drag-and-drop hint when no custom photo loaded yet */}
          {!uploadedImageUrl && (
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 pointer-events-none">
              <ImageIcon className="w-3 h-3" />
              Trascina qui un'immagine per caricarla!
            </div>
          )}

          {/* Floating Grid overlay outside SVG viewbox when rendering image */}
          {showGrid && uploadedImageUrl && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {renderGridLines()}
            </svg>
          )}
        </div>
      </div>

      {/* Control Navigation & Educational Description */}
      <div className="p-4 bg-slate-50 flex flex-col gap-3">
        {uploadedImageUrl ? (
          <div className="flex flex-col gap-1.5 p-1">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm">
              <ImageIcon className="w-4 h-4 text-violet-500" />
              Foto di Riferimento Attiva
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hai caricato la tua foto! Ora puoi copiarla nel foglio di destra. Usa la <span className="font-semibold text-slate-700">Griglia</span> per riprodurre fedelmente le proporzioni o attiva il <span className="font-semibold text-slate-700">Ricalco</span> per disegnarci sopra.
            </p>
          </div>
        ) : (
          <>
            {/* Step Selector slider bar */}
            <div className="flex items-center justify-between gap-4">
              <button
                id="prev-step-btn"
                disabled={currentStepIndex === 0}
                onClick={() => onStepChange(currentStepIndex - 1)}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>

              <div className="flex-1 flex flex-col items-center">
                <span className="text-[11px] font-bold text-violet-600 tracking-wider uppercase">
                  LEZIONE DI DISEGNO
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  Passo {currentStep.number} di {selectedTemplate.steps.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium mt-1">
                  Difficoltà: {selectedTemplate.difficulty}
                </span>
              </div>

              <button
                id="next-step-btn"
                disabled={currentStepIndex === selectedTemplate.steps.length - 1}
                onClick={() => onStepChange(currentStepIndex + 1)}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Stepper Dots */}
            <div className="flex justify-center gap-1.5">
              {selectedTemplate.steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onStepChange(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentStepIndex
                      ? 'bg-violet-600 w-5'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Step Description Box */}
            <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-2xs flex flex-col gap-2">
              <div>
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1 mb-1">
                  <span className="inline-flex w-4 h-4 items-center justify-center bg-violet-100 text-violet-700 text-[10px] font-bold rounded-full">
                    {currentStep.number}
                  </span>
                  {currentStep.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* Color Guide Legend */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1.5 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Guida colori:</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  Costruzione Base
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  Assi & Guide
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                  Passi Precedenti
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-800 shrink-0" />
                  Nuovi Tratti
                </span>
              </div>
            </div>
          </>
        )}

        {/* Configuration settings footer: Grid Size & Tracing Opacity */}
        <div className="border-t border-slate-200/50 pt-3 flex flex-col gap-2">
          {showGrid && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Grid className="w-3.5 h-3.5 text-slate-400" /> Dimensione Griglia:
              </span>
              <div className="flex gap-1.5">
                {[3, 4, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => onGridSizeChange(size)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                      gridSize === size
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isTracingMode && (
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between items-center text-slate-500">
                <span className="font-medium flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" /> Trasparenza Ricalco:
                </span>
                <span className="font-bold text-slate-700">{Math.round(traceOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={traceOpacity}
                onChange={(e) => onTraceOpacityChange(parseFloat(e.target.value))}
                className="w-full accent-violet-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-[10px] text-violet-600 italic flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                Il disegno originale apparirà sotto il foglio di disegno!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
