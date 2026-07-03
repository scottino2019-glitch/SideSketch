import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Palette, HelpCircle, BookOpen, Layers, 
  RotateCcw, Github, Download, CheckCircle, ChevronRight, Play 
} from 'lucide-react';
import { templates } from './templates';
import { CanvasState, DrawingTemplate } from './types';
import { ReferenceViewer } from './components/ReferenceViewer';
import { DrawingCanvas } from './components/DrawingCanvas';

export default function App() {
  // State for reference viewer
  const [selectedTemplate, setSelectedTemplate] = useState<DrawingTemplate>(templates[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // Sync parameters
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(4); // 4x4 default
  const [isTracingMode, setIsTracingMode] = useState(false);
  const [traceOpacity, setTraceOpacity] = useState(0.4);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isChiaroscuro, setIsChiaroscuro] = useState(false);

  // Drawing canvas state
  const [canvasState, setCanvasState] = useState<CanvasState>({
    tool: 'pencil',
    color: '#1e293b',
    brushSize: 6,
    opacity: 1.0,
    showGrid: false,
    gridSize: 4,
    symmetry: 'none',
    traceOpacity: 0.4,
    isTracingMode: false,
    background: 'white',
  });

  // Exporting state
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotification, setExportNotification] = useState<string | null>(null);

  // Sync grid toggles from ReferenceViewer to Canvas state
  const handleToggleGrid = () => {
    const nextVal = !showGrid;
    setShowGrid(nextVal);
    setCanvasState(prev => ({ ...prev, showGrid: nextVal }));
  };

  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
    setCanvasState(prev => ({ ...prev, gridSize: size }));
  };

  const handleToggleTracing = () => {
    const nextVal = !isTracingMode;
    setIsTracingMode(nextVal);
    setCanvasState(prev => ({ ...prev, isTracingMode: nextVal }));
  };

  const handleTraceOpacityChange = (opacity: number) => {
    setTraceOpacity(opacity);
    setCanvasState(prev => ({ ...prev, traceOpacity: opacity }));
  };

  const handleSelectTemplate = (template: DrawingTemplate) => {
    setSelectedTemplate(template);
    setCurrentStepIndex(0);
  };

  const handleStepChange = (index: number) => {
    setCurrentStepIndex(index);
  };

  // Triggers the merged Dual-Comparison card generator
  const handleSaveComparison = (drawingDataUrl: string) => {
    setIsExporting(true);
    setExportNotification('Generazione della scheda di confronto in corso...');

    const exportCanvas = document.createElement('canvas');
    // We want a high-resolution 1920x1080 graphic card
    const cardWidth = 1920;
    const cardHeight = 1080;
    exportCanvas.width = cardWidth;
    exportCanvas.height = cardHeight;

    const ctx = exportCanvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      setExportNotification(null);
      return;
    }

    // 1. Paint Background with a gorgeous Slate-900 gradient or solid
    ctx.fillStyle = '#0f172a'; // Deep slate
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Decorative geometric accents
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(0, 0, 500, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(cardWidth, cardHeight, 600, 0, Math.PI * 2);
    ctx.fill();

    // 2. Render Header Title Banner
    ctx.fillStyle = '#a78bfa'; // Violet-300
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.fillText('STUDIO DI DISEGNO', 80, 100);

    ctx.fillStyle = '#94a3b8'; // Slate-400
    ctx.font = '500 20px system-ui, -apple-system, sans-serif';
    const subTitle = uploadedImageUrl 
      ? 'Esercizio Pratico • Da immagine personale'
      : `Esercizio Pratico • Lezione: ${selectedTemplate.title} (Passo ${currentStepIndex + 1}/${selectedTemplate.steps.length})`;
    ctx.fillText(subTitle, 80, 140);

    // 3. Draw Side-by-Side White Canvas Frames
    const frameW = 800;
    const frameH = 800;
    const frameLeftX = 120;
    const frameRightX = 1000;
    const frameY = 200;

    // Left Frame background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect?.(frameLeftX, frameY, frameW, frameH, 24) ?? ctx.fillRect(frameLeftX, frameY, frameW, frameH);
    ctx.fill();

    // Right Frame background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect?.(frameRightX, frameY, frameW, frameH, 24) ?? ctx.fillRect(frameRightX, frameY, frameW, frameH);
    ctx.fill();

    // Load and draw both canvases side by side asynchronously to guarantee they are drawn fully!
    const drawReferencePromise = new Promise<void>((resolve) => {
      if (uploadedImageUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // Object-contain scale inside 740x740 box
          const padding = 30;
          const targetW = frameW - padding * 2;
          const targetH = frameH - padding * 2;
          const scale = Math.min(targetW / img.width, targetH / img.height);
          const w = img.width * scale;
          const h = img.height * scale;
          const dx = frameLeftX + padding + (targetW - w) / 2;
          const dy = frameY + padding + (targetH - h) / 2;
          
          ctx.drawImage(img, dx, dy, w, h);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = uploadedImageUrl;
      } else {
        // Construct SVG representation for the current step
        const currentStep = selectedTemplate.steps[currentStepIndex];
        const pathsStr = currentStep.svgPaths
          .map(p => `<path d="${p.d}" fill="none" stroke="${p.color}" stroke-width="${p.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`)
          .join('');
        
        // Build raw svg string with white background
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" style="background: white;">${pathsStr}</svg>`;
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        const img = new Image();
        img.onload = () => {
          // Drawn directly inside left frame with standard padding
          ctx.drawImage(img, frameLeftX + 40, frameY + 40, frameW - 80, frameH - 80);
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = url;
      }
    });

    const drawUserCanvasPromise = new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Draw user stroke canvas directly onto the right white frame
        ctx.drawImage(img, frameRightX + 20, frameY + 20, frameW - 40, frameH - 40);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = drawingDataUrl;
    });

    // Wait for both to finish drawing, then write labels and save!
    Promise.all([drawReferencePromise, drawUserCanvasPromise]).then(() => {
      // 4. Draw labels on top or bottom of the frame
      ctx.fillStyle = '#64748b'; // Slate-500
      ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      
      // Left label
      ctx.fillText('1. IL MODELLO', frameLeftX + frameW / 2, frameY - 25);
      
      // Right label
      ctx.fillText('2. IL TUO DISEGNO', frameRightX + frameW / 2, frameY - 25);

      // Branding bottom signature
      ctx.fillStyle = '#475569';
      ctx.font = 'italic 16px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Esercitazione completata su Impara a Disegnare Studio • Fatto con Passione 🎨', cardWidth - 120, cardHeight - 50);

      // Trigger automatic file download
      const mergedUrl = exportCanvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `confronto-${selectedTemplate.id || 'disegno-libero'}-passo-${currentStepIndex + 1}.png`;
      downloadLink.href = mergedUrl;
      downloadLink.click();

      setIsExporting(false);
      setExportNotification('Ottimo lavoro! Immagine salvata con successo.');
      setTimeout(() => setExportNotification(null), 4000);
    });
  };

  return (
    <div id="drawing-app-root" className="min-h-screen bg-slate-100/60 pb-12">
      {/* Visual Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-violet-200">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 font-display flex items-center gap-2">
                Impara a Disegnare <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-bold">Studio</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Sviluppa la coordinazione occhio-mano con il metodo del doppio canvas interattivo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Creatività senza limiti</p>
              <p className="text-xs font-semibold text-slate-600">Nessun Server • 100% Locale</p>
            </div>
            <div className="w-[1px] h-8 bg-slate-200 hidden sm:block" />
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 transition-all cursor-pointer"
              title="Codice sorgente libero"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Grid Container */}
      <main className="max-w-7xl mx-auto px-4 mt-6 sm:px-6 lg:px-8">
        
        {/* Dynamic export alerts */}
        <AnimatePresence>
          {exportNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-3 bg-violet-600 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 shrink-0 animate-bounce" />
              <span>{exportNotification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT SIDE: Reference Viewer (5 cols) */}
          <section id="reference-panel-section" className="lg:col-span-6 flex flex-col">
            <ReferenceViewer
              templates={templates}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
              currentStepIndex={currentStepIndex}
              onStepChange={handleStepChange}
              uploadedImageUrl={uploadedImageUrl}
              onImageUpload={setUploadedImageUrl}
              showGrid={showGrid}
              onToggleGrid={handleToggleGrid}
              gridSize={gridSize}
              onGridSizeChange={handleGridSizeChange}
              isTracingMode={isTracingMode}
              onToggleTracing={handleToggleTracing}
              traceOpacity={traceOpacity}
              onTraceOpacityChange={handleTraceOpacityChange}
              isChiaroscuro={isChiaroscuro}
              onToggleChiaroscuro={() => setIsChiaroscuro(prev => !prev)}
            />
          </section>

          {/* RIGHT SIDE: Drawing canvas (7 cols) */}
          <section id="canvas-panel-section" className="lg:col-span-6 flex flex-col">
            <DrawingCanvas
              canvasState={canvasState}
              setCanvasState={setCanvasState}
              selectedTemplate={selectedTemplate}
              currentStepIndex={currentStepIndex}
              uploadedImageUrl={uploadedImageUrl}
              onSaveComparison={handleSaveComparison}
            />
          </section>

        </div>

        {/* Interactive Fine Arts Academy Manual (Elevated academic tutorial section) */}
        <section id="academic-manual-section" className="mt-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-4 mb-5">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-600" />
              Dispense e Manuale d'Arte dell'Accademia 🏛️
            </h3>
            <p className="text-xs text-slate-500 mt-1">Lezioni teoriche e pratiche sul metodo classico, il chiaroscuro, la prospettiva e l'uso degli strumenti avanzati.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left side tabs: Chapter selections */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {[
                { title: "Capitolo 1: Chiaroscuro e Volumi", desc: "Studio delle ombre usando il filtro 🌓" },
                { title: "Capitolo 2: Il Metodo Loomis", desc: "Proporzioni e asse per ritrarre il viso" },
                { title: "Capitolo 3: La Prospettiva Lineare", desc: "Profondità geometrica e linee ortogonali" },
                { title: "Capitolo 4: Griglia e Foto Personali", desc: "Come caricare scarabocchi e bozzetti" },
              ].map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChapter(index)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeChapter === index
                      ? 'bg-violet-50/70 border-violet-200 text-violet-950 shadow-3xs font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <h4 className="text-xs font-bold">{chapter.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{chapter.desc}</p>
                </button>
              ))}
            </div>

            {/* Right side display: Rich Educational Content */}
            <div className="lg:col-span-8 bg-slate-50/60 rounded-xl border border-slate-200/50 p-5 min-h-[220px] flex flex-col justify-between gap-4">
              {activeChapter === 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 font-sans">
                    🌓 Lezione Pratica: Luci, Ombre e Chiaroscuro
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-600 leading-relaxed">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/40 shadow-3xs">
                      <span className="font-bold text-slate-800 block mb-1">🎯 Come funziona:</span>
                      Il volume delle cose si vede solo grazie alle ombre. Ignora i colori e concentrati solo sulle masse scure per rendere gli oggetti tridimensionali.
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200/40 shadow-3xs">
                      <span className="font-bold text-slate-800 block mb-1">🖌️ Tecnica:</span>
                      Usa un pennello grande con bassa opacità (effetto carboncino sfumato) per stendere strati leggeri di ombra l'uno sull'altro.
                    </div>
                  </div>

                  {/* Interactive setup button */}
                  <div className="bg-violet-50/50 border border-violet-100 p-3 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 mt-1">
                    <div className="text-[10px] text-violet-950">
                      <span className="font-bold block">👉 PROVA SUBITO CON UN CLICK:</span>
                      Imposta il modello Anatomia Occhio, attiva il filtro Chiaroscuro e seleziona il Pennello morbido!
                    </div>
                    <button
                      onClick={() => {
                        const t = templates.find(temp => temp.id === 'anatomia-occhio');
                        if (t) handleSelectTemplate(t);
                        setIsChiaroscuro(true);
                        setCanvasState(prev => ({
                          ...prev,
                          tool: 'brush',
                          brushSize: 22,
                          opacity: 0.45,
                          color: '#5e6472'
                        }));
                      }}
                      className="px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Applica Configurazione Lezione
                    </button>
                  </div>
                </div>
              )}

              {activeChapter === 1 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 font-sans">
                    👤 Lezione Pratica: Proporzioni e Simmetria del Viso
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-600 leading-relaxed">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/40 shadow-3xs">
                      <span className="font-bold text-slate-800 block mb-1">🎯 Come funziona:</span>
                      Il viso umano è diviso in 3 terzi proporzionali uguali (fronte, naso, mento). Gli occhi si trovano esattamente a metà altezza della testa!
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200/40 shadow-3xs">
                      <span className="font-bold text-slate-800 block mb-1">📏 Tecnica della Simmetria:</span>
                      Usa la matita azzurra per tracciare le linee guida di costruzione, e attiva la simmetria verticale per specchiare i tratti a sinistra e a destra!
                    </div>
                  </div>

                  {/* Interactive setup button */}
                  <div className="bg-violet-50/50 border border-violet-100 p-3 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 mt-1">
                    <div className="text-[10px] text-violet-950">
                      <span className="font-bold block">👉 PROVA SUBITO CON UN CLICK:</span>
                      Imposta il modello del Volto, seleziona la Matita azzurra e attiva la Simmetria speculare verticale!
                    </div>
                    <button
                      onClick={() => {
                        const t = templates.find(temp => temp.id === 'proporzioni-viso');
                        if (t) handleSelectTemplate(t);
                        setIsChiaroscuro(false);
                        setCanvasState(prev => ({
                          ...prev,
                          tool: 'pencil',
                          brushSize: 4,
                          opacity: 1.0,
                          color: '#3b82f6',
                          symmetry: 'vertical'
                        }));
                      }}
                      className="px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Applica Configurazione Lezione
                    </button>
                  </div>
                </div>
              )}

              {activeChapter === 2 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 font-sans">
                    📐 Lezione Pratica: Prospettiva Geometrica e Righello
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-600 leading-relaxed">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/40 shadow-3xs">
                      <span className="font-bold text-slate-800 block mb-1">🎯 Come funziona:</span>
                      In prospettiva, tutte le linee di profondità (ortogonali) convergono verso un solo punto invisibile al centro: il punto di fuga.
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200/40 shadow-3xs">
                      <span className="font-bold text-slate-800 block mb-1">📐 Tecnica del Righello:</span>
                      Disegnare linee di fuga a mano libera è difficilissimo. Usa lo strumento **Linea Dritta** per tracciare raggi dritti e perfetti!
                    </div>
                  </div>

                  {/* Interactive setup button */}
                  <div className="bg-violet-50/50 border border-violet-100 p-3 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 mt-1">
                    <div className="text-[10px] text-violet-950">
                      <span className="font-bold block">👉 PROVA SUBITO CON UN CLICK:</span>
                      Imposta la Camera Prospettica e seleziona lo Strumento Righello (Linea dritta) di colore arancione per le fughe!
                    </div>
                    <button
                      onClick={() => {
                        const t = templates.find(temp => temp.id === 'prospettiva-stanza');
                        if (t) handleSelectTemplate(t);
                        setIsChiaroscuro(false);
                        setCanvasState(prev => ({
                          ...prev,
                          tool: 'line',
                          brushSize: 3,
                          opacity: 1.0,
                          color: '#ea580c',
                          symmetry: 'none'
                        }));
                      }}
                      className="px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Applica Configurazione Lezione
                    </button>
                  </div>
                </div>
              )}

              {activeChapter === 3 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 font-sans">
                    📱 Lezione Pratica: Copiare con la Griglia Proporzionale
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-600 leading-relaxed">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/40 shadow-3xs">
                      <span className="font-bold text-slate-800 block mb-1">🎯 Come funziona:</span>
                      La griglia scompone l'immagine in quadrati numerati (A1, B2, ecc.). Invece di copiare tutto l'insieme, disegna un quadrato alla volta!
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200/40 shadow-3xs">
                      <span className="font-bold text-slate-800 block mb-1">⚡ Risultato:</span>
                      Evita errori di proporzione, impara le distanze reali ed esegui copie perfette al 100% da qualsiasi tua foto!
                    </div>
                  </div>

                  {/* Interactive setup button */}
                  <div className="bg-violet-50/50 border border-violet-100 p-3 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 mt-1">
                    <div className="text-[10px] text-violet-950">
                      <span className="font-bold block">👉 PROVA SUBITO CON UN CLICK:</span>
                      Attiva istantaneamente una griglia professionale 8x8 ad alta definizione sia sul modello sia sul foglio da disegno!
                    </div>
                    <button
                      onClick={() => {
                        setShowGrid(true);
                        setGridSize(8);
                        setCanvasState(prev => ({
                          ...prev,
                          showGrid: true,
                          gridSize: 8
                        }));
                      }}
                      className="px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Attiva Griglia di Copia 8x8
                    </button>
                  </div>
                </div>
              )}

              {/* General academy badge in footer */}
              <div className="border-t border-slate-200 mt-2 pt-3 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>Lezione corrente: Capitolo {activeChapter + 1} di 4</span>
                <span className="text-violet-600 font-bold bg-violet-100/60 px-2 py-0.5 rounded-md">Art Studio Academy</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Elegant minimalist footer */}
      <footer className="mt-12 text-center text-xs text-slate-400 font-medium">
        <p>© 2026 Impara a Disegnare Studio • Creato per aspiranti artisti, fumettisti e sognatori.</p>
        <p className="mt-1 text-[10px]">Utilizza moderni standard web offline (HTML5 Canvas e Vettori SVG) per salvaguardare la tua privacy.</p>
      </footer>
    </div>
  );
}
