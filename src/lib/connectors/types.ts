export type SourceKind =
  | "cycle_count_detail"
  | "already_cycle_counted"
  | "putaway_log"
  | "warehouse_app"
  | "timeclock"
  | "spreadsheet"
  | "pdf"
  | "shared_link"
  | "github"
  | "supabase";

export interface SourceReference {
  id: string;
  kind: SourceKind;
  name: string;
  branchCode?: string;
  businessDate?: string;
  url?: string;
  storagePath?: string;
  importedAt: string;
  contentHash?: string;
}

export interface EmployeeIdentity {
  employeeId?: string;
  displayName: string;
  normalizedName: string;
  initials?: string;
  branchCode?: string;
}

export type WorkCategory =
  | "cycle_count"
  | "already_counted_credit"
  | "variance_research"
  | "adjustment"
  | "putaway"
  | "truck_unload"
  | "checking"
  | "batch"
  | "downtime"
  | "other";

export interface WorkEvidence {
  sourceId: string;
  rowNumber?: number;
  itemNumber?: string;
  location?: string;
  poNumber?: string;
  batchNumber?: string;
  occurredAt?: string;
  rawEmployeeValue?: string;
  notes?: string;
}

export interface NormalizedWorkEvent {
  id: string;
  employee: EmployeeIdentity;
  category: WorkCategory;
  rawUnits: number;
  creditedUnits?: number;
  branchCode?: string;
  businessDate: string;
  evidence: WorkEvidence[];
  confidence: "high" | "medium" | "low";
  reconciliationStatus:
    | "matched"
    | "unmatched_employee"
    | "possible_duplicate"
    | "missing_from_official_productivity"
    | "disputed"
    | "informational";
}

export interface ProductivitySummary {
  employee: EmployeeIdentity;
  cycleCounts: number;
  alreadyCountedCredit: number;
  varianceWork: number;
  adjustments: number;
  putawayLines: number;
  extraUnrecordedWork: NormalizedWorkEvent[];
  officialProductionUnits: number;
  reconciledProductionUnits: number;
  goal?: number;
  productivityPercent?: number;
  warnings: string[];
  sourceIds: string[];
}
