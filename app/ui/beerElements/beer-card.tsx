"use client";
import { Beers } from "@/app/lib/definitions";
import { ReviewCard } from "../reviews/reviews";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { fallBackBeer } from "@/app/lib/definitions";
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
	let width = reviews ? 200 : 125;

	function reveiewCardEval() {
		if (reviews) {
			if (beer !== undefined && beer.reviews.length > 0) {
				return <ReviewCard reviews={beer.reviews}></ReviewCard>;
			} else {
				return <ReviewCard reviews={undefined}></ReviewCard>;
			}
		}
	}
	const imageLoader = ({ src }: { src: string }) => {
		return `${src}?w=${width}?h=${width}`;
	};

	if (beer !== undefined) {
		const link = {
			name: "beer",
			href: "/beer/" + beer.name,
		};
		const imageUrl = `/api/images/${beer.name.replace(/ /g, "-") + ".webp"}`;
		return (
			<div
				className={clsx(
					`relative overflow-hidden rounded-xl bg-sky-600/50 m-2  border-4 border-cyan-300/75 shadow-sm max-w-full`,
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
					<div className={`bg-white px-6 h-[${width}px]`}>
						<div
							key={beer.id}
							className="flex flex-row items-center justify-between"
						>
							<div className="flex-col">
								<div className="min-w-0">
									<p className="truncate text-sm font-semibold md:text-base">
										{beer.name}
									</p>
									<p className="hidden text-sm text-gray-500 sm:block">
										{beer.company}
									</p>
									<p className="hidden text-sm text-gray-500 sm:block">
										Last Updated {beer.stringLastUpdated}
									</p>
								</div>
							</div>
							<p className="text-sm font-medium md:text-base">
								{beer.score}/10
							</p>
							<div className="flex-none relative h-full">
								<Image
									loader={imageLoader}
									src={imageUrl ? imageUrl : fallBackBeer}
									alt="Picture of the beer"
									width={width}
									height={width}
									onError={(event) => {
										(event.currentTarget as HTMLImageElement).srcset =
											fallBackBeer;
									}}
									className={`aspect-square object-scale-down`}
								></Image>
							</div>
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
