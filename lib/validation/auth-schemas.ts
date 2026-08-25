import { z } from "zod";

export const loginSchema = z.object({
  uan: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]{11}$/, {
      message: "UAN must be a valid 12-digit number without spaces",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  rememberMe: z.boolean().optional(),
});

export const otpVerifySchema = z.object({
  uan: z.string().regex(/^[1-9][0-9]{11}$/),
  otp: z.string().regex(/^[0-9]{6}$/, { message: "OTP must be a 6-digit number" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
