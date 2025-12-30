import { Category } from "./models/category";
import { Product } from "./models/product";
import {
	GetProductsArgs,
	IProductRepository,
} from "./repository/product-repository.interface";

interface ProductsPageResult {
	products: Product[];
	total: number;
	page: number;
	pageSize: number;
}

class ProductService {
	constructor(private readonly repository: IProductRepository) {}

	async getProducts(args: GetProductsArgs): Promise<ProductsPageResult> {
		const response = await this.repository.getProducts(args);

		return {
			products: response.products,
			total: response.total,
			page: Math.floor(response.skip / response.limit) + 1,
			pageSize: response.limit,
		};
	}

	async getProductDetails(id: number): Promise<Product> {
		return this.repository.getProductById(id);
	}

	getMonthlySalesByProductId(productId: number) {
		return this.repository.getMonthlySalesByProductId(productId);
	}

	async getCategories(): Promise<Category[]> {
		return this.repository.getCategories();
	}
}

export { ProductService };
