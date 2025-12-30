import { I18nProvider } from "@/lib/i18n/components/i18n-provider";
import { getPartialMessages } from "@/lib/i18n/utils/get-partial-messages";
import { RedirectToProductsButton } from "./_components/redirect-to-products-button";

async function DashboardPage() {
	const messages = await getPartialMessages([""]);

	return (
		<I18nProvider messages={messages}>
			<div className="flex min-h-full w-full items-center justify-center">
				<RedirectToProductsButton />
			</div>
		</I18nProvider>
	);
}

export default DashboardPage;
