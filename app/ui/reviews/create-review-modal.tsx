"use client";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { SetStateAction, Dispatch } from "react";
import { useParams } from "next/navigation";
import { BeerName, BeerReview, BeerScore } from "./reviewForm/review-form";

/*
 Cancel/Post review button elements for the dialog box popup that the user uses to create a review
*/

function FormSubmitButtons({ setOpen }: { setOpen: Function }) {
	return (
		<div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
			<button
				type="button"
				onClick={() => setOpen(false)}
				className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-700 sm:ml-3 sm:w-auto"
			>
				Cancel
			</button>
			<button
				type="submit"
				data-autofocus
				onClick={() => setOpen(false)}
				className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-bold hover:bg-blue-700 sm:mt-0 sm:w-auto text-white"
			>
				Post
			</button>
		</div>
	);
}

/*
 The dialog box (modal) that pops up when a user wants to leave a review. Uses
 elements from the review-form.tsx file as its content just to break up the file
*/
export default function CreateReviewModal({
	setOpen,
	beerName = undefined,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
	beerName?: string | undefined;
}) {
	function handleSubmit(e: any) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const beerName = String(formData.get("beerName"));
		console.log(beerName);
		console.log("Submited Review");
	}

	if (beerName === undefined) {
		const params = useParams<{ beerName: string }>();
		beerName = params.beerName?.replace(/%20/g, " ");
	}
	return (
		<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<DialogPanel
					transition
					className="relative transform overflow-hidden rounded-lg text-left shadow-xl outline -outline-offset-1 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 bg-white"
				>
					<div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<DialogTitle as="h3" className="text-base font-bold text-black">
									Create Reivew
								</DialogTitle>
								<div className="mt-2">
									<p className="text-sm text-gray-400"></p>
								</div>
							</div>
						</div>
					</div>
					<form method="post" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-4 jus">
							<BeerName beerName={beerName}></BeerName>
							<BeerScore></BeerScore>
							<BeerReview></BeerReview>
							<FormSubmitButtons setOpen={setOpen}></FormSubmitButtons>
						</div>
					</form>
				</DialogPanel>
			</div>
		</div>
	);
}
