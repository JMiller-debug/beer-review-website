"use-client";
import { Reviews } from "@/app/lib/definitions";
import CreateReview from "./create-review-button";

/*
Review card much like the beers cards in that it hold multiple reviews for the
user to read
*/
export function ReviewCard({
	reviews,
	beerName = undefined,
}: {
	reviews: [Reviews] | undefined;
	beerName?: string | undefined;
}) {
	if (reviews !== undefined) {
		return (
			<div className="border-t-2 border-gray-400">
				<div className="text-2xl font-bold my-2">Reviews</div>
				<div className="flex flex-col md:max-w-full">
					{reviews.map((review, i) => (
						<div
							className="bg-white border-4 rounded-xl border-sky-600 p-1 mb-1"
							key={i}
						>
							<div className="flex flex-row">
								<div className="flex-2/3">{review.comment}</div>
								<div className="w-14 flex-none relative justify-content-end">
									<div className="absolute right-0 top-0">
										{review.score}/10
									</div>
								</div>
							</div>
							<div className="text-gray-400 pl-2">- {review.username}</div>
						</div>
					))}
				</div>
				<div className="place-self-end">
					<CreateReview beerName={beerName} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="border-t-2 border-gray-400">
				<div className="text-2xl font-bold">Reviews</div>
				<div className="flex flex-col min-w-lg max-w-prose">
					No Reviews Yet, Be the first
				</div>
				<div className="place-self-end">
					<CreateReview beerName={beerName} />
				</div>
			</div>
		);
	}
}
