// Database Types
export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    category_id: string;
    specifications: Record<string, unknown>; // JSONB field for flexible specifications
    stock: number;
    featured: boolean;
    is_trending?: boolean;
    featured_home?: boolean;
    is_hero_showcase?: boolean;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image?: string;
    created_at: string;
    updated_at: string;
}

export interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    cta_text: string;
    cta_link: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Order {
    id: string;
    user_id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'customer';
    created_at: string;
    updated_at: string;
}

export interface SupportRequest {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'pending' | 'in-progress' | 'resolved';
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    image?: string;
    created_at: string;
}

// UI State Types
export interface NavItem {
    label: string;
    href: string;
    icon?: unknown;
}

export interface FilterOptions {
    categories?: string[];
    priceRange?: [number, number];
    sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
}

export interface HeroShowcaseSettings {
    id: string;
    title: string;
    subtitle: string;
    is_active: boolean;
    hero_product_id: string | null;
    support_product_1_id: string | null;
    support_product_2_id: string | null;
    support_product_3_id: string | null;
    support_product_4_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface DiscountBanner {
    id: string;
    title: string;
    subtitle: string | null;
    discount_percentage: number | null;
    discount_text: string;
    description: string | null;
    image_url: string | null;
    background_gradient: string;
    cta_text: string;
    cta_link: string;
    countdown_end_date: string | null;
    is_active: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
}
