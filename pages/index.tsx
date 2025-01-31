import Head from "next/head"
import Image from "next/image"
import { H2 } from "../components/headings"
import Link from "next/link"

export default function Home() {
	return (
		<>
			<Head>
				<title>Home | One with the Riverbed</title>
				<meta
					name="description"
					content="One with the Riverbed is a five-piece post-metal band from Kalamazoo, Michigan. Since in 2017, the band has strived to push the boundaries of the genre."
				/>
			</Head>
			<p className="fixed bottom-2 left-2 md:top-2 md:right-2 md:left-auto text-sm text-sand z-50 opacity-50">
				Photo by Dr. Polish Matt Photography
			</p>
			<div className="bg w-full flex flex-col items-center justify-center px-24 overflow-y-auto">
				{/* Start mobile logo */}
				<div className="relative w-40 h-40 mb-4 md:hidden">
					<Image
						src="/logo-2023.png"
						alt="One with the Riverbed Logo"
						fill
						loading="eager"
						objectFit="contain"
					/>
				</div>
				{/* end mobile logo */}

				{/* start album cover */}
				<div className="relative w-full aspect-square max-w-[300px]">
					<Image
						src="/images/succumb.jpg"
						alt="Succumb album cover"
						fill
						loading="eager"
						objectFit="contain"
					/>
				</div>
				{/* end album cover */}

				{/* start text */}
				<div className="my-4">
					<H2 title="AVAILABLE NOW" style=" text-xl md:text-5xl text-center" />
					<p className="text-sand text-xs text-center md:text-xl">
						Listen now on all streaming platforms
					</p>
				</div>
				{/* end text */}

				{/* start streaming icons */}
				<div className="flex w-full relative justify-between gap-[8vw] max-w-[300px] md:gap-16 md:mb-24">
					<Link
						href="https://open.spotify.com/album/45CxVS0nej0EEl9qap5UBZ?si=_pvzTtOsTluw_weatXiKVQ"
						title="Stream Succumb on Spotify"
						className="w-1/3 aspect-square relative"
					>
						<Image
							src="/images/spotify-logo.png"
							alt="Spotify logo"
							fill
							objectFit="contain"
						/>
					</Link>
					<Link
						href="https://music.apple.com/us/album/succumb/1775686654"
						title="Stream Succumb on Apple Music"
						className="w-1/3 aspect-square relative"
					>
						<Image
							src="/images/apple-music-logo.png"
							alt="Apple Music logo"
							fill
							objectFit="contain"
						/>
					</Link>
					<Link
						href="https://music.youtube.com/playlist?list=OLAK5uy_mmH0ODN79RXsCd-N_10tgXYoydvJUPkfc&si=WCb7RHVtRO_yEtto"
						title="Stream Succumb on YouTube Music"
						className="w-1/3 aspect-square relative"
					>
						<Image
							src="/images/youtube-music-logo.png"
							alt="YouTube Music logo"
							fill
							objectFit="contain"
						/>
					</Link>
				</div>
				{/* end streaming icons */}
			</div>
		</>
	)
}
