import React from "react";

interface Props {
  id: string;
  color?: string;
}

export default function GlassesRenderer({ id }: Props) {
  // Let's render a custom, high-fidelity SVG for each individual product ID
  // to ensure they match the gorgeous designs shown in the user's uploaded mockups.
  
  switch (id) {
    // -------------------------------------------------------------------------
    // 1. TRADITIONAL CRAFT (전통공예)
    // -------------------------------------------------------------------------
    case "craft-1": // 청화 리본 01 RD
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle frame drop shadow inside SVG */}
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          
          {/* Base Rim Outline (Chunghwa Red Acetate Frame) */}
          <path d="M40 70 C70 40, 120 40, 138 70 L146 70 C164 40, 214 40, 244 70 C258 84, 252 110, 230 110 C210 110, 192 90, 182 78 C174 84, 146 84, 138 78 C128 90, 110 110, 90 110 C68 110, 62 84, 40 70 Z" fill="#b9161d" />
          
          {/* Inner metallic wire rim */}
          <path d="M44 73 C71 45, 118 45, 134 72 L148 72 C164 45, 211 45, 238 73" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          
          {/* Dark Lenses with blue/black gradient */}
          <defs>
            <linearGradient id="lens-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a2536" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0a0d14" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="reflection-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.35" />
              <stop offset="30%" stopColor="white" stopOpacity="0.05" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Left Lens */}
          <path d="M48 75 C70 52, 115 52, 130 75 C122 83, 112 98, 90 98 C68 98, 58 83, 48 75 Z" fill="url(#lens-blue)" />
          <path d="M48 75 C70 52, 115 52, 130 75 Z" fill="url(#reflection-grad)" />
          
          {/* Right Lens */}
          <path d="M152 75 C167 52, 212 52, 234 75 C224 83, 214 98, 192 98 C170 98, 160 83, 152 75 Z" fill="url(#lens-blue)" />
          <path d="M152 75 C167 52, 212 52, 234 75 Z" fill="url(#reflection-grad)" />
          
          {/* Elegant traditional silver/white ornament band (Chunghwa pattern) */}
          <rect x="100" y="52" width="120" height="4" rx="2" fill="rgba(255,255,255,0.75)" />
          {/* Grid patterning inside the strip */}
          <line x1="110" y1="52" x2="114" y2="56" stroke="#b9161d" strokeWidth="1" />
          <line x1="130" y1="52" x2="134" y2="56" stroke="#b9161d" strokeWidth="1" />
          <line x1="150" y1="52" x2="154" y2="56" stroke="#b9161d" strokeWidth="1" />
          <line x1="170" y1="52" x2="174" y2="56" stroke="#b9161d" strokeWidth="1" />
          <line x1="190" y1="52" x2="194" y2="56" stroke="#b9161d" strokeWidth="1" />
          <line x1="210" y1="52" x2="214" y2="56" stroke="#b9161d" strokeWidth="1" />
          
          {/* Temples hinting at the background */}
          <path d="M42 70 L15 65 C12 64, 12 60, 15 60 L40 65 Z" fill="#b9161d" opacity="0.8" />
          <path d="M242 70 L269 65 C272 64, 272 60, 269 60 L244 65 Z" fill="#b9161d" opacity="0.8" />
        </svg>
      );
      
    case "craft-2": // 나전 윙 02 NV
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          
          {/* Deep Navy/Black Frame */}
          <path d="M40 70 C70 42, 120 42, 138 70 L146 70 C164 42, 214 42, 244 70 C258 84, 252 110, 230 110 C210 110, 192 90, 182 78 C174 84, 146 84, 138 78 C128 90, 110 110, 90 110 C68 110, 62 84, 40 70 Z" fill="#16183d" />
          
          {/* Mother-of-pearl (Najeon) iridescent overlay ornament */}
          <path d="M100 50 C120 45, 140 45, 160 50 C180 45, 200 45, 220 50" stroke="url(#najeon-glow)" strokeWidth="3" opacity="0.9" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="najeon-glow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a8ffda" />
              <stop offset="35%" stopColor="#c5f8ff" />
              <stop offset="70%" stopColor="#f3caff" />
              <stop offset="100%" stopColor="#ffebb5" />
            </linearGradient>
            <linearGradient id="lens-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#121319" />
              <stop offset="100%" stopColor="#08080c" />
            </linearGradient>
          </defs>
          
          {/* Lenses */}
          <path d="M48 74 C70 53, 115 53, 130 74 C122 82, 112 98, 90 98 C68 98, 58 82, 48 74 Z" fill="url(#lens-dark)" />
          <path d="M48 74 C70 53, 115 53, 130 74 Z" fill="url(#reflection-grad)" />
          
          <path d="M152 74 C167 53, 212 53, 234 74 C224 82, 214 98, 192 98 C170 98, 160 82, 152 74 Z" fill="url(#lens-dark)" />
          <path d="M152 74 C167 53, 212 53, 234 74 Z" fill="url(#reflection-grad)" />
          
          {/* Tiny Najeon flower in center hinge */}
          <circle cx="142" cy="74" r="3" fill="#a4f3e4" />
        </svg>
      );
      
    case "craft-3": // 백자 쉘 03 IV
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          
          {/* Cream Ivory Frame */}
          <path d="M40 70 C70 42, 120 42, 138 70 L146 70 C164 42, 214 42, 244 70 C258 84, 252 110, 230 110 C210 110, 192 90, 182 78 C174 84, 146 84, 138 78 C128 90, 110 110, 90 110 C68 110, 62 84, 40 70 Z" fill="#e3dec3" />
          
          {/* Lenses with warm amber tint */}
          <defs>
            <linearGradient id="lens-amber" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#413936" />
              <stop offset="100%" stopColor="#221d1b" />
            </linearGradient>
          </defs>
          <path d="M48 74 C70 53, 115 53, 130 74 C122 82, 112 98, 90 98 C68 98, 58 82, 48 74 Z" fill="url(#lens-amber)" />
          <path d="M48 74 C70 53, 115 53, 130 74 Z" fill="url(#reflection-grad)" />
          
          <path d="M152 74 C167 53, 212 53, 234 74 C224 82, 214 98, 192 98 C170 98, 160 82, 152 74 Z" fill="url(#lens-amber)" />
          <path d="M152 74 C167 53, 212 53, 234 74 Z" fill="url(#reflection-grad)" />
          
          {/* Ivory ceramic highlights */}
          <path d="M44 72 C55 60, 80 50, 95 50" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
      
    case "craft-4": // 오리가미 02
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.04)" filter="blur(6px)" />
          {/* Silver minimalist oval metal wrap */}
          <path d="M50 78 C50 62, 130 62, 134 78 C134 94, 50 94, 50 78 Z" stroke="#ccc" strokeWidth="3" />
          <path d="M148 78 C148 62, 228 62, 232 78 C232 94, 148 94, 148 78 Z" stroke="#ccc" strokeWidth="3" />
          <line x1="134" y1="78" x2="148" y2="78" stroke="#ccc" strokeWidth="3.5" />
          
          {/* Subtle light lenses */}
          <path d="M51 78 C51 64, 129 64, 133 78 C133 92, 51 92, 51 78 Z" fill="rgba(0,0,0,0.08)" />
          <path d="M149 78 C149 64, 227 64, 231 78 C231 92, 149 92, 149 78 Z" fill="rgba(0,0,0,0.08)" />
          {/* Shiny lens flare */}
          <path d="M60 70 L90 85" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M160 70 L190 85" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    // -------------------------------------------------------------------------
    // 2. FLOWER COLLECTION (꽃 컬렉션) - Highly artistic floral ornaments
    // -------------------------------------------------------------------------
    case "flower-1": // 매화 01 MAEHWA
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Fine silver dynamic wing/cat-eye rim */}
          <path d="M48 75 C70 54, 125 56, 134 76 L148 76 C157 56, 212 54, 234 75" stroke="#bababa" strokeWidth="2.5" />
          
          {/* Soft violet/dark lens */}
          <defs>
            <linearGradient id="lens-violet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c2a38" />
              <stop offset="100%" stopColor="#12111c" />
            </linearGradient>
          </defs>
          <path d="M50 77 C70 58, 124 58, 133 77 C125 85, 112 96, 91 96 C70 96, 58 85, 50 77 Z" fill="url(#lens-violet)" />
          <path d="M149 77 C158 58, 212 58, 232 77 C224 85, 212 96, 191 96 C170 96, 158 85, 149 77 Z" fill="url(#lens-violet)" />
          
          {/* Detailed Silver Plum Blossoms (매화) on the outer corners */}
          {/* Left Plum Blossom */}
          <g transform="translate(42, 68) scale(0.9)">
            <circle cx="0" cy="0" r="5" fill="#fcfcfc" stroke="#aaaaaa" strokeWidth="1" />
            <circle cx="-6" cy="-2" r="4.5" fill="#fdfdfd" stroke="#aaaaaa" strokeWidth="0.8" />
            <circle cx="6" cy="2" r="4.5" fill="#fdfdfd" stroke="#aaaaaa" strokeWidth="0.8" />
            <circle cx="2" cy="-6" r="4.5" fill="#fdfdfd" stroke="#aaaaaa" strokeWidth="0.8" />
            <circle cx="-2" cy="6" r="4.5" fill="#fdfdfd" stroke="#aaaaaa" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="#e89bb4" />
          </g>
          {/* Right Plum Blossom */}
          <g transform="translate(240, 68) scale(0.9)">
            <circle cx="0" cy="0" r="5" fill="#fcfcfc" stroke="#aaaaaa" strokeWidth="1" />
            <circle cx="-6" cy="2" r="4.5" fill="#fdfdfd" stroke="#aaaaaa" strokeWidth="0.8" />
            <circle cx="6" cy="-2" r="4.5" fill="#fdfdfd" stroke="#aaaaaa" strokeWidth="0.8" />
            <circle cx="-2" cy="-6" r="4.5" fill="#fdfdfd" stroke="#aaaaaa" strokeWidth="0.8" />
            <circle cx="2" cy="6" r="4.5" fill="#fdfdfd" stroke="#aaaaaa" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="#e89bb4" />
          </g>
          {/* Wire design wrapping */}
          <path d="M42 68 C35 72, 30 84, 34 94" stroke="#cccccc" strokeWidth="1.5" />
          <path d="M240 68 C247 72, 252 84, 248 94" stroke="#cccccc" strokeWidth="1.5" />
        </svg>
      );
      
    case "flower-2": // 벚꽃 02 BEOTKKOT
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Silver/Rose Gold frame */}
          <path d="M50 78 C50 62, 130 62, 134 78 C134 94, 50 94, 50 78 Z" stroke="#e3a7ba" strokeWidth="2.5" />
          <path d="M148 78 C148 62, 228 62, 232 78 C232 94, 148 94, 148 78 Z" stroke="#e3a7ba" strokeWidth="2.5" />
          <line x1="134" y1="78" x2="148" y2="78" stroke="#e3a7ba" strokeWidth="3" />
          
          {/* Light-pink semi-translucent gradient lenses */}
          <defs>
            <linearGradient id="lens-rose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(235,178,197,0.8)" />
              <stop offset="100%" stopColor="rgba(240,210,218,0.4)" />
            </linearGradient>
          </defs>
          <path d="M51 78 C51 64, 129 64, 133 78 C133 92, 51 92, 51 78 Z" fill="url(#lens-rose)" />
          <path d="M149 78 C149 64, 227 64, 231 78 C231 92, 149 92, 149 78 Z" fill="url(#lens-rose)" />
          
          {/* Cherry Blossom (벚꽃) clusters on outer hinges */}
          <g transform="translate(42, 78) scale(0.8)">
            <ellipse cx="0" cy="0" rx="4" ry="7" fill="#ffaec9" />
            <ellipse cx="0" cy="0" rx="7" ry="4" fill="#ffaec9" />
            <circle cx="0" cy="0" r="2.5" fill="#fcd3e1" />
          </g>
          <g transform="translate(240, 78) scale(0.8)">
            <ellipse cx="0" cy="0" rx="4" ry="7" fill="#ffaec9" />
            <ellipse cx="0" cy="0" rx="7" ry="4" fill="#ffaec9" />
            <circle cx="0" cy="0" r="2.5" fill="#fcd3e1" />
          </g>
        </svg>
      );
      
    case "flower-3": // 연꽃 03 YEONLOT
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          <path d="M52 76 C52 58, 126 58, 132 76 C132 94, 52 94, 52 76 Z" stroke="#ccc" strokeWidth="2" />
          <path d="M148 76 C148 58, 222 58, 228 76 C228 94, 148 94, 148 76 Z" stroke="#ccc" strokeWidth="2" />
          <line x1="132" y1="76" x2="148" y2="76" stroke="#ccc" strokeWidth="2.5" />
          
          {/* Smoked silver gradient lenses */}
          <path d="M53 76 C53 60, 125 60, 131 76 C131 92, 53 92, 53 76 Z" fill="rgba(20,22,25,0.7)" />
          <path d="M149 76 C149 60, 221 60, 227 76 C227 92, 149 92, 149 76 Z" fill="rgba(20,22,25,0.7)" />
          
          {/* Exquisite silver Lotus pattern details wrapping the temples */}
          {/* Left intricate silver lotus contour */}
          <path d="M42 70 C34 58, 26 70, 36 84" stroke="#e0e0e0" strokeWidth="1.5" />
          <path d="M38 72 C32 64, 28 80, 44 88" stroke="#c0c0c0" strokeWidth="1" />
          
          {/* Right intricate silver lotus contour */}
          <path d="M238 70 C246 58, 254 70, 244 84" stroke="#e0e0e0" strokeWidth="1.5" />
          <path d="M242 72 C248 64, 252 80, 236 88" stroke="#c0c0c0" strokeWidth="1" />
        </svg>
      );
      
    case "flower-4": // 국화 04 GUKHWA
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Gold metal frames */}
          <path d="M50 78 C50 62, 130 62, 134 78 C134 94, 50 94, 50 78 Z" stroke="#d4af37" strokeWidth="2.2" />
          <path d="M148 78 C148 62, 228 62, 232 78 C232 94, 148 94, 148 78 Z" stroke="#d4af37" strokeWidth="2.2" />
          <line x1="134" y1="78" x2="148" y2="78" stroke="#d4af37" strokeWidth="2.5" />
          
          {/* Golden/amber translucent lenses */}
          <path d="M51 78 C51 64, 129 64, 133 78 C133 92, 51 92, 51 78 Z" fill="rgba(180,140,40,0.3)" />
          <path d="M149 78 C149 64, 227 64, 231 78 C231 92, 149 92, 149 78 Z" fill="rgba(180,140,40,0.3)" />
          
          {/* Chrysanthemum flower detailing (Gukhwa) */}
          <g transform="translate(42, 70) scale(0.75)">
            <circle cx="0" cy="0" r="4" fill="#d4af37" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={10 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={10 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="#ffd700"
                strokeWidth="1.2"
              />
            ))}
          </g>
          <g transform="translate(240, 70) scale(0.75)">
            <circle cx="0" cy="0" r="4" fill="#d4af37" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={10 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={10 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="#ffd700"
                strokeWidth="1.2"
              />
            ))}
          </g>
        </svg>
      );

    // -------------------------------------------------------------------------
    // 3. PALACE COLLECTION (궁궐 컬렉션) - Bold structures & lattice details
    // -------------------------------------------------------------------------
    case "palace-1": // 기와 01 GIWA
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Thick black acetate with curving Giwa Roof-line */}
          <path d="M40 72 C70 46, 110 42, 138 72 L146 72 C174 42, 214 46, 244 72 C258 84, 252 108, 230 108 C210 108, 192 88, 182 78 C174 84, 146 84, 138 78 C128 88, 110 108, 90 108 C68 108, 62 84, 40 72 Z" fill="#151515" />
          
          {/* Shadow/Engraving of Rooftop Curve */}
          <path d="M44 74 C70 52, 108 48, 136 74" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <path d="M148 74 C176 48, 214 52, 240 74" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          
          {/* Black gradient lenses */}
          <path d="M48 76 C70 55, 112 55, 128 76 C120 84, 110 98, 90 98 C70 98, 60 84, 48 76 Z" fill="url(#lens-dark)" />
          <path d="M152 76 C168 55, 210 55, 232 76 C220 84, 210 98, 190 98 C170 98, 160 84, 152 76 Z" fill="url(#lens-dark)" />
          
          {/* Gold lattice temple core hint */}
          <line x1="28" y1="70" x2="16" y2="67" stroke="#d4af37" strokeWidth="2.5" />
          <line x1="252" y1="70" x2="264" y2="67" stroke="#d4af37" strokeWidth="2.5" />
        </svg>
      );
      
    case "palace-2": // 창호 02 CHANGHO
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Solid square structural frame */}
          <path d="M42 66 L134 66 L134 102 L42 102 Z" fill="#1a1a1a" />
          <path d="M148 66 L240 66 L240 102 L148 102 Z" fill="#1a1a1a" />
          <line x1="134" y1="75" x2="148" y2="75" stroke="#1a1a1a" strokeWidth="5.5" />
          
          {/* Lenses */}
          <rect x="48" y="72" width="78" height="24" fill="url(#lens-dark)" />
          <rect x="154" y="72" width="78" height="24" fill="url(#lens-dark)" />
          
          {/* Traditional wood-cut lattice (창호) line highlights on left/right edges */}
          <g opacity="0.4">
            <line x1="42" y1="66" x2="42" y2="102" stroke="#ffffff" strokeWidth="1" />
            <line x1="134" y1="66" x2="134" y2="102" stroke="#ffffff" strokeWidth="1" />
            <line x1="148" y1="66" x2="148" y2="102" stroke="#ffffff" strokeWidth="1" />
            <line x1="240" y1="66" x2="240" y2="102" stroke="#ffffff" strokeWidth="1" />
          </g>
        </svg>
      );
      
    case "palace-3": // 문양 03 MUNYANG
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Classic rounded acetate block */}
          <path d="M42 70 C70 44, 115 44, 134 70 L148 70 C167 44, 212 44, 240 70 C256 86, 252 106, 230 106 C210 106, 192 88, 182 78 C174 84, 146 84, 138 78 C128 88, 110 106, 90 106 C68 106, 62 86, 42 70 Z" fill="#1e1a17" />
          
          {/* Lenses */}
          <path d="M50 74 C70 54, 112 54, 128 74 L128 82 C120 96, 110 98, 90 98 C70 98, 60 96, 50 82 Z" fill="#08080c" />
          <path d="M154 74 C174 54, 216 54, 232 74 L232 82 C224 96, 214 98, 192 98 C172 98, 162 96, 154 82 Z" fill="#08080c" />
          
          {/* Inlaid round golden traditional pattern logo on side endpiece */}
          <circle cx="36" cy="74" r="5" fill="#d4af37" stroke="#aa8c2c" strokeWidth="1" />
          <circle cx="246" cy="74" r="5" fill="#d4af37" stroke="#aa8c2c" strokeWidth="1" />
          {/* Cross lines in gold circle */}
          <line x1="33" y1="74" x2="39" y2="74" stroke="#111" strokeWidth="0.8" />
          <line x1="36" y1="71" x2="36" y2="77" stroke="#111" strokeWidth="0.8" />
          <line x1="243" y1="74" x2="249" y2="74" stroke="#111" strokeWidth="0.8" />
          <line x1="246" y1="71" x2="246" y2="77" stroke="#111" strokeWidth="0.8" />
        </svg>
      );
      
    case "palace-4": // 단청 04 DANCHEONG
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Crystal translucent gray-toned acetate frame */}
          <path d="M40 70 C70 42, 120 42, 138 70 L146 70 C164 42, 214 42, 244 70 C258 84, 252 110, 230 110 C210 110, 192 90, 182 78 C174 84, 146 84, 138 78 C128 90, 110 110, 90 110 C68 110, 62 84, 40 70 Z" fill="rgba(120, 125, 130, 0.4)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          
          {/* Gradient Lenses inside translucent frame */}
          <path d="M48 74 C70 53, 115 53, 130 74 C122 82, 112 98, 90 98 C68 98, 58 82, 48 74 Z" fill="url(#lens-dark)" />
          
          <path d="M152 74 C167 53, 212 53, 234 74 C224 82, 214 98, 192 98 C170 98, 160 82, 152 74 Z" fill="url(#lens-dark)" />
          
          {/* Traditional red/green Dancheong paint spots visible inside the core temple */}
          <circle cx="34" cy="62" r="2.5" fill="#e82c2a" />
          <circle cx="34" cy="68" r="2.5" fill="#2eb06a" />
          <circle cx="248" cy="62" r="2.5" fill="#e82c2a" />
          <circle cx="248" cy="68" r="2.5" fill="#2eb06a" />
        </svg>
      );

    // -------------------------------------------------------------------------
    // 4. WING COLLECTION (날개 컬렉션) - Feather lines, rimless or multi-layer
    // -------------------------------------------------------------------------
    case "wing-1": // 비상 01 BISANG
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Rimless wings glasses design */}
          {/* Beautiful futuristic wing outlines wrapping high lens */}
          <path d="M50 74 C60 54, 128 54, 134 74" stroke="#bababa" strokeWidth="1.5" />
          <path d="M148 74 C154 54, 222 54, 232 74" stroke="#bababa" strokeWidth="1.5" />
          <line x1="134" y1="74" x2="148" y2="74" stroke="#bababa" strokeWidth="2.5" />
          
          {/* Metallic wings on outer endpieces */}
          <path d="M44 76 C32 68, 26 56, 32 46 C34 58, 42 66, 48 72 Z" fill="#e2e2e2" stroke="#686868" strokeWidth="0.5" />
          <path d="M236 76 C248 68, 254 56, 248 46 C246 58, 238 66, 232 72 Z" fill="#e2e2e2" stroke="#686868" strokeWidth="0.5" />
          
          {/* Dark silver mirrors */}
          <path d="M51 75 C61 58, 127 58, 133 75 C125 84, 114 96, 92 96 C70 96, 59 84, 51 75 Z" fill="rgba(40,40,45,0.85)" />
          <path d="M149 75 C159 58, 225 58, 231 75 C223 84, 212 96, 190 96 C168 96, 157 84, 149 75 Z" fill="rgba(40,40,45,0.85)" />
          {/* Silver wing reflection flare lines */}
          <line x1="64" y1="64" x2="88" y2="76" stroke="white" strokeWidth="1.2" opacity="0.4" />
          <line x1="162" y1="64" x2="186" y2="76" stroke="white" strokeWidth="1.2" opacity="0.4" />
        </svg>
      );
      
    case "wing-2": // 천공 02 CHEONGONG
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Sleek futuristic aerodynamic dual wing contours */}
          <path d="M46 72 C60 54, 124 54, 134 72 L148 72 C158 54, 222 54, 236 72" stroke="#222" strokeWidth="3.5" />
          
          {/* Chrome mirrored lens */}
          <path d="M48 73 L132 73 C124 92, 110 98, 90 98 C70 98, 56 92, 48 73 Z" fill="rgba(80,90,105,0.7)" />
          <path d="M150 73 L234 73 C226 92, 212 98, 192 98 C172 98, 158 92, 150 73 Z" fill="rgba(80,90,105,0.7)" />
          
          {/* Sweeping dual wings along the side temples */}
          <path d="M38 68 C24 55, 14 65, 20 80" stroke="#a0a5aa" strokeWidth="2" strokeLinecap="round" />
          <path d="M244 68 C258 55, 268 65, 262 80" stroke="#a0a5aa" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
      
    case "wing-3": // 신의 03 SINUI
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Jet black custom wings geometry */}
          <path d="M40 70 C70 42, 120 42, 138 70 L146 70 C164 42, 214 42, 244 70 C258 84, 252 110, 230 110 C210 110, 192 90, 182 78 C174 84, 146 84, 138 78 C128 90, 110 110, 90 110 C68 110, 62 84, 40 70 Z" fill="#111111" />
          {/* Feathers lines carved in frame */}
          <path d="M42 66 C30 55, 20 70, 32 85" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          <path d="M240 66 C252 55, 262 70, 250 85" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          
          {/* Lenses */}
          <path d="M48 74 C70 53, 115 53, 130 74 C122 82, 112 98, 90 98 C68 98, 58 82, 48 74 Z" fill="#030303" />
          <path d="M152 74 C167 53, 212 53, 234 74 C224 82, 214 98, 192 98 C170 98, 160 82, 152 74 Z" fill="#030303" />
        </svg>
      );
      
    case "baram-4": // 바람 04 BARAM
    case "wing-4":
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Featherweight titanium oval aviator frame */}
          <path d="M52 76 C52 58, 126 58, 132 76 L148 76 C154 58, 228 58, 228 76" stroke="#9da2a6" strokeWidth="1.5" />
          
          <path d="M53 76 C53 60, 125 60, 131 76 C131 92, 53 92, 53 76 Z" fill="rgba(50,55,60,0.4)" />
          <path d="M149 76 C149 60, 227 60, 227 76 C227 92, 149 92, 149 76 Z" fill="rgba(50,55,60,0.4)" />
          
          {/* Feather curves at temple */}
          <path d="M38 72 C28 64, 22 75, 42 82" stroke="#b0b5ba" strokeWidth="1" />
          <path d="M242 72 C252 64, 258 75, 238 82" stroke="#b0b5ba" strokeWidth="1" />
        </svg>
      );

    // -------------------------------------------------------------------------
    // 5. PATTERN COLLECTION (문양 컬렉션) - Circles, engravings, classic style
    // -------------------------------------------------------------------------
    case "pattern-1": // 연화문 01 YEONHWAMUN
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Hexagonal structural black acetate */}
          <path d="M50 64 L126 64 L138 78 L126 98 L50 98 L38 78 Z" fill="#1b1b1b" />
          <path d="M146 64 L222 64 L234 78 L222 98 L146 98 L134 78 Z" fill="#1b1b1b" />
          <line x1="126" y1="78" x2="146" y2="78" stroke="#1b1b1b" strokeWidth="4.5" />
          
          {/* Dark Lenses */}
          <path d="M54 68 L122 68 L132 78 L122 94 L54 94 L44 78 Z" fill="url(#lens-dark)" />
          <path d="M150 68 L218 68 L228 78 L218 94 L150 94 L140 78 Z" fill="url(#lens-dark)" />
          
          {/* Silver Yeonhwamun round coin details inlaid on side temples */}
          <circle cx="28" cy="78" r="4.5" fill="#c5c8cc" stroke="#7e8287" strokeWidth="0.8" />
          <circle cx="244" cy="78" r="4.5" fill="#c5c8cc" stroke="#7e8287" strokeWidth="0.8" />
          {/* Inner details */}
          <circle cx="28" cy="78" r="2" fill="none" stroke="#5d6063" strokeWidth="0.5" />
          <circle cx="244" cy="78" r="2" fill="none" stroke="#5d6063" strokeWidth="0.5" />
        </svg>
      );
      
    case "pattern-2": // 당초문 02 DANGCHOMUN
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Highly transparent clear amber frame */}
          <path d="M40 70 C70 42, 120 42, 138 70 L146 70 C164 42, 214 42, 244 70 C258 84, 252 110, 230 110 C210 110, 192 90, 182 78 C174 84, 146 84, 138 78 C128 90, 110 110, 90 110 C68 110, 62 84, 40 70 Z" fill="rgba(225, 170, 100, 0.45)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          
          {/* Gold reflections lenses */}
          <defs>
            <linearGradient id="lens-gold-mirror" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#45392d" />
              <stop offset="60%" stopColor="#876d49" />
              <stop offset="100%" stopColor="#ffd485" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M48 74 C70 53, 115 53, 130 74 C122 82, 112 98, 90 98 C68 98, 58 82, 48 74 Z" fill="url(#lens-gold-mirror)" />
          <path d="M152 74 C167 53, 212 53, 234 74 C224 82, 214 98, 192 98 C170 98, 160 82, 152 74 Z" fill="url(#lens-gold-mirror)" />
          
          {/* Inner gold Vine patterns (당초문) trailing visible inside the clear stem */}
          <path d="M26 66 C20 62, 14 68, 8 72" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M246 66 C252 62, 258 68, 264 72" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
      
    case "pattern-3": // 격자문 03 GYEOKJAMUN
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Matte dark charcoal frames with geographic corners */}
          <path d="M41 68 L133 66 L133 100 L41 100 L32 84 Z" fill="#242528" />
          <path d="M147 66 L239 68 L248 84 L239 100 L147 100 Z" fill="#242528" />
          <line x1="133" y1="76" x2="147" y2="76" stroke="#242528" strokeWidth="5" />
          
          {/* Lenses */}
          <rect x="46" y="72" width="78" height="23" fill="url(#lens-dark)" />
          <rect x="156" y="72" width="78" height="23" fill="url(#lens-dark)" />
          
          {/* Intricate carved graphic lattice on temples */}
          <line x1="18" y1="74" x2="6" y2="71" stroke="#a0a5aa" strokeWidth="1" />
          <line x1="250" y1="74" x2="262" y2="71" stroke="#a0a5aa" strokeWidth="1" />
        </svg>
      );
      
    case "pattern-4": // 삼태극문 04 SAMTAEGUKMUN
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px] transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.06)" filter="blur(8px)" />
          {/* Off-white cream matte acetate */}
          <path d="M40 70 C70 42, 120 42, 138 70 L146 70 C164 42, 214 42, 244 70 C258 84, 252 110, 230 110 C210 110, 192 90, 182 78 C174 84, 146 84, 138 78 C128 90, 110 110, 90 110 C68 110, 62 84, 40 70 Z" fill="#fcf9ee" stroke="#eae4d3" strokeWidth="1" />
          
          {/* Solid smoke lenses */}
          <path d="M48 74 C70 53, 115 53, 130 74 C122 82, 112 98, 90 98 C68 98, 58 82, 48 74 Z" fill="rgba(30,28,26,0.9)" />
          <path d="M152 74 C167 53, 212 53, 234 74 C224 82, 214 98, 192 98 C170 98, 160 82, 152 74 Z" fill="rgba(30,28,26,0.9)" />
          
          {/* Beautiful circular Samtaegeuk details on side hinges */}
          {/* Red, blue, yellow swirl motif */}
          <g transform="translate(34, 74) scale(0.6)">
            {/* Base circle background */}
            <circle cx="0" cy="0" r="9" fill="#111" />
            {/* Custom visual sectors representing 삼태극 */}
            <path d="M0 0 A9 9 0 0 1 9 0 A4.5 4.5 0 0 1 4.5 4.5 A4.5 4.5 0 0 0 0 0 Z" fill="#ffcd00" />
            <path d="M0 0 A9 9 0 0 1 -4.5 7.79 A4.5 4.5 0 0 1 -6.1 -2.25 A4.5 4.5 0 0 0 0 0 Z" fill="#0047a0" />
            <path d="M0 0 A9 9 0 0 1 -4.5 -7.79 A4.5 4.5 0 0 1 1.6 -4.5 A4.5 4.5 0 0 0 0 0 Z" fill="#cd2e3a" />
          </g>
          <g transform="translate(248, 74) scale(0.6)">
            <circle cx="0" cy="0" r="9" fill="#111" />
            <path d="M0 0 A9 9 0 0 1 9 0 A4.5 4.5 0 0 1 4.5 4.5 A4.5 4.5 0 0 0 0 0 Z" fill="#ffcd00" />
            <path d="M0 0 A9 9 0 0 1 -4.5 7.79 A4.5 4.5 0 0 1 -6.1 -2.25 A4.5 4.5 0 0 0 0 0 Z" fill="#0047a0" />
            <path d="M0 0 A9 9 0 0 1 -4.5 -7.79 A4.5 4.5 0 0 1 1.6 -4.5 A4.5 4.5 0 0 0 0 0 Z" fill="#cd2e3a" />
          </g>
        </svg>
      );

    default:
      // Generic luxury pilot/shape if no ID matches
      return (
        <svg viewBox="0 0 320 160" className="w-[85%] h-[130px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="160" cy="115" rx="100" ry="12" fill="rgba(0,0,0,0.05)" filter="blur(6px)" />
          <path d="M50 78 C50 62, 130 62, 134 78 C134 94, 50 94, 50 78 Z" stroke="#111" strokeWidth="2.5" />
          <path d="M148 78 C148 62, 228 62, 232 78 C232 94, 148 94, 148 78 Z" stroke="#111" strokeWidth="2.5" />
          <line x1="134" y1="78" x2="148" y2="78" stroke="#111" strokeWidth="3" />
        </svg>
      );
  }
}
