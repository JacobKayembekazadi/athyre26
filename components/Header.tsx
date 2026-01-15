
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';

interface HeaderProps {
  scrolled: boolean;
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  mobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrolled, cartCount, onCartClick, onMenuClick, mobileMenuOpen, onMobileMenuClose }) => {
  const [shopDropdown, setShopDropdown] = useState(false);
  const location = useLocation();

  // Only use transparent header on home page when not scrolled
  const isHomePage = location.pathname === '/';
  const showTransparentHeader = isHomePage && !scrolled;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        showTransparentHeader ? 'bg-transparent h-20 md:h-24' : 'bg-white/95 backdrop-blur-md shadow-sm h-14 md:h-16'
      }`}>
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 -ml-2" onClick={onMenuClick}>
            <Menu className={showTransparentHeader ? 'text-white' : 'text-black'} size={22} />
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Link
              to="/"
              className={`text-xl md:text-2xl font-black tracking-tighter transition-colors ${
                showTransparentHeader ? 'text-white' : 'text-black'
              }`}
            >
              ATHŸRE
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-10">
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setShopDropdown(true)}
              onMouseLeave={() => setShopDropdown(false)}
            >
              <button className={`flex items-center gap-1 font-medium text-sm uppercase tracking-widest hover:opacity-70 transition-all ${
                showTransparentHeader ? 'text-white' : 'text-black'
              }`}>
                Shop <ChevronDown size={14} className={`transition-transform duration-300 ${shopDropdown ? 'rotate-180' : ''}`} />
              </button>
              {shopDropdown && (
                <div className="absolute top-[100%] left-0 pt-4 animate-fade-in">
                  <div className="bg-white text-black shadow-2xl rounded-sm py-4 min-w-[240px] border border-gray-100">
                    <Link to="/collection/rise" className="block px-6 py-3 hover:bg-gray-50 font-medium text-xs uppercase tracking-wider">The Rise Collection</Link>
                    <Link to="/collection/rise" className="block px-6 py-3 hover:bg-gray-50 font-medium text-xs uppercase tracking-wider">New Arrivals</Link>
                    <Link to="/collection/rise" className="block px-6 py-3 hover:bg-gray-50 font-medium text-xs uppercase tracking-wider">Best Sellers</Link>
                    <div className="h-px bg-gray-100 my-2 mx-6"></div>
                    <Link to="/collection/rise" className="block px-6 py-3 hover:bg-gray-50 font-medium text-xs uppercase tracking-wider">Shop All</Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/journal" className={`font-medium text-sm uppercase tracking-widest hover:opacity-70 transition-all ${showTransparentHeader ? 'text-white' : 'text-black'}`}>The Journal</Link>
            <Link to="/gift-cards" className={`font-medium text-sm uppercase tracking-widest hover:opacity-70 transition-all ${showTransparentHeader ? 'text-white' : 'text-black'}`}>Gift Cards</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            <button className={`hover:opacity-60 transition-opacity ${showTransparentHeader ? 'text-white' : 'text-black'}`}>
              <Search size={20} />
            </button>
            <button className={`hidden sm:block hover:opacity-60 transition-opacity ${showTransparentHeader ? 'text-white' : 'text-black'}`}>
              <User size={20} />
            </button>
            <button
              onClick={onCartClick}
              className={`relative hover:opacity-60 transition-opacity ${showTransparentHeader ? 'text-white' : 'text-black'}`}
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onMobileMenuClose} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-fade-in">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <Link
                to="/"
                onClick={onMobileMenuClose}
                className="text-xl font-black tracking-tighter"
              >
                ATHŸRE
              </Link>
              <button onClick={onMobileMenuClose} className="p-2 -mr-2">
                <X size={24} />
              </button>
            </div>
            <nav className="p-6">
              <div className="space-y-1">
                <Link
                  to="/"
                  onClick={onMobileMenuClose}
                  className="block py-4 font-bold text-sm uppercase tracking-widest border-b border-gray-100"
                >
                  Home
                </Link>
                <Link
                  to="/collection/rise"
                  onClick={onMobileMenuClose}
                  className="block py-4 font-bold text-sm uppercase tracking-widest border-b border-gray-100"
                >
                  Shop Collection
                </Link>
                <Link
                  to="/journal"
                  onClick={onMobileMenuClose}
                  className="block py-4 font-bold text-sm uppercase tracking-widest border-b border-gray-100"
                >
                  The Journal
                </Link>
                <Link
                  to="/gift-cards"
                  onClick={onMobileMenuClose}
                  className="block py-4 font-bold text-sm uppercase tracking-widest border-b border-gray-100"
                >
                  Gift Cards
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
