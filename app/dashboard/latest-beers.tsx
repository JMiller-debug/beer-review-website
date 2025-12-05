import { beerParameters } from "../lib/url-builder";
import BeerCardsQuery from "../ui/beerElements/beer-cards";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

/* 
Element that shows the latest by update time 5 beers
*/

export default function LatestBeers() {
	const query: beerParameters = {
		limit: 5,
		orderby: "last_updated",
		order: "desc",
	};

	return (
		<div className="flex grow flex-col justify-between rounded-xl bg-sky-200 px-4 lg:w-1/2 lg:min-w-2xl md:w-full">
			<h2 className="mb-2 text-xl md:text-2xl pl-3 pt-3">Latest Beers</h2>
			<BeerCardsQuery query={query}></BeerCardsQuery>
			<div className="flex items-center pb-2 pt-6 pl-3">
				<ArrowPathIcon className="h-5 w-5 text-gray-500" />
				<h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
			</div>
		</div>
	);
}
