import { Suspense } from 'react';
import JarvisLayer from '@/components/JarvisLayer';
export default function Page(){return <Suspense><JarvisLayer name="Home" accent="#56e27a" description="A personalized household layer for recipes, grocery deals, coupons, bills, schedules, routines, maintenance and family planning." tools={["Recipe Search","Meal Planner","Coupon Finder","Shopping Optimizer","Family Calendar","Home Guardian"]} examples={["Find three dinners under $50","Compare grocery prices and coupons","What does our household need this week?"]}/></Suspense>}
