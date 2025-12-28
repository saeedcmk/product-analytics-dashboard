"use client";

import { LucideEye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Table } from "@/components/ui/table";
import {
	TableAction,
	TableActions,
} from "@/components/ui/table/table.primitives";
import { TableColumn } from "@/components/ui/table/table.types";
import { tableRowNumberColumn } from "@/components/ui/table/table.utils";
import { useLanguage } from "@/lib/i18n/hooks/use-language";
import { routes } from "@/lib/routes";
import { Product } from "../types/product";

function ProductListTable({
	products,
	loading,
	offset,
	pageSize,
}: {
	products: Product[] | undefined;
	loading: boolean;
	offset: number;
	pageSize: number;
}) {
	const { intl } = useLanguage();

	const columns: TableColumn<Product>[] = useMemo(
		() => [
			tableRowNumberColumn(),
			{
				key: "name",
				title: (t) => t("product.name"),
				render: (product) => (
					<div className="flex items-center gap-3">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-md shadow-md">
							<Image
								alt={product.name}
								src={product.imageUrl}
								width={40}
								height={40}
								unoptimized
							/>
						</div>

						<Link
							className="flex w-full flex-col gap-0.5"
							href={routes.product.url({ productId: product.id })}
						>
							<span>{product.name}</span>
							<span className="text-muted-foreground max-w-80 truncate">
								{product.description}
							</span>
						</Link>
					</div>
				),
				skeleton: 2,
			},
			{
				key: "price",
				title: (t) => t("product.price"),
				render: (product) => new Intl.NumberFormat(intl).format(product.price),
				width: 128,
			},
			{
				key: "category",
				title: (t) => t("product.category"),
				render: (product) => (
					<span className="capitalize">{product.category}</span>
				),
				width: 128,
			},
			{
				key: "actions",
				title: (t) => t("exprs.actions"),
				render: (product, { t }) => (
					<TableActions>
						<Link
							className="flex"
							href={routes.product.url({ productId: product.id })}
							passHref
						>
							<TableAction tooltip={t("product-list.item.actions.view")}>
								<LucideEye />
							</TableAction>
						</Link>
					</TableActions>
				),
				width: 112,
			},
		],
		[intl]
	);

	return (
		<Table
			columns={columns}
			items={products}
			loading={loading}
			offset={offset}
			rowKey="id"
			rowCount={pageSize}
		/>
	);
}

export { ProductListTable };
