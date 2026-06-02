import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, Search, Navigation, Compass, Globe, CheckCircle, ChevronRight, CornerDownRight, X, ArrowLeft } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Store Data Interface
export interface GMStore {
  id: string;
  name: string;
  engName: string;
  category: 'domestic' | 'global';
  address: string;
  phone: string;
  hours: string;
  coordinates: [number, number]; // [latitude, longitude]
  theme: string;
  installations: string;
  image: string;
  trafficTip: string;
}

// Full real Store details
const STORES_DATA: GMStore[] = [
  {
    id: "haus-dosan",
    name: "하우스 도산 (HAUS DOSAN)",
    engName: "HAUS DOSAN FLAGSHIP",
    category: "domestic",
    address: "서울 강남구 압구정로46길 50",
    phone: "070-4128-2122",
    hours: "11:00 - 21:00 (연중무휴)",
    coordinates: [37.5250, 127.0371],
    theme: "HAUS SEOUL - 완전히 새로운 미래 리테일의 입체적 해체와 융합",
    installations: "지하 1층부터 지상 4층 규모로 거대한 3D 전신 키네틱 브릿지 및 로봇 팔 조각품 설치",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    trafficTip: "수인분당선 압구정로데오역 5번 출구에서 도보 10분, 도산공원 바로 측면 위치"
  },
  {
    id: "sinsa",
    name: "신사 플래그십 스토어",
    engName: "SINSA FLAGSHIP STORE",
    category: "domestic",
    address: "서울 강남구 압구정로10길 23",
    phone: "02-511-0921",
    hours: "11:00 - 21:00 (연중무휴)",
    coordinates: [37.5222, 127.0223],
    theme: "THE SALVATION - 구원을 간절히 갈망하는 기묘한 유기체의 비정형 움직임",
    installations: "공중을 부유하는 대형 금속 키네틱 기장 장치 및 입체 금속 구체 가동",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800",
    trafficTip: "3호선 신사역 8번 출구에서 도보 8분, 가로수길 메인 브랜치 골목 진입"
  },
  {
    id: "hongdae",
    name: "홍대 플래그십 스토어",
    engName: "HONGDAE FLAGSHIP STORE",
    category: "domestic",
    address: "서울 마포구 독막로7길 54",
    phone: "02-3144-0801",
    hours: "11:00 - 21:00",
    coordinates: [37.5494, 126.9208],
    theme: "SACRIFICE - 거대한 의식과 고요한 대승적 희생을 모티브로 삼은 텐션",
    installations: "실시간 대자연 생태계를 상징하는 지층 조각 및 라이브 인체 모형 전도 장치",
    image: "https://images.unsplash.com/photo-1567401893930-7becd112d9c0?auto=format&fit=crop&q=80&w=800",
    trafficTip: "6호선 상수역 1번 출구에서 도보 5분, 합정역 3번 출구 도보 7분 거리"
  },
  {
    id: "seongsu",
    name: "성수 플래그십 스토어",
    engName: "SEONGSU FLAGSHIP STORE",
    category: "domestic",
    address: "서울 성동구 아차산로2길 11",
    phone: "02-463-5488",
    hours: "11:00 - 21:30 (금/토 22:00 연장 운영)",
    coordinates: [37.5454, 127.0528],
    theme: "DARK COCOON - 무심하게 깨진 거친 크러쉬드 콘크리트 속 태고의 세포",
    installations: "초현실주의 안경 피팅 베이스에 이색 작가 콜라보 단독 멀티 쇼룸 및 음향 예술 가미",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
    trafficTip: "2호선 뚝섬역 5번 출구 바로 앞 도보 2분, 블루보틀 성수 인근 코너"
  },
  {
    id: "lotte-world",
    name: "롯데월드몰 스토어",
    engName: "LOTTE WORLD MALL BR.",
    category: "domestic",
    address: "서울 송파구 올림픽로 300 롯데월드몰 1F",
    phone: "02-3213-4113",
    hours: "10:30 - 22:00",
    coordinates: [37.5137, 127.1044],
    theme: "CONTINUUM - 무한한 우주 성간 속 유기적인 입자들이 모여 이룬 군락",
    installations: "대칭 거울 레이아웃과 눈을 뗄 수 없는 자이언트 오가닉 아이 코어 조각",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
    trafficTip: "2호선·8호선 잠실역 11번 출구 지하 광장 연결 롯데월드몰 1층 정문 인근"
  },
  {
    id: "tokyo-aoyama",
    name: "도쿄 아오야마 스토어",
    engName: "TOKYO AOYAMA STORE (JAPAN)",
    category: "global",
    address: "5 Chome-3-2 Minamiaoyama, Minato City, Tokyo, Japan",
    phone: "+81 3-6427-2244",
    hours: "11:00 - 20:00",
    coordinates: [35.6601, 139.7153],
    theme: "THE GIANT - 대지의 거인이 긴 시간이 흘러서 깨어난 듯한 초현실적 오케스트라",
    installations: "실제로 부드럽게 감기며 눈동자가 관객을 추려보는 4.5m 크기의 휴머노이드 페이스 조형",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    trafficTip: "Tokyo Metro 긴자선·한조몬선 오모테산도역 A5 출구 도보 3분 미나미아오야마 입구"
  },
  {
    id: "newyork-soho",
    name: "뉴욕 소호 스토어",
    engName: "NEW YORK SOHO STORE (USA)",
    category: "global",
    address: "79 Wooster St, New York, NY 10012, USA",
    phone: "+1 212-925-1010",
    hours: "11:00 - 19:00 (일요일 12:00 - 18:00)",
    coordinates: [40.7243, -74.0018],
    theme: "COLLECTIVE MEMORIES - 전통 지와와 뉴욕 도심의 아일랜드식 미학 결합",
    installations: "조각가가 직접 수공 단조 가공 처리한 천장 아치 패널 구조물 및 수묵 점사 템플 테라스",
    image: "https://images.unsplash.com/photo-1481437156560-3205a6a55735?auto=format&fit=crop&q=80&w=800",
    trafficTip: "N·R 지하철 Prince St 역 하차 도보 4분, Wooster St 하트 중심가 안쪽 위치"
  }
];

export default function StoreMap({ onBack }: { onBack: () => void }) {
  const [filterType, setFilterType] = useState<'all' | 'domestic' | 'global'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStore, setActiveStore] = useState<GMStore>(STORES_DATA[0]);
  const [isTrafficTipVisible, setIsTrafficTipVisible] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  // Filter computation (memoized to keep reference stable and prevent leaflet lag)
  const filteredStores = useMemo(() => {
    return STORES_DATA.filter(store => {
      const matchesFilter = filterType === 'all' || store.category === filterType;
      const matchesQuery = store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           store.theme.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filterType, searchQuery]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Reset container if previously rendered to prevent Leaflet error
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Set map starting position at Seoul Haus Dosan
    const map = L.map(mapContainerRef.current, {
      center: activeStore.coordinates,
      zoom: 14,
      zoomControl: false, // Turn off default zoom to custom place beautifully
      attributionControl: false // Standard attribution hides cleanly
    });

    mapRef.current = map;

    // Premium light gray theme for Gentle Monster brand style (CartoDB Positron)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);

    // Zoom controls customized
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial Marker Setup
    updateMarkers();

    // Cleanup map on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Markers when active/filtered list changing
  const updateMarkers = () => {
    const map = mapRef.current;
    if (!map) return;

    // Delete previous markers
    const currentMarkers = markersRef.current;
    for (const key in currentMarkers) {
      if (Object.prototype.hasOwnProperty.call(currentMarkers, key)) {
        const marker = currentMarkers[key];
        if (marker) {
          marker.remove();
        }
      }
    }
    markersRef.current = {};

    STORES_DATA.forEach(store => {
      // Is current store included in the filtered list?
      const isFiltered = filteredStores.some(fs => fs.id === store.id);
      if (!isFiltered) return;

      const isActive = store.id === activeStore.id;

      // Define stunning Minimalist Gentle Monster brand pins (high contrast black circular mark with white outline)
      const pinIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <!-- Pulsing outer circle if selected -->
            ${isActive ? '<div class="absolute w-10 h-10 bg-black/15 rounded-full animate-ping"></div>' : ''}
            <!-- Pin Body -->
            <div class="w-7 h-7 rounded-full ${isActive ? 'bg-black text-white' : 'bg-white border-2 border-black text-black'} shadow-lg flex items-center justify-center transition-all duration-300 transform rounded-br-none rotate-45">
              <div class="-rotate-45 font-sans font-extrabold text-[10px]">GM</div>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker(store.coordinates, { icon: pinIcon })
        .addTo(map)
        .on('click', () => {
          handleSelectStore(store);
        });

      // Bind dynamic high-end minimalist popup
      marker.bindTooltip(`
        <div class="px-2.5 py-1.5 bg-[#111111] text-white border border-white/20 text-[10px] font-bold font-sans tracking-wider">
          ${store.name}
        </div>
      `, {
        direction: 'top',
        offset: [0, -10],
        opacity: 0.95
      });

      markersRef.current[store.id] = marker;
    });
  };

  // Re-trigger marker updates whenever filters or active change
  useEffect(() => {
    updateMarkers();
  }, [filteredStores, activeStore]);

  // Handles clicking on a store (either from sidebar or map pins)
  const handleSelectStore = (store: GMStore) => {
    setActiveStore(store);
    setIsTrafficTipVisible(false);
    
    const map = mapRef.current;
    if (map) {
      map.flyTo(store.coordinates, 15, {
        animate: true,
        duration: 1.5 // Smooth animation Duration
      });
    }
  };

  return (
    <div className="bg-[#f4f4f5] min-h-screen pt-[48px] text-brand-ink font-sans relative">
      
      {/* 1. Header Navigation and Interactive Mode Selection */}
      <div className="bg-white border-b border-black/10 px-6 md:px-12 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm relative z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="group p-2.5 -ml-2 rounded-full hover:bg-black/5 flex items-center justify-center text-neutral-500 hover:text-black transition-all cursor-pointer border border-transparent hover:border-black/5"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} strokeWidth={2.5} />
          </button>
          
          <div className="h-5 w-[1px] bg-black/15" />
          
          <div className="flex flex-col">
            <h1 className="text-[13px] font-extrabold tracking-[0.05em] text-neutral-900 uppercase">
              오프라인 스토어 위치 안내
            </h1>
          </div>
        </div>

        {/* Dynamic Category Tabs: Elegant Premium Labels with delicate bottom slide borders */}
        <div className="flex items-center gap-8 border-b border-transparent">
          <button
            onClick={() => setFilterType('all')}
            className={`pb-1 text-xs tracking-widest transition-all cursor-pointer font-sans font-bold relative ${
              filterType === 'all' 
                ? 'text-brand-ink' 
                : 'text-neutral-400 hover:text-brand-ink'
            }`}
          >
            전체 ({STORES_DATA.length})
            {filterType === 'all' && (
              <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-800" />
            )}
          </button>
          <button
            onClick={() => setFilterType('domestic')}
            className={`pb-1 text-xs tracking-widest transition-all cursor-pointer font-sans font-bold relative ${
              filterType === 'domestic' 
                ? 'text-brand-ink' 
                : 'text-neutral-400 hover:text-brand-ink'
            }`}
          >
            국내 ({STORES_DATA.filter(s => s.category === 'domestic').length})
            {filterType === 'domestic' && (
              <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-800" />
            )}
          </button>
          <button
            onClick={() => setFilterType('global')}
            className={`pb-1 text-xs tracking-widest transition-all cursor-pointer font-sans font-bold relative ${
              filterType === 'global' 
                ? 'text-brand-ink' 
                : 'text-neutral-400 hover:text-brand-ink'
            }`}
          >
            해외 ({STORES_DATA.filter(s => s.category === 'global').length})
            {filterType === 'global' && (
              <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-800" />
            )}
          </button>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-100px)] items-stretch">
        
        {/* LEFT COLUMN: Store List & Search Panel (4 Columns) */}
        <div className="lg:col-span-4 bg-white border-r border-[#e4e4e7] flex flex-col py-6 px-6 h-[550px] lg:h-[calc(100vh-108px)] overflow-hidden justify-between">
          <div className="flex flex-col gap-6 flex-1 overflow-hidden">
            
            {/* Search Input Box - Seamless design with modern luxury look */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Search size={14} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="지점명 또는 공간 테마 검색..."
                className="w-full bg-[#f4f4f5] text-xs text-brand-ink border border-neutral-200 rounded-none pl-9 pr-8 py-3 placeholder-neutral-400 focus:outline-none focus:border-black/50 focus:bg-white focus:shadow-inner transition-all font-semibold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Total count details with accent line */}
            <div className="text-[10px] font-sans tracking-wider text-[#8a7a6b] flex items-center justify-between border-b border-black/10 pb-3">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="inline-block w-1 h-1 bg-amber-800 rounded-full" />
                공간 탐색
              </span>
              <span className="font-bold">{filteredStores.length}개의 공간 찾음</span>
            </div>

            {/* List scrollbox container - Structured minimalist card hierarchy */}
            <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 flex-1 pb-4 no-scrollbar">
              {filteredStores.length === 0 ? (
                <div className="py-16 text-center flex flex-col items-center justify-center gap-3 bg-[#f8f9fa] border border-black/5">
                  <Compass className="text-neutral-300 animate-spin" size={24} strokeWidth={1.5} />
                  <p className="text-xs text-neutral-400 break-keep font-medium">
                    검색 결과와 매칭되는 스토어가 존재하지 않습니다.
                  </p>
                </div>
              ) : (
                filteredStores.map((store, i) => {
                  const isActive = store.id === activeStore.id;
                  const itemIndex = String(i + 1).padStart(2, '0');
                  return (
                    <button
                      key={store.id}
                      onClick={() => handleSelectStore(store)}
                      className={`w-full text-left p-4 transition-all duration-300 relative group/item cursor-pointer flex gap-3 shrink-0 border ${
                        isActive 
                          ? 'bg-white border-black/20 shadow-md translate-x-1 border-l-4 border-l-amber-800' 
                          : 'bg-[#f8f9fa] border-neutral-100 hover:border-neutral-300 hover:bg-white hover:translate-x-1 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9.5px] font-sans font-bold tracking-wider px-1.5 py-0.5 border ${
                              isActive ? 'border-amber-800 text-amber-800 bg-amber-800/5' : 'border-neutral-200 text-neutral-400 bg-neutral-50'
                            }`}>
                              {store.category === 'domestic' ? '국내' : '해외'}
                            </span>
                            <span className="text-[9px] font-mono tracking-widest text-[#8a7a6b] font-bold">
                              {store.id.toUpperCase()}
                            </span>
                          </div>
                          
                          {/* Elegant Numbering Tag */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-medium text-neutral-400 group-hover/item:text-neutral-900 transition-colors">
                              {itemIndex}
                            </span>
                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-amber-800 scale-125' : 'bg-transparent'}`} />
                          </div>
                        </div>

                        <h3 className="text-[13px] font-extrabold tracking-tight text-neutral-900 font-sans block">
                          {store.name}
                        </h3>
                        
                        <p className="text-[11px] leading-relaxed line-clamp-1 text-neutral-500 mt-1 font-sans font-medium">
                          {store.address}
                        </p>
                        
                        <div className="flex items-center justify-between text-[9px] font-mono leading-none text-neutral-400 mt-2.5 pt-2 border-t border-black/5">
                          <span className="flex items-center gap-1 font-semibold">
                            <Clock size={10} strokeWidth={2} />
                            {store.hours.split('(')[0]}
                          </span>
                          <span className="opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center text-amber-800 font-bold gap-0.5">
                            지도 보기 <ChevronRight size={10} strokeWidth={3} />
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

          </div>

          <div className="pt-2 border-t border-black/10 flex justify-between items-center text-[10px] font-sans text-neutral-400">
            <span>© 젠틀몬스터 공간 가이드</span>
            <span className="font-bold font-mono">VER. 2.65</span>
          </div>

        </div>

        {/* MIDDLE COLUMN: Interactive Live Map with custom vignette & contrast frame (5 Columns) */}
        <div className="lg:col-span-5 relative bg-[#e4e4e7] flex items-stretch min-h-[380px] lg:min-h-[auto] border-r border-[#e4e4e7]">
          
          {/* Leaflet Reference Frame Container */}
          <div ref={mapContainerRef} className="w-full h-full z-10" id="offline-leaflet-map" />

          {/* Luxury Frame Borders Overlaying standard Leaflet Map */}
          <div className="absolute inset-0 border-4 border-white/45 pointer-events-none select-none z-20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 via-black/5 to-transparent pointer-events-none select-none z-20" />
          
          {/* Floating HUD Indicator on top corner (Polished look) */}
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-none z-20 flex items-center gap-2.5 shadow-md border border-neutral-200 pointer-events-none select-none font-sans">
            <div className="w-2 h-2 rounded-full bg-amber-800 animate-pulse" />
            <span className="text-[9px] font-sans font-bold tracking-wider text-[#8a7a6b]">선택된 지점</span>
            <span className="text-[10px] font-sans font-extrabold tracking-wider text-neutral-800 pl-1 border-l border-neutral-200">
              {activeStore.name}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Selective Store Spotlight Detail Viewer with Luxury Editorial layout (3 Columns) */}
        <div className="lg:col-span-3 bg-white/95 backdrop-blur-sm flex flex-col justify-between py-6 px-6 h-[550px] lg:h-[calc(100vh-108px)] overflow-y-auto no-scrollbar">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStore.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col gap-6 flex-1"
            >
              {/* Store High Quality Image Representation with high-end border style */}
              <div className="w-full h-[178px] bg-neutral-100 rounded-none overflow-hidden relative group/frame border-2 border-black/10 shadow-sm">
                <img 
                  src={activeStore.image} 
                  alt={activeStore.name} 
                  className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out group-hover/frame:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Title Header - Editorial masterpiece */}
              <div className="border-b border-black/10 pb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-[#8a7a6b] tracking-wider block font-sans">
                    지점 스포트라이트
                  </span>
                  <div className="h-2 w-[1px] bg-black/20" />
                  <span className="text-[10px] text-neutral-400 font-bold font-sans">
                    {activeStore.category === 'domestic' ? '국내 지점' : '해외 지점'}
                  </span>
                </div>
                <h2 className="text-[17px] font-black tracking-tight text-neutral-900 leading-tight">
                  {activeStore.name}
                </h2>
              </div>

              {/* Unique Concept Theme Description - High-end letterpress note block */}
              <div className="flex flex-col gap-2 pb-4 border-b border-black/10">
                <span className="text-[10px] font-bold tracking-wider text-[#8a7a6b] font-sans">
                  공간 콘셉트
                </span>
                <p className="text-[12.5px] font-bold text-neutral-800 leading-relaxed font-sans break-keep bg-[#f4f4f5] border-l-2 border-amber-800 p-2.5">
                  {activeStore.theme}
                </p>
              </div>

              {/* Kinetic Art Installation Installation features - Editorial note */}
              <div className="flex flex-col gap-2 pb-4 border-b border-black/10">
                <span className="text-[10px] font-bold tracking-wider text-[#8a7a6b] font-sans">
                  예술품 연출 및 설치
                </span>
                <p className="text-[12px] leading-relaxed text-neutral-600 font-sans tracking-tight break-keep pl-1 border-r border-black/5">
                  {activeStore.installations}
                </p>
              </div>

              {/* Metadata Details List - Clean list with beautiful styling */}
              <div className="flex flex-col gap-3 py-1">
                <div className="flex justify-between items-baseline text-[11.5px] leading-relaxed">
                  <span className="text-[10px] text-neutral-400 font-sans font-bold">주소</span>
                  <span className="text-right text-neutral-800 font-bold max-w-[70%] break-keep leading-snug">{activeStore.address}</span>
                </div>

                <div className="h-[1px] bg-black/5" />

                <div className="flex justify-between items-center text-[11.5px]">
                  <span className="text-[10px] text-neutral-400 font-sans font-bold">전화번호</span>
                  <span className="text-neutral-800 font-mono font-black tracking-wide text-amber-900">{activeStore.phone}</span>
                </div>

                <div className="h-[1px] bg-black/5" />

                <div className="flex justify-between items-center text-[11.5px]">
                  <span className="text-[10px] text-neutral-400 font-sans font-bold">운영 시간</span>
                  <span className="text-neutral-800 font-semibold">{activeStore.hours.split('(')[0]}</span>
                </div>
              </div>

              {/* Dynamic Traffic Tip and Guide */}
              <div className="mt-1 flex flex-col gap-2">
                <button
                  onClick={() => setIsTrafficTipVisible(!isTrafficTipVisible)}
                  className="w-full bg-[#f4f4f5] hover:bg-neutral-900 hover:text-white border border-neutral-300 py-3 rounded-none text-[10.5px] font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer font-sans shadow-sm"
                >
                  <Navigation size={11.5} className="animate-pulse" />
                  {isTrafficTipVisible ? "찾아오는 길 닫기" : "찾아오는 길 안내"}
                </button>

                <AnimatePresence>
                  {isTrafficTipVisible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-1"
                    >
                      <div className="bg-[#f4f4f5] border-2 border-neutral-200 p-4 text-[11px] leading-relaxed text-neutral-700 rounded-none font-semibold break-keep shadow-inner relative">
                        <div className="absolute top-0 right-0 p-1 text-[8px] font-sans text-neutral-400 opacity-65 font-bold">대중교통 안내</div>
                        {activeStore.trafficTip}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Action button to return to collection list */}
          <div className="mt-6 border-t border-black/10 pt-4">
            <button
              onClick={onBack}
              className="w-full bg-brand-ink text-brand-bg hover:bg-neutral-800 py-4 rounded-none text-[11px] font-bold tracking-widest transition-all cursor-pointer block text-center uppercase font-sans"
            >
              컬렉션 목록으로 돌아가기
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
