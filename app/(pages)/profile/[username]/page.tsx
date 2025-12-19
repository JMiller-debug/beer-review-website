import { BeerCard } from "../../../ui/beerElements/beer-card";
import { fetchBeer } from "../../../api/external/beerAPI";
import { beerParameters } from "@/app/lib/url-builder";
/*
profile [username] page. This page is generated when you click on a profile and is to
show you specific information about a profile. Including score and reviews.
Additionaly is the place that allows you to post reviews on beers.
*/
export default async function Page({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;
	return <div>{decodeURI(username)}</div>;
}
