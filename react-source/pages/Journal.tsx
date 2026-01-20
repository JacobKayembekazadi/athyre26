
import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data';
import { Play, Clock, User } from 'lucide-react';

type CategoryFilter = 'All' | 'Recipe' | 'Playlist' | 'Fitness Tip';

const EXTENDED_ARTICLES = [
  ...JOURNAL_ARTICLES,
  {
    id: 4,
    title: "Post-Workout Recovery Smoothie",
    excerpt: "Replenish and repair with this protein-packed smoothie featuring bananas, berries, and plant-based protein.",
    category: "Recipe" as const,
    image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=800",
    readTime: 4,
    author: "Sarah Chen",
    date: "Jan 3, 2025"
  },
  {
    id: 5,
    title: "High-Intensity Cardio Beats",
    excerpt: "Push through your HIIT sessions with this high-energy playlist.",
    category: "Playlist" as const,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    readTime: 2,
    author: "DJ Riley",
    date: "Dec 28, 2024"
  },
  {
    id: 6,
    title: "Building Core Strength",
    excerpt: "Master the fundamentals of core training with exercises that build stability and power.",
    category: "Fitness Tip" as const,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    readTime: 10,
    author: "Coach Marcus",
    date: "Dec 20, 2024"
  }
];

const Journal: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');

  const filteredArticles = activeFilter === 'All'
    ? EXTENDED_ARTICLES
    : EXTENDED_ARTICLES.filter(article => article.category === activeFilter);

  const featuredArticle = EXTENDED_ARTICLES[0];

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-24">
      {/* Hero - Compact on mobile */}
      <section className="py-10 md:py-16 px-4 md:px-6 border-b border-gray-100">
        <div className="container mx-auto text-center">
          <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 md:mb-4 text-gray-400">
            Fuel Your Movement
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-3 md:mb-6">
            THE JOURNAL
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed px-2">
            Recipes, playlists, and tips to power your movement.
          </p>
        </div>
      </section>

      {/* Featured Article - Stack on mobile */}
      <section className="py-8 md:py-16 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="aspect-[4/3] md:aspect-[4/3] overflow-hidden bg-gray-100 rounded-lg md:rounded-none">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="text-center lg:text-left">
              <span className="inline-block bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 mb-4 md:mb-6">
                Featured
              </span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-3 md:mb-6">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-4 md:mb-8">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 md:mb-8">
                <span className="flex items-center gap-2">
                  <User size={12} />
                  {featuredArticle.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={12} />
                  {featuredArticle.readTime} Min
                </span>
              </div>
              <button className="w-full md:w-auto bg-black text-white px-8 py-3 md:py-4 font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all">
                Read Article
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs - Horizontally scrollable on mobile */}
      <section className="border-b border-gray-100 sticky top-14 md:top-16 bg-white z-20">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 overflow-x-auto no-scrollbar">
            {(['All', 'Recipe', 'Playlist', 'Fitness Tip'] as CategoryFilter[]).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[11px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest whitespace-nowrap transition-colors ${
                  activeFilter === filter ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                {filter === 'Fitness Tip' ? 'Tips' : filter === 'All' ? 'All' : `${filter}s`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid - 2 columns on mobile */}
      <section className="py-8 md:py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            {filteredArticles.map(article => (
              <article key={article.id} className="group cursor-pointer">
                <div className="aspect-square overflow-hidden mb-3 md:mb-6 bg-gray-100 relative rounded-lg md:rounded-none">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 md:top-4 md:left-4 bg-white text-black text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] px-2 py-1 md:px-3 md:py-1.5 shadow-xl">
                    {article.category}
                  </span>
                  {article.category === 'Playlist' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                        <Play size={20} className="text-black ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="hidden md:block text-gray-500 text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 md:gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-widest text-gray-400">
                  <span>{article.readTime} Min</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA - Compact on mobile */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-black text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 md:mb-6">
            GET FRESH CONTENT
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-10 font-medium">
            New recipes, playlists, and tips delivered weekly.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 md:gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-1 bg-white/10 border border-white/20 px-4 md:px-6 py-3 md:py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:bg-white/20 transition-all"
            />
            <button className="bg-white text-black px-8 md:px-10 py-3 md:py-4 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Journal;
