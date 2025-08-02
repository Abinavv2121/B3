-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('products', 'categories', 'orders');

-- Check products table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND table_schema = 'public';

-- Check if products table has data
SELECT COUNT(*) as product_count FROM products;

-- Check if categories table has data
SELECT COUNT(*) as category_count FROM categories; 