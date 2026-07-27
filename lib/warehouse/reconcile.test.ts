import { describe, expect, it } from 'vitest';
import { reconcile, rowsToEvents } from './reconcile';

describe('warehouse reconciliation', () => {
  it('prefers initials and removes duplicate events', () => {
    const rows = [{ Employee: 'Carico', Initials: 'ch', 'Item Number': '100', Location: 'A-01', Quantity: 2 }];
    const events = [...rowsToEvents(rows, 'cycle.xlsx', 'cycle_count'), ...rowsToEvents(rows, 'cycle.xlsx', 'cycle_count')];
    const result = reconcile(events);
    expect(result.duplicatesRemoved).toBe(1);
    expect(result.summaries[0].cycleCount).toBe(2);
    expect(result.summaries[0].evidence[0].initials).toBe('CH');
  });

  it('does not count generic batch rows as cycle production', () => {
    const events = rowsToEvents([{ Employee: 'batch', Quantity: 25 }], 'cycle.xlsx', 'cycle_count');
    expect(events).toHaveLength(0);
  });

  it('keeps putaway separate and identifies it as extra work', () => {
    const cycle = rowsToEvents([{ Employee: 'Madison', Quantity: 10 }], 'cycle.xlsx', 'cycle_count');
    const putaway = rowsToEvents([{ Employee: 'Madison', Quantity: 5 }], 'putaway.xlsx', 'putaway');
    const result = reconcile([...cycle, ...putaway]);
    expect(result.summaries[0].cycleCount).toBe(10);
    expect(result.summaries[0].putaway).toBe(5);
    expect(result.summaries[0].extraWork).toBe(5);
    expect(result.summaries[0].totalVisibleWork).toBe(15);
  });
});
