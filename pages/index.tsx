import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
	const [isMobile, setIsMobile] = useState<Boolean>()

	useEffect(() => {
		if (window.screen.width <= 900) setIsMobile(true)
		else setIsMobile(false)

		window.addEventListener("resize", function () {
			if (window.screen.width <= 900) setIsMobile(true)
			else setIsMobile(false)
		})
	}, [])

	return (
		<>
			<Head>
				<title>Home | One with the Riverbed</title>
			</Head>
			<div className="bg w-full h-screen flex items-center justify-center">
				{isMobile === true ? (
					<div className="relative w-80 h-80">
						<Image
							src="/logo.png"
							alt="One with the Riverbed Logo"
							fill
							objectFit="contain"
						/>
					</div>
				) : null}
			</div>
		</>
	)
}
