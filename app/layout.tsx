import "@/app/ui/global.css";
import { Providers } from "./providers";
import { inter } from "@/app/ui/fonts";
import Layout from "./ui/global-layout";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<Providers>
					<Layout children={children} />
				</Providers>
			</body>
		</html>
	);
}
