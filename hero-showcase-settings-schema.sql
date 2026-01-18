-- Hero Showcase Settings Table
-- Stores configuration for Hero Showcase section on homepage

CREATE TABLE IF NOT EXISTS hero_showcase_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL DEFAULT 'Top Selling Products This Week',
    subtitle TEXT NOT NULL DEFAULT 'Most popular items flying off the shelves',
    is_active BOOLEAN NOT NULL DEFAULT true,
    hero_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    support_product_1_id UUID REFERENCES products(id) ON DELETE SET NULL,
    support_product_2_id UUID REFERENCES products(id) ON DELETE SET NULL,
    support_product_3_id UUID REFERENCES products(id) ON DELETE SET NULL,
    support_product_4_id UUID REFERENCES products(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for development (enable in production with proper policies)
ALTER TABLE hero_showcase_settings DISABLE ROW LEVEL SECURITY;

-- Insert default settings (only one row should exist)
INSERT INTO hero_showcase_settings (id, title, subtitle, is_active)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Top Selling Products This Week',
    'Most popular items flying off the shelves',
    true
)
ON CONFLICT (id) DO NOTHING;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_hero_showcase_active ON hero_showcase_settings(is_active);
