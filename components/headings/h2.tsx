import { twMerge } from "tailwind-merge"

type Props = {
	style?: string
	title: string
}

export default function H2({ style, title }: Props) {
	const classes = twMerge(`text-sand font-bold text-2xl ${style ?? ""}`)
	return <h2 className={classes}>{title}</h2>
}
