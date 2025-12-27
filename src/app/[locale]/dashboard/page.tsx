import { I18nProvider } from "@/lib/i18n/components/i18n-provider";
import { getPartialMessages } from "@/lib/i18n/utils/get-partial-messages";

async function DashboardPage() {
	const messages = await getPartialMessages([]);

	return <I18nProvider messages={messages}>Dashboard Page</I18nProvider>;
}

export default DashboardPage;
