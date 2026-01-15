
import { Product, JournalArticle, CollectionCard } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Rise Sports Bra",
    price: 68,
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800", "https://images.unsplash.com/photo-1578408663304-03c3ac99eb02?w=800"],
    colors: ["Black", "Navy", "Cherry"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 127,
    handle: "rise-sports-bra",
    isNew: true,
    category: "Tops"
  },
  {
    id: 2,
    title: "Rise Leggings",
    price: 88,
    images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800", "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800"],
    colors: ["Black", "Navy", "Cherry"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 203,
    handle: "rise-leggings",
    category: "Bottoms"
  },
  {
    id: 3,
    title: "Rise Tank",
    price: 48,
    images: ["https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"],
    colors: ["Black", "Navy", "Cherry"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 89,
    handle: "rise-tank",
    category: "Tops"
  },
  {
    id: 4,
    title: "Rise Shorts",
    price: 58,
    images: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800", "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800"],
    colors: ["Black", "Navy", "Cherry"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 156,
    handle: "rise-shorts",
    category: "Bottoms"
  },
  {
    id: 5,
    title: "Rise Long Sleeve Top",
    price: 72,
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800", "https://images.unsplash.com/photo-1578408663304-03c3ac99eb02?w=800"],
    colors: ["Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 94,
    handle: "rise-long-sleeve",
    isNew: true,
    category: "Tops"
  },
  {
    id: 6,
    title: "Rise Crop Top",
    price: 52,
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800", "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800"],
    colors: ["Black", "Cherry"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviews: 112,
    handle: "rise-crop-top",
    category: "Tops"
  },
  {
    id: 7,
    title: "Rise Joggers",
    price: 78,
    images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800", "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800"],
    colors: ["Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 178,
    handle: "rise-joggers",
    category: "Bottoms"
  },
  {
    id: 8,
    title: "Rise Sports Jacket",
    price: 98,
    images: ["https://images.unsplash.com/photo-1578408663304-03c3ac99eb02?w=800", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"],
    colors: ["Black", "Navy", "Cherry"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 67,
    handle: "rise-jacket",
    isNew: true,
    category: "Outerwear"
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 1,
    title: "Pre-Workout Energy Bites Recipe",
    excerpt: "Fuel your workout with these delicious, nutritious energy bites packed with protein and healthy fats.",
    category: "Recipe",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    readTime: 5,
    author: "Sarah Chen",
    date: "Jan 10, 2025"
  },
  {
    id: 2,
    title: "Morning Movement Mix",
    excerpt: "Wake up and energize with this curated playlist designed to get you moving and motivated.",
    category: "Playlist",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
    readTime: 3,
    author: "DJ Riley",
    date: "Jan 8, 2025"
  },
  {
    id: 3,
    title: "Perfect Form: Mastering the Squat",
    excerpt: "Learn the fundamentals of proper squat technique to maximize results and prevent injury.",
    category: "Fitness Tip",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
    readTime: 7,
    author: "Coach Marcus",
    date: "Jan 5, 2025"
  }
];

export const COLLECTION_CARDS: CollectionCard[] = [
  {
    title: "RISE INTO YOUR POTENTIAL",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200",
    color: "black",
    link: "#collection"
  },
  {
    title: "RISE ABOVE THE DOUBT",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200",
    color: "navy",
    link: "#collection"
  },
  {
    title: "RISE TO THE OCCASION",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200",
    color: "cherry",
    link: "#collection"
  }
];
