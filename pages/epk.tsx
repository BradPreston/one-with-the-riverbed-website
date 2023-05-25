import { FormEvent, useEffect, useRef, useState } from "react"
import { Player } from "../components/player"
import { AudioPlayer } from "../components/audioPlayer"

// type awsSong = {
// 	awsTitle: string
// 	songTitle: string
// }

// type song = {
// 	title: string
// 	url: string
// 	progress: number
// 	length: number
// }

// export async function getStaticProps() {
// 	const awsSongs = [
// 		{
// 			awsTitle: "pokemon_little_root.mp3",
// 			songTitle: "Pokemon - Little Root"
// 		},
// 		{
// 			awsTitle: "shovel_knight_stirke_the_earth.mp3",
// 			songTitle: "Shovel Knight - Strike the Earth"
// 		}
// 	]

// 	async function getSongData(song: awsSong) {
// 		const res = await fetch("http://localhost:3000/api/getSongs", {
// 			method: "POST",
// 			body: JSON.stringify({
// 				awsTitle: song.awsTitle,
// 				songTitle: song.songTitle
// 			})
// 		})
// 		const data = await res.json()
// 		return data
// 	}

// 	const songs: song[] = await Promise.all(
// 		awsSongs.map((song) => getSongData(song))
// 	)

// 	return {
// 		props: {
// 			songData: songs
// 		}
// 	}
// }

export default function EPK() {
	const [isPlaying, setIsPlaying] = useState(false)
	// const [songs, setSongs] = useState<song[]>()
	// const [currentSong, setCurrentSong] = useState<song>(songData[0])
	const [isLoading, setIsLoading] = useState(true)
	const [passwordInput, setPasswordInput] = useState<string>("")
	const [validPassword, setValidPassword] = useState(false)
	const audioElem = useRef<HTMLAudioElement>(null)
	const passwordError = useRef<HTMLDivElement>(null)
	const form = useRef<HTMLFormElement>(null)

	// useEffect(() => {
	// 	if (isPlaying) audioElem.current?.play()
	// 	else audioElem.current?.pause()

	// 	if (songData) setIsLoading(false)
	// 	else setIsLoading(true)
	// }, [isPlaying, songData, currentSong])

	// function onPlaying() {
	// 	if (currentSong) {
	// 		const duration = audioElem.current?.duration
	// 		const currentTime = audioElem.current?.currentTime

	// 		if (currentTime && duration)
	// 			currentSong.progress = (currentTime / duration) * 100
	// 		if (duration) currentSong.length = duration

	// 		// setCurrentSong({ ...currentSong })
	// 	}
	// }

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
			{/* {!validPassword ? (
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
			) : ( */}
			<>
				{/* {isLoading ? null : ( */}
				<>
					{/* {currentSong ? ( */}
					<>
						{/* <audio
							src={currentSong.url}
							ref={audioElem}
							onTimeUpdate={onPlaying}
						/> */}
						<AudioPlayer></AudioPlayer>
						{/* <Player
							songs={songData}
							// setSongs={setSongs}
							isPlaying={isPlaying}
							setIsPlaying={setIsPlaying}
							audioElem={audioElem}
							currentSong={currentSong}
							setCurrentSong={setCurrentSong}
						/> */}
					</>
					{/* ) : null} */}
				</>
				{/* )} */}
			</>
			{/* )} */}
		</div>
	)
}
