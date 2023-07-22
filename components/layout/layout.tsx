import { ReactElement } from "react"
import { Header } from "../../components/header"
import Head from "next/head"

export default function Layout({ children }: { children: ReactElement }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Header />
			<main>{children}</main>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "http://schema.org",
						"@type": "MusicGroup",
						name: "One With the Riverbed",
						url: "https://onewiththeriverbed.com",
						logo: "https://onewiththeriverbed.com/images/home-bg.jpg"
					})
				}}
			></script>
		</>
	)
}
