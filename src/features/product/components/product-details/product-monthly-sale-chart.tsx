"use client";

import { useTranslations } from "next-intl";
import {
	CartesianGrid,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardInfo,
	CardTitle,
} from "@/components/ui/card";
import { ProductMonthlySale } from "../../models/product-monthly-sale";

function ProductMonthlySaleChart({ data }: { data: ProductMonthlySale[] }) {
	const t = useTranslations();

	return (
		<Card>
			<CardHeader>
				<CardInfo>
					<CardTitle className="text-base">
						{t("product-monthly-sale.title")}
					</CardTitle>
				</CardInfo>
			</CardHeader>

			<CardContent className="h-64" dir="ltr">
				<LineChart data={data} responsive width="100%" height="100%">
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip
						content={({ active, payload }) => {
							if (!active || !payload || !payload.length) return;

							const { month, sales } = payload[0].payload;

							return (
								<div className="space-y-2 rounded-xl border bg-white px-4 py-3 shadow-lg">
									<div className="-mx-1">
										<Badge className="w-full" color="darkGray">
											{month}
										</Badge>
									</div>
									<div>
										<span className="text-muted-foreground">
											{t("product-monthly-sale.tooltip.num_of_sales")}:
										</span>
										&nbsp;{sales}
									</div>
								</div>
							);
						}}
					/>
					<Line
						type="monotone"
						dataKey="sales"
						strokeWidth={2}
						dot={{ r: 3 }}
					/>
				</LineChart>
			</CardContent>
		</Card>
	);
}

export { ProductMonthlySaleChart };
