"use client";

import { LucideArrowBigRightDash } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

function RedirectToProductsButton() {
	const t = useTranslations();

	return (
		<Link href={routes.products.url()} passHref>
			<Button
				className="animate animate-bounce gap-4"
				color="inverse"
				size="lg"
				type="button"
				variant="ghost"
			>
				<LucideArrowBigRightDash size={24} className="size-6 rtl:rotate-180" />
				<span className="text-lg tracking-widest uppercase rtl:tracking-wider">
					{t("redirect-to-products.label")}
				</span>
			</Button>
		</Link>
	);
}

export { RedirectToProductsButton };
