-- Discount Banners Table
-- Stores promotional discount banners for homepage

CREATE TABLE IF NOT EXISTS discount_banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    discount_percentage INTEGER,
    discount_text TEXT DEFAULT 'SPECIAL OFFER',
    description TEXT,
    image_url TEXT,
    background_gradient TEXT DEFAULT 'from-purple-600 to-blue-600',
    cta_text TEXT DEFAULT 'Shop Now',
    cta_link TEXT DEFAULT '/products',
    countdown_end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for development
ALTER TABLE discount_banners DISABLE ROW LEVEL SECURITY;

-- Insert demo banner
INSERT INTO discount_banners (
    title,
    subtitle,
    discount_percentage,
    discount_text,
    description,
    background_gradient,
    cta_text,
    cta_link,
    is_active,
    display_order
) VALUES (
    'Summer Sale Extravaganza',
    'Limited Time Offer',
    50,
    'UP TO 50% OFF',
    'Get amazing discounts on our premium collection. Don''t miss out on this incredible opportunity to save big!',
    'from-orange-500 via-red-500 to-pink-600',
    'Shop Now',
    '/products',
    true,
    0
);

-- Create index for active banners
CREATE INDEX IF NOT EXISTS idx_discount_banners_active ON discount_banners(is_active, display_order);
