import Link from "next/link";
import { CircleUser } from "lucide-react";
/* 
Profile Icon
*/
export default function ProfileIcon() {
	const username = "Amaretto Miller";
	return (
		<div className="">
			<Link
				className="mb-2 flex items-end justify-start  md:h-25"
				href={encodeURI(`/profile/${username}`)}
			>
				<CircleUser size={80} absoluteStrokeWidth />
			</Link>
		</div>
	);
}
