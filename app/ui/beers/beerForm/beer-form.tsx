import clsx from "clsx";
/* 
Beer Name input to name the beer you are creating
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

/* 
Brewery Name input to associate the beer to a brewery. Future change is to add a dropdown list of options to select from
 */
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
