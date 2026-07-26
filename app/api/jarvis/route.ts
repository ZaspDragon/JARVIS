import { NextResponse } from "next/server";
import { z } from "zod";
import { detectIntent, shouldSearchPersonalData } from "@/lib/jarvis/intent-router";

const RequestSchema = z.object({
  message: z.string().trim().min(1).max(12000),
  conversationId: z.string().uuid().optional(),
  context: z.record(z.unknown()).optional()
});

export async function POST(request: Request) {
  const parsed = RequestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid question or request.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const intent = detectIntent(parsed.data.message);

  return NextResponse.json({
    status: "accepted",
    intent,
    needsPersonalContext: shouldSearchPersonalData(intent),
    executionMode: "read_only",
    next: "Connect the model orchestrator, Supabase conversation storage and approved tool adapters."
  });
}
