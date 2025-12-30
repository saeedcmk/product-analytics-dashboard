import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ProductService } from "../product-service";
import { DummyJsonProductRepository } from "../repository/dummy-json-product-repository";
import { GetProductsArgs } from "../repository/product-repository.interface";

const productService = new ProductService(new DummyJsonProductRepository());

function useProductsQuery(args: GetProductsArgs) {
	return useQuery({
		queryKey: [
			"products",
			args.skip,
			args.limit,
			args.sort?.key,
			args.sort?.direction,
			args.search ?? "",
			args.category ?? "",
		],
		queryFn: () => productService.getProducts(args),
		placeholderData: keepPreviousData,
	});
}

export { useProductsQuery };
