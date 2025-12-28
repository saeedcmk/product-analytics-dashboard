import { ProductSort } from "../types/product-sort";
import type { ProductApi } from "./product.dto";

interface FetchProductsArgs {
	limit: number;
	skip: number;
	search?: string;
	category?: string;
	sort?: ProductSort;
}

interface FetchProductsResponse {
	products: ProductApi[];
	total: number;
	skip: number;
	limit: number;
}

interface IProductRepository {
	fetchProducts(args: FetchProductsArgs): Promise<FetchProductsResponse>;

	fetchProductById(id: number): Promise<ProductApi>;

	fetchCategories(): Promise<string[]>;
}

export type { FetchProductsArgs, FetchProductsResponse, IProductRepository };
