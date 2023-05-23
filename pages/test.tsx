import { useEffect, useState } from "react"

export default function Test() {
	const [isAuthorized, setIsAuthorized] = useState(false)

	useEffect(() => {
		if (!document.referrer.includes("/verify")) {
			setIsAuthorized(false)
			window.location.pathname = "/verify"
		} else {
			setIsAuthorized(true)
		}
	}, [isAuthorized])

	return <>{isAuthorized ? <h1>Hello</h1> : null}</>
}
