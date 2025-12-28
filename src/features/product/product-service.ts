import {
	FetchProductsArgs,
	IProductRepository,
} from "./repository/product-repository";
import { Product } from "./types/product";
import { mapProductApiToDomain } from "./utils/map-product-api-to-domain";

interface ProductsPageResult {
	products: Product[];
	total: number;
	page: number;
	pageSize: number;
}

class ProductService {
	constructor(private readonly repository: IProductRepository) {}

	async getProducts(args: FetchProductsArgs): Promise<ProductsPageResult> {
		const response = await this.repository.fetchProducts(args);

		return {
			products: response.products.map(mapProductApiToDomain),
			total: response.total,
			page: Math.floor(response.skip / response.limit) + 1,
			pageSize: response.limit,
		};
	}

	async getProductDetails(id: number): Promise<Product> {
		const rawProduct = await this.repository.fetchProductById(id);

		return mapProductApiToDomain(rawProduct);
	}

	async getCategories(): Promise<string[]> {
		return this.repository.fetchCategories();
	}
}

export { ProductService };
