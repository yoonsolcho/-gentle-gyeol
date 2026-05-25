import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { productsData } from '../data/products';
import GlassesRenderer from './GlassesRenderer';

interface Props {
  activeCollection: string;
}

export default function ProductGrid({ activeCollection }: Props) {
  // Filter products by the chosen collection
  const filteredProducts = productsData.filter(
    (p) => p.category === activeCollection
  );

  return (
    <section className="relative py-12 md:py-20 px-6 md:px-12 bg-brand-bg overflow-hidden">
      <div className="pattern-overlay opacity-[0.02]" />
      
      {/* Dynamic Collection Info Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 px-4">
        <motion.div
          key={activeCollection}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl mb-4 font-bold tracking-tight">
            2026 {activeCollection}
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-brand-ink/70">
            {activeCollection === "전통공예" && 
              "한국 전통공예의 섬세한 숨결과 나전, 백자, 은사의 은은한 텍스처를 젠틀몬스터의 정교한 실루엣에 온전히 담았습니다."}
            {activeCollection === "꽃 컬렉션" && 
              "매화, 벚꽃, 연꽃, 국화의 여리지만 기품 있는 매력을 정교한 수공예 메탈 꽃 문양 조각으로 완성한 한정 레벨 피스."}
            {activeCollection === "궁궐 컬렉션" && 
              "전통 기와지붕의 부드러운 곡선 미학(기와)과 아름다운 전통 창살 격자 격문(창호)을 웅장하고 미니멀한 블랙 프레임속에 조화시켰습니다."}
            {activeCollection === "날개 컬렉션" && 
              "비상하는 날갯깃의 입체적인 바람 결을 금빛과 은빛 크롬의 경이로운 하이테크 유선형 구조로 재해석한 아방가르드 컬렉션."}
            {activeCollection === "문양 컬렉션" && 
              "아름다운 전통 문양 속 길상의 의미를 담은 연화문, 당초문 및 삼태극 엠블럼 장인의 세밀한 손길로 제작된 디테일 프레임."}
          </p>
        </motion.div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col group cursor-pointer"
            >
              {/* Image / SVG Container on a beautiful premium gray background */}
              <div className="h-[280px] w-full bg-[#f0f1f2] rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden transition-all duration-300 hover:bg-[#ebeced]">
                {/* Clean soft shadow beneath glasses inside display box */}
                <div className="absolute w-[60%] h-4 bottom-10 bg-black/[0.04] blur-lg rounded-full" />
                
                {/* Render the realistic vector representation */}
                <GlassesRenderer id={p.id} />
                
                {/* Status Tags */}
                {p.soldOut && (
                  <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase rounded-full">
                    품절
                  </span>
                )}
                {p.statusText && !p.soldOut && (
                  <span className="absolute top-4 left-4 bg-[#7e8287] text-white text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase rounded-full">
                    {p.statusText}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="px-1 flex flex-col gap-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[17px] font-bold tracking-tight text-brand-ink/90 group-hover:text-brand-ink transition-colors leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-[11px] font-mono tracking-widest text-[#888] uppercase mt-0.5">
                      {p.engName}
                    </p>
                  </div>
                  <button className="p-1 hover:bg-black/5 rounded-full transition-colors group/heart">
                    <Heart size={18} className="opacity-30 group-hover/heart:opacity-100 transition-opacity" />
                  </button>
                </div>
                
                <div className="mt-1 flex items-center justify-between">
                  <span className={`text-[15px] font-semibold ${p.soldOut ? 'text-black/40 line-through' : 'text-brand-ink/80'}`}>
                    {p.price}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
