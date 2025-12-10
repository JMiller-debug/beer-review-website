import clsx from "clsx";
import { CloudUpload } from "lucide-react";
/* 
Beer name element that allows the user to select which beer to leave a review for.
Currently disabled as it just shows what beer they are creating the review for.
 */
export function BeerName() {
	return (
		<div className="flex flex-row place-items-center">
			<p className="flex-1/6 pl-2 pr-2 align-middle">Beer</p>
			<label htmlFor="beer_name" className="sr-only">
				Beer
			</label>
			<input
				name="beer_name"
				autoComplete="off"
				className={clsx(
					"flex-5/6 w-full mr-10 block rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-400 bg-blue-100 hover:bg-blue-200"
				)}
				placeholder="New Beer Name"
			/>
		</div>
	);
}

export function CompanyName() {
	return (
		<div className="flex flex-row place-items-center">
			<p className="flex-1/6 pl-2 pr-2 align-middle">Brewery</p>
			<label htmlFor="company" className="sr-only">
				Brewery
			</label>
			<input
				autoComplete="off"
				name="company"
				className={clsx(
					"flex-5/6 w-full mr-10 block rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-400 bg-blue-100 hover:bg-blue-200"
				)}
				placeholder="Exisiting Company Name"
			/>
		</div>
	);
}

export function ImageUpload() {
	return (
		<div className="flex flex-row place-items-center">
			<p className="flex-1/6 pl-2 pr-2 align-middle">Upload File</p>
			<label
				htmlFor="file"
				id="drop-zone"
				className="rounded-md border border-gray-200 py-[9px] flex-5/6 mr-10 flex flex-col items-center justify-center text-body outline-2 bg-blue-100 hover:bg-blue-200 cursor-pointer dragover:"
			>
				<CloudUpload size={32} strokeWidth={2} />
				<p className="mb-2 text-sm">
					<span className="font-semibold">Click to upload</span> or drag and
					drop
				</p>
				<p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
				<input
					className="hidden"
					aria-describedby="fileHelp"
					id="file"
					type="file"
					name="file"
				/>
				<p
					className="mt-1 text-sm text-gray-500 dark:text-gray-300"
					id="fileHelp"
				>
					SVG, PNG, JPG or GIF (MAX. 800x400px).
				</p>
			</label>
		</div>
	);
}
