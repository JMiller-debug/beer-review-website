"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Fuse from "fuse.js";
import { Beers } from "../lib/definitions";
import { BeerCards } from "./beerElements/beer-cards";
import { useDebouncedCallback } from "use-debounce";
import { Pagination } from "@heroui/react";
/*
Fuzzy search element to query beers list at the moment. Uses fuse.js as the
library to perform the fuzzy search

Also implements client side pagination of the results. This could be slow if the
number of beers that we have get large

Currently, the fuzzy search sets the search data and the pagination sets the
current page. If you start fuzzy searching, you go back to the first page. If
you paginate, you set the currentPage and then update the data to support moving
through your current search data
*/
const PAGE_LENGTH = 5;

export default function FuzzySearch({ beers }: { beers: Beers[] }) {
	const [totalPages, setTotalPages] = useState(
		Math.ceil(beers.length / PAGE_LENGTH)
	);
	const [searchData, setSearchData] = useState(beers);
	const [currentPage, setPage] = useState(1);
	const [displayData, setDisplayData] = useState(
		searchData.slice(0, PAGE_LENGTH)
	);

	// Set up the fuzzy search and save the results to searchData
	const searchItem = useDebouncedCallback((query) => {
		setPage(1);
		if (!query) {
			setSearchData(beers);
		} else {
			const options = {
				threshold: 0.4,
				keys: ["name", "company"],
			};
			const fuse = new Fuse(beers, options);
			const result = fuse.search(query);
			const finalResult: Beers[] = [];
			if (result.length) {
				result.forEach((match) => {
					finalResult.push(match.item);
				});
				setSearchData(finalResult);
			} else {
				setSearchData([]);
			}
		}
		updateDisplayData();
	}, 250);

	// Set the current page and then update display data
	function handlePagination(page: number): void {
		setPage(page);
		updateDisplayData();
	}

	// update the total number of pages and then update display data
	// I believe there is a race condition between searching and updating total pages
	const updateDisplayData = useDebouncedCallback(() => {
		const startIndex = (currentPage - 1) * PAGE_LENGTH;
		const endIndex = startIndex + 5;
		setTotalPages(Math.ceil(searchData.length / PAGE_LENGTH));
		setDisplayData(searchData.slice(startIndex, endIndex));
	}, 25);
	return (
		<div className="flex flex-1 shrink-0 mb-2 justify-start flex-col lg">
			<div className="relative lg:max-w-1/2 lg:min-w-2xl">
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
			<div className="lg:max-w-1/2 lg:min-w-2xl">
				<BeerCards beers={displayData}></BeerCards>
				<Pagination
					className="place-self-center"
					initialPage={1}
					total={totalPages}
					page={currentPage}
					onChange={(page) => handlePagination(page)}
				/>
			</div>
		</div>
	);
}
