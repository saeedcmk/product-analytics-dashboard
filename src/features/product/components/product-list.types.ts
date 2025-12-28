import { z } from "zod";

const productListFilterSchema = z.object({
	search: z.string().optional(),
	category: z.string().optional(),
});

type ProductListFilterArgs = z.infer<typeof productListFilterSchema>;

export type { ProductListFilterArgs };
export { productListFilterSchema };
