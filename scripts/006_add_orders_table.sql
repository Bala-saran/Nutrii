-- Add order tracking fields if not exists
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS user_email TEXT,
ADD COLUMN IF NOT EXISTS product_names TEXT,
ADD COLUMN IF NOT EXISTS quantities TEXT,
ADD COLUMN IF NOT EXISTS delivery_date DATE;

-- Add admin users table for secure login
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
