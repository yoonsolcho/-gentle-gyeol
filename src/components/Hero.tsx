import { motion } from 'motion/react';

interface Props {
  onOpenStory?: () => void;
}

export default function Hero({ onOpenStory }: Props) {
  return (
    <section className="relative h-[620px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(244,245,246,0.95)), url('/assets/products/꽃/매화/매화_제품상세컷2.jpeg')` }}>
      <div className="pattern-overlay" />
      
      <div className="absolute left-6 md:left-12 bottom-16 max-w-[620px] z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-[13px] tracking-[0.2em] mb-4 opacity-80 font-bold uppercase">GENTLE 結 • KOREAN ARTISANSHIP COLLABORATION</div>
          <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] mb-6 tracking-tight break-keep">
            GENTLE MONSTER × <br />결의 시선
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-brand-ink/80 mb-8 font-medium break-keep">
            젠틀몬스터의 세련되고 조형적인 미학과 전통 한자 '결(結, 맺다•연결하다•무늬)'의 이념이 깃든 장인의 세밀한 공예 기법을 융합한 뉴-아이웨어 컬렉션입니다.
          </p>
          <button
            onClick={onOpenStory}
            className="inline-flex items-center gap-2 font-bold border-b border-current pb-1 hover:opacity-60 transition-opacity cursor-pointer"
          >
            기획 스토리 보기 ↗
          </button>
        </motion.div>
      </div>
    </section>
  );
}
