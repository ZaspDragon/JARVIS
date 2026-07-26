import { z } from "zod";

export const JarvisIntentSchema = z.enum([
  "everyday_question",
  "work_analysis",
  "document_analysis",
  "task_planning",
  "communication",
  "calendar",
  "finance",
  "trading_analysis",
  "real_estate",
  "github_project",
  "warehouse_operations",
  "unknown"
]);

export type JarvisIntent = z.infer<typeof JarvisIntentSchema>;

const patterns: Array<[JarvisIntent, RegExp]> = [
  ["warehouse_operations", /warehouse|cycle count|putaway|receiving|inventory|pallet|bin|production/i],
  ["github_project", /github|repository|repo|pull request|code|deploy|bug/i],
  ["document_analysis", /spreadsheet|excel|pdf|report|upload|document|file/i],
  ["calendar", /calendar|meeting|appointment|schedule|availability/i],
  ["communication", /email|message|reply|write to|send to/i],
  ["finance", /budget|bill|debt|balance|spending|income|credit|money/i],
  ["trading_analysis", /spy|spx|futures|option|trade|market|opening range/i],
  ["real_estate", /house|property|mortgage|rent|duplex|fha|dscr/i],
  ["task_planning", /plan|checklist|remind|task|priority|today/i],
  ["work_analysis", /employee|manager|team|work|shift|performance/i]
];

export function detectIntent(input: string): JarvisIntent {
  const normalized = input.trim();
  if (!normalized) return "unknown";
  for (const [intent, pattern] of patterns) {
    if (pattern.test(normalized)) return intent;
  }
  return "everyday_question";
}

export function shouldSearchPersonalData(intent: JarvisIntent): boolean {
  return ["calendar", "communication", "finance", "github_project", "warehouse_operations", "document_analysis"].includes(intent);
}
