export type WorkType = 'cycle_count' | 'already_counted' | 'putaway' | 'variance' | 'checking' | 'truck' | 'downtime' | 'other';

export type RawRow = Record<string, unknown>;

export type WorkEvent = {
  source: string;
  row: number;
  employee: string;
  initials?: string;
  item?: string;
  location?: string;
  date?: string;
  quantity: number;
  workType: WorkType;
  confidence: 'high' | 'medium' | 'low';
  fingerprint: string;
  warning?: string;
};

export type EmployeeSummary = {
  employee: string;
  cycleCount: number;
  alreadyCounted: number;
  putaway: number;
  extraWork: number;
  totalVisibleWork: number;
  warnings: string[];
  evidence: WorkEvent[];
};

const headerAliases = {
  employee: ['employee', 'name', 'user', 'counter', 'worker', 'created by', 'entered by'],
  initials: ['initials', 'init', 'operator'],
  item: ['item', 'item number', 'item no', 'sku'],
  location: ['location', 'bin', 'site', 'bin location'],
  quantity: ['quantity', 'qty', 'count', 'lines', 'moves', 'locations'],
  date: ['date', 'transaction date', 'created date', 'count date']
};

function normalized(value: unknown): string {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function pick(row: RawRow, aliases: string[]): unknown {
  const entries = Object.entries(row);
  const found = entries.find(([key]) => aliases.includes(normalized(key)));
  return found?.[1];
}

function hashText(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function normalizeEmployee(name: unknown, initials: unknown): { employee: string; initials?: string; confidence: WorkEvent['confidence'] } {
  const cleanInitials = normalized(initials).replace(/[^a-z]/g, '').toUpperCase();
  const cleanName = String(name ?? '').trim().replace(/\s+/g, ' ');
  if (cleanInitials) return { employee: cleanName || cleanInitials, initials: cleanInitials, confidence: 'high' };
  if (cleanName) return { employee: cleanName, confidence: 'medium' };
  return { employee: 'Unassigned', confidence: 'low' };
}

export function rowsToEvents(rows: RawRow[], source: string, workType: WorkType): WorkEvent[] {
  return rows.flatMap((row, index) => {
    const employeeData = normalizeEmployee(pick(row, headerAliases.employee), pick(row, headerAliases.initials));
    const item = String(pick(row, headerAliases.item) ?? '').trim();
    const location = String(pick(row, headerAliases.location) ?? '').trim();
    const date = String(pick(row, headerAliases.date) ?? '').trim();
    const rawQuantity = Number(pick(row, headerAliases.quantity));
    const quantity = Number.isFinite(rawQuantity) && rawQuantity !== 0 ? Math.abs(rawQuantity) : 1;
    const genericBatch = /^(batch|batches)$/i.test(employeeData.employee) || /^(batch|batches)$/i.test(item);
    if (genericBatch && workType === 'cycle_count') return [];
    const identity = [source, workType, employeeData.initials ?? employeeData.employee, item, location, date, quantity].map(normalized).join('|');
    return [{
      source,
      row: index + 2,
      employee: employeeData.employee,
      initials: employeeData.initials,
      item: item || undefined,
      location: location || undefined,
      date: date || undefined,
      quantity,
      workType,
      confidence: employeeData.confidence,
      fingerprint: hashText(identity),
      warning: employeeData.employee === 'Unassigned' ? 'No employee or initials found' : undefined
    }];
  });
}

export function reconcile(events: WorkEvent[]): { summaries: EmployeeSummary[]; duplicatesRemoved: number; controlTotal: number } {
  const unique = new Map<string, WorkEvent>();
  for (const event of events) if (!unique.has(event.fingerprint)) unique.set(event.fingerprint, event);
  const kept = [...unique.values()];
  const groups = new Map<string, WorkEvent[]>();
  for (const event of kept) {
    const key = event.initials || normalized(event.employee);
    groups.set(key, [...(groups.get(key) ?? []), event]);
  }
  const summaries = [...groups.values()].map(evidence => {
    const sum = (type: WorkType) => evidence.filter(event => event.workType === type).reduce((total, event) => total + event.quantity, 0);
    const cycleCount = sum('cycle_count');
    const alreadyCounted = sum('already_counted');
    const putaway = sum('putaway');
    const extraWork = evidence.filter(event => !['cycle_count', 'already_counted'].includes(event.workType)).reduce((total, event) => total + event.quantity, 0);
    return {
      employee: evidence[0].employee,
      cycleCount,
      alreadyCounted,
      putaway,
      extraWork,
      totalVisibleWork: cycleCount + alreadyCounted + extraWork,
      warnings: [...new Set(evidence.map(event => event.warning).filter(Boolean) as string[])],
      evidence
    };
  }).sort((a, b) => b.totalVisibleWork - a.totalVisibleWork);
  return { summaries, duplicatesRemoved: events.length - kept.length, controlTotal: kept.reduce((sum, event) => sum + event.quantity, 0) };
}
