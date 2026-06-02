export interface Product {
  id: string;
  name: string;
  engName: string;
  price: string;
  category: "꽃 컬렉션" | "궁궐 컬렉션" | "날개 컬렉션" | "문양 컬렉션";
  color: string;
  type: "sunglasses" | "glasses";
  soldOut?: boolean;
  statusText?: string;
  hasTag?: string;
  images?: {
    thumbnail: string;
    detail: string[];
  };
}

export const productsData: Product[] = [
  // 꽃 컬렉션
  {
    id: "flower-1",
    name: "매화 01",
    engName: "MAEHWA 01",
    price: "₩450,000",
    category: "꽃 컬렉션",
    color: "silver",
    type: "sunglasses",
    images: {
      thumbnail: "/assets/products/꽃/매화/매화_대각선.png",
      detail: [
        "/assets/products/꽃/매화/매화_대각선.png",
        "/assets/products/꽃/매화/매화_정면.png",
        "/assets/products/꽃/매화/매화_측면.png",
        "/assets/products/꽃/매화/매화_제품상세컷2.jpeg"
      ]
    }
  },
  {
    id: "flower-3",
    name: "연꽃 02",
    engName: "YEONLOT 02",
    price: "₩450,000",
    category: "꽃 컬렉션",
    color: "platinum",
    type: "sunglasses",
    images: {
      thumbnail: "/assets/products/꽃/연꽃/연꽃_대각선.png",
      detail: [
        "/assets/products/꽃/연꽃/연꽃_대각선.png",
        "/assets/products/꽃/연꽃/연꽃_정면.png",
        "/assets/products/꽃/연꽃/연꽃_측면.png"
      ]
    }
  },
  {
    id: "flower-4",
    name: "국화 03",
    engName: "GUKHWA 03",
    price: "₩450,000",
    category: "꽃 컬렉션",
    color: "gold",
    type: "glasses",
    soldOut: true,
    statusText: "품절",
    images: {
      thumbnail: "/assets/products/꽃/국화/국화_대각선-1.png",
      detail: [
        "/assets/products/꽃/국화/국화_대각선-1.png",
        "/assets/products/꽃/국화/국화_정면-1.png",
        "/assets/products/꽃/국화/국화_측면-1.png"
      ]
    }
  },

  // 궁궐 컬렉션
  {
    id: "palace-1",
    name: "기와 01",
    engName: "GIWA 01",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "black",
    type: "sunglasses",
    images: {
      thumbnail: "/assets/products/궁궐/기와/기와_대각선-1.png",
      detail: [
        "/assets/products/궁궐/기와/기와_대각선-1.png",
        "/assets/products/궁궐/기와/기와_정면.jpeg",
        "/assets/products/궁궐/기와/기와_측면-1.png"
      ]
    }
  },
  {
    id: "palace-2",
    name: "창호 02",
    engName: "CHANGHO 02",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "matte-black",
    type: "sunglasses",
    images: {
      thumbnail: "/assets/products/궁궐/창호/창호_대각선-1.jpeg",
      detail: [
        "/assets/products/궁궐/창호/창호_대각선-1.jpeg",
        "/assets/products/궁궐/창호/창호_정면-1.png",
        "/assets/products/궁궐/창호/창호_측면-1.png"
      ]
    }
  },
  {
    id: "palace-3",
    name: "단청 03",
    engName: "DANCHEONG 03",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "translucent",
    type: "glasses",
    images: {
      thumbnail: "/assets/products/궁궐/단청/단청_대각선-1.png",
      detail: [
        "/assets/products/궁궐/단청/단청_대각선-1.png",
        "/assets/products/궁궐/단청/단청_정면-1.png",
        "/assets/products/궁궐/단청/단청_측면-1.png"
      ]
    }
  },

  // 날개 컬렉션
  {
    id: "wing-1",
    name: "비상 01",
    engName: "BISANG 01",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "monochrome",
    type: "glasses",
    images: {
      thumbnail: "/assets/products/날개/비상/비상_대각선-1.png",
      detail: [
        "/assets/products/날개/비상/비상_대각선-1.png",
        "/assets/products/날개/비상/비상_정면.jpeg",
        "/assets/products/날개/비상/비상_측면-1.png"
      ]
    }
  },
  {
    id: "wing-2",
    name: "천공 02",
    engName: "CHEONGONG 02",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "chrome",
    type: "sunglasses",
    images: {
      thumbnail: "/assets/products/날개/천공/천공_대각선-1.png",
      detail: [
        "/assets/products/날개/천공/천공_대각선-1.png",
        "/assets/products/날개/천공/천공_정면-1.png",
        "/assets/products/날개/천공/천공_측면-1.png"
      ]
    }
  },
  {
    id: "wing-3",
    name: "바람 03",
    engName: "BARAM 03",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "titanium",
    type: "glasses",
    images: {
      thumbnail: "/assets/products/날개/바람/바람_대각선-1.png",
      detail: [
        "/assets/products/날개/바람/바람_대각선-1.png",
        "/assets/products/날개/바람/바람_정면.jpeg",
        "/assets/products/날개/바람/바람_측면-1.png"
      ]
    }
  },

  // 문양 컬렉션
  {
    id: "pattern-1",
    name: "연화문 01",
    engName: "YEONHWAMUN 01",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "classic-black",
    type: "sunglasses",
    images: {
      thumbnail: "/assets/products/문양/연화문/연화문_대각선-1.png",
      detail: [
        "/assets/products/문양/연화문/연화문_대각선-1.png",
        "/assets/products/문양/연화문/연화문_정면-1.png",
        "/assets/products/문양/연화문/연화문_측면-1.png"
      ]
    }
  },
  {
    id: "pattern-2",
    name: "당초문 02",
    engName: "DANGCHOMUN 02",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "amber-gold",
    type: "glasses",
    images: {
      thumbnail: "/assets/products/문양/당초문/당초문_대각선-1.png",
      detail: [
        "/assets/products/문양/당초문/당초문_대각선-1.png",
        "/assets/products/문양/당초문/당초문_정면-1.png",
        "/assets/products/문양/당초문/당초문_측면-1.png"
      ]
    }
  },
  {
    id: "pattern-3",
    name: "격자문 03",
    engName: "GYEOKJAMUN 03",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "dark-grid",
    type: "sunglasses",
    images: {
      thumbnail: "/assets/products/문양/격자문/격자문_대각선.png",
      detail: [
        "/assets/products/문양/격자문/격자문_대각선.png",
        "/assets/products/문양/격자문/격자문_정면.png",
        "/assets/products/문양/격자문/격자문_측면.png"
      ]
    }
  },
];
