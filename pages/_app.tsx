import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Layout } from "../components/layout"
import { ActiveImageContext } from "../context/ActiveImageContext"
import { useState } from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

export default function App({ Component, pageProps }: AppProps) {
	const [activeImage, setActiveImage] = useState<string | null>(null)
	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
			scriptProps={{
				async: false,
				defer: true,
				appendTo: "body",
				nonce: undefined
			}}
		>
			<ActiveImageContext.Provider value={{ activeImage, setActiveImage }}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ActiveImageContext.Provider>
		</GoogleReCaptchaProvider>
	)
}
