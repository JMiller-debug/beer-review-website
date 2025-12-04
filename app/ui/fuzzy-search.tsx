"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Fuse from "fuse.js";
import { Beers } from "../lib/definitions";
import { BeerCards } from "./beerElements/beer-cards";
import { useDebouncedCallback } from "use-debounce";

/*
Fuzzy search element to query beers list at the moment. Uses fuse.js as the
library to perform the fuzzy search
*/

export default function FuzzySearch({ beers }: { beers: Beers[] }) {
	const [searchData, setSearchData] = useState(beers);
	const searchItem = useDebouncedCallback((query) => {
		if (!query) {
			setSearchData(beers);
			return;
		}
		const options = {
			threshold: 0.4,
			keys: ["name", "company"],
		};
		const fuse = new Fuse(beers, options);
		const result = fuse.search(query);
		const finalResult: Beers[] = [];
		if (result.length) {
			result.forEach((item) => {
				if (item.item !== undefined) {
					finalResult.push(item.item);
				}
			});
			setSearchData(finalResult);
		} else {
			setSearchData([]);
		}
	}, 250);

	return (
		<div className="relative flex flex-1 shrink-0 mb-2 justify-start flex-col lg">
			<div className="lg:w-1/2">
				<label htmlFor="search" className="sr-only">
					Search
				</label>
				<MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
				<input
					className=" block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
					placeholder="Search"
					onChange={(e) => {
						searchItem(e.target.value);
					}}
				/>
			</div>
			<div className="lg:w-1/2">
				<BeerCards beers={searchData}></BeerCards>
			</div>
		</div>
	);
}
