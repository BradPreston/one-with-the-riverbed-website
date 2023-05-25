import { useState, useRef, useEffect } from "react"
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { FaPlay, FaPause } from "react-icons/fa"
import styles from "./audioPlayer.module.css"

type song = {
	title: string
	url: string
	progress: number
	length: number
}

export default function AudioPlayer() {
	// state
	const [isPlaying, setIsPlaying] = useState(false)
	const [duration, setDuration] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)
	const [playlist, setPlaylist] = useState<song[]>()
	const [currentSong, setCurrentSong] = useState<song>()

	// refs
	const audioPlayer = useRef<HTMLAudioElement>(null) // reference audio component
	const progressBar = useRef<HTMLInputElement>(null) // reference to progress bar
	const animationRef = useRef<number>() // references the animation

	// useEffect
	useEffect(() => {
		if (audioPlayer.current) {
			const seconds = Math.floor(audioPlayer.current.duration)
			setDuration(seconds)
			progressBar.current!.max = seconds.toString()
		}
	}, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState])

	useEffect(() => {
		if (currentSong) audioPlayer.current!.src = currentSong.url
	}, [currentSong])

	useEffect(() => {
		type awsSong = {
			awsTitle: string
			songTitle: string
		}

		const awsSongs = [
			{
				awsTitle: "pokemon_little_root.mp3",
				songTitle: "Pokemon - Little Root"
			},
			{
				awsTitle: "shovel_knight_stirke_the_earth.mp3",
				songTitle: "Shovel Knight - Strike the Earth"
			}
		]

		async function getSongData(song: awsSong) {
			const res = await fetch("http://localhost:3000/api/getSongs", {
				method: "POST",
				body: JSON.stringify({
					awsTitle: song.awsTitle,
					songTitle: song.songTitle
				})
			})
			const data = await res.json()
			return data
		}

		Promise.all(awsSongs.map((song: awsSong) => getSongData(song))).then(
			(songs: song[]) => setPlaylist(songs)
		)
	}, [])

	function calculateTime(secs: number) {
		const minutes = Math.floor(secs / 60)
		const seconds = Math.floor(secs % 60)
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
		return `${minutes}:${returnedSeconds}`
	}

	function togglePlayPause() {
		// get the value of isPlaying before updating it on the next line
		const prevValue = isPlaying
		setIsPlaying(!prevValue)

		if (!prevValue) {
			audioPlayer.current?.play()
			animationRef.current = requestAnimationFrame(whilePlaying)
		} else {
			audioPlayer.current?.pause()
			cancelAnimationFrame(animationRef.current!)
		}
	}

	function updateProgressBar() {
		progressBar.current!.style.setProperty(
			"--seek-before-width",
			`${(parseInt(progressBar.current!.value) / duration) * 100}%`
		)
		setCurrentTime(parseInt(progressBar.current!.value))
	}

	function whilePlaying() {
		progressBar.current!.value = audioPlayer.current!.currentTime.toString()
		updateProgressBar()
		animationRef.current = requestAnimationFrame(whilePlaying)
	}

	function changeRange() {
		audioPlayer.current!.currentTime = parseInt(progressBar.current!.value)
		updateProgressBar()
	}

	return (
		<div className={styles.audioPlayer}>
			<audio
				ref={audioPlayer}
				preload="metadata"
				src={playlist && playlist[0].url}
				onChange={changeRange}
			></audio>
			<button className={styles.forwardBackward}>
				<BsArrowLeftShort /> 30
			</button>
			<button className={styles.playPause} onClick={togglePlayPause}>
				{isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
			</button>
			<button className={styles.forwardBackward}>
				30 <BsArrowRightShort />
			</button>

			{/* current time */}
			<div className={styles.currentTime}>{calculateTime(currentTime)}</div>

			{/* progress bar */}
			<div>
				<input
					type="range"
					className={styles.progressBar}
					defaultValue="0"
					ref={progressBar}
					onChange={changeRange}
				/>
			</div>

			{/* duration */}
			<div className={styles.duration}>
				{duration && !isNaN(duration) ? calculateTime(duration) : "0:00"}
			</div>

			<ul>
				{playlist?.map((song: song) => (
					<li key={song.title}>
						<button onClick={() => setCurrentSong(song)}>{song.title}</button>
					</li>
				))}
			</ul>
		</div>
	)
}
