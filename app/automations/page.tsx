const workflows = [
  ['Morning Command Briefing', 'Schedule, priorities, risks, opportunities and practical next steps', 'READY'],
  ['Warehouse Report Watcher', 'Detect new reports, validate inputs and prepare productivity findings', 'READY'],
  ['GitHub & App Health', 'Watch failed builds, outages and repeated errors; prepare safe fixes', 'READY'],
  ['Household Reminders', 'Shared tasks, appointments, meals, bills and maintenance', 'READY'],
  ['Trading Observer', 'Analyze market structure and sentiment; proposals only, approval always required', 'GUARDED']
];

export default function AutomationsPage() {
  return <main className="shell">
    <nav className="topbar"><a className="brand-mark" href="/JARVIS/"><span className="brand-orb"/> JARVIS</a><div className="system-pill"><span/> ORCHESTRATOR READY</div></nav>
    <section className="workspace-panel automation-workspace">
      <p className="eyebrow">JARVIS GUARDIAN // N8N ORCHESTRATION</p>
      <h1>Always-On Systems</h1>
      <p className="subtitle">One master router will call specialized sub-workflows. Read-only research and preparation can run independently; consequential actions stop at the Approval Center.</p>
      <div className="automation-grid">
        {workflows.map(([name, description, status], index) => <article className="automation-card" key={name}>
          <div><span>0{index + 1}</span><b>{status}</b></div>
          <h2>{name}</h2><p>{description}</p>
          <small>Idempotency • retries • audit evidence • emergency pause</small>
        </article>)}
      </div>
      <div className="reconciliation-preview">
        <div><small>MASTER ROUTER</small><strong>Designed</strong></div>
        <div><small>PRIVACY SCOPES</small><strong>Work / household separated</strong></div>
        <div><small>APPROVAL GATE</small><strong>Required for writes</strong></div>
        <div><small>EMERGENCY PAUSE</small><strong>Required before production</strong></div>
      </div>
      <p className="privacy-note">Importable n8n workflow JSON and credentials must be connected before these cards report live execution status.</p>
    </section>
  </main>;
}
