-- Quick fix: Disable Row Level Security on products table
-- This will allow all operations without authentication requirements

ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'products';

-- If you want to re-enable RLS later with proper policies, use:
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
