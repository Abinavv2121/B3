-- Add section field to products table
-- This field will determine which section of the home page the product appears in

ALTER TABLE products ADD COLUMN IF NOT EXISTS section VARCHAR(100) DEFAULT 'featured_collections';

-- Update existing products to have appropriate sections
UPDATE products SET section = 'customer_favourites' WHERE is_best_seller = true;
UPDATE products SET section = 'featured_collections' WHERE section IS NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_products_section ON products(section);

-- Add comment to explain the field
COMMENT ON COLUMN products.section IS 'Section where product appears: customer_favourites, featured_collections, saree, anarkali, lehenga, salwar_suit, western_wear, bridal_collection';
