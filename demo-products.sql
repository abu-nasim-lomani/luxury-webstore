-- Demo Products Data for Luxury E-commerce Store
-- Run this in Supabase SQL Editor to populate your database

-- Insert demo products
INSERT INTO products (name, slug, description, price, images, category_id, specifications, stock, featured, meta_title, meta_description, keywords) VALUES

-- Product 1: Modern Oak Chair
('Modern Oak Chair', 'modern-oak-chair', 
'Handcrafted minimalist chair with premium solid oak wood frame and genuine leather cushioning. Features clean lines and timeless Scandinavian design that complements any contemporary interior.',
599.00,
ARRAY['https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=1000&fit=crop'],
'furniture',
'{"Material": "Solid Oak Wood & Genuine Leather", "Dimensions": "32\" W x 34\" D x 31\" H", "Weight": "28 lbs", "Color": "Natural Oak", "Assembly Required": "No", "Max Weight": "300 lbs"}'::jsonb,
12, true,
'Modern Oak Chair - Premium Handcrafted Furniture | Luxury Store',
'Shop our handcrafted Modern Oak Chair featuring solid oak wood and genuine leather. Timeless Scandinavian design for contemporary interiors.',
'modern chair, oak furniture, scandinavian design, minimalist chair, luxury furniture'),

-- Product 2: Ceramic Vase Set
('Ceramic Vase Set', 'ceramic-vase-set',
'Elegant hand-thrown ceramic vases with organic sculptural forms. Set of 3 pieces in varying heights with matte finish. Perfect for displaying fresh flowers or as standalone decorative pieces.',
189.00,
ARRAY['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=600&fit=crop'],
'decor',
'{"Material": "Hand-thrown Ceramic", "Finish": "Matte Glaze", "Set Includes": "3 Vases", "Heights": "8\", 10\", 12\"", "Color": "Warm Beige", "Watertight": "Yes"}'::jsonb,
25, true,
'Handmade Ceramic Vase Set - Modern Home Decor | 3 Piece Collection',
'Elegant hand-thrown ceramic vase set featuring organic sculptural forms. Matte finish, watertight design. Perfect for modern interiors.',
'ceramic vases, home decor, handmade pottery, modern vases, decorative vases'),

-- Product 3: Minimalist Table Lamp
('Minimalist Table Lamp', 'minimalist-table-lamp',
'Sleek modern lamp with adjustable arm and warm LED lighting. Brushed brass finish with marble base. Features touch-sensitive dimmer for customizable ambiance.',
349.00,
ARRAY['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=1000&fit=crop'],
'lighting',
'{"Material": "Brushed Brass & Marble", "Light Source": "Warm LED (2700K)", "Height": "18 inches", "Base Diameter": "6 inches", "Dimmer": "Touch-sensitive", "Power": "12W LED"}'::jsonb,
18, false,
'Minimalist LED Table Lamp - Brass & Marble Design | Adjustable',
'Premium minimalist table lamp with brushed brass finish, marble base, and touch-sensitive dimmer. Warm LED lighting for perfect ambiance.',
'table lamp, minimalist lighting, brass lamp, LED lamp, modern lighting'),

-- Product 4: Scandinavian Coffee Table
('Scandinavian Coffee Table', 'scandinavian-coffee-table',
'Light oak coffee table with clean geometric lines and tapered legs. Features smooth finish and spacious top surface. Designed in Denmark, embodying Nordic simplicity and functionality.',
899.00,
ARRAY['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&h=600&fit=crop'],
'furniture',
'{"Material": "Solid Light Oak", "Dimensions": "47\" L x 24\" W x 16\" H", "Weight": "45 lbs", "Finish": "Natural Oil", "Assembly Required": "Minimal", "Origin": "Danish Design"}'::jsonb,
8, true,
'Scandinavian Oak Coffee Table - Danish Modern Design | Light Oak',
'Authentic Scandinavian coffee table crafted from solid light oak. Clean geometric design with tapered legs. Danish modern excellence.',
'coffee table, scandinavian furniture, oak table, danish design, modern furniture'),

-- Product 5: Linen Cushion Collection
('Linen Cushion Collection', 'linen-cushion-collection',
'Premium natural linen cushions in warm earth tones. Set of 4 cushions with invisible zippers and premium down-alternative filling. Soft, breathable, and naturally anti-allergenic.',
129.00,
ARRAY['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop'],
'textiles',
'{"Material": "100% Premium Linen", "Fill": "Down-alternative", "Set Includes": "4 Cushions", "Size": "18\" x 18\"", "Colors": "Earth Tones Mix", "Care": "Machine Washable"}'::jsonb,
35, false,
'Premium Linen Cushion Collection - Natural Earth Tones | Set of 4',
'Luxury linen cushion collection featuring 100% natural linen in warm earth tones. Down-alternative fill, machine washable. Set of 4.',
'linen cushions, decorative pillows, earth tone cushions, natural textiles, luxury cushions'),

-- Product 6: Industrial Wall Shelf
('Industrial Wall Shelf', 'industrial-wall-shelf',
'Matte black metal frame with solid reclaimed wood shelves. Industrial-modern aesthetic combining raw materials with refined design. Perfect for displaying books, plants, or decorative objects.',
449.00,
ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop'],
'furniture',
'{"Material": "Matte Black Steel & Reclaimed Wood", "Dimensions": "48\" W x 12\" D x 60\" H", "Shelves": "4 Tiers", "Weight Capacity": "50 lbs per shelf", "Mounting": "Wall-mounted", "Finish": "Powder-coated Steel"}'::jsonb,
15, false,
'Industrial Metal Wall Shelf - Reclaimed Wood & Steel | 4 Tier',
'Modern industrial wall shelf featuring matte black steel frame and reclaimed wood shelves. 4 tiers with 50 lbs capacity each.',
'industrial shelf, wall shelf, metal shelving, reclaimed wood, modern storage'),

-- Product 7: Glass Decanter Set
('Glass Decanter Set', 'glass-decanter-set',
'Crystal clear glass decanter with elegant geometric design. Includes 6 matching tumblers. Lead-free crystal with precision-cut facets that catch and refract light beautifully.',
249.00,
ARRAY['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=1000&fit=crop'],
'glassware',
'{"Material": "Lead-free Crystal Glass", "Set Includes": "1 Decanter + 6 Tumblers", "Decanter Capacity": "750ml", "Tumbler Size": "10 oz each", "Design": "Geometric Faceted", "Dishwasher Safe": "Yes"}'::jsonb,
22, true,
'Crystal Glass Decanter Set - Geometric Design | Whiskey Glassware',
'Premium lead-free crystal decanter set with geometric faceted design. Includes 6 tumblers. Perfect for whiskey, spirits, or water.',
'glass decanter, whiskey glasses, crystal glassware, barware, geometric decanter'),

-- Product 8: Minimalist Wall Clock
('Minimalist Wall Clock', 'minimalist-wall-clock',
'Ultra-clean design with precision quartz movement. Silent operation with no ticking sound. Features thin metal hands and subtle minute markers against a white face.',
159.00,
ARRAY['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&h=800&fit=crop'],
'accessories',
'{"Material": "Brushed Aluminum Frame", "Diameter": "12 inches", "Movement": "Silent Quartz", "Power": "1 AA Battery", "Hands": "Black Metal", "Sound": "100% Silent"}'::jsonb,
30, false,
'Silent Minimalist Wall Clock - Modern Design | 12 Inch',
'Ultra-minimalist wall clock with silent quartz movement. Brushed aluminum frame, clean white face. Perfect for bedrooms and offices.',
'wall clock, minimalist clock, silent clock, modern clock, home decor'),

-- Product 9: Velvet Accent Chair
('Velvet Accent Chair', 'velvet-accent-chair',
'Luxurious accent chair upholstered in premium velvet with deep button tufting. Gold-finished metal legs add a touch of elegance. Comfortable seating perfect for reading corners or bedroom accents.',
749.00,
ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop'],
'furniture',
'{"Material": "Premium Velvet & Gold Metal", "Dimensions": "30\" W x 32\" D x 33\" H", "Color": "Deep Emerald Green", "Seat Height": "18 inches", "Weight Capacity": "250 lbs", "Features": "Button Tufted Back"}'::jsonb,
10, true,
'Emerald Velvet Accent Chair - Luxe Button Tufted Design | Gold Legs',
'Stunning accent chair in emerald velvet with deep button tufting and gold-finished legs. Premium comfort meets elegant design.',
'velvet chair, accent chair, luxury seating, emerald chair, gold furniture'),

-- Product 10: Concrete Planter Set
('Concrete Planter Set', 'concrete-planter-set',
'Modern concrete planters with smooth finish and drainage holes. Set of 3 in graduated sizes. Minimalist design perfect for succulents, cacti, or small indoor plants.',
89.00,
ARRAY['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop'],
'decor',
'{"Material": "Hand-cast Concrete", "Set Includes": "3 Planters", "Sizes": "4\", 5\", 6\" diameter", "Drainage": "Yes", "Finish": "Smooth Matte", "Weight": "Lightweight Mix"}'::jsonb,
40, false,
'Modern Concrete Planter Set - Minimalist Indoor Pots | Set of 3',
'Hand-cast concrete planters in three sizes. Drainage holes included. Perfect for succulents and small plants. Minimalist modern design.',
'concrete planters, indoor pots, succulent planters, modern planters, cement pots');

-- Success message
SELECT 'Demo products inserted successfully! Check your products table.' as status;
