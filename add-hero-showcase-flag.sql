-- Hero Showcase Flag for Products
-- Allows admin to select which products appear in Hero Showcase section

-- Add is_hero_showcase column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_hero_showcase BOOLEAN DEFAULT false;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_products_hero_showcase ON products(is_hero_showcase);

-- Update comment
COMMENT ON COLUMN products.is_hero_showcase IS 'Flag to mark products for Hero Showcase section on homepage';
