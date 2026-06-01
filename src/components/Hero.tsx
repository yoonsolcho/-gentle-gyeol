import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Props {
  onOpenStory?: () => void;
}

export default function Hero({ onOpenStory }: Props) {
  const [bgImage, setBgImage] = useState<string>('/assets/sections/hero_bg.jpeg');

  useEffect(() => {
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
  }, []);

  return (
    <section 
      className="relative h-[620px] overflow-hidden bg-cover bg-center transition-all duration-700 ease-in-out" 
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(244,245,246,0.65) 0%, rgba(244,245,246,0.4) 40%, rgba(244,245,246,0) 85%), linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(244,245,246,0.4) 100%), url('${bgImage}')` 
      }}
    >
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
    </section>
  );
}
