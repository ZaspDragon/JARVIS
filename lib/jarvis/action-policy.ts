export type ActionRisk = "read" | "low" | "medium" | "high" | "blocked";

export type ProposedAction = {
  kind: string;
  summary: string;
  risk: ActionRisk;
  changesData?: boolean;
  sendsExternally?: boolean;
  spendsMoney?: boolean;
  executesTrade?: boolean;
  affectsEmploymentRecord?: boolean;
};

export function requiresApproval(action: ProposedAction): boolean {
  if (action.risk === "blocked") return true;
  return Boolean(
    action.risk === "medium" ||
      action.risk === "high" ||
      action.changesData ||
      action.sendsExternally ||
      action.spendsMoney ||
      action.executesTrade ||
      action.affectsEmploymentRecord
  );
}

export function isAutonomousSafe(action: ProposedAction): boolean {
  return action.risk === "read" || (action.risk === "low" && !requiresApproval(action));
}

export const permanentlyRestrictedActions = [
  "execute_live_trade",
  "delete_production_data",
  "alter_employee_timecard_without_review",
  "send_disciplinary_message_without_review",
  "expose_secret",
  "bypass_access_control"
] as const;
