
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product, size, product.colors[0]);
    setShowSizes(false);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSizes(!showSizes);
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
      {/* Image Container - Links to product page */}
      <Link to={`/product/${product.handle}`} className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-lg md:rounded-none block">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {product.isNew && (
          <span className="absolute top-2 left-2 md:top-4 md:left-4 bg-white text-black text-[8px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-widest px-2 py-0.5 md:px-3 md:py-1 shadow-sm">
            New
          </span>
        )}

        {/* Quick Add Overlay - Desktop only */}
        <div className={`hidden md:block absolute inset-x-0 bottom-0 p-4 transition-all duration-300 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {!showSizes ? (
            <button
              onClick={handleQuickAddClick}
              className="w-full bg-black text-white py-3 font-bold text-xs uppercase tracking-widest hover:bg-gray-900 transition flex items-center justify-center gap-2"
            >
              <Plus size={14} /> Quick Add
            </button>
          ) : (
            <div className="bg-white p-3 shadow-2xl space-y-3 animate-fade-in" onClick={e => e.preventDefault()}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">Select Size</p>
              <div className="flex flex-wrap justify-center gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAdd(e, size)}
                    className="w-10 h-10 border border-gray-200 flex items-center justify-center text-xs font-bold hover:bg-black hover:text-white transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Quick Add Button */}
        <button
          onClick={handleQuickAddClick}
          className="md:hidden absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus size={16} className="text-black" />
        </button>

        {/* Mobile Size Selector */}
        {showSizes && (
          <div
            className="md:hidden absolute inset-x-2 bottom-12 bg-white p-3 rounded-lg shadow-2xl animate-fade-in"
            onClick={e => e.preventDefault()}
          >
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-center mb-2">Select Size</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold active:bg-black active:text-white transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </Link>

      {/* Info - Also links to product page */}
      <Link to={`/product/${product.handle}`} className="pt-2 md:pt-4 pb-1 md:pb-2 block">
        <div className="flex justify-between items-start mb-0.5 md:mb-1 gap-2">
          <h3 className="font-semibold text-xs md:text-sm tracking-tight line-clamp-2 group-hover:text-gray-600 transition-colors">
            {product.title}
          </h3>
          <p className="font-bold text-xs md:text-sm flex-shrink-0">${product.price}</p>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(product.rating) ? 'fill-black text-black' : 'text-gray-200'}
              />
            ))}
          </div>
          <span className="text-[9px] md:text-[10px] text-gray-400 font-medium">({product.reviews})</span>
        </div>

        {/* Colors */}
        <div className="mt-2 md:mt-3 flex gap-1 md:gap-1.5">
          {product.colors.map(color => (
            <div
              key={color}
              title={color}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-gray-100 ${
                color === 'Black' ? 'bg-black' :
                color === 'Navy' ? 'bg-blue-900' :
                color === 'Cherry' ? 'bg-red-800' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
