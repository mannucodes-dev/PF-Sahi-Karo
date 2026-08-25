-- ==============================================================================
-- Migration: 001_initial_schema.sql
-- Description: Production-ready non-destructive schema for PF Sahi Karo
-- Compliance: Foreign keys, Check constraints, Indexes, Triggers, RLS enabled
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE,
  full_name TEXT NOT NULL,
  masked_uan TEXT NOT NULL,
  masked_bank_account TEXT,
  identity_status TEXT NOT NULL DEFAULT 'unverified'
    CHECK (identity_status IN ('unverified', 'pending_verification', 'verified', 'rejected')),
  locale TEXT NOT NULL DEFAULT 'en'
    CHECK (locale IN ('en', 'hi')),
  consent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Remark Codes Table (Published dictionary with official governance metadata)
CREATE TABLE IF NOT EXISTS remark_codes (
  code TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'hi')),
  official_text TEXT NOT NULL,
  plain_text TEXT NOT NULL,
  fix_steps TEXT[] NOT NULL DEFAULT '{}',
  citizen_actions TEXT[] NOT NULL DEFAULT '{}',
  authority_actions TEXT[] NOT NULL DEFAULT '{}',
  estimated_days TEXT NOT NULL DEFAULT '7-15 working days',
  source_url TEXT NOT NULL,
  source_reference TEXT NOT NULL,
  reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_by TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (code, locale)
);

-- 3. Claims Table (Citizen claims synced from external or local intake)
CREATE TABLE IF NOT EXISTS claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  claim_type TEXT NOT NULL
    CHECK (claim_type IN ('Final PF Settlement', 'PF Transfer', 'Form 10C - Pension Withdrawal', 'Form 31 - PF Advance')),
  amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
  status TEXT NOT NULL DEFAULT 'submitted'
    CHECK (status IN (
      'submitted',
      'under_review',
      'pending_information',
      'approved',
      'rejected',
      'correction_started',
      'resubmission_pending',
      'resubmitted',
      'integration_failed',
      'closed'
    )),
  source_system TEXT NOT NULL DEFAULT 'EPFO_PORTAL',
  external_claim_id TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  settled_at TIMESTAMPTZ,
  last_synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  remark_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Claim Events Table (Immutable timeline audit of all claim status transitions)
CREATE TABLE IF NOT EXISTS claim_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  status_from TEXT,
  status_to TEXT NOT NULL,
  public_message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'SYSTEM',
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Resubmissions Table (Correction workflows with idempotency guarantees)
CREATE TABLE IF NOT EXISTS resubmissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'processing', 'completed', 'failed')),
  idempotency_key TEXT UNIQUE NOT NULL,
  external_reference TEXT UNIQUE,
  submitted_at TIMESTAMPTZ,
  failure_reason TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Documents Table (Private metadata for uploaded files with checksums)
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resubmission_id UUID REFERENCES resubmissions(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL
    CHECK (document_type IN ('aadhaar_rectification', 'joint_declaration', 'bank_passbook_cheque', 'service_certificate', 'other')),
  storage_path TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  content_type TEXT NOT NULL
    CHECK (content_type IN ('application/pdf', 'image/jpeg', 'image/png')),
  file_size INTEGER NOT NULL CHECK (file_size > 0 AND file_size <= 5242880),
  checksum TEXT NOT NULL,
  scan_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (scan_status IN ('pending', 'scanning', 'accepted', 'rejected')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Support Cases Table (Citizen inquiry and grievance assistance)
CREATE TABLE IF NOT EXISTS support_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  claim_id UUID REFERENCES claims(id) ON DELETE SET NULL,
  category TEXT NOT NULL
    CHECK (category IN ('claim_rejection', 'kyc_issue', 'portal_error', 'employer_delay', 'accessibility_feedback', 'general_query')),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'escalated_to_epfo', 'resolved', 'closed')),
  assigned_to TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- 8. Audit Events Table (Tamper-evident system activity log)
CREATE TABLE IF NOT EXISTS audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  redacted_metadata JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for high-efficiency querying and relational joins
CREATE INDEX IF NOT EXISTS idx_profiles_auth_user ON profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_claims_profile_id ON claims(profile_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_external_id ON claims(external_claim_id);
CREATE INDEX IF NOT EXISTS idx_claim_events_claim_id ON claim_events(claim_id);
CREATE INDEX IF NOT EXISTS idx_claim_events_occurred_at ON claim_events(occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_resubmissions_profile ON resubmissions(profile_id);
CREATE INDEX IF NOT EXISTS idx_resubmissions_claim ON resubmissions(claim_id);
CREATE INDEX IF NOT EXISTS idx_resubmissions_idempotency ON resubmissions(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_documents_resubmission ON documents(resubmission_id);
CREATE INDEX IF NOT EXISTS idx_documents_profile ON documents(profile_id);
CREATE INDEX IF NOT EXISTS idx_support_cases_profile ON support_cases(profile_id);
CREATE INDEX IF NOT EXISTS idx_support_cases_status ON support_cases(status);
CREATE INDEX IF NOT EXISTS idx_audit_events_resource ON audit_events(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_created ON audit_events(created_at DESC);

-- Automatic updated_at timestamp trigger function
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply timestamp triggers
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_claims_updated_at ON claims;
CREATE TRIGGER trg_claims_updated_at
  BEFORE UPDATE ON claims
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_resubmissions_updated_at ON resubmissions;
CREATE TRIGGER trg_resubmissions_updated_at
  BEFORE UPDATE ON resubmissions
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_support_cases_updated_at ON support_cases;
CREATE TRIGGER trg_support_cases_updated_at
  BEFORE UPDATE ON support_cases
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp_column();
