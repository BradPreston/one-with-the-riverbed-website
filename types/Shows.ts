export type APIArtist = {
	artist_optin_show_phone_number: boolean
	facebook_page_url: string
	id: string
	image_url: string
	links: string
	mbid: string
	name: string
	Options: {
		display_listen_unit: boolean
	}
	show_multi_ticket: boolean
	support_url: string
	thumb_url: string
	tracker_count: number
	tracking: any[]
	upcoming_event_count: number
	url: string
}

export type APIVenue = {
	city: string
	country: string
	latitude: string
	location: string
	longitude: string
	name: string
	postal_code: string
	region: string
	street_address: string
}

export type APIShow = {
	artist: APIArtist
	artist_id: string
	bandsintown_plus: boolean
	datetime: string
	datetime_display_rule: string
	description: string
	ends_at: string
	festival_datetime_display_rule: string
	festival_end_date: string
	festival_start_date: string
	id: string
	lineup: string[]
	offers: any[]
	on_sale_datetime: string
	starts_at: string
	title: string
	url: string
	venue: APIVenue
}

export type Show = {
	id?: string
	date: string
	venue: string
	location: string
	purchase_tickets_url: string
}

export type APIShows = {
	shows: APIShow[]
}
