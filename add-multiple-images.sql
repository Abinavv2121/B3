-- Add support for multiple images per product
-- This allows products to have multiple angle photos

-- Add a new column for multiple images (array of image URLs)
ALTER TABLE products ADD COLUMN IF NOT EXISTS additional_images TEXT[] DEFAULT '{}';

-- Add comment for the new column
COMMENT ON COLUMN products.additional_images IS 'Array of additional image URLs for multiple product angles';

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_products_additional_images ON products USING GIN (additional_images);

-- Update existing products to have empty additional_images array if NULL
UPDATE products SET additional_images = '{}' WHERE additional_images IS NULL;
