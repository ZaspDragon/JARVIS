import { Suspense } from 'react';
import JarvisLayer from '@/components/JarvisLayer';
export default function Page(){return <Suspense><JarvisLayer name="Hobby" accent="#b883ff" description="A personal growth layer for trading research, fitness, technology projects, collecting, learning and creative goals." tools={["Trading Observer","Fear & Sentiment Model","Fitness Coach","Project Lab","Learning Paths","Collection Tracker"]} examples={["Analyze SPY sentiment without placing a trade","Build this week’s training plan","Help me plan my next technology project"]}/></Suspense>}
