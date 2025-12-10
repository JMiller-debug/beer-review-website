import FuzzySearch from "@/app/ui/fuzzy-search";
import { fetchBeers } from "@/app/api/external/beerAPI";
import { beerParameters } from "../lib/url-builder";
import CreateBeer from "../ui/beers/create-beer-button";
/* 
Beers page that allows you to search for Beers using a fuzzy search
Currenly shows a list of all beers.
*/
export default async function Page(props: {
	searchParams?: Promise<beerParameters>;
}) {
	const beers = await fetchBeers(undefined);
	return (
		<div className="w-full flex flex-col lg:place-items-center">
			<h1 className="text-2xl">Beers</h1>
			<div className="mt-4 flex justify-between md:mt-8">
				<FuzzySearch beers={beers} />
			</div>
			<div className="place-self-center">
				<CreateBeer></CreateBeer>
			</div>
		</div>
	);
}
