import { FormEvent, useRef, useState } from "react"

export default function EPK() {
	const [passwordInput, setPasswordInput] = useState<string>("")
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
				window.location.pathname = "/succumb"
			}
		} catch (err) {
			console.log("An error occured: ", err)
		} finally {
			form.current?.reset()
		}
	}

	return (
		<div className="flex justify-center items-center">
			<form ref={form} onSubmit={submitPass} className="flex flex-col gap-5">
				<h2 className="text-sand text-center text-lg">
					Password is required to access the press kit
				</h2>
				<input
					type="password"
					name="password"
					onChange={(e) => setPasswordInput(e.target.value)}
					className="mr-4 mt-3 w-full py-2 px-5 rounded"
					placeholder="password"
				/>
				<input
					className="transition duration-150 
  px-7 py-3 
  font-bold 
  text-base 
  bg-sand 
  uppercase
  rounded
  text-charcoal 
  hover:text-sand 
  hover:bg-charcoal "
					type="submit"
					value="Submit"
				/>
			</form>
			<div className="absolute top-20 text-error text-center" ref={passwordError}></div>
		</div>
	)
}
