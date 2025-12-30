"use client";

import { LucideEye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PriceValue } from "@/components/ui/price-value";
import { Table } from "@/components/ui/table";
import {
	TableAction,
	TableActions,
} from "@/components/ui/table/table.primitives";
import { TableColumn } from "@/components/ui/table/table.types";
import { tableRowNumberColumn } from "@/components/ui/table/table.utils";
import { routes } from "@/lib/routes";
import { Product } from "../../models/product";

const columns: TableColumn<Product>[] = [
	tableRowNumberColumn(),
	{
		key: "title",
		title: (t) => t("product.title"),
		render: (product) => (
			<div className="flex items-center gap-3">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-md shadow-md">
					<Image
						alt={product.title}
						src={product.thumbnail}
						width={40}
						height={40}
						unoptimized
					/>
				</div>

				<Link
					className="flex w-full flex-col gap-0.5"
					href={routes.product.url({ productId: product.id })}
				>
					{product.title}
				</Link>
			</div>
		),
		skeleton: 2,
	},
	{
		key: "brand",
		title: (t) => t("product.brand"),
		render: (product) => (
			<span className="capitalize">{product.brand || "-"}</span>
		),
		width: 208,
	},
	{
		key: "price",
		title: (t) => t("product.price"),
		render: (product) => <PriceValue value={product.price} />,
		width: 160,
	},
	{
		key: "category",
		title: (t) => t("product.category"),
		render: (product) => <span className="capitalize">{product.category}</span>,
		width: 208,
	},
	{
		key: "availabilityStatus",
		title: (t) => t("product.availabilityStatus"),
		render: (product) => (
			<span className="capitalize">{product.availabilityStatus}</span>
		),
		width: 160,
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
		width: 96,
	},
];

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
