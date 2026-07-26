import { NextResponse } from "next/server";
import { z } from "zod";
import { buildOrchestrationPlan, createAssistantSummary } from "@/lib/jarvis/orchestrator";

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

  const plan = buildOrchestrationPlan(parsed.data.message);

  return NextResponse.json({
    status: plan.executionMode === "approval_required" ? "awaiting_preparation" : "accepted",
    conversationId: parsed.data.conversationId ?? crypto.randomUUID(),
    response: createAssistantSummary(parsed.data.message, plan),
    plan,
    memory: {
      persistence: "pending_supabase_configuration",
      scopes: ["private", "household", "work", "business", "hobby"]
    },
    approval: plan.executionMode === "approval_required"
      ? { required: true, state: "not_yet_prepared", message: "JARVIS must present an immutable action card before execution." }
      : { required: false }
  });
}
