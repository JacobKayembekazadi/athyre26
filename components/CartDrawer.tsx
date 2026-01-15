
import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  items: CartItem[];
  total: number;
  onClose: () => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ items, total, onClose, onUpdateQuantity }) => {
  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-fade-in origin-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold tracking-tighter">YOUR BAG</h2>
            <span className="text-xs font-bold text-gray-400">({items.length})</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <ShoppingBag size={64} strokeWidth={1} className="mb-4" />
              <p className="font-medium">Your shopping bag is empty.</p>
              <button onClick={onClose} className="mt-4 text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1">Start Shopping</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.cartId} className="flex gap-4 group">
                <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm tracking-tight">{item.title}</h3>
                    <p className="font-bold text-sm">${item.price}</p>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4">
                    {item.selectedColor} / Size {item.selectedSize}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        className="p-1.5 hover:text-red-500 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        className="p-1.5 hover:text-green-500 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onUpdateQuantity(item.cartId, -item.quantity)}
                      className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Subtotal</span>
              <span className="text-xl font-black">${total.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Shipping and taxes calculated at checkout. Free shipping on orders over $150.
            </p>
            <button className="w-full bg-black text-white py-4 font-black text-sm uppercase tracking-[0.2em] hover:bg-gray-900 transition-all shadow-xl">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
