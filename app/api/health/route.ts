import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/validation/env";

export async function GET() {
  const isDbReady = isSupabaseConfigured();

  return NextResponse.json(
    {
      status: "ok",
      service: "pf-sahi-karo",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      database: isDbReady ? "connected" : "demo_mode",
      uptime: process.uptime(),
    },
    { status: 200 }
  );
}
