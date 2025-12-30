"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PriceValue } from "@/components/ui/price-value";
import { Product } from "../../models/product";

function ProductInfo({ product }: { product: Product }) {
	const t = useTranslations();

	return (
		<Card>
			<CardContent>
				<div className="flex flex-col gap-6 lg:flex-row">
					<div className="relative aspect-square max-h-96 w-full shrink-0 overflow-hidden rounded-xl border shadow-md lg:w-96">
						<Image
							src={product.images[0]}
							alt={product.title}
							fill
							priority
							objectFit="cover"
						/>
					</div>

					<div className="space-y-4">
						<div className="space-y-2">
							<h2 className="text-base">{product.title}</h2>
							<p className="text-muted-foreground">{product.description}</p>
						</div>

						<div className="flex flex-wrap gap-2">
							<Badge color="darkGray">{product.category}</Badge>
							<Badge color="darkGray">
								{t("product-info.rate")}: {product.rating}
							</Badge>
							<Badge color="darkGray">
								{t("product-info.stock")}: {product.stock}
							</Badge>
						</div>

						<div className="space-y-1">
							<p className="text-sm">
								<PriceValue value={product.price} />
							</p>

							{product.discountPercentage > 0 && (
								<p className="text-sm text-green-700">
									<span dir="ltr">-{product.discountPercentage}%</span>{" "}
									{t("product-info.discount")}
								</p>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export { ProductInfo };
