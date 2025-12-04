import clsx from "clsx";
import { useState } from "react";
import { Slider, Tooltip } from "@heroui/react";
import React from "react";

/* 
Beer name element that allows the user to select which beer to leave a review for.
Currently disabled as it just shows what beer they are creating the review for.
 */
export function BeerName({ beerName }: { beerName: string | undefined }) {
	return (
		<div className="flex flex-row place-items-center">
			<p className="flex-1/6 pl-2 pr-2 align-middle">Beer</p>
			<label htmlFor="beer_name" className="sr-only">
				Beer
			</label>
			<input
				name="beer_name"
				className={clsx(
					"flex-5/6 w-full mr-10 block rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500",
					{
						"disabled opacity-75 pointer-events-none bg-gray-400/20":
							beerName !== undefined,
					}
				)}
				placeholder="beer"
				defaultValue={beerName}
			/>
		</div>
	);
}

export function UserName({ userName }: { userName: string | undefined }) {
	return (
		<div className="flex flex-row place-items-center">
			<p className="flex-1/6 pl-2 pr-2 align-middle">User</p>
			<label htmlFor="username" className="sr-only">
				User
			</label>
			<input
				name="username"
				className={clsx(
					"flex-5/6 w-full mr-10 block rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500",
					{
						"disabled opacity-75 pointer-events-none bg-gray-400/20":
							userName !== undefined,
					}
				)}
				placeholder="username"
				defaultValue={userName}
			/>
		</div>
	);
}

/*
 A textarea element that allows the user to put in their reveiw comment
*/

export function BeerReview() {
	const [count, setCount] = useState(0);
	return (
		<div className="flex flex-row place-items-center">
			<p className="flex-1/6 pl-2 pr-2 align-middle">Review</p>
			<div className="flex-5/6 w-full mr-10 flex flex-col">
				<label htmlFor="comment" className="sr-only">
					Review
				</label>
				<textarea
					name="comment"
					placeholder="Your review here"
					className="block rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500 resize-y"
					maxLength={2000}
					onChange={(e) => setCount(e.target.value.length)}
				/>
				<p className="pt-1 text-gray-400 text-xs flex flex-row-reverse">
					{count}/{2000}
				</p>
			</div>
		</div>
	);
}

/*
 A slider element that allows the user to put in their score for their review
*/

export function BeerScore() {
	const [value, setValue] = React.useState(5);
	const [inputValue, setInputValue] = React.useState("5");

	const handleChange = (value: any) => {
		if (isNaN(Number(value))) return;

		setValue(value);
		setInputValue(value.toString());
	};

	return (
		<div className="flex flex-row place-items-center">
			<Slider
				classNames={{
					filler: "bg-sky-500",
					base: "flex-row",
					trackWrapper: "flex-5/6 mr-10",
					// Below is necessary to keep consistent styling for the background
					// Was very hard to actaully find this out
					track:
						"bg-gray-300/50 data-[fill-start=true]:border-l-sky-500 data-[fill-end=false]:border-r-gray-300/0",
					label: "text-medium",
					value: "text-medium",
					labelWrapper: "flex flex-col flex-1/6 pl-2 pr-2 !place-items-start",
				}}
				marks={[
					{
						value: 0,
						label: "0",
					},
					{
						value: 2.5,
						label: "2.5",
					},
					{
						value: 5,
						label: "5",
					},
					{
						value: 7.5,
						label: "7.5",
					},
					{
						value: 10,
						label: "10",
					},
				]}
				color={undefined}
				label="Score"
				maxValue={10}
				minValue={0}
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				size="md"
				step={0.1}
				value={value}
				name="score"
				onChange={handleChange}
			/>
		</div>
	);
}
