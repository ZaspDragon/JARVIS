'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { reconcile, rowsToEvents, type EmployeeSummary, type RawRow, type WorkType } from '../../lib/warehouse/reconcile';

type SourceKey = 'cycle' | 'already' | 'putaway' | 'optional';
type LoadedFile = { name: string; rows: RawRow[] };

const requiredSources: Array<{ key: SourceKey; label: string; required: boolean; workType: WorkType }> = [
  { key: 'cycle', label: 'Cycle Count Detail', required: true, workType: 'cycle_count' },
  { key: 'already', label: 'Already Cycle Counted', required: true, workType: 'already_counted' },
  { key: 'putaway', label: 'Putaway Log', required: true, workType: 'putaway' },
  { key: 'optional', label: 'Optional supporting reports', required: false, workType: 'other' }
];

async function parseFile(file: File): Promise<RawRow[]> {
  const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array', cellDates: true });
  return workbook.SheetNames.flatMap(sheet => XLSX.utils.sheet_to_json<RawRow>(workbook.Sheets[sheet], { defval: '' }));
}

export default function WarehousePage() {
  const [files, setFiles] = useState<Record<SourceKey, LoadedFile[]>>({ cycle: [], already: [], putaway: [], optional: [] });
  const [results, setResults] = useState<EmployeeSummary[]>([]);
  const [meta, setMeta] = useState({ controlTotal: 0, duplicatesRemoved: 0 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const ready = useMemo(() => requiredSources.filter(source => source.required).every(source => files[source.key].length > 0), [files]);

  async function load(source: SourceKey, selected: FileList | null) {
    if (!selected) return;
    setError('');
    try {
      const parsed = await Promise.all(Array.from(selected).map(async file => ({ name: file.name, rows: await parseFile(file) })));
      setFiles(current => ({ ...current, [source]: parsed }));
      setResults([]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The workbook could not be read.');
    }
  }

  function analyze() {
    setBusy(true);
    setError('');
    try {
      const events = requiredSources.flatMap(source => files[source.key].flatMap(file => rowsToEvents(file.rows, file.name, source.workType)));
      const outcome = reconcile(events);
      setResults(outcome.summaries);
      setMeta({ controlTotal: outcome.controlTotal, duplicatesRemoved: outcome.duplicatesRemoved });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Reconciliation failed.');
    } finally {
      setBusy(false);
    }
  }

  function exportCsv() {
    const rows = results.flatMap(summary => summary.evidence.map(event => ({
      employee: summary.employee,
      work_type: event.workType,
      quantity: event.quantity,
      source: event.source,
      source_row: event.row,
      item: event.item ?? '',
      location: event.location ?? '',
      date: event.date ?? '',
      initials: event.initials ?? '',
      confidence: event.confidence,
      warning: event.warning ?? ''
    })));
    const csv = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(rows));
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'jarvis-productivity-reconciliation.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return <main className="warehouse-shell">
    <nav className="warehouse-nav"><Link href="/">← JARVIS CORE</Link><span>WORKSPACE ONLINE</span></nav>
    <header><p>JARVIS WORK // WAREHOUSE INTELLIGENCE</p><h1>Productivity Reconciliation</h1><span>Cycle Count Detail remains the authoritative cycle-count source. The separate Cycle Count app is not used.</span></header>
    <section className="source-grid">
      {requiredSources.map(source => <label className="source-card" key={source.key}>
        <b>{files[source.key].length ? 'LOADED' : source.required ? 'REQUIRED' : 'OPTIONAL'}</b>
        <strong>{source.label}</strong>
        <small>{source.key === 'cycle' ? 'Official cycle-count activity' : source.key === 'already' ? 'Initials and location ownership credit' : source.key === 'putaway' ? 'Extra work missing from cycle-count totals' : 'Variance, checking, truck, downtime or timeclock data'}</small>
        <input type="file" multiple={source.key === 'optional'} accept=".xlsx,.xls,.csv" onChange={event => load(source.key, event.target.files)}/>
        <i>{files[source.key].map(file => `${file.name} (${file.rows.length} rows)`).join(', ') || 'Choose workbook'}</i>
      </label>)}
    </section>
    {error && <div className="error">{error}</div>}
    <section className="controls"><button disabled={!ready || busy} onClick={analyze}>{busy ? 'Analyzing…' : ready ? 'Analyze warehouse productivity' : 'Load all required reports'}</button>{results.length > 0 && <button className="secondary" onClick={exportCsv}>Export evidence CSV</button>}</section>
    <section className="metrics"><div><small>CONTROL TOTAL</small><strong>{results.length ? meta.controlTotal : 'Pending'}</strong></div><div><small>DUPLICATES REMOVED</small><strong>{meta.duplicatesRemoved}</strong></div><div><small>EMPLOYEE MATCHING</small><strong>Initials first</strong></div><div><small>OFFICIAL CHANGES</small><strong>Never automatic</strong></div></section>
    {results.length > 0 && <section className="results"><div className="results-head"><h2>Reconciled productivity</h2><span>{results.length} employee records</span></div><div className="table-wrap"><table><thead><tr><th>Employee</th><th>Cycle</th><th>Already counted</th><th>Putaway</th><th>Extra work</th><th>Visible total</th><th>Evidence</th></tr></thead><tbody>{results.map(summary => <tr key={`${summary.employee}-${summary.evidence[0]?.initials ?? ''}`}><td><b>{summary.employee}</b>{summary.warnings.map(warning => <small key={warning}>{warning}</small>)}</td><td>{summary.cycleCount}</td><td>{summary.alreadyCounted}</td><td>{summary.putaway}</td><td>{summary.extraWork}</td><td><strong>{summary.totalVisibleWork}</strong></td><td>{summary.evidence.length} rows</td></tr>)}</tbody></table></div></section>}
    <style jsx global>{`
      *{box-sizing:border-box}html,body{margin:0;background:#02070c;color:#eaffff;font-family:Inter,system-ui,sans-serif}.warehouse-shell{min-height:100vh;padding:24px clamp(16px,4vw,56px) 70px;background:radial-gradient(circle at 50% 0,rgba(0,190,255,.14),transparent 35%),#02070c}.warehouse-nav{display:flex;justify-content:space-between;align-items:center;font-size:.72rem;letter-spacing:.12em}.warehouse-nav a{color:#53efff;text-decoration:none}.warehouse-nav span{color:#5dff9b}header{max-width:920px;margin:70px auto 34px;text-align:center}header p{color:#53efff;font-size:.7rem;letter-spacing:.15em}header h1{font-size:clamp(2.5rem,7vw,5.5rem);margin:10px 0}header span{color:#8aa5b2;line-height:1.6}.source-grid{max-width:1200px;margin:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.source-card{min-height:230px;padding:20px;border:1px solid rgba(83,239,255,.2);border-radius:17px;background:linear-gradient(145deg,rgba(8,28,42,.9),rgba(3,10,17,.88));display:flex;flex-direction:column;cursor:pointer}.source-card>b{color:#5dff9b;font-size:.6rem;letter-spacing:.12em}.source-card strong{font-size:1.08rem;margin:24px 0 10px}.source-card small{color:#829eaa;line-height:1.5}.source-card input{margin-top:auto;color:#a9c7d2}.source-card i{font-size:.65rem;color:#53efff;margin-top:10px;font-style:normal;overflow-wrap:anywhere}.controls{display:flex;justify-content:center;gap:10px;margin:28px 0}.controls button{padding:14px 20px;border:1px solid #53efff;border-radius:11px;background:#53efff;color:#031017;font-weight:800}.controls button.secondary{background:transparent;color:#aefaff}.controls button:disabled{opacity:.45}.error{max-width:900px;margin:18px auto;padding:14px;border:1px solid #ff6262;color:#ff9a9a;border-radius:10px}.metrics{max-width:1200px;margin:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.metrics div,.results{border:1px solid rgba(83,239,255,.16);background:rgba(4,16,25,.86);border-radius:14px}.metrics div{padding:18px}.metrics small{display:block;color:#6d8996;font-size:.58rem;letter-spacing:.12em;margin-bottom:8px}.results{max-width:1200px;margin:18px auto 0;padding:20px}.results-head{display:flex;justify-content:space-between;align-items:center}.results-head h2{margin:0}.results-head span{color:#6f8f9c}.table-wrap{overflow:auto;margin-top:18px}table{width:100%;border-collapse:collapse;min-width:760px}th,td{text-align:left;padding:13px;border-bottom:1px solid rgba(83,239,255,.1)}th{color:#53efff;font-size:.62rem;letter-spacing:.1em}td{color:#b4cbd5}td small{display:block;color:#ffb06a;margin-top:5px}@media(max-width:900px){.source-grid,.metrics{grid-template-columns:1fr 1fr}}@media(max-width:560px){.source-grid,.metrics{grid-template-columns:1fr}.controls{flex-direction:column}.controls button{width:100%}header{margin-top:42px}.warehouse-nav span{display:none}}
    `}</style>
  </main>;
}
