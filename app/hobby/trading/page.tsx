'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { reasonAboutPut, type PutInputs } from '@/lib/trading/putReasoning';

const initial: PutInputs = {
  symbol: 'SPY',
  price: 0,
  openingRangeLow: 0,
  openingRangeHigh: 0,
  volumeStrength: 'normal',
  trend: 'at-vwap',
  retest: 'not-tested',
  fearScore: 50,
  minutesBelowRange: 0,
};

export default function TradingPage(){
  const [input,setInput]=useState(initial);
  const result=useMemo(()=>reasonAboutPut(input),[input]);
  const set=<K extends keyof PutInputs>(key:K,value:PutInputs[K])=>setInput(current=>({...current,[key]:value}));

  return <main className="trade-shell">
    <header><Link href="/hobby/">← HOBBY</Link><div><span>TRADING OBSERVER</span><b>PAPER / APPROVAL MODE</b></div></header>
    <section className="trade-hero"><p>JARVIS PUT REASONING</p><h1>Explain the bearish thesis before taking risk.</h1><small>JARVIS scores structure, volume, retest quality, time below the opening range and human fear. It does not place a trade and always requires your explicit approval.</small></section>
    <section className="trade-grid">
      <form className="trade-panel" onSubmit={e=>e.preventDefault()}>
        <h2>Market evidence</h2>
        <label>Symbol<input value={input.symbol} onChange={e=>set('symbol',e.target.value.toUpperCase())}/></label>
        <div className="two"><label>Current price<input type="number" step="0.01" value={input.price||''} onChange={e=>set('price',Number(e.target.value))}/></label><label>Minutes below range<input type="number" value={input.minutesBelowRange} onChange={e=>set('minutesBelowRange',Number(e.target.value))}/></label></div>
        <div className="two"><label>Opening-range low<input type="number" step="0.01" value={input.openingRangeLow||''} onChange={e=>set('openingRangeLow',Number(e.target.value))}/></label><label>Opening-range high<input type="number" step="0.01" value={input.openingRangeHigh||''} onChange={e=>set('openingRangeHigh',Number(e.target.value))}/></label></div>
        <label>VWAP structure<select value={input.trend} onChange={e=>set('trend',e.target.value as PutInputs['trend'])}><option value="below-vwap">Below VWAP</option><option value="at-vwap">At VWAP</option><option value="above-vwap">Above VWAP</option></select></label>
        <label>Breakdown retest<select value={input.retest} onChange={e=>set('retest',e.target.value as PutInputs['retest'])}><option value="failed">Failed retest / rejection</option><option value="holding">Retest holding support</option><option value="not-tested">Not tested yet</option></select></label>
        <label>Volume<select value={input.volumeStrength} onChange={e=>set('volumeStrength',e.target.value as PutInputs['volumeStrength'])}><option value="low">Low</option><option value="normal">Normal</option><option value="high">High</option><option value="capitulation">Capitulation</option></select></label>
        <label>Fear score: {input.fearScore}<input type="range" min="0" max="100" value={input.fearScore} onChange={e=>set('fearScore',Number(e.target.value))}/></label>
      </form>
      <section className={`trade-panel result ${result.verdict.replace(' ','-').toLowerCase()}`}>
        <div className="verdict"><span>{result.verdict}</span><b>{result.confidence}% confidence</b></div>
        <h2>Why JARVIS thinks this</h2>
        {result.reasons.length?<ul>{result.reasons.map(reason=><li key={reason}>{reason}</li>)}</ul>:<p>No bearish confirmation is present yet.</p>}
        <h2>Risks and warnings</h2><ul>{result.risks.map(risk=><li key={risk}>{risk}</li>)}</ul>
        <div className="invalidate"><b>INVALIDATION</b><p>{result.invalidation}</p></div>
        <button onClick={()=>alert('Proposal prepared only. Exact contract, quantity, stop, target and entry still require your approval.')}>Prepare put proposal for approval</button>
        <small className="guard">Reasoning support only—not a guarantee or personalized financial advice. No broker action occurs from this screen.</small>
      </section>
    </section>
    <style jsx global>{`
      *{box-sizing:border-box}body{margin:0;background:#02060c;color:#eaffff;font-family:Inter,system-ui,sans-serif}.trade-shell{min-height:100vh;padding:24px clamp(16px,4vw,58px) 70px;background:radial-gradient(circle at 70% 8%,rgba(159,71,255,.16),transparent 30%),linear-gradient(rgba(50,220,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(50,220,255,.025) 1px,transparent 1px);background-size:auto,34px 34px,34px 34px}.trade-shell header{display:flex;justify-content:space-between;align-items:center}.trade-shell header a{color:#77efff;text-decoration:none}.trade-shell header div{text-align:right}.trade-shell header span,.trade-shell header b{display:block;font-size:.65rem;letter-spacing:.13em}.trade-shell header b{color:#62f59a;margin-top:5px}.trade-hero{max-width:900px;margin:9vh 0 45px}.trade-hero>p{color:#b781ff;letter-spacing:.17em;font-size:.7rem}.trade-hero h1{font-size:clamp(2.7rem,7vw,6rem);line-height:.95;margin:10px 0 22px}.trade-hero small{display:block;max-width:760px;color:#91a9b6;font-size:1rem;line-height:1.7}.trade-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:18px}.trade-panel{border:1px solid rgba(93,229,255,.2);border-radius:18px;background:linear-gradient(145deg,rgba(6,20,32,.94),rgba(3,9,17,.91));padding:22px;box-shadow:0 22px 70px rgba(0,0,0,.25)}.trade-panel h2{font-size:.75rem;color:#59e9ff;letter-spacing:.1em;margin:0 0 18px}.trade-panel label{display:grid;gap:7px;color:#9cb4bf;font-size:.72rem;margin:13px 0}.trade-panel input,.trade-panel select{width:100%;padding:12px;border:1px solid rgba(98,224,255,.18);border-radius:10px;background:#06111b;color:white}.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.verdict{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(85,230,255,.12);padding-bottom:16px;margin-bottom:23px}.verdict span{font-size:1.4rem;font-weight:900;color:#ffd567}.put-setup .verdict span{color:#ff7185}.watch .verdict span{color:#ffd567}.no-trade .verdict span{color:#62f59a}.verdict b{color:#8deeff}.result ul{padding-left:20px;color:#b1c4cd;line-height:1.65;font-size:.83rem}.result li{margin:9px 0}.invalidate{margin:22px 0;padding:15px;border-left:2px solid #ff6d82;background:rgba(255,74,101,.06)}.invalidate b{font-size:.65rem;color:#ff8292;letter-spacing:.13em}.invalidate p{color:#c5d3d8;line-height:1.55}.result button{width:100%;padding:14px;border:1px solid #ad72ff;border-radius:11px;background:linear-gradient(135deg,#9e5cff,#46eaff);font-weight:900;cursor:pointer}.guard{display:block;color:#6f8792;line-height:1.5;margin-top:13px}@media(max-width:800px){.trade-grid{grid-template-columns:1fr}.trade-hero{margin-top:7vh}.two{grid-template-columns:1fr}}
    `}</style>
  </main>;
}
