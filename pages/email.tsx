import ReCAPTCHA from "react-google-recaptcha"
import { useRef, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

export default function Email() {
	const router = useRouter()
	const [verified, setVerified] = useState<boolean>(false)
	const captchaRef = useRef<any>()

	function onReCAPTCHAChange(captchaCode: any) {
		if (!captchaCode) {
			return
		} else {
			setVerified(true)
			router.push("mailto:onewiththeriverbed@gmail.com")
		}
	}

	return (
		<>
			<Head>
				<title>Contact | One with the Riverbed</title>
			</Head>
			<section className="max-w-3xl mx-auto overflow-hidden text-sand flex items-center justify-center flex-col h-full">
				<p>We just need to verify you&apos;re a real person</p>
				{verified === false ? (
					<form>
						<ReCAPTCHA
							sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
							onChange={onReCAPTCHAChange}
							onSubmit={() => captchaRef.current.execute()}
							className="py-6"
						/>
					</form>
				) : null}
				{verified ? (
					<p>
						Email us at:{" "}
						<a
							className="underline"
							title="mailto:onewiththeriverbed@gmail.com"
							href="mailto:onewiththeriverbed@gmail.com"
						>
							onewiththeriverbed@gmail.com
						</a>
					</p>
				) : null}
			</section>
		</>
	)
}
