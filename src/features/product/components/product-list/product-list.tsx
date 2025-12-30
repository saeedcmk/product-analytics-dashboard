"use client";

import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Card,
	CardActions,
	CardBody,
	CardContent,
	CardHeader,
	CardInfo,
	CardTitle,
} from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import { parsePaginationArgs } from "@/components/ui/pagination/pagination.utils";
import { usePagination } from "@/components/ui/pagination/use-pagination";
import { useCategoriesQuery } from "../../hooks/use-categories-query";
import { useProductsQuery } from "../../hooks/use-products-query";
import { ProductSort } from "../../models/product-sort";
import { GetProductsArgs } from "../../repository/product-repository.interface";
import { ProductListFilterArgs } from "./product-list.types";
import { ProductListFilter } from "./product-list-filter";
import { ProductListSort } from "./product-list-sort";
import { ProductListTable } from "./product-list-table";

function ProductList() {
	const t = useTranslations();

	const pagination = usePagination();
	const { pageSize, offset, setPage } = pagination;

	const [filterArgs, setFilterArgs] = useState<ProductListFilterArgs>({});
	const [sort, setSort] = useState<ProductSort>({
		key: "title",
		direction: "asc",
	});

	const changeFilterArgs = useCallback(
		(next: ProductListFilterArgs) => {
			setFilterArgs(next);
			setPage(0);
		},
		[setPage]
	);

	const queryArgs: GetProductsArgs = useMemo(
		() => ({
			skip: offset,
			limit: pageSize,
			sort,
			search: filterArgs.search || undefined,
			category: filterArgs.category || undefined,
		}),
		[offset, pageSize, sort, filterArgs]
	);

	const { data, isFetching, error } = useProductsQuery(queryArgs);
	const products = data?.products ?? [];
	const total = data?.total ?? 0;

	const { data: categories = [] } = useCategoriesQuery();

	return (
		<Card>
			<CardHeader className="sm:flex-col lg:flex-row">
				<CardInfo>
					<CardTitle>{t("product-list.title")}</CardTitle>
				</CardInfo>

				<CardActions breakpoint="lg">
					<ProductListFilter
						categories={categories}
						value={filterArgs}
						onChange={changeFilterArgs}
					/>
					<ProductListSort value={sort} onChange={setSort} />
				</CardActions>
			</CardHeader>

			{error ? (
				<CardContent>
					<Alert intent="danger">
						<AlertDescription>{error.message}</AlertDescription>
					</Alert>
				</CardContent>
			) : isFetching && products.length === 0 ? (
				<CardContent>
					<Loading size="sm" />
				</CardContent>
			) : (
				<CardBody>
					<div className="space-y-6">
						{filterArgs.search && filterArgs.category && (
							<div className="mx-6">
								<Alert intent="warning">
									<AlertDescription>
										{t("product-list.filter_warning")}
									</AlertDescription>
								</Alert>
							</div>
						)}

						<ProductListTable
							products={products}
							loading={isFetching}
							offset={offset}
							pageSize={pageSize}
						/>

						<Pagination {...parsePaginationArgs(pagination)} count={total} />
					</div>
				</CardBody>
			)}
		</Card>
	);
}

export { ProductList };
