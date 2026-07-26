import { describe, expect, it } from "vitest";
import { approvalStillMatches, transitionApproval, type Approval } from "@/lib/jarvis/approval-state";

const base: Approval = {
  id: "approval-1",
  kind: "trade",
  summary: "Submit one demo MES order",
  reason: "Opening-range setup met",
  risk: "Maximum planned loss",
  expectedOutcome: "Test the strategy in demo mode",
  expiresAt: "2099-01-01T00:00:00.000Z",
  payloadFingerprint: "mes-short-1-5000-5005",
  status: "pending"
};

describe("approval state machine", () => {
  it("allows a pending approval to be approved", () => {
    expect(transitionApproval(base, "approved").status).toBe("approved");
  });

  it("blocks a rejected approval from later being approved", () => {
    const rejected = transitionApproval(base, "rejected");
    expect(() => transitionApproval(rejected, "approved")).toThrow();
  });

  it("requires the action fingerprint to remain unchanged", () => {
    const approved = transitionApproval(base, "approved");
    expect(approvalStillMatches(approved, base.payloadFingerprint)).toBe(true);
    expect(approvalStillMatches(approved, "changed-order")).toBe(false);
  });

  it("blocks approval after expiration", () => {
    const expired = { ...base, expiresAt: "2020-01-01T00:00:00.000Z" };
    expect(() => transitionApproval(expired, "approved", new Date("2026-01-01"))).toThrow();
  });
});
