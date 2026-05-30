import { useState, useEffect, useRef } from 'react';
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

  // Filter computation
  const filteredStores = STORES_DATA.filter(store => {
    const matchesFilter = filterType === 'all' || store.category === filterType;
    const matchesQuery = store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.theme.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

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
        <div class="px-2 py-1 bg-black text-white rounded text-[11px] font-bold font-sans tracking-wide">
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
    <div className="bg-brand-bg min-h-screen pt-[48px] text-brand-ink font-sans relative">
      
      {/* 1. Header Navigation and Interactive Mode Selection */}
      <div className="bg-brand-bg border-b border-black/5 px-6 md:px-12 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-500 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} />
            BACK
          </button>
          
          <div className="h-4 w-[1px] bg-neutral-200" />
          
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-neutral-900 block uppercase">
              오프라인 스토어 위치 안내
            </h1>
          </div>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex items-center gap-1 bg-neutral-200/50 p-1 rounded-xl w-fit self-end md:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all' 
                ? 'bg-black text-white shadow-sm' 
                : 'text-neutral-500 hover:text-black hover:bg-neutral-200/30'
            }`}
          >
            전체 매장
          </button>
          <button
            onClick={() => setFilterType('domestic')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'domestic' 
                ? 'bg-black text-white shadow-sm' 
                : 'text-neutral-500 hover:text-black hover:bg-neutral-200/30'
            }`}
          >
            국내 매장 ({STORES_DATA.filter(s => s.category === 'domestic').length})
          </button>
          <button
            onClick={() => setFilterType('global')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'global' 
                ? 'bg-black text-white shadow-sm' 
                : 'text-neutral-500 hover:text-black hover:bg-neutral-200/30'
            }`}
          >
            글로벌 스토어 ({STORES_DATA.filter(s => s.category === 'global').length})
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-96px)] items-stretch">
        
        {/* LEFT COLUMN: Store List & Search Panel (4 Columns) */}
        <div className="lg:col-span-4 bg-brand-bg border-r border-black/5 flex flex-col py-6 px-4 md:px-6 h-[550px] lg:h-[calc(100vh-96px)] overflow-hidden justify-between">
          <div className="flex flex-col gap-4 flex-1 overflow-hidden">
            
            {/* Search Input Box */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="지점명 또는 대안 테마 검색..."
                className="w-full bg-white hover:bg-neutral-50 text-xs text-brand-ink border border-black/5 rounded-xl pl-10 pr-4 py-3 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/10 transition-all font-semibold shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Total count details */}
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between border-b border-black/5 pb-2">
              <span>LISTING STORES</span>
              <span>{filteredStores.length} LOCATIONS FOUND</span>
            </div>

            {/* List scrollbox container */}
            <div className="flex flex-col gap-3 overflow-y-auto pr-1 flex-1 pb-4">
              {filteredStores.length === 0 ? (
                <div className="p-8 text-center bg-white/50 border border-black/5 rounded-xl flex flex-col items-center justify-center gap-2">
                  <Compass className="text-neutral-300 animate-spin" size={32} />
                  <p className="text-xs font-semibold text-neutral-400 break-keep">
                    검색 결과와 매칭되는 스토어가 존재하지 않습니다.
                  </p>
                </div>
              ) : (
                filteredStores.map(store => {
                  const isActive = store.id === activeStore.id;
                  return (
                    <motion.button
                      key={store.id}
                      onClick={() => handleSelectStore(store)}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group/item cursor-pointer flex gap-4 shrink-0 ${
                        isActive 
                          ? 'bg-neutral-950 border-neutral-950 text-white shadow-lg shadow-black/10' 
                          : 'bg-white border-black/5 hover:border-black/15 hover:bg-neutral-50 text-neutral-900 shadow-sm'
                      }`}
                    >
                      {/* Active sidebar pill indicator */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1 transition-all ${
                        isActive ? 'bg-amber-600' : 'bg-transparent group-hover/item:bg-neutral-200'
                      }`} />

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={`text-[9px] font-bold font-mono tracking-wider uppercase block ${
                              isActive ? 'text-amber-500' : 'text-amber-800'
                            }`}>
                              {store.category === 'domestic' ? 'SOUTH KOREA' : 'GLOBAL FLAGSHIP'}
                            </span>
                            <h3 className="text-sm font-extrabold tracking-tight mt-0.5 leading-snug">
                              {store.name}
                            </h3>
                          </div>
                          
                          <MapPin size={15} className={isActive ? 'text-amber-500' : 'text-neutral-400 group-hover/item:text-black'} />
                        </div>
                        
                        <p className={`text-[11px] leading-relaxed line-clamp-1 opacity-70 mb-2.5 ${
                          isActive ? 'text-neutral-300' : 'text-neutral-500'
                        }`}>
                          {store.address}
                        </p>
                        
                        <div className="flex items-center gap-3 text-[10px] font-mono leading-none opacity-80">
                          <span className="flex items-center gap-1.5">
                            <Clock size={11} />
                            {store.hours.split('(')[0]}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>

          </div>

          {/* Quick legal / signature bottom accent line inside sidebar */}
          <div className="pt-4 border-t border-black/5 mt-2 text-center leading-relaxed shrink-0">
            <span className="text-[10.5px] font-bold text-neutral-400 font-mono tracking-widest block">
              GENTLE MONSTER ART REVELATION
            </span>
            <span className="text-[9px] text-neutral-300 block mt-1">
              &copy; 1:1 Live Store Navigation Service.
            </span>
          </div>

        </div>

        {/* MIDDLE COLUMN: Fully Interactive Live Map (5 Columns) */}
        <div className="lg:col-span-5 relative bg-neutral-100 flex items-stretch min-h-[350px] lg:min-h-[auto]">
          
          {/* Leaflet Reference Frame Container */}
          <div ref={mapContainerRef} className="w-full h-full z-10" id="offline-leaflet-map" />

          {/* Minimalist Map Frame Borders & Ambient Gradients Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/5 to-transparent pointer-events-none select-none z-20" />
          
          {/* Floating HUD Indicator on top corner */}
          <div className="absolute top-4 left-4 bg-black/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full z-20 flex items-center gap-2 shadow border border-white/10 pointer-events-none select-none">
            <Globe className="text-amber-500 animate-pulse" size={13} />
            <span className="text-[10.5px] font-mono font-bold tracking-wider">
              {activeStore.engName}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Selective Store Spotlight Detail Viewer (3 Columns) */}
        <div className="lg:col-span-3 bg-brand-bg border-l border-black/5 flex flex-col justify-between py-6 px-5 h-[550px] lg:h-[calc(100vh-96px)] overflow-y-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStore.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-4 flex-1"
            >
              {/* Store High Quality Image Representation */}
              <div className="w-full h-[160px] bg-neutral-100 rounded-xl overflow-hidden relative group/frame border border-black/5 shadow-sm">
                <img 
                  src={activeStore.image} 
                  alt={activeStore.name} 
                  className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover/frame:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white">
                  <CheckCircle className="text-amber-400" size={13} />
                  <span className="text-[11px] font-bold uppercase tracking-wider font-mono">
                    Verified Space
                  </span>
                </div>
              </div>

              {/* Title Header */}
              <div className="bg-white border border-black/5 p-4 rounded-xl shadow-sm">
                <span className="text-[10px] font-bold text-amber-800 tracking-[0.2em] font-mono uppercase block mb-1">
                  OFFLINE SPOTLIGHT
                </span>
                <h2 className="text-lg font-extrabold tracking-tight text-neutral-900 leading-tight">
                  {activeStore.name}
                </h2>
                <span className="text-[10.5px] font-mono font-bold text-neutral-400 block mt-1">
                  {activeStore.engName}
                </span>
              </div>

              {/* Unique Concept Theme Description */}
              <div className="bg-white border border-black/5 p-4 rounded-xl flex flex-col gap-2 relative shadow-sm">
                <span className="text-[9px] font-bold font-mono tracking-wider text-neutral-400 uppercase">
                  공간 테마 (CONCEPT DEFINITION)
                </span>
                <p className="text-[12px] font-bold text-neutral-800 leading-relaxed font-sans break-keep">
                  {activeStore.theme}
                </p>
                <CornerDownRight size={14} className="absolute right-3.5 bottom-3 text-neutral-300" />
              </div>

              {/* Kinetic Art Installation Installation features */}
              <div className="bg-white border border-black/5 p-4 rounded-xl flex flex-col gap-2 shadow-sm">
                <span className="text-[9.5px] font-bold text-neutral-400 font-mono tracking-wider uppercase">
                  아트 인스톨레이션 설치 정보
                </span>
                <p className="text-[11.5px] leading-relaxed text-neutral-600 font-sans tracking-tight break-keep">
                  {activeStore.installations}
                </p>
              </div>

              {/* Metadata Details List */}
              <div className="bg-white border border-black/5 p-4 rounded-xl shadow-sm flex flex-col gap-3.5">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-neutral-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9.5px] font-mono font-bold text-neutral-400 block uppercase">주소</span>
                    <span className="text-[11.5px] text-neutral-800 font-semibold break-keep block leading-normal">{activeStore.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={15} className="text-neutral-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9.5px] font-mono font-bold text-neutral-400 block uppercase">전화번호</span>
                    <span className="text-[11.5px] text-neutral-800 font-semibold block">{activeStore.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={15} className="text-neutral-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9.5px] font-mono font-bold text-neutral-400 block uppercase">운영시간</span>
                    <span className="text-[11.5px] text-neutral-800 font-semibold block leading-normal">{activeStore.hours}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Traffic Tip and Guide */}
              <div className="mt-1 flex flex-col gap-2">
                <button
                  onClick={() => setIsTrafficTipVisible(!isTrafficTipVisible)}
                  className="w-full bg-white border border-black/10 hover:border-black/30 hover:bg-neutral-50 text-black py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Navigation size={13} />
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
                      <div className="bg-[#f2ede9] border border-[#dfd7ce] p-3 text-[11px] leading-relaxed text-[#514330] rounded-xl font-medium break-keep shadow-xs">
                        {activeStore.trafficTip}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Action button to return to collection list */}
          <div className="mt-6 border-t border-black/5 pt-4">
            <button
              onClick={onBack}
              className="w-full bg-black text-white hover:bg-neutral-800 py-3 rounded-xl text-xs font-extrabold tracking-widest transition-all cursor-pointer block text-center shadow-md active:scale-[0.99] uppercase"
            >
              컬렉션 보기로 이동
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
