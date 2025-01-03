import Image from "next/image"

export default function EPK() {
	return (
		<>
			<div className="relative w-full max-w-3xl aspect-4/3 m-auto">
				<Image
					src="/images/image-with-logo.png"
					alt="One with the riverbed promo picture"
					fill
					className="object-contain"
				/>
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

				<p className="mb-5">
					In preparation of releasing their second full-length album, Succumb,
					One with the Riverbed seeks collaboration with a label that can
					provide distribution, promotion, and artist development. With a
					distinct fusion of haunting melodies, visceral riffs, and enveloping
					soundscapes, Succumb shows the band embracing their core musical
					identity while venturing into previously unexplored realms. Lyrical
					themes include nostalgia, temporality, and the human condition.
				</p>

				<p className="mb-5">
					Thank you for your time and consideration. Select tracks from Succumb
					are available to stream below.
				</p>

				<iframe
					src="https://open.spotify.com/embed/album/45CxVS0nej0EEl9qap5UBZ?utm_source=generator&theme=0"
					width="100%"
					height="630"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
					className="rounded-2xl"
				></iframe>
			</div>
		</>
	)
}
