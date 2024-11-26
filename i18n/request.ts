import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
	// Validate that the incoming `locale` parameter is valid
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>

	const ck = await cookies();
	const ckValue = ck.get("NEXT_LOCALE")?.value;
	const locale = ckValue ?? "pt";

	if (!routing.locales.includes(locale as any)) notFound();

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});

