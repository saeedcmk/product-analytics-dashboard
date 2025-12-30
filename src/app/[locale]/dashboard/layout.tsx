import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { BreadcrumbProvider } from "@/components/app/breadcrumb/breadcrumb-provider";
import { Sidebar } from "@/components/app/sidebar";
import { toCrumb } from "@/components/ui/breadcrumb/breadcrumb.utils";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { I18nProvider } from "@/lib/i18n/components/i18n-provider";
import { getDirection } from "@/lib/i18n/utils/get-direction";
import { getPartialMessages } from "@/lib/i18n/utils/get-partial-messages";
import { routes } from "@/lib/routes";

async function DashboardLayout({
	children,
	params,
}: React.PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
	const { locale } = await params;
	const { side } = getDirection(locale);

	const messages = await getPartialMessages([
		"app.root.routes",
		"app.dashboard.root.sidebar",
		"app.dashboard.root.language",
	]);

	return (
		<I18nProvider messages={messages}>
			<SidebarProvider
				style={
					{
						"--sidebar-width": "16rem",
					} as React.CSSProperties
				}
			>
				<Sidebar side={side} />
				<SidebarInset className="max-w-full pt-4">
					<BreadcrumbProvider initialState={[toCrumb(routes.dashboard)]}>
						<header className="bg-muted sticky top-0 z-10 h-12 shrink-0 px-6 py-3">
							<div className="flex h-full w-full items-center gap-2">
								<SidebarTrigger />

								<Separator
									className="me-2 h-4"
									decorative
									orientation="vertical"
								/>

								<AppBreadcrumb />
							</div>
						</header>

						<div className="grow space-y-6 p-6">{children}</div>
					</BreadcrumbProvider>
				</SidebarInset>
			</SidebarProvider>
		</I18nProvider>
	);
}

export default DashboardLayout;
