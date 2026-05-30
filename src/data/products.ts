export interface Product {
  id: string;
  name: string;
  engName: string;
  price: string;
  category: "전통공예" | "꽃 컬렉션" | "궁궐 컬렉션" | "날개 컬렉션" | "문양 컬렉션";
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
  // 전통공예
  {
    id: "craft-1",
    name: "청화 리본 01 RD",
    engName: "CHUNGHWA RIBBON 01 RD",
    price: "₩420,000",
    category: "전통공예",
    color: "red",
    type: "sunglasses",
  },
  {
    id: "craft-2",
    name: "나전 윙 02 NV",
    engName: "NAJEON WING 02 NV",
    price: "₩450,000",
    category: "전통공예",
    color: "navy",
    type: "sunglasses",
  },
  {
    id: "craft-3",
    name: "백자 쉘 03 IV",
    engName: "BAEKJA SHELL 03 IV",
    price: "품절",
    category: "전통공예",
    color: "ivory",
    type: "glasses",
    soldOut: true,
  },
  {
    id: "craft-4",
    name: "오리가미 02",
    engName: "ORIGAMI 02",
    price: "₩320,000",
    category: "전통공예",
    color: "silver",
    type: "glasses",
    statusText: "재입고 예정",
  },

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
    id: "flower-2",
    name: "벚꽃 02",
    engName: "BEOTKKOT 02",
    price: "₩450,000",
    category: "꽃 컬렉션",
    color: "rose",
    type: "glasses",
    images: {
      thumbnail: "/assets/products/꽃/벚꽃/벚꽃_대각선.png",
      detail: [
        "/assets/products/꽃/벚꽃/벚꽃_대각선.png",
        "/assets/products/꽃/벚꽃/벚꽃_정면.png",
        "/assets/products/꽃/벚꽃/벚꽃_측면.png"
      ]
    }
  },
  {
    id: "flower-3",
    name: "연꽃 03",
    engName: "YEONLOT 03",
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
    name: "국화 04",
    engName: "GUKHWA 04",
    price: "₩450,000",
    category: "꽃 컬렉션",
    color: "gold",
    type: "glasses",
    soldOut: true,
    statusText: "품절",
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
  },
  {
    id: "palace-2",
    name: "창호 02",
    engName: "CHANGHO 02",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "matte-black",
    type: "sunglasses",
  },
  {
    id: "palace-3",
    name: "문양 03",
    engName: "MUNYANG 03",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "gold-black",
    type: "glasses",
  },
  {
    id: "palace-4",
    name: "단청 04",
    engName: "DANCHEONG 04",
    price: "₩400,000",
    category: "궁궐 컬렉션",
    color: "translucent",
    type: "glasses",
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
  },
  {
    id: "wing-2",
    name: "천공 02",
    engName: "CHEONGONG 02",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "chrome",
    type: "sunglasses",
  },
  {
    id: "wing-3",
    name: "신의 03",
    engName: "SINUI 03",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "dark-wing",
    type: "sunglasses",
  },
  {
    id: "wing-4",
    name: "바람 04",
    engName: "BARAM 04",
    price: "₩420,000",
    category: "날개 컬렉션",
    color: "titanium",
    type: "glasses",
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
  },
  {
    id: "pattern-2",
    name: "당초문 02",
    engName: "DANGCHOMUN 02",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "amber-gold",
    type: "glasses",
  },
  {
    id: "pattern-3",
    name: "격자문 03",
    engName: "GYEOKJAMUN 03",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "dark-grid",
    type: "sunglasses",
  },
  {
    id: "pattern-4",
    name: "삼태극문 04",
    engName: "SAMTAEGUKMUN 04",
    price: "₩400,000",
    category: "문양 컬렉션",
    color: "cream-taegeuk",
    type: "glasses",
  },
];
