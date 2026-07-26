const divisions = [
  ["01", "JARVIS Business", "Business ideas, operations, revenue opportunities, costs, customer workflows, documents, planning and approval-ready execution."],
  ["02", "JARVIS Home", "Recipes, meal plans, grocery prices, legitimate coupons, routines, bills, errands, maintenance and family schedules."],
  ["03", "JARVIS Work", "Warehouse reports, productivity reconciliation, missing credit, putaways, variances, downtime, leadership evidence and app health."],
  ["04", "JARVIS Hobby", "Trading research, safe fitness goals, technology, collecting, creative projects and personalized learning paths."],
  ["05", "JARVIS Fact", "Live research, source comparison, claim verification, uncertainty reporting and evidence-backed answers."]
];

const neuralPoints = [
  [50, 14], [34, 22], [66, 22], [22, 36], [43, 36], [57, 36], [78, 36],
  [16, 53], [34, 53], [50, 50], [66, 53], [84, 53], [24, 70], [43, 68],
  [57, 68], [76, 70], [36, 84], [64, 84]
];

const neuralLinks = [
  [0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8],[4,8],[4,9],[5,9],[5,10],
  [6,10],[6,11],[7,12],[8,12],[8,13],[9,13],[9,14],[10,14],[10,15],[11,15],[12,16],
  [13,16],[13,17],[14,17],[15,17],[4,5],[8,9],[9,10],[13,14]
];

function NeuralCore() {
  return (
    <div className="neural-stage" aria-hidden="true">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="brain-shell">
        <svg className="brain-map" viewBox="0 0 100 100" role="presentation">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="circuitGradient" x1="0" x2="1">
              <stop offset="0" stopColor="#41f4ff" />
              <stop offset=".5" stopColor="#a970ff" />
              <stop offset="1" stopColor="#5dffb3" />
            </linearGradient>
          </defs>
          <path className="brain-outline" d="M49 9C37 7 29 13 26 22c-10 1-16 8-16 18 0 6 3 11 8 14-2 11 5 19 14 21 2 10 8 16 17 16V9Zm2 0c12-2 20 4 23 13 10 1 16 8 16 18 0 6-3 11-8 14 2 11-5 19-14 21-2 10-8 16-17 16V9Z" />
          {neuralLinks.map(([a,b], index) => (
            <line key={index} className="neural-link" x1={neuralPoints[a][0]} y1={neuralPoints[a][1]} x2={neuralPoints[b][0]} y2={neuralPoints[b][1]} style={{ animationDelay: `${index * -0.11}s` }} />
          ))}
          {neuralPoints.map(([x,y], index) => (
            <g key={index} className="neural-node" style={{ animationDelay: `${index * -0.17}s` }}>
              <circle className="node-halo" cx={x} cy={y} r="3.1" />
              <circle className="node-core" cx={x} cy={y} r="1.15" />
            </g>
          ))}
        </svg>
        <div className="core-label"><span>NEURAL CORE</span><strong>ONLINE</strong></div>
      </div>
      <div className="data-chip chip-one">MEMORY<br/><strong>SCOPED</strong></div>
      <div className="data-chip chip-two">APPROVAL<br/><strong>REQUIRED</strong></div>
      <div className="data-chip chip-three">SYSTEM<br/><strong>STABLE</strong></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="shell">
      <div className="circuit-field" aria-hidden="true" />
      <nav className="topbar">
        <div className="brand-mark"><span className="brand-orb"/> JARVIS</div>
        <div className="system-pill"><span/> SYSTEM ONLINE</div>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">PERSONAL INTELLIGENCE // COMMAND SYSTEM</p>
          <h1>Good day,<br/><span>Brandon.</span></h1>
          <p className="subtitle">One adaptive intelligence across business, home, work, hobbies and factual research—designed to think ahead, protect your data and wait for approval before consequential action.</p>
          <div className="hero-actions">
            <button type="button">Enter Command Center</button>
            <button className="secondary" type="button">Voice Interface</button>
          </div>
        </div>
        <NeuralCore />
      </section>

      <section className="command-deck" aria-label="Ask JARVIS">
        <div className="command-header">
          <div><span className="command-dot"/> ACTIVE INPUT</div>
          <span>ENCRYPTED SESSION</span>
        </div>
        <label htmlFor="jarvis-question">What should JARVIS handle?</label>
        <div className="command-input-wrap">
          <textarea id="jarvis-question" placeholder="Analyze, plan, research or prepare an action..." rows={3} />
          <button type="button" className="send-button" aria-label="Send command">➜</button>
        </div>
        <div className="quick-commands">
          <span>Try:</span>
          <button type="button">Review today&apos;s priorities</button>
          <button type="button">Find dinner deals</button>
          <button type="button">Check warehouse performance</button>
        </div>
      </section>

      <section className="systems-section">
        <div className="sectionHeading">
          <div><p className="eyebrow">NEURAL NETWORK</p><h2>Connected divisions</h2></div>
          <span>Five specialized systems. One intelligence.</span>
        </div>
        <div className="grid">
          {divisions.map(([number, title, description], index) => (
            <article className="moduleCard" key={title} style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
              <div className="card-top"><span className="module-number">{number}</span><span className="module-status">ONLINE</span></div>
              <div className="module-icon"><span/><span/><span/></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <button className="module-link" type="button">OPEN SYSTEM <span>↗</span></button>
            </article>
          ))}
        </div>
      </section>

      <section className="statusCard">
        <div><span className="status-icon">◈</span><p><strong>Approval Matrix</strong><small>Consequential actions require authorization</small></p><b>ARMED</b></div>
        <div><span className="status-icon">◎</span><p><strong>Always-On Service</strong><small>n8n orchestrator and specialist workflows</small></p><b>READY</b></div>
        <div><span className="status-icon">⌬</span><p><strong>Scoped Memory</strong><small>Separated by user, household, work and business</small></p><b>SECURE</b></div>
        <div><span className="status-icon">◇</span><p><strong>Privacy Layer</strong><small>Local-first voice and minimum data sharing</small></p><b>ACTIVE</b></div>
      </section>
    </main>
  );
}
