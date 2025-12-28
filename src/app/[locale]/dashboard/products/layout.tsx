import { PageCrumb } from "@/components/app/breadcrumb/page-crumb";
import { toCrumb } from "@/components/ui/breadcrumb/breadcrumb.utils";
import { routes } from "@/lib/routes";

function ProductsLayout({ children }: React.PropsWithChildren) {
	return (
		<>
			<PageCrumb crumb={toCrumb(routes.products)} />
			{children}
		</>
	);
}

export default ProductsLayout;
