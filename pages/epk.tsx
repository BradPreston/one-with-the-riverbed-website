import { FormEvent, useRef, useState } from "react"
import { AudioPlayer } from "../components/audioPlayer"

type song = {
	title: string
	url: string
}

type Props = {
	data: song[]
}

export async function getStaticProps() {
	const res = await fetch("https://owtr-api.onrender.com", {
		headers: {
			"x-api-key": process.env.API_KEY!
		}
	})
	const data = await res.json()

	return {
		props: {
			data
		}
	}
}

export default function EPK({ data }: Props) {
	const [passwordInput, setPasswordInput] = useState<string>("")
	const [validPassword, setValidPassword] = useState(false)
	const audioElem = useRef<HTMLAudioElement>(null)
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
				setValidPassword(false)
			}
			if (res.status == 200) {
				setValidPassword(true)
			}
		} catch (err) {
			console.log("An error occured: ", err)
		} finally {
			form.current?.reset()
		}
	}

	return (
		<div className="flex justify-center items-center">
			{!validPassword ? (
				<>
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
				</>
			) : (
				<>{data && <AudioPlayer playlist={data}></AudioPlayer>}</>
			)}
		</div>
	)
}
