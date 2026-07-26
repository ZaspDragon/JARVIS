'use client';

import { useMemo, useState } from 'react';

type SourceKey = 'cycle' | 'already' | 'putaway' | 'optional';

const requiredSources: Array<{ key: SourceKey; label: string; required: boolean }> = [
  { key: 'cycle', label: 'Cycle Count Detail', required: true },
  { key: 'already', label: 'Already Cycle Counted', required: true },
  { key: 'putaway', label: 'Putaway Log', required: true },
  { key: 'optional', label: 'Optional supporting reports', required: false }
];

export default function WarehousePage() {
  const [files, setFiles] = useState<Record<SourceKey, string[]>>({ cycle: [], already: [], putaway: [], optional: [] });
  const ready = useMemo(() => requiredSources.filter(source => source.required).every(source => files[source.key].length > 0), [files]);

  return <main className="shell">
    <nav className="topbar"><a className="brand-mark" href="/JARVIS/"><span className="brand-orb"/> JARVIS</a><div className="system-pill"><span/> WORKSPACE ONLINE</div></nav>
    <section className="workspace-panel warehouse-workspace">
      <p className="eyebrow">JARVIS WORK // WAREHOUSE INTELLIGENCE</p>
      <h1>Productivity Reconciliation</h1>
      <p className="subtitle">Upload the authoritative warehouse reports. JARVIS will preserve the original rows, match names and initials, prevent duplicate credit, and separate official production from extra work.</p>
      <div className="source-grid">
        {requiredSources.map(source => <label className="source-card" key={source.key}>
          <span className="source-status">{files[source.key].length ? 'LOADED' : source.required ? 'REQUIRED' : 'OPTIONAL'}</span>
          <strong>{source.label}</strong>
          <small>{source.key === 'cycle' ? 'Authoritative cycle-count activity source' : source.key === 'already' ? 'Item/location ownership and already-counted credit' : source.key === 'putaway' ? 'Putaway activity and extra-work detection' : 'Timeclock, downtime, variance, truck or checking files'}</small>
          <input type="file" multiple={source.key === 'optional'} accept=".xlsx,.xls,.csv" onChange={event => setFiles(current => ({ ...current, [source.key]: Array.from(event.target.files ?? []).map(file => file.name) }))}/>
          <span className="file-name">{files[source.key].join(', ') || 'Choose file'}</span>
        </label>)}
      </div>
      <div className="reconciliation-preview">
        <div><small>CONTROL TOTALS</small><strong>Pending upload</strong></div>
        <div><small>EMPLOYEE MATCHING</small><strong>Initials first</strong></div>
        <div><small>DUPLICATE PROTECTION</small><strong>File hash + event fingerprint</strong></div>
        <div><small>OFFICIAL CHANGES</small><strong>Never automatic</strong></div>
      </div>
      <button disabled={!ready}>{ready ? 'Analyze warehouse productivity' : 'Load all three required reports'}</button>
      <p className="privacy-note">Files will be sent to private storage and parsed server-side after Supabase credentials are connected. The separate Cycle Count app is not used.</p>
    </section>
  </main>;
}
