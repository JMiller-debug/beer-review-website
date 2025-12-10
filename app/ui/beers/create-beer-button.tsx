"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop } from "@headlessui/react";
// import CreateReviewModal from "./create-review-modal";
import { useParams } from "next/navigation";
import { Button } from "@headlessui/react";
import Modal from "../modal";
import BeerFormContent from "./beer-form-content";
/*
The button that opens up the dialog window to create a review
 */

export default function CreateBeer({
	beerName = undefined,
}: {
	beerName?: string | undefined;
}) {
	const [open, setOpen] = useState(false);
	if (beerName === undefined) {
		const params = useParams<{ beerName: string }>();
		beerName = params.beerName?.replace(/%20/g, " ");
	}
	return (
		<div>
			<Button
				onClick={(e) => {
					setOpen(true);
					e.preventDefault();
				}}
				className="rounded-md bg-blue-500 hover:bg-blue-700 px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white cursor-pointer pointer-events-auto enabled"
			>
				Add Beer
			</Button>
			<Dialog open={open} onClose={setOpen} className="relative z-10">
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
				/>
				<Modal
					dialogTitle="Add Beer"
					FormContent={<BeerFormContent setOpen={setOpen} />}
				></Modal>
			</Dialog>
		</div>
	);
}
