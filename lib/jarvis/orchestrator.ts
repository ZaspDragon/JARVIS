import { detectIntent, shouldSearchPersonalData } from "./intent-router";

export type ToolAccess = "read" | "write";
export type ToolDefinition = {
  id: string;
  division: "business" | "home" | "work" | "hobby" | "fact";
  access: ToolAccess;
  description: string;
};

export const toolRegistry: ToolDefinition[] = [
  { id: "web.search", division: "fact", access: "read", description: "Research current public information with sources." },
  { id: "documents.analyze", division: "work", access: "read", description: "Analyze spreadsheets, PDFs and uploaded reports." },
  { id: "github.inspect", division: "business", access: "read", description: "Inspect repositories, issues, builds and proposed fixes." },
  { id: "calendar.read", division: "home", access: "read", description: "Review schedules and availability." },
  { id: "calendar.write", division: "home", access: "write", description: "Create or change calendar events after approval." },
  { id: "email.send", division: "work", access: "write", description: "Send an approved email or reply." },
  { id: "trade.submit", division: "hobby", access: "write", description: "Submit an approved trade with an unchanged fingerprint." }
];

export type OrchestrationPlan = {
  intent: ReturnType<typeof detectIntent>;
  needsPersonalContext: boolean;
  executionMode: "read_only" | "approval_required";
  division: ToolDefinition["division"];
  suggestedTools: ToolDefinition[];
  taskCandidates: string[];
};

const writeSignals = /\b(send|buy|purchase|order|deploy|merge|delete|change|submit|place (?:a )?trade|schedule for|cancel)\b/i;

function selectDivision(message: string): ToolDefinition["division"] {
  if (/warehouse|employee|production|putaway|cycle count|inventory|report/i.test(message)) return "work";
  if (/recipe|grocery|coupon|home|family|calendar|dinner|bill/i.test(message)) return "home";
  if (/trade|market|fitness|game|collect|hobby/i.test(message)) return "hobby";
  if (/business|customer|revenue|proposal|project|github|app/i.test(message)) return "business";
  return "fact";
}

export function buildOrchestrationPlan(message: string): OrchestrationPlan {
  const intent = detectIntent(message);
  const division = selectDivision(message);
  const executionMode = writeSignals.test(message) ? "approval_required" : "read_only";
  const suggestedTools = toolRegistry.filter((tool) => tool.division === division && (executionMode === "approval_required" || tool.access === "read"));
  const taskCandidates = message
    .split(/[.!?]\s+/)
    .filter((sentence) => /\b(remind|need to|must|by (?:monday|tuesday|wednesday|thursday|friday|tomorrow|today)|follow up)\b/i.test(sentence));

  return { intent, division, executionMode, suggestedTools, taskCandidates, needsPersonalContext: shouldSearchPersonalData(intent) };
}

export function createAssistantSummary(message: string, plan: OrchestrationPlan): string {
  const mode = plan.executionMode === "approval_required"
    ? "I can investigate and prepare this, but the final action must wait for your approval."
    : "I can handle the research and analysis without an extra confirmation.";
  return `Request routed to JARVIS ${plan.division.toUpperCase()}. ${mode} Next, connect the selected tools and Supabase memory to complete: “${message.slice(0, 180)}”.`;
}
