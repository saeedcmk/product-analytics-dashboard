"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function QueryProvider(props: React.PropsWithChildren) {
	return <QueryClientProvider client={queryClient} {...props} />;
}

export { QueryProvider };
