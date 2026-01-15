
import React from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../data';
import { Product } from '../types';

interface RiseCollectionProps {
  onAddToCart: (product: Product, size: string, color: string) => void;
}

const RiseCollection: React.FC<RiseCollectionProps> = ({ onAddToCart }) => {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920"
            alt="Rise Collection"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4">
            Performance Wear
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
            THE RISE<br />COLLECTION
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto font-medium">
            Engineered for movement. Designed for performance. Built to rise.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b border-gray-100 sticky top-16 bg-white z-20">
        <div className="container mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button className="text-xs font-bold uppercase tracking-widest hover:text-gray-500 transition-colors">
              All
            </button>
            <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              Tops
            </button>
            <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              Bottoms
            </button>
            <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              Outerwear
            </button>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
            {MOCK_PRODUCTS.length} Products
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {MOCK_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Collection Story */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-8">
            RISE ABOVE. MOVE FORWARD.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            The Rise Collection is more than activewear. It's a statement of intent.
            Every piece is crafted with precision, using performance fabrics that move
            with you, breathe with you, and push you to new heights. Whether you're
            hitting the gym, the track, or the streets, Rise is designed to elevate
            your every move.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-3xl font-black mb-2">4-Way</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Stretch Fabric</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-2">100%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Moisture Wicking</div>
            </div>
            <div>
              <div className="text-3xl font-black mb-2">Eco</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Conscious</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RiseCollection;
