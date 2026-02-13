-- Run this SQL in your Supabase SQL Editor
-- Go to: supabase.com → your project → SQL Editor → New Query

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'website'
);

-- Contact form messages table  
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'unread'
);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (public forms)
CREATE POLICY "Allow public inserts" ON subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON contact_messages
  FOR INSERT WITH CHECK (true);
