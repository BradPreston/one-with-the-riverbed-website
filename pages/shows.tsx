import { H1 } from "../components/headings"
import { useState, useEffect } from "react"
import { ShowDate } from "../components/shows"
import { Show, APIShow } from "../types/Shows"
import { Spinner } from "../components/ui"
import moment from "moment"
import Head from "next/head"

export default function Shows() {
	const [data, setData] = useState<APIShow[] | null>(null)
	const [fetching, setFetching] = useState(true)

	useEffect(() => {
		setFetching(true)
		fetch("/api/getShowDates")
			.then((res) => res.json())
			.then((data) => {
				if (data.length) {
					setData(data)
				} else {
					setData(null)
				}
				setFetching(false)
			})
	}, [])

	const showDates = data?.map((show: APIShow) => {
		let dt = moment(show.starts_at, "YYYY-MM-DD HH:mm:ss")
		let day = dt.format("dddd").substring(0, 3)
		let month = dt.format("MMMM").substring(0, 3)
		let year = dt.format("YYYY")

		let info: Show = {
			id: show.id,
			show_info_url: show.url.replace(`app_id=${process.env.APP_ID}`, ""),
			venue: show.venue.name,
			date: `${day}, ${month.toUpperCase()} ${dt.date()}, ${year}`,
			location: show.venue.location
		}
		return info
	})

	return (
		<>
			<Head>
				<title>Show Dates | One with the Riverbed</title>
				<meta
					name="description"
					content="One with the Riverbed is a five-piece post-metal band from Kalamazoo, Michigan. Since in 2017, the band has strived to push the boundaries of the genre."
				/>
			</Head>
			<section className="max-w-3xl mx-auto">
				<H1 title="Show Dates" />
				{fetching ? (
					<Spinner />
				) : data ? (
					<ul>
						{showDates?.map((show: Show) => (
							<li key={show.id}>
								<ShowDate
									date={show.date}
									venue={show.venue}
									location={show.location}
									show_info_url={show.show_info_url}
								/>
							</li>
						))}
					</ul>
				) : (
					<p className="text-sand text-xl text-center">No upcoming shows.</p>
				)}
			</section>
		</>
	)
}
