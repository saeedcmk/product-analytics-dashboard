import { useLanguage } from "@/lib/i18n/hooks/use-language";

function PriceValue({ value }: { value: number | string }) {
	const { intl } = useLanguage();
	return `$${new Intl.NumberFormat(intl).format(Number(value))}`;
}

export { PriceValue };
