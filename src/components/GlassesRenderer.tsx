import React from "react";

interface Props {
  id: string;
  color?: string;
  viewType?: "front" | "side";
}

export default function GlassesRenderer({ id, viewType = "front" }: Props) {
  // Shared Studio Elements & Gradients inside <defs>
  const defs = (
    <defs>
      {/* 3D Chrome/Silver */}
      <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f3f5f6" />
        <stop offset="35%" stopColor="#babbbd" />
        <stop offset="65%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#7a7d80" />
      </linearGradient>

      {/* 3D Polished Gold */}
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fdf3d7" />
        <stop offset="35%" stopColor="#d4af37" />
        <stop offset="65%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#9a7b1c" />
      </linearGradient>

      {/* Iridescent Mother-of-pearl (Najeon) */}
      <linearGradient id="najeon" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#a3ffd4" />
        <stop offset="35%" stopColor="#c2f6ff" />
        <stop offset="70%" stopColor="#edd0ff" />
        <stop offset="100%" stopColor="#ffa6bc" />
      </linearGradient>

      {/* Lenses */}
      <linearGradient id="lens-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e222b" />
        <stop offset="100%" stopColor="#08090d" />
      </linearGradient>
      <linearGradient id="lens-rose" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(235, 140, 175, 0.85)" />
        <stop offset="100%" stopColor="rgba(240, 192, 204, 0.45)" />
      </linearGradient>
      <linearGradient id="lens-amber" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#402e1c" />
        <stop offset="70%" stopColor="#7a552f" />
        <stop offset="100%" stopColor="#ebd2aa" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="lens-light" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(82, 88, 100, 0.65)" />
        <stop offset="100%" stopColor="rgba(30, 32, 36, 0.35)" />
      </linearGradient>

      {/* Studio Glare */}
      <linearGradient id="glare" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.45" />
        <stop offset="30%" stopColor="white" stopOpacity="0.05" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  );

  // Soft reflection floor shadow at base of display
  const shadow = <ellipse cx="145" cy="125" rx="90" ry="8" fill="rgba(0,0,0,0.04)" filter="blur(6px)" />;

  // -------------------------------------------------------------------------
  // 1. FRONT ¾ PERSPECTIVE RENDERER
  // -------------------------------------------------------------------------
  if (viewType === "front") {
    // Select styling configurations based on product family
    const isFlower = id.startsWith("flower");
    const isPalace = id.startsWith("palace");
    const isWing = id.startsWith("wing");
    const isPattern = id.startsWith("pattern");

    // Colors
    let metalColor = "url(#silver)";
    let lensColor = "url(#lens-dark)";
    let frameColor = "#1a1c1f"; // Default acetate
    let frameStroke = "#2e3136";

    if (id === "wing-1" || id === "wing-4" || id === "craft-4") lensColor = "url(#lens-light)";
    if (id === "pattern-2" || id === "craft-3") lensColor = "url(#lens-amber)";

    // Flower models: flower-1 & flower-3 are dark sunglasses, flower-2 & flower-4 are light-lens glasses
    if (isFlower) {
      metalColor = "url(#silver)";
      if (id === "flower-2" || id === "flower-4") {
        lensColor = "url(#lens-light)";
      } else {
        lensColor = "url(#lens-dark)";
      }
    } else {
      if (id === "pattern-2") metalColor = "url(#gold)";
    }
    if (id === "palace-4") frameColor = "rgba(205, 215, 224, 0.45)"; // Translucent clear
    if (id === "pattern-2") frameColor = "rgba(225, 170, 95, 0.45)"; // Honey amber
    if (id === "pattern-4") frameColor = "#fbf7ed"; // Cream white
    if (id === "craft-1") frameColor = "#b9161d"; // Red
    if (id === "craft-2") frameColor = "#16183d"; // Navy

    return (
      <svg viewBox="0 0 320 160" className="w-[85%] h-[125px] transition-transform duration-500 group-hover:scale-[1.03]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {defs}
        {shadow}

        {/* 1. Behind temple arms */}
        <path d="M 65 72 C 40 76, 25 85, 12 110" stroke={isPalace || isPattern ? frameColor : metalColor} strokeWidth={isPalace || isPattern ? "6" : "2.5"} strokeLinecap="round" />
        <path d="M 215 70 C 235 73, 255 83, 272 100" stroke={isPalace || isPattern ? frameColor : metalColor} strokeWidth={isPalace || isPattern ? "4" : "1.5"} opacity="0.6" strokeLinecap="round" />

        {/* 2. Lenses Fills with custom shapes for Flower Collection */}
        {isFlower ? (
          <>
            {/* Custom Organic Cut/Sculpted Lenses for flower models */}
            {id === "flower-1" && ( // MAEHWA: Elegant wavy butterfly shape
              <>
                <path d="M 68 76 C 58 55, 138 50, 148 74 C 144 94, 98 102, 68 76 Z" fill={lensColor} />
                <path d="M 68 76 C 58 55, 138 50, 148 74 Z" fill="url(#glare)" />
                <path d="M 172 74 C 182 50, 262 55, 252 76 C 222 102, 176 94, 172 74 Z" fill={lensColor} />
                <path d="M 172 74 C 182 50, 262 55, 252 76 Z" fill="url(#glare)" />
              </>
            )}
            {id === "flower-2" && ( // BEOTKKOT: Rounded soft scalloped wing shape with subtle pink reflection glow
              <>
                <path d="M 66 76 C 60 52, 140 50, 146 76 C 142 98, 90 102, 66 76 Z" fill={lensColor} />
                <path d="M 66 76 C 60 52, 140 50, 146 76 Z" fill="url(#glare)" />
                {/* Subtle soft pink outer reflection */}
                <path d="M 66 76 C 60 52, 75 80, 66 76" stroke="rgba(251, 184, 204, 0.4)" strokeWidth="3" filter="blur(2px)" />
                <path d="M 174 76 C 180 50, 260 52, 254 76 C 230 102, 180 98, 174 76 Z" fill={lensColor} />
                <path d="M 174 76 C 180 50, 260 52, 254 76 Z" fill="url(#glare)" />
                <path d="M 254 76 C 260 52, 245 80, 254 76" stroke="rgba(251, 184, 204, 0.4)" strokeWidth="3" filter="blur(2px)" />
              </>
            )}
            {id === "flower-3" && ( // YEONLOT: Teardrop curving down, leaf-like tip
              <>
                <path d="M 68 74 C 68 48, 142 54, 146 78 C 138 100, 78 102, 68 74 Z" fill={lensColor} />
                <path d="M 68 74 C 68 48, 142 54, 146 78 Z" fill="url(#glare)" />
                <path d="M 174 78 C 178 54, 252 48, 252 74 C 242 102, 182 100, 174 78 Z" fill={lensColor} />
                <path d="M 174 78 C 178 54, 252 48, 252 74 Z" fill="url(#glare)" />
              </>
            )}
            {id === "flower-4" && ( // GUKHWA: Sharp stylised kitty/shield lens
              <>
                <path d="M 65 72 C 60 50, 138 50, 148 76 C 142 102, 85 104, 65 72 Z" fill={lensColor} />
                <path d="M 65 72 C 60 50, 138 50, 148 76 Z" fill="url(#glare)" />
                <path d="M 172 76 C 182 50, 260 50, 255 72 C 235 104, 178 102, 172 76 Z" fill={lensColor} />
                <path d="M 172 76 C 182 50, 260 50, 255 72 Z" fill="url(#glare)" />
              </>
            )}
          </>
        ) : (
          <>
            <path d="M 68 76 C 68 52, 142 52, 148 76 C 148 100, 68 100, 68 76 Z" fill={lensColor} />
            <path d="M 68 76 C 68 52, 142 52, 148 76 Z" fill="url(#glare)" />
            <path d="M 178 74 C 178 54, 238 54, 244 74 C 244 94, 178 94, 178 74 Z" fill={lensColor} />
            <path d="M 178 74 C 178 54, 238 54, 244 74 Z" fill="url(#glare)" />
          </>
        )}

        {/* 3. Main Eye-Rims and Bridges (Acetate vs Metal Wireframes) */}
        {isPalace || isPattern || id.startsWith("craft-1") || id.startsWith("craft-2") || id.startsWith("craft-3") ? (
          // Luxurious Chunky Acetate Frames
          <path 
            d="M 54 66 C 90 48, 126 48, 154 74 Q 163 78, 172 74 C 200 48, 236 48, 254 66 C 262 72, 256 98, 236 102 C 218 106, 204 94, 196 86 C 190 92, 180 94, 170 86 C 162 94, 148 106, 130 102 C 110 98, 104 72, 54 66 Z" 
            fill={frameColor} 
            stroke={frameStroke}
            strokeWidth="1"
          />
        ) : (
          // Elegant Sleek Metal Frames (Custom curves for Flower models to map images)
          <>
            {isFlower ? (
              <>
                {/* Custom silver vine structures wrapping front lenses */}
                {id === "flower-1" && ( // MAEHWA: Twig double bar bridge
                  <>
                    <path d="M 64 72 C 55 50, 142 46, 148 74 Q 160 62, 172 72 C 178 46, 265 50, 256 72" stroke={metalColor} strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 62 72 Q 106 60, 148 74" stroke={metalColor} strokeWidth="1.5" />
                    <path d="M 172 72 Q 214 60, 258 72" stroke={metalColor} strokeWidth="1.5" />
                    <path d="M 148 74 Q 160 68, 172 72" stroke={metalColor} strokeWidth="3" strokeLinecap="round" />
                  </>
                )}
                {id === "flower-2" && ( // BEOTKKOT: Softer thin curves and split braided corner
                  <>
                    <path d="M 62 74 C 58 48, 140 46, 146 76" stroke={metalColor} strokeWidth="2.2" />
                    <path d="M 174 76 C 180 46, 262 48, 258 74" stroke={metalColor} strokeWidth="2.2" />
                    <path d="M 146 76 Q 160 66, 174 76" stroke={metalColor} strokeWidth="2.8" strokeLinecap="round" />
                    <path d="M 144 72 Q 160 62, 176 72" stroke={metalColor} strokeWidth="1.2" opacity="0.8" />
                  </>
                )}
                {id === "flower-3" && ( // YEONLOT: Dual bridge sweeping up
                  <>
                    <path d="M 63 74 C 63 46, 141 52, 145 78" stroke={metalColor} strokeWidth="2.4" />
                    <path d="M 175 78 C 179 52, 257 46, 257 74" stroke={metalColor} strokeWidth="2.4" />
                    <path d="M 145 78 Q 160 65, 175 78" stroke={metalColor} strokeWidth="3.2" strokeLinecap="round" />
                    <path d="M 141 71 C 150 62, 170 62, 179 71" stroke={metalColor} strokeWidth="1.5" />
                  </>
                )}
                {id === "flower-4" && ( // GUKHWA: Sharp dramatic lines wrapping temporal halves
                  <>
                    <path d="M 62 70 C 58 46, 138 46, 146 76" stroke={metalColor} strokeWidth="2.2" />
                    <path d="M 174 76 C 182 46, 262 48, 258 70" stroke={metalColor} strokeWidth="2.2" />
                    <path d="M 146 76 Q 160 64, 174 76" stroke={metalColor} strokeWidth="3" strokeLinecap="round" />
                    <path d="M 145 70 Q 160 58, 175 70" stroke={metalColor} strokeWidth="1.8" />
                  </>
                )}
              </>
            ) : (
              <>
                <path d="M 64 74 C 64 48, 144 48, 150 74 C 150 102, 64 102, 64 74 Z" stroke={metalColor} strokeWidth="2.2" />
                <path d="M 175 72 C 175 49, 241 49, 247 72 C 247 96, 175 96, 175 72 Z" stroke={metalColor} strokeWidth="1.8" />
                <path d="M 148 74 Q 163 64, 178 72" stroke={metalColor} strokeWidth="3" strokeLinecap="round" />
                {id === "wing-4" && <path d="M 150 70 Q 163 60, 176 68" stroke={metalColor} strokeWidth="1.8" />}
              </>
            )}
          </>
        )}

        {/* 4. Model-Specific Traditional Detailing & Icons */}
        {id === "flower-1" && ( // 매화: Silver twig blossom accents symmetrically placed at hinges
          <>
            <g transform="translate(60, 72) scale(1.1)">
              <circle cx="0" cy="0" r="4.5" fill="#f8fafc" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="-4" cy="-2" r="3.5" fill="#f1f5f9" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="4" cy="-2" r="3.5" fill="#f1f5f9" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="3" cy="4.5" r="3.5" fill="#e2e8f0" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="-3" cy="4.5" r="3.5" fill="#e2e8f0" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="1.8" fill="url(#silver)" />
            </g>
            <g transform="translate(259, 71) scale(1.1)">
              <circle cx="0" cy="0" r="4.5" fill="#f8fafc" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="-4" cy="-2" r="3.5" fill="#f1f5f9" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="4" cy="-2" r="3.5" fill="#f1f5f9" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="3" cy="4.5" r="3.5" fill="#e2e8f0" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="-3" cy="4.5" r="3.5" fill="#e2e8f0" stroke="#b1b5b9" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="1.8" fill="url(#silver)" />
            </g>
          </>
        )}

        {id === "flower-2" && ( // 벚꽃: Multiple overlapping Cherry Blossoms cluster on the outer hinge edges (BEOTKKOT 02)
          <>
            {/* Left temple blossom cluster */}
            <g transform="translate(58, 73) scale(1.1)">
              <ellipse cx="-2" cy="-3" rx="3.5" ry="5.5" fill="#ffe4ec" stroke="url(#silver)" strokeWidth="0.5" transform="rotate(-30)" />
              <ellipse cx="-5" cy="1" rx="3.5" ry="5.5" fill="#fbc4d6" stroke="url(#silver)" strokeWidth="0.5" transform="rotate(-65)" />
              <ellipse cx="2" cy="-2" rx="3.5" ry="5.5" fill="#ffe4ec" stroke="url(#silver)" strokeWidth="0.5" transform="rotate(25)" />
              <ellipse cx="4" cy="3.5" rx="3.5" ry="5.5" fill="#fff" stroke="url(#silver)" strokeWidth="0.5" transform="rotate(60)" />
              <circle cx="0" cy="0" r="1.8" fill="#e696b0" />
            </g>
            <g transform="translate(50, 77) scale(0.8)">
              {/* Second smaller overlapping blossom */}
              <circle cx="0" cy="0" r="5" fill="#ffd4e3" stroke="url(#silver)" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="#d97292" />
            </g>
            {/* Right temple blossom cluster */}
            <g transform="translate(262, 73) scale(1.1)">
              <ellipse cx="2" cy="-3" rx="3.5" ry="5.5" fill="#ffe4ec" stroke="url(#silver)" strokeWidth="0.5" transform="rotate(30)" />
              <ellipse cx="5" cy="1" rx="3.5" ry="5.5" fill="#fbc4d6" stroke="url(#silver)" strokeWidth="0.5" transform="rotate(65)" />
              <ellipse cx="-2" cy="-2" rx="3.5" ry="5.5" fill="#ffe4ec" stroke="url(#silver)" strokeWidth="0.5" transform="rotate(-25)" />
              <ellipse cx="-4" cy="3.5" rx="3.5" ry="5.5" fill="#fff" stroke="url(#silver)" strokeWidth="0.5" transform="rotate(-60)" />
              <circle cx="0" cy="0" r="1.8" fill="#e696b0" />
            </g>
            <g transform="translate(270, 77) scale(0.8)">
              <circle cx="0" cy="0" r="5" fill="#ffd4e3" stroke="url(#silver)" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="#d97292" />
            </g>
          </>
        )}

        {id === "flower-3" && ( // 연꽃: Stylized curling silver lotus leaves wrapping around edge beautifully (YEONLOT 03)
          <>
            {/* Left Lotus wrap */}
            <g transform="translate(56, 75) scale(1.1)">
              <path d="M 0 0 C -12 -12, -22 -2, -18 8 C -14 14, -8 11, 0 4 Z" fill="url(#silver)" stroke="#8e9296" strokeWidth="0.7" />
              <path d="M -6 -5 C -15 -14, -22 -8, -16 2 Z" fill="url(#silver)" stroke="#8e9296" strokeWidth="0.5" />
              <path d="M 2 3 C -5 8, -10 12, -14 5" stroke="url(#silver)" strokeWidth="1" />
              <circle cx="0" cy="2" r="2" fill="#fff" />
            </g>
            {/* Right Lotus wrap */}
            <g transform="translate(264, 75) scale(1.1) scaleX(-1)">
              <path d="M 0 0 C -12 -12, -22 -2, -18 8 C -14 14, -8 11, 0 4 Z" fill="url(#silver)" stroke="#8e9296" strokeWidth="0.7" />
              <path d="M -6 -5 C -15 -14, -22 -8, -16 2 Z" fill="url(#silver)" stroke="#8e9296" strokeWidth="0.5" />
              <path d="M 2 3 C -5 8, -10 12, -14 5" stroke="url(#silver)" strokeWidth="1" />
              <circle cx="0" cy="2" r="2" fill="#fff" />
            </g>
          </>
        )}

        {id === "flower-4" && ( // 국화: Silver chrysanthemum spiky floral structures wrapping edges (GUKHWA 04)
          <>
            {/* Left Spiky chrysant */}
            <g transform="translate(56, 73) scale(1.1)">
              <path d="M 0 0 Q -18 -10, -12 -18 Q -8 -8, 0 -2 Z" fill="url(#silver)" stroke="#828588" strokeWidth="0.5" />
              <path d="M -3 3 Q -22 -2, -15 -12 Q -8 -4, -1 1 Z" fill="url(#silver)" stroke="#828588" strokeWidth="0.5" />
              <path d="M -2 -8 Q -12 -22, -4 -25 Q -2 -14, 0 -6 Z" fill="url(#silver)" stroke="#828588" strokeWidth="0.5" />
              <path d="M -6 6 Q -22 8, -18 -2 Q -8 3, -1 4 Z" fill="url(#silver)" stroke="#828588" strokeWidth="0.5" />
              <circle cx="-1" cy="-2" r="3" fill="#fff" stroke="url(#silver)" strokeWidth="0.8" />
            </g>
            {/* Right Spiky chrysant */}
            <g transform="translate(264, 73) scale(1.1) scaleX(-1)">
              <path d="M 0 0 Q -18 -10, -12 -18 Q -8 -8, 0 -2 Z" fill="url(#silver)" stroke="#828588" strokeWidth="0.5" />
              <path d="M -3 3 Q -22 -2, -15 -12 Q -8 -4, -1 1 Z" fill="url(#silver)" stroke="#828588" strokeWidth="0.5" />
              <path d="M -2 -8 Q -12 -22, -4 -25 Q -2 -14, 0 -6 Z" fill="url(#silver)" stroke="#828588" strokeWidth="0.5" />
              <path d="M -6 6 Q -22 8, -18 -2 Q -8 3, -1 4 Z" fill="url(#silver)" stroke="#828588" strokeWidth="0.5" />
              <circle cx="-1" cy="-2" r="3" fill="#fff" stroke="url(#silver)" strokeWidth="0.8" />
            </g>
          </>
        )}

        {id === "palace-1" && ( // 기와: Silver roof tile pattern engraved on hinge
          <g transform="translate(18, 85) rotate(11) scale(0.95)">
            <rect x="0" y="0" width="32" height="12" rx="3" fill="url(#silver)" stroke="#222" strokeWidth="0.8" />
            <path d="M 4 2 C 8 7, 12 7, 16 2 M 14 2 C 18 7, 22 7, 26 2 M 24 2 C 28 7, 32 7, 34 2" stroke="#222" strokeWidth="0.8" />
          </g>
        )}

        {id === "palace-2" && ( // 창호: Traditional gate lattice lines on left hinge
          <g transform="translate(18, 84) rotate(11) scale(0.9)" opacity="0.9">
            <rect x="0" y="0" width="34" height="12" fill="url(#silver)" stroke="#111" strokeWidth="1" />
            <line x1="8" y1="0" x2="8" y2="12" stroke="#111" strokeWidth="0.8" />
            <line x1="17" y1="0" x2="17" y2="12" stroke="#111" strokeWidth="0.8" />
            <line x1="26" y1="0" x2="26" y2="12" stroke="#111" strokeWidth="0.8" />
            <line x1="0" y1="6" x2="34" y2="6" stroke="#111" strokeWidth="0.8" />
          </g>
        )}

        {id === "palace-3" && ( // 문양: Round golden seal on hinge
          <g transform="translate(42, 80)">
            <circle cx="0" cy="0" r="6" fill="url(#gold)" stroke="#74551d" strokeWidth="0.8" />
            <line x1="-3" y1="0" x2="3" y2="0" stroke="#111" strokeWidth="0.8" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#111" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="#fff" />
          </g>
        )}

        {id === "palace-4" && ( // 단청: Delicate small crimson and forest-green glaze beads inside transparency
          <g transform="translate(38, 70)">
            <circle cx="0" cy="0" r="2.2" fill="#e03e3e" />
            <circle cx="3.2" cy="-3.5" r="2.2" fill="#249c6b" />
            <circle cx="-3" cy="3.5" r="2.2" fill="#e2a122" />
          </g>
        )}

        {isWing && ( // 날개 깃: Overlapping styled feather wings blowing back from temples
          <g transform="translate(56, 73)" opacity="0.95">
            <path d="M 0 0 C -12 -12, -26 -14, -26 -3 C -26 5, -16 6, -2 2 Z" fill={id === "wing-3" ? "#111" : "url(#silver)"} stroke="#6c6d70" strokeWidth="0.5" />
            <path d="M -3 3 C -18 -6, -30 -4, -28 6 C -26 11, -16 10, -5 4 Z" fill={id === "wing-3" ? "#111" : "url(#silver)"} stroke="#6c6d70" strokeWidth="0.5" />
            {id === "wing-2" && <path d="M -6 6 L -42 -5 L -2 7" fill="url(#silver)" />}
          </g>
        )}

        {id === "pattern-1" && ( // 연화문: Round silver lotus medallion
          <g transform="translate(38, 80)">
            <circle cx="0" cy="0" r="7" fill="url(#silver)" stroke="#444" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="3" fill="none" stroke="#222" strokeWidth="0.8" />
            <line x1="-4" y1="0" x2="4" y2="0" stroke="#111" strokeWidth="0.5" />
            <line x1="0" y1="-4" x2="0" y2="4" stroke="#111" strokeWidth="0.5" />
          </g>
        )}

        {id === "pattern-2" && ( // 당초문: Warm gold vine crawling through transparent temple
          <g transform="translate(20, 83) rotate(11)">
            <path d="M 0 2 Q 15 0, 30 5" stroke="url(#gold)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="15" cy="1" r="1.5" fill="none" stroke="url(#gold)" strokeWidth="0.8" />
          </g>
        )}

        {id === "pattern-3" && ( // 격자문: Interlocking geometric checks plate
          <g transform="translate(18, 85) rotate(11) scale(0.95)">
            <rect x="0" y="0" width="34" height="11" fill="none" stroke="url(#silver)" strokeWidth="1" />
            <line x1="9" y1="0" x2="9" y2="11" stroke="url(#silver)" strokeWidth="0.8" />
            <line x1="18" y1="0" x2="18" y2="11" stroke="url(#silver)" strokeWidth="0.8" />
            <line x1="27" y1="0" x2="27" y2="11" stroke="url(#silver)" strokeWidth="0.8" />
            <line x1="0" y1="5.5" x2="34" y2="5.5" stroke="url(#silver)" strokeWidth="0.8" />
          </g>
        )}

        {id === "pattern-4" && ( // 삼태극: Round emblem with Red, Blue, Yellow enamel swirl
          <g transform="translate(38, 80)">
            <circle cx="0" cy="0" r="7.5" fill="#111" stroke="#dad2be" strokeWidth="0.8" />
            <path d="M 0 0 A 7.5 7.5 0 0 1 7.5 0 A 3.75 3.75 0 0 1 3.75 3.75 A 3.75 3.75 0 0 0 0 0 Z" fill="#ffcd00" />
            <path d="M 0 0 A 7.5 7.5 0 0 1 -3.75 6.5 A 3.75 3.75 0 0 1 -5.1 -1.8 A 3.75 3.75 0 0 0 0 0 Z" fill="#0047a0" />
            <path d="M 0 0 A 7.5 7.5 0 0 1 -3.75 -6.5 A 3.75 3.75 0 0 1 1.4 -3.7 A 3.75 3.75 0 0 0 0 0 Z" fill="#cd2e3a" />
          </g>
        )}

        {id === "craft-2" && ( // 나전칠기: Iridescent Mother-of-pearl (Najeon) glowing accent strip
          <path d="M 58 66 C 90 52, 126 52, 150 72" stroke="url(#najeon)" strokeWidth="3" strokeLinecap="round" opacity="0.9" fill="none" />
        )}
      </svg>
    );
  }

  // -------------------------------------------------------------------------
  // 2. MACRO SIDE/DETAIL PRECISE VIEW RENDERER (줌인 고해상도 공예 상세)
  // -------------------------------------------------------------------------
  // Displays the horizontal temple arm spanning horizontally from x=40 to x=280 at y=80.
  // Perfect for rendering traditional engraving details in jewelry-like close up.
  if (viewType === "side") {
    const isFlower = id.startsWith("flower");
    const isPalace = id.startsWith("palace");
    const isWing = id.startsWith("wing");
    const isPattern = id.startsWith("pattern");

    let coreColor = "url(#silver)";
    let armColor = "#1a1c1f"; // Default acetate
    let isMetalTwig = isFlower || isWing;

    // All flower models are silver metallic crafts
    if (isFlower) {
      coreColor = "url(#silver)";
    } else {
      if (id === "pattern-2") coreColor = "url(#gold)";
    }
    if (id === "palace-4") armColor = "rgba(205, 215, 224, 0.4)";
    if (id === "pattern-2") armColor = "rgba(225, 170, 95, 0.45)";
    if (id === "pattern-4") armColor = "#fbf7ed";
    if (id === "craft-1") armColor = "#b9161d";
    if (id === "craft-2") armColor = "#16183d";

    return (
      <svg viewBox="0 0 320 160" className="w-[85%] h-[125px] transition-transform duration-500 group-hover:scale-[1.03]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {defs}
        {shadow}

        {/* Traditional Hinge Ring and Left-most Frame Slice corner */}
        <path d="M 35 55 C 35 45, 48 45, 48 55 L 48 105 C 48 115, 35 115, 35 105 Z" fill={isMetalTwig ? "none" : armColor} stroke={isMetalTwig ? coreColor : "#333"} strokeWidth="1.5" />
        
        {/* Horizontal Temple Arm Structure */}
        {isMetalTwig ? (
          // Sweeping decorative wire metallic arm structure (Wavy braiding for Maehwa & Beotkkot)
          id === "flower-1" ? (
            // MAEHWA: Elegant multi-weaving wood/plum branches crawl sideways
            <>
              <path d="M 45 80 Q 95 62, 170 82 T 280 80" stroke={coreColor} strokeWidth="4" strokeLinecap="round" />
              <path d="M 52 83 Q 115 95, 195 78 T 275 80" stroke={coreColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              <path d="M 65 74 Q 130 65, 220 84" stroke={coreColor} strokeWidth="1.2" opacity="0.65" />
            </>
          ) : id === "flower-2" ? (
            // BEOTKKOT: Triple interlocking braided waves looping smoothly as shown in physical picture
            <>
              <path d="M 45 80 C 80 65, 115 95, 150 80 C 185 65, 220 95, 255 80 T 280 82" stroke={coreColor} strokeWidth="3" strokeLinecap="round" />
              <path d="M 45 80 C 80 95, 115 65, 150 80 C 185 95, 220 65, 255 80 T 280 81" stroke={coreColor} strokeWidth="1.8" opacity="0.85" />
              <path d="M 45 80 Q 150 80, 280 80" stroke={coreColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            </>
          ) : id === "flower-3" ? (
            // YEONLOT: Very bold massive organic lotus structure around joint, tapering into sleek single elegant line
            <>
              <path d="M 120 80 Q 200 76, 280 80" stroke={coreColor} strokeWidth="3" strokeLinecap="round" />
            </>
          ) : id === "flower-4" ? (
            // GUKHWA: Webbed complex branching twigs extending to a dual thin wire temple
            <>
              <path d="M 45 80 Q 110 74, 280 78" stroke={coreColor} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 105 78 Q 180 84, 275 81" stroke={coreColor} strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 45 80 L 110 72 V 86 Z" fill={coreColor} opacity="0.15" />
            </>
          ) : (
            // WING and Default
            <>
              <path d="M 45 80 Q 150 74, 280 80" stroke={coreColor} strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 45 80 Q 150 85, 270 82" stroke={coreColor} strokeWidth="1.5" opacity="0.6" />
            </>
          )
        ) : (
          // Solid bold polished acetate temple arm
          <g>
            <path d="M 46 72 L 275 78 C 285 78, 285 92, 275 92 L 46 92 Z" fill={armColor} />
            <path d="M 46 72 L 275 78" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          </g>
        )}

        {/* MACRO DETAILS ACCENTS IN CENTER */}
        
        {/* flower-1: Close up Silver Plum Blossoms sitting on wood wire branches (MAEHWA 01) */}
        {id === "flower-1" && (
          <g transform="translate(155, 78) scale(1.35)">
            {/* Blossom 1 */}
            <g transform="translate(-30, -5) scale(0.95)">
              <circle cx="0" cy="0" r="5.5" fill="#fcfdfd" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="-5.5" cy="-2.5" r="4.5" fill="#fafbfc" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="5.5" cy="-2.5" r="4.5" fill="#fafbfc" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="3.5" cy="5" r="4.5" fill="#f5f7f8" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="-3.5" cy="5" r="4.5" fill="#f5f7f8" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.2" fill="url(#silver)" />
            </g>
            {/* Blossom 2 */}
            <g transform="translate(25, 4) scale(0.85)">
              <circle cx="0" cy="0" r="5.5" fill="#fcfdfd" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="-5.5" cy="-2.5" r="4.5" fill="#fafbfc" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="5.5" cy="-2.5" r="4.5" fill="#fafbfc" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="3.5" cy="5" r="4.5" fill="#f5f7f8" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="-3.5" cy="5" r="4.5" fill="#f5f7f8" stroke="#8e9296" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.2" fill="url(#silver)" />
            </g>
            {/* Branch nodes & buds */}
            <circle cx="-10" cy="8" r="2.2" fill="url(#silver)" />
            <circle cx="5" cy="-8" r="1.8" fill="url(#silver)" />
          </g>
        )}

        {/* flower-2: Highly detailed double Cherry Blossom clusters with transparent pink petals & central gems (BEOTKKOT 02) */}
        {id === "flower-2" && (
          <g transform="translate(110, 80) scale(1.4)">
            {/* Left Blossom (Large) */}
            <g transform="translate(-14, 0)">
              <ellipse cx="0" cy="-5" rx="5" ry="7" fill="#ffe2eb" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(-30)" />
              <ellipse cx="-6" cy="1" rx="5" ry="7" fill="#fbb0c8" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(-60)" />
              <ellipse cx="6" cy="1" rx="5" ry="7" fill="#ffe2eb" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(60)" />
              <ellipse cx="4" cy="6" rx="5" ry="7" fill="#fff" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(120)" />
              <ellipse cx="-4" cy="6" rx="5" ry="7" fill="#ffd4e2" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(-120)" />
              <circle cx="0" cy="1" r="2.8" fill="#e03268" />
              <circle cx="0" cy="1" r="1.2" fill="url(#silver)" />
            </g>
            {/* Right Blossom (Overlapping) */}
            <g transform="translate(12, -4) scale(0.9)">
              <ellipse cx="0" cy="-5" rx="5" ry="7" fill="#fff" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(-30)" />
              <ellipse cx="-6" cy="1" rx="5" ry="7" fill="#ffe2eb" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(-60)" />
              <ellipse cx="6" cy="1" rx="5" ry="7" fill="#fbb0c8" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(60)" />
              <ellipse cx="4" cy="6" rx="5" ry="7" fill="#ffd4e2" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(120)" />
              <ellipse cx="-4" cy="6" rx="5" ry="7" fill="#fff" stroke="url(#silver)" strokeWidth="0.7" transform="rotate(-120)" />
              <circle cx="0" cy="1" r="2.8" fill="#e03268" />
              <circle cx="0" cy="1" r="1.2" fill="url(#silver)" />
            </g>
            {/* Tiny trailing flower buds on vine */}
            <g transform="translate(48, 4) scale(0.6)">
              <circle cx="0" cy="0" r="4.5" fill="#fbb0c8" stroke="url(#silver)" strokeWidth="0.6" />
              <path d="M 0 0 L -6 6" stroke="url(#silver)" strokeWidth="1" />
            </g>
          </g>
        )}

        {/* flower-3: Magnificent prominent silver multi-layered lotus petals at joint, tapering (YEONLOT 03) */}
        {id === "flower-3" && (
          <g transform="translate(85, 80) scale(1.5)">
            {/* Large majestic layered petal bundle cups around hingpoint */}
            <path d="M -26 -16 C -38 -15, -45 -1, -38 12 C -32 20, -22 14, -14 6 C -12 12, 0 15, -5 4 C -2 8, 10 5, 2 0 C 12 -4, 2 -8, -5 -4 C -2 -14, -14 -16, -26 -16 Z" fill="url(#silver)" stroke="#6a6d70" strokeWidth="0.8" />
            
            {/* Elegant inner silver veins of lotus */}
            <path d="M -32 -6 Q -22 0, -18 6" stroke="#fff" strokeWidth="0.8" opacity="0.6" />
            <path d="M -28 -11 Q -16 -4, -15 3" stroke="#fff" strokeWidth="0.8" opacity="0.6" />
            <path d="M -20 -14 Q -12 -7, -14 0" stroke="#fff" strokeWidth="0.8" opacity="0.6" />
            
            {/* Concentric core nodes */}
            <circle cx="-16" cy="0" r="4.5" fill="#f3e8ff" stroke="url(#silver)" strokeWidth="0.6" />
            <circle cx="-16" cy="0" r="2" fill="url(#silver)" />
          </g>
        )}

        {/* flower-4: Explosion of dramatic spiky silver Chrysanthemum rays and trellis webbing (GUKHWA 04) */}
        {id === "flower-4" && (
          <g transform="translate(100, 78) scale(1.4)">
            {/* Webbed background wires */}
            <path d="M -30 2 C -22 -10, -5 -12, 10 0 C -5 12, -22 10, -30 2 Z" stroke="url(#silver)" strokeWidth="1.2" opacity="0.6" />
            <line x1="-30" y1="2" x2="10" y2="0" stroke="url(#silver)" strokeWidth="1" opacity="0.5" />
            <line x1="-15" y1="-5" x2="-5" y2="7" stroke="url(#silver)" strokeWidth="0.8" opacity="0.5" />
            
            {/* Dynamic radiating spiky petals (14 points) */}
            {Array.from({ length: 14 }).map((_, i) => {
              const theta = (i * (360 / 14) * Math.PI) / 180;
              const rInner = 4;
              const rOuter = i % 2 === 0 ? 20 : 13; // Interchanging long and short needles
              const x1 = rInner * Math.cos(theta);
              const y1 = rInner * Math.sin(theta);
              const x2 = rOuter * Math.cos(theta);
              const y2 = rOuter * Math.sin(theta);
              return (
                <path 
                  key={i} 
                  d={`M ${x1} ${y1} L ${x2} ${y2} L ${rInner * Math.cos(theta + 0.15)} ${rInner * Math.sin(theta + 0.15)} Z`} 
                  fill="url(#silver)" 
                  stroke="#5f6265" 
                  strokeWidth="0.5" 
                />
              );
            })}
            
            {/* Gilded flower heart */}
            <circle cx="0" cy="0" r="5.5" fill="#ffffff" stroke="url(#silver)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="2.8" fill="url(#silver)" />
          </g>
        )}

        {/* palace-1: Elegant scalloped traditional silver roof tile plates (Giwa) */}
        {id === "palace-1" && (
          <g transform="translate(110, 74) scale(1.35)">
            <rect x="0" y="0" width="60" height="11" rx="3" fill="url(#silver)" stroke="#111" strokeWidth="0.8" />
            <path d="M 3 2 Q 8 7 13 2 M 13 2 Q 18 7 23 2 M 23 2 Q 28 7 33 2 M 33 2 Q 38 7 43 2 M 43 2 Q 48 7 53 2 M 53 2 Q 57 7 60 2" stroke="#222" strokeWidth="0.9" fill="none" />
          </g>
        )}

        {/* palace-2: Close up high resolution screen trellis wood grid (Changho) */}
        {id === "palace-2" && (
          <g transform="translate(100, 74) scale(1.35)">
            <rect x="0" y="0" width="70" height="11" rx="1.5" fill="url(#silver)" stroke="#111" strokeWidth="1" />
            <line x1="12" y1="0" x2="12" y2="11" stroke="#111" strokeWidth="0.8" />
            <line x1="24" y1="0" x2="24" y2="11" stroke="#111" strokeWidth="0.8" />
            <line x1="36" y1="0" x2="36" y2="11" stroke="#111" strokeWidth="0.8" />
            <line x1="48" y1="0" x2="48" y2="11" stroke="#111" strokeWidth="0.8" />
            <line x1="60" y1="0" x2="60" y2="11" stroke="#111" strokeWidth="0.8" />
            <line x1="0" y1="5.5" x2="70" y2="5.5" stroke="#111" strokeWidth="0.8" />
          </g>
        )}

        {/* palace-3: Engraved gold concentric medallion seal (Munyang) */}
        {id === "palace-3" && (
          <g transform="translate(150, 82) scale(1.4)">
            <circle cx="0" cy="0" r="9.5" fill="url(#gold)" stroke="#74551d" strokeWidth="1" />
            <circle cx="0" cy="0" r="6" fill="none" stroke="#222" strokeWidth="0.6" />
            <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#111" strokeWidth="1" />
            <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#111" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#fff" />
          </g>
        )}

        {/* palace-4: Internal pattern silver skeleton wire and brightly painted Dancheong dots */}
        {id === "palace-4" && (
          <g>
            <path d="M 60 82 H 240" stroke="url(#silver)" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="80" y1="78" x2="80" y2="86" stroke="#222" strokeWidth="1" />
            <line x1="100" y1="78" x2="100" y2="86" stroke="#222" strokeWidth="1" />
            <line x1="120" y1="78" x2="120" y2="86" stroke="#222" strokeWidth="1" />
            <line x1="140" y1="78" x2="140" y2="86" stroke="#222" strokeWidth="1" />
            <line x1="160" y1="78" x2="160" y2="86" stroke="#222" strokeWidth="1" />
            <line x1="180" y1="78" x2="180" y2="86" stroke="#222" strokeWidth="1" />
            <g transform="translate(150, 82) scale(1.4)">
              <circle cx="-6" cy="0" r="2.5" fill="#e03e3e" />
              <circle cx="0" cy="0" r="2.5" fill="#249c6b" />
              <circle cx="6" cy="0" r="2.5" fill="#e2a122" />
            </g>
          </g>
        )}

        {/* wing-1: Triple layered expansive silver feathers */}
        {id === "wing-1" && (
          <g transform="translate(130, 80) scale(1.4)">
            <path d="M 0 -8 C -15 -12, -32 -6, -28 6 C -24 12, -12 11, 0 3" stroke="url(#silver)" strokeWidth="1.6" />
            <path d="M 12 -5 C -3 -9, -20 -3, -16 9 C -12 15, 0 14, 12 7" stroke="url(#silver)" strokeWidth="1.6" />
            <path d="M 24 -2 C 9 -6, -8 0, -4 12 C 0 18, 12 17, 24 11" stroke="url(#silver)" strokeWidth="1.6" />
          </g>
        )}

        {/* wing-2: Chrome aerodynamic layered sleek active wing sweeps */}
        {id === "wing-2" && (
          <g transform="translate(110, 80) scale(1.3)">
            <path d="M 0 0 L 80 -18 C 65 -4, 45 -1, 0 3 Z" fill="url(#silver)" stroke="#6c6d70" strokeWidth="0.8" />
            <path d="M -5 5 L 75 -10 C 60 2, 40 4, -5 7 Z" fill="url(#silver)" stroke="#6c6d70" strokeWidth="0.6" />
            <path d="M -10 10 L 70 0 C 55 8, 35 10, -10 12 Z" fill="url(#silver)" stroke="#6c6d70" strokeWidth="0.6" />
          </g>
        )}

        {/* wing-3: Pitch black matte bird feather segments with mesh vents */}
        {id === "wing-3" && (
          <g transform="translate(130, 80) scale(1.3)">
            <path d="M -20 -8 C -35 -12, -42 2, -38 12 Q -20 18, -2 4 Z" fill="#181a1d" stroke="#333" strokeWidth="1" />
            <path d="M 15 -8 C 0 -12, -7 2, -3 12 Q 15 18, 33 4 Z" fill="#181a1d" stroke="#333" strokeWidth="1" />
            <line x1="-15" y1="0" x2="-25" y2="4" stroke="#555" strokeWidth="1" />
            <line x1="20" y1="0" x2="10" y2="4" stroke="#555" strokeWidth="1" />
          </g>
        )}

        {/* wing-4: Streamlined parallel wind turbine silver wire curves */}
        {id === "wing-4" && (
          <g transform="translate(140, 80) scale(1.3)">
            <path d="M -40 -6 Q 0 -15, 40 -6" stroke="url(#silver)" strokeWidth="2" strokeLinecap="round" />
            <path d="M -40 2 Q 0 -7, 40 2" stroke="url(#silver)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M -40 10 Q 0 1, 40 10" stroke="url(#silver)" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
          </g>
        )}

        {/* pattern-1: Polished silver coin with engraved Lotus flowers (Yeonhwamun) */}
        {id === "pattern-1" && (
          <g transform="translate(150, 82) scale(1.4)">
            <circle cx="0" cy="0" r="10" fill="none" stroke="url(#silver)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="8.5" fill="url(#silver)" />
            <circle cx="0" cy="0" r="4.5" fill="none" stroke="#222" strokeWidth="0.8" />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#111" strokeWidth="0.6" />
            <line x1="0" y1="-7" x2="0" y2="7" stroke="#111" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="2" fill="#fff" />
          </g>
        )}

        {/* pattern-2: Clear honey acetate showing gold vine core wire (Dangchomun) */}
        {id === "pattern-2" && (
          <g transform="translate(70, 82) scale(1.3)">
            <path d="M 0 0 Q 40 -12, 80 0 T 160 0" stroke="url(#gold)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="40" cy="-3" r="2.5" fill="none" stroke="url(#gold)" strokeWidth="0.8" />
            <circle cx="120" cy="3" r="2.5" fill="none" stroke="url(#gold)" strokeWidth="0.8" />
          </g>
        )}

        {/* pattern-3: Close up intricate geometric checking lines trellis pattern (Gyeokjamun) */}
        {id === "pattern-3" && (
          <g transform="translate(100, 74) scale(1.35)">
            <rect x="0" y="0" width="70" height="11" fill="none" stroke="url(#silver)" strokeWidth="1.2" />
            <line x1="14" y1="0" x2="14" y2="11" stroke="url(#silver)" strokeWidth="0.8" />
            <line x1="28" y1="0" x2="28" y2="11" stroke="url(#silver)" strokeWidth="0.8" />
            <line x1="42" y1="0" x2="42" y2="11" stroke="url(#silver)" strokeWidth="0.8" />
            <line x1="56" y1="0" x2="56" y2="11" stroke="url(#silver)" strokeWidth="0.8" />
            <line x1="0" y1="5.5" x2="70" y2="5.5" stroke="url(#silver)" strokeWidth="0.8" />
          </g>
        )}

        {/* pattern-4: High resolution round enamel red-blue-yellow Samtaegeuk medallion */}
        {id === "pattern-4" && (
          <g transform="translate(150, 82) scale(1.5)">
            <circle cx="0" cy="0" r="10" fill="#111" stroke="#eae4d3" strokeWidth="1" />
            <path d="M 0 0 A 10 10 0 0 1 10 0 A 5 5 0 0 1 5 5 A 5 5 0 0 0 0 0 Z" fill="#ffcd00" />
            <path d="M 0 0 A 10 10 0 0 1 -5 8.6 A 5 5 0 0 1 -6.8 -2.5 A 5 5 0 0 0 0 0 Z" fill="#0047a0" />
            <path d="M 0 0 A 10 10 0 0 1 -5 -8.6 A 5 5 0 0 1 1.8 -5 A 5 5 0 0 0 0 0 Z" fill="#cd2e3a" />
            <circle cx="0" cy="0" r="2" fill="url(#gold)" />
          </g>
        )}

        {/* craft-2: Iridescent pearl glowing horizontal medallion strip */}
        {id === "craft-2" && (
          <path d="M 60 82 H 240" stroke="url(#najeon)" strokeWidth="5" strokeLinecap="round" opacity="0.95" />
        )}
      </svg>
    );
  }

  return null;
}
