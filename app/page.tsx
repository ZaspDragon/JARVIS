const divisions = [
  ["JARVIS Business", "Business ideas, operations, revenue opportunities, costs, customer workflows, documents, planning and approval-ready execution."],
  ["JARVIS Home", "Recipes, meal plans, grocery lists, local store prices, legitimate coupons, household routines, bills, errands, maintenance and family schedules."],
  ["JARVIS Work", "Warehouse reports, productivity reconciliation, missing employee credit, putaways, variances, downtime, leadership evidence and app health."],
  ["JARVIS Hobby", "Trading research, safe fitness goals, projects, technology, collecting, creative ideas and personalized learning paths."],
  ["JARVIS Fact", "Internet research, source comparison, claim verification, explanations, uncertainty reporting and evidence-backed answers."]
];

export default function HomePage() {
  return (
    <main className="shell">
      <header className="hero">
        <p className="eyebrow">JARVIS PERSONAL & BUSINESS OS</p>
        <h1>Good day, Brandon.</h1>
        <p className="subtitle">One personalized intelligence system across business, home, work, hobbies and factual research. JARVIS may investigate and prepare independently, while purchases, trades, messages, deployments and other consequential actions always wait for approval.</p>
      </header>

      <section className="askCard" aria-label="Ask JARVIS">
        <label htmlFor="jarvis-question">What should JARVIS handle?</label>
        <textarea id="jarvis-question" placeholder="Example: Choose three affordable dinners, compare nearby store prices and coupons, and prepare the cheapest shopping plan." rows={4} />
        <div className="actions">
          <button type="button">Ask JARVIS</button>
          <button className="secondary" type="button">Use voice</button>
        </div>
      </section>

      <section>
        <div className="sectionHeading">
          <h2>JARVIS divisions</h2>
          <span>Separate memory, permissions and tools</span>
        </div>
        <div className="grid">
          {divisions.map(([title, description]) => (
            <article className="moduleCard" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="statusCard">
        <div><strong>Approval queue</strong><span>Required for consequential actions</span></div>
        <div><strong>Always-on service</strong><span>n8n orchestrator and sub-workflows</span></div>
        <div><strong>Memory</strong><span>Scoped by user, household, work and business</span></div>
        <div><strong>Privacy</strong><span>Local-first voice and minimum necessary data sharing</span></div>
      </section>
    </main>
  );
}
