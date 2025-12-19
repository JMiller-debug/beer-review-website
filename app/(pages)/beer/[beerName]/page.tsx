import { BeerCard } from "../../../ui/beerElements/beer-card";
import { fetchBeer } from "../../../api/external/beerAPI";
import { beerParameters } from "@/app/lib/url-builder";
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
	let beer = undefined;
	let stringBeerName = "";
	if (beerName !== undefined) {
		stringBeerName = decodeURI(beerName);
		const query: beerParameters = {
			name: stringBeerName,
		};
		beer = await fetchBeer(query);
	}
	return (
		<div className="lg:justify-items-center">
			<h1 className={`mb-4 text-xl md:text-2xl`}>{stringBeerName}</h1>
			<div className="md:w-full lg:w-1/2 lg:min-w-2xl">
				<BeerCard beer={beer} reviews={true}></BeerCard>
			</div>
		</div>
	);
}
