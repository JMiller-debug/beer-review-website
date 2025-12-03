import { Beer } from "lucide-react";
import { lusitana } from "@/app/ui/fonts";

/*
Just a Beer Logo
*/
export default function BeerLogo() {
	return (
		<div
			className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
		>
			<Beer size={72} color="#ffdd00" />
			<p className="text-[28px]">Beer Review</p>
		</div>
	);
}
