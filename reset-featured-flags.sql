-- Reset all featured flags to false
-- This allows you to start fresh and select featured products from admin panel

UPDATE products 
SET featured = false 
WHERE featured = true;

-- Verify the update
SELECT id, name, featured FROM products;
