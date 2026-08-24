-- Schema for PF Sahi Karo
-- Matches DATA-SCHEMA.md exactly

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop tables if they already exist in correct dependency order
DROP TABLE IF EXISTS claims CASCADE;
DROP TABLE IF EXISTS remark_codes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Table: users (mock citizen profile)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  uan TEXT NOT NULL,
  pf_balance NUMERIC NOT NULL DEFAULT 0,
  bank_account_last4 TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: remark_codes (decoder lookup dictionary)
CREATE TABLE remark_codes (
  code TEXT PRIMARY KEY,
  raw_remark TEXT NOT NULL,
  plain_explanation TEXT NOT NULL,
  fix_steps TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: claims (mock citizen claims)
CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  claim_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('approved', 'pending', 'rejected')),
  submitted_date DATE NOT NULL,
  settled_date DATE,
  remark_code TEXT REFERENCES remark_codes(code) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for efficient lookups
CREATE INDEX idx_claims_user_id ON claims(user_id);
CREATE INDEX idx_claims_status ON claims(status);
CREATE INDEX idx_claims_remark_code ON claims(remark_code);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE remark_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;

-- Permissive policies for demo access
CREATE POLICY "Allow public read access to users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to remark_codes" ON remark_codes
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to claims" ON claims
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert/update to claims" ON claims
  FOR ALL USING (true);
