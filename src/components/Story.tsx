import { motion } from 'motion/react';

const keywords = ["은은한 자개 패턴", "청화백자 블루", "단청 라인 디테일", "한지 질감 패키지", "장인 협업 스토리"];

export default function Story() {
  return (
    <section className="relative min-height-[390px] py-24 px-6 md:px-12 overflow-hidden bg-brand-bg">
      <div className="pattern-overlay" />
      
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl mb-6 tracking-tight"
        >
          CRAFTED SILENCE
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[720px] text-lg md:text-xl leading-relaxed text-brand-ink/90"
        >
          이번 컬렉션은 젠틀몬스터의 실험적인 형태감에 한국 전통 문양을 거의 드러나지 않게 입힌 것이 특징입니다.
          가까이서 보았을 때만 보이는 자개빛 패턴, 청화백자의 곡선, 단청의 반복적 리듬을 프레임 안쪽과 템플 라인에 배치해
          과하지 않지만 오래 남는 인상을 만듭니다.
        </motion.p>

        <div className="flex flex-wrap gap-3 mt-10">
          {keywords.map((kw, i) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-4 py-2 bg-white/40 backdrop-blur-md border border-black/10 rounded-full text-sm font-medium text-brand-ink/70"
            >
              {kw}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
