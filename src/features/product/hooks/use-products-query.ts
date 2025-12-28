import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ProductService } from "../product-service";
import { DummyJsonProductRepository } from "../repository/dummy-json-product-repository";
import { FetchProductsArgs } from "../repository/product-repository";

const productService = new ProductService(new DummyJsonProductRepository());

export function useProductsQuery(args: FetchProductsArgs) {
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
