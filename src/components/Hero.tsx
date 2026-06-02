import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Props {
  onOpenStory?: () => void;
}

export default function Hero({ onOpenStory }: Props) {
  const [bgImage, setBgImage] = useState<string>('/assets/sections/hero_bg.jpeg');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const latestPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch-only screens (mobiles/tablets) to skip cursor overrides
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);

    // Verify that the custom background image exists and has valid dimensions
    const customImg = new Image();
    customImg.src = '/assets/sections/hero_bg.jpeg';
    customImg.onload = () => {
      if (customImg.width === 0 || customImg.height === 0) {
        // Fallback if the file is empty/invalid
        setBgImage('/assets/products/꽃/매화/매화_제품상세컷2.jpeg');
      }
    };
    customImg.onerror = () => {
      // Fallback if the custom file fails to load
      setBgImage('/assets/products/꽃/매화/매화_제품상세컷2.jpeg');
    };

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice || !cursorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    
    latestPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // requestAnimationFrame throttling to guarantee perfect buttery 120fps+ response and zero lag
    if (requestRef.current === null) {
      requestRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.left = `${latestPos.current.x}px`;
          cursorRef.current.style.top = `${latestPos.current.y}px`;
        }
        requestRef.current = null;
      });
    }
  };

  return (
    <section 
      className={`relative h-[620px] overflow-hidden bg-cover bg-center transition-all duration-700 ease-in-out ${
        !isTouchDevice ? 'md:cursor-none' : ''
      }`} 
      style={{ backgroundImage: `url('${bgImage}')` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Responsive light wash gradient layers for optimal text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f4f5f6]/92 via-[#f4f5f6]/75 to-transparent md:from-[#f4f5f6]/65 md:via-[#f4f5f6]/30 md:to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#f4f5f6]/95 via-transparent to-transparent z-0 pointer-events-none" />

      <div className="pattern-overlay" style={{ opacity: 0.03 }} />
      
      <div className="absolute left-6 md:left-12 bottom-16 max-w-[620px] z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-[11px] md:text-[12px] tracking-[0.2em] mb-3 text-brand-ink/80 font-bold uppercase">GENTLE 結 • KOREAN ARTISANSHIP COLLABORATION</div>
          <h1 className="font-serif text-4xl md:text-[48px] font-medium leading-[1.1] mb-5 tracking-tight text-brand-ink break-keep">
            GENTLE MONSTER × <br />결의 시선
          </h1>
          <p className="text-[15px] md:text-[17px] leading-relaxed text-brand-ink/90 mb-6 font-medium break-keep">
            젠틀몬스터의 세련되고 조형적인 미학과 전통 한자 '결(結, 맺다•연결하다•무늬)'의 이념이 깃든 장인의 세밀한 공예 기법을 융합한 뉴-아이웨어 컬렉션입니다.
          </p>
          <button
            onClick={onOpenStory}
            className="inline-flex items-center gap-1.5 text-[11px] md:text-[12.5px] font-bold text-stone-500 border-b border-stone-500/50 pb-0.5 hover:text-brand-ink hover:border-brand-ink transition-all duration-300 cursor-pointer"
          >
            기획 스토리 보기 ↗
          </button>
        </motion.div>
      </div>

      {/* Dynamic Water Droplet Magnifying Glass Cursor */}
      {!isTouchDevice && (
        <div
          ref={cursorRef}
          className="absolute pointer-events-none z-45 w-16 h-16 rounded-full flex items-center justify-center will-change-[left,top,transform,opacity]"
          style={{
            left: '-100px',
            top: '-100px',
            transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.15)' : 'scale(0)'}`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 250ms ease-out, transform 250ms ease-out',
            background: 'rgba(255, 255, 255, 0.005)',
            backdropFilter: 'blur(0.3px) contrast(1.12) brightness(1.04) saturate(1.12)',
            WebkitBackdropFilter: 'blur(0.3px) contrast(1.12) brightness(1.04) saturate(1.12)',
            borderTop: '1px solid rgba(255, 255, 255, 0.45)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.40)',
            borderRight: '1px solid rgba(17, 17, 17, 0.04)',
            borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
            boxShadow: `
              inset -8px -8px 12px rgba(0, 0, 0, 0.05), 
              inset 5px 5px 10px rgba(255, 255, 255, 0.65), 
              0 8px 18px -4px rgba(0, 0, 0, 0.1), 
              0 3px 6px -1px rgba(0, 0, 0, 0.03),
              inset 0 -2px 4px rgba(255, 255, 255, 0.35)
            `,
          }}
        >
          {/* Main primary lightsource reflection (crisp, curved high-contrast meniscus gloss with lower opacity) */}
          <div className="absolute top-[8px] left-[13px] w-4 h-1.5 bg-white/18 rounded-[50%_50%_35%_35%] filter blur-[0.2px] rotate-[-22deg] pointer-events-none" />
          
          {/* Secondary pin-point pin reflection (ultra-sharp light glint with lower opacity) */}
          <div className="absolute top-[11px] left-[11px] w-0.5 h-0.5 bg-white/25 rounded-full pointer-events-none" />
          
          {/* Internal gradient water-volume depth contour ring */}
          <div className="absolute inset-1.5 border border-white/5 rounded-full pointer-events-none filter blur-[0.1px]" />
          
          {/* Bottom refracted light pooling (caustic focus pool opposite to light source with 20% opacity) */}
          <div className="absolute bottom-2 right-[12px] w-4 h-1.5 bg-white/20 rounded-full filter blur-[0.6px] rotate-[15deg] pointer-events-none shadow-[0_0_3px_rgba(255,255,255,0.25)]" />
          
          {/* Very faint inner center shadow for extra depth */}
          <div className="w-1 h-1 rounded-full bg-black/5 pointer-events-none filter blur-[0.5px]" />
        </div>
      )}
    </section>
  );
}
