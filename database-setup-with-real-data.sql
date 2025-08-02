-- B3 Fashion Studio Database Setup with Real Product Data
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_code VARCHAR(50) UNIQUE NOT NULL,
    barcode_no VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    design VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2) DEFAULT 0,
    description TEXT,
    image_url TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    is_new BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    colors TEXT[] DEFAULT '{}',
    sizes TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'IN STOCK',
    shoot_date DATE,
    reel VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    price_range VARCHAR(50),
    product_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    items JSONB,
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert categories based on your product data
INSERT INTO categories (name, slug, description, image_url, price_range) VALUES
('Gown', 'gown', 'Elegant gowns for special occasions', '/src/assets/bridal.png', '₹2000 - ₹15000'),
('Salwar', 'salwar', 'Comfortable salwar suits', '/src/assets/salwarsuit.jpg', '₹1500 - ₹8000'),
('Saree', 'saree', 'Traditional saree collection', '/src/assets/saree.jpg', '₹2000 - ₹10000'),
('Lehenga', 'lehenga', 'Traditional lehenga collection', '/src/assets/lehenga.jpg', '₹3000 - ₹20000'),
('Blazer', 'blazer', 'Professional blazers', '/src/assets/western.jpg', '₹2000 - ₹8000'),
('Pant', 'pant', 'Stylish pants', '/src/assets/western.jpg', '₹1000 - ₹5000'),
('Shirt', 'shirt', 'Casual and formal shirts', '/src/assets/western.jpg', '₹800 - ₹4000'),
('Sharara', 'sharara', 'Elegant sharara suits', '/src/assets/anarkali.jpg', '₹2500 - ₹12000'),
('Plazo Set', 'plazo-set', 'Comfortable plazo sets', '/src/assets/salwarsuit.jpg', '₹1500 - ₹6000'),
('Dhoti Set', 'dhoti-set', 'Traditional dhoti sets', '/src/assets/salwarsuit.jpg', '₹2000 - ₹8000')
ON CONFLICT (slug) DO NOTHING;

-- Insert your real product data
INSERT INTO products (product_code, barcode_no, name, category, design, price, colors, sizes, status, shoot_date, reel) VALUES
-- First table data (1-42)
('B3SKU001', '431574', '1-MATERIAL', 'Gown', '1-MATERIAL', 2799, ARRAY['PEACH'], ARRAY['NA-5'], 'IN STOCK', '2025-06-28', '1ST'),
('B3SKU002', '435762', 'BLAZER', 'Blazer', 'BLAZER', 3799, ARRAY['T.BLUE'], ARRAY['L'], 'IN STOCK', '2025-06-28', '2ND'),
('B3SKU003', '404514', 'PANT', 'Pant', 'PANT', 13495, ARRAY['WHITE'], ARRAY['M'], 'IN STOCK', '2025-06-28', '3RD'),
('B3SKU004', '435755', 'SHIRT', 'Shirt', 'SHIRT', 3799, ARRAY['MUSTARD'], ARRAY['30'], 'IN STOCK', '2025-06-28', '4TH'),
('B3SKU005', '435770', 'GOWN', 'Gown', 'GOWN', 3799, ARRAY['BLUE'], ARRAY['38'], 'IN STOCK', '2025-06-28', '5TH'),
('B3SKU006', '435755', 'LEHANGA', 'Lehenga', 'LEHANGA', 3799, ARRAY['GREEN'], ARRAY['NA-2'], 'IN STOCK', '2025-06-28', 'CAMPAIGN SHOOT'),
('B3SKU007', '435770', 'SHARARA', 'Sharara', 'SHARARA', 3799, ARRAY['BLACK'], ARRAY['L-1'], 'SOLD OUT', '2025-06-28', '1ST'),
('B3SKU008', '435755', 'SALWAR', 'Salwar', 'SALWAR', 3799, ARRAY['PINK'], ARRAY['M-1'], 'IN STOCK', '2025-06-28', '2ND'),
('B3SKU009', '435770', '5/TOP', 'Shirt', '5/TOP', 3799, ARRAY['SKY BLUE'], ARRAY['2XL-1'], 'IN STOCK', '2025-06-28', '3RD'),
('B3SKU010', '435762', '3182', 'Gown', '3182', 3799, ARRAY['BLUE'], ARRAY['M'], 'IN STOCK', '2025-06-28', '4TH'),
('B3SKU011', '435755', '3102', 'Gown', '3102', 3799, ARRAY['MUSTARD'], ARRAY['M'], 'IN STOCK', '2025-06-28', '4TH'),
('B3SKU012', '435770', '3380', 'Gown', '3380', 3799, ARRAY['GREEN'], ARRAY['M'], 'IN STOCK', '2025-06-28', '4TH'),
('B3SKU013', '435762', 'FAWN', 'Gown', 'FAWN', 3799, ARRAY['FAWN'], ARRAY['L'], 'IN STOCK', '2025-07-10', '1ST'),
('B3SKU014', '435755', 'RUST', 'Gown', 'RUST', 3799, ARRAY['RUST'], ARRAY['M'], 'IN STOCK', '2025-07-10', '2ND'),
('B3SKU015', '435770', 'ROYAL BLUE', 'Gown', 'ROYAL BLUE', 3799, ARRAY['ROYAL BLUE'], ARRAY['XL'], 'IN STOCK', '2025-07-10', '3RD'),
('B3SKU016', '435762', 'RAMA BLUE', 'Gown', 'RAMA BLUE', 3799, ARRAY['RAMA BLUE'], ARRAY['L'], 'IN STOCK', '2025-07-10', '4TH'),
('B3SKU017', '435755', 'PISTA GREEN', 'Gown', 'PISTA GREEN', 3799, ARRAY['PISTA GREEN'], ARRAY['M'], 'IN STOCK', '2025-07-10', '5TH'),
('B3SKU018', '435770', 'OLIVE GREEN', 'Gown', 'OLIVE GREEN', 3799, ARRAY['OLIVE GREEN'], ARRAY['XL'], 'IN STOCK', '2025-07-10', 'CAMPAIGN SHOOT'),
('B3SKU019', '435762', 'LAVENDER', 'Gown', 'LAVENDER', 3799, ARRAY['LAVENDER'], ARRAY['L'], 'IN STOCK', '2025-07-20', '1ST'),
('B3SKU020', '435755', 'RANI PINK', 'Gown', 'RANI PINK', 3799, ARRAY['RANI PINK'], ARRAY['M'], 'IN STOCK', '2025-07-20', '2ND'),
('B3SKU021', '435770', 'MAROON', 'Gown', 'MAROON', 3799, ARRAY['MAROON'], ARRAY['XL'], 'IN STOCK', '2025-07-20', '3RD'),
('B3SKU022', '435762', 'BEIGE', 'Gown', 'BEIGE', 3799, ARRAY['BEIGE'], ARRAY['L'], 'IN STOCK', '2025-07-20', '4TH'),
('B3SKU023', '435755', 'CREAM', 'Gown', 'CREAM', 3799, ARRAY['CREAM'], ARRAY['M'], 'IN STOCK', '2025-07-20', '5TH'),
('B3SKU024', '435770', 'WHITE', 'Gown', 'WHITE', 3799, ARRAY['WHITE'], ARRAY['XL'], 'IN STOCK', '2025-07-20', 'CAMPAIGN SHOOT'),
('B3SKU025', '435762', 'BLACK', 'Gown', 'BLACK', 3799, ARRAY['BLACK'], ARRAY['L'], 'IN STOCK', '2025-07-23', '1ST'),
('B3SKU026', '435755', 'PINK', 'Gown', 'PINK', 3799, ARRAY['PINK'], ARRAY['M'], 'IN STOCK', '2025-07-23', '2ND'),
('B3SKU027', '435770', 'BLUE', 'Gown', 'BLUE', 3799, ARRAY['BLUE'], ARRAY['XL'], 'IN STOCK', '2025-07-23', '3RD'),
('B3SKU028', '435762', 'GREEN', 'Gown', 'GREEN', 3799, ARRAY['GREEN'], ARRAY['L'], 'IN STOCK', '2025-07-23', '4TH'),
('B3SKU029', '435755', 'YELLOW', 'Gown', 'YELLOW', 3799, ARRAY['YELLOW'], ARRAY['M'], 'IN STOCK', '2025-07-23', '5TH'),
('B3SKU030', '435770', 'PURPLE', 'Gown', 'PURPLE', 3799, ARRAY['PURPLE'], ARRAY['XL'], 'IN STOCK', '2025-07-23', 'CAMPAIGN SHOOT'),
('B3SKU031', '435762', 'ORANGE', 'Gown', 'ORANGE', 3799, ARRAY['ORANGE'], ARRAY['L'], 'IN STOCK', '2025-07-27', '1ST'),
('B3SKU032', '435755', 'RED', 'Gown', 'RED', 3799, ARRAY['RED'], ARRAY['M'], 'IN STOCK', '2025-07-27', '2ND'),
('B3SKU033', '435770', 'BROWN', 'Gown', 'BROWN', 3799, ARRAY['BROWN'], ARRAY['XL'], 'IN STOCK', '2025-07-27', '3RD'),
('B3SKU034', '435762', 'GRAY', 'Gown', 'GRAY', 3799, ARRAY['GRAY'], ARRAY['L'], 'IN STOCK', '2025-07-27', '4TH'),
('B3SKU035', '435755', 'NAVY', 'Gown', 'NAVY', 3799, ARRAY['NAVY'], ARRAY['M'], 'IN STOCK', '2025-07-27', '5TH'),
('B3SKU036', '435770', 'TEAL', 'Gown', 'TEAL', 3799, ARRAY['TEAL'], ARRAY['XL'], 'IN STOCK', '2025-07-27', 'CAMPAIGN SHOOT'),
('B3SKU037', '435762', 'CORAL', 'Gown', 'CORAL', 3799, ARRAY['CORAL'], ARRAY['L'], 'IN STOCK', '2025-07-27', '1ST'),
('B3SKU038', '435755', 'MAGENTA', 'Gown', 'MAGENTA', 3799, ARRAY['MAGENTA'], ARRAY['M'], 'IN STOCK', '2025-07-27', '2ND'),
('B3SKU039', '435770', 'INDIGO', 'Gown', 'INDIGO', 3799, ARRAY['INDIGO'], ARRAY['XL'], 'IN STOCK', '2025-07-27', '3RD'),
('B3SKU040', '435762', 'AMBER', 'Gown', 'AMBER', 3799, ARRAY['AMBER'], ARRAY['L'], 'IN STOCK', '2025-07-27', '4TH'),
('B3SKU041', '435755', 'EMERALD', 'Gown', 'EMERALD', 3799, ARRAY['EMERALD'], ARRAY['M'], 'IN STOCK', '2025-07-27', '5TH'),
('B3SKU042', '435770', 'RUBY', 'Gown', 'RUBY', 3799, ARRAY['RUBY'], ARRAY['XL'], 'IN STOCK', '2025-07-27', 'CAMPAIGN SHOOT'),

-- Second table data (43-56)
('B3SKU043', '437040', 'GOWN', 'Gown', '1201', 4899, ARRAY['INK BLUE'], ARRAY['M-1'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU044', '433078', 'GOWN', 'Gown', '1009', 2499, ARRAY['GOLD'], ARRAY['NA-5'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU045', '437040', 'GOWN', 'Gown', '2-RG TRDE', 7999, ARRAY['PERI'], ARRAY['L-1'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU046', '433078', 'GOWN', 'Gown', '5145A', 4899, ARRAY['WHITE'], ARRAY['L-2'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU047', '437040', 'SALWAR', 'Salwar', '7943-2', 2499, ARRAY['L.BLUE'], ARRAY['L-3'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU048', '433078', 'SALWAR', 'Salwar', '7545-19', 7999, ARRAY['YELLOW'], ARRAY['NA-3'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU049', '437040', 'SALWAR', 'Salwar', 'UDAAN', 4899, ARRAY['GREEN'], ARRAY['M-1'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU050', '433078', 'SALWAR', 'Salwar', '1201', 2499, ARRAY['GREY'], ARRAY['L-1'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU051', '437040', 'SALWAR', 'Salwar', '1009', 7999, ARRAY['MUSTARD'], ARRAY['L-2'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU052', '433078', 'SALWAR', 'Salwar', '2-RG TRDE', 4899, ARRAY['CREAM'], ARRAY['L-3'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU053', '437040', 'SAREE', 'Saree', '5145A', 2499, ARRAY['PEACH'], ARRAY['NA-3'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU054', '433078', 'PLAZO SET', 'Plazo Set', '7943-2', 7999, ARRAY['GRN & BLK'], ARRAY['M-1'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU055', '437040', 'DHOTI SET', 'Dhoti Set', '7545-19', 4899, ARRAY['BLUE'], ARRAY['L-1'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT'),
('B3SKU056', '433078', 'LEHANGA', 'Lehenga', 'UDAAN', 2499, ARRAY['GOLD'], ARRAY['L-2'], 'IN STOCK', '2025-07-27', 'PRODUCT SHOOT');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_products_is_best_seller ON products(is_best_seller);
CREATE INDEX IF NOT EXISTS idx_products_product_code ON products(product_code);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);

-- Create policies for authenticated users to manage products (for admin)
CREATE POLICY "Allow authenticated users to insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated users to delete products" ON products FOR DELETE USING (true);

-- Create policies for orders
CREATE POLICY "Allow users to read their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update their own orders" ON orders FOR UPDATE USING (auth.uid() = user_id); 