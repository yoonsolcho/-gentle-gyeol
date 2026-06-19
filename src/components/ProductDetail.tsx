import { useState, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Plus, Minus, MessageSquare, X, ArrowDown, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import { Product } from '../data/products';
import GlassesRenderer from './GlassesRenderer';

// Highlight component for premium textual popups
const Highlight = ({ children }: { children: ReactNode }) => (
  <span className="bg-[#f2ede9] text-[#2d2a26] font-bold px-1 py-0.5 rounded border-b border-[#dfd7ce]">
    {children}
  </span>
);

interface Props {
  product: Product;
  onBack: () => void;
  onSelectProduct?: (product: Product) => void;
  allProducts: Product[];
  wishlistItems?: Product[];
  onToggleWishlist?: (product: Product) => void;
  onAddToCart?: (product: Product, colorName: string) => void;
}

// Map database colors to premium visual names and colors
interface ColorOption {
  id: string;
  name: string;
  classes: string;
  desc: string;
}

const colorMaps: Record<string, ColorOption[]> = {
  silver: [
    { id: "silver-clear", name: "실버 / 클리어", classes: "bg-radial from-slate-200 to-slate-400", desc: "순백의 은을 활용한 초정밀 프레임" },
    { id: "silver-blue", name: "실버 / 마리나 블루", classes: "bg-radial from-blue-100 to-slate-300", desc: "은빛 광택에 깊이를 더한 푸른 렌즈" },
    { id: "silver-gold", name: "실버 / 황동 골드", classes: "bg-gradient-to-tr from-amber-200 via-slate-100 to-yellow-400", desc: "은입사 선과 조화로운 미세 금빛 코팅" }
  ],
  black: [
    { id: "black-dark", name: "블랙 / 오닉스 섀도우", classes: "bg-neutral-900", desc: "기와 먹색 고유의 은은하고 깊이 있는 검은 빛" },
    { id: "black-silver", name: "블랙 / 크롬 실버", classes: "bg-gradient-to-r from-neutral-900 via-neutral-500 to-neutral-900", desc: "블랙 아세테이트와 실버 브릿지 조화" },
    { id: "black-amber", name: "블랙 / 엠버 틴트", classes: "bg-gradient-to-tr from-[#1a110a] to-[#d97706]", desc: "수묵화 빛 번짐을 형상화한 호박색 필터" }
  ],
  gold: [
    { id: "gold-classic", name: "골드 / 브라운 마블", classes: "bg-radial from-yellow-100 via-yellow-400 to-amber-700", desc: "수공예 단조로 다듬은 귀품 있는 골드" },
    { id: "gold-clear", name: "골드 / 크리스탈 클리어", classes: "bg-radial from-yellow-200 to-slate-50", desc: "황금 빛 테에 영롱하고 투명한 프레임" },
    { id: "gold-dark", name: "골드 / 오닉스 블랙", classes: "bg-gradient-to-r from-yellow-500 to-neutral-950", desc: "단청 문양과 연결되는 중후한 컬러 대비" }
  ],
  rose: [
    { id: "rose-pink", name: "로즈골드 / 세레네 핑크", classes: "bg-radial from-rose-100 to-rose-300", desc: "벚꽃의 생명력을 수놓은 부드러운 분홍 광채" },
    { id: "rose-gold", name: "로즈골드 / 마블 샴페인", classes: "bg-radial from-rose-200 to-amber-200", desc: "화사함과 우아함을 겸비한 프리미엄 도금" },
    { id: "rose-dark", name: "로즈골드 / 가넷 브릭", classes: "bg-gradient-to-b from-rose-300 to-stone-800", desc: "투명하고 깊은 적빛 단청 렌즈 조합" }
  ],
  navy: [
    { id: "navy-blue", name: "네이비 / 딥 씨 사파이어", classes: "bg-radial from-blue-900 via-indigo-950 to-neutral-900", desc: "칠보 기법의 신비롭고 깊은 푸른빛" },
    { id: "navy-silver", name: "네이비 / 글로시 크롬", classes: "bg-gradient-to-r from-blue-950 to-slate-300", desc: "전통 나전과 어우러지는 백색 리플렉션" },
    { id: "navy-amber", name: "네이비 / 토파즈 황동", classes: "bg-gradient-to-tr from-blue-950 to-amber-600", desc: "칠보 광택에 차분한 앰버 렌즈의 결합" }
  ]
};

// Default setup in case product color doesn't match keys exactly in database
const defaultColors: ColorOption[] = [
  { id: "standard-silver", name: "실버 / 클리어", classes: "bg-radial from-slate-200 to-slate-400", desc: "전통 방식 주조로 단련한 맑은 금속 프레임" },
  { id: "standard-dark", name: "다크 크롬 / 틴트", classes: "bg-radial from-neutral-800 via-zinc-600 to-neutral-950", desc: "격조 높은 블랙 필터로 오묘한 시야감 제공" },
  { id: "standard-gold", name: "오레 골드 / 리치", classes: "bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-600", desc: "천 년 동안 변치 않는 유물의 영롱한 빛" }
];

// Helper sub-component to render thumbnail buttons with reliable loading fallback
function ThumbnailButton({
  imgUrl,
  index,
  isActive,
  onClick,
}: {
  key?: number;
  imgUrl: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [imgUrl]);

  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer relative bg-white flex items-center justify-center ${
        isActive 
          ? "opacity-100 scale-105 ring-2 ring-neutral-900 ring-offset-1 shadow-md" 
          : "opacity-50 hover:opacity-80"
      }`}
    >
      {!hasError ? (
        <img 
          src={imgUrl} 
          alt={`View ${index + 1}`} 
          className="w-full h-full object-contain p-1"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="text-[10px] font-extrabold text-neutral-500 uppercase flex flex-col items-center leading-none">
          <span className="text-[7px] text-neutral-400 font-mono tracking-wider mb-0.5">VIEW</span>
          <span>{index === 0 ? "대각" : index === 1 ? "정면" : index === 2 ? "측면" : `#${index + 1}`}</span>
        </div>
      )}
    </button>
  );
}

const getProductSpecificColor = (product: Product): ColorOption => {
  switch (product.id) {
    // 꽃 컬렉션
    case "flower-1": // 매화 01
      return { id: "silver-clear", name: "실버 / 클리어", classes: "bg-gradient-to-tr from-slate-200 to-slate-400 border border-slate-300/40", desc: "순백의 은을 활용한 초정밀 프레임" };
    case "flower-3": // 연꽃 02
      return { id: "platinum-clear", name: "플래티넘 / 크리스탈 클리어", classes: "bg-gradient-to-tr from-slate-100 to-slate-300 border border-slate-200/40", desc: "전통 은빛 주조 장인의 은빛 광채를 더한 백금 테" };
    case "flower-4": // 국화 03
      return { id: "gold-clear", name: "골드 / 크리스탈 클리어", classes: "bg-gradient-to-tr from-yellow-200 to-slate-50 border border-amber-300/20", desc: "황금 빛 테에 영롱하고 투명한 프레임" };

    // 궁궐 컬렉션
    case "palace-1": // 기와 01
      return { id: "black-dark", name: "블랙 / 오닉스 섀도우", classes: "bg-neutral-900 border border-neutral-800", desc: "기와 먹색 고유의 은은하고 깊이 있는 검은 빛" };
    case "palace-2": // 창호 02
      return { id: "matte-black", name: "매트 블랙 / 오닉스", classes: "bg-neutral-800 border border-neutral-700", desc: "차분하고 절제된 무광 택 기와의 먹색 빛" };
    case "palace-3": // 단청 03
      return { id: "translucent-clear", name: "트랜스루센트 / 클리어", classes: "bg-slate-100/60 border border-slate-200/50 shadow-inner", desc: "오묘한 반투명 테에 비치는 우아한 실버 와이어" };

    // 날개 컬렉션
    case "wing-1": // 비상 01
      return { id: "monochrome-gray", name: "모노크롬 / 그레이", classes: "bg-slate-300 border border-slate-400/30", desc: "날개의 미학을 은입사 라인으로 담아낸 다크 실버" };
    case "wing-2": // 천공 02
      return { id: "chrome-dark", name: "크롬 실버 / 다크 틴트", classes: "bg-gradient-to-b from-slate-400 to-zinc-700 border border-slate-500/40", desc: "빛나는 크롬 프레임과 깊은 사파이어 필터 렌즈" };
    case "wing-3": // 바람 03
      return { id: "titanium-clear", name: "내추럴 티타늄 / 클리어", classes: "bg-neutral-300 border border-neutral-400/30", desc: "고강도 티타늄 특유의 결을 살린 오리지널 매트 텍스처" };

    // 문양 컬렉션
    case "pattern-1": // 연화문 01
      return { id: "classic-black", name: "클래식 블랙 / 오닉스", classes: "bg-black border border-neutral-900", desc: "한국 기와의 단단하고 짙은 검은 광택을 재현한 오닉스 블랙" };
    case "pattern-2": // 당초문 02
      return { id: "amber-gold", name: "엠버 골드 / 브라운 틴트", classes: "bg-gradient-to-tr from-amber-600 to-yellow-300 border border-amber-400/40", desc: "우아하고 따뜻한 금빛 은입사 문양 프레임" };
    case "pattern-3": // 격자문 03
      return { id: "dark-grid", name: "다크 그리드 / 섀도우", classes: "bg-neutral-900 border border-neutral-700/50", desc: "수묵 격자 문양이 미세하게 레이어링된 단청 스퀘어 테" };

    default:
      return { id: "default-color", name: "스페셜 틴트 / 클리어", classes: "bg-gradient-to-tr from-slate-200 to-slate-400 border border-slate-300", desc: "수공 장식과 조화롭게 녹아드는 프리미엄 프레임 컬러" };
  }
};

export default function ProductDetail({ 
  product, 
  onBack, 
  onSelectProduct, 
  allProducts,
  wishlistItems = [],
  onToggleWishlist,
  onAddToCart
}: Props) {
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({
    preorder: false,
    shipping: false,
    detail: true,
  });

  const toggleTab = (tab: string) => {
    setOpenTabs(prev => ({ ...prev, [tab]: !prev[tab] }));
  };
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState(false);

  // Reset active image index and pre-warm detail images cache for instant zero-lag thumbnail switching
  useEffect(() => {
    setActiveImageIndex(0);
    setImageLoadError(false);

    // Dynamic pre-warm of other detail views for this product
    if (product.images?.detail) {
      product.images.detail.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [product.id]);

  // Reset image error state when active image index changes
  useEffect(() => {
    setImageLoadError(false);
  }, [activeImageIndex]);
  const isBookmarked = wishlistItems.some(w => w.id === product.id);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: `안녕하세요! '결의 시선' 라이브 컨시어지입니다. 선택하신 '${product.name}' 제품에 대해 궁금한 점이 있으시면 자유롭게 물어보세요.` }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Determine complementary colors
  const singleColor = getProductSpecificColor(product);
  const colorOptions = [singleColor];
  const currentColor = singleColor;

  // Auto-generate details based on products
  const features: Record<string, string[]> = {
    "flower": [
      "K-공예 오마주 꽃 컬렉션 스페셜 에디션",
      `${currentColor.desc}`,
      "천연 백합문/매화 정밀 금속 조각 힌지 및 오프닝 디테일",
      "전통 은입사(Engraving) 모티브의 이음부 수공 가공",
      "안정감을 보장하는 정밀 자생력 브릿지 구조",
      "UV 99.9% 완벽 차단 및 극도의 블루라이트 보호 특수 렌즈 장착"
    ],
    "palace": [
      "한국 유서 깊은 궁궐의 정취를 녹여낸 한정판 에디션",
      `${currentColor.desc}`,
      "눈가 전체와 부드럽게 대칭을 이루는 스퀘어 크롬 프레임",
      "전통 기와지붕의 완만한 곡선을 계승한 고밀도 아세테이트 템플",
      "동양인의 얼굴형에 최적화된 하이 어저스트 인체공학적 피팅 코받침",
      "UV 99.9% 완벽 차단 및 디지털 블루라이트 반사 차단 렌즈 수용"
    ],
    "wing": [
      "자유롭게 비상하는 봉황 물결 무늬 날개 컬렉션 라인",
      `${currentColor.desc}`,
      "세련되고 유연한 곡률을 자아내는 티타늄 금속 템플 탑재",
      "무형유산 조각 장인의 손끝에서 탄생한 미세 입체 단조 문양",
      "경량 하이엔드 테 특유의 깃털 같은 무게감과 최상의 착용 편안함",
      "UV 99.9% 블루라이트 차단 기능성 크리스탈 클리어 렌즈 탑재"
    ],
    "pattern": [
      "연화문, 당초문 고유 문양 길상의 안녕을 기원하는 아트 피스",
      `${currentColor.desc}`,
      "우아함과 클래식을 겸비한 엠블럼 주조 문양 각인",
      "티타늄 프레임 위 머리카락 보다 세세한 은입사 실가공",
      "장시간 착용에도 편안함이 흔들리지 않는 3D 텐션 스프링 힌지",
      "실내외 시야 보호 및 자외선 99.9%, 블루라이트 다중 차단 코팅 렌즈 고정"
    ],
    "craft": [
      "대한민국 전설적 공예 명장과 융합 협업한 리미티드 걸작",
      `${currentColor.desc}`,
      "전통 4대 공예 기법(주조·단조·입사·칠보)이 고스란히 담긴 파츠",
      "순은 및 프리미엄 고강도 티타늄의 최고급 연마 가공",
      "한국 단청 전통의 다채로운 가치가 마이크로 유리질 표면 속에 구현",
      "UV 99.9% & 블루라이트 차단율 극대화 렌즈"
    ]
  };

  const currentCategoryKey = product.id.split("-")[0];
  const listDetails = features[currentCategoryKey] || features["craft"];

  // Handle chatbot query
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");

    // Simulate smart bot response aligned with K-craft brand
    setTimeout(() => {
      let botResponse = "";
      const lower = userMsg.toLowerCase();
      if (lower.includes("가격") || lower.includes("얼마")) {
        botResponse = `선택하신 '${product.name}' 제품의 가격은 ${product.price}원입니다. 현재 젠틀몬스터 콜라보 특별 프로모션 적용 및 전 지역 무료 고속 배송 혜택이 적용됩니다.`;
      } else if (lower.includes("배송") || lower.includes("구매")) {
        botResponse = `프리오더 제품의 경우 순차 생산되어 6월 5일부터 전국 및 글로벌 유통 거점으로 일괄 배송을 시작할 예정입니다. 전 지역 완벽 무료 배송 및 안심 택배 옵션이 제공됩니다.`;
      } else if (lower.includes("소재") || lower.includes("금속") || lower.includes("장인")) {
        botResponse = `'결의 시선' 컬렉션은 가볍고 단단한 백종 티타늄과 대한민국 무형유산 전문 은빛 주조 장인들의 4대 금속 기법(주조·단조·입사·칠보)이 직접 은입 가공된 최고급 파츠를 장착하고 있습니다.`;
      } else if (lower.includes("할인") || lower.includes("프로모션")) {
        botResponse = `현재 한정 수량 제품이므로 오프라인 할인 쿠폰은 특별 제외이나, 지금 온라인 주문 시 전 지역 100% 무료 특수 배송 및 사은품으로 한국 전통 가마 단청 패턴 안경 전용 파우치가 일괄 랜덤 증정됩니다.`;
      } else {
        botResponse = `'${product.name}' 제품은 극도로 섬세한 수공예 메탈 힌지와 스퀘어 프레임으로, 얼굴선 위에서 우아하게 호흡하도록 디자인되었습니다. 정교한 한국 디자인 헤리티지와 젠틀몬스터의 패셔너블함이 어우러져 희소한 가치를 자아냅니다. 더 상세히 도움 드릴 부분이 있을까요?`;
      }
      setChatMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
    }, 700);
  };

  // Switch between other recommended products
  const handlePrevProduct = () => {
    const currentIndex = allProducts.findIndex(p => p.id === product.id);
    if (currentIndex !== -1 && onSelectProduct) {
      const prevIndex = (currentIndex - 1 + allProducts.length) % allProducts.length;
      onSelectProduct(allProducts[prevIndex]);
      setSelectedColorIndex(0);
    }
  };

  const handleNextProduct = () => {
    const currentIndex = allProducts.findIndex(p => p.id === product.id);
    if (currentIndex !== -1 && onSelectProduct) {
      const nextIndex = (currentIndex + 1) % allProducts.length;
      onSelectProduct(allProducts[nextIndex]);
      setSelectedColorIndex(0);
    }
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen pt-[48px] pb-16 text-black relative font-sans">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between py-4 border-b border-black/5 mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-500 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            BACK TO LIST
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevProduct}
              className="p-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              title="이전 상품"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNextProduct}
              className="p-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              title="다음 상품"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Main Two-Column Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch lg:items-start min-h-[500px]">
          
          {/* LEFT AREA: Realistic 3D Showcase (Responsive width 7 columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between p-4 md:p-8 relative overflow-hidden group/showcase transition-colors duration-500 bg-[#ffffff]">

            {/* Backplane Accent Pattern removed */}



            {/* The Glasses Container - Centered nicely */}
            <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-[300px] md:min-h-[420px] relative">
              {product.images?.detail && product.images.detail.length > 0 ? (
                <div className="w-full flex flex-col items-center justify-between h-full min-h-[380px]">
                  {/* Active main image */}
                  <motion.div 
                    key={`${product.id}-${activeImageIndex}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="flex-1 flex justify-center items-center w-full max-w-[560px] h-[285px] md:h-[355px] mb-6"
                  >
                    {!imageLoadError ? (
                      <img 
                        src={product.images.detail[activeImageIndex]} 
                        alt={`${product.name} - ${activeImageIndex + 1}`}
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                        onError={() => setImageLoadError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center scale-110">
                        <GlassesRenderer 
                          id={product.id} 
                          viewType={activeImageIndex === 1 ? "front" : activeImageIndex === 2 ? "side" : "front"} 
                        />
                      </div>
                    )}
                  </motion.div>

                  {/* Elegant Thumbnails slider */}
                  <div className="flex gap-3 justify-center z-10">
                    {product.images.detail.map((imgUrl, i) => {
                      return (
                        <ThumbnailButton
                          key={i}
                          imgUrl={imgUrl}
                          index={i}
                          isActive={activeImageIndex === i}
                          onClick={() => setActiveImageIndex(i)}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Rendering of SVG based on dynamic indexes to make it fully visual */
                <motion.div 
                  key={`${product.id}-${currentColor.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="w-full max-w-[480px] flex justify-center items-center"
                >
                  <GlassesRenderer id={product.id} viewType="front" />
                </motion.div>
              )}
            </div>


          </div>

          {/* RIGHT AREA: Product Detail & Control Column (Responsive width 4 columns wrapped in desktop sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto no-scrollbar flex flex-col justify-between bg-transparent p-4 md:p-5">
            <div className="flex flex-col gap-4">
              
              {/* Product Heading & Price */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h1 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-neutral-900 leading-tight">
                    {product.name}
                  </h1>
                </div>
                
                <button 
                  onClick={() => onToggleWishlist && onToggleWishlist(product)}
                  className={`p-2 rounded-full border transition-all cursor-pointer ${
                    isBookmarked 
                      ? "bg-amber-500/10 border-amber-500 text-amber-500" 
                      : "bg-[#f5f5f7] border-black/10 text-neutral-400 hover:text-black hover:bg-neutral-100"
                  }`}
                  title="위시리스트"
                >
                  <Bookmark size={15} className={isBookmarked ? "fill-current" : ""} />
                </button>
              </div>

              {/* Price Tag with availability */}
              <div className="py-1 border-b border-black/5 flex items-center justify-between">
                <span className="font-mono text-base font-bold text-neutral-900">
                  {product.price === "품절" ? "₩420,000" : product.price}
                </span>
                <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                  {product.soldOut ? "입고 알림 예약" : "6/5 구매 가능"}
                </span>
              </div>

              {/* Color Selection Panel */}
              <div className="flex flex-col gap-2 mt-0.5">
                <div className="flex justify-between items-center text-[11px] font-bold text-neutral-400">
                  <span>프레임 컬러 선택</span>
                  <span className="text-black font-semibold">{currentColor.name}</span>
                </div>
                
                {/* Color chips: only showing the singular correct design color */}
                <div className="flex items-center gap-2.5">
                  {colorOptions.map((opt, index) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedColorIndex(index)}
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center p-[2px] transition-all duration-300 relative cursor-pointer group ${
                        selectedColorIndex === index 
                          ? "border-black ring-2 ring-black/10 scale-105" 
                          : "border-black/10 hover:border-black/50 hover:scale-102"
                      }`}
                      title={opt.name}
                    >
                      <div className={`w-full h-full rounded-[5px] ${opt.classes}`} />
                      
                      {/* Interactive dot if active */}
                      {selectedColorIndex === index && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full border border-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Huge Call to Action Button */}
              <div className="mt-2 flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    if (product.soldOut) {
                      alert("시즌 입고 대기 리스트에 등록되었습니다.");
                    } else if (onAddToCart) {
                      onAddToCart(product, currentColor.name);
                    }
                  }}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-bold text-xs tracking-widest py-3.5 rounded-xl transition-all shadow-md active:scale-[0.99] cursor-pointer"
                >
                  {product.soldOut ? "시즌 입고 알림 받기" : "쇼핑백 담기"}
                </button>
                <p className="text-[9px] text-neutral-400 justify-center text-center mt-0.5 break-keep leading-relaxed block">
                  * 본 협업 패션 기어는 무형문화재 장인의 수공 제조 공정이 동반되어 선착순 한정 예약제로만 인도 준비됩니다.
                </p>
              </div>

              {/* Accordion Menus (Direct Mock Clone with Independent Collapsing) */}
              <div className="mt-3 flex flex-col border-t border-black/5 divide-y divide-black/5">
                
                {/* Accordion 1: 프리오더 */}
                <div className="py-2.5">
                  <button 
                    onClick={() => toggleTab("preorder")}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-neutral-700 tracking-tight group-hover:text-black transition-colors">
                      프리오더
                    </span>
                    {openTabs.preorder ? <Minus size={12} /> : <Plus size={12} />}
                  </button>
                  
                  <AnimatePresence>
                    {openTabs.preorder && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-1.5 text-[11px] leading-relaxed text-neutral-500 break-keep"
                      >
                        '결의 시선' 한정판 프리오더 주문 건은 6월 5일부터 결제 순번에 따라 최우선 순차 출고됩니다. 무형문화 유산 전문 장인이 직접 한 땀 한 땀 마스터 메탈 가공을 거치기 때문에 희소 소장가치가 극대화됩니다.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 2: 무료 배송 & 반품 */}
                <div className="py-2.5">
                  <button 
                    onClick={() => toggleTab("shipping")}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-neutral-700 tracking-tight group-hover:text-black transition-colors">
                      무료 배송 & 반품
                    </span>
                    {openTabs.shipping ? <Minus size={12} /> : <Plus size={12} />}
                  </button>
                  
                  <AnimatePresence>
                    {openTabs.shipping && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-1.5 text-[11px] leading-relaxed text-neutral-500 break-keep"
                      >
                        모든 주문은 국내외 안전 보험 택배를 기본 채택하여 무료 배송됩니다. 배송 완료 후 7일 이내에는 변심이나 품질 불만에 관계없이 무료 반품/교환 처리가 가능합니다.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 3: 세부 정보 */}
                <div className="py-2.5">
                  <button 
                    onClick={() => toggleTab("detail")}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-neutral-700 tracking-tight group-hover:text-black transition-colors">
                      세부 정보
                    </span>
                    {openTabs.detail ? <Minus size={12} /> : <Plus size={12} />}
                  </button>
                  
                  <AnimatePresence>
                    {openTabs.detail && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-2 flex flex-col gap-2"
                      >
                        {/* Text descriptions */}
                        <div className="text-[11.5px] font-bold text-neutral-800 leading-snug">
                          글로시 실버 메탈 소재의 스퀘어 안경
                        </div>
                        
                        {/* Specs list bullet items */}
                        <ul className="text-[11px] text-neutral-500 leading-relaxed space-y-1 list-disc pl-3">
                          {listDetails.map((feat, i) => (
                            <li key={i} className="break-keep">{feat}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

            
          </div>

        </div>

      </div>

      {/* FLOATING ACTION: Chatbot 라이브 컨시어지 (Replicates bottom-right chat bubble) */}
      <div className="fixed bottom-6 right-6 z-[990]">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-12 h-12 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer relative"
          id="live-chat-button"
        >
          {isChatOpen ? <X size={20} /> : <MessageSquare size={20} />}
          
          {!isChatOpen && (
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
          )}
        </button>

        {/* Live Chat Drawer */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="absolute bottom-16 right-0 w-[320px] sm:w-[360px] h-[450px] bg-white border border-neutral-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Box Header */}
              <div className="bg-black text-white px-5 py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-bold font-mono tracking-wider">LIVE CONCIERGE</h3>
                  <p className="text-[10px] text-neutral-400">결의 시선 1:1 브랜드 도슨트</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-neutral-300">ONLINE</span>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#f8f9fa]">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed break-keep border ${
                        msg.sender === "user"
                          ? "bg-black text-white border-black rounded-tr-none"
                          : "bg-white text-neutral-800 border-neutral-100 rounded-tl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Input Bar */}
              <div className="p-3 border-t border-neutral-100 bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                  placeholder="메시지를 입력해 주세요..."
                  className="flex-1 bg-neutral-100 border-none rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
                <button
                  onClick={handleSendChat}
                  className="bg-black hover:bg-neutral-800 text-white text-xs font-bold py-2 px-3.5 rounded-xl cursor-pointer"
                >
                  전송
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
