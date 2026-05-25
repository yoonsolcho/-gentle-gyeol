import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Target, Sparkles, Award } from 'lucide-react';

const storyTabs = [
  {
    id: "overview",
    label: "프로젝트 개요",
    title: "결의 시선 (GENTLE 結)",
    icon: Eye,
    description: "한국 특유의 깊이와 장인정신이 깃든 전통 금속공예에 글로벌 아이웨어 브랜드 젠틀몬스터의 전위적이고 실험적인 아이덴티티를 융합했습니다.",
    bullets: [
      { t: "팀 브랜드 명칭", d: "GENTLE 結(젠틀결): 젠틀몬스터의 GENTLE에 맺다, 연결하다, 무늬(정교한 조각)의 중의적 뜻을 가진 한자 결(結)을 조화시켰습니다." },
      { t: "기획 배경 & 미션", d: "K-컬처의 위상에 비해 기회가 적었던 한국 고유 전통의 미를 가장 트렌디하고 세련된 일상의 현대 아이웨어 디테일로 재탄생시킵니다." },
      { t: "박물관을 벗어난 우리 문화", d: "화려한 무대와 활자 속 유물이 아니라, 얼굴 위에 직접 착용하는 감각적인 촉감과 시야의 오브제로서 전통을 호흡하도록 기획했습니다." }
    ]
  },
  {
    id: "target",
    label: "해석 & 시장 분석",
    title: "독창적인 영역의 개척",
    icon: Target,
    description: "최근 부상하는 전통과 힙함의 결합 속에서, 단순 소장품 수준의 자개 굿즈나 식음료 디저트를 뛰어넘겠다는 비전을 수립했습니다.",
    bullets: [
      { t: "핵심 수용자 그룹", d: "자신의 독창적인 정체성과 남다른 명품 안목을 패션으로 표현하는 것에 능한 국내외 2030 밀레니얼 및 Z세대." },
      { t: "글로벌 관광객", d: "한국의 소중한 명절, 궁궐 등 전통 유산을 시대를 관통하는 동시대 현대 명품 디자인 언어로 체험하고자 하는 외국인 소비자." },
      { t: "아이웨어 블루오션 개척", d: "기성 라이프스타일 디자인 품목에 머물러 있던 공예 영역을, 브랜드 파워와 조형미가 보증된 프리미엄 소수 한정 아이웨어와 결합합니다." }
    ]
  },
  {
    id: "techniques",
    label: "금속공예 4대 기법",
    title: "장인 손길의 4대 금속 기법",
    icon: Sparkles,
    description: "한정 레벨로 전개되는 안경 프레임의 모든 메탈 파츠는 대한민국 국가무형유산 장인들의 정통 4대 수공예 제작 기법을 충실히 고증합니다.",
    bullets: [
      { t: "주조 (Casting)", d: "쇳물 및 녹인 액상 은(Silver)을 기하학적 형태의 거푸집에 세밀하게 주입하여 견고한 메탈 브릿지와 코어 기틀을 잡습니다." },
      { t: "단조 (Forging)", d: "시뻘건 고온의 불길 속에서 달구어 조이고, 손수 망치질로 극도로 얇은 기와 곡선과 봉황 등의 미세 곡선부를 성형합니다." },
      { t: "입사 (Engraving)", d: "가볍고 견고한 티타늄 프레임 위를 미세한 정으로 일일이 쪼아 만든 격자 홈 사이에 순백색 백자 은사를 단단히 박아내는 기술입니다." },
      { t: "칠보 (Cloisonné)", d: "구리와 금속 조형 위에 투명한 무기질 오색 유약을 도포하고, 최고의 고온 가마에서 구워내 단청 고유의 발색을 실현합니다." }
    ]
  },
  {
    id: "impact",
    label: "기대 효과 & 가치",
    title: "한국 공예의 지속 성장 비전",
    icon: Award,
    description: "이번 프로젝트가 성공했을 때, 전통과 현대가 동반 성장하고 전 세계 시선이 전통 기예에 머무는 사회 문화적 울림을 기대하고 있습니다.",
    bullets: [
      { t: "K-공예의 본격 세계화", d: "젠틀몬스터의 파괴적 글로벌 리테일 채널을 무대로, 세계 패션의 메카 한복판에서 한국 순수 전통 장인 기풍의 정수를 타격합니다." },
      { t: "무형문화인 경제성 확보", d: "단순 보존에 의지하던 문화재 장인과 글로벌 디자이너 집단과의 직접적 협력을 통한 자생적 경제 창구의 활성화 모델을 건립합니다." },
      { t: "일상의 감각 학습", d: "팝업스토어 및 트렌디 소셜 네트워크 공유 문화를 통해 아름다운 전통 문양과 길상의 뜻(새해 매화, 기와, 태극 등)을 젊은층에 학습시킵니다." }
    ]
  }
];

export default function Story() {
  const [activeTab, setActiveTab] = useState("overview");
  const activeContent = storyTabs.find(tab => tab.id === activeTab) || storyTabs[0];
  const IconComponent = activeContent.icon;

  return (
    <section id="story-section" className="relative py-20 px-6 md:px-12 overflow-hidden bg-[#fafafa] border-t border-black/5 scroll-mt-[72px]">
      <div className="pattern-overlay opacity-[0.01]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs tracking-[0.2em] opacity-50 font-bold block mb-2 font-mono uppercase">ABOUT PROJECT</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-ink">
              기획 배경 & 스토리
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {storyTabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-tight transition-all rounded-full border ${
                    activeTab === tab.id
                      ? "bg-brand-ink border-brand-ink text-white"
                      : "bg-white border-black/10 text-brand-ink/75 hover:bg-black/5"
                  }`}
                >
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Panel with motion animations */}
        <div className="bg-white border border-black/5 rounded-3xl p-8 md:p-12 min-h-[350px] shadow-sm flex flex-col md:flex-row gap-8 items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col md:flex-row gap-8 lg:gap-12"
            >
              {/* Left Column Description */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4 text-[#8e7e72]">
                  <IconComponent size={24} className="stroke-[1.8]" />
                  <span className="text-sm font-semibold tracking-wider font-mono">
                    {activeTab.toUpperCase()} PANEL
                  </span>
                </div>
                <h3 className="font-serif text-2.5xl md:text-3xl font-bold leading-tight tracking-tight text-brand-ink mb-6 break-keep">
                  {activeContent.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-brand-ink/70 break-keep font-medium">
                  {activeContent.description}
                </p>
              </div>

              {/* Right Column Core Bullets */}
              <div className="flex-1 border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-8 lg:pl-12 flex flex-col gap-6">
                {activeContent.bullets.map((b, idx) => (
                  <div key={idx} className="flex flex-col gap-1 pr-2">
                    <span className="text-[11px] font-bold tracking-widest text-[#a89c92] uppercase">
                      0{idx + 1}. {b.t}
                    </span>
                    <p className="text-[13px] leading-relaxed text-brand-ink/80 font-medium break-keep">
                      {b.d}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
