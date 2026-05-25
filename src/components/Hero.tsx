import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-[620px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(244,245,246,0.95)), url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1800&q=80')` }}>
      <div className="pattern-overlay" />
      
      <div className="absolute left-6 md:left-12 bottom-16 max-w-[520px] z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-[13px] tracking-[0.2em] mb-4 opacity-80 font-bold">KOREAN CRAFT COLLABORATION</div>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-6 tracking-tight">
            GENTLE MONSTER × <br />전통공예 컬렉션
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-brand-ink/80 mb-8 font-medium">
            한국 전통공예의 섬세한 결, 은은한 문양, 장인의 손끝에서 탄생한 소재감을
            현대적인 아이웨어 실루엣 안에 담았습니다.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 font-bold border-b border-current pb-1 hover:opacity-60 transition-opacity"
          >
            스토리 보기 ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
