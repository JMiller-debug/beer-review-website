import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export const APIEndpoint = "http://localhost:8000";

export const beersEndpoint = APIEndpoint + "/beers";
export const breweriesEndpoint = APIEndpoint + "/breweries";
export const reviewsEndpoint = APIEndpoint + "/reviews";
export const imageEndpoint = APIEndpoint + "/images";
export const fallBackBeer = "/static/beer-not-found.png";
/* 
Generic type definitions
*/
export type Reviews = {
	username: string;
	score: number;
	comment: string;
	beer_name: string;
	id: string;
	last_updated: Timestamp;
	date_created: Timestamp;
	beer_id: string;
};
export type Beers = {
	id: string;
	name: string;
	company: string;
	score: number;
	last_updated: Timestamp;
	stringLastUpdated?: string;
	date_created: Timestamp;
	reviews: [Reviews];
};

export const formatter = new Intl.DateTimeFormat("en-AU", {
	year: "numeric",
	month: "short",
	day: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	timeZone: "UTC",
});
