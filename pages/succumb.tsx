import { useEffect, useState } from "react"
import { AudioPlayer } from "../components/audioPlayer"
import Image from "next/image"

type song = {
	title: string
	url?: string
}

type Props = {
	data: song[]
}

export async function getStaticProps() {
	const res = await fetch("https://owtr-api.onrender.com", {
		headers: {
			"x-api-key": process.env.API_KEY!
		}
	})
	const data = await res.json()

	return {
		props: {
			data
		}
	}
}

export default function EPK({ data }: Props) {
	const [showBio, setShowBio] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	const tracklist: song[] = [
		{ title: "Infested" },
		{ title: "Dominion" },
		{ title: "Resolute" },
		{ title: "Purified" },
		{ title: "Adaptation" },
		{ title: "Erode" },
		{ title: "Burden" },
		{ title: "Sunlight" }
	]

	for (let d of data) {
		tracklist.forEach((track: song) => {
			if (d.title === track.title) {
				track.url = d.url
			}
		})
	}

	useEffect(() => {
		const referrer = document.referrer.split("/")
		if (referrer[referrer.length - 1] !== "epk") {
			window.location.pathname = "/epk"
		}
	}, [])

	useEffect(() => {
		if (window.screen.width <= 767) {
			setIsMobile(true)
		}

		window.addEventListener("resize", function () {
			if (this.window.screen.width <= 767) {
				setIsMobile(true)
			} else {
				setIsMobile(false)
			}
		})
	}, [])

	function showOrHideBio() {
		setShowBio(!showBio)
	}

	return (
		<>
		<div className="relative w-full max-w-3xl aspect-4/3 m-auto">
				<Image src="/images/image-with-logo.png" alt="One with the riverbed promo picture" fill className="object-contain" />
			</div>   

			<div id="bio" className="max-w-3xl flex flex-col m-auto mb-5 text-sand">
			<p className="mb-5">
					One with the Riverbed is a five-piece post-metal band from Kalamazoo,
					Michigan. Since forming in 2017, the band has strived to push the
					boundaries of the genre by incorporating elements of atmospheric black
					metal with dissonant textures and dynamic shifts. Absence, the band’s
					first full-length album following an EP in 2018, garnered
					international attention upon its release in 2021, earning accolades
					from publications such as Metal Hammer, No Clean Singing, and Toilet
					ov Hell.{" "}
				</p>

				{/* {showBio ? (
					<> */}
						<p className="mb-5">
							In preparation of releasing their second full-length album,
							Succumb, One with the Riverbed seeks collaboration with a label
							that can provide distribution, promotion, and artist development.
							With a distinct fusion of haunting melodies, visceral riffs, and
							enveloping soundscapes, Succumb shows the band embracing their
							core musical identity while venturing into previously unexplored
							realms. Lyrical themes include nostalgia, temporality, and the
							human condition.
						</p>

						<p className="mb-5">
							Thank you for your time and consideration. Select tracks from
							Succumb are available to stream below.
						</p>
					{/* </>
				) : null} */}

				{/* <button
					className="mx-auto flex mb-5 text-sand underline"
					onClick={showOrHideBio}
				>
					Show {showBio ? "Less" : "More"}
				</button> */}

				<div
					className={`flex ${
						isMobile ? "flex-col" : null
					} justify-between items-center gap-5 mb-5`}
				>
					<div
						className={`relative aspect-square w-full md:w-64 lg:w-96 ${
							isMobile ? "mb-5" : null
						}`}
					>
						<Image src="/images/succumb.jpg" alt={""} fill />
					</div>
					{data && <AudioPlayer playlist={tracklist}></AudioPlayer>}
				</div>

				
			</div>
		</>
	)
}
