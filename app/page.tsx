const workModules = [
  ["Warehouse Today", "Production, cycle-count files, already-counted credit, putaways, variances, downtime and staffing risks"],
  ["People & Leadership", "Fair productivity evidence, coaching notes, recognition, assignments and manager-ready summaries"],
  ["Apps & GitHub", "App health, data safety, failures, repeated requests, proposed fixes, tests and approval-ready pull requests"],
  ["Work Documents", "Compare Excel, PDF, screenshots and links; detect missing credit, duplicates, exceptions and control-total differences"]
];

const homeModules = [
  ["Household", "Shared reminders, groceries, errands, maintenance, appointments and family plans"],
  ["Money & Goals", "Bills, savings, home-buying plans, overtime scenarios, subscriptions and major-purchase decisions"],
  ["Personal Assistant", "Voice questions, routines, calendar, weather, traffic, timers, notes and daily briefings"],
  ["Health & Training", "Safe workouts, habits, meal planning and personalized goals—including a Spider-inspired fitness path without dangerous stunts"]
];

export default function HomePage() {
  return (
    <main className="shell">
      <header className="hero">
        <p className="eyebrow">JARVIS PERSONAL OS</p>
        <h1>Good day, Brandon.</h1>
        <p className="subtitle">A private, personalized command center for work and home. JARVIS may think, investigate and prepare actions independently, but consequential actions always wait for your approval.</p>
      </header>

      <section className="askCard" aria-label="Ask JARVIS">
        <label htmlFor="jarvis-question">What do you need help with?</label>
        <textarea id="jarvis-question" placeholder="Example: Compare today’s warehouse reports, then remind us what we need from the store tonight." rows={4} />
        <div className="actions">
          <button type="button">Ask JARVIS</button>
          <button className="secondary" type="button">Use voice</button>
        </div>
      </section>

      <section>
        <div className="sectionHeading">
          <h2>Work</h2>
          <span>Company data stays separated</span>
        </div>
        <div className="grid">
          {workModules.map(([title, description]) => (
            <article className="moduleCard" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="sectionHeading">
          <h2>At Home</h2>
          <span>Personalized for your household</span>
        </div>
        <div className="grid">
          {homeModules.map(([title, description]) => (
            <article className="moduleCard" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="statusCard">
        <div><strong>Approval queue</strong><span>Required for consequential actions</span></div>
        <div><strong>Always-on service</strong><span>n8n design ready</span></div>
        <div><strong>Memory</strong><span>Separate work, personal and household scopes</span></div>
        <div><strong>Privacy</strong><span>Local-first voice and minimum cloud exposure planned</span></div>
      </section>
    </main>
  );
}
