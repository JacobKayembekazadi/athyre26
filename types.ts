
export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  handle: string;
  isNew?: boolean;
  category: string;
}

export interface CartItem extends Product {
  cartId: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface JournalArticle {
  id: number;
  title: string;
  excerpt: string;
  category: 'Recipe' | 'Playlist' | 'Fitness Tip';
  image: string;
  readTime: number;
  author: string;
  date: string;
}

export interface CollectionCard {
  title: string;
  image: string;
  color: string;
  link: string;
}
