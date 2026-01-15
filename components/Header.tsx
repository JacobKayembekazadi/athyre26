
import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';

interface HeaderProps {
  scrolled: boolean;
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrolled, cartCount, onCartClick, onMenuClick }) => {
  const [shopDropdown, setShopDropdown] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm h-16' : 'bg-transparent h-24'
    }`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 -ml-2 text-current" onClick={onMenuClick}>
          <Menu className={scrolled ? 'text-black' : 'text-white'} size={24} />
        </button>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          <a 
            href="#" 
            className={`text-2xl font-black tracking-tighter transition-colors ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          >
            ATHŸRE
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setShopDropdown(true)}
            onMouseLeave={() => setShopDropdown(false)}
          >
            <button className={`flex items-center gap-1 font-medium text-sm uppercase tracking-widest hover:opacity-70 transition-all ${
              scrolled ? 'text-black' : 'text-white'
            }`}>
              Shop <ChevronDown size={14} className={`transition-transform duration-300 ${shopDropdown ? 'rotate-180' : ''}`} />
            </button>
            {shopDropdown && (
              <div className="absolute top-[100%] left-0 pt-4 animate-fade-in">
                <div className="bg-white text-black shadow-2xl rounded-sm py-4 min-w-[240px] border border-gray-100">
                  <a href="#collection" className="block px-6 py-3 hover:bg-gray-50 font-medium text-xs uppercase tracking-wider">The Rise Collection</a>
                  <a href="#collection" className="block px-6 py-3 hover:bg-gray-50 font-medium text-xs uppercase tracking-wider">New Arrivals</a>
                  <a href="#collection" className="block px-6 py-3 hover:bg-gray-50 font-medium text-xs uppercase tracking-wider">Best Sellers</a>
                  <div className="h-px bg-gray-100 my-2 mx-6"></div>
                  <a href="#collection" className="block px-6 py-3 hover:bg-gray-50 font-medium text-xs uppercase tracking-wider">Shop All</a>
                </div>
              </div>
            )}
          </div>
          <a href="#journal" className={`font-medium text-sm uppercase tracking-widest hover:opacity-70 transition-all ${scrolled ? 'text-black' : 'text-white'}`}>The Journal</a>
          <a href="#" className={`font-medium text-sm uppercase tracking-widest hover:opacity-70 transition-all ${scrolled ? 'text-black' : 'text-white'}`}>Our Story</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-5 lg:space-x-8">
          <button className={`hover:opacity-60 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}>
            <Search size={20} />
          </button>
          <button className={`hidden sm:block hover:opacity-60 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}>
            <User size={20} />
          </button>
          <button 
            onClick={onCartClick}
            className={`relative hover:opacity-60 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
