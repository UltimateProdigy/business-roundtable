-- Run this SQL in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)

-- 1. Create table for Ibadan Business Roundtable Registrations
CREATE TABLE IF NOT EXISTS roundtable_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  business_role TEXT NOT NULL,
  pass_type TEXT DEFAULT 'standard', -- 'standard' (Free) or 'vip' (Paid Executive / Exhibition Table)
  amount NUMERIC DEFAULT 0,
  payment_status TEXT DEFAULT 'free', -- 'free', 'pending', or 'paid'
  expectations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create table for Sponsor & Partner Inquiries
CREATE TABLE IF NOT EXISTS sponsor_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  tier TEXT NOT NULL, -- 'Headline / Platinum', 'Gold Partner', 'Silver Partner', 'Exhibition Booth', 'Custom / Media Partner'
  message TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'confirmed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE roundtable_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous insert and select/update for admin dashboard
CREATE POLICY "Allow public insert to roundtable_registrations"
  ON roundtable_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public select and update on roundtable_registrations"
  ON roundtable_registrations FOR ALL
  USING (true);

CREATE POLICY "Allow public insert to sponsor_inquiries"
  ON sponsor_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public select and update on sponsor_inquiries"
  ON sponsor_inquiries FOR ALL
  USING (true);
