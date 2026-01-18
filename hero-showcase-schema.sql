-- Hero Product Showcase Section
-- Displays 1 large hero product + 2 supporting products in asymmetric layout

CREATE TABLE IF NOT EXISTS hero_product_showcase (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero_product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    support_product_1_id UUID REFERENCES products(id) ON DELETE CASCADE,
    support_product_2_id UUID REFERENCES products(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_hero_showcase_active ON hero_product_showcase(is_active);

-- Disable RLS for development (enable in production)
ALTER TABLE hero_product_showcase DISABLE ROW LEVEL SECURITY;

-- Insert demo showcase (will use existing product IDs)
-- Note: Update product IDs after running this in Supabase
INSERT INTO hero_product_showcase (hero_product_id, support_product_1_id, support_product_2_id, is_active, display_order)
SELECT 
    (SELECT id FROM products WHERE featured = true LIMIT 1 OFFSET 0),
    (SELECT id FROM products WHERE featured = true LIMIT 1 OFFSET 1),
    (SELECT id FROM products WHERE featured = true LIMIT 1 OFFSET 2),
    true,
    0
WHERE EXISTS (SELECT 1 FROM products WHERE featured = true LIMIT 3);
