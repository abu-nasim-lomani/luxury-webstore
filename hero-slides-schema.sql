-- Hero Slides Table for Admin Control
-- This table stores all hero slider content that can be managed from admin panel

CREATE TABLE IF NOT EXISTS hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    image_url TEXT NOT NULL,
    cta_text TEXT DEFAULT 'Shop Now',
    cta_link TEXT DEFAULT '/products',
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_hero_slides_order ON hero_slides(display_order);
CREATE INDEX IF NOT EXISTS idx_hero_slides_active ON hero_slides(is_active);
CREATE INDEX IF NOT EXISTS idx_hero_slides_product ON hero_slides(product_id);

-- RLS Policies
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

-- Allow public to read active slides
CREATE POLICY "Public can view active hero slides"
    ON hero_slides FOR SELECT
    USING (is_active = true);

-- Allow authenticated users to manage all slides (admin)
CREATE POLICY "Authenticated users can manage hero slides"
    ON hero_slides FOR ALL
    USING (auth.role() = 'authenticated');

-- Demo Data
INSERT INTO hero_slides (title, subtitle, description, image_url, cta_text, cta_link, display_order, is_active) VALUES
('Welcome to LUXE', 'Premium Collection 2024', 'Discover our curated selection of timeless pieces that elevate your space', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920&h=1080&fit=crop', 'Explore Collection', '/products', 1, true),
('New Arrivals', 'Fresh Designs', 'Be the first to experience our latest additions crafted with precision', 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1920&h=1080&fit=crop', 'Shop New', '/products', 2, true),
('Limited Edition', 'Exclusive Pieces', 'Handpicked items available for a limited time only', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1920&h=1080&fit=crop', 'View Collection', '/products', 3, true);
