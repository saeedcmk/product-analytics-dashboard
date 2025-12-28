import { kyClient } from "@/lib/data/api/ky-client";
import { ProductApi } from "./product.dto";
import {
	FetchProductsArgs,
	FetchProductsResponse,
	IProductRepository,
} from "./product-repository";

const BASE_URL = "https://dummyjson.com/products";
const apiClient = kyClient();

class DummyJsonProductRepository implements IProductRepository {
	async fetchProducts(args: FetchProductsArgs): Promise<FetchProductsResponse> {
		const url = new URL(BASE_URL);

		url.searchParams.set("limit", String(args.limit));
		url.searchParams.set("skip", String(args.skip));

		if (args.search) {
			url.pathname += "/search";
			url.searchParams.set("q", args.search);
		}

		if (args.category) {
			url.pathname += `/category/${args.category}`;
		}

		if (args.sort) {
			url.searchParams.set("sortBy", args.sort.key);
			url.searchParams.set("order", args.sort.direction);
		}

		const response = await apiClient
			.get<FetchProductsResponse>(url, { searchParams: url.searchParams })
			.json();

		return response;
	}

	async fetchProductById(id: number): Promise<ProductApi> {
		const response = await apiClient
			.get<ProductApi>(`${BASE_URL}/${id}`)
			.json();

		return response;
	}

	async fetchCategories(): Promise<string[]> {
		const response = await apiClient
			.get<string[]>(`${BASE_URL}/categories`)
			.json();

		return response;
	}
}

export { DummyJsonProductRepository };
