import type { LucideIcon } from "lucide-react";

type Route<TParams extends object = object> = {
	key: string;
	title: string;
	icon?: LucideIcon;
	url: (params: TParams extends object ? TParams : undefined) => string;
};

const routes = {
	dashboard: {
		key: "dashboard",
		title: "Dashboard",
		url: () => "/dashboard",
	} satisfies Route,
} as const;

export type { Route };
export { routes };
