// The following is from this website and was a great resource for building up queries for my Python API

// https://dev.to/alexanderop/building-a-type-safe-api-url-builder-in-typescript-a-pokemon-api-example-3mk5
export type API = "beers" | "breweries" | "reviews";

type baseParamters = {
	offset?: number;
	limit?: number;
	orderby?: string;
	order?: string;
	identifier?: string;
	name?: string;
};
export type brewerieParameters = baseParamters;
export type beerParameters = baseParamters;
export type reviewParameters = baseParamters & {
	beer_name?: string;
	beer_id?: string;
	username?: string;
};
interface APIAttributes {
	beers: beerParameters;
	breweries: brewerieParameters;
	reviews: reviewParameters;
}

interface FetchOptions {
	headers?: Record<string, string>;
	method?: string;
	body?: Record<string, any>;
}

export interface SegmentTypes {
	beers: "list-beers";
	breweries: "";
	reviews: "";
}

export class URLBuilder<T extends API> {
	private baseURL: string;
	private segments: string[] = [];
	private queryParameters: Partial<APIAttributes[T]> = {};
	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	// HTTP Methods
	async get(): Promise<Response> {
		return this.fetch({ method: "GET" });
	}
	async post(body?: Record<string, any>): Promise<Response> {
		return this.fetch({ method: "POST", body });
	}
	async put(body?: Record<string, any>): Promise<Response> {
		return this.fetch({ method: "PUT", body });
	}
	async delete(): Promise<Response> {
		return this.fetch({ method: "DELETE" });
	}

	// Add resource and query parameters
	addResource(resource: SegmentTypes[T]): URLBuilder<T> {
		this.segments.push(resource);
		return this;
	}
	addQueryParam<K extends keyof APIAttributes[T]>(
		key: K,
		value: APIAttributes[T][K]
	): URLBuilder<T> {
		this.queryParameters[key] = value;
		return this;
	}

	// Build the URL
	private buildURL(): string {
		let url = `${this.baseURL}/${this.segments.join("/")}`;
		const queryParams = new URLSearchParams(
			Object.entries(this.queryParameters).map(([key, value]) => [
				key,
				String(value),
			])
		).toString();
		if (queryParams) {
			url += `?${queryParams}`;
		}
		return url;
	}

	// Fetch data
	private async fetch(options: FetchOptions = {}): Promise<Response> {
		const { body, ...restOptions } = options;
		return fetch(this.buildURL(), {
			...restOptions,
			body: body ? JSON.stringify(body) : null,
			headers: {
				"Content-Type": "application/json",
				...restOptions.headers,
			},
		});
	}
}
