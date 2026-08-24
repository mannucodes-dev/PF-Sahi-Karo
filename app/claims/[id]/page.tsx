import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-zinc-900">
      <Card className="w-full max-w-lg border-zinc-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Claim Details: {id}</CardTitle>
          <CardDescription>
            Session 1 Scaffold Placeholder — Detail & Decoder UI will be implemented in Session 2.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500">
            Rejection decoder panel & fix steps will render here.
          </div>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full flex items-center justify-center gap-2"
            )}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
