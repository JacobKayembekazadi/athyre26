
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ChatAssistant from './components/ChatAssistant';
import { MOCK_PRODUCTS, JOURNAL_ARTICLES, COLLECTION_CARDS } from './data';
import { Product, CartItem } from './types';
import { ArrowRight, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);

    // Show popup after delay
    const popupShown = localStorage.getItem('athyre_popup_dismissed');
    if (!popupShown) {
      const timer = setTimeout(() => setShowEmailPopup(true), 4000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = useCallback((product: Product, size: string, color: string) => {
    const cartId = `${product.id}-${size}-${color}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => 
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, cartId, selectedSize: size, selectedColor: color, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const updateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => {
      const item = prev.find(i => i.cartId === cartId);
      if (!item) return prev;
      const newQty = item.quantity + delta;
      if (newQty <= 0) return prev.filter(i => i.cartId !== cartId);
      return prev.map(i => i.cartId === cartId ? { ...i, quantity: newQty } : i);
    });
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-white">
      <Header 
        scrolled={scrolled} 
        cartCount={cartCount} 
        onCartClick={() => setCartOpen(true)} 
        onMenuClick={() => setMobileMenuOpen(true)}
      />

      <Hero />

      {/* Collection Cards */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTION_CARDS.map((card, idx) => (
            <div key={idx} className="group relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
              <div className="absolute inset-x-8 bottom-12 text-white">
                <h3 className="text-2xl font-black leading-tight tracking-tighter mb-4">{card.title}</h3>
                <a href={card.link} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] border-b-2 border-white pb-1 group-hover:gap-4 transition-all">Explore</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section id="collection" className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2 block">Performance Wear</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">THE RISE COLLECTION</h2>
            </div>
            <button className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-opacity">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {MOCK_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Journal */}
      <section id="journal" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">THE JOURNAL</h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">Insights, energy, and form. Fuel your movement with the latest from ATHŸRE.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {JOURNAL_ARTICLES.map(article => (
              <div key={article.id} className="group cursor-pointer">
                <div className="aspect-square overflow-hidden mb-6 bg-gray-100 relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-xl">{article.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-gray-600 transition-colors">{article.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>{article.date}</span>
                  <div className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span>{article.readTime} Min Read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic">JOIN THE MOVEMENT</h2>
          <p className="text-gray-400 mb-12 font-medium">Unlock 10% off your first order and be the first to know about drops and exclusive community events.</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:bg-white/20 transition-all"
            />
            <button className="bg-white text-black px-10 py-4 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Explore</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-gray-400 transition-colors">Shop All</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">The Rise Collection</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">The Journal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Support</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-gray-400 transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Our World</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-gray-400 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"><Youtube size={18} /></a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-100 gap-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">© 2025 ATHŸRE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-black transition-colors">Terms</a>
              <a href="#" className="hover:text-black transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      {cartOpen && (
        <CartDrawer 
          items={cartItems} 
          total={total} 
          onClose={() => setCartOpen(false)} 
          onUpdateQuantity={updateQuantity} 
        />
      )}

      {showEmailPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => {
            setShowEmailPopup(false);
            localStorage.setItem('athyre_popup_dismissed', 'true');
          }} />
          <div className="relative bg-white w-full max-w-4xl overflow-hidden shadow-2xl animate-fade-in flex flex-col md:flex-row">
            <div className="hidden md:block w-1/2 bg-gray-100">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800" alt="Athyre Movement" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-12 text-center md:text-left flex flex-col justify-center">
              <h2 className="text-3xl font-black tracking-tighter mb-4 italic uppercase">First Move is Ours</h2>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed uppercase tracking-wider text-xs">Join the community for 10% off your first purchase and VIP early access to drops.</p>
              <input type="email" placeholder="EMAIL ADDRESS" className="w-full border-b-2 border-black py-3 text-xs font-bold uppercase tracking-widest focus:outline-none mb-8" />
              <button 
                onClick={() => {
                  setShowEmailPopup(false);
                  localStorage.setItem('athyre_popup_dismissed', 'true');
                }}
                className="w-full bg-black text-white py-4 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-gray-900 transition-all mb-4"
              >
                Sign Me Up
              </button>
              <button 
                onClick={() => {
                  setShowEmailPopup(false);
                  localStorage.setItem('athyre_popup_dismissed', 'true');
                }}
                className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default App;
