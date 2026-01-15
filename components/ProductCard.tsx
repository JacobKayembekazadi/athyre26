
import React, { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const handleQuickAdd = (size: string) => {
    onAddToCart(product, size, product.colors[0]);
    setShowSizes(false);
  };

  return (
    <div 
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-sm">
            New
          </span>
        )}

        {/* Quick Add Overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {!showSizes ? (
            <button 
              onClick={() => setShowSizes(true)}
              className="w-full bg-black text-white py-3 font-bold text-xs uppercase tracking-widest hover:bg-gray-900 transition flex items-center justify-center gap-2"
            >
              <Plus size={14} /> Quick Add
            </button>
          ) : (
            <div className="bg-white p-3 shadow-2xl space-y-3 animate-fade-in">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">Select Size</p>
              <div className="flex flex-wrap justify-center gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => handleQuickAdd(size)}
                    className="w-10 h-10 border border-gray-200 flex items-center justify-center text-xs font-bold hover:bg-black hover:text-white transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-sm tracking-tight">{product.title}</h3>
          <p className="font-bold text-sm">${product.price}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(product.rating) ? 'fill-black text-black' : 'text-gray-200'}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
        </div>

        {/* Colors */}
        <div className="mt-3 flex gap-1.5">
          {product.colors.map(color => (
            <div 
              key={color} 
              title={color}
              className={`w-3 h-3 rounded-full border border-gray-100 cursor-pointer ${
                color === 'Black' ? 'bg-black' : 
                color === 'Navy' ? 'bg-blue-900' : 
                color === 'Cherry' ? 'bg-red-800' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
