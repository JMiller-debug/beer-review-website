import FuzzySearch from "@/app/ui/fuzzy-search";
import { fetchBeers } from "@/app/api/external/beerAPI";
import { beerParameters } from "../lib/url-builder";
/* 
Beers page that allows you to search for Beers using a fuzzy search
Currenly shows a list of all beers.
*/
export default async function Page(props: {
	searchParams?: Promise<beerParameters>;
}) {
	const beers = await fetchBeers(undefined);
	return (
		<div className="w-full lg:justify-items-center">
			<h1 className="text-2xl">Beers</h1>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<FuzzySearch beers={beers} />
			</div>
			<div className="mt-5 flex w-full justify-center"></div>
		</div>
	);
}
