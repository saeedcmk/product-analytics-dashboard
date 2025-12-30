import { Category } from "../models/category";
import { Product } from "../models/product";
import { ProductMonthlySale } from "../models/product-monthly-sale";
import { ProductSort } from "../models/product-sort";

interface GetProductsArgs {
	limit: number;
	skip: number;
	search?: string;
	category?: string;
	sort?: ProductSort;
}

interface GetProductsResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}

interface IProductRepository {
	getProducts(args: GetProductsArgs): Promise<GetProductsResponse>;

	getProductById(id: number): Promise<Product>;

	getMonthlySalesByProductId(productId: number): Promise<ProductMonthlySale[]>;

	getCategories(): Promise<Category[]>;
}

export type { GetProductsArgs, GetProductsResponse, IProductRepository };
