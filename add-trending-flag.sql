-- Add trending flag to products table
-- This allows admin to mark products as trending

ALTER TABLE products ADD COLUMN IF NOT EXISTS is_trending BOOLEAN DEFAULT false;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_products_trending ON products(is_trending);

-- Mark some demo products as trending
UPDATE products 
SET is_trending = true 
WHERE stock < 10 OR featured = true
LIMIT 4;
