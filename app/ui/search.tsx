"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

/*
Old search component from the nextjs tutorial mostly. Replaced by fuzzy search
for now
*/

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	function handleSubmit(e: any) {
		e.preventDefault();
		const params = new URLSearchParams(searchParams);
		console.log(params);
		const form = e.target;
		const formData = new FormData(form);
		if (
			formData !== null &&
			formData !== undefined &&
			params.get("beer_name") !== "" &&
			params.get("beer_name") !== undefined
		) {
			const beerName = String(formData.get("beerName"));
			if (beerName !== null) {
				params.set("beer_name", beerName);
			}
			replace(`${pathname}?${params.toString()}`);
		} else {
			console.log("Else Path");
			params.delete("beer_name");
			replace(`${pathname}`);
		}
		// console.log(formData.get("beerName"));
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			<div className="relative flex flex-1 shrink-0 mb-2 justify-start">
				<label htmlFor="search" className="sr-only">
					Search
				</label>
				<input
					name="beerName"
					className=" block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
					placeholder={placeholder}
					defaultValue={searchParams.get("beer_name")?.toString()}
				/>
				<MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
			</div>
			<div className="relative flex flex-1 shrink-0">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
				>
					Search
				</button>
			</div>
		</form>
	);
}
