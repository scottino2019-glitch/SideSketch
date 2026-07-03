export interface DrawingStep {
  number: number;
  title: string;
  description: string;
  svgPaths: {
    color: string;
    strokeWidth: number;
    d: string;
    isGuide?: boolean; // If it's a guide/skeleton path (typically drawn in red/blue)
  }[];
}

export interface DrawingTemplate {
  id: string;
  title: string;
  difficulty: 'Facile' | 'Intermedio' | 'Avanzato';
  category: 'Fumetti' | 'Personaggi' | 'Animali' | 'Paesaggi' | 'Accademia' | 'Architettura';
  description: string;
  steps: DrawingStep[];
}

export type DrawingTool = 'pencil' | 'brush' | 'eraser' | 'line' | 'rect' | 'circle' | 'spray' | 'highlighter';

export type CanvasBackground = 'white' | 'chalkboard' | 'vintage' | 'graph';

export interface CanvasState {
  tool: DrawingTool;
  color: string;
  brushSize: number;
  opacity: number;
  showGrid: boolean;
  gridSize: number; // e.g., 3x3, 4x4, 8x8
  symmetry: 'none' | 'vertical' | 'horizontal' | 'both';
  traceOpacity: number; // 0 to 1
  isTracingMode: boolean;
  background?: CanvasBackground;
}
