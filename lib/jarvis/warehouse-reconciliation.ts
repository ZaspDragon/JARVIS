export type WarehouseWorkType = 'cycle_count' | 'already_counted' | 'putaway' | 'variance' | 'truck' | 'checking' | 'downtime';

export type WarehouseEvidence = {
  sourceFile: string;
  sourceSheet?: string;
  sourceRow: number;
  itemNumber?: string;
  location?: string;
  employee?: string;
  initials?: string;
  businessDate?: string;
  workType: WarehouseWorkType;
  quantity: number;
  confidence: 'high' | 'medium' | 'low';
  ownershipMethod: 'explicit_initials' | 'full_name' | 'aisle_policy' | 'unassigned';
  fingerprint: string;
};

export type EmployeeProductivity = {
  employee: string;
  cycleCount: number;
  alreadyCounted: number;
  putaway: number;
  variance: number;
  truck: number;
  checking: number;
  downtimeMinutes: number;
  officialCycleCountTotal: number;
  extraWorkTotal: number;
  warnings: string[];
  evidence: WarehouseEvidence[];
};

export function normalizeIdentity(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function createEventFingerprint(event: Omit<WarehouseEvidence, 'fingerprint'>): string {
  return [event.sourceFile, event.sourceSheet ?? '', event.sourceRow, event.itemNumber ?? '', event.location ?? '', normalizeIdentity(event.employee ?? event.initials ?? ''), event.businessDate ?? '', event.workType, event.quantity].join('|').toLowerCase();
}

export function deduplicateEvidence(events: WarehouseEvidence[]): WarehouseEvidence[] {
  const seen = new Set<string>();
  return events.filter(event => {
    if (seen.has(event.fingerprint)) return false;
    seen.add(event.fingerprint);
    return true;
  });
}

export function isGenericBatchLabel(value: string): boolean {
  return normalizeIdentity(value) === 'batch' || normalizeIdentity(value) === 'batches';
}
