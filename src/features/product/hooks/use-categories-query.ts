import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ProductService } from "../product-service";
import { DummyJsonProductRepository } from "../repository/dummy-json-product-repository";

const productService = new ProductService(new DummyJsonProductRepository());

function useCategoriesQuery() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: () => productService.getCategories(),
		placeholderData: keepPreviousData,
	});
}

export { useCategoriesQuery };
