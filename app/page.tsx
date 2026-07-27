'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const systems = [
  { key:'business', title:'BUSINESS', icon:'▣', text:'Projects, ROI, clients, proposals and growth', color:'#3aa8ff' },
  { key:'home', title:'HOME', icon:'⌂', text:'Meals, recipes, bills, calendar and reminders', color:'#55e77d' },
  { key:'work', title:'WORK', icon:'⚙', text:'Warehouse, reports, productivity and operations', color:'#ffae42' },
  { key:'hobby', title:'HOBBY', icon:'◆', text:'Trading, fitness, tech and personal goals', color:'#b574ff' },
  { key:'fact', title:'FACT', icon:'◎', text:'Research, verification, sources and explainers', color:'#47efff' }
] as const;

function classify(input:string){
  const q=input.toLowerCase();
  if(/warehouse|employee|cycle count|putaway|inventory|production|supervisor|work/.test(q)) return 'work';
  if(/recipe|dinner|meal|grocery|coupon|bill|family|calendar|home|house/.test(q)) return 'home';
  if(/trade|spy|market|fitness|workout|game|collect|hobby|learn/.test(q)) return 'hobby';
  if(/business|customer|revenue|profit|company|proposal|project/.test(q)) return 'business';
  return 'fact';
}

export default function HomePage(){
  const router=useRouter();
  const [command,setCommand]=useState('');
  const [listening,setListening]=useState(false);

  function route(value:string){
    const text=value.trim();
    if(!text) return;
    sessionStorage.setItem('jarvis:lastCommand',text);
    router.push(`/${classify(text)}/?q=${encodeURIComponent(text)}`);
  }

  function startVoice(){
    const w=window as typeof window & { webkitSpeechRecognition?: new()=>any; SpeechRecognition?: new()=>any };
    const Recognition=w.SpeechRecognition||w.webkitSpeechRecognition;
    if(!Recognition){ alert('Voice recognition is not available in this browser yet. Type your request instead.'); return; }
    const recognition=new Recognition();
    recognition.lang='en-US'; recognition.interimResults=false; recognition.continuous=false;
    recognition.onstart=()=>setListening(true);
    recognition.onend=()=>setListening(false);
    recognition.onerror=()=>setListening(false);
    recognition.onresult=(event:any)=>{ const text=event.results?.[0]?.[0]?.transcript||''; setCommand(text); route(text); };
    recognition.start();
  }

  return <main className="jarvis-app">
    <aside className="sidebar">
      <div className="logo">JARVIS<small>COMMAND CENTER</small></div>
      <nav>
        <a className="active" href="#command">⌂ <span>Command</span></a>
        <a href="#approvals">✓ <span>Approvals</span><b>2</b></a>
        <a href="#tasks">□ <span>Tasks</span></a>
        <a href="#memory">◇ <span>Memory</span></a>
        {systems.map(s=><Link key={s.key} href={`/${s.key}/`}>{s.icon} <span>{s.title[0]+s.title.slice(1).toLowerCase()}</span></Link>)}
        <Link href="/automations/">◎ <span>Automations</span></Link>
      </nav>
      <div className="online-card"><small>JARVIS STATUS</small><strong>ONLINE</strong><span>● All systems operational</span></div>
      <div className="profile"><i/> <div><b>ZaspDragon</b><small>Administrator</small></div></div>
    </aside>

    <section className="main-panel">
      <header>
        <div><small>GOOD EVENING, ZASPDRAGON</small><h1>How can I help you today?</h1></div>
        <div className="header-tools"><span>SYSTEM TIME<br/><b>8:18 PM</b></span><button>⌁</button><button>◇</button><button>♢<i>2</i></button></div>
      </header>

      <section className="hero-grid" id="command">
        <div className="core-card">
          <div className="brain-stage">
            <div className="ring r1"/><div className="ring r2"/><div className="ring r3"/>
            <div className="brain">◉<span>JARVIS CORE</span></div>
          </div>
          <form onSubmit={e=>{e.preventDefault();route(command)}} className="command-bar">
            <input value={command} onChange={e=>setCommand(e.target.value)} placeholder="Ask anything or give a command..."/>
            <button type="button" onClick={startVoice} className={listening?'listening':''}>◉</button>
            <button type="submit">➤</button>
          </form>
          <div className="quick-actions">
            <button onClick={()=>route('Give me my morning briefing')}>☀ Morning Briefing</button>
            <button onClick={()=>route('Check warehouse performance')}>▣ Check Warehouse</button>
            <button onClick={()=>route('Find dinner deals')}>⌂ Find Dinner Deals</button>
            <button onClick={()=>route('Analyze SPY market sentiment')}>⌁ Market Analysis</button>
          </div>
        </div>

        <aside className="right-rail">
          <section className="status-box"><div className="box-title">SYSTEM STATUS <span>● ALL SYSTEMS OPERATIONAL</span></div>{[['CPU','23%'],['MEMORY','61%'],['NETWORK','12.4 KB/s'],['STORAGE','68%']].map(([a,b])=><div className="metric" key={a}><span>{a}</span><b>{b}</b><i/></div>)}</section>
          <section className="approval-box" id="approvals"><div className="box-title red">APPROVAL CENTER <span>2 PENDING</span></div><article><b>Amazon Purchase</b><strong>$128.47</strong><small>Smart Plug 4-Pack for Home</small><div><button>Review</button><button>Reject</button></div></article><article><b>Trade Proposal</b><strong>SPY PUT</strong><small>Requires explicit authorization</small><div><button>Review</button><button>Reject</button></div></article></section>
        </aside>
      </section>

      <section className="systems-row"><h2>JARVIS SYSTEMS</h2><div>{systems.map(s=><Link key={s.key} href={`/${s.key}/`} style={{'--accent':s.color} as React.CSSProperties}><span>{s.icon}</span><b>{s.title}</b><small>{s.text}</small><i>● ACTIVE</i></Link>)}</div></section>

      <section className="bottom-grid">
        <div id="tasks"><h3>TASKS <a>VIEW ALL</a></h3><p>□ Prepare warehouse weekly report <b>Due Today</b></p><p>□ Research DSCR loan rates <b>Business</b></p><p>□ Grocery plan for this week <b>Home</b></p></div>
        <div id="memory"><h3>MEMORY SNAPSHOT <a>VIEW ALL</a></h3><p>You prefer concise, practical answers <b>Private</b></p><p>Warehouse goal: 200 cycle counts/day <b>Work</b></p><p>Family dinner preference: high protein <b>Household</b></p></div>
        <div><h3>RECENT ACTIVITY <a>VIEW ALL</a></h3><p>● Morning briefing completed <b>7:30 AM</b></p><p>● Warehouse files processed <b>6:15 AM</b></p><p>● GitHub health check passed <b>5:42 AM</b></p></div>
      </section>
    </section>

    <style jsx global>{`
      *{box-sizing:border-box}html,body{margin:0;background:#02070c;color:#eafaff;font-family:Inter,ui-sans-serif,system-ui,sans-serif}body{min-height:100vh;background-image:linear-gradient(rgba(30,220,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(30,220,255,.025) 1px,transparent 1px);background-size:34px 34px}button,input{font:inherit}.jarvis-app{min-height:100vh;display:grid;grid-template-columns:210px 1fr;background:radial-gradient(circle at 58% 18%,rgba(0,159,255,.12),transparent 29%),#02070c}.sidebar{position:sticky;top:0;height:100vh;padding:28px 16px 18px;border-right:1px solid rgba(83,229,255,.12);background:rgba(1,7,12,.92);display:flex;flex-direction:column}.logo{font-size:1.9rem;letter-spacing:.09em;color:#48edff;font-weight:800;text-shadow:0 0 20px rgba(72,237,255,.45)}.logo small{display:block;font-size:.58rem;letter-spacing:.12em;color:#8197a3;margin:4px 0 28px 18px}.sidebar nav{display:grid;gap:8px}.sidebar nav a{display:flex;align-items:center;gap:12px;padding:11px 12px;color:#a4b8c2;text-decoration:none;border:1px solid transparent;border-radius:10px;font-size:.86rem}.sidebar nav a:hover,.sidebar nav a.active{color:#eaffff;border-color:#35dfff;background:rgba(35,199,255,.11);box-shadow:inset 0 0 20px rgba(35,199,255,.06),0 0 14px rgba(35,199,255,.08)}.sidebar nav a b{margin-left:auto;background:#ff4d4d;border-radius:99px;padding:2px 7px;font-size:.65rem}.online-card{margin-top:auto;padding:15px;border:1px solid rgba(72,237,255,.18);border-radius:14px;background:rgba(4,15,23,.75)}.online-card small,.online-card span{display:block;color:#77909c;font-size:.62rem}.online-card strong{display:block;color:#55e77d;font-size:1.25rem;margin:8px 0}.profile{display:flex;align-items:center;gap:10px;margin-top:12px;padding:12px}.profile i{width:32px;height:32px;border:1px solid #42eaff;border-radius:50%;box-shadow:0 0 15px rgba(66,234,255,.35)}.profile small{display:block;color:#718995;font-size:.62rem}.main-panel{padding:28px;min-width:0}.main-panel header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}.main-panel header small{color:#55eaff;font-size:.65rem;letter-spacing:.09em}.main-panel h1{margin:6px 0;font-size:1.7rem}.header-tools{display:flex;align-items:center;gap:9px}.header-tools>span{font-size:.58rem;color:#8195a0;margin-right:10px}.header-tools button{position:relative;width:42px;height:42px;color:#bceef6;background:rgba(4,15,23,.75);border:1px solid rgba(102,221,255,.25);border-radius:10px}.header-tools i{position:absolute;right:-4px;top:-5px;background:#ff4d4d;border-radius:50%;font-size:.55rem;padding:3px}.hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:20px}.core-card,.status-box,.approval-box,.systems-row>div>a,.bottom-grid>div{border:1px solid rgba(77,224,255,.18);background:linear-gradient(145deg,rgba(5,20,31,.92),rgba(2,9,15,.86));box-shadow:inset 0 0 35px rgba(0,194,255,.025);border-radius:16px}.core-card{padding:18px}.brain-stage{position:relative;min-height:360px;display:grid;place-items:center;overflow:hidden}.ring{position:absolute;border:1px solid rgba(64,224,255,.2);border-radius:50%;box-shadow:0 0 30px rgba(64,224,255,.08)}.r1{width:310px;height:310px}.r2{width:250px;height:250px;border-style:dashed;animation:spin 17s linear infinite}.r3{width:180px;height:180px;animation:spin 11s linear infinite reverse}.brain{width:150px;height:150px;border-radius:48% 52% 50% 45%;display:grid;place-items:center;font-size:4.5rem;color:#71f6ff;background:radial-gradient(circle,rgba(34,205,255,.25),rgba(2,10,17,.25) 65%);filter:drop-shadow(0 0 20px #00cfff);animation:float 4s ease-in-out infinite}.brain span{position:absolute;margin-top:205px;font-size:.62rem;letter-spacing:.16em}.command-bar{display:grid;grid-template-columns:1fr auto auto;gap:8px;padding:8px;border:1px solid #25dfff;border-radius:14px;box-shadow:0 0 20px rgba(37,223,255,.12)}.command-bar input{min-width:0;border:0;background:transparent;color:white;padding:12px;outline:none}.command-bar button{width:44px;border:1px solid rgba(72,237,255,.25);border-radius:10px;background:rgba(15,55,72,.8);color:#8cf6ff}.command-bar button:last-child{background:#2ee7ff;color:#031018}.command-bar button.listening{animation:pulse .8s infinite}.quick-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.quick-actions button{padding:9px 12px;border:1px solid rgba(72,237,255,.17);border-radius:10px;background:rgba(4,15,23,.72);color:#b9d5df}.right-rail{display:grid;gap:16px}.status-box,.approval-box{padding:16px}.box-title{display:flex;justify-content:space-between;color:#47efff;font-size:.67rem;font-weight:800;letter-spacing:.06em;padding-bottom:12px;border-bottom:1px solid rgba(72,237,255,.1)}.box-title span{font-size:.52rem;color:#7df49c}.box-title.red{color:#ff5a5a}.box-title.red span{color:#ff9b9b}.metric{display:grid;grid-template-columns:1fr auto 80px;gap:8px;align-items:center;padding:10px 0;font-size:.65rem}.metric i{height:18px;background:linear-gradient(135deg,transparent 30%,#42eaff 31% 34%,transparent 35% 50%,#42eaff 51% 54%,transparent 55%);opacity:.8}.approval-box article{padding:14px 0;border-bottom:1px solid rgba(72,237,255,.1)}.approval-box article b,.approval-box article strong{display:inline-block}.approval-box article strong{float:right}.approval-box article small{display:block;color:#7e96a1;margin:5px 0 10px}.approval-box article button{padding:7px 10px;border:1px solid #31dfff;border-radius:8px;background:transparent;color:#95efff;margin-right:7px}.approval-box article button:last-child{border-color:#ff5757;color:#ff8787}.systems-row{margin-top:18px}.systems-row h2{font-size:.75rem;color:#42eaff;letter-spacing:.08em}.systems-row>div{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.systems-row>div>a{--accent:#47efff;min-height:190px;padding:18px;text-align:center;text-decoration:none;display:flex;flex-direction:column;align-items:center;color:white;border-color:color-mix(in srgb,var(--accent) 45%,transparent)}.systems-row a>span{font-size:2.3rem;color:var(--accent);margin:8px}.systems-row a>b{color:var(--accent);margin:6px}.systems-row a>small{color:#8ca4af;line-height:1.45}.systems-row a>i{margin-top:auto;color:#56e77d;font-style:normal;font-size:.55rem}.bottom-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}.bottom-grid>div{padding:16px}.bottom-grid h3{font-size:.72rem;color:#47efff}.bottom-grid h3 a{float:right;color:#47efff;font-size:.55rem}.bottom-grid p{font-size:.68rem;color:#a7bbc4;padding:8px 0;border-bottom:1px solid rgba(72,237,255,.07)}.bottom-grid p b{float:right;color:#dfb35c;font-size:.58rem}@keyframes spin{to{transform:rotate(360deg)}}@keyframes float{50%{transform:translateY(-12px)}}@keyframes pulse{50%{box-shadow:0 0 30px #47efff}}@media(max-width:1050px){.jarvis-app{grid-template-columns:74px 1fr}.sidebar{padding:20px 10px}.logo{font-size:.8rem}.logo small,.sidebar nav span,.sidebar nav a b,.online-card,.profile div{display:none}.sidebar nav a{justify-content:center;font-size:1.1rem}.profile{justify-content:center}.hero-grid{grid-template-columns:1fr}.right-rail{grid-template-columns:1fr 1fr}.systems-row>div{grid-template-columns:repeat(3,1fr)}.bottom-grid{grid-template-columns:1fr 1fr}.bottom-grid>div:last-child{grid-column:1/-1}}@media(max-width:700px){.jarvis-app{display:block}.sidebar{position:fixed;z-index:50;left:0;right:0;top:auto;bottom:0;width:auto;height:66px;display:block;padding:8px;border-right:0;border-top:1px solid rgba(72,237,255,.2)}.logo,.online-card,.profile,.sidebar nav a:nth-child(n+5){display:none}.sidebar nav{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}.sidebar nav a{padding:7px;font-size:.72rem;display:flex;flex-direction:column;gap:3px}.sidebar nav a span{display:block;font-size:.52rem}.main-panel{padding:18px 12px 90px}.main-panel header{align-items:center}.main-panel h1{font-size:1.15rem}.header-tools>span,.header-tools button:nth-of-type(-n+2){display:none}.brain-stage{min-height:280px}.r1{width:250px;height:250px}.r2{width:205px;height:205px}.r3{width:150px;height:150px}.brain{width:125px;height:125px}.right-rail{grid-template-columns:1fr}.systems-row>div{grid-template-columns:1fr 1fr}.systems-row>div>a:last-child{grid-column:1/-1}.bottom-grid{grid-template-columns:1fr}.bottom-grid>div:last-child{grid-column:auto}.quick-actions{display:grid;grid-template-columns:1fr 1fr}.command-bar{grid-template-columns:1fr auto}.command-bar button:nth-of-type(1){display:none}}
    `}</style>
  </main>;
}
