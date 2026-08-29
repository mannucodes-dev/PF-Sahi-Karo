// Database Types for Supabase in PF Sahi Karo

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ClaimType =
  | "Final PF Settlement"
  | "PF Transfer"
  | "Form 10C - Pension Withdrawal"
  | "Form 31 - PF Advance";

export type ClaimStatus =
  | "submitted"
  | "under_review"
  | "pending_information"
  | "approved"
  | "rejected"
  | "correction_started"
  | "resubmission_pending"
  | "resubmitted"
  | "integration_failed"
  | "closed";

export type IdentityStatus =
  | "unverified"
  | "pending_verification"
  | "verified"
  | "rejected";

export type ResubmissionStatus =
  | "draft"
  | "submitted"
  | "processing"
  | "completed"
  | "failed";

export type DocumentType =
  | "aadhaar_rectification"
  | "joint_declaration"
  | "bank_passbook_cheque"
  | "service_certificate"
  | "other";

export type ScanStatus = "pending" | "scanning" | "accepted" | "rejected";

export type SupportCategory =
  | "claim_rejection"
  | "kyc_issue"
  | "portal_error"
  | "employer_delay"
  | "accessibility_feedback"
  | "general_query";

export type SupportStatus =
  | "open"
  | "in_progress"
  | "escalated_to_epfo"
  | "resolved"
  | "closed";

export type Locale = "en" | "hi" | "mr" | "ta" | "te" | "kn" | "gu" | "bn";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          auth_user_id: string | null;
          full_name: string;
          masked_uan: string;
          masked_bank_account: string | null;
          identity_status: IdentityStatus;
          locale: Locale;
          consent_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          full_name: string;
          masked_uan: string;
          masked_bank_account?: string | null;
          identity_status?: IdentityStatus;
          locale?: Locale;
          consent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          full_name?: string;
          masked_uan?: string;
          masked_bank_account?: string | null;
          identity_status?: IdentityStatus;
          locale?: Locale;
          consent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      remark_codes: {
        Row: {
          code: string;
          locale: Locale;
          official_text: string;
          plain_text: string;
          fix_steps: string[];
          citizen_actions: string[];
          authority_actions: string[];
          estimated_days: string;
          source_url: string;
          source_reference: string;
          reviewed_at: string;
          reviewed_by: string;
          active: boolean;
        };
        Insert: {
          code: string;
          locale?: Locale;
          official_text: string;
          plain_text: string;
          fix_steps: string[];
          citizen_actions?: string[];
          authority_actions?: string[];
          estimated_days?: string;
          source_url: string;
          source_reference: string;
          reviewed_at?: string;
          reviewed_by: string;
          active?: boolean;
        };
        Update: {
          code?: string;
          locale?: Locale;
          official_text?: string;
          plain_text?: string;
          fix_steps?: string[];
          citizen_actions?: string[];
          authority_actions?: string[];
          estimated_days?: string;
          source_url?: string;
          source_reference?: string;
          reviewed_at?: string;
          reviewed_by?: string;
          active?: boolean;
        };
        Relationships: [];
      };
      claims: {
        Row: {
          id: string;
          profile_id: string;
          claim_type: ClaimType;
          amount: number;
          status: ClaimStatus;
          source_system: string;
          external_claim_id: string | null;
          submitted_at: string;
          settled_at: string | null;
          last_synced_at: string;
          remark_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          claim_type: ClaimType;
          amount: number;
          status?: ClaimStatus;
          source_system?: string;
          external_claim_id?: string | null;
          submitted_at?: string;
          settled_at?: string | null;
          last_synced_at?: string;
          remark_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          claim_type?: ClaimType;
          amount?: number;
          status?: ClaimStatus;
          source_system?: string;
          external_claim_id?: string | null;
          submitted_at?: string;
          settled_at?: string | null;
          last_synced_at?: string;
          remark_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "claims_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      claim_events: {
        Row: {
          id: string;
          claim_id: string;
          event_type: string;
          status_from: string | null;
          status_to: string;
          public_message: string;
          source: string;
          occurred_at: string;
        };
        Insert: {
          id?: string;
          claim_id: string;
          event_type: string;
          status_from?: string | null;
          status_to: string;
          public_message: string;
          source?: string;
          occurred_at?: string;
        };
        Update: {
          id?: string;
          claim_id?: string;
          event_type?: string;
          status_from?: string | null;
          status_to?: string;
          public_message?: string;
          source?: string;
          occurred_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "claim_events_claim_id_fkey";
            columns: ["claim_id"];
            isOneToOne: false;
            referencedRelation: "claims";
            referencedColumns: ["id"];
          }
        ];
      };
      resubmissions: {
        Row: {
          id: string;
          claim_id: string;
          profile_id: string;
          status: ResubmissionStatus;
          idempotency_key: string;
          external_reference: string | null;
          submitted_at: string | null;
          failure_reason: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          claim_id: string;
          profile_id: string;
          status?: ResubmissionStatus;
          idempotency_key: string;
          external_reference?: string | null;
          submitted_at?: string | null;
          failure_reason?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          claim_id?: string;
          profile_id?: string;
          status?: ResubmissionStatus;
          idempotency_key?: string;
          external_reference?: string | null;
          submitted_at?: string | null;
          failure_reason?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "resubmissions_claim_id_fkey";
            columns: ["claim_id"];
            isOneToOne: false;
            referencedRelation: "claims";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "resubmissions_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      documents: {
        Row: {
          id: string;
          resubmission_id: string | null;
          profile_id: string;
          document_type: DocumentType;
          storage_path: string;
          original_filename: string;
          content_type: string;
          file_size: number;
          checksum: string;
          scan_status: ScanStatus;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          resubmission_id?: string | null;
          profile_id: string;
          document_type: DocumentType;
          storage_path: string;
          original_filename: string;
          content_type: string;
          file_size: number;
          checksum: string;
          scan_status?: ScanStatus;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          resubmission_id?: string | null;
          profile_id?: string;
          document_type?: DocumentType;
          storage_path?: string;
          original_filename?: string;
          content_type?: string;
          file_size?: number;
          checksum?: string;
          scan_status?: ScanStatus;
          expires_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "documents_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      support_cases: {
        Row: {
          id: string;
          profile_id: string;
          claim_id: string | null;
          category: SupportCategory;
          description: string;
          status: SupportStatus;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
          resolved_at: string | null;
        };
        Insert: {
          id?: string;
          profile_id: string;
          claim_id?: string | null;
          category: SupportCategory;
          description: string;
          status?: SupportStatus;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
        };
        Update: {
          id?: string;
          profile_id?: string;
          claim_id?: string | null;
          category?: SupportCategory;
          description?: string;
          status?: SupportStatus;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
        };
        Relationships: [];
      };
      audit_events: {
        Row: {
          id: string;
          actor_id: string | null;
          action: string;
          resource_type: string;
          resource_id: string;
          redacted_metadata: Json;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          action: string;
          resource_type: string;
          resource_id: string;
          redacted_metadata?: Json;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_id?: string | null;
          action?: string;
          resource_type?: string;
          resource_id?: string;
          redacted_metadata?: Json;
          ip_address?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
