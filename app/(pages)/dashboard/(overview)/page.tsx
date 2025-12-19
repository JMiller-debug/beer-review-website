import LatestBeers from "../latest-beers";
import { Suspense } from "react";
import { LatestBeersSkeleton } from "@/app/ui/skeletons";

/* 
Dashboard page that shows the latest beers and is an attempt at the suspense
element so the page feels more responsive when you wait for data. Needs more
work
*/
export default async function Page() {
	return (
		<main className="lg:justify-items-center">
			<h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
			<Suspense fallback={<LatestBeersSkeleton />}>
				<LatestBeers />
			</Suspense>
		</main>
	);
}
