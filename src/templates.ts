import { DrawingTemplate } from './types';

export const templates: DrawingTemplate[] = [
  {
    id: 'gatto-cartoon',
    title: 'Gatto Cartoon',
    category: 'Fumetti',
    difficulty: 'Facile',
    description: 'Impara a disegnare un simpatico gattino in stile cartoon partendo dalle forme base sferiche.',
    steps: [
      {
        number: 1,
        title: 'Forme Base di Costruzione',
        description: 'Disegna un grande cerchio per la testa, un ovale per il corpo e dei triangoli per le orecchie. Traccia le linee guida del viso.',
        svgPaths: [
          // Head circle
          { d: 'M 200 160 A 70 70 0 1 1 199.9 160 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Body oval
          { d: 'M 200 290 Q 250 290 240 350 Q 200 370 160 350 Q 150 290 200 290 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Left Ear triangle
          { d: 'M 140 120 L 110 70 L 175 100 Z', color: '#3b82f6', strokeWidth: 2, isGuide: true },
          // Right Ear triangle
          { d: 'M 260 120 L 290 70 L 225 100 Z', color: '#3b82f6', strokeWidth: 2, isGuide: true },
          // Face cross-guides
          { d: 'M 130 170 Q 200 190 270 170', color: '#ef4444', strokeWidth: 2, isGuide: true },
          { d: 'M 200 90 Q 200 170 200 230', color: '#ef4444', strokeWidth: 2, isGuide: true },
        ]
      },
      {
        number: 2,
        title: 'Definizione dei Contorni',
        description: 'Seguendo le guide, modella le guance morbide del gatto, definisci le zampe anteriori e la coda arcuata.',
        svgPaths: [
          // Pre-rendered previous guides in lighter grey
          { d: 'M 200 160 A 70 70 0 1 1 199.9 160 Z', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          { d: 'M 200 290 Q 250 290 240 350 Q 200 370 160 350 Q 150 290 200 290 Z', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          // Left Ear contour
          { d: 'M 145 115 Q 115 65 110 70 Q 110 80 165 105', color: '#1e293b', strokeWidth: 3.5 },
          // Right Ear contour
          { d: 'M 255 115 Q 285 65 290 70 Q 290 80 235 105', color: '#1e293b', strokeWidth: 3.5 },
          // Head cheeks curve
          { d: 'M 135 125 Q 120 170 140 210 Q 200 245 260 210 Q 280 170 265 125', color: '#1e293b', strokeWidth: 3.5 },
          // Chest and Paws
          { d: 'M 175 295 Q 175 355 180 360 Q 190 365 195 350 Q 200 295 200 295', color: '#1e293b', strokeWidth: 3.5 },
          { d: 'M 225 295 Q 225 355 220 360 Q 210 365 205 350 Q 200 295 200 295', color: '#1e293b', strokeWidth: 3.5 },
          // Back and hind leg
          { d: 'M 152 225 Q 140 280 150 340 Q 165 365 180 360', color: '#1e293b', strokeWidth: 3.5 },
          { d: 'M 248 225 Q 260 280 250 340 Q 235 365 220 360', color: '#1e293b', strokeWidth: 3.5 },
          // Coda (Tail)
          { d: 'M 250 325 Q 310 330 330 260 Q 340 220 325 210 Q 315 210 315 230 Q 300 295 245 310', color: '#1e293b', strokeWidth: 3.5 }
        ]
      },
      {
        number: 3,
        title: 'Occhi Grandi e Dettagli Viso',
        description: 'Aggiungi due grandi occhi da cartoon, il nasino a triangolo, la bocca felice e i baffi espressivi.',
        svgPaths: [
          // Base contours in dark slate
          { d: 'M 145 115 Q 115 65 110 70 Q 110 80 165 105', color: '#475569', strokeWidth: 2 },
          { d: 'M 255 115 Q 285 65 290 70 Q 290 80 235 105', color: '#475569', strokeWidth: 2 },
          { d: 'M 135 125 Q 120 170 140 210 Q 200 245 260 210 Q 280 170 265 125', color: '#475569', strokeWidth: 2 },
          { d: 'M 175 295 Q 175 355 180 360 Q 190 365 195 350', color: '#475569', strokeWidth: 2 },
          { d: 'M 225 295 Q 225 355 220 360 Q 210 365 205 350', color: '#475569', strokeWidth: 2 },
          { d: 'M 152 225 Q 140 280 150 340 Q 165 365 180 360', color: '#475569', strokeWidth: 2 },
          { d: 'M 248 225 Q 260 280 250 340 Q 235 365 220 360', color: '#475569', strokeWidth: 2 },
          { d: 'M 250 325 Q 310 330 330 260 Q 340 220 325 210 Q 315 210 315 230 Q 300 295 245 310', color: '#475569', strokeWidth: 2 },
          
          // LEFT EYE (Big cartoon circle)
          { d: 'M 175 165 A 16 16 0 1 1 174.9 165 Z', color: '#0d1117', strokeWidth: 2.5 },
          { d: 'M 172 161 A 4 4 0 1 1 171.9 161 Z', color: '#ffffff', strokeWidth: 1 }, // Highlight
          // RIGHT EYE
          { d: 'M 225 165 A 16 16 0 1 1 224.9 165 Z', color: '#0d1117', strokeWidth: 2.5 },
          { d: 'M 222 161 A 4 4 0 1 1 221.9 161 Z', color: '#ffffff', strokeWidth: 1 }, // Highlight
          
          // Cute Nose (triangle)
          { d: 'M 194 180 L 206 180 L 200 186 Z', color: '#f43f5e', strokeWidth: 2 },
          // Mouth
          { d: 'M 200 186 Q 192 196 186 192', color: '#1e293b', strokeWidth: 3 },
          { d: 'M 200 186 Q 208 196 214 192', color: '#1e293b', strokeWidth: 3 },
          
          // Whiskers (Baffi) Left
          { d: 'M 130 185 L 105 180', color: '#64748b', strokeWidth: 2.5 },
          { d: 'M 128 195 L 100 195', color: '#64748b', strokeWidth: 2.5 },
          // Whiskers Right
          { d: 'M 270 185 L 295 180', color: '#64748b', strokeWidth: 2.5 },
          { d: 'M 272 195 L 300 195', color: '#64748b', strokeWidth: 2.5 },
          // Ear details
          { d: 'M 130 105 L 140 85 L 155 100', color: '#f43f5e', strokeWidth: 2 }
        ]
      }
    ]
  },
  {
    id: 'supereroe-chibi',
    title: 'Supereroe Chibi',
    category: 'Fumetti',
    difficulty: 'Intermedio',
    description: 'Impara a disegnare un eroe in stile chibi (miniature super deformed) con mantello svolazzante.',
    steps: [
      {
        number: 1,
        title: 'Forme Proporzionali Chibi',
        description: 'La testa dello stile Chibi è grande quanto il corpo. Disegna una testa enorme, una sagoma a fagiolo per il torace e le linee degli arti.',
        svgPaths: [
          // Giant head circle
          { d: 'M 200 140 A 65 65 0 1 1 199.9 140 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Tiny body guidelines
          { d: 'M 200 205 L 200 265', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          { d: 'M 175 220 L 225 220', color: '#3b82f6', strokeWidth: 2, isGuide: true }, // shoulders
          { d: 'M 175 220 L 150 250', color: '#3b82f6', strokeWidth: 2, isGuide: true }, // Left arm
          { d: 'M 225 220 L 250 250', color: '#3b82f6', strokeWidth: 2, isGuide: true }, // Right arm
          { d: 'M 185 265 L 175 310', color: '#3b82f6', strokeWidth: 2, isGuide: true }, // Left leg
          { d: 'M 215 265 L 225 310', color: '#3b82f6', strokeWidth: 2, isGuide: true }, // Right leg
          // Face symmetry guidelines
          { d: 'M 135 140 Q 200 155 265 140', color: '#ef4444', strokeWidth: 2, isGuide: true },
        ]
      },
      {
        number: 2,
        title: 'Mantello e Maschera Eroica',
        description: 'Definisci la sagoma della maschera intorno agli occhi, disegna i capelli a punta e il mantello epico.',
        svgPaths: [
          // Guide traces
          { d: 'M 200 140 A 65 65 0 1 1 199.9 140 Z', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          // Hero mask contour
          { d: 'M 150 140 Q 200 160 250 140 Q 260 125 235 125 Q 200 135 165 125 Z', color: '#1e293b', strokeWidth: 3.5 },
          // Hair spikes
          { d: 'M 135 140 Q 120 100 145 90 Q 160 70 185 85 Q 205 60 220 85 Q 245 75 255 100 Q 265 110 260 135', color: '#1e293b', strokeWidth: 3.5 },
          // Chubby Face outline
          { d: 'M 138 140 Q 140 195 200 205 Q 260 195 262 140', color: '#1e293b', strokeWidth: 3.5 },
          // Tiny arms and torso
          { d: 'M 175 205 L 155 240 Q 150 245 155 250 Q 160 250 170 230', color: '#1e293b', strokeWidth: 3 },
          { d: 'M 225 205 L 245 240 Q 250 245 245 250 Q 240 250 230 230', color: '#1e293b', strokeWidth: 3 },
          // Cape (Mantello) blowing in the wind
          { d: 'M 165 210 Q 110 230 95 300 Q 150 310 180 260', color: '#ef4444', strokeWidth: 3 },
          { d: 'M 235 210 Q 290 230 305 300 Q 250 310 220 260', color: '#ef4444', strokeWidth: 3 }
        ]
      },
      {
        number: 3,
        title: 'Occhi Combattivi e Dettagli finali',
        description: 'Disegna gli occhi coperti dalla maschera che esprimono determinazione, lo scudo sul petto e rifinisci gli stivali.',
        svgPaths: [
          // General outline reference
          { d: 'M 138 140 Q 140 195 200 205 Q 260 195 262 140', color: '#475569', strokeWidth: 2 },
          { d: 'M 150 140 Q 200 160 250 140 Q 260 125 235 125 Q 200 135 165 125 Z', color: '#475569', strokeWidth: 2 },
          // Hair contour
          { d: 'M 135 140 Q 120 100 145 90 Q 160 70 185 85 Q 205 60 220 85 Q 245 75 255 100 Q 265 110 260 135', color: '#475569', strokeWidth: 2 },
          
          // Heroic glowing eye apertures
          { d: 'M 165 142 L 185 138 L 180 148 Z', color: '#0d1117', strokeWidth: 2.5 },
          { d: 'M 165 142 L 185 138 L 180 148 Z', color: '#38bdf8', strokeWidth: 2 }, // Blue power glow inside
          { d: 'M 235 142 L 215 138 L 220 148 Z', color: '#0d1117', strokeWidth: 2.5 },
          { d: 'M 235 142 L 215 138 L 220 148 Z', color: '#38bdf8', strokeWidth: 2 },
          
          // Determination mouth
          { d: 'M 192 180 Q 200 174 208 180', color: '#1e293b', strokeWidth: 3 },
          
          // Torso belt & Chest Emblem (Star)
          { d: 'M 185 205 L 185 255 L 215 255 L 215 205 Z', color: '#1e293b', strokeWidth: 2.5 },
          { d: 'M 200 215 L 203 222 L 211 222 L 205 226 L 207 233 L 200 229 L 193 233 L 195 226 L 189 222 L 197 222 Z', color: '#f59e0b', strokeWidth: 1.5 },
          
          // Tiny Legs with boots
          { d: 'M 185 255 L 175 295 L 190 295 L 195 255', color: '#1e293b', strokeWidth: 2.5 },
          { d: 'M 215 255 L 225 295 L 210 295 L 205 255', color: '#1e293b', strokeWidth: 2.5 }
        ]
      }
    ]
  },
  {
    id: 'profilo-viso',
    title: 'Profilo Viso Classico',
    category: 'Personaggi',
    difficulty: 'Avanzato',
    description: 'Impara il disegno accademico del profilo umano sfruttando la tecnica della sfera di Loomis.',
    steps: [
      {
        number: 1,
        title: 'La Sfera di Loomis e l\'Asse della Mandibola',
        description: 'Traccia un cerchio perfetto, dividilo in quattro settori con linee guida ortogonali. Allunga la linea del mento verso il basso e uniscila alla mandibola.',
        svgPaths: [
          // Base Cranium Circle
          { d: 'M 220 160 A 70 70 0 1 1 219.9 160 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Jaw guideline (Mento e mandibola)
          { d: 'M 150 160 L 150 240 L 220 230', color: '#ef4444', strokeWidth: 2.5, isGuide: true },
          // Neck cylinder guide
          { d: 'M 180 230 L 180 320', color: '#3b82f6', strokeWidth: 2, isGuide: true },
          { d: 'M 230 215 L 250 320', color: '#3b82f6', strokeWidth: 2, isGuide: true },
          // Vertical midline of face profile
          { d: 'M 150 90 L 150 250', color: '#ef4444', strokeWidth: 2, isGuide: true },
        ]
      },
      {
        number: 2,
        title: 'I Tratti del Profilo (Naso, Labbra, Mento)',
        description: 'Sulla linea verticale frontale, scava l\'incavo dell\'occhio, proietta il naso all\'insù, definisci il volume delle labbra e la curva tonda del mento.',
        svgPaths: [
          // Background Loomis guides
          { d: 'M 220 160 A 70 70 0 1 1 219.9 160 Z', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          // Forehead, Brow ridge, Nose, Lips, Chin curve
          { d: 'M 172 105 Q 155 110 152 140 Q 150 155 146 157 Q 133 172 135 178 L 150 180 Q 146 190 144 195 Q 138 202 148 205 Q 142 215 146 222 Q 150 235 168 243 L 180 244', color: '#1e293b', strokeWidth: 3.5 },
          // Jaw line to ear
          { d: 'M 180 244 Q 212 242 215 200', color: '#1e293b', strokeWidth: 3.5 },
          // Neck outline front & back
          { d: 'M 175 244 Q 185 285 190 320', color: '#1e293b', strokeWidth: 3.5 },
          { d: 'M 240 210 Q 255 265 265 320', color: '#1e293b', strokeWidth: 3.5 },
          // Eye placement helper (triangle)
          { d: 'M 156 156 L 166 154 L 160 165 Z', color: '#ef4444', strokeWidth: 1.5, isGuide: true },
        ]
      },
      {
        number: 3,
        title: 'Dettaglio dell\'Occhio, Orecchio e Capelli',
        description: 'Disegna l\'occhio visto lateralmente (una "V" coricata), l\'orecchio (forma a fagiolo tra sopracciglio e base del naso) e i capelli fluidi.',
        svgPaths: [
          // Main profile skin contour
          { d: 'M 172 105 Q 155 110 152 140 Q 150 155 146 157 Q 133 172 135 178 L 150 180 Q 146 190 144 195 Q 138 202 148 205 Q 142 215 146 222 Q 150 235 168 243 L 180 244 Q 212 242 215 200', color: '#475569', strokeWidth: 2.5 },
          { d: 'M 175 244 Q 185 285 190 320', color: '#475569', strokeWidth: 2.5 },
          { d: 'M 240 210 Q 255 265 265 320', color: '#475569', strokeWidth: 2.5 },

          // Eye in side view
          { d: 'M 156 156 Q 165 154 167 159 Q 163 166 157 165 Z', color: '#0d1117', strokeWidth: 2 },
          { d: 'M 160 155 L 159 150', color: '#0d1117', strokeWidth: 2 }, // Eyelash
          { d: 'M 150 142 Q 162 142 168 147', color: '#1e293b', strokeWidth: 2.5 }, // Eyebrow
          
          // Ear (Orecchio)
          { d: 'M 205 160 Q 220 155 220 178 Q 220 195 210 198 Q 200 200 202 185 Q 204 185 208 178 Z', color: '#1e293b', strokeWidth: 3 },
          
          // Shaded flowing hair (Capelli)
          { d: 'M 172 105 Q 185 80 220 82 Q 255 85 270 120 Q 285 160 275 200 Q 260 240 245 220 Q 242 230 252 260 Q 260 290 270 320', color: '#1e293b', strokeWidth: 3.5 },
          { d: 'M 195 95 Q 215 95 235 120 Q 250 150 245 190', color: '#475569', strokeWidth: 2 }, // hair details
          { d: 'M 172 105 Q 160 120 162 140', color: '#1e293b', strokeWidth: 3 }, // fringe/ciuffo
        ]
      }
    ]
  },
  {
    id: 'occhio-manga',
    title: 'Occhio Manga ed Espressività',
    category: 'Personaggi',
    difficulty: 'Facile',
    description: 'Impara l\'iconico stile dei fumetti giapponesi disegnando un occhio espressivo con riflessi di luce complessi.',
    steps: [
      {
        number: 1,
        title: 'Arco Superiore e Ovale dell\'Iride',
        description: 'Traccia una linea spessa e ricurva verso l\'alto per la palpebra superiore, e un grande ovale verticale per l\'iride.',
        svgPaths: [
          // Base guides
          { d: 'M 120 220 C 120 220 180 140 280 170', color: '#ef4444', strokeWidth: 2.5, isGuide: true }, // upper brow guide
          { d: 'M 200 220 m -40 0 a 40 60 0 1 0 80 0 a 40 60 0 1 0 -80 0', color: '#3b82f6', strokeWidth: 2.5, isGuide: true }, // iris guide
        ]
      },
      {
        number: 2,
        title: 'Linee d\'Inchiostro e Ciglia',
        description: 'Ispessisci l\'arco superiore creando un blocco scuro, aggiungi la palpebra inferiore ed evidenzia l\'attaccatura delle ciglia esterne.',
        svgPaths: [
          // Previous guides
          { d: 'M 200 220 m -40 0 a 40 60 0 1 0 80 0 a 40 60 0 1 0 -80 0', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          // Upper lid (thick ink)
          { d: 'M 120 215 C 150 155 230 155 280 185 L 278 195 C 230 168 150 168 124 222 Z', color: '#1e293b', strokeWidth: 3.5 },
          // Cute side eyelash flicks
          { d: 'M 268 185 Q 285 170 295 175', color: '#1e293b', strokeWidth: 3.5 },
          { d: 'M 255 188 Q 275 180 282 190', color: '#1e293b', strokeWidth: 3 },
          // Lower lid line
          { d: 'M 150 245 Q 200 262 250 240', color: '#1e293b', strokeWidth: 3.5 },
          // Double eyelid fold above
          { d: 'M 155 152 Q 200 138 245 155', color: '#64748b', strokeWidth: 2 }
        ]
      },
      {
        number: 3,
        title: 'Pupilla, Riflessi di Luce e Sfumatura',
        description: 'Scura la pupilla centrale, riserva cerchi bianchi per i riflessi della luce e traccia linee verticali nell\'iride per dare profondità.',
        svgPaths: [
          // Redraw inking lines
          { d: 'M 120 215 C 150 155 230 155 280 185 L 278 195 C 230 168 150 168 124 222 Z', color: '#1e293b', strokeWidth: 2.5 },
          { d: 'M 150 245 Q 200 262 250 240', color: '#1e293b', strokeWidth: 2.5 },
          // Iris outline (solid dark)
          { d: 'M 170 205 Q 160 235 172 250 Q 200 265 228 250 Q 240 235 230 205 Q 220 178 200 178 Q 180 178 170 205', color: '#1e293b', strokeWidth: 3.5 },
          // Inner Pupil (pupilla)
          { d: 'M 200 215 A 15 18 0 1 1 199.9 215 Z', color: '#0d1117', strokeWidth: 2.5 },
          // Primary Reflection (White highlight bubble)
          { d: 'M 188 195 A 10 10 0 1 1 187.9 195 Z', color: '#ffffff', strokeWidth: 1.5 },
          // Secondary Soft reflection
          { d: 'M 215 228 A 5 5 0 1 1 214.9 228 Z', color: '#ffffff', strokeWidth: 1.5 },
          // Iris shading details (lines)
          { d: 'M 180 238 L 182 245', color: '#64748b', strokeWidth: 2 },
          { d: 'M 190 242 L 191 250', color: '#64748b', strokeWidth: 2 },
          { d: 'M 200 243 L 200 252', color: '#64748b', strokeWidth: 2 },
          { d: 'M 210 242 L 209 250', color: '#64748b', strokeWidth: 2 },
          { d: 'M 220 238 L 218 245', color: '#64748b', strokeWidth: 2 },
          // Thick eyebrow (Sopracciglio) above
          { d: 'M 120 120 Q 190 95 270 125 L 265 133 Q 190 105 125 130 Z', color: '#1e293b', strokeWidth: 2.5 }
        ]
      }
    ]
  },
  {
    id: 'viso-manga',
    title: 'Viso Manga Completo',
    category: 'Personaggi',
    difficulty: 'Intermedio',
    description: 'Impara a disegnare un intero viso in stile manga frontale partendo dalle forme geometriche di base, completandolo con frangetta, orecchie, occhi brillanti e arrossamento.',
    steps: [
      {
        number: 1,
        title: 'Struttura di Costruzione (Sfera e Mandibola)',
        description: 'Traccia un cerchio per la testa. Dividilo con una linea verticale per l\'asse di simmetria e traccia una linea orizzontale a metà per gli occhi. Disegna la mandibola tipica degli anime, che scende a punta.',
        svgPaths: [
          // Head circle
          { d: 'M 200 160 A 70 70 0 1 1 199.9 160 Z', color: '#3b82f6', strokeWidth: 2, isGuide: true },
          // Vertical symmetry axis
          { d: 'M 200 60 L 200 340', color: '#ef4444', strokeWidth: 1.5, isGuide: true },
          // Horizontal eye line guide
          { d: 'M 110 185 L 290 185', color: '#ef4444', strokeWidth: 1.5, isGuide: true },
          // Cheek and jaw outline (Mento manga tipico)
          { d: 'M 130 160 L 140 215 L 200 265 L 260 215 L 270 160', color: '#3b82f6', strokeWidth: 2.5, isGuide: true }
        ]
      },
      {
        number: 2,
        title: 'Occhi Espressivi, Naso e Bocca',
        description: 'Sulla linea guida traccia due archi spessi per le palpebre superiori, le ciglia, poi le palpebre inferiori e le iridi grandi ovali. Aggiungi il nasino a puntino sull\'asse e la bocca felice.',
        svgPaths: [
          // Previous guides in light gray
          { d: 'M 200 160 A 70 70 0 1 1 199.9 160 Z', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          { d: 'M 130 160 L 140 215 L 200 265 L 260 215 L 270 160', color: '#94a3b8', strokeWidth: 2 },
          
          // Left eye upper lid
          { d: 'M 142 185 C 148 168 165 168 172 185', color: '#1e293b', strokeWidth: 4.5 },
          // Right eye upper lid
          { d: 'M 228 185 C 235 168 252 168 258 185', color: '#1e293b', strokeWidth: 4.5 },
          // Eyelashes flicks
          { d: 'M 170 182 Q 176 177 178 181', color: '#1e293b', strokeWidth: 3 },
          { d: 'M 230 182 Q 224 177 222 181', color: '#1e293b', strokeWidth: 3 },
          
          // Left eye lower lid
          { d: 'M 146 198 Q 158 203 170 198', color: '#1e293b', strokeWidth: 3 },
          // Right eye lower lid
          { d: 'M 230 198 Q 242 203 254 198', color: '#1e293b', strokeWidth: 3 },
          
          // Left Iris (ovale grande)
          { d: 'M 150 186 C 146 198 152 204 158 204 C 166 204 168 198 164 186 Z', color: '#3b82f6', strokeWidth: 2.5 },
          // Right Iris
          { d: 'M 236 186 C 232 198 238 204 244 204 C 252 204 254 198 250 186 Z', color: '#3b82f6', strokeWidth: 2.5 },
          
          // Delicate small Nose
          { d: 'M 199 220 L 201 224 L 198 224', color: '#1e293b', strokeWidth: 3 },
          // Smiling mouth
          { d: 'M 184 238 Q 200 248 216 238', color: '#1e293b', strokeWidth: 3.5 },
          
          // Soft eyebrows
          { d: 'M 140 162 Q 156 154 172 164', color: '#1e293b', strokeWidth: 2.5 },
          { d: 'M 228 164 Q 244 154 260 162', color: '#1e293b', strokeWidth: 2.5 }
        ]
      },
      {
        number: 3,
        title: 'Orecchie, Collo e Capelli Anime',
        description: 'Disegna il collo snello, le orecchie ai lati degli occhi e i capelli! Crea ciocche appuntite per la frangetta tipica e le ciocche lunghe sulle spalle.',
        svgPaths: [
          // Previous facial features in softer tone
          { d: 'M 130 160 L 140 215 L 200 265 L 260 215 L 270 160', color: '#94a3b8', strokeWidth: 2 },
          { d: 'M 142 185 C 148 168 165 168 172 185 M 228 185 C 235 168 252 168 258 185', color: '#94a3b8', strokeWidth: 2.5 },
          { d: 'M 146 198 Q 158 203 170 198 M 230 198 Q 242 203 254 198', color: '#94a3b8', strokeWidth: 2 },
          { d: 'M 184 238 Q 200 248 216 238', color: '#94a3b8', strokeWidth: 2 },
          
          // Neck lines
          { d: 'M 175 250 L 175 305 M 225 250 L 225 305', color: '#1e293b', strokeWidth: 3 },
          // Left ear & Right ear
          { d: 'M 130 175 Q 118 175 125 205', color: '#1e293b', strokeWidth: 2.5 },
          { d: 'M 270 175 Q 282 175 275 205', color: '#1e293b', strokeWidth: 2.5 },
          
          // Outer hair dome outline
          { d: 'M 125 160 Q 105 85 200 75 Q 295 85 275 160', color: '#1e293b', strokeWidth: 3.5 },
          // Left shoulder hair locks
          { d: 'M 125 160 Q 110 240 135 295 Q 130 250 135 200', color: '#1e293b', strokeWidth: 3.5 },
          // Right shoulder hair locks
          { d: 'M 275 160 Q 290 240 265 295 Q 270 250 265 200', color: '#1e293b', strokeWidth: 3.5 },
          
          // Anime bangs / fringe
          // Central bangs V-shape
          { d: 'M 190 145 L 200 182 L 210 145', color: '#1e293b', strokeWidth: 3.5 },
          // Left side bang
          { d: 'M 160 148 L 174 180 L 185 146', color: '#1e293b', strokeWidth: 3.5 },
          // Right side bang
          { d: 'M 215 146 L 226 180 L 240 148', color: '#1e293b', strokeWidth: 3.5 },
          // Frame locks
          { d: 'M 132 152 L 142 192 L 150 150', color: '#1e293b', strokeWidth: 3.5 },
          { d: 'M 268 152 L 258 192 L 250 150', color: '#1e293b', strokeWidth: 3.5 }
        ]
      },
      {
        number: 4,
        title: 'Iride Dettagliata, Sfumature e Luci',
        description: 'Crea le pupille nere al centro, i riflessi della luce bianchi, ombreggia la parte superiore degli occhi. Aggiungi i trattini di arrossamento sulle guance (effetto blush) e rifinisci il colletto.',
        svgPaths: [
          // Base outlines fully darkened and solid
          { d: 'M 130 160 L 140 215 L 200 265 L 260 215 L 270 160', color: '#1e293b', strokeWidth: 2.5 }, // Face contour
          { d: 'M 175 250 L 175 305 M 225 250 L 225 305', color: '#1e293b', strokeWidth: 2.5 }, // Neck
          { d: 'M 130 175 Q 118 175 125 205 M 270 175 Q 282 175 275 205', color: '#1e293b', strokeWidth: 2 }, // Ears
          // Hair
          { d: 'M 125 160 Q 105 85 200 75 Q 295 85 275 160 M 125 160 Q 110 240 135 295 M 275 160 Q 290 240 265 295 M 190 145 L 200 182 L 210 145 M 160 148 L 174 180 L 185 146 M 215 146 L 226 180 L 240 148 M 132 152 L 142 192 L 150 150 M 268 152 L 258 192 L 250 150', color: '#1e293b', strokeWidth: 3 },
          
          // Eyebrows, snout, mouth
          { d: 'M 140 162 Q 156 154 172 164 M 228 164 Q 244 154 260 162', color: '#1e293b', strokeWidth: 2 },
          { d: 'M 199 220 L 201 224 L 198 224', color: '#1e293b', strokeWidth: 2.5 },
          { d: 'M 184 238 Q 200 248 216 238', color: '#1e293b', strokeWidth: 2.5 },
          
          // Eyelids
          { d: 'M 142 185 C 148 168 165 168 172 185 M 228 185 C 235 168 252 168 258 185', color: '#1e293b', strokeWidth: 3 },
          { d: 'M 146 198 Q 158 203 170 198 M 230 198 Q 242 203 254 198', color: '#1e293b', strokeWidth: 2 },
          
          // Iris Base circles (ovals)
          { d: 'M 150 186 C 146 198 152 204 158 204 C 166 204 168 198 164 186 Z', color: '#2563eb', strokeWidth: 2 },
          { d: 'M 236 186 C 232 198 238 204 244 204 C 252 204 254 198 250 186 Z', color: '#2563eb', strokeWidth: 2 },
          
          // Pupils (Inner solid black)
          { d: 'M 157 192 A 4.5 5.5 0 1 1 156.9 192 Z', color: '#090d16', strokeWidth: 2 },
          { d: 'M 243 192 A 4.5 5.5 0 1 1 242.9 192 Z', color: '#090d16', strokeWidth: 2 },
          
          // Upper shadow inside iris
          { d: 'M 150 186 Q 157 191 164 186', color: '#1e3a8a', strokeWidth: 2.5 },
          { d: 'M 236 186 Q 243 191 250 186', color: '#1e3a8a', strokeWidth: 2.5 },
          
          // Sparkly Highlights (white bubbles)
          { d: 'M 154 189 A 2.2 2.2 0 1 1 153.9 189 Z', color: '#ffffff', strokeWidth: 1.5 },
          { d: 'M 240 189 A 2.2 2.2 0 1 1 239.9 189 Z', color: '#ffffff', strokeWidth: 1.5 },
          { d: 'M 160 197 A 1.2 1.2 0 1 1 159.9 197 Z', color: '#ffffff', strokeWidth: 1 },
          { d: 'M 246 197 A 1.2 1.2 0 1 1 245.9 197 Z', color: '#ffffff', strokeWidth: 1 },
          
          // Blush Marks (Trattini arrossamento delle guance)
          { d: 'M 136 215 L 139 220 M 141 215 L 144 220 M 146 215 L 149 220', color: '#f43f5e', strokeWidth: 1.5 },
          { d: 'M 251 220 L 254 215 M 256 220 L 259 215 M 261 220 L 264 215', color: '#f43f5e', strokeWidth: 1.5 },
          
          // Clothes neck collar
          { d: 'M 175 290 L 155 305 M 225 290 L 245 305', color: '#64748b', strokeWidth: 2 }
        ]
      }
    ]
  },
  {
    id: 'cane-seduto',
    title: 'Cane Seduto Proporzioni',
    category: 'Animali',
    difficulty: 'Intermedio',
    description: 'Impara a strutturare l\'anatomia di un cane seduto usando lo schema delle tre sfere principali.',
    steps: [
      {
        number: 1,
        title: 'Le Tre Sfere Anatomiche',
        description: 'Disegna tre cerchi: uno per la testa, uno per il torace superiore, uno per il bacino. Uniscili con la curva della colonna vertebrale.',
        svgPaths: [
          // Head circle
          { d: 'M 200 120 A 40 40 0 1 1 199.9 120 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Chest circle
          { d: 'M 200 210 A 55 55 0 1 1 199.9 210 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Pelvis circle (Bacino)
          { d: 'M 170 300 A 45 45 0 1 1 169.9 300 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Spine curve (Colonna vertebrale)
          { d: 'M 200 120 Q 170 160 170 255', color: '#ef4444', strokeWidth: 2.5, isGuide: true },
          // Leg bone guide
          { d: 'M 170 300 Q 210 320 170 355', color: '#ef4444', strokeWidth: 2, isGuide: true },
        ]
      },
      {
        number: 2,
        title: 'Contorno di Muso, Orecchie e Zampe',
        description: 'Disegna la sporgenza del muso, le orecchie cadenti, unisci il collo al torace e disegna le zampe tese che poggiano al suolo.',
        svgPaths: [
          // Reference guides
          { d: 'M 200 120 A 40 40 0 1 1 199.9 120 Z', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          // Head, floppy ears, snout outline
          { d: 'M 175 105 Q 160 120 160 150 Q 175 160 175 140', color: '#1e293b', strokeWidth: 3.5 }, // Left Ear
          { d: 'M 225 105 Q 240 120 240 150 Q 225 160 225 140', color: '#1e293b', strokeWidth: 3.5 }, // Right Ear
          { d: 'M 172 118 L 165 140 Q 180 155 200 150 L 228 140 L 228 118', color: '#1e293b', strokeWidth: 3.5 }, // Snout / Head front
          // Neck to back curve
          { d: 'M 175 130 Q 160 180 150 250 Q 120 270 125 315 Q 135 345 160 345', color: '#1e293b', strokeWidth: 3.5 },
          // Front legs (Zampette tese)
          { d: 'M 195 210 L 195 340 L 205 345 L 205 210', color: '#1e293b', strokeWidth: 3.5 },
          { d: 'M 215 210 L 215 340 L 225 345 L 225 210', color: '#1e293b', strokeWidth: 3.5 },
          // Back leg (coscia ripiegata)
          { d: 'M 150 280 Q 195 285 190 325 Q 185 345 165 345', color: '#1e293b', strokeWidth: 3.5 }
        ]
      },
      {
        number: 3,
        title: 'Naso, Occhi Dolci e Pelliccia',
        description: 'Aggiungi i dettagli del muso: naso scuro, bocca felice, due occhi dolci ravvicinati e la coda scodinzolante.',
        svgPaths: [
          // Base contours
          { d: 'M 175 105 Q 160 120 160 150 Q 175 160 175 140', color: '#475569', strokeWidth: 2 },
          { d: 'M 225 105 Q 240 120 240 150 Q 225 160 225 140', color: '#475569', strokeWidth: 2 },
          { d: 'M 172 118 L 165 140 Q 180 155 200 150 L 228 140 L 228 118', color: '#475569', strokeWidth: 2 },
          { d: 'M 195 210 L 195 340 L 205 345 L 205 210', color: '#475569', strokeWidth: 2 },
          { d: 'M 215 210 L 215 340 L 225 345 L 225 210', color: '#475569', strokeWidth: 2 },
          { d: 'M 150 280 Q 195 285 190 325 Q 185 345 165 345', color: '#475569', strokeWidth: 2 },
          
          // Cute Nose (Truffolo)
          { d: 'M 194 140 Q 200 134 206 140 Q 206 148 200 148 Q 194 148 194 140 Z', color: '#0d1117', strokeWidth: 2 },
          // Mouth
          { d: 'M 200 148 L 200 154 Q 195 158 190 155', color: '#0d1117', strokeWidth: 2.5 },
          { d: 'M 200 154 Q 205 158 210 155', color: '#0d1117', strokeWidth: 2.5 },
          
          // Eyes
          { d: 'M 183 125 A 3.5 3.5 0 1 1 182.9 125 Z', color: '#0d1117', strokeWidth: 2.5 },
          { d: 'M 211 125 A 3.5 3.5 0 1 1 210.9 125 Z', color: '#0d1117', strokeWidth: 2.5 },
          
          // Tail (Coda felice)
          { d: 'M 125 305 Q 100 290 85 260 Q 95 250 110 275 Q 120 290 125 300', color: '#1e293b', strokeWidth: 3 },
          // Collar (Collare)
          { d: 'M 180 180 Q 200 195 220 180', color: '#f43f5e', strokeWidth: 4 },
          // Medal (Medaglietta)
          { d: 'M 200 192 A 4 4 0 1 1 199.9 192 Z', color: '#f59e0b', strokeWidth: 1.5 }
        ]
      }
    ]
  },
  {
    id: 'uccellino-ramo',
    title: 'Uccellino sul Ramo',
    category: 'Animali',
    difficulty: 'Facile',
    description: 'Impara a disegnare un piccolo passerotto rotondo aggrappato a un ramo di ciliegio.',
    steps: [
      {
        number: 1,
        title: 'Ovale Corporeo e Ramo Obliquo',
        description: 'Traccia un uovo inclinato per il corpo, un cerchio per la testa e un ramo diagonale sul quale poggia l\'uccellino.',
        svgPaths: [
          // Body Oval
          { d: 'M 210 190 A 55 65 0 1 1 209.9 190 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Head circle
          { d: 'M 175 125 A 35 35 0 1 1 174.9 125 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Beak triangle guide
          { d: 'M 140 120 L 120 128 L 140 135', color: '#ef4444', strokeWidth: 2, isGuide: true },
          // Diagonal branch line
          { d: 'M 80 280 L 320 230', color: '#10b981', strokeWidth: 2.5, isGuide: true },
        ]
      },
      {
        number: 2,
        title: 'Ala e Zampette Stringenti',
        description: 'Definisci la pancia gonfia, la coda che punta in basso, l\'ala a goccia sul fianco e gli artigli che avvolgono il legno.',
        svgPaths: [
          // Guides reference
          { d: 'M 210 190 A 55 65 0 1 1 209.9 190 Z', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          // Head & Beak contour
          { d: 'M 140 115 L 123 125 L 141 133', color: '#1e293b', strokeWidth: 3.5 },
          { d: 'M 141 133 Q 165 110 205 110 Q 235 125 245 155', color: '#1e293b', strokeWidth: 3.5 },
          // Chubby belly
          { d: 'M 140 133 Q 135 220 195 250', color: '#1e293b', strokeWidth: 3.5 },
          // Wing (Ala a goccia)
          { d: 'M 175 160 Q 225 150 235 200 Q 225 240 185 220 Z', color: '#1e293b', strokeWidth: 3.5 },
          // Tail (Coda)
          { d: 'M 245 200 L 290 230 L 275 245 L 230 220', color: '#1e293b', strokeWidth: 3.5 },
          // Branch (Vero ramo spesso)
          { d: 'M 80 285 L 320 235 L 320 225 L 80 275 Z', color: '#78350f', strokeWidth: 2.5 },
          // Claws (Zampette ad artiglio)
          { d: 'M 175 244 Q 170 258 165 264', color: '#1e293b', strokeWidth: 3 },
          { d: 'M 195 242 Q 192 256 188 262', color: '#1e293b', strokeWidth: 3 }
        ]
      },
      {
        number: 3,
        title: 'Occhio Lucido, Piume e Foglie',
        description: 'Aggiungi un occhietto tondo con punto luce, tratteggia le piume morbide e arricchisci il ramo con foglioline.',
        svgPaths: [
          // Base contour lines
          { d: 'M 140 115 L 123 125 L 141 133', color: '#475569', strokeWidth: 2 },
          { d: 'M 141 133 Q 165 110 205 110 Q 235 125 245 155', color: '#475569', strokeWidth: 2 },
          { d: 'M 140 133 Q 135 220 195 250', color: '#475569', strokeWidth: 2 },
          { d: 'M 175 160 Q 225 150 235 200 Q 225 240 185 220 Z', color: '#475569', strokeWidth: 2 },
          { d: 'M 245 200 L 290 230 L 275 245 L 230 220', color: '#475569', strokeWidth: 2 },
          { d: 'M 80 285 L 320 235 L 320 225 L 80 275 Z', color: '#78350f', strokeWidth: 2 },
          
          // Shiny black Eye
          { d: 'M 170 140 A 5 5 0 1 1 169.9 140 Z', color: '#0d1117', strokeWidth: 2.5 },
          { d: 'M 168 138 A 1.2 1.2 0 1 1 167.9 138 Z', color: '#ffffff', strokeWidth: 1 }, // Light highlight
          
          // Feather textures (Tratteggi piume)
          { d: 'M 155 170 Q 150 185 155 200', color: '#94a3b8', strokeWidth: 2 },
          { d: 'M 165 180 Q 160 195 165 210', color: '#94a3b8', strokeWidth: 2 },
          { d: 'M 195 170 Q 210 185 215 210', color: '#475569', strokeWidth: 1.5 }, // wing detail
          { d: 'M 205 180 Q 218 192 222 215', color: '#475569', strokeWidth: 1.5 },
          
          // Leaves on the branch (Foglie verdi)
          { d: 'M 110 275 Q 100 250 115 240 Q 125 255 118 273 Z', color: '#10b981', strokeWidth: 2 },
          { d: 'M 280 240 Q 300 215 295 205 Q 280 220 282 238 Z', color: '#10b981', strokeWidth: 2 }
        ]
      }
    ]
  },
  {
    id: 'paesaggio-monti',
    title: 'Lago di Montagna',
    category: 'Paesaggi',
    difficulty: 'Facile',
    description: 'Impara la composizione spaziale e la prospettiva aerea disegnando montagne rocciose riflesse su un placido lago.',
    steps: [
      {
        number: 1,
        title: 'Linea dell\'Orizzonte e Triangoli Rocciosi',
        description: 'Traccia la linea orizzontale del lago, posiziona dei grandi triangoli asimmetrici sullo sfondo per le montagne e il cerchio del sole.',
        svgPaths: [
          // Horizon line
          { d: 'M 50 250 L 350 250', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Left Mountain Triangle
          { d: 'M 60 250 L 160 100 L 230 250', color: '#ef4444', strokeWidth: 2.5, isGuide: true },
          // Right Mountain Triangle
          { d: 'M 180 250 L 260 120 L 330 250', color: '#ef4444', strokeWidth: 2.5, isGuide: true },
          // Sun circle (Sole)
          { d: 'M 250 100 A 25 25 0 1 1 249.9 100 Z', color: '#f59e0b', strokeWidth: 2, isGuide: true }
        ]
      },
      {
        number: 2,
        title: 'Scarpate Rocciose e Rive Boscase',
        description: 'Disegna le creste frastagliate delle montagne con linee spezzate e accenna a piccoli triangoli di abeti sulle sponde.',
        svgPaths: [
          // Horizon
          { d: 'M 50 250 L 350 250', color: '#64748b', strokeWidth: 2 },
          // Frastagliatura montagna sinistra
          { d: 'M 60 250 L 90 200 L 115 180 L 130 160 L 160 100 L 175 140 L 195 180 L 230 250', color: '#1e293b', strokeWidth: 3.5 },
          // Frastagliatura montagna destra
          { d: 'M 180 250 L 210 200 L 235 170 L 260 120 L 285 170 L 305 210 L 330 250', color: '#1e293b', strokeWidth: 3.5 },
          // Ridges (Creste interne per dare tridimensionalità)
          { d: 'M 160 100 L 145 160 L 155 200 L 140 250', color: '#1e293b', strokeWidth: 3 },
          { d: 'M 260 120 L 250 170 L 262 210 L 255 250', color: '#1e293b', strokeWidth: 3 },
          // Pine tree silhouettes (Spigoli boscosi di sponda)
          { d: 'M 65 250 L 70 230 L 75 250 M 72 250 L 77 225 L 82 250 M 80 250 L 85 220 L 90 250', color: '#10b981', strokeWidth: 2.5 },
          { d: 'M 300 250 L 305 225 L 310 250 M 312 250 L 317 215 L 322 250', color: '#10b981', strokeWidth: 2.5 }
        ]
      },
      {
        number: 3,
        title: 'Ombre Rocciose, Riflessi e Onde',
        description: 'Applica un tratteggio diagonale sui versanti all\'ombra per dare luce tridimensionale, e traccia linee orizzontali e tremolanti nel lago per l\'acqua.',
        svgPaths: [
          // Base contours
          { d: 'M 50 250 L 350 250', color: '#475569', strokeWidth: 2 },
          { d: 'M 60 250 L 90 200 L 115 180 L 130 160 L 160 100 L 175 140 L 195 180 L 230 250', color: '#475569', strokeWidth: 2 },
          { d: 'M 180 250 L 210 200 L 235 170 L 260 120 L 285 170 L 305 210 L 330 250', color: '#475569', strokeWidth: 2 },
          { d: 'M 160 100 L 145 160 L 155 200 L 140 250', color: '#475569', strokeWidth: 2.5 },
          { d: 'M 260 120 L 250 170 L 262 210 L 255 250', color: '#475569', strokeWidth: 2.5 },

          // Mountain shadow lines (Tratteggi destra delle creste)
          { d: 'M 160 115 L 175 115 M 157 130 L 178 130 M 154 150 L 180 150 M 150 170 L 188 170 M 153 190 L 195 190 M 148 210 L 202 210', color: '#94a3b8', strokeWidth: 1.5 },
          { d: 'M 259 135 L 270 135 M 256 155 L 278 155 M 254 175 L 288 175 M 258 200 L 298 200 M 256 225 L 312 225', color: '#94a3b8', strokeWidth: 1.5 },

          // Sun rising
          { d: 'M 250 100 A 25 25 0 0 1 274.5 95 Z', color: '#f59e0b', strokeWidth: 2 },

          // Water ripple lines (Increspature riflesse)
          { d: 'M 120 260 L 180 260', color: '#38bdf8', strokeWidth: 2 },
          { d: 'M 220 263 L 300 263', color: '#38bdf8', strokeWidth: 2 },
          { d: 'M 80 275 L 150 275', color: '#38bdf8', strokeWidth: 2 },
          { d: 'M 180 280 L 270 280', color: '#38bdf8', strokeWidth: 2 },
          { d: 'M 110 295 L 210 295', color: '#38bdf8', strokeWidth: 2.5 },
          { d: 'M 150 315 L 250 315', color: '#0284c7', strokeWidth: 2.5 },
          { d: 'M 180 330 L 220 330', color: '#0284c7', strokeWidth: 2.5 },
          
          // Pine tree final contours
          { d: 'M 65 250 L 70 230 L 75 250 M 72 250 L 77 225 L 82 250 M 80 250 L 85 220 L 90 250', color: '#065f46', strokeWidth: 2 },
          { d: 'M 300 250 L 305 225 L 310 250 M 312 250 L 317 215 L 322 250', color: '#065f46', strokeWidth: 2 }
        ]
      }
    ]
  },
  {
    id: 'paesaggio-faro',
    title: 'Faro sulla Scogliera',
    category: 'Paesaggi',
    difficulty: 'Intermedio',
    description: 'Impara l\'equilibrio dei pesi visivi e la composizione marina disegnando un maestoso faro arroccato.',
    steps: [
      {
        number: 1,
        title: 'Scogliera a Blocchi e Torre Cilindrica',
        description: 'Traccia una linea orizzontale per il mare calmo. Rappresenta la scogliera con blocchi squadrati e innalza un cilindro dritto per il faro.',
        svgPaths: [
          // Sea level (Mare)
          { d: 'M 50 280 L 350 280', color: '#3b82f6', strokeWidth: 2.5, isGuide: true },
          // Cliff guideline (Scogliera squadrata)
          { d: 'M 50 280 L 160 280 L 160 180 L 110 180 L 50 280', color: '#10b981', strokeWidth: 2.5, isGuide: true },
          // Lighthouse body guideline
          { d: 'M 115 180 L 115 70 L 145 70 L 145 180 Z', color: '#ef4444', strokeWidth: 2.5, isGuide: true },
        ]
      },
      {
        number: 2,
        title: 'Lanterna, Cupola e Rocce Frastagliate',
        description: 'Aggiungi la cupola della lanterna, i dettagli del cornicione, la balaustra e spezza la rigidità della scogliera con linee spigolose.',
        svgPaths: [
          // Sea line
          { d: 'M 50 280 L 350 280', color: '#475569', strokeWidth: 2 },
          // Jagged Cliff rocks
          { d: 'M 50 280 L 72 260 L 95 240 L 112 200 L 105 180 L 155 180 L 160 220 L 150 250 L 165 280 Z', color: '#1e293b', strokeWidth: 3.5 },
          // Lighthouse masonry walls
          { d: 'M 116 180 L 119 75 L 141 75 L 144 180 Z', color: '#1e293b', strokeWidth: 3.5 },
          // Lantern Balcony & Dome top
          { d: 'M 114 75 L 146 75', color: '#1e293b', strokeWidth: 4 }, // platform
          { d: 'M 118 75 L 118 60 L 142 60 L 142 75 Z', color: '#1e293b', strokeWidth: 2.5 }, // glass room
          { d: 'M 116 60 Q 130 45 144 60 Z', color: '#1e293b', strokeWidth: 3.5 }, // roof dome
          { d: 'M 130 45 L 130 38', color: '#1e293b', strokeWidth: 2.5 }, // spire tip
        ]
      },
      {
        number: 3,
        title: 'Fasci di Luce, Onde e Mattoni',
        description: 'Traccia due lunghe linee oblique che proiettano la luce dal faro, aggiungi increspature spumose tra le onde e la texture dei mattoni.',
        svgPaths: [
          // Base drawings
          { d: 'M 50 280 L 350 280', color: '#475569', strokeWidth: 2 },
          { d: 'M 50 280 L 72 260 L 95 240 L 112 200 L 105 180 L 155 180 L 160 220 L 150 250 L 165 280 Z', color: '#475569', strokeWidth: 2.5 },
          { d: 'M 116 180 L 119 75 L 141 75 L 144 180 Z', color: '#475569', strokeWidth: 2.5 },
          { d: 'M 114 75 L 146 75', color: '#475569', strokeWidth: 2.5 },
          { d: 'M 118 75 L 118 60 L 142 60 L 142 75 Z', color: '#475569', strokeWidth: 2 },
          { d: 'M 116 60 Q 130 45 144 60 Z', color: '#475569', strokeWidth: 2.5 },

          // Light beams (Fasci di luce magici)
          { d: 'M 118 68 L -10 90 M 118 68 L -10 130', color: '#eab308', strokeWidth: 2 },
          { d: 'M 142 68 L 410 90 M 142 68 L 410 130', color: '#eab308', strokeWidth: 2 },

          // Waves hitting cliff (Onde e spuma)
          { d: 'M 165 280 Q 175 272 185 280 Q 195 288 205 280', color: '#0284c7', strokeWidth: 2.5 },
          { d: 'M 62 265 Q 52 260 48 268 Q 55 275 62 265', color: '#0284c7', strokeWidth: 2 },
          { d: 'M 210 285 L 350 285 M 230 295 L 320 295', color: '#0284c7', strokeWidth: 2.5 },

          // Lighthouse detail lines (stripe, door, window)
          { d: 'M 118 115 L 142 115 M 118 150 L 142 150', color: '#475569', strokeWidth: 2 }, // stripes
          { d: 'M 125 170 L 125 180 L 135 180 L 135 170 Z', color: '#0d1117', strokeWidth: 2 }, // door
          { d: 'M 128 95 A 2 2 0 1 1 127.9 95 Z', color: '#0d1117', strokeWidth: 2.5 }, // window
          
          // Brick texture on cliff
          { d: 'M 75 255 L 85 255 M 125 210 L 135 210 M 140 240 L 150 240', color: '#94a3b8', strokeWidth: 1.5 }
        ]
      }
    ]
  },
  {
    id: 'auto-sportiva',
    title: 'Auto Sportiva Cartoon',
    category: 'Fumetti',
    difficulty: 'Facile',
    description: 'Impara a combinare forme geometriche e curve aerodinamiche per creare una bellissima macchina sportiva in stile fumetto.',
    steps: [
      {
        number: 1,
        title: 'Le Ruote e l\'Asse Principale',
        description: 'Traccia la linea orizzontale di terra e due cerchi simmetrici per le ruote anteriori e posteriori.',
        svgPaths: [
          // Horizon road line
          { d: 'M 50 260 L 350 260', color: '#cbd5e1', strokeWidth: 2, isGuide: true },
          // Front Wheel
          { d: 'M 130 260 A 25 25 0 1 1 129.9 260 Z', color: '#ef4444', strokeWidth: 3, isGuide: true },
          // Rear Wheel
          { d: 'M 270 260 A 25 25 0 1 1 269.9 260 Z', color: '#ef4444', strokeWidth: 3, isGuide: true }
        ]
      },
      {
        number: 2,
        title: 'I Passaruota e il Profilo Carrozzeria',
        description: 'Disegna i passaruota arcuati sopra le ruote e unisci l\'anteriore ribassato al tettuccio arcuato della cabina.',
        svgPaths: [
          // Road line
          { d: 'M 50 260 L 350 260', color: '#cbd5e1', strokeWidth: 1.5 },
          // Wheel arcs & Bottom chassis
          { d: 'M 80 250 L 105 250 A 28 28 0 0 1 155 250 L 245 250 A 28 28 0 0 1 295 250 L 320 250', color: '#1e293b', strokeWidth: 3.5 },
          // Front hood and bumper
          { d: 'M 80 250 Q 75 220 110 215 Q 130 215 150 205', color: '#1e293b', strokeWidth: 3.5 },
          // Cabin windshield & roof
          { d: 'M 150 205 Q 185 145 220 145 L 250 145 Q 285 165 295 210 L 320 215 L 320 250', color: '#1e293b', strokeWidth: 3.5 }
        ]
      },
      {
        number: 3,
        title: 'Fari, Spoiler, Cerchioni e Colore',
        description: 'Completa l\'auto con un alettone posteriore da corsa, i vetri dei finestrini, il faro luminoso e i cerchioni delle ruote.',
        svgPaths: [
          // Base vehicle shape
          { d: 'M 80 250 L 105 250 A 28 28 0 0 1 155 250 L 245 250 A 28 28 0 0 1 295 250 L 320 250', color: '#475569', strokeWidth: 2 },
          { d: 'M 80 250 Q 75 220 110 215 Q 130 215 150 205', color: '#475569', strokeWidth: 2 },
          { d: 'M 150 205 Q 185 145 220 145 L 250 145 Q 285 165 295 210 L 320 215 L 320 250', color: '#475569', strokeWidth: 2 },
          
          // Racing spoiler
          { d: 'M 295 185 L 330 178 L 335 192 L 300 198 Z', color: '#3b82f6', strokeWidth: 2.5 },
          // Windows
          { d: 'M 175 198 L 210 155 L 245 155 L 265 198 Z', color: '#38bdf8', strokeWidth: 2 },
          { d: 'M 218 155 L 222 198', color: '#475569', strokeWidth: 1.5 }, // divider
          
          // Headlight
          { d: 'M 82 225 Q 95 225 95 235 Z', color: '#f59e0b', strokeWidth: 2 },
          
          // Wheel outer tires & inner rims
          { d: 'M 130 260 A 24 24 0 1 1 129.9 260 Z', color: '#1e293b', strokeWidth: 5 },
          { d: 'M 130 260 A 10 10 0 1 1 129.9 260 Z', color: '#94a3b8', strokeWidth: 2 },
          
          { d: 'M 270 260 A 24 24 0 1 1 269.9 260 Z', color: '#1e293b', strokeWidth: 5 },
          { d: 'M 270 260 A 10 10 0 1 1 269.9 260 Z', color: '#94a3b8', strokeWidth: 2 },
          
          // Exhaust smoke puff
          { d: 'M 335 242 Q 345 235 352 245 Q 340 255 330 248', color: '#cbd5e1', strokeWidth: 1.5 }
        ]
      }
    ]
  },
  {
    id: 'chibi-astronauta',
    title: 'Chibi Astronauta',
    category: 'Personaggi',
    difficulty: 'Facile',
    description: 'Impara a disegnare un simpatico piccolo astronauta fluttuante nello spazio, ideale per apprendere le proporzioni "Chibi" (testa grande).',
    steps: [
      {
        number: 1,
        title: 'Il Casco Sferico e lo Zaino',
        description: 'Disegna una grande sfera per il casco dell\'astronauta e un rettangolo dai bordi arrotondati sulla sinistra per il serbatoio dell\'ossigeno.',
        svgPaths: [
          // Helmet outline guide
          { d: 'M 200 180 A 60 60 0 1 1 199.9 180 Z', color: '#ef4444', strokeWidth: 3, isGuide: true },
          // Backpack guide
          { d: 'M 115 150 L 115 230 A 10 10 0 0 0 125 240 L 135 240 L 135 140 L 125 140 A 10 10 0 0 0 115 150 Z', color: '#3b82f6', strokeWidth: 2.5, isGuide: true }
        ]
      },
      {
        number: 2,
        title: 'La Visiera e il Corpo Piccolo',
        description: 'Aggiungi una grande visiera ovale al centro del casco e delinea il corpo compatto con le manine rivolte all\'insù.',
        svgPaths: [
          // Helmet & Backpack
          { d: 'M 200 180 A 58 58 0 1 1 199.9 180 Z', color: '#1e293b', strokeWidth: 3.5 },
          { d: 'M 135 140 L 125 140 A 10 10 0 0 0 115 150 L 115 230 A 10 10 0 0 0 125 240 L 135 240', color: '#1e293b', strokeWidth: 3 },
          
          // Giant Visor
          { d: 'M 200 180 A 42 32 0 1 1 199.9 180 Z', color: '#8b5cf6', strokeWidth: 3 },
          
          // Chubby Body
          { d: 'M 165 235 L 160 275 L 185 275 L 195 255 L 210 255 L 220 275 L 245 275 L 235 235 Z', color: '#1e293b', strokeWidth: 3.5 },
          
          // Little wave-hand
          { d: 'M 150 230 Q 135 210 145 200 Q 155 205 160 225', color: '#1e293b', strokeWidth: 3 }
        ]
      },
      {
        number: 3,
        title: 'I Riflessi Visiera e le Stelle Cosmiche',
        description: 'Aggiungi strisce di luce bianca sulla visiera per simulare il riflesso del vetro e disegna stelline intorno per l\'atmosfera spaziale.',
        svgPaths: [
          // Base body & helmet
          { d: 'M 200 180 A 58 58 0 1 1 199.9 180 Z', color: '#475569', strokeWidth: 2 },
          { d: 'M 135 140 L 125 140 A 10 10 0 0 0 115 150 L 115 230 A 10 10 0 0 0 125 240 L 135 240', color: '#475569', strokeWidth: 2 },
          { d: 'M 200 180 A 42 32 0 1 1 199.9 180 Z', color: '#8b5cf6', strokeWidth: 2.5 },
          { d: 'M 165 235 L 160 275 L 185 275 L 195 255 L 210 255 L 220 275 L 245 275 L 235 235 Z', color: '#475569', strokeWidth: 2.5 },
          { d: 'M 150 230 Q 135 210 145 200 Q 155 205 160 225', color: '#475569', strokeWidth: 2.5 },
          
          // Visor Glass Highlights (Riflessi brillanti)
          { d: 'M 175 170 Q 200 155 225 165', color: '#ffffff', strokeWidth: 3 },
          { d: 'M 180 180 Q 200 170 215 175', color: '#ffffff', strokeWidth: 1.5 },
          
          // Chest control panel (Dettaglio tuta)
          { d: 'M 185 242 L 215 242', color: '#ef4444', strokeWidth: 2.5 },
          
          // Floating stars (Stelle sfavillanti dello spazio)
          { d: 'M 85 100 L 90 105 L 85 110 L 80 105 Z', color: '#f59e0b', strokeWidth: 1.5 },
          { d: 'M 320 120 L 325 125 L 320 130 L 315 125 Z', color: '#f59e0b', strokeWidth: 1.5 },
          { d: 'M 300 280 L 303 283 L 300 286 L 297 283 Z', color: '#38bdf8', strokeWidth: 1 }
        ]
      }
    ]
  },
  {
    id: 'drago-semplice',
    title: 'Drago Semplice',
    category: 'Animali',
    difficulty: 'Intermedio',
    description: 'Impara a disegnare un maestoso e simpatico draghetto partendo dalla sinuosa linea della colonna vertebrale.',
    steps: [
      {
        number: 1,
        title: 'Linea d\'Azione e Ovale Testa',
        description: 'Traccia la linea sinuosa a "S" della schiena e della coda del draghetto, sormontata da un uovo rotondo per la testa.',
        svgPaths: [
          // Head circle guide
          { d: 'M 160 110 A 30 30 0 1 1 159.9 110 Z', color: '#ef4444', strokeWidth: 2.5, isGuide: true },
          // Spine sinuous S-curve
          { d: 'M 160 140 Q 220 180 190 240 Q 150 310 270 290', color: '#3b82f6', strokeWidth: 2.5, isGuide: true }
        ]
      },
      {
        number: 2,
        title: 'Muso, Corpo e Ali a Pipistrello',
        description: 'Disegna un muso arrotondato, la pancia rotonda da draghetto e la struttura alare sul dorso.',
        svgPaths: [
          // Spine and head base lines
          { d: 'M 160 110 A 28 28 0 1 1 159.9 110 Z', color: '#cbd5e1', strokeWidth: 1.5 },
          
          // Nose and jaws
          { d: 'M 132 105 Q 110 110 120 125 L 144 125', color: '#1e293b', strokeWidth: 3.5 },
          
          // Fat body
          { d: 'M 148 135 Q 130 220 170 260 Q 200 270 230 250', color: '#1e293b', strokeWidth: 3.5 },
          // Sinuous Tail
          { d: 'M 230 250 Q 160 310 270 290 L 265 275 Q 190 280 220 240', color: '#1e293b', strokeWidth: 3 },
          
          // Bat Wing
          { d: 'M 190 160 L 240 125 L 265 145 Q 235 165 200 170 Z', color: '#1e293b', strokeWidth: 3.5 }
        ]
      },
      {
        number: 3,
        title: 'Spine, Occhi, Squame e Fuoco',
        description: 'Delinea le spine difensive triangolari sul dorso, aggiungi l\'occhio felice e una spettacolare vampata di fuoco.',
        svgPaths: [
          // Main Body structure
          { d: 'M 132 105 Q 110 110 120 125 L 144 125', color: '#475569', strokeWidth: 2 },
          { d: 'M 148 135 Q 130 220 170 260 Q 200 270 230 250', color: '#475569', strokeWidth: 2 },
          { d: 'M 230 250 Q 160 310 270 290 L 265 275 Q 190 280 220 240', color: '#475569', strokeWidth: 2 },
          { d: 'M 190 160 L 240 125 L 265 145 Q 235 165 200 170 Z', color: '#475569', strokeWidth: 2 },
          
          // Happy closed Eye
          { d: 'M 145 110 Q 150 105 155 112', color: '#0d1117', strokeWidth: 3 },
          
          // Back Spikes (Spine dorsali arancioni)
          { d: 'M 172 138 L 180 130 L 183 145', color: '#f97316', strokeWidth: 2.5 },
          { d: 'M 188 165 L 198 155 L 197 172', color: '#f97316', strokeWidth: 2.5 },
          { d: 'M 203 210 L 213 200 L 210 220', color: '#f97316', strokeWidth: 2.5 },
          
          // Flame Breath (Vampata di fuoco calda)
          { d: 'M 115 118 Q 80 110 65 125 Q 85 140 115 125', color: '#ef4444', strokeWidth: 2.5 },
          { d: 'M 100 122 Q 85 118 78 126 Q 88 131 100 124', color: '#eab308', strokeWidth: 2 }, // inner core
          
          // Belly lines (Pieghe pancia)
          { d: 'M 144 185 Q 155 190 164 198 M 147 210 Q 158 215 168 225', color: '#94a3b8', strokeWidth: 1.5 }
        ]
      }
    ]
  },
  {
    id: 'anatomia-occhio',
    title: 'Anatomia dell\'Occhio',
    category: 'Accademia',
    difficulty: 'Avanzato',
    description: 'Studio anatomico dell\'occhio umano: impara a tracciare la sclera, l\'iride circolare con riflessi e la linea delle ciglia.',
    steps: [
      {
        number: 1,
        title: 'Geometria dell\'Iride e Assi d\'Inclinazione',
        description: 'Traccia la grande sfera orbitale di guida, l\'asse orizzontale inclinato dell\'occhio e il cerchio perfetto centrale dell\'iride.',
        svgPaths: [
          // Sfera orbitale di costruzione
          { d: 'M 110 187 A 90 90 0 1 1 290 187 A 90 90 0 1 1 110 187 Z', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          // Asse orizzontale inclinato (angolo cantale)
          { d: 'M 60 187 L 340 187', color: '#3b82f6', strokeWidth: 2, isGuide: true },
          // Cerchio dell\'iride perfetto
          { d: 'M 165 187 A 35 35 0 1 1 235 187 A 35 35 0 1 1 165 187 Z', color: '#ef4444', strokeWidth: 2.5, isGuide: true }
        ]
      },
      {
        number: 2,
        title: 'Contorno Palpebre e Condotto Lacrimale',
        description: 'Delinea l\'arco superiore della palpebra che copre parzialmente l\'iride, il condotto lacrimale a sinistra e la piega palpebrale sovrastante.',
        svgPaths: [
          // Precedenti guide in chiaro
          { d: 'M 165 187 A 35 35 0 1 1 235 187 A 35 35 0 1 1 165 187 Z', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          // Palpebra superiore arcuata
          { d: 'M 90 200 Q 140 135 200 135 Q 260 135 310 200', color: '#1e293b', strokeWidth: 3.5 },
          // Palpebra inferiore e sacco lacrimale
          { d: 'M 90 200 Q 80 202 95 208 Q 140 240 200 240 Q 260 240 310 200', color: '#1e293b', strokeWidth: 3.5 },
          // Piega cutanea superiore (crease)
          { d: 'M 110 135 Q 200 115 290 135', color: '#475569', strokeWidth: 2 }
        ]
      },
      {
        number: 3,
        title: 'Iride Realistica, Pupilla e Punti Luce',
        description: 'Traccia la pupilla nera al centro, lascia un triangolo di riflesso bianco e ombreggia la corona dell\'iride con tratti radiali fini.',
        svgPaths: [
          // Contorni principali
          { d: 'M 90 200 Q 140 135 200 135 Q 260 135 310 200', color: '#475569', strokeWidth: 2 },
          { d: 'M 90 200 Q 80 202 95 208 Q 140 240 200 240 Q 260 240 310 200', color: '#475569', strokeWidth: 2 },
          { d: 'M 110 135 Q 200 115 290 135', color: '#64748b', strokeWidth: 1.5 },
          
          // Iride contorno
          { d: 'M 165 187 A 35 35 0 1 1 235 187 A 35 35 0 1 1 165 187 Z', color: '#1e293b', strokeWidth: 3 },
          // Pupilla interna
          { d: 'M 186 187 A 14 14 0 1 1 214 187 A 14 14 0 1 1 186 187 Z', color: '#0f172a', strokeWidth: 1.5 },
          
          // Riflesso di luce speculare (bianco vivido)
          { d: 'M 188 175 L 202 171 L 200 185 Z', color: '#10b981', strokeWidth: 2, isGuide: true }, // Highlight outline guide
          { d: 'M 190 177 Q 202 169 195 182 Z', color: '#0284c7', strokeWidth: 1.5 },
          
          // Linee radiali dell\'iride (sfumature professionali)
          { d: 'M 175 177 L 185 180 M 225 177 L 215 180 M 200 157 L 200 167 M 200 217 L 200 207', color: '#64748b', strokeWidth: 1.5 },
          { d: 'M 180 202 L 188 197 M 220 202 L 212 197 M 180 167 L 189 174 M 220 167 L 211 174', color: '#64748b', strokeWidth: 1.5 },
          
          // Sotto-palpebra inferiore ombra
          { d: 'M 115 207 Q 200 212 285 207', color: '#cbd5e1', strokeWidth: 1 }
        ]
      }
    ]
  },
  {
    id: 'prospettiva-stanza',
    title: 'Camera in Prospettiva',
    category: 'Architettura',
    difficulty: 'Intermedio',
    description: 'Impara la prospettiva con 1 punto di fuga centrale: traccia le ortogonali e costruisci le pareti tridimensionali di una stanza.',
    steps: [
      {
        number: 1,
        title: 'Linea d\'Orizzonte e Punto di Fuga',
        description: 'Definisci la linea dell\'orizzonte a metà foglio e posiziona il Punto di Fuga (PF) centrale da cui partiranno tutte le linee di profondità.',
        svgPaths: [
          // Linea d\'orizzonte
          { d: 'M 40 200 L 360 200', color: '#94a3b8', strokeWidth: 1.5, isGuide: true },
          // Punto di fuga centrale (croce)
          { d: 'M 200 190 L 200 210 M 190 200 L 210 200', color: '#ef4444', strokeWidth: 2, isGuide: true },
          // Diagonali principali verso i quattro angoli (linee ortogonali)
          { d: 'M 200 200 L 40 50 M 200 200 L 360 50 M 200 200 L 40 350 M 200 200 L 360 350', color: '#3b82f6', strokeWidth: 2, isGuide: true }
        ]
      },
      {
        number: 2,
        title: 'Le Pareti e la Porta in Prospettiva',
        description: 'Disegna la parete di fondo rettangolare e proietta le linee verticali di una porta sulla sinistra, collegate al punto di fuga.',
        svgPaths: [
          // Parete di fondo
          { d: 'M 120 120 L 280 120 L 280 280 L 120 280 Z', color: '#1e293b', strokeWidth: 3 },
          // Angoli stanza esterni
          { d: 'M 120 120 L 40 40 M 280 120 L 360 40 M 280 280 L 360 360 M 120 280 L 40 360', color: '#1e293b', strokeWidth: 3 },
          
          // Porta sinistra in prospettiva (montanti verticali e trave ortogonale)
          { d: 'M 65 330 L 65 170', color: '#475569', strokeWidth: 2.5 },
          { d: 'M 95 295 L 95 190', color: '#475569', strokeWidth: 2.5 },
          // La linea superiore si allinea al punto di fuga (da (65,170) a (95,190))
          { d: 'M 65 170 L 95 190', color: '#1e293b', strokeWidth: 3 }
        ]
      },
      {
        number: 3,
        title: 'Finestra, Pavimento e Scena Completa',
        description: 'Aggiungi una finestra prospettica a destra e traccia le fughe del pavimento per dare una straordinaria percezione dello spazio.',
        svgPaths: [
          // Stanza base
          { d: 'M 120 120 L 280 120 L 280 280 L 120 280 Z', color: '#475569', strokeWidth: 2 },
          { d: 'M 120 120 L 40 40 M 280 120 L 360 40 M 280 280 L 360 360 M 120 280 L 40 360', color: '#475569', strokeWidth: 2 },
          { d: 'M 65 330 L 65 170 L 95 190 L 95 295', color: '#475569', strokeWidth: 2 },
          
          // Finestra destra in prospettiva
          { d: 'M 300 190 L 335 170 L 335 270 L 300 245 Z', color: '#38bdf8', strokeWidth: 2.5 },
          { d: 'M 317 180 L 317 258', color: '#475569', strokeWidth: 1.5 }, // asse finestra
          
          // Linee pavimento (convergono tutte verso il centro)
          { d: 'M 200 280 L 200 360', color: '#94a3b8', strokeWidth: 1.5 },
          { d: 'M 160 280 L 120 360', color: '#94a3b8', strokeWidth: 1.5 },
          { d: 'M 240 280 L 280 360', color: '#94a3b8', strokeWidth: 1.5 },
          
          // Linee orizzontali del pavimento per creare la piastrellatura (più vicine man mano che si allontanano)
          { d: 'M 80 320 L 320 320', color: '#cbd5e1', strokeWidth: 1.2 },
          { d: 'M 100 300 L 300 300', color: '#cbd5e1', strokeWidth: 1 },
          { d: 'M 112 288 L 288 288', color: '#cbd5e1', strokeWidth: 0.8 }
        ]
      }
    ]
  },
  {
    id: 'proporzioni-viso',
    title: 'Proporzioni del Volto',
    category: 'Accademia',
    difficulty: 'Intermedio',
    description: 'Il metodo classico per disegnare il volto umano visto di fronte, bilanciando la distanza tra occhi, naso e mento.',
    steps: [
      {
        number: 1,
        title: 'La Forma a Uovo e gli Assi dei Terzi',
        description: 'Disegna la forma ad uovo del cranio (più larga in alto e stretta in basso) ed evidenzia gli assi orizzontali di naso e occhi.',
        svgPaths: [
          // Uovo principale (testa di fronte)
          { d: 'M 200 90 C 130 90 120 220 145 290 C 165 330 180 340 200 340 C 220 340 235 330 255 290 C 280 220 270 90 200 90 Z', color: '#ef4444', strokeWidth: 2.5, isGuide: true },
          // Asse verticale centrale di simmetria
          { d: 'M 200 70 L 200 360', color: '#cbd5e1', strokeWidth: 1.5, isGuide: true },
          // Linea degli occhi (esattamente a metà altezza)
          { d: 'M 110 215 L 290 215', color: '#3b82f6', strokeWidth: 1.5, isGuide: true },
          // Linea del naso (alla base del cerchio ideale)
          { d: 'M 130 265 L 270 265', color: '#3b82f6', strokeWidth: 1.5, isGuide: true }
        ]
      },
      {
        number: 2,
        title: 'Posizionamento Occhi, Sopracciglia e Naso',
        description: 'Traccia i contorni di due occhi simmetrici distanziati di una lunghezza occhio tra di loro, e delinea la base del naso.',
        svgPaths: [
          // Testa base
          { d: 'M 200 90 C 130 90 120 220 145 290 C 165 330 180 340 200 340 C 220 340 235 330 255 290 C 280 220 270 90 200 90 Z', color: '#475569', strokeWidth: 2 },
          
          // Occhio sinistro
          { d: 'M 155 215 Q 167 205 180 215 Q 167 222 155 215 Z', color: '#1e293b', strokeWidth: 2.5 },
          // Occhio destro
          { d: 'M 220 215 Q 233 205 245 215 Q 233 222 220 215 Z', color: '#1e293b', strokeWidth: 2.5 },
          
          // Sopracciglia
          { d: 'M 150 200 Q 167 192 182 202', color: '#1e293b', strokeWidth: 3 },
          { d: 'M 250 200 Q 233 192 218 202', color: '#1e293b', strokeWidth: 3 },
          
          // Base del naso (arco centrale e alette laterali)
          { d: 'M 190 262 Q 200 268 210 262', color: '#1e293b', strokeWidth: 2.5 },
          { d: 'M 186 258 Q 188 262 191 262 M 214 258 Q 212 262 209 262', color: '#1e293b', strokeWidth: 2 }
        ]
      },
      {
        number: 3,
        title: 'Bocca, Orecchie e Linea dei Capelli',
        description: 'Disegna la fessura labiale inferiore (che si allinea verticalmente alle pupille), le orecchie ai lati e le masse dei capelli.',
        svgPaths: [
          // Struttura viso precedente
          { d: 'M 200 90 C 130 90 120 220 145 290 C 165 330 180 340 200 340 C 220 340 235 330 255 290 C 280 220 270 90 200 90 Z', color: '#475569', strokeWidth: 1.5 },
          { d: 'M 155 215 Q 167 205 180 215 Q 167 222 155 215 Z', color: '#475569', strokeWidth: 2 },
          { d: 'M 220 215 Q 233 205 245 215 Q 233 222 220 215 Z', color: '#475569', strokeWidth: 2 },
          { d: 'M 150 200 Q 167 192 182 202', color: '#475569', strokeWidth: 2 },
          { d: 'M 250 200 Q 233 192 218 202', color: '#475569', strokeWidth: 2 },
          { d: 'M 190 262 Q 200 268 210 262', color: '#475569', strokeWidth: 2 },
          
          // Bocca (linea d\'unione delle labbra, arco di cupido)
          { d: 'M 180 295 Q 200 291 220 295', color: '#1e293b', strokeWidth: 3 },
          { d: 'M 185 295 Q 200 304 215 295', color: '#475569', strokeWidth: 1.5 }, // labbro inferiore
          
          // Orecchie (si estendono tra gli occhi e il naso)
          { d: 'M 132 200 Q 120 225 137 255', color: '#475569', strokeWidth: 2 },
          { d: 'M 268 200 Q 280 225 263 255', color: '#475569', strokeWidth: 2 },
          
          // Attaccatura dei capelli (Hairline superiore)
          { d: 'M 142 140 Q 200 155 258 140', color: '#475569', strokeWidth: 2.5 },
          
          // Iride e pupilla stilizzata
          { d: 'M 164 214 A 3 3 0 1 1 163.9 214 Z', color: '#1e293b', strokeWidth: 1.5 },
          { d: 'M 229 214 A 3 3 0 1 1 228.9 214 Z', color: '#1e293b', strokeWidth: 1.5 }
        ]
      }
    ]
  }
];
