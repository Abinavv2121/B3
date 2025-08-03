# Image Storage Options for B3 Fashion Studio

## Option 1: Supabase Storage (Recommended)
If you're using Supabase, you can use their built-in storage:

1. **Upload images to Supabase Storage:**
   ```sql
   -- First, create a storage bucket for your images
   -- This is done in the Supabase dashboard under Storage
   ```

2. **Get the public URLs:**
   - Upload your images to a bucket named `product-images`
   - Get the public URL format: `https://your-project.supabase.co/storage/v1/object/public/product-images/filename.jpg`

3. **Update your products:**
   ```sql
   UPDATE products 
   SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/bridal-lehenga-1.jpg'
   WHERE name = 'Royal Bridal Lehenga';
   ```

## Option 2: Cloudinary (Free tier available)
1. Sign up for Cloudinary
2. Upload your images
3. Get the URLs and update your database

## Option 3: AWS S3
1. Create an S3 bucket
2. Upload images
3. Make them public or use signed URLs

## Option 4: Local Storage (Not recommended for production)
Store images in your public folder and reference them:
```sql
UPDATE products 
SET image_url = '/images/products/bridal-lehenga-1.jpg'
WHERE name = 'Royal Bridal Lehenga';
```

## Quick Steps to Add Your Images:

1. **Choose your storage method** (Supabase Storage recommended)
2. **Upload your images** to the chosen service
3. **Get the public URLs** for each image
4. **Update the `update-product-images.sql` script** with your actual URLs
5. **Run the script** in your Supabase SQL Editor

## Example with Supabase Storage:
```sql
-- After uploading images to Supabase Storage bucket 'product-images'
UPDATE products 
SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/royal-bridal-lehenga.jpg'
WHERE name = 'Royal Bridal Lehenga';

UPDATE products 
SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/festival-saree.jpg'
WHERE name = 'Festival Saree';
```

## Tips:
- Use descriptive filenames for your images
- Optimize images for web (compress them)
- Consider using different sizes (thumbnail, medium, large)
- Keep a backup of your original images 