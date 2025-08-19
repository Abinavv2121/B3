-- Fix Row Level Security (RLS) policies for products table
-- This allows admins to insert, update, and delete products

-- First, enable RLS on the products table if not already enabled
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON products;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON products;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON products;

-- Policy 1: Allow all users to read products (for public display)
CREATE POLICY "Enable read access for all users" ON products
FOR SELECT USING (true);

-- Policy 2: Allow authenticated users to insert new products
CREATE POLICY "Enable insert for authenticated users" ON products
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy 3: Allow authenticated users to update products
CREATE POLICY "Enable update for authenticated users" ON products
FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy 4: Allow authenticated users to delete products
CREATE POLICY "Enable delete for authenticated users" ON products
FOR DELETE USING (auth.role() = 'authenticated');

-- Alternative: If you want to disable RLS completely (less secure but simpler)
-- Uncomment the line below if you prefer this approach:
-- ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'products';
