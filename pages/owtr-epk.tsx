import { useEffect, useState } from "react"
import { AudioPlayer } from "../components/audioPlayer"
import { ButtonBase } from "../components/buttons"

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
	const [hideBio, setHideBio] = useState(true)

	const tracklist: song[] = [
		{ title: "Adaption" },
		{ title: "Burden" },
		{ title: "Dominion" },
		{ title: "Erode" },
		{ title: "Infested" },
		{ title: "Purified" },
		{ title: "Resolute" },
		{ title: "Sunlight" }
	]

	for(let d of data) {
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

	function showOrHideBio() {
		setHideBio(!hideBio);
	}

	return (
		<>
			<div id="bio" className="max-w-3xl flex flex-col m-auto mb-5 text-sand">
				<p className="mb-5">One with the Riverbed is a five-piece post-metal band from Kalamazoo, Michigan. Since forming in 2017, the band has strived to push the boundaries of the genre by incorporating elements of atmospheric black metal with dissonant textures and dynamic shifts. Absence, the band’s first full-length album following an EP in 2018, garnered international attention upon its release in 2021, earning accolades from publications such as Metal Hammer, No Clean Singing, and Toilet ov Hell. </p>

				{hideBio ? 
				<>
					<p className="mb-5">In preparation of releasing their second full-length album, Succumb, One with the Riverbed seeks collaboration with a label that can provide distribution, promotion, and artist development. With a distinct fusion of haunting melodies, visceral riffs, and enveloping soundscapes, Succumb shows the band embracing their core musical identity while venturing into previously unexplored realms. Lyrical themes include nostalgia, temporality, and the human condition.</p>

					<p>Thank you for your time and consideration. Select tracks from Succumb are available to stream below.</p> 
				</>
				:
				null}
			</div>

			<button className="mx-auto flex mb-5 text-sand underline" onClick={showOrHideBio}>Show {hideBio ? "Less" : "More"}</button>

			<div className="flex justify-center items-center">
				<>{data && <AudioPlayer playlist={tracklist}></AudioPlayer>}</>
			</div>
		</>
	)
}
