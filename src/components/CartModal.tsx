import { motion } from 'motion/react';
import { X, Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import GlassesRenderer from './GlassesRenderer';

export interface CartItem {
  product: Product;
  colorName: string;
  quantity: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  wishlistItems: Product[];
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCartFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  activeTab: 'cart' | 'wishlist';
  setActiveTab: (tab: 'cart' | 'wishlist') => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  wishlistItems,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onRemoveFromWishlist,
  onAddToCartFromWishlist,
  onSelectProduct,
  activeTab,
  setActiveTab,
}: Props) {
  if (!isOpen) return null;

  // Format helper to display price sum nicely
  const calculateSubtotal = () => {
    let sum = 0;
    cartItems.forEach((item) => {
      // Extract numeric price (e.g. ₩450,000 -> 450000)
      const numStr = item.product.price.replace(/[^0-9]/g, '');
      const val = parseInt(numStr, 10) || 420000; // fallback if dynamic string parse fails
      sum += val * item.quantity;
    });
    return `₩${sum.toLocaleString()}`;
  };

  const handleCheckout = () => {
    alert(`주문 및 결제 페이지로 이동합니다.\n구매 대행 총액: ${calculateSubtotal()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-brand-bg z-[2000] flex flex-col pt-[48px] overflow-y-auto"
      id="cart-overlay-container"
    >
      {/* HEADER SECTION (Tabs and Close button) */}
      <div className="absolute top-0 inset-x-0 h-[48px] border-b border-black/5 px-6 md:px-12 flex items-center justify-between bg-brand-bg/95 backdrop-blur-md z-10">
        {/* Left spacing to center the middle items precisely */}
        <div className="w-10" />

        {/* Cetered Tabs exactly modeled after user's mockup image */}
        <div className="flex items-center gap-1 bg-neutral-200/50 p-1 rounded-full h-[32px] md:h-[34px] shadow-xs">
          <button
            onClick={() => setActiveTab('cart')}
            className={`px-5 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-0.5 ${
              activeTab === 'cart'
                ? 'bg-white text-black shadow-xs'
                : 'text-neutral-500 hover:text-black hover:bg-neutral-100/50'
            }`}
            id="tab-shopping-bag"
          >
            쇼핑백
            <span className="text-[9px] font-mono leading-none align-super select-none origin-bottom translate-y-[-2px] tracking-tighter">
              {cartItems.length === 0 ? '⁰' : cartItems.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-5 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-0.5 ${
              activeTab === 'wishlist'
                ? 'bg-white text-black shadow-xs'
                : 'text-neutral-500 hover:text-black hover:bg-neutral-100/50'
            }`}
            id="tab-wishlist"
          >
            위시리스트
            <span className="text-[9px] font-mono leading-none align-super select-none origin-bottom translate-y-[-2px] tracking-tighter">
              {wishlistItems.length === 0 ? '⁰' : wishlistItems.length}
            </span>
          </button>
        </div>

        {/* Right close button matching the mockup exactly */}
        <button
          onClick={onClose}
          className="p-1 cursor-pointer hover:opacity-60 transition-colors duration-200 flex items-center justify-center"
          title="닫기"
          id="cart-close-button"
        >
          <X size={19} strokeWidth={1.5} className="text-neutral-700" />
        </button>
      </div>

      {/* CONTENT BODY CONTAINER */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 flex flex-col justify-center items-center min-h-[calc(100vh-140px)]">
        {activeTab === 'cart' ? (
          cartItems.length === 0 ? (
            /* EMPTY CART: Mockup replica */
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center gap-6"
              id="empty-cart-view"
            >
              <p className="text-[12.5px] font-bold text-neutral-800 tracking-tight">
                쇼핑백에 추가된 제품이 없습니다.
              </p>
              
              <button
                onClick={onClose}
                className="px-20 py-3.5 border border-black/10 bg-white hover:bg-neutral-50 hover:border-black/30 rounded-xl text-[12px] font-extrabold text-neutral-800 transition-all cursor-pointer shadow-xs"
                id="btn-continue-shopping-cart"
              >
                쇼핑 계속하기
              </button>
            </motion.div>
          ) : (
            /* CART LISTING */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col gap-6"
              id="cart-filled-view"
            >
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                  CART ITEMS ({cartItems.length})
                </span>
                <span className="text-[10px] font-mono text-neutral-400 font-bold">
                  VERIFIED STOCKS
                </span>
              </div>

              {/* Cart Items Cards */}
              <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white border border-black/5 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-sm relative group"
                  >
                    {/* SVG Vector Glasses renderer mini box */}
                    <div
                      onClick={() => {
                        onSelectProduct(item.product);
                        onClose();
                      }}
                      className="w-28 h-16 bg-neutral-50 hover:bg-neutral-100 rounded-xl flex items-center justify-center p-1.5 shrink-0 border border-black/5 cursor-pointer relative"
                    >
                      <GlassesRenderer id={item.product.id} viewType="front" />
                    </div>

                    {/* Metadata summary */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                        <span className="text-[9px] font-bold font-mono text-amber-800 uppercase tracking-widest bg-amber-50 px-1.5 py-0.5 rounded w-fit mx-auto sm:mx-0">
                          {item.product.category}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {item.product.id.toUpperCase()}
                        </span>
                      </div>
                      <h4
                        onClick={() => {
                          onSelectProduct(item.product);
                          onClose();
                        }}
                        className="text-sm font-extrabold text-neutral-900 mt-1 hover:underline cursor-pointer"
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-[10.5px] text-neutral-400 font-mono uppercase mt-0.5 leading-none">
                        {item.product.engName} / {item.colorName || 'Default Color'}
                      </p>
                    </div>

                    {/* Item Controls right aligned */}
                    <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-black/5 pt-3 sm:pt-0 mt-2 sm:mt-0">
                      {/* Price tag */}
                      <div className="text-center sm:text-right">
                        <span className="text-xs font-mono text-neutral-400 font-semibold block uppercase">
                          Price
                        </span>
                        <span className="text-sm font-bold font-mono text-neutral-900">
                          {item.product.price}
                        </span>
                      </div>

                      {/* Quantity Incrementor */}
                      <div className="flex items-center justify-between sm:justify-start gap-4">
                        <div className="flex items-center border border-black/10 rounded-lg overflow-hidden bg-neutral-50 h-[28px]">
                          <button
                            onClick={() =>
                              onUpdateCartQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="px-2.5 h-full hover:bg-black/5 text-neutral-500 font-bold transition-colors cursor-pointer text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-bold font-mono text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateCartQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-2.5 h-full hover:bg-black/5 text-neutral-500 font-bold transition-colors cursor-pointer text-xs"
                          >
                            +
                          </button>
                        </div>

                        {/* Direct Removal */}
                        <button
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="p-1.5 hover:bg-red-50 text-neutral-400 hover:text-red-500 rounded-lg transition-all duration-200 cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Calculation and action buttons */}
              <div className="mt-4 bg-white border border-black/5 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs font-bold text-neutral-500 font-mono">
                  <span>SUBTOTAL AMOUNT</span>
                  <span className="text-lg font-bold text-black font-mono">
                    {calculateSubtotal()}
                  </span>
                </div>
                <div className="text-[10px] text-neutral-400 leading-relaxed font-semibold">
                  * 본 상품은 무형문화재 공예 장인 배송 라인업이 수공 조립하여 즉시 직배송 처리됩니다. 무료보험 배송 혜택이 정상적으로 적용됩니다.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                  <button
                    onClick={onClose}
                    className="w-full bg-neutral-50 hover:bg-neutral-100 border border-black/10 py-3.5 rounded-xl text-xs font-extrabold tracking-wider transition-all cursor-pointer text-center text-neutral-700"
                  >
                    쇼핑 계속하기
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 rounded-xl text-xs font-extrabold tracking-widest transition-all cursor-pointer text-center shadow-lg active:scale-[0.99] flex items-center justify-center gap-1.5"
                  >
                    결제하기 <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        ) : wishlistItems.length === 0 ? (
          /* EMPTY WISHLIST */
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center gap-6"
            id="empty-wishlist-view"
          >
            <p className="text-[12.5px] font-bold text-neutral-800 tracking-tight">
              위시리스트에 추가된 제품이 없습니다.
            </p>
            
            <button
              onClick={onClose}
              className="px-20 py-3.5 border border-black/10 bg-white hover:bg-neutral-50 hover:border-black/30 rounded-xl text-[12px] font-extrabold text-neutral-800 transition-all cursor-pointer shadow-xs"
              id="btn-continue-shopping-wishlist"
            >
              쇼핑 계속하기
            </button>
          </motion.div>
        ) : (
          /* WISHLIST ITEMS GRID */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-6"
            id="wishlist-filled-view"
          >
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                WISHLIST ITEMS ({wishlistItems.length})
              </span>
              <span className="text-[10px] font-mono text-neutral-400 font-bold">
                FAVORITE ARCHIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
              {wishlistItems.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-black/5 p-4 rounded-2xl flex items-center gap-4 shadow-sm relative group"
                >
                  {/* SVG mini box */}
                  <div
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="w-24 h-16 bg-neutral-50 hover:bg-neutral-100 rounded-xl flex items-center justify-center p-1 border border-black/5 cursor-pointer shrink-0"
                  >
                    <GlassesRenderer id={prod.id} viewType="front" />
                  </div>

                  {/* Details metadata */}
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[8.5px] font-bold font-mono text-amber-800 uppercase tracking-widest leading-none block">
                      {prod.category}
                    </span>
                    <h4
                      onClick={() => {
                        onSelectProduct(prod);
                        onClose();
                      }}
                      className="text-xs font-extrabold text-neutral-900 mt-1 hover:underline cursor-pointer truncate"
                    >
                      {prod.name}
                    </h4>
                    <p className="text-[9.5px] text-neutral-400 font-mono uppercase truncate mt-0.5">
                      {prod.engName}
                    </p>
                    <span className="text-xs font-mono font-bold text-neutral-900 block mt-1.5">
                      {prod.price}
                    </span>
                  </div>

                  {/* Actions for Wishlist item */}
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => onAddToCartFromWishlist(prod)}
                      className="bg-neutral-900 hover:bg-black text-white px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold tracking-tight cursor-pointer shadow-xs flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <ShoppingBag size={11} /> 담기
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(prod.id)}
                      className="bg-neutral-50 hover:bg-red-50 hover:text-red-500 border border-black/5 text-neutral-400 px-2.5 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 text-center">
              <button
                onClick={onClose}
                className="inline-block border border-black/10 hover:border-black/30 bg-neutral-50 hover:bg-white text-xs font-extrabold px-12 py-3 rounded-xl cursor-pointer transition-all shadow-2xs"
              >
                쇼핑 계속하기
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
