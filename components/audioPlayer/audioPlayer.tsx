import { useState, useRef, useEffect, MouseEvent } from "react"
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { GrForwardTen, GrBackTen } from "react-icons/gr"
import styles from "./audioPlayer.module.css"

type song = {
	title: string
	url: string
}

type Props = {
	playlist: song[]
}

export default function AudioPlayer({ playlist }: Props) {
	// state
	const [isPlaying, setIsPlaying] = useState(false)
	const [duration, setDuration] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)
	const [currentSong, setCurrentSong] = useState<song>()

	// refs
	const audioPlayer = useRef<HTMLAudioElement>(null) // reference audio component
	// const progressBar = useRef<HTMLInputElement>(null) // reference to progress bar
	const animationRef = useRef<number>() // references the animation

	// useEffect
	useEffect(() => {
		if (audioPlayer.current) {
			const seconds = Math.floor(audioPlayer.current.duration)
			setDuration(seconds)
			// progressBar.current!.max = seconds.toString()
		}
	}, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState])

	useEffect(() => {
		if (currentSong) {
			audioPlayer.current!.src = currentSong.url

			audioPlayer.current!.onloadedmetadata = function () {
				const seconds = Math.floor(audioPlayer!.current!.duration)
				setDuration(seconds)
				// progressBar.current!.max = seconds.toString()
				setIsPlaying(true)
				audioPlayer.current!.play()
			}
		}
	}, [currentSong])

	function calculateTime(secs: number) {
		const minutes = Math.floor(secs / 60)
		const seconds = Math.floor(secs % 60)
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
		return `${minutes}:${returnedSeconds}`
	}

	function togglePlayPause() {
		if (audioPlayer.current!.src !== "") {
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
	}

	// function updateProgressBar() {
	// 	progressBar.current!.style.setProperty(
	// 		"--seek-before-width",
	// 		`${(parseInt(progressBar.current!.value) / duration) * 100}%`
	// 	)
	// 	setCurrentTime(parseInt(progressBar.current!.value))
	// }

	function whilePlaying() {
		// progressBar.current!.value = audioPlayer.current!.currentTime.toString()
		// updateProgressBar()
		animationRef.current = requestAnimationFrame(whilePlaying)
		if (audioPlayer.current?.currentTime === audioPlayer.current?.duration) {
			setIsPlaying(false)
		}
	}

	function changeRange() {
		// audioPlayer.current!.currentTime = parseInt(progressBar.current!.value)
		// updateProgressBar()
	}

	function backTen() {
		audioPlayer.current!.currentTime -= 10
	}

	function forwardTen() {
		audioPlayer.current!.currentTime += 10
	}

	function prevSong() {
		if (currentSong == playlist[0]) {
			setCurrentSong(playlist[playlist.length - 1])
		} else {
			const currentIndex = playlist.indexOf(currentSong!)
			setCurrentSong(playlist[currentIndex - 1])
		}
	}

	function nextSong() {
		const currentIndex = playlist.indexOf(currentSong!)
		if (currentIndex === playlist.length - 1) {
			setCurrentSong(playlist[0])
		} else {
			setCurrentSong(playlist[currentIndex + 1])
		}
	}

	return (
		<div className={styles.audioPlayer}>
			<>
				<div className={styles.controls}>
					<audio
						ref={audioPlayer}
						preload="metadata"
						src={undefined}
						onChange={changeRange}
					></audio>
					<div className={styles.audioBtns}>
						<button
							className={styles.forwardBackward}
							onClick={prevSong}
							title="Previous song"
						>
							<FaStepBackward />
						</button>
						<button
							className={styles.forwardBackward}
							onClick={backTen}
							title="Go back 10 seconds"
						>
							<GrBackTen />
						</button>
						<button
							className={styles.playPause}
							onClick={togglePlayPause}
							title={isPlaying ? "Pause" : "Play"}
						>
							{isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
						</button>
						<button
							className={styles.forwardBackward}
							onClick={forwardTen}
							title="Go forward 10 seconds"
						>
							<GrForwardTen />
						</button>
						<button
							className={styles.forwardBackward}
							onClick={nextSong}
							title="Next song"
						>
							<FaStepForward />
						</button>
					</div>

					{/* progress bar */}
					{/* <div className={styles.progressBarWrapper}>
						<div className={styles.currentTime}>
							{calculateTime(currentTime)}
						</div>
						<input
							type="range"
							className={styles.progressBar}
							defaultValue="0"
							ref={progressBar}
							onChange={changeRange}
						/>
						<div className={styles.duration}>
							{duration && !isNaN(duration) ? calculateTime(duration) : "0:00"}
						</div>
					</div> */}
					<p className={styles.currentSong}>
						{currentSong ? currentSong.title : ""}
					</p>
				</div>

				<div className={styles.playlist}>
					<ul>
						{playlist.map((song: song, track: number) => (
							<li key={song.title}>
								<button
									onClick={() => setCurrentSong(song)}
									className={styles.song}
									title={`Play ${song.title}`}
								>
									{track + 1}. {song.title}
								</button>
							</li>
						))}
					</ul>
				</div>
			</>
		</div>
	)
}
