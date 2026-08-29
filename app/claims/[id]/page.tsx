import React from "react";
import Link from "next/link";
import { requireUser } from "@/lib/auth/require-user";
import { getClaimById } from "@/lib/data/claims";
import { ClaimDetailView } from "@/components/claim-detail-view";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { FileSearch, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { getServerTranslation } from "@/lib/i18n/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClaimDetailPage({ params }: PageProps) {
  const user = await requireUser("/dashboard");
  const { id } = await params;
  const { t } = await getServerTranslation();

  const claim = await getClaimById(id, user.id);

  if (!claim) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-zinc-900">
        <Card className="max-w-md w-full text-center p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
            <FileSearch className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-zinc-900">Claim Record Not Found</h1>
            <p className="text-xs text-zinc-600">
              No claim matching ID &ldquo;{id}&rdquo; was found under your verified member account.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "outline" }), "w-full text-xs")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> {t.common.backToDashboard}
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return <ClaimDetailView claim={claim} user={user} />;
}
