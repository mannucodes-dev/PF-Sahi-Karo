"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/validation/auth-schemas";
import { createClient } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/validation/env";
import { logAuditEvent } from "@/lib/audit/audit-events";

export interface LoginActionResult {
  success: boolean;
  error?: string;
}

function safeInternalRedirect(value: string | null): string {
  if (!value) return "/dashboard";

  try {
    const parsed = new URL(value, "http://localhost");

    if (
      parsed.origin === "http://localhost" &&
      parsed.pathname.startsWith("/") &&
      !parsed.pathname.startsWith("//")
    ) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    // Fall through to the safe default.
  }

  return "/dashboard";
}

export async function loginAction(
  prevState: LoginActionResult | null,
  formData: FormData
): Promise<LoginActionResult> {
  const rawUan = formData.get("uan") as string;
  const rawPassword = formData.get("password") as string;
  const redirectTo = safeInternalRedirect(
    formData.get("redirectTo") as string | null
  );

  const parsed = loginSchema.safeParse({
    uan: rawUan,
    password: rawPassword,
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid credentials format";
    return { success: false, error: errorMsg };
  }

  const { uan, password } = parsed.data;

  const supabase = await createClient();

  if (!supabase) {
    if (isDemoMode()) {
      await logAuditEvent({
        action: "DEMO_CITIZEN_LOGIN",
        resourceType: "auth",
        resourceId: uan,
      });
      redirect(redirectTo);
    }
    return {
      success: false,
      error: "Authentication service unavailable. Please configure Supabase credentials.",
    };
  }

  // Supabase Auth Email/Password mapping: {uan}@pfsahikaro.internal
  const authEmail = `${uan}@pfsahikaro.internal`;

  const { error } = await supabase.auth.signInWithPassword({
    email: authEmail,
    password: password,
  });

  if (error) {
    if (isDemoMode() && uan.endsWith("7890")) {
      // Demo fallback in dev
      redirect(redirectTo);
    }

    await logAuditEvent({
      action: "LOGIN_FAILED",
      resourceType: "auth",
      resourceId: uan,
    });

    return {
      success: false,
      error: "Invalid UAN or password. Please verify your Member Sewa credentials.",
    };
  }

  await logAuditEvent({
    action: "CITIZEN_LOGIN_SUCCESS",
    resourceType: "auth",
    resourceId: uan,
  });

  redirect(redirectTo);
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/login");
}
