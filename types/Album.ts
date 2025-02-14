export type AlbumType = {
	title: string
	tracklist: string[]
	release_date: string
	studio: string
	features: string
	artwork_artist: string
	logo_artist: string
	album_image_src: string
	streaming_links?: StreamingLink[]
}

type StreamingLink = {
	src: 'youtube-music' | 'apple-music' | 'spotify'
	link: string
}
