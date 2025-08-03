-- Update Products with Google Drive Image Links
-- Replace the placeholder URLs with your actual Drive links

-- Option 1: Update individual products
UPDATE products 
SET image_url = 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_HERE'
WHERE name = 'Product Name';

-- Option 2: Update by product code
UPDATE products 
SET image_url = 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_HERE'
WHERE product_code = 'B3SKU001';

-- Option 3: Update multiple products at once
UPDATE products 
SET image_url = CASE 
    WHEN product_code = 'B3SKU001' THEN 'https://drive.google.com/uc?export=view&id=FILE_ID_1'
    WHEN product_code = 'B3SKU002' THEN 'https://drive.google.com/uc?export=view&id=FILE_ID_2'
    WHEN product_code = 'B3SKU003' THEN 'https://drive.google.com/uc?export=view&id=FILE_ID_3'
    -- Add more products as needed
    ELSE image_url
END
WHERE product_code IN ('B3SKU001', 'B3SKU002', 'B3SKU003');

-- Option 4: Update all products with a pattern
-- If your Drive links follow a pattern, you can use this:
UPDATE products 
SET image_url = 'https://drive.google.com/uc?export=view&id=' || 
    CASE 
        WHEN product_code = 'B3SKU001' THEN '1ABC123...'
        WHEN product_code = 'B3SKU002' THEN '2DEF456...'
        -- Add more mappings
    END
WHERE product_code IN ('B3SKU001', 'B3SKU002');

-- Verify the updates
SELECT product_code, name, image_url FROM products ORDER BY product_code; 