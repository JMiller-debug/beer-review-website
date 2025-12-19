import { DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";
import { Button } from "@headlessui/react";

// Modal that takes the content you want to submit
// Allows a more generic pop-up
export default function Modal({
	dialogTitle,
	FormContent,
}: {
	dialogTitle: String;
	FormContent: ReactNode;
}) {
	return (
		<div className="fixed inset-0 z-10 overflow-y-auto">
			<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<DialogPanel
					transition
					className="relative transform overflow-hidden rounded-lg text-left shadow-xl outline -outline-offset-1 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg min-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95 bg-white"
				>
					<div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
						<div className="">
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<DialogTitle
									as="h3"
									className="text-base font-bold text-black place-self-center"
								>
									{dialogTitle}
								</DialogTitle>
								<div className="mt-2">
									<p className="text-sm text-gray-400"></p>
								</div>
							</div>
						</div>
					</div>
					<>{FormContent}</>
				</DialogPanel>
			</div>
		</div>
	);
}

export function FormSubmitButtons({ setOpen }: { setOpen: Function }) {
	return (
		<div className="py-3 sm:flex sm:flex-row-reverse">
			<Button
				type="button"
				onClick={() => setOpen(false)}
				className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-700 sm:ml-3 sm:w-auto"
			>
				Cancel
			</Button>
			<Button
				type="submit"
				data-autofocus
				onClick={() => setOpen(false)}
				className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-bold hover:bg-blue-700 sm:mt-0 sm:w-auto text-white"
			>
				Post
			</Button>
		</div>
	);
}
