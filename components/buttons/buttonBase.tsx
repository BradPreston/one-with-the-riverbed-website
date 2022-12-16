import { twMerge } from "tailwind-merge"

interface Button {
	href: string
	target?: "_blank" | "_self"
	title: string
	style?: string
	onClick?: { (): void }
}
export default function ButtonBase({ href, target, title, style }: Button) {
	const classes = twMerge(`
  transition duration-150 
  px-7 py-3 
  font-bold 
  text-base 
  bg-sand 
  uppercase
  rounded
  text-charcoal 
  hover:text-sand 
  hover:bg-charcoal 
  ${style ?? ""}`)
	return (
		<a href={href} target={target} className={classes}>
			{title}
		</a>
	)
}
