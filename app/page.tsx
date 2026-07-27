'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const categories = [
  { key:'business', title:'JARVIS Business', hint:'Projects, customers, revenue, costs and growth', color:'#4da3ff' },
  { key:'home', title:'JARVIS Home', hint:'Meals, groceries, bills, family and routines', color:'#56e27a' },
  { key:'work', title:'JARVIS Work', hint:'Warehouse reports, productivity and operations', color:'#ffb347' },
  { key:'hobby', title:'JARVIS Hobby', hint:'Trading, fitness, technology and learning', color:'#b883ff' },
  { key:'fact', title:'JARVIS Fact', hint:'Research, verification, sources and explanations', color:'#58f6ff' }
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
  const [text,setText]=useState('');
  const [listening,setListening]=useState(false);
  const [detected,setDetected]=useState('');

  function routeCommand(command:string){
    const value=command.trim();
    if(!value) return;
    const category=classify(value);
    setDetected(category);
    sessionStorage.setItem('jarvis:lastCommand',value);
    setTimeout(()=>router.push(`/${category}/?q=${encodeURIComponent(value)}`),450);
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
    recognition.onresult=(event:any)=>{ const command=event.results?.[0]?.[0]?.transcript||''; setText(command); routeCommand(command); };
    recognition.start();
  }

  return <main className="gateway-shell">
    <div className="depth depth-one"/><div className="depth depth-two"/><div className="depth depth-three"/>
    <nav className="gateway-nav"><span className="brand-orb"/>JARVIS <b>SYSTEM ONLINE</b></nav>
    <section className="gateway-core">
      <p className="eyebrow">VOICE-ROUTED INTELLIGENCE</p>
      <h1>Ask once.<br/><span>Enter the right layer.</span></h1>
      <p>JARVIS listens to the meaning of your request, chooses the correct intelligence division and opens only that deeper workspace.</p>
      <button className={`voice-core ${listening?'listening':''}`} onClick={startVoice} aria-label="Start voice command"><span>◉</span><b>{listening?'LISTENING':'HOLD TO SPEAK'}</b><small>AI category detection</small></button>
      <form onSubmit={e=>{e.preventDefault();routeCommand(text)}} className="gateway-input"><input value={text} onChange={e=>setText(e.target.value)} placeholder="Or type a request for JARVIS..."/><button>ROUTE</button></form>
      {detected&&<div className="route-status">ROUTING TO JARVIS {detected.toUpperCase()}...</div>}
    </section>
    <section className="layer-preview"><p className="eyebrow">DEEPER SYSTEM LAYERS</p><div className="layer-grid">{categories.map(category=><Link key={category.key} href={`/${category.key}/`} className="layer-card" style={{'--accent':category.color} as React.CSSProperties}><span>{category.title}</span><small>{category.hint}</small><b>ENTER LAYER →</b></Link>)}</div></section>
    <footer>Voice requests are classified by intent. Consequential actions still require approval.</footer>
    <style jsx global>{`
      .gateway-shell{position:relative;min-height:100vh;overflow:hidden;padding:22px max(18px,5vw) 50px;background:#01050a;color:#eefbff}.depth{position:fixed;inset:-20%;pointer-events:none;border:1px solid rgba(88,246,255,.1);border-radius:50%;transform:perspective(900px) rotateX(72deg);box-shadow:0 0 90px rgba(88,246,255,.08),inset 0 0 70px rgba(88,246,255,.05)}.depth-one{top:8%;animation:depthPulse 7s infinite}.depth-two{top:24%;scale:.78;animation:depthPulse 9s infinite reverse}.depth-three{top:40%;scale:.58;animation:depthPulse 11s infinite}.gateway-nav{position:relative;z-index:4;display:flex;align-items:center;gap:10px;letter-spacing:.2em;font-weight:800}.gateway-nav b{margin-left:auto;color:#5dffb3;font-size:.62rem}.gateway-core{position:relative;z-index:3;max-width:900px;margin:8vh auto 0;text-align:center}.gateway-core h1{font-size:clamp(3rem,9vw,7.4rem);line-height:.88;margin:8px 0 20px}.gateway-core h1 span{color:transparent;-webkit-text-stroke:1px #8efaff}.gateway-core>p{max-width:720px;margin:0 auto;color:#90a9b7;line-height:1.7}.voice-core{width:190px;height:190px;margin:38px auto 22px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:radial-gradient(circle,rgba(88,246,255,.3),rgba(5,20,32,.95) 58%);color:#dfffff;border:1px solid #58f6ff;box-shadow:0 0 45px rgba(88,246,255,.3),inset 0 0 35px rgba(88,246,255,.18)}.voice-core span{font-size:2.2rem}.voice-core small{color:#78a0ad}.voice-core.listening{animation:listenPulse 1s infinite}.gateway-input{display:flex;max-width:720px;margin:auto;border:1px solid rgba(88,246,255,.25);padding:7px;border-radius:16px;background:rgba(3,12,20,.88)}.gateway-input input{flex:1;border:0;background:transparent;color:white;padding:14px;outline:none}.route-status{margin-top:14px;color:#5dffb3;font-size:.72rem;letter-spacing:.13em}.layer-preview{position:relative;z-index:3;max-width:1100px;margin:90px auto 0}.layer-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.layer-card{--accent:#58f6ff;min-height:180px;padding:20px;border:1px solid color-mix(in srgb,var(--accent) 45%,transparent);background:linear-gradient(160deg,color-mix(in srgb,var(--accent) 10%,transparent),rgba(4,11,20,.82));border-radius:18px;text-decoration:none;color:white;display:flex;flex-direction:column;transition:.25s}.layer-card:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 20px 50px color-mix(in srgb,var(--accent) 15%,transparent)}.layer-card span{font-weight:800;color:var(--accent)}.layer-card small{color:#91a9b7;line-height:1.5;margin-top:14px}.layer-card b{margin-top:auto;font-size:.62rem;letter-spacing:.12em;color:var(--accent)}footer{position:relative;z-index:3;text-align:center;margin-top:35px;color:#64808f;font-size:.75rem}@keyframes depthPulse{50%{transform:perspective(900px) rotateX(72deg) translateZ(50px);opacity:.45}}@keyframes listenPulse{50%{scale:1.06;box-shadow:0 0 80px rgba(88,246,255,.65)}}@media(max-width:850px){.layer-grid{grid-template-columns:1fr 1fr}.layer-card:last-child{grid-column:1/-1}.gateway-core{margin-top:6vh}}@media(max-width:520px){.layer-grid{grid-template-columns:1fr}.layer-card:last-child{grid-column:auto}.gateway-input{flex-direction:column}.gateway-input button{width:100%}.voice-core{width:165px;height:165px}}
    `}</style>
  </main>;
}
