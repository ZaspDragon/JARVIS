'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

type Props={
  name:string;
  accent:string;
  description:string;
  tools:string[];
  examples:string[];
};

export default function JarvisLayer({name,accent,description,tools,examples}:Props){
  const params=useSearchParams();
  const [command,setCommand]=useState(params.get('q')||'');
  const [answer,setAnswer]=useState('');
  function submit(e:React.FormEvent){e.preventDefault();if(!command.trim())return;setAnswer(`JARVIS ${name.toUpperCase()} received this request and is preparing the correct tools, memory scope and safety checks. Live execution activates when the connected AI and n8n credentials are configured.`)}
  return <main className="deep-shell" style={{'--layer':accent} as React.CSSProperties}>
    <div className="deep-circuit"/><nav><Link href="/">← JARVIS CORE</Link><span>{name.toUpperCase()} LAYER</span><b>ONLINE</b></nav>
    <header><p className="eyebrow">SPECIALIZED INTELLIGENCE</p><h1>JARVIS<br/><span>{name}</span></h1><p>{description}</p></header>
    <section className="deep-console"><div className="console-orbit"><div className="console-core">{name[0]}</div></div><form onSubmit={submit}><label>Ask JARVIS {name}</label><textarea value={command} onChange={e=>setCommand(e.target.value)} placeholder={`Ask anything related to ${name.toLowerCase()}...`}/><button>PROCESS REQUEST</button></form></section>
    {answer&&<section className="layer-answer"><b>ROUTED CORRECTLY</b><p>{answer}</p></section>}
    <section className="tool-section"><div><p className="eyebrow">CONNECTED CAPABILITIES</p><h2>Tools inside this layer</h2></div><div className="tool-grid">{tools.map(tool=><article key={tool}><span>◈</span><b>{tool}</b></article>)}</div></section>
    <section className="example-section"><p className="eyebrow">VOICE EXAMPLES</p>{examples.map(example=><button key={example} onClick={()=>setCommand(example)}>“{example}”</button>)}</section>
    <style jsx global>{`
      .deep-shell{--layer:#58f6ff;position:relative;min-height:100vh;padding:22px max(18px,5vw) 70px;background:radial-gradient(circle at 50% 0,color-mix(in srgb,var(--layer) 16%,transparent),#02060c 38%,#010307 100%);color:#effcff;overflow:hidden}.deep-circuit{position:fixed;inset:0;pointer-events:none;opacity:.32;background-image:linear-gradient(color-mix(in srgb,var(--layer) 8%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--layer) 8%,transparent) 1px,transparent 1px);background-size:42px 42px}.deep-shell nav{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:15px;font-size:.68rem;letter-spacing:.13em}.deep-shell nav a{color:var(--layer);text-decoration:none}.deep-shell nav b{color:#5dffb3}.deep-shell header{position:relative;z-index:3;max-width:850px;margin:11vh auto 40px;text-align:center}.deep-shell header h1{font-size:clamp(4rem,12vw,9rem);line-height:.78;margin:10px 0 24px}.deep-shell header h1 span{color:var(--layer);filter:drop-shadow(0 0 22px color-mix(in srgb,var(--layer) 35%,transparent))}.deep-shell header>p:last-child{color:#96adb9;line-height:1.7}.deep-console,.layer-answer,.tool-grid article,.example-section{position:relative;z-index:3;border:1px solid color-mix(in srgb,var(--layer) 30%,transparent);background:rgba(4,13,22,.82);backdrop-filter:blur(18px)}.deep-console{max-width:980px;margin:auto;padding:24px;border-radius:24px;display:grid;grid-template-columns:240px 1fr;gap:30px;align-items:center}.console-orbit{width:210px;height:210px;border:1px solid var(--layer);border-radius:50%;display:grid;place-items:center;box-shadow:0 0 60px color-mix(in srgb,var(--layer) 18%,transparent),inset 0 0 50px color-mix(in srgb,var(--layer) 12%,transparent);animation:layerFloat 5s ease-in-out infinite}.console-core{width:92px;height:92px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--layer) 18%,#06111b);color:var(--layer);font-size:3rem;font-weight:900;box-shadow:0 0 35px color-mix(in srgb,var(--layer) 35%,transparent)}.deep-console label{display:block;color:var(--layer);font-weight:800;margin-bottom:12px}.deep-console textarea{width:100%;min-height:130px;padding:16px;border-radius:14px;border:1px solid color-mix(in srgb,var(--layer) 20%,transparent);background:#01070d;color:white;resize:vertical}.deep-console button{margin-top:12px}.layer-answer{max-width:980px;margin:16px auto;padding:20px;border-radius:17px}.layer-answer b{color:#5dffb3;font-size:.65rem;letter-spacing:.13em}.layer-answer p{color:#9ab0bc;line-height:1.6}.tool-section{position:relative;z-index:3;max-width:1100px;margin:85px auto 0}.tool-section h2{font-size:clamp(2rem,5vw,4rem);margin:0 0 24px}.tool-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.tool-grid article{padding:24px;border-radius:16px;display:flex;gap:12px}.tool-grid span{color:var(--layer)}.example-section{max-width:1100px;margin:18px auto 0;padding:20px;border-radius:18px}.example-section button{margin:5px;background:transparent;color:#b8ccd5;border-color:color-mix(in srgb,var(--layer) 20%,transparent)}@keyframes layerFloat{50%{transform:translateY(-10px) rotate(3deg)}}@media(max-width:750px){.deep-console{grid-template-columns:1fr}.console-orbit{margin:auto;width:165px;height:165px}.tool-grid{grid-template-columns:1fr}.deep-shell header{margin-top:8vh}.deep-shell nav span{display:none}}
    `}</style>
  </main>
}
