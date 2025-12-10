"use server";

import { Beers, beersEndpoint } from "@/app/lib/definitions";
import { URLBuilder, beerParameters } from "@/app/lib/url-builder";
import { formatter } from "@/app/lib/definitions";
import { imageEndpoint } from "@/app/lib/definitions";

import { NextRequest, NextResponse } from "next/server";
/* Beer API
 */

export type beerPostBody = {
	name: string;
	company: string;
};

// Fetch a list of beers from the dataserver
export async function fetchBeers(queries: beerParameters | undefined) {
	const beerAPI = new URLBuilder<"beers">(beersEndpoint);
	if (queries !== undefined) {
		const queryKeys = Object.keys(queries) as Array<keyof beerParameters>;
		queryKeys.forEach((key) => {
			beerAPI.addQueryParam(key, queries[key]);
		});
	}

	const data = await beerAPI.get().then((response) => response.json());
	data.forEach((element: Beers, idx: number) => {
		data[idx].stringLastUpdated = formatter.format(
			new Date(element.last_updated)
		);
	});

	return data;
}

// Fetch a singular beer from the dataserver by passing in its name as a query paramter
export async function fetchBeer(params: beerParameters) {
	const beerAPI = new URLBuilder<"beers">(beersEndpoint);
	if (params.name !== undefined) {
		beerAPI.addQueryParam("name", params.name);
		const data = await beerAPI.get().then((response) => response.json());
		data[0].stringLastUpdated = formatter.format(
			new Date(data[0].last_updated)
		);
		return data[0];
	}
}

// Fetch a list of beer names from the dataserver
export async function listBeers() {
	const beerAPI = new URLBuilder<"beers">(beersEndpoint);
	beerAPI.addResource("list-beers");
	const data = await beerAPI.get().then((response) => response.json());
	return data;
}

export async function postBeer(body: beerPostBody) {
	const beerAPI = new URLBuilder<"beers">(beersEndpoint);
	const data = await beerAPI.post(body).then((response) => response.json());
	return data;
}

export async function postImage(beerName: String, imageData: FormData) {
	const url = encodeURI(`${imageEndpoint}/?beer_name=${beerName}`);
	console.log(url);
	// const formData = new FormData();
	// formData.append("file", imageData.get("beerImage"));
	const req = {
		method: "POST",
		// Forward headers if needed
		body: imageData,
	};
	console.log(req);
	const res = await fetch(url, req);
	console.log(res);
	// if (!res.ok) {
	// 	return NextResponse.json(
	// 		{ error: "The request for this image failed" },
	// 		{ status: res.status }
	// 	);
	// }
	// return new NextResponse(null, {
	// 	status: 200,
	// 	headers: {
	// 		"Content-Type":
	// 			res.headers.get("Content-Type") || "application/octet-stream",
	// 	},
	// });
}
