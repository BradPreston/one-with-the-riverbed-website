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
					<strong>One with the Riverbed</strong> is a five-piece post-metal band
					hailing from Kalamazoo, Michigan. Since their formation in 2017, the
					band has carved out a unique space in the genre by blending
					atmospheric black metal with dissonant textures, dynamic shifts, and
					emotionally charged soundscapes.
				</p>

				<p className="mb-5">
					Their debut full-length album, Absence (2021), marked a significant
					milestone for the band, earning international acclaim from
					publications like Metal Hammer, No Clean Singing, and Toilet ov Hell.
					Building on the momentum of their 2018 EP, Absence showcased the
					band's ability to craft immersive, genre-defying music that resonates
					deeply with listeners.
				</p>

				<p className="mb-5">
					With their sophomore album, Succumb, One with the Riverbed has further
					refined their sound, embracing their core musical identity while
					venturing into uncharted creative territories. The album has received
					high praise from renowned publications such as Decibel Magazine and
					Metal Temple, with critics applauding its depth and innovation.
					Additionally, Succumb has been recognized by prominent Spotify
					playlist curators, including Season of Mist and Arctic Drones.
					Exploring themes of nostalgia, temporality, and the human condition,
					the album delivers a powerful and introspective listening experience.
				</p>

				<p className="mb-5">
					One with the Riverbed has prioritized building their presence through
					consistent touring and live performances. As they continue to expand
					their reach, One with the Riverbed is eager to bring their powerful
					performances to new regions and audiences.
				</p>

				<p className="mb-5">
					For press inquiries, booking, or collaboration opportunities, please
					reach out to{" "}
					<a
						href="mailto:onewiththeriverbed@gmail.com"
						className="border-b-[1px] border-b-sand hover:border-b-[0px] transition-all"
					>
						onewiththeriverbed@gmail.com
					</a>
					.
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
