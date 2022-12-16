import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Layout } from "../components/layout"
import { ActiveImageContext } from "../context/ActiveImageContext"
import { useState } from "react"

export default function App({ Component, pageProps }: AppProps) {
	const [activeImage, setActiveImage] = useState<string | null>(null)
	return (
		<ActiveImageContext.Provider value={{ activeImage, setActiveImage }}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ActiveImageContext.Provider>
	)
}
