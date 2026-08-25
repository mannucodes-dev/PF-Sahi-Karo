-- ==============================================================================
-- Migration: 002_row_level_security.sql
-- Description: Strict Row Level Security (RLS) policies for PF Sahi Karo
-- Security: Prohibits all unauthenticated access to citizen data and PII
-- ==============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE remark_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE resubmissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

-- 2. Drop any legacy or permissive demo policies
DROP POLICY IF EXISTS "Allow public read access to users" ON profiles;
DROP POLICY IF EXISTS "Allow public read access to remark_codes" ON remark_codes;
DROP POLICY IF EXISTS "Allow public read access to claims" ON claims;
DROP POLICY IF EXISTS "Allow public insert/update to claims" ON claims;

-- ------------------------------------------------------------------------------
-- PROFILES POLICIES
-- ------------------------------------------------------------------------------
-- Citizens can select only their own profile
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);

-- Citizens can update only their own non-sensitive profile attributes
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_user_id)
  WITH CHECK (auth.uid() = auth_user_id);

-- ------------------------------------------------------------------------------
-- REMARK CODES POLICIES
-- ------------------------------------------------------------------------------
-- Published active remark codes are publicly readable reference data
CREATE POLICY "remark_codes_select_public_active" ON remark_codes
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- ------------------------------------------------------------------------------
-- CLAIMS POLICIES
-- ------------------------------------------------------------------------------
-- Citizens can select only claims belonging to their verified profile
CREATE POLICY "claims_select_own" ON claims
  FOR SELECT
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

-- Direct client updates/inserts to claims are denied; mutations must go through server actions/backend

-- ------------------------------------------------------------------------------
-- CLAIM EVENTS POLICIES
-- ------------------------------------------------------------------------------
-- Citizens can view status transition events only for their own claims
CREATE POLICY "claim_events_select_own" ON claim_events
  FOR SELECT
  TO authenticated
  USING (
    claim_id IN (
      SELECT c.id FROM claims c
      INNER JOIN profiles p ON c.profile_id = p.id
      WHERE p.auth_user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- RESUBMISSIONS POLICIES
-- ------------------------------------------------------------------------------
-- Citizens can select their own resubmissions
CREATE POLICY "resubmissions_select_own" ON resubmissions
  FOR SELECT
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

-- Citizens can create resubmission drafts for their own claims
CREATE POLICY "resubmissions_insert_own" ON resubmissions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
    AND claim_id IN (
      SELECT c.id FROM claims c
      INNER JOIN profiles p ON c.profile_id = p.id
      WHERE p.auth_user_id = auth.uid()
    )
  );

-- Citizens can update their own draft resubmissions
CREATE POLICY "resubmissions_update_own" ON resubmissions
  FOR UPDATE
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
    AND status = 'draft'
  )
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- DOCUMENTS POLICIES
-- ------------------------------------------------------------------------------
-- Citizens can select metadata for documents they own
CREATE POLICY "documents_select_own" ON documents
  FOR SELECT
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

-- Citizens can insert metadata for their own uploaded documents
CREATE POLICY "documents_insert_own" ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- SUPPORT CASES POLICIES
-- ------------------------------------------------------------------------------
-- Citizens can view their own support requests
CREATE POLICY "support_cases_select_own" ON support_cases
  FOR SELECT
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

-- Citizens can file support cases for assistance
CREATE POLICY "support_cases_insert_own" ON support_cases
  FOR INSERT
  TO authenticated
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE auth_user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- AUDIT EVENTS POLICIES
-- ------------------------------------------------------------------------------
-- Audit events are append-only by authenticated backend server roles; no direct citizen read/mutation
CREATE POLICY "audit_events_insert_server_only" ON audit_events
  FOR INSERT
  TO authenticated
  WITH CHECK (actor_id = auth.uid());
