import React from "react";
import { getSessionUser } from "@/lib/auth/session";
import { SiteHeaderClient } from "./site-header-client";

export async function SiteHeader() {
  const user = await getSessionUser();
  return <SiteHeaderClient user={user} />;
}
