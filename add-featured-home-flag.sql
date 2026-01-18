-- Add featured_home flag to products table
-- This allows admin to mark products for homepage featured collection

ALTER TABLE products ADD COLUMN IF NOT EXISTS featured_home BOOLEAN DEFAULT false;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_products_featured_home ON products(featured_home);

-- Mark some demo products as featured on home
UPDATE products 
SET featured_home = true 
WHERE featured = true OR stock > 20
LIMIT 6;
