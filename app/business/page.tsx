import { Suspense } from 'react';
import JarvisLayer from '@/components/JarvisLayer';
export default function Page(){return <Suspense><JarvisLayer name="Business" accent="#4da3ff" description="A private strategy room for projects, customers, revenue, expenses, proposals, operating plans and business opportunities." tools={["Opportunity Scanner","ROI Calculator","Project Command","Proposal Builder","Customer Intelligence","Risk Watcher"]} examples={["Compare my best business ideas","Prepare a proposal for this customer","What should I focus on to grow revenue?"]}/></Suspense>}
