import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-zinc-900">
      <main className="w-full max-w-xl">
        <Card className="border-zinc-200 shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-teal-50 text-teal-700 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">
                PF Sahi Karo
              </CardTitle>
              <Badge variant="outline" className="text-teal-700 border-teal-200 bg-teal-50/50">
                Scaffold Ready
              </Badge>
            </div>
            <CardDescription className="text-sm text-zinc-600">
              Samajh, sirf apne PF claim ka · Instant plain-English rejection decoder
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-zinc-100/80 rounded-lg p-4 text-xs font-mono text-zinc-600 space-y-1">
              <div className="text-zinc-500 font-sans font-medium text-xs mb-1">Project Milestone:</div>
              <div>✓ Next.js 15 App Router & TypeScript</div>
              <div>✓ Tailwind CSS & shadcn/ui configured</div>
              <div>✓ Supabase schema & seed data prepared</div>
              <div>✓ Deterministic decoder engine ready</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center gap-2"
                )}
              >
                Go to Login Screen <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full flex items-center justify-center gap-2"
                )}
              >
                <FileSearch className="w-4 h-4" /> View Dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
