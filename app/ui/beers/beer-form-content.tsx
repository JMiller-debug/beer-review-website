import { SetStateAction, Dispatch } from "react";
import { BeerName, CompanyName, ImageUpload } from "./beerForm/beer-form";
import { useRouter } from "next/navigation";
import { FormSubmitButtons } from "../modal";
import { beerPostBody, postBeer, postImage } from "@/app/api/external/beerAPI";
/*
 Cancel/Post review button elements for the dialog box popup that the user uses to create a review
*/
export default function BeerFormContent({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const router = useRouter();
	async function handleSubmit(e: any) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		const body: beerPostBody = {
			name: String(formData.get("beer_name")),
			company: String(formData.get("company")),
		};
		const beerName = String(formData.get("beer_name"));
		// const image = formData.get("beerImage");
		await postBeer(body);
		await postImage(beerName, formData);
		router.refresh();
	}
	return (
		<form method="post" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-4 jus">
				<BeerName></BeerName>
				<CompanyName></CompanyName>
				<ImageUpload></ImageUpload>
				<FormSubmitButtons setOpen={setOpen}></FormSubmitButtons>
			</div>
		</form>
	);
}
