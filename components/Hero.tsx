
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920"
          alt="Athlete training"
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          Introducing The Rise Collection
        </span>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          MOVE WITH<br />PURPOSE
        </h1>
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
          <Link
            to="/collection/rise"
            className="inline-block bg-white text-black px-12 py-4 font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl"
          >
            Shop The Collection
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-px h-12 bg-white"></div>
      </div>
    </section>
  );
};

export default Hero;
