"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop } from "@headlessui/react";
import CreateReviewModal from "./create-review-modal";

/*
The button that opens up the dialog window to create a review
 */

export default function CreateReview({
	beerName = undefined,
}: {
	beerName?: string | undefined;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<button
				onClick={(e) => {
					setOpen(true);
					e.preventDefault();
				}}
				className="rounded-md bg-blue-500 hover:bg-blue-700 px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white cursor-pointer pointer-events-auto enabled"
			>
				Create Review
			</button>
			<Dialog open={open} onClose={setOpen} className="relative z-10">
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
				/>
				<CreateReviewModal
					setOpen={setOpen}
					beerName={beerName}
				></CreateReviewModal>
			</Dialog>
		</div>
	);
}
