import Image from "next/image"
import { AlbumType, Review } from "../../types/Album"
import { H2, H3 } from "../headings"
import { ButtonBase } from "../buttons"

export default function Album(album: AlbumType) {
	return (
		<>
			<section className="max-w-3xl mx-auto grid mb-3 text-sand grid-cols-2 max-[400px]:grid-cols-1">
				<div className="aspect-square w-full relative">
					<Image
						src={album.album_image_src}
						alt={`${album.title} cover art`}
						fill
					/>
				</div>
				<div className="flex-col mr-6 ml-4 max-[400px]:ml-0 max-[400px]:mt-4 relative w-full">
					<H2 title={album.title} />
					<H3 style="text-md" title="Tracklist" />
					<ol className="list-decimal pl-6 mb-3">
						{album.tracklist.map((track: string) => (
							<li key={track}>{track}</li>
						))}
					</ol>
					<div className="md:block max-md:hidden">
						<p>Released: {album.release_date}</p>
						{album.features ? <p>Features: {album.features}</p> : null}
						<p>Album Artwork Artist: {album.artwork_artist}</p>
						{album.logo_artist ? <p>Logo Artist: {album.logo_artist}</p> : null}
						<p>{album.studio}</p>
					</div>
				</div>
			</section>
			<section className="md:hidden max-md:block text-sand mb-5 ">
				<p>Released: {album.release_date}</p>
				{album.features ? <p>Features: {album.features}</p> : null}
				<p>Album Artwork Artist: {album.artwork_artist}</p>
				{album.logo_artist ? <p>Logo Artist: {album.logo_artist}</p> : null}
				<p>{album.studio}</p>
			</section>
			<section className="max-w-3xl mx-auto mb-10">
				<H2 title="Reviews" />
				<ul className="grid sm:grid-cols-2 gap-4">
					{album.reviews.map((review: Review) => (
						<li key={review.review_link} className="mb-10">
							<H3 style="text-md" title={review.author} />
							<p className="mb-5 text-sand">{review.excerpt}</p>
							<ButtonBase
								style="text-sm"
								href={review.review_link}
								target="_blank"
								title="View More"
							/>
						</li>
					))}
				</ul>
			</section>
		</>
	)
}
