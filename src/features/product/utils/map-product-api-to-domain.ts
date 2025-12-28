import { ProductApi } from "../repository/product.dto";
import { Product } from "../types/product";

function mapProductApiToDomain(dto: ProductApi): Product {
	return {
		id: dto.id,
		name: dto.title,
		description: dto.description,
		price: dto.price,
		category: dto.category,
		imageUrl: dto.thumbnail,
	};
}

export { mapProductApiToDomain };
