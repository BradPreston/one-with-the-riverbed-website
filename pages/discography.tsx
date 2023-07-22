import { H1 } from "../components/headings"
const albums = require("../data/albums.json")
import { Album } from "../components/album"
import { AlbumType } from "../types/Album"
import Head from "next/head"

export default function Discography() {
	return (
		<>
			<Head>
				<title>Discography | One with the Riverbed</title>
				<meta
					name="description"
					content="One with the Riverbed is a five-piece post-metal band from Kalamazoo, Michigan. Since in 2017, the band has strived to push the boundaries of the genre."
				/>
			</Head>
			<section className="max-w-3xl mx-auto overflow-hidden">
				<H1 title="Discography" />
				<>
					{albums.map((album: AlbumType) => (
						<Album
							key={album.title}
							title={album.title}
							release_date={album.release_date}
							features={album.features}
							artwork_artist={album.artwork_artist}
							logo_artist={album.logo_artist}
							studio={album.studio}
							album_image_src={album.album_image_src}
							tracklist={album.tracklist}
							reviews={album.reviews}
						/>
					))}
				</>
			</section>
		</>
	)
}
