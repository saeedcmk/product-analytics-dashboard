"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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
import { Category } from "../../models/category";
import {
	ProductListFilterArgs,
	productListFilterSchema,
} from "./product-list.types";

function ProductListFilter({
	categories,
	value,
	onChange,
}: {
	categories: Category[];
	value: ProductListFilterArgs;
	onChange: (value: ProductListFilterArgs) => void;
}) {
	const t = useTranslations();

	const form = useForm<ProductListFilterArgs>({
		defaultValues: {
			search: value.search ?? "",
			category: value.category ?? "all",
		},
		resolver: zodResolver(productListFilterSchema),
	});

	const { setValue, watch } = form;
	// eslint-disable-next-line react-hooks/incompatible-library
	const { search, category } = watch();

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange({
				search: search || undefined,
				category: category && category !== "all" ? category : undefined,
			});
		}, 500);

		return () => clearTimeout(timeout);
	}, [search, category, onChange]);

	return (
		<form className="flex w-full flex-col gap-1.5 sm:items-end lg:w-fit lg:flex-row">
			<Input
				className="w-full lg:max-w-48"
				placeholder={t("product-list.filter.search")}
				{...form.register("search")}
			/>

			<SelectRoot
				value={category}
				onValueChange={(value) => setValue("category", value)}
			>
				<SelectTrigger className="w-full lg:w-40">
					<SelectValue />
				</SelectTrigger>

				<SelectContent>
					<SelectItem value="all">
						{t("product-list.filter.all_categories")}
					</SelectItem>

					{categories.map((cat) => (
						<SelectItem key={cat.slug} value={cat.slug}>
							{cat.name}
						</SelectItem>
					))}
				</SelectContent>
			</SelectRoot>
		</form>
	);
}

export { ProductListFilter };
