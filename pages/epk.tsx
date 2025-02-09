import Image from "next/image"
const gallery = require("../data/gallery.json")
import { ButtonBase } from "../components/buttons"
import Link from "next/link"
import { useContext } from "react"
import { ImageModal } from "../components/modals"
import { ActiveImageContext } from "../context/ActiveImageContext"

type Photo = {
	id: string
	link: string
	photographer: string | null
}

export default function EPK() {
	const { activeImage, setActiveImage } = useContext(ActiveImageContext)

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
					band&apos;s ability to craft immersive, genre-defying music that
					resonates deeply with listeners.
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

				<p className="mb-10">
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

				<section className="mb-10">
					<h2 className="text-center text-2xl mb-2">Releases</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
						<div className="mb-5 sm:mb-0">
							<div className="relative w-full max-w-3xl aspect-square m-auto">
								<Image
									src="/images/succumb.jpg"
									alt="Succumb ablum cover"
									fill
									className="object-cover"
								/>
							</div>
							<h3 className="text-center text-lg mt-2">Succumb (2024)</h3>
						</div>
						<div className="mb-5 sm:mb-0">
							<div className="relative w-full max-w-3xl aspect-square m-auto">
								<Image
									src="/absence.jpg"
									alt="Absence album cover"
									fill
									className="object-cover"
								/>
							</div>
							<h3 className="text-center text-lg mt-2">Absence (2021)</h3>
						</div>
						<div className="mb-5 sm:mb-0">
							<div className="relative w-full max-w-3xl aspect-square m-auto">
								<Image
									src="/solace.jpg"
									alt="Solace album cover"
									fill
									className="object-cover"
								/>
							</div>
							<h3 className="text-center text-lg mt-2">Solace (2018)</h3>
						</div>
					</div>
				</section>

				<section className="mb-10">
					<h2 className="text-center text-2xl mb-2">Press</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						<ButtonBase
							href="https://www.hotelhobbies.com/post/album-review-one-with-the-riverbed-succumb-2024-dusktone"
							title="Hotel Hobbies"
							target="_blank"
							style="text-center text-sm"
						/>
						<ButtonBase
							href="https://www.nocleansinging.com/2024/10/02/an-ncs-video-premiere-one-with-the-riverbed-infested/"
							title="No Clean Singing"
							target="_blank"
							style="text-center text-sm"
						/>
						<ButtonBase
							href="https://www.decibelmagazine.com/2024/07/09/track-premiere-one-with-the-riverbed-dominion/"
							title="Decibel Magazine"
							target="_blank"
							style="text-center text-sm"
						/>
						<ButtonBase
							href="https://metal-temple.com/review/one-with-the-riverbed-absence/"
							title="Metal Temple"
							target="_blank"
							style="text-center text-sm"
						/>
						<ButtonBase
							href="https://www.pressreader.com/uk/metal-hammer-uk/20210819/283145726790632"
							title="Metal Hammer"
							target="_blank"
							style="text-center text-sm"
						/>
						<ButtonBase
							href="https://labandzi.blogspot.com/2018/11/one-with-riverbed-solace-2018-en.html"
							title="Łabandzi Śpiew"
							target="_blank"
							style="text-center text-sm"
						/>
					</div>
				</section>

				<iframe
					src="https://open.spotify.com/embed/playlist/6wzlFCED67WfdoTr2tCibR?utm_source=generator"
					width="100%"
					height="630"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
					className="rounded-2xl mb-10"
				></iframe>

				<section className="mb-10">
					<h2 className="text-center text-2xl mb-2">Tour Flyers</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{gallery.flyers.map(({ link, id }: Photo) => (
							<div
								className="aspect-square w-full relative cursor-pointer"
								key={id}
							>
								<Image
									src={link}
									alt={link}
									fill
									loading="lazy"
									objectFit="cover"
									onClick={() => setActiveImage(link)}
								/>
							</div>
						))}
					</div>
				</section>
			</div>
			{activeImage ? <ImageModal link={activeImage} /> : null}
		</>
	)
}
