import { H1 } from "../components/headings"
import { useState, useEffect } from "react"
import useSWR from "swr"
import { ShowDate } from "../components/shows"
import { Show, APIShow } from "../types/Shows"
import moment from "moment"
import Head from "next/head"

export default function Shows() {
	// @ts-ignore
	const fetcher = (...args) => fetch(...args).then((res) => res.json())
	const { data, error } = useSWR(
		'/api/getShowDates',
		fetcher
	)

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
			</Head>
			<section className="max-w-3xl mx-auto">
				<H1 title="Show Dates" />
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
			</section>
		</>
	)
}
