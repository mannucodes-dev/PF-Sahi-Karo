import { z } from "zod";

export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const documentUploadSchema = z.object({
  filename: z
    .string()
    .min(1)
    .max(150)
    .regex(/^[a-zA-Z0-9_\-. ]+$/, {
      message: "Filename contains invalid characters",
    }),
  contentType: z.enum(ALLOWED_MIME_TYPES, {
    message: "Unsupported file format. Only PDF, JPG, and PNG are allowed.",
  }),
  fileSize: z
    .number()
    .positive()
    .max(MAX_FILE_SIZE_BYTES, {
      message: "File size exceeds the 5MB maximum limit.",
    }),
  documentType: z.enum([
    "aadhaar_rectification",
    "joint_declaration",
    "bank_passbook_cheque",
    "service_certificate",
    "other",
  ]),
});

export type DocumentUploadInput = z.infer<typeof documentUploadSchema>;
