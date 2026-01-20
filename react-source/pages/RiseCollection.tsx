
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../data';
import { Product } from '../types';

interface RiseCollectionProps {
  onAddToCart: (product: Product, size: string, color: string) => void;
}

type FilterCategory = 'All' | 'Tops' | 'Bottoms' | 'Outerwear';

const RiseCollection: React.FC<RiseCollectionProps> = ({ onAddToCart }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const filteredProducts = activeFilter === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(product => product.category === activeFilter);

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-24">
      {/* Hero Banner - Shorter on mobile */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920"
            alt="Rise Collection"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 md:mb-4">
            Performance Wear
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-3 md:mb-6">
            THE RISE<br />COLLECTION
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto font-medium px-4">
            Engineered for movement. Designed for performance.
          </p>
        </div>
      </section>

      {/* Filter Bar - Horizontally scrollable on mobile */}
      <section className="border-b border-gray-100 sticky top-14 md:top-16 bg-white z-20">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar">
              {(['All', 'Tops', 'Bottoms', 'Outerwear'] as FilterCategory[]).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-[11px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest whitespace-nowrap transition-colors ${
                    activeFilter === filter ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
              {filteredProducts.length} Items
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid - 2 columns on mobile */}
      <section className="py-8 md:py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-6 md:gap-y-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Collection Story - Compact on mobile */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 md:mb-8">
            RISE ABOVE. MOVE FORWARD.
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8 px-2">
            The Rise Collection is more than activewear. It's a statement of intent.
            Every piece is crafted with precision, using performance fabrics that move
            with you and push you to new heights.
          </p>
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
            <div>
              <div className="text-xl md:text-3xl font-black mb-1 md:mb-2">4-Way</div>
              <div className="text-[9px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-gray-400">Stretch</div>
            </div>
            <div>
              <div className="text-xl md:text-3xl font-black mb-1 md:mb-2">100%</div>
              <div className="text-[9px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-gray-400">Moisture Wicking</div>
            </div>
            <div>
              <div className="text-xl md:text-3xl font-black mb-1 md:mb-2">Eco</div>
              <div className="text-[9px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-gray-400">Conscious</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RiseCollection;
