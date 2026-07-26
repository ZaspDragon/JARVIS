'use client';

import { FormEvent, useMemo, useState } from "react";

const divisions = [
  ["01", "JARVIS Business", "Business ideas, operations, revenue opportunities, costs, customers and approval-ready execution."],
  ["02", "JARVIS Home", "Recipes, meal plans, grocery prices, coupons, routines, bills, errands and family schedules."],
  ["03", "JARVIS Work", "Warehouse reports, productivity reconciliation, missing credit, variances, downtime and app health."],
  ["04", "JARVIS Hobby", "Trading research, safe fitness goals, technology, collecting, creative projects and learning."],
  ["05", "JARVIS Fact", "Live research, source comparison, claim verification and evidence-backed answers."]
];

const neuralPoints = [[50,14],[34,22],[66,22],[22,36],[43,36],[57,36],[78,36],[16,53],[34,53],[50,50],[66,53],[84,53],[24,70],[43,68],[57,68],[76,70],[36,84],[64,84]];
const neuralLinks = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8],[4,8],[4,9],[5,9],[5,10],[6,10],[6,11],[7,12],[8,12],[8,13],[9,13],[9,14],[10,14],[10,15],[11,15],[12,16],[13,16],[13,17],[14,17],[15,17],[4,5],[8,9],[9,10],[13,14]];

type View = "command" | "approvals" | "tasks" | "memory";
type Result = { division: string; intent: string; mode: string; tools: string[]; message: string };

function NeuralCore() {
  return <div className="neural-stage" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="brain-shell"><svg className="brain-map" viewBox="0 0 100 100"><defs><filter id="glow"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="circuitGradient"><stop offset="0" stopColor="#41f4ff"/><stop offset=".5" stopColor="#a970ff"/><stop offset="1" stopColor="#5dffb3"/></linearGradient></defs><path className="brain-outline" d="M49 9C37 7 29 13 26 22c-10 1-16 8-16 18 0 6 3 11 8 14-2 11 5 19 14 21 2 10 8 16 17 16V9Zm2 0c12-2 20 4 23 13 10 1 16 8 16 18 0 6-3 11-8 14 2 11-5 19-14 21-2 10-8 16-17 16V9Z"/>{neuralLinks.map(([a,b],i)=><line key={i} className="neural-link" x1={neuralPoints[a][0]} y1={neuralPoints[a][1]} x2={neuralPoints[b][0]} y2={neuralPoints[b][1]}/>) }{neuralPoints.map(([x,y],i)=><g key={i} className="neural-node"><circle className="node-halo" cx={x} cy={y} r="3.1"/><circle className="node-core" cx={x} cy={y} r="1.15"/></g>)}</svg><div className="core-label"><span>NEURAL CORE</span><strong>ONLINE</strong></div></div><div className="data-chip chip-one">MEMORY<br/><strong>SCOPED</strong></div><div className="data-chip chip-two">APPROVAL<br/><strong>REQUIRED</strong></div><div className="data-chip chip-three">SYSTEM<br/><strong>STABLE</strong></div></div>;
}

function localPlan(message: string): Result {
  const q = message.toLowerCase();
  const division = /warehouse|employee|cycle count|putaway|work/.test(q) ? "JARVIS Work" : /recipe|dinner|grocery|coupon|home|bill/.test(q) ? "JARVIS Home" : /trade|spy|market|fitness|hobby/.test(q) ? "JARVIS Hobby" : /business|revenue|customer|profit/.test(q) ? "JARVIS Business" : "JARVIS Fact";
  const consequential = /buy|purchase|send|email|deploy|merge|delete|trade|order|change|cancel|close/.test(q);
  return { division, intent: consequential ? "prepare_action" : "research_and_answer", mode: consequential ? "approval_required" : "read_only", tools: division === "JARVIS Work" ? ["documents","warehouse"] : division === "JARVIS Home" ? ["web_research","calendar"] : division === "JARVIS Hobby" ? ["web_research","trading_observer"] : ["web_research"], message: consequential ? "I can investigate and prepare this action. Nothing consequential will happen until you approve the exact proposal." : "Request classified and ready for the connected JARVIS specialist workflow." };
}

export default function HomePage() {
  const [view,setView] = useState<View>("command");
  const [question,setQuestion] = useState("");
  const [result,setResult] = useState<Result|null>(null);
  const [loading,setLoading] = useState(false);
  const approvals = useMemo(()=>result?.mode === "approval_required" ? 1 : 0,[result]);

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/jarvis", { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({message:question}) });
      if (!response.ok) throw new Error("API unavailable");
      const data = await response.json();
      setResult({ division:data.plan?.division ?? data.intent?.category ?? "JARVIS Fact", intent:data.plan?.intent ?? data.intent?.name ?? "request", mode:data.plan?.executionMode ?? data.executionMode ?? "read_only", tools:data.plan?.tools?.map((tool:{name:string})=>tool.name) ?? [], message:data.plan?.summary ?? "JARVIS has prepared the request." });
    } catch {
      setResult(localPlan(question));
    } finally { setLoading(false); }
  }

  return <main className="shell"><div className="circuit-field" aria-hidden="true"/><nav className="topbar"><div className="brand-mark"><span className="brand-orb"/> JARVIS</div><div className="system-pill"><span/> SYSTEM ONLINE</div></nav>
    <div className="workspace-tabs" role="navigation">{(["command","approvals","tasks","memory"] as View[]).map(item=><button key={item} className={view===item?"active":""} onClick={()=>setView(item)}>{item.toUpperCase()}{item==="approvals"&&approvals>0?` ${approvals}`:""}</button>)}</div>

    {view==="command" && <><section className="hero-grid"><div className="hero-copy"><p className="eyebrow">PERSONAL INTELLIGENCE // COMMAND SYSTEM</p><h1>Good day,<br/><span>Brandon.</span></h1><p className="subtitle">The dashboard is now connected to JARVIS routing and approval logic. Ask naturally; JARVIS identifies the correct division, tools and safety mode.</p><div className="hero-actions"><button onClick={()=>document.getElementById("jarvis-question")?.focus()}>Enter Command Center</button><button className="secondary" type="button">Voice Interface</button></div></div><NeuralCore/></section>
      <form className="command-deck" onSubmit={submit}><div className="command-header"><div><span className="command-dot"/> ACTIVE INPUT</div><span>{loading?"PROCESSING":"ENCRYPTED SESSION"}</span></div><label htmlFor="jarvis-question">What should JARVIS handle?</label><div className="command-input-wrap"><textarea id="jarvis-question" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Analyze, plan, research or prepare an action..." rows={3}/><button type="submit" className="send-button" aria-label="Send command" disabled={loading}>{loading?"…":"➜"}</button></div><div className="quick-commands"><span>Try:</span>{["Review today's priorities","Find dinner deals","Check warehouse performance"].map(text=><button type="button" key={text} onClick={()=>setQuestion(text)}>{text}</button>)}</div></form>
      {result&&<section className="jarvis-result"><div className="result-head"><span>{result.division}</span><b className={result.mode==="approval_required"?"warning":"safe"}>{result.mode.replaceAll("_"," ").toUpperCase()}</b></div><h2>Request understood</h2><p>{result.message}</p><div className="result-grid"><div><small>INTENT</small><strong>{result.intent.replaceAll("_"," ")}</strong></div><div><small>TOOLS</small><strong>{result.tools.join(", ")||"specialist router"}</strong></div></div>{result.mode==="approval_required"&&<button onClick={()=>setView("approvals")}>Review approval proposal</button>}</section>}
      <section className="systems-section"><div className="sectionHeading"><div><p className="eyebrow">NEURAL NETWORK</p><h2>Connected divisions</h2></div><span>Five specialized systems. One intelligence.</span></div><div className="grid">{divisions.map(([number,title,description],index)=><article className="moduleCard" key={title} style={{"--delay":`${index*90}ms`} as React.CSSProperties}><div className="card-top"><span className="module-number">{number}</span><span className="module-status">ONLINE</span></div><div className="module-icon"><span/><span/><span/></div><h3>{title}</h3><p>{description}</p><button className="module-link" type="button" onClick={()=>{setQuestion(`Open ${title} and show me what needs attention.`);document.getElementById("jarvis-question")?.scrollIntoView({behavior:"smooth"});}}>OPEN SYSTEM <span>↗</span></button></article>)}</div></section></>}

    {view==="approvals"&&<section className="workspace-panel"><p className="eyebrow">HUMAN AUTHORIZATION</p><h1>Approval Center</h1>{approvals?<article className="approval-card"><div><b>WAITING</b><span>{result?.division}</span></div><h2>{question}</h2><p>{result?.message}</p><div className="approval-actions"><button type="button">Approve exact proposal</button><button className="secondary" type="button">Reject</button></div><small>Approval expires when price, quantity, recipient, risk, timing or circumstances change.</small></article>:<div className="empty-state">No actions are waiting for approval.</div>}</section>}
    {view==="tasks"&&<section className="workspace-panel"><p className="eyebrow">EXECUTION MAP</p><h1>Tasks</h1><div className="empty-state">Task extraction is connected to the conversation plan. Supabase persistence activates after environment credentials are configured.</div></section>}
    {view==="memory"&&<section className="workspace-panel"><p className="eyebrow">SCOPED INTELLIGENCE</p><h1>Memory</h1><div className="memory-grid"><div><b>PRIVATE</b><span>Your personal preferences and decisions</span></div><div><b>HOUSEHOLD</b><span>Shared home routines and lists</span></div><div><b>WORK</b><span>Warehouse reports and operational context</span></div><div><b>BUSINESS</b><span>Projects, customers and opportunities</span></div></div></section>}

    <section className="statusCard"><div><span className="status-icon">◈</span><p><strong>Approval Matrix</strong><small>Exact authorization for consequential actions</small></p><b>ARMED</b></div><div><span className="status-icon">◎</span><p><strong>Conversation Router</strong><small>Division, intent and tool planning connected</small></p><b>ONLINE</b></div><div><span className="status-icon">⌬</span><p><strong>Scoped Memory</strong><small>Supabase schema and security policies ready</small></p><b>READY</b></div><div><span className="status-icon">◇</span><p><strong>Privacy Layer</strong><small>Secrets remain server-side</small></p><b>ACTIVE</b></div></section>
    <style jsx global>{`
      .workspace-tabs{position:sticky;top:8px;z-index:20;display:flex;gap:7px;width:max-content;max-width:100%;overflow:auto;margin:0 auto 18px;padding:7px;border:1px solid var(--line);border-radius:999px;background:rgba(2,8,14,.82);backdrop-filter:blur(18px)}
      .workspace-tabs button{padding:8px 13px;border:0;border-radius:999px;background:transparent;color:#7693a3;box-shadow:none;font-size:.62rem;letter-spacing:.12em;white-space:nowrap}.workspace-tabs button.active{background:rgba(88,246,255,.13);color:var(--cyan)}
      .jarvis-result,.workspace-panel,.approval-card,.empty-state,.memory-grid>div{border:1px solid var(--line);background:linear-gradient(135deg,rgba(10,27,45,.86),rgba(4,11,20,.76));backdrop-filter:blur(18px)}
      .jarvis-result{margin-top:16px;padding:22px;border-radius:18px}.result-head{display:flex;justify-content:space-between;gap:15px;color:var(--cyan);font-size:.68rem;letter-spacing:.12em}.result-head b{font-size:.58rem;padding:6px 9px;border-radius:999px}.result-head .safe{color:var(--mint);background:rgba(93,255,179,.08)}.result-head .warning{color:#ffd184;background:rgba(255,177,73,.1)}.jarvis-result h2{margin:18px 0 8px}.jarvis-result p{color:#9bb2bf;line-height:1.65}.result-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 0}.result-grid div{padding:13px;border:1px solid rgba(88,246,255,.1);border-radius:12px;background:rgba(1,7,13,.45)}.result-grid small{display:block;color:#668392;font-size:.56rem;letter-spacing:.13em;margin-bottom:7px}.result-grid strong{font-size:.82rem;text-transform:capitalize}
      .workspace-panel{min-height:520px;padding:clamp(22px,5vw,54px);border-radius:22px;margin:34px 0}.workspace-panel h1{font-size:clamp(3rem,9vw,6rem);margin-bottom:30px}.approval-card{padding:22px;border-radius:18px;max-width:760px}.approval-card>div:first-child{display:flex;justify-content:space-between;color:var(--cyan);font-size:.64rem;letter-spacing:.12em}.approval-card h2{font-size:1.4rem;line-height:1.35}.approval-card p,.approval-card small{color:#8fa7b4;line-height:1.6}.approval-actions{display:flex;gap:10px;margin:20px 0}.empty-state{padding:28px;border-radius:18px;color:#89a4b2}.memory-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.memory-grid>div{padding:22px;border-radius:16px}.memory-grid b{display:block;color:var(--cyan);font-size:.68rem;letter-spacing:.14em;margin-bottom:9px}.memory-grid span{color:#8fa7b4}
      button:disabled{opacity:.55;cursor:wait}.statusCard{margin-bottom:20px}
      @media(max-width:650px){.workspace-tabs{width:100%;justify-content:flex-start}.result-grid,.memory-grid{grid-template-columns:1fr}.approval-actions{flex-direction:column}.workspace-panel{min-height:430px;margin-top:18px}.workspace-panel h1{font-size:3.4rem}}
    `}</style>
  </main>;
}
