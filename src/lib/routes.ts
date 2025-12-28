import type { LucideIcon } from "lucide-react";

type Route<TParams extends object = object> = {
	key: string;
	icon?: LucideIcon;
	url: (params: TParams extends object ? TParams : undefined) => string;
};

const routes = {
	dashboard: {
		key: "dashboard",
		url: () => "/dashboard",
	} satisfies Route,

	products: {
		key: "products",
		url: () => "/dashboard/products",
	} satisfies Route,

	product: {
		key: "product",
		url: ({ productId }: { productId: number }) =>
			`/dashboard/products/${productId}`,
	} satisfies Route<{ productId: number }>,
} as const;

export type { Route };
export { routes };
