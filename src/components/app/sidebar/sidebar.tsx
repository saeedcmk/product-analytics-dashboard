"use client";

import { LucideBoxes, LucideLayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import {
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRoot,
	useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/lib/i18n/hooks/use-language";
import logo from "@/public/images/logo.png";
import { SidebarLanguageSelect } from "./sidebar-language-select";

const data = {
	navMain: [
		{
			title: "dashboard",
			url: "/dashboard",
			icon: LucideLayoutDashboard,
		},
		{
			title: "products",
			url: "/dashboard/products",
			icon: LucideBoxes,
		},
	],
};

function Sidebar({ ...props }: React.ComponentProps<typeof SidebarRoot>) {
	const router = useRouter();
	const pathname = usePathname();

	const t = useTranslations();
	const { locale } = useLanguage();

	const appName =
		locale === "fa"
			? process.env.NEXT_PUBLIC_APP_NAME_FA
			: process.env.NEXT_PUBLIC_APP_NAME_EN;
	const appDescription =
		locale === "fa"
			? process.env.NEXT_PUBLIC_APP_DESC_FA
			: process.env.NEXT_PUBLIC_APP_DESC_EN;

	const { isMobile, state, setOpenMobile } = useSidebar();

	const activeIndex = data.navMain.findIndex((item) => item.url === pathname);

	const handleItemClick = useCallback(
		(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
			event.preventDefault();

			if (isMobile && state === "expanded") {
				setOpenMobile(false);
			}

			router.push(url);
		},
		[router, isMobile, state, setOpenMobile]
	);

	return (
		<SidebarRoot variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							className="hover:bg-sidebar active:bg-sidebar justify-center md:h-10"
						>
							<div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<Image className="size-7 md:size-8" src={logo} alt={appName!} />
							</div>

							<div className="grid flex-1 space-y-0.5 text-start leading-tight">
								<h1 className="truncate font-normal uppercase">{appName}</h1>
								<p className="text-muted-foreground text-xs">
									{appDescription}
								</p>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupContent className="px-1.5 md:px-0">
						<SidebarMenu>
							{data.navMain.map((item, index) => {
								const title = t(`sidebar.menu.items.${item.title}.title`);

								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={activeIndex === index}
											className="px-2.5 md:h-8 md:px-2"
										>
											<Link
												href={item.url}
												prefetch={false}
												onClick={(event) => handleItemClick(event, item.url)}
											>
												<item.icon
													absoluteStrokeWidth
													className="md:size-5!"
													strokeWidth={1.5}
												/>
												<span>{title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu className="px-1.5">
					<SidebarMenuItem>
						<SidebarLanguageSelect />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</SidebarRoot>
	);
}

export { Sidebar };
