-- Categories Section Table for Admin Control
-- This table stores all category cards shown on homepage

CREATE TABLE IF NOT EXISTS homepage_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    icon_name TEXT NOT NULL, -- Lucide icon name (e.g., 'Sofa', 'Lamp', 'Frame')
    description TEXT,
    link TEXT DEFAULT '/products',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_categories_order ON homepage_categories(display_order);
CREATE INDEX IF NOT EXISTS idx_categories_active ON homepage_categories(is_active);

-- RLS Policies (Disabled for development)
ALTER TABLE homepage_categories DISABLE ROW LEVEL SECURITY;

-- Demo Data
INSERT INTO homepage_categories (name, icon_name, description, link, display_order, is_active) VALUES
('Furniture', 'Sofa', 'Elegant pieces for every room', '/products?category=furniture', 1, true),
('Lighting', 'Lamp', 'Illuminate your space beautifully', '/products?category=lighting', 2, true),
('Decor', 'Frame', 'Finishing touches that matter', '/products?category=decor', 3, true),
('Textiles', 'Shirt', 'Luxurious fabrics and comfort', '/products?category=textiles', 4, true),
('Kitchen', 'UtensilsCrossed', 'Culinary excellence meets design', '/products?category=kitchen', 5, true),
('Outdoor', 'TreePine', 'Transform your outdoor living', '/products?category=outdoor', 6, true);
