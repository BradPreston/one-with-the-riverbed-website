import { Show } from "../../types/Shows"
import { H2, H3 } from "../../components/headings"
import { ButtonBase } from "../../components/buttons"
import { twMerge } from "tailwind-merge"
import { useState, useEffect } from "react"

export default function ShowDate(
	{ date, venue, location, show_info_url }: Show,
	style: string
) {
	const classes = twMerge(
		`border-b border-sand flex justify-between items-center py-4 ${style ?? ""}`
	)
	const [isMobile, setIsMobile] = useState<Boolean>()

	useEffect(() => {
		if (window.screen.width <= 900) setIsMobile(true)
		else setIsMobile(false)

		window.addEventListener("resize", function () {
			if (window.screen.width <= 900) setIsMobile(true)
			else setIsMobile(false)
		})
	}, [])

	return (
		<div className={classes}>
			<div className="flex flex-col">
				<div className="flex flex-row	max-[700px]:flex-col max-[700px]:items-start">
					<H2 style="text-base pr-3" title={date} />
					<H3 style="text-base font-normal" title={venue} />
				</div>
				{isMobile === true ? (
					<p className="pr-3 text-sand">{location}</p>
				) : null}
			</div>
			<div className="flex items-center">
				{isMobile === false ? (
					<p className="pr-3 text-sand">{location}</p>
				) : null}
				<ButtonBase
					title="Info"
					href={show_info_url}
					target="_blank"
					style="max-md:py-2 max-md:px-5"
				/>
			</div>
		</div>
	)
}
