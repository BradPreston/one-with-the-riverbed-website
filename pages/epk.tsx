import { FormEvent, useRef, useState } from "react"

export default function EPK() {
	const [passwordInput, setPasswordInput] = useState<string>("")
	const [validPassword, setValidPassword] = useState(false)
	const passwordError = useRef<HTMLDivElement>(null)
	const form = useRef<HTMLFormElement>(null)

	async function submitPass(e: FormEvent) {
		e.preventDefault()
		try {
			const res = await fetch("/api/verifyPassword", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					password: passwordInput
				})
			})
			if (res.status == 401) {
				passwordError.current!.innerText = "Incorrect password"
			}
			if (res.status == 200) {
				window.location.href = "http://localhost:3000/owtr-epk"
			}
		} catch (err) {
			console.log("An error occured: ", err)
		} finally {
			form.current?.reset()
		}
	}

	return (
		<div className="flex justify-center items-center">
			<form ref={form} onSubmit={submitPass}>
				<input
					type="password"
					name="password"
					onChange={(e) => setPasswordInput(e.target.value)}
					className="mr-4"
				/>
				<input type="submit" value="Submit" />
			</form>
			<div className="absolute top-20" ref={passwordError}></div>
		</div>
	)
}
