"use server";
import { reviewsEndpoint } from "@/app/lib/definitions";
import { URLBuilder, reviewParameters } from "@/app/lib/url-builder";

/* Review API

The point of this is to try and extend the implementation of the URL builder
class.

While I got it working, I am not happy with the typing errors that pop up. 

The idea was to build a type safe version of the url builder class that allows
me to query my api easily and cut down on repeated code when I implement the
brewery and review endpoints.

*/

export type reviewPostBody = {
	username: string;
	score: number;
	comment: string;
	beer_name: string;
};
// Fetch a list of reviews from the dataserver
export async function fetchReviews(queries: reviewParameters | undefined) {
	const reviewAPI = new URLBuilder<"reviews">(reviewsEndpoint);
	if (queries !== undefined) {
		const queryKeys = Object.keys(queries) as Array<keyof reviewParameters>;
		queryKeys.forEach((key) => {
			reviewAPI.addQueryParam(key, queries[key]);
		});
	}

	const data = await reviewAPI.get().then((response) => response.json());
	return data;
}

// Fetch a singular review from the dataserver by passing in its name as a query paramter
export async function fetchReview(params: reviewParameters) {
	const reviewAPI = new URLBuilder<"reviews">(reviewsEndpoint);
	if (params.name !== undefined) {
		reviewAPI.addQueryParam("identifier", params.identifier);
		const data = await reviewAPI.get().then((response) => response.json());
		return data[0];
	}
}

export async function postReview(body: reviewPostBody) {
	const reviewAPI = new URLBuilder<"reviews">(reviewsEndpoint);
	const data = await reviewAPI.post(body).then((response) => response.json());
	return data;
}
