import { FormEvent, useEffect, useRef, useState } from "react"
import songData from "../data/audio"
import { Player } from "../components/player"

export default function EPK() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [songs, setSongs] = useState(songData)
	const [currentSong, setCurrentSong] = useState(songs[0])
	const [isLoading, setIsLoading] = useState(true)
	const [passwordInput, setPasswordInput] = useState<string>("")
	const [validPassword, setValidPassword] = useState(false)
	const audioElem = useRef<HTMLAudioElement>(null)
	const passwordError = useRef<HTMLDivElement>(null)
	const form = useRef<HTMLFormElement>(null)

	useEffect(() => {
		if (isPlaying) audioElem.current?.play()
		else audioElem.current?.pause()

		if (songs) setIsLoading(false)
		else setIsLoading(true)
	}, [isPlaying, currentSong, songs])

	function onPlaying() {
		const duration = audioElem.current?.duration
		const currentTime = audioElem.current?.currentTime

		if (currentTime && duration)
			currentSong.progress = (currentTime / duration) * 100
		if (duration) currentSong.length = duration

		setCurrentSong({ ...currentSong })
	}

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
				window.location.pathname = "/epk"
			}
		} catch (err) {
			console.log("An error occured: ", err)
		} finally {
			form.current?.reset()
		}
	}

	return (
		<div className="flex justify-center items-center">
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
		</div>
	)
}
