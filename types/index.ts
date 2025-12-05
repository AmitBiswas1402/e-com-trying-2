export interface BannerItem {
    id: number;
    title: string;
    subtitle: string;
    cta: string;
    ctaLink: string;
    image: string;
    gradient: string;
    category: string;
}

export interface Product {
    id: number;
    name: string;
    seller: string;
    price: number;
    oldPrice: number;
    rating: number;
    reviews: number;
    category: string;
    image: string;
    features: string[];
    deliveryDate: string; 
    inStock: boolean;     
}
  
  