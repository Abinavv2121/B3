-- B3 Fashion Studio - Update Product Images
-- This script helps you update your products with real image URLs

-- Option 1: Update existing products with new image URLs
-- Replace the placeholder URLs with your actual image URLs

-- First, let's see what products we currently have
SELECT id, name, category, image_url FROM products;

-- Update products with real image URLs
-- Replace the URLs below with your actual image URLs

-- Bridal Collection Products
UPDATE products 
SET image_url = 'YOUR_ACTUAL_IMAGE_URL_HERE' 
WHERE name = 'Royal Bridal Lehenga';

UPDATE products 
SET image_url = 'YOUR_ACTUAL_IMAGE_URL_HERE' 
WHERE name = 'Designer Bridal Set';

-- Festival Glory Products
UPDATE products 
SET image_url = 'YOUR_ACTUAL_IMAGE_URL_HERE' 
WHERE name = 'Festival Saree';

-- Anarkali Products
UPDATE products 
SET image_url = 'YOUR_ACTUAL_IMAGE_URL_HERE' 
WHERE name = 'Designer Anarkali';

-- Western Edge Products
UPDATE products 
SET image_url = 'YOUR_ACTUAL_IMAGE_URL_HERE' 
WHERE name = 'Western Dress';

-- Saree Products
UPDATE products 
SET image_url = 'YOUR_ACTUAL_IMAGE_URL_HERE' 
WHERE name = 'Classic Saree';

-- Salwar Suit Products
UPDATE products 
SET image_url = 'YOUR_ACTUAL_IMAGE_URL_HERE' 
WHERE name = 'Comfort Salwar Suit';

-- Lehenga Products
UPDATE products 
SET image_url = 'YOUR_ACTUAL_IMAGE_URL_HERE' 
WHERE name = 'Party Lehenga';

-- Option 2: Add new products with real images
-- Use this if you want to add completely new products

INSERT INTO products (name, category, price, original_price, description, image_url, rating, reviews, is_new, is_best_seller, colors, sizes) VALUES
('New Product Name', 'Category Name', 1000, 1200, 'Product description', 'YOUR_ACTUAL_IMAGE_URL_HERE', 4.5, 10, true, false, ARRAY['Red', 'Blue'], ARRAY['S', 'M', 'L']);

-- Option 3: Bulk update all products at once
-- If you have a specific naming convention for your images

-- Example: If your images are named like "product1.jpg", "product2.jpg", etc.
-- UPDATE products SET image_url = 'https://your-cdn.com/images/' || id || '.jpg';

-- Verify the updates
SELECT id, name, category, image_url FROM products ORDER BY category, name; 