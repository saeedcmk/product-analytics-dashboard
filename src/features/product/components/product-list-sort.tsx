"use client";

import { ArrowDown, ArrowUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductSort } from "../types/product-sort";

const PRODUCT_SORT_PROPERTIES = [
	"title",
	"price",
] satisfies ProductSort["key"][];

function ProductListSort({
	value,
	onChange,
}: {
	value: ProductSort;
	onChange: (value: ProductSort) => void;
}) {
	return (
		<ButtonGroup className="w-full lg:w-fit">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className="grow justify-start lg:w-32 lg:justify-center"
						variant="outline"
					>
						Sort by: <span className="capitalize">{value.key}</span>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="start">
					{PRODUCT_SORT_PROPERTIES.map((key) => (
						<DropdownMenuItem
							key={key}
							onClick={() =>
								onChange({
									...value,
									key,
								})
							}
							className="flex items-center"
						>
							<div className="size-4">
								{value.key === key && <Check className="size-full" />}
							</div>
							<span className="capitalize">{key}</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="w-20" variant="outline">
						{value.direction === "asc" ? (
							<>
								Asc
								<ArrowUp className="size-4" />
							</>
						) : (
							<>
								Desc
								<ArrowDown className="size-4" />
							</>
						)}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuItem
						onClick={() => onChange({ ...value, direction: "asc" })}
						className="flex items-center justify-between"
					>
						<div className="flex items-center gap-2">
							<ArrowUp className="size-4" />
							Ascending
						</div>
						{value.direction === "asc" && <Check className="size-4" />}
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => onChange({ ...value, direction: "desc" })}
						className="flex items-center justify-between"
					>
						<div className="flex items-center gap-2">
							<ArrowDown className="size-4" />
							Descending
						</div>
						{value.direction === "desc" && <Check className="size-4" />}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</ButtonGroup>
	);
}

export { ProductListSort };
