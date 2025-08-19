-- Add primary_color column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS primary_color VARCHAR(100);

-- Add comment for the new column
COMMENT ON COLUMN products.primary_color IS 'Primary color of the product (e.g., Red, Blue, Gold, etc.)';

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_products_primary_color ON products(primary_color);

-- Update existing products with some sample primary colors (optional)
-- UPDATE products SET primary_color = 'Red' WHERE category = 'Bridal Collection' AND primary_color IS NULL;
-- UPDATE products SET primary_color = 'Blue' WHERE category = 'Festival Glory' AND primary_color IS NULL;
-- UPDATE products SET primary_color = 'Gold' WHERE category = 'Special Moments' AND primary_color IS NULL;
