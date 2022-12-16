export type AlbumType = {
	title: string
	tracklist: string[]
	release_date: string
	studio: string
	features: string
	artwork_artist: string
	logo_artist: string
	album_image_src: string
	reviews: Review[]
}

export type Review = {
	author: string
	review_link: string
	excerpt: string
}
