-- Step 1: Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Step 2: Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    price_range VARCHAR(50),
    product_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    items JSONB,
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 