import { NuqsAdapter } from "nuqs/adapters/next/app";
import { DialogsProvider } from "@/components/app/dialog/dialogs-context";
import { QueryProvider } from "@/lib/data/react-query/query-provider";
import { DateProvider } from "@/lib/i18n/components/date-provider";
import { DirectionProvider } from "@/lib/i18n/components/direction-provider";
import { I18nRootProvider } from "@/lib/i18n/components/i18n-root-provider";
import { getPartialMessages } from "@/lib/i18n/utils/get-partial-messages";

async function Providers({
	children,
	locale,
}: React.PropsWithChildren<{ locale: string }>) {
	const messages = await getPartialMessages([
		"shared.exprs",
		"shared.errors",
		{ path: "shared.components", spread: true },
	]);

	return (
		<QueryProvider>
			<NuqsAdapter>
				<DirectionProvider locale={locale}>
					<I18nRootProvider locale={locale} messages={messages}>
						<DateProvider>
							<DialogsProvider>{children}</DialogsProvider>
						</DateProvider>
					</I18nRootProvider>
				</DirectionProvider>
			</NuqsAdapter>
		</QueryProvider>
	);
}

export { Providers };
