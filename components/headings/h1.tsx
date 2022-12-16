import { twMerge } from "tailwind-merge"

type Props = {
	style?: string
	title: string
}

export default function H1({ style, title }: Props) {
	const classes = twMerge(
		`text-sand text-center font-bold text-4xl mb-10 ${style ?? ""}`
	)
	return <h1 className={classes}>{title}</h1>
}
