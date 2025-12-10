import { SetStateAction, Dispatch } from "react";
import {
	BeerName,
	BeerReview,
	BeerScore,
	UserName,
} from "./reviewForm/review-form";
import { useRouter } from "next/navigation";
import { reviewPostBody, postReview } from "@/app/api/external/reviewAPI";
import { FormSubmitButtons } from "../modal";
/*
 The content to pass to the modal for creating a review
*/
export default function ReviewFormContent({
	setOpen,
	beerName = undefined,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
	beerName?: string | undefined;
}) {
	const router = useRouter();
	async function handleSubmit(e: any) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		const body: reviewPostBody = {
			beer_name: String(formData.get("beer_name")),
			username: String(formData.get("username")),
			score: Number(formData.get("score")),
			comment: String(formData.get("comment")),
		};
		await postReview(body);
		router.refresh();
	}
	return (
		<form method="post" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-4 jus">
				<UserName userName={"Ameretto Miller"}></UserName>
				<BeerName beerName={beerName}></BeerName>
				<BeerScore></BeerScore>
				<BeerReview></BeerReview>
				<FormSubmitButtons setOpen={setOpen}></FormSubmitButtons>
			</div>
		</form>
	);
}
