import { kyClient } from "@/lib/data/api/ky-client";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { ProductMonthlySale } from "../models/product-monthly-sale";
import {
	GetProductsArgs,
	GetProductsResponse,
	IProductRepository,
} from "./product-repository.interface";

const BASE_URL = "https://dummyjson.com/products";
const apiClient = kyClient();

class DummyJsonProductRepository implements IProductRepository {
	async getProducts(args: GetProductsArgs): Promise<GetProductsResponse> {
		const url = new URL(BASE_URL);

		url.searchParams.set("limit", String(args.limit));
		url.searchParams.set("skip", String(args.skip));

		if (args.search) {
			url.pathname += "/search";
			url.searchParams.set("q", args.search);
		} else if (args.category) {
			url.pathname += `/category/${args.category}`;
		}

		if (args.sort) {
			url.searchParams.set("sortBy", args.sort.key);
			url.searchParams.set("order", args.sort.direction);
		}

		const response = await apiClient
			.get<GetProductsResponse>(url, { searchParams: url.searchParams })
			.json();

		return response;
	}

	async getProductById(id: number): Promise<Product> {
		const response = await apiClient.get<Product>(`${BASE_URL}/${id}`).json();

		return response;
	}

	async getMonthlySalesByProductId(
		productId: number
	): Promise<ProductMonthlySale[]> {
		const base = (productId * 7) % 100;

		return [
			{ month: "Jan", sales: (base + 80) % 220 },
			{ month: "Feb", sales: (base + 65) % 220 },
			{ month: "Mar", sales: (base + 110) % 220 },
			{ month: "Apr", sales: (base + 140) % 220 },
			{ month: "May", sales: (base + 170) % 220 },
			{ month: "Jun", sales: (base + 155) % 220 },
			{ month: "Jul", sales: (base + 121) % 220 },
			{ month: "Aug", sales: (base + 144) % 220 },
			{ month: "Sep", sales: (base + 135) % 220 },
			{ month: "Oct", sales: (base + 86) % 220 },
			{ month: "Nov", sales: (base + 92) % 220 },
			{ month: "Dec", sales: (base + 104) % 220 },
		];
	}

	async getCategories(): Promise<Category[]> {
		const response = await apiClient
			.get<Category[]>(`${BASE_URL}/categories`)
			.json();

		return response;
	}
}

export { DummyJsonProductRepository };
