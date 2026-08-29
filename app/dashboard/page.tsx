import React from "react";
import { requireUser } from "@/lib/auth/require-user";
import { getClaimsByProfileId } from "@/lib/data/claims";
import { DashboardClient } from "@/components/dashboard-client";

export default async function DashboardPage() {
  const user = await requireUser("/dashboard");
  const claims = await getClaimsByProfileId(user.id);

  return <DashboardClient user={user} claims={claims} />;
}
