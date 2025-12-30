import { ProductList } from "@/features/product/components/product-list";
import { I18nProvider } from "@/lib/i18n/components/i18n-provider";
import { usePartialMessages } from "@/lib/i18n/hooks/use-partial-messages";

function ProductsPage() {
	const messages = usePartialMessages([
		"features.product.components.product-list",
	]);

	return (
		<I18nProvider messages={messages}>
			<ProductList />
		</I18nProvider>
	);
}

export default ProductsPage;
