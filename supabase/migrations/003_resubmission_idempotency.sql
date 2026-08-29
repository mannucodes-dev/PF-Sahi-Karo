-- ==============================================================================
-- Migration: 003_resubmission_idempotency.sql
-- Description: Uniqueness constraints for resubmissions idempotency & document storage
-- ==============================================================================

create unique index if not exists resubmissions_idempotency_key_unique
on public.resubmissions (idempotency_key);

create unique index if not exists documents_storage_path_unique
on public.documents (storage_path);
