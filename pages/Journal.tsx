
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
    excerpt: "Push through your HIIT sessions with this high-energy playlist featuring the best workout anthems.",
    category: "Playlist" as const,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    readTime: 2,
    author: "DJ Riley",
    date: "Dec 28, 2024"
  },
  {
    id: 6,
    title: "Building Core Strength: A Complete Guide",
    excerpt: "Master the fundamentals of core training with exercises that build stability, strength, and power.",
    category: "Fitness Tip" as const,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    readTime: 10,
    author: "Coach Marcus",
    date: "Dec 20, 2024"
  },
  {
    id: 7,
    title: "Overnight Oats: 5 Variations",
    excerpt: "Prep your breakfast the night before with these delicious and nutritious overnight oats recipes.",
    category: "Recipe" as const,
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800",
    readTime: 6,
    author: "Sarah Chen",
    date: "Dec 15, 2024"
  },
  {
    id: 8,
    title: "Yoga Flow for Athletes",
    excerpt: "Improve flexibility and recovery with this 30-minute yoga sequence designed specifically for active individuals.",
    category: "Fitness Tip" as const,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    readTime: 8,
    author: "Emma Woods",
    date: "Dec 10, 2024"
  },
  {
    id: 9,
    title: "Evening Wind-Down Mix",
    excerpt: "Cool down and relax after your workout with this soothing playlist perfect for stretching and recovery.",
    category: "Playlist" as const,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    readTime: 3,
    author: "DJ Riley",
    date: "Dec 5, 2024"
  }
];

const Journal: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');

  const filteredArticles = activeFilter === 'All'
    ? EXTENDED_ARTICLES
    : EXTENDED_ARTICLES.filter(article => article.category === activeFilter);

  const featuredArticle = EXTENDED_ARTICLES[0];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-16 px-6 border-b border-gray-100">
        <div className="container mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 text-gray-400">
            Fuel Your Movement
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            THE JOURNAL
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Recipes to fuel your body. Playlists to power your workouts. Tips to perfect your form.
            Everything you need to move with purpose.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <span className="inline-block bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 mb-6">
                {featuredArticle.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                <span className="flex items-center gap-2">
                  <User size={14} />
                  {featuredArticle.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} />
                  {featuredArticle.readTime} Min Read
                </span>
              </div>
              <button className="bg-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all">
                Read Article
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-gray-100 sticky top-16 bg-white z-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-center gap-8">
          {(['All', 'Recipe', 'Playlist', 'Fitness Tip'] as CategoryFilter[]).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                activeFilter === filter ? 'text-black' : 'text-gray-400 hover:text-black'
              }`}
            >
              {filter === 'Fitness Tip' ? 'Fitness Tips' : filter === 'All' ? 'All Posts' : `${filter}s`}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.map(article => (
              <article key={article.id} className="group cursor-pointer">
                <div className="aspect-square overflow-hidden mb-6 bg-gray-100 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-xl">
                    {article.category}
                  </span>
                  {article.category === 'Playlist' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                        <Play size={24} className="text-black ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>{article.date}</span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{article.readTime} Min Read</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">
            GET FRESH CONTENT WEEKLY
          </h2>
          <p className="text-gray-400 mb-10 font-medium">
            New recipes, playlists, and fitness tips delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:bg-white/20 transition-all"
            />
            <button className="bg-white text-black px-10 py-4 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Journal;
