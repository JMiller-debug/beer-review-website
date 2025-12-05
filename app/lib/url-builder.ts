// The following is from this website and was a great resource for building up queries for my Python API

// https://dev.to/alexanderop/building-a-type-safe-api-url-builder-in-typescript-a-pokemon-api-example-3mk5
export type API = "beers" | "breweries" | "reviews";

interface APIAttributes {
	beers: {};
	breweries: {};
	reviews: {};
}

interface FetchOptions {
	headers?: Record<string, string>;
	method?: string;
	body?: Record<string, any>;
}

export interface SegmentTypes {
	beers: "beers";
	breweries: "breweries";
	reviews: "reviews";
}

export class URLBuilder<
	APIType extends API,
	SegmentInterface extends SegmentTypes
> {
	private baseURL: string;
	private segments: string[] = [];
	queryParameters: Partial<APIAttributes[APIType]> = {};
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
	addResource(
		resource: SegmentInterface[APIType]
	): URLBuilder<APIType, SegmentInterface> {
		this.segments.push(resource);
		return this;
	}
	addQueryParam<K extends keyof APIAttributes[APIType]>(
		key: K,
		value: APIAttributes[APIType][K]
	): URLBuilder<APIType, SegmentInterface> {
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
