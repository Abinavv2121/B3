-- B3 Fashion Studio Database Setup
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
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

-- Insert sample categories
INSERT INTO categories (name, slug, description, image_url, price_range) VALUES
('Bridal Collection', 'bridal', 'Exquisite bridal wear for your special day', '/src/assets/bridal.png', '₹5000 - ₹50000'),
('Festival Glory', 'festival', 'Colorful festival wear for celebrations', '/src/assets/festival-saree.jpg', '₹1000 - ₹10000'),
('Special Moments', 'special', 'Dresses for special occasions', '/src/assets/lehenga.jpg', '₹2000 - ₹20000'),
('Western Edge', 'western', 'Modern western fashion', '/src/assets/western.jpg', '₹500 - ₹5000'),
('Anarkali', 'anarkali', 'Elegant Anarkali suits', '/src/assets/anarkali.jpg', '₹1500 - ₹15000'),
('Lehenga', 'lehenga', 'Traditional Lehenga collection', '/src/assets/lehenga.jpg', '₹3000 - ₹30000'),
('Saree', 'saree', 'Classic Saree collection', '/src/assets/saree.jpg', '₹800 - ₹8000'),
('Salwar Suit', 'salwar-suit', 'Comfortable Salwar Suits', '/src/assets/salwarsuit.jpg', '₹1200 - ₹12000')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, category, price, original_price, description, image_url, rating, reviews, is_new, is_best_seller, colors, sizes) VALUES
('Royal Bridal Lehenga', 'Bridal Collection', 25000, 30000, 'Exquisite bridal lehenga with intricate embroidery', '/src/assets/lehenga.jpg', 4.8, 45, true, true, ARRAY['Red', 'Gold'], ARRAY['S', 'M', 'L', 'XL']),
('Festival Saree', 'Festival Glory', 3500, 4500, 'Vibrant festival saree perfect for celebrations', '/src/assets/festival-saree.jpg', 4.5, 32, false, true, ARRAY['Purple', 'Pink', 'Blue'], ARRAY['Free Size']),
('Designer Anarkali', 'Anarkali', 8500, 10000, 'Elegant designer Anarkali suit', '/src/assets/anarkali.jpg', 4.7, 28, true, false, ARRAY['Rose Gold', 'Black'], ARRAY['XS', 'S', 'M', 'L', 'XL']),
('Western Dress', 'Western Edge', 1200, 1500, 'Modern western dress for casual wear', '/src/assets/western.jpg', 4.3, 15, false, false, ARRAY['Blue', 'Black', 'White'], ARRAY['S', 'M', 'L']),
('Classic Saree', 'Saree', 2800, 3500, 'Traditional silk saree', '/src/assets/saree.jpg', 4.6, 38, false, true, ARRAY['Green', 'Yellow', 'Purple'], ARRAY['Free Size']),
('Comfort Salwar Suit', 'Salwar Suit', 2200, 2800, 'Comfortable daily wear salwar suit', '/src/assets/salwarsuit.jpg', 4.4, 22, false, false, ARRAY['Pink', 'Light Blue'], ARRAY['S', 'M', 'L', 'XL']),
('Party Lehenga', 'Lehenga', 12000, 15000, 'Glamorous party lehenga', '/src/assets/lehenga.jpg', 4.9, 56, true, true, ARRAY['Purple', 'Gold', 'Silver'], ARRAY['S', 'M', 'L']),
('Designer Bridal Set', 'Bridal Collection', 45000, 55000, 'Complete bridal set with jewelry', '/src/assets/bridal.png', 5.0, 12, true, false, ARRAY['Red', 'Gold'], ARRAY['M', 'L', 'XL']);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_products_is_best_seller ON products(is_best_seller);
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