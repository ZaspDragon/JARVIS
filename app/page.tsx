const modules = [
  ["Everyday", "Questions, plans, reminders, errands, decisions and explanations"],
  ["Work", "Reports, spreadsheets, warehouse operations, production and follow-up"],
  ["Briefings", "Daily priorities, risks, opportunities and practical next steps"],
  ["Projects", "GitHub health, proposed improvements, tests and approval-ready changes"]
];

export default function HomePage() {
  return (
    <main className="shell">
      <header className="hero">
        <p className="eyebrow">JARVIS CORE</p>
        <h1>Good day, Brandon.</h1>
        <p className="subtitle">Ask naturally. JARVIS will organize the request, use the right module, explain the answer clearly and prepare safe actions for approval.</p>
      </header>

      <section className="askCard" aria-label="Ask JARVIS">
        <label htmlFor="jarvis-question">What can I help with?</label>
        <textarea id="jarvis-question" placeholder="Example: Review today’s warehouse production and tell me what needs attention." rows={4} />
        <div className="actions">
          <button type="button">Ask JARVIS</button>
          <button className="secondary" type="button">Use voice</button>
        </div>
      </section>

      <section>
        <div className="sectionHeading">
          <h2>Command center</h2>
          <span>Read-only by default</span>
        </div>
        <div className="grid">
          {modules.map(([title, description]) => (
            <article className="moduleCard" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="statusCard">
        <div><strong>Approval queue</strong><span>0 waiting</span></div>
        <div><strong>Tasks</strong><span>Ready to connect</span></div>
        <div><strong>Memory</strong><span>Supabase-backed</span></div>
        <div><strong>Safety</strong><span>Audit logging planned</span></div>
      </section>
    </main>
  );
}
