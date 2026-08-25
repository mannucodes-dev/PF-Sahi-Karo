import { redirect } from "next/navigation";
import { getSessionUser, CitizenUser } from "./session";

/**
 * Enforces that a citizen session is active before rendering a protected page
 * or executing a protected Server Action.
 * 
 * If unauthenticated, redirects to `/login` with an optional return parameter.
 */
export async function requireUser(returnUrl?: string): Promise<CitizenUser> {
  const user = await getSessionUser();

  if (!user) {
    const destination = returnUrl
      ? `/login?redirect=${encodeURIComponent(returnUrl)}`
      : "/login";
    redirect(destination);
  }

  return user;
}
