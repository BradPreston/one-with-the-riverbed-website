import { twMerge } from "tailwind-merge"

type Props = {
	style?: string
	title: string
}

export default function H3({ style, title }: Props) {
	const classes = twMerge(`text-sand font-bold text-2xl ${style ?? ""}`)
	return <h3 className={classes}>{title}</h3>
}
