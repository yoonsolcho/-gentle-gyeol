import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Target, Sparkles, Award, ArrowLeft } from 'lucide-react';

const Highlight = ({ children }: { children: ReactNode }) => (
  <span className="bg-[#f2ede9] text-[#2d2a26] font-bold px-1.5 py-0.5 rounded border-b border-[#dfd7ce] transition-colors">
    {children}
  </span>
);

const storyTabs = [
  {
    id: "overview",
    label: "프로젝트 개요",
    title: "결의 시선 (GENTLE 結)",
    icon: Eye,
    description: (
      <span>
        한국 특유의 깊이와 장인정신이 깃든 <Highlight>전통 금속공예 기법</Highlight>에 글로벌 대표 아이웨어 브랜드 젠틀몬스터의 가장 <Highlight>전위적이고 실험적인 아이덴티티</Highlight>를 조화롭게 결합한 특별한 콜라보레이션입니다.
      </span>
    ),
    bullets: [
      { t: "팀 브랜드 명칭", d: (
        <span>
          <Highlight>GENTLE 結(젠틀결)</Highlight>은 글로벌 브랜드 젠틀몬스터의 명칭에 ‘맺다, 연결하다, 조화로운 무늬’ 등의 아름다운 다중적 의미를 지닌 한자 결(結)을 조화롭게 융합하여 특별하게 완성되었습니다.
        </span>
      ) },
      { t: "기획 배경 & 미션", d: (
        <span>
          K-컬처의 위상에 비해 경험할 기회가 적었던 <Highlight>한국 고유문화 전통의 미</Highlight>를 가장 트렌디하고 세련된 현대인들의 일상 아이템인 <Highlight>아이웨어 오브제 디테일</Highlight> 속에 녹녹한 숨결처럼 새롭게 완벽하게 재탄생시켰습니다.
        </span>
      ) },
      { t: "박물관을 벗어난 우리 문화", d: (
        <span>
          화려한 박물관 쇼케이스 내부에만 갇혀 있던 차가운 유물이 아니라, 얼굴 일상 속 피부에 닿는 감각적인 터치와 프레임으로서 매일 마주하며 <Highlight>전통 미학의 가치와 직접 호흡</Highlight>할 수 있도록 설계했습니다.
        </span>
      ) }
    ]
  },
  {
    id: "target",
    label: "해석 & 시장 분석",
    title: "독창적인 영역의 개척",
    icon: Target,
    description: (
      <span>
        최근 뜨겁게 떠오르는 전통과 '힙함'의 단순 결합을 넘어서, 한국 궁궐의 미학과 깊이 있는 조형미를 시대를 초월한 세련된 감각이자 패셔너블한 디자인 언어로 완벽히 진화시켜 선보입니다.
      </span>
    ),
    bullets: [
      { t: "핵심 수용자 그룹", d: (
        <span>
          자신만의 독창적인 헤리티지와 차별화된 안목을 표현하고 싶어 하는 <Highlight>글로벌 및 국내 2030 영 제너레이션</Highlight>을 타겟하여, 차원 높은 문화 감수성과 소장 가치를 확실히 만족하게 합니다.
        </span>
      ) },
      { t: "글로벌 관광객", d: (
        <span>
          단순히 한국을 다녀가는 일회성 기념품 소비를 아스라이 뛰어넘어, 전 세계 어디에서든 어필할 수 있는 품격 있고 유니크한 <Highlight>하이엔드 패션 예술 오브제</Highlight>로 우리 문화의 정취를 전파합니다.
        </span>
      ) },
      { t: "아이웨어 블루오션 개척", d: (
        <span>
          전통 문화가 지닌 정적인 장식품 프레임을 탈피하여, 매일 착용하고 감상할 수 있는 <Highlight>고부가가치의 프리미엄 패션 기어</Highlight>와 유서 깊은 결을 접목함으로써 시장의 새로운 길을 개척합니다.
        </span>
      ) }
    ]
  },
  {
    id: "craft",
    label: "공예 & 기술",
    title: "전통 4대 수공예 기법의 현대적 고증",
    icon: Sparkles,
    description: (
      <span>
        우아하고 수준 높은 한정판 안경테의 메탈 파츠 브릿지와 힌지는 대한민국 최고의 전통을 계승하는 <Highlight>국가무형유산 전문 장인</Highlight>들과 협업하며 천 년 역사 속 정통 <Highlight>4대 전통 기법</Highlight>에서 정수를 얻었습니다.
      </span>
    ),
    bullets: [
      { t: "주조 (Casting)", d: (
        <span>
          뜨겁게 정제된 은(Silver) 원료를 입체 기하학 틀에 미세하게 은입하여 제품 전체 프레임 중심을 든든하고 단단하게 잡아주는 <Highlight>전통 메탈 브릿지와 코어의 기초 뼈대</Highlight>를 탄생시켰습니다.
        </span>
      ) },
      { t: "단조 (Forging)", d: (
        <span>
          고온의 뜨거운 가마 불길 속에서 금속재를 수만 번 두들겨 정교화하며, 기와 지붕의 자연스럽고 완만한 곡선과 <Highlight>봉황 무늬의 섬세한 깃털 곡선</Highlight>을 수공예 단조 기법으로 극대화하여 연출하였습니다.
        </span>
      ) },
      { t: "입사 (Engraving)", d: (
        <span>
          견고하고 영롱한 티타늄 표면 위에 미세한 음각 선을 조각한 후, 머리카락보다 얇은 은실(silver thread)을 손으로 정교하게 짜서 채워 넣는 <Highlight>전통 은입사 기법</Highlight>을 통해 격조 높은 품위를 완성했습니다.
        </span>
      ) },
      { t: "칠보 (Cloisonné)", d: (
        <span>
          금속 파츠 표면에 정제 유약을 세밀하게 붓질하고 800도 고온에서 재차 구워내어 유리질 특유의 맑고 깊이감 있는 투명한 푸른 광택을 형성함으로써, <Highlight>전통 단청 문양의 신비롭고 은은한 색감</Highlight>을 완벽하게 수놓았습니다.
        </span>
      ) }
    ]
  },
  {
    id: "impact",
    label: "기대 효과 & 가치",
    title: "한국 공예의 지속 성장 비전",
    icon: Award,
    description: (
      <span>
        이번 협업 프로젝트를 통해, 박물관에 갇혀 있던 옛 전통과 오늘날의 현대 예술이 상생 협력하여 전 세계의 이목을 장인정신에 집중시키고 새로운 형태의 깊이 있는 <Highlight>사회문화적 공명과 패러다임 변화</Highlight>를 견인합니다.
      </span>
    ),
    bullets: [
      { t: "K-공예의 본격 세계화", d: (
        <span>
          유럽 비엔날레나 공예전 등의 정적인 전시 공간에서 머물던 패러다임을 넓혀, 트렌디한 아이웨어 컬렉션으로 <Highlight>글로벌 주요 라이프스타일 중심지</Highlight>에 가장 강렬하고 현대적으로 공예 장인의 고결한 정수를 타격합니다.
        </span>
      ) },
      { t: "무형문화인 경제성 확보", d: (
        <span>
          정부 지원 등의 보존에만 의지하던 무형문화재 장인분들이 동시대 디자인 전문가들과 적극적으로 수평 협력하여 자부심을 되살리고 <Highlight>전통 기술의 자생적인 현대 순환 경제 활로</Highlight>를 세워갑니다.
        </span>
      ) },
      { t: "일상의 감각 학습", d: (
        <span>
          밀레니얼 및 Z세대 등 문화 소구력이 높은 대중들에게 가닿아 문양(매화의 고고함, 기와의 안락, 봉황의 길상)이 품은 풍요로운 인문학적 의미를 <Highlight>일상 속에서 세련되고 감각적인 소장 경험</Highlight>을 일깨우는 교육적 역할을 합니다.
        </span>
      ) }
    ]
  }
];

interface Props {
  onBack: () => void;
}

export default function Story({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const activeContent = storyTabs.find(tab => tab.id === activeTab) || storyTabs[0];
  const IconComponent = activeContent.icon;

  useEffect(() => {
    // Scroll to top when loading story page
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="bg-[#faf9f8] min-h-screen pt-[96px] pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-black/5 pb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-brand-ink/60 hover:text-brand-ink transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>컬렉션 쇼룸으로 돌아가기</span>
          </button>
        </div>

        {/* Editorial Title Header */}
        <div className="mb-14">
          <span className="text-xs font-bold tracking-[0.2em] text-[#a89c92] font-mono uppercase block mb-3">BRAND ARCHIVE</span>
          <h1 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-brand-ink leading-tight mb-5">
            전통의 결을 엮어<br className="md:hidden" /> 현대적 가치를 창조하다
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-brand-ink/70 break-keep">
            '결의 시선(GENTLE 結)'은 한자 결(結)의 가치관을 받들어 기획되었습니다. 한국 전통 미학의 깊이와 정교함이 깃든 장인정신, 그리고 세련되고 미래지향적인 젠틀몬스터의 디자인 철학이 만나 이룩한 아이웨어 시나리오를 들여다봅니다.
          </p>
        </div>

        {/* Interactive Story Section Display */}
        <div className="bg-white border border-black/5 shadow-sm rounded-3xl overflow-hidden min-h-[500px] flex flex-col">
          {/* Custom Story Tab Selection Bar */}
          <div className="px-6 md:px-10 py-5 bg-[#faf9f8] border-b border-black/5 flex gap-2.5 overflow-x-auto no-scrollbar">
            {storyTabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold tracking-tight transition-all rounded-full border whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-brand-ink border-brand-ink text-white shadow-sm"
                      : "bg-white border-black/10 text-brand-ink/75 hover:bg-black/5"
                  }`}
                >
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Screen Content */}
          <div className="flex-1 p-8 md:p-12 lg:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
              >
                {/* Visual Left Editorial Body */}
                <div className="lg:col-span-5 flex flex-col">
                  <div className="flex items-center gap-2.5 mb-4 text-[#8e7e72]">
                    <IconComponent size={22} className="stroke-[1.8]" />
                    <span className="text-xs font-semibold tracking-wider font-mono">
                      CHAPTER {storyTabs.findIndex(t => t.id === activeTab) + 1} • {activeTab.toUpperCase()}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-2xl md:text-3xl font-normal leading-tight tracking-tight text-brand-ink mb-6 break-keep">
                    {activeContent.title}
                  </h2>
                  
                  <p className="text-sm md:text-[15px] leading-relaxed text-brand-ink/80 font-medium break-keep">
                    {activeContent.description}
                  </p>
                </div>

                {/* Bullet Right Detailed Info Points */}
                <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-black/10 pt-8 lg:pt-0 lg:pl-10 flex flex-col gap-5">
                  {activeContent.bullets.map((b, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#faf9f8]/60 hover:bg-[#faf9f8] hover:shadow-sm border border-black/5 p-5 rounded-2xl transition-all duration-300 flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[9px] font-mono tracking-wider font-bold text-[#8e7e72] bg-[#f0ece9] px-2 py-0.5 rounded-md border border-[#dfd7cf]/50 whitespace-nowrap">
                          POINT 0{idx + 1}
                        </span>
                        <h3 className="font-sans text-sm font-bold text-brand-ink tracking-tight">
                          {b.t}
                        </h3>
                      </div>
                      <div className="text-[13px] md:text-[13.5px] leading-relaxed text-brand-ink/75 font-medium break-keep">
                        {b.d}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Editorial Action Bottom Footer Button */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={onBack}
            className="px-10 py-4 bg-brand-ink hover:opacity-95 text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-opacity cursor-pointer shadow-md"
          >
            컬렉션 쇼룸 보러가기 ↗
          </button>
        </div>
      </div>
    </div>
  );
}
