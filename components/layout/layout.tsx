import { ReactElement } from "react"
import { Header } from "../../components/header"

export default function Layout({ children }: { children: ReactElement }) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	)
}
