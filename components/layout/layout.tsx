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
		</>
	)
}
