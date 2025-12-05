"use server";

import { imageEndpoint } from "@/app/lib/definitions";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ beerName: string }> }
) {
	const { beerName } = await params;
	// console.log(`${imageEndpoint}/${params.path.join("/")}`);
	const url = `${imageEndpoint}/${beerName}`;

	const res = await fetch(url, {
		// Forward headers if needed
		headers: {
			"Cache-Control": "no-cache",
		},
	});

	if (!res.ok) {
		return NextResponse.json(
			{ error: "The request for this image failed" },
			{ status: res.status }
		);
	}

	// Stream back the response
	const body = await res.arrayBuffer();
	return new NextResponse(body, {
		status: 200,
		headers: {
			"Content-Type":
				res.headers.get("Content-Type") || "application/octet-stream",
		},
	});
}
