
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ChatAssistant from './components/ChatAssistant';
import RiseCollection from './pages/RiseCollection';
import Journal from './pages/Journal';
import GiftCards from './pages/GiftCards';
import ProductDetail from './pages/ProductDetail';
import { MOCK_PRODUCTS, JOURNAL_ARTICLES, COLLECTION_CARDS } from './data';
import { Product, CartItem } from './types';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const HomePage: React.FC<{ onAddToCart: (product: Product, size: string, color: string) => void }> = ({ onAddToCart }) => {
  return (
    <>
      <Hero />

      {/* Collection Cards - Horizontal scroll on mobile */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
            {COLLECTION_CARDS.map((card, idx) => (
              <div key={idx} className="group relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer flex-shrink-0 w-[75vw] md:w-auto snap-center rounded-lg md:rounded-none">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                <div className="absolute inset-x-4 md:inset-x-8 bottom-6 md:bottom-12 text-white">
                  <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tighter mb-2 md:mb-4">{card.title}</h3>
                  <Link to="/collection/rise" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] border-b-2 border-white pb-1 group-hover:gap-4 transition-all">Explore</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid - 2 columns on mobile */}
      <section id="collection" className="py-12 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-row justify-between items-end mb-8 md:mb-16 gap-4">
            <div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 mb-1 md:mb-2 block">Performance Wear</span>
              <h2 className="text-2xl md:text-5xl font-black tracking-tighter">THE RISE COLLECTION</h2>
            </div>
            <Link to="/collection/rise" className="text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-opacity whitespace-nowrap">View All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-6 md:gap-y-12">
            {MOCK_PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Journal Preview - 2 columns on mobile */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black tracking-tighter mb-2 md:mb-4">THE JOURNAL</h2>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto font-medium">Fuel your movement with the latest from ATHŸRE.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
            {JOURNAL_ARTICLES.map(article => (
              <div key={article.id} className="group cursor-pointer">
                <div className="aspect-square overflow-hidden mb-3 md:mb-6 bg-gray-100 relative rounded-lg md:rounded-none">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-2 left-2 md:top-4 md:left-4 bg-white text-black text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] px-2 py-1 md:px-3 md:py-1.5 shadow-xl">{article.category}</span>
                </div>
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">{article.title}</h3>
                <p className="hidden md:block text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-widest text-gray-400">
                  <span>{article.readTime} Min</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Link to="/journal" className="inline-block w-full md:w-auto border-2 border-black px-8 md:px-10 py-3 md:py-4 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter - Compact on mobile */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-black text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-6xl font-black tracking-tighter mb-4 md:mb-8 italic">JOIN THE MOVEMENT</h2>
          <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-12 font-medium">Unlock 10% off your first order and be the first to know about drops.</p>
          <form className="flex flex-col sm:flex-row gap-3 md:gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-1 bg-white/10 border border-white/20 px-4 md:px-6 py-3 md:py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:bg-white/20 transition-all"
            />
            <button className="bg-white text-black px-8 md:px-10 py-3 md:py-4 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 md:py-20 px-4 md:px-6 border-t border-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
          <div>
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 mb-4 md:mb-6">Explore</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-bold uppercase tracking-wider md:tracking-widest">
              <li><Link to="/collection/rise" className="hover:text-gray-400 transition-colors">Shop All</Link></li>
              <li><Link to="/collection/rise" className="hover:text-gray-400 transition-colors">Rise Collection</Link></li>
              <li><Link to="/gift-cards" className="hover:text-gray-400 transition-colors">Gift Cards</Link></li>
              <li><Link to="/journal" className="hover:text-gray-400 transition-colors">Journal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 mb-4 md:mb-6">Support</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-bold uppercase tracking-wider md:tracking-widest">
              <li><a href="#" className="hover:text-gray-400 transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div className="hidden md:block">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Our World</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-gray-400 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-gray-400 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 mb-4 md:mb-6">Follow Us</h4>
            <div className="flex gap-3 md:gap-4">
              <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"><Youtube size={18} /></a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-10 border-t border-gray-100 gap-4 md:gap-6">
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest text-gray-400">© 2025 ATHŸRE</p>
          <div className="flex gap-6 md:gap-8 text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest text-gray-400">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

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
    <BrowserRouter>
      <div className="relative min-h-screen bg-white">
        <Header
          scrolled={scrolled}
          cartCount={cartCount}
          onCartClick={() => setCartOpen(true)}
          onMenuClick={() => setMobileMenuOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          onMobileMenuClose={() => setMobileMenuOpen(false)}
        />

        <Routes>
          <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
          <Route path="/collection/rise" element={<RiseCollection onAddToCart={addToCart} />} />
          <Route path="/product/:handle" element={<ProductDetail onAddToCart={addToCart} />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/gift-cards" element={<GiftCards />} />
        </Routes>

        <Footer />

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
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => {
              setShowEmailPopup(false);
              localStorage.setItem('athyre_popup_dismissed', 'true');
            }} />
            <div className="relative bg-white w-full md:max-w-4xl overflow-hidden shadow-2xl animate-fade-in flex flex-col md:flex-row rounded-t-2xl md:rounded-none">
              <div className="hidden md:block w-1/2 bg-gray-100">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800" alt="Athyre Movement" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-3 md:mb-4 italic uppercase">First Move is Ours</h2>
                <p className="text-gray-500 font-medium mb-6 md:mb-8 leading-relaxed uppercase tracking-wider text-[10px] md:text-xs">Join for 10% off your first purchase and VIP access.</p>
                <input type="email" placeholder="EMAIL ADDRESS" className="w-full border-b-2 border-black py-3 text-xs font-bold uppercase tracking-widest focus:outline-none mb-6 md:mb-8" />
                <button
                  onClick={() => {
                    setShowEmailPopup(false);
                    localStorage.setItem('athyre_popup_dismissed', 'true');
                  }}
                  className="w-full bg-black text-white py-3 md:py-4 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-gray-900 transition-all mb-3 md:mb-4"
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
    </BrowserRouter>
  );
};

export default App;
