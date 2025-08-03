-- Add missing product fields to the products table
-- Run this in your Supabase SQL Editor

-- Add new columns to the products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS product_code VARCHAR(50) UNIQUE,
ADD COLUMN IF NOT EXISTS barcode_no VARCHAR(50) UNIQUE,
ADD COLUMN IF NOT EXISTS design VARCHAR(100),
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'IN STOCK';

-- Create indexes for the new fields
CREATE INDEX IF NOT EXISTS idx_products_product_code ON products(product_code);
CREATE INDEX IF NOT EXISTS idx_products_barcode_no ON products(barcode_no);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- Update existing products with sample data (optional)
UPDATE products SET 
    product_code = 'B3SKU' || LPAD(id::text, 3, '0'),
    barcode_no = '431' || LPAD(id::text, 3, '0'),
    design = 'DESIGN-' || LPAD(id::text, 2, '0'),
    status = 'IN STOCK'
WHERE product_code IS NULL;

-- Add constraint to ensure status is one of the valid values
ALTER TABLE products 
ADD CONSTRAINT check_status 
CHECK (status IN ('IN STOCK', 'SOLD OUT', 'OUT OF STOCK', 'DISCONTINUED'));

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position; 