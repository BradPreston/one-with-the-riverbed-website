import { H1, H2 } from "../components/headings"
const gallery = require("../data/gallery.json")
import Image from "next/image"
import Head from "next/head"
import { useContext, useEffect, MouseEvent } from "react"
import { ActiveImageContext } from "../context/ActiveImageContext"
import { ImageModal } from "../components/modals"
import s from "../styles/Media.module.css"

type Video = {
	link: string
}

type Photo = {
	id: string
	link: string
	photographer: string | null
}

export default function Media() {
	const { activeImage, setActiveImage } = useContext(ActiveImageContext)

	useEffect(() => {
		const liveImages: NodeListOf<HTMLImageElement> = document.querySelectorAll(".image");
		for (const image of Array.from(liveImages)) {
			image.addEventListener("mouseenter", () => {
				if (!image.nextElementSibling) return;
				image.nextElementSibling.classList.remove("hidden")
			})
			image.addEventListener("mouseleave", () => {
				if (!image.nextElementSibling) return;
				image.nextElementSibling.classList.add("hidden")
			})
			image.addEventListener("touchmove", () => {
				if (!image.nextElementSibling) return;
				image.nextElementSibling.classList.remove("hidden")
			})
			image.addEventListener("touchend", () => {
				if (!image.nextElementSibling) return;
				image.nextElementSibling.classList.add("hidden")
			})
		}
	}, [])

	return (
		<>
			<Head>
				<title>Media | One with the Riverbed</title>
				<meta
					name="description"
					content="One with the Riverbed is a five-piece post-metal band from Kalamazoo, Michigan. Since in 2017, the band has strived to push the boundaries of the genre."
				/>
			</Head>
			<section className="max-w-3xl mx-auto">
				<H1 title="Media" />
				<section className="text-center">
					<H2 title="Promo Pictures" />
					<div className={s.galleryGrid}>
						{gallery.promo.map(({ link, id }: Photo) => (
							<div className="aspect-[16/9] w-full relative" key={id}>
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
				<section className="text-center">
					<H2 title="Videos" />
					<div className={s.galleryGrid}>
						{gallery.videos.map(({ link }: Video) => (
							<iframe
								key={link}
								className="aspect-[16/9] w-full bg-black"
								src={link}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						))}
					</div>
				</section>
				<section className="text-center">
					<H2 title="Live Pictures" />
					<div className={s.galleryGrid}>
						{gallery.live.map(({ link, id, photographer }: Photo) => (
							<div className="aspect-[16/9] w-full relative" key={id}>
								<Image
									src={link}
									alt={link}
									fill
									loading="lazy"
									// objectFit="cover"
									onClick={() => setActiveImage(link)}
									className={`image object-cover bg-black`}
								/>
								{photographer && <p className={`hidden absolute text-white bg-charcoal/70 bottom-0 py-1 left-0 w-full text-sm`}>Photo by: {photographer}</p>}
							</div>
						))}
					</div>
				</section>
			</section>
			{activeImage ? <ImageModal link={activeImage} /> : null}
		</>
	)
}
