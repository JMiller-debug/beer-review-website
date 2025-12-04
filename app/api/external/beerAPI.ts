"use server";

import { beersEndpoint } from "@/app/lib/definitions";
import { URLBuilder, API, SegmentTypes } from "@/app/lib/url-builder";

/* Beer API

The point of this is to try and extend the implementation of the URL builder
class.

While I got it working, I am not happy with the typing errors that pop up. 

The idea was to build a type safe version of the url builder class that allows
me to query my api easily and cut down on repeated code when I implement the
brewery and review endpoints.

*/
type beerAPI = "base" | "list-beers";

export type beerParameters = {
	offset?: number;
	limit?: number;
	orderby?: string;
	order?: string;
	identifier?: string;
	name?: string;
};

interface beerAPIAttributes {
	base: beerParameters;
	"list-beers": null;
}
interface beerSegments {
	base: "";
	"list-beers": "list-beers";
}

class beerURLBuilder<
	APIType extends API & beerAPI,
	SegmentInterface extends SegmentTypes & beerSegments
> extends URLBuilder<APIType, SegmentInterface> {
	queryParameters: Partial<beerAPIAttributes[APIType]> = {};
}

// Fetch a list of beers from the dataserver
export async function fetchBeers(queries: beerParameters | undefined) {
	const beerAPI = new beerURLBuilder<"base", beerSegments>(beersEndpoint);
	if (queries !== undefined) {
		const queryKeys = Object.keys(queries) as Array<keyof beerParameters>;
		queryKeys.forEach((key) => {
			beerAPI.addQueryParam(key, queries[key]);
		});
	}

	const data = await beerAPI.get().then((response) => response.json());
	return data;
}

// Fetch a singular beer from the dataserver by passing in its name as a query paramter
export async function fetchBeer(params: beerParameters) {
	const beerAPI = new beerURLBuilder<"base", beerSegments>(beersEndpoint);
	if (params.name !== undefined) {
		beerAPI.addQueryParam("name", params.name);
		const data = await beerAPI.get().then((response) => response.json());
		return data[0];
	}
}

// Fetch a list of beer names from the dataserver
export async function listBeers() {
	const beerAPI = new beerURLBuilder<"list-beers", beerSegments>(beersEndpoint);
	beerAPI.addResource("list-beers");
	const data = await beerAPI.get().then((response) => response.json());
	return data;
}
