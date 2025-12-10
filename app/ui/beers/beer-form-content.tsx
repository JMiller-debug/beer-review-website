"use client";
import { SetStateAction, Dispatch } from "react";
import { BeerName, CompanyName } from "./beerForm/beer-form";
import { ImageUpload } from "./beerForm/file-pond-upload";
import { useRouter } from "next/navigation";
import { FormSubmitButtons } from "../modal";
import { beerPostBody, postBeer, postImage } from "@/app/api/external/beerAPI";
import { useState } from "react";
/*
 The content to pass to the modal for creating a review
*/
export default function BeerFormContent({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const [files, setFiles] = useState<File[]>([]);
	console.log(files);
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
		const data = new FormData();
		if (files !== null) {
			data.set("file", files[0]);
			await postBeer(body);
			await postImage(beerName, data);
		}
		router.refresh();
	}
	return (
		<form method="post" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-4 jus">
				<BeerName></BeerName>
				<CompanyName></CompanyName>
				<ImageUpload files={files} setFiles={setFiles}></ImageUpload>
				<FormSubmitButtons setOpen={setOpen}></FormSubmitButtons>
			</div>
		</form>
	);
}
