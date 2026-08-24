import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-zinc-900">
      <Card className="w-full max-w-md border-zinc-200">
        <CardHeader className="text-center">
          <div className="mx-auto bg-teal-50 text-teal-700 w-12 h-12 rounded-xl flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-bold">PF Sahi Karo Login</CardTitle>
          <CardDescription>
            Session 1 Scaffold Placeholder — Full Login UI will be implemented in Session 2.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500">
            Pre-seeded test credentials and authentication wiring ready for Session 2.
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
