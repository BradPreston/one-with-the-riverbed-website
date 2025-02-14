import Image from "next/image"
import { AlbumType } from "../../types/Album"
import { H2, H3 } from "../headings"
import Link from "next/link"

export default function Album(album: AlbumType) {
	return (
		<div className="mb-16">
			<section className="max-w-3xl mx-auto flex mb-1 text-sand">
				<div className="aspect-square w-full relative max-w-lg mx-auto">
					<Image
						src={album.album_image_src}
						alt={`${album.title} cover art`}
						fill
						objectFit="contain"
					/>
				</div>
				{/* <div className="flex-col mr-6 mt-4 sm:ml-4 sm:mt-0 relative md:hidden">
					<div>
						<H2 style="text-3xl" title={album.title} />
						<H3 style="text-md" title="Tracklist" />
						<ol className="list-decimal pl-6 mb-3">
							{album.tracklist.map((track: string) => (
								<li key={track}>{track}</li>
							))}
						</ol>
					</div>
				</div> */}
			</section>
			<H2
				style="text-3xl mb-4 hidden md:block max-w-lg mx-auto"
				title={album.title}
			/>
			<div className="flex max-w-lg mx-auto flex-col-reverse sm:flex-row">
				<div className="w-full md:w-1/2">
					<section className="block text-sand mb-5 ">
						<p>
							<strong>Released</strong>: {album.release_date}
						</p>
						{album.features ? (
							<p>
								<strong>Features</strong>: {album.features}
							</p>
						) : null}
						<p>
							<strong>Album Artwork Artist</strong>: {album.artwork_artist}
						</p>
						{album.logo_artist ? (
							<p>
								<strong>Logo Artist</strong>: {album.logo_artist}
							</p>
						) : null}
						<p>{album.studio}</p>
					</section>
					{album.streaming_links && (
						<div className="gap-4 my-4 flex">
							{album.streaming_links?.map(({ src, link }) => (
								<Link
									key={src}
									href={link}
									title={`Stream ${album.title} on ${src.replace("-", " ")}`}
									className=" w-10 aspect-square relative"
								>
									<Image
										src={`/images/${src}-logo.png`}
										alt={`${src.replace("-", " ")} logo`}
										width={50}
										height={50}
									/>
								</Link>
							))}
						</div>
					)}
				</div>
				<div className="flex-col mr-6 sm:ml-10 relative w-1/2 text-sand block md:block">
					<H3 style="text-md" title="Tracklist" />
					<ol className="list-decimal pl-6 mb-3">
						{album.tracklist.map((track: string) => (
							<li key={track}>{track}</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	)
}
