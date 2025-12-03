import { BeerCard } from "../../ui/beerElements/beer-card";
import { beerParameters, fetchBeer } from "../../api/external/beerAPI";
/*
Beer [beerName] page. This page is generated when you click on a beer and is to
show you specific information about a beer. Including score and reviews.
Additionaly is the place that allows you to post reviews on beers.
*/
export default async function Page({
	params,
}: {
	params: Promise<{ beerName: string }>;
}) {
	const { beerName } = await params;
	const stringBeerName = beerName.replace(/%20/g, " ");
	const query: beerParameters = {
		beer_name: stringBeerName.replace(/%20/g, " "),
	};
	const beer = await fetchBeer(query);
	return (
		<div>
			<h1 className={`mb-4 text-xl md:text-2xl`}>{stringBeerName}</h1>
			<div className="w-full">
				<BeerCard beer={beer} reviews={true}></BeerCard>
			</div>
		</div>
	);
}
