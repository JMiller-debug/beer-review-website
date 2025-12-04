import { Beers } from "@/app/lib/definitions";
import { beerParameters } from "@/app/api/external/beerAPI";
import { fetchBeers } from "@/app/api/external/beerAPI";
import { BeerCard } from "@/app/ui/beerElements/beer-card";

/* 
Wrapper for the Beer card object that displays a list of them.
*/
export function BeerCards({ beers }: { beers: Beers[] }) {
	return (
		// Pagination
		<div className="">
			<div className="max-w-full">
				{beers.map((beer, i) => {
					return (
						<div key={i}>
							<BeerCard beer={beer} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

/* 
Wrapper for the beercards element that performs a query first.
*/

export default async function BeerCardsQuery({
	query,
}: {
	query: beerParameters | undefined;
}) {
	const beers: Beers[] = await fetchBeers(query);
	return (
		<div>
			<BeerCards beers={beers}></BeerCards>
		</div>
	);
}
