import { Beers } from "@/app/lib/definitions";
import { formatter } from "@/app/lib/definitions";
import { ReviewCard } from "../reviews/reviews";
import Link from "next/link";
import clsx from "clsx";

/*
 Beer Card Element renders a single beer. Can be told to show or hide the review
 card
*/
export function BeerCard({
	beer,
	reviews = false,
}: {
	beer: Beers | undefined;
	reviews?: boolean;
}) {
	function reveiewCardEval() {
		if (reviews) {
			if (beer !== undefined && beer.reviews.length > 0) {
				return <ReviewCard reviews={beer.reviews}></ReviewCard>;
			} else {
				return <ReviewCard reviews={undefined}></ReviewCard>;
			}
		}
	}

	if (beer !== undefined) {
		const link = {
			name: "beer",
			href: "/beer/" + beer.name,
		};
		return (
			<div
				className={clsx(
					"relative overflow-hidden rounded-xl bg-sky-600/50 m-2 border-4 border-cyan-300/75 shadow-sm max-w-full",
					{
						"hover:bg-cyan-300/75 hover:border-8": reviews === false,
					}
				)}
			>
				<Link
					key={link.name}
					href={link.href}
					className={clsx({ "disabled pointer-events-none": reviews })}
				>
					<div className="bg-white px-6">
						<div
							key={beer.id}
							className="flex flex-row items-center justify-between py-4"
						>
							<div className="flex items-center">
								<div className="min-w-0">
									<p className="truncate text-sm font-semibold md:text-base">
										{beer.name}
									</p>
									<p className="hidden text-sm text-gray-500 sm:block">
										{beer.company}
									</p>
									<p className="hidden text-sm text-gray-500 sm:block">
										Last Updated {formatter.format(new Date(beer.last_updated))}
									</p>
								</div>
							</div>
							<p className={`truncate text-sm font-medium md:text-base`}>
								{beer.score}/10
							</p>
						</div>
						{reveiewCardEval()}
						{/* {beer.reviews.length > 0 && reviews ? (
							<ReviewCard reviews={[beer.reviews[0]]}></ReviewCard>
						) : (
							<ReviewCard reviews={undefined}></ReviewCard>
						)} */}
					</div>
				</Link>
			</div>
		);
	} else {
		return <div></div>;
	}
}
