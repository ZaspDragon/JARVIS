export type ApprovalStatus = "pending" | "approved" | "rejected" | "expired" | "cancelled";

export type ConsequentialAction = {
  id: string;
  kind: "message" | "purchase" | "trade" | "deployment" | "record_change" | "schedule_change" | "other";
  summary: string;
  reason: string;
  risk: string;
  expectedOutcome: string;
  alternative?: string;
  expiresAt: string;
  payloadFingerprint: string;
};

export type Approval = ConsequentialAction & {
  status: ApprovalStatus;
  decidedAt?: string;
};

const transitions: Record<ApprovalStatus, ApprovalStatus[]> = {
  pending: ["approved", "rejected", "expired", "cancelled"],
  approved: ["expired", "cancelled"],
  rejected: [],
  expired: [],
  cancelled: []
};

export function transitionApproval(approval: Approval, next: ApprovalStatus, now = new Date()): Approval {
  if (!transitions[approval.status].includes(next)) {
    throw new Error(`Invalid approval transition: ${approval.status} -> ${next}`);
  }

  if (approval.status === "pending" && new Date(approval.expiresAt).getTime() <= now.getTime()) {
    if (next !== "expired") throw new Error("Expired approvals cannot be approved or rejected.");
  }

  return { ...approval, status: next, decidedAt: now.toISOString() };
}

export function approvalStillMatches(approval: Approval, payloadFingerprint: string, now = new Date()): boolean {
  return approval.status === "approved" && approval.payloadFingerprint === payloadFingerprint && new Date(approval.expiresAt) > now;
}
