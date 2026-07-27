import Link from 'next/link';
import { Suspense } from 'react';
import JarvisLayer from '@/components/JarvisLayer';

export default function Page(){
  return <>
    <Suspense><JarvisLayer name="Hobby" accent="#b883ff" description="A personal growth layer for trading research, fitness, technology projects, collecting, learning and creative goals." tools={["Trading Observer","Fear & Sentiment Model","Fitness Coach","Project Lab","Learning Paths","Collection Tracker"]} examples={["Explain whether the current SPY setup supports puts","Analyze SPY sentiment without placing a trade","Build this week’s training plan"]}/></Suspense>
    <Link href="/hobby/trading/" style={{position:'fixed',right:18,bottom:22,zIndex:50,padding:'13px 17px',border:'1px solid #b883ff',borderRadius:12,background:'#120d20',color:'#e5d5ff',textDecoration:'none',fontWeight:800,boxShadow:'0 0 24px rgba(184,131,255,.25)'}}>OPEN PUT REASONING →</Link>
  </>;
}
