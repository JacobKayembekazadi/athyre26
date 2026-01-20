
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronLeft, Check, Truck, RefreshCw, Shield } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductDetailProps {
  onAddToCart: (product: Product, size: string, color: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { handle } = useParams<{ handle: string }>();
  const product = MOCK_PRODUCTS.find(p => p.handle === handle);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/collection/rise" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart(product, selectedSize, selectedColor || product.colors[0]);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Get related products (same category, excluding current)
  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white pt-14 md:pt-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <Link
          to="/collection/rise"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
        >
          <ChevronLeft size={14} />
          Back to Collection
        </Link>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 md:px-6 pb-12 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg md:rounded-none">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 md:w-24 md:h-28 bg-gray-100 overflow-hidden rounded-md md:rounded-none ${
                      selectedImage === idx ? 'ring-2 ring-black' : 'opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            {/* Title & Price */}
            <div className="mb-6">
              {product.isNew && (
                <span className="inline-block bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 mb-3">
                  New
                </span>
              )}
              <h1 className="text-2xl md:text-4xl font-black tracking-tighter mb-2">
                {product.title}
              </h1>
              <p className="text-xl md:text-2xl font-bold">${product.price}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-black text-black' : 'text-gray-200'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Color: {selectedColor || product.colors[0]}
              </p>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      (selectedColor || product.colors[0]) === color
                        ? 'border-black scale-110'
                        : 'border-transparent hover:border-gray-300'
                    } ${
                      color === 'Black' ? 'bg-black' :
                      color === 'Navy' ? 'bg-blue-900' :
                      color === 'Cherry' ? 'bg-red-800' : 'bg-gray-400'
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Size {selectedSize && `: ${selectedSize}`}
                </p>
                <button className="text-xs font-bold uppercase tracking-widest underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 md:w-14 md:h-14 border-2 flex items-center justify-center text-sm font-bold transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`w-full py-4 md:py-5 font-black text-sm uppercase tracking-widest transition-all mb-6 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {addedToCart ? (
                <span className="flex items-center justify-center gap-2">
                  <Check size={18} /> Added to Cart
                </span>
              ) : (
                `Add to Cart - $${product.price}`
              )}
            </button>

            {/* Features */}
            <div className="space-y-4 py-6 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm">
                <Truck size={20} className="text-gray-400" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <RefreshCw size={20} className="text-gray-400" />
                <span>Free 30-day returns</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Shield size={20} className="text-gray-400" />
                <span>2-year warranty</span>
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Product Details
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Engineered for peak performance, the {product.title} features our signature
                4-way stretch fabric that moves with you. Moisture-wicking technology keeps
                you dry during intense workouts, while the flatlock seams prevent chafing.
                Made from recycled materials as part of our commitment to sustainability.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• 4-way stretch for unrestricted movement</li>
                <li>• Moisture-wicking & quick-dry fabric</li>
                <li>• Flatlock seams for comfort</li>
                <li>• Made from recycled materials</li>
                <li>• Machine washable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-24 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-3xl font-black tracking-tighter mb-8 md:mb-12">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-6 md:gap-y-12">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
