import { notFound } from "next/navigation";
import { PageCrumb } from "@/components/app/breadcrumb/page-crumb";
import { toCrumb } from "@/components/ui/breadcrumb/breadcrumb.utils";
import { ProductInfo } from "@/features/product/components/product-details/product-info";
import { ProductMonthlySaleChart } from "@/features/product/components/product-details/product-monthly-sale-chart";
import { ProductService } from "@/features/product/product-service";
import { DummyJsonProductRepository } from "@/features/product/repository/dummy-json-product-repository";
import { I18nProvider } from "@/lib/i18n/components/i18n-provider";
import { getPartialMessages } from "@/lib/i18n/utils/get-partial-messages";
import { routes } from "@/lib/routes";

const productService = new ProductService(new DummyJsonProductRepository());

async function ProductDetailsPage(props: {
	params: Promise<{
		id: string;
	}>;
}) {
	const params = await props.params;

	const productId = Number(params.id);

	if (Number.isNaN(productId)) {
		notFound();
	}

	const [product, monthlySales] = await Promise.all([
		productService.getProductDetails(productId),
		productService.getMonthlySalesByProductId(productId),
	]);

	if (!product) {
		notFound();
	}

	const messages = await getPartialMessages([
		"features.product.components.product-info",
		"features.product.components.product-monthly-sale",
	]);

	return (
		<I18nProvider messages={messages}>
			<PageCrumb crumb={toCrumb(routes.product, { productId })} />
			<div className="space-y-6">
				<ProductInfo product={product} />
				<ProductMonthlySaleChart data={monthlySales} />
			</div>
		</I18nProvider>
	);
}

export default ProductDetailsPage;
