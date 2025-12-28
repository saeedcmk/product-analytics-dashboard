"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select/select.primitives";
import {
	ProductListFilterArgs,
	productListFilterSchema,
} from "./product-list.types";

type ProductListFilterProps = {
	value: ProductListFilterArgs;
	onChange: (value: ProductListFilterArgs) => void;
	categories: string[];
};

export function ProductListFilter({
	value,
	onChange,
	categories,
}: ProductListFilterProps) {
	const form = useForm<ProductListFilterArgs>({
		resolver: zodResolver(productListFilterSchema),
		defaultValues: {
			search: value.search ?? "",
			category: value.category ?? "all",
		},
	});

	const { setValue, watch } = form;
	const { search, category } = watch();

	/**
	 * Debounced submit on change
	 */
	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange({
				search: search || undefined,
				category: category && category !== "all" ? category : undefined,
			});
		}, 400);

		return () => clearTimeout(timeout);
	}, [search, category, onChange]);

	return (
		<form className="flex w-full flex-col gap-1.5 sm:items-end lg:w-fit lg:flex-row">
			<Input
				placeholder="Search products..."
				{...form.register("search")}
				className="w-full lg:max-w-48"
			/>

			<SelectRoot
				value={category}
				onValueChange={(value) => setValue("category", value)}
			>
				<SelectTrigger className="w-full lg:w-40">
					<SelectValue placeholder="Category" />
				</SelectTrigger>

				<SelectContent>
					<SelectItem value="all">All categories</SelectItem>

					{categories.map((cat) => (
						<SelectItem key={cat} value={cat}>
							{cat}
						</SelectItem>
					))}
				</SelectContent>
			</SelectRoot>
		</form>
	);
}
