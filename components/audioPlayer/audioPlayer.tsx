import { useState, useRef, useEffect } from "react"
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { GrForwardTen, GrBackTen } from "react-icons/gr"
import styles from "./audioPlayer.module.css"

type song = {
	title: string
	url?: string
}

type Props = {
	playlist: song[]
}

export default function AudioPlayer({ playlist }: Props) {
	// state
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentSong, setCurrentSong] = useState<song>()
	const [songsWithUrls, setSongsWithUrls] = useState<song[]>()

	// refs
	const audioPlayer = useRef<HTMLAudioElement>(null) // reference audio component
	const animationRef = useRef<number>() // references the animation

	// useEffect
	useEffect(() => {
		if (currentSong && currentSong.url) {
			audioPlayer.current!.src = currentSong.url

			audioPlayer.current!.onloadedmetadata = function () {
				const seconds = Math.floor(audioPlayer!.current!.duration)
				setIsPlaying(true)
				audioPlayer.current!.play()
			}
		}
	}, [currentSong])

	useEffect(() => {
		const songs: song[] = []
		playlist.forEach((song: song) => {
			if (song.url) songs.push(song)
		})
		setSongsWithUrls(songs)
	}, [playlist])

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

	function whilePlaying() {
		animationRef.current = requestAnimationFrame(whilePlaying)
		if (audioPlayer.current?.currentTime === audioPlayer.current?.duration) {
			setIsPlaying(false)
		}
	}

	function backTen() {
		audioPlayer.current!.currentTime -= 10
	}

	function forwardTen() {
		audioPlayer.current!.currentTime += 10
	}

	function prevSong() {
		if (currentSong == songsWithUrls![0]) {
			setCurrentSong(songsWithUrls![songsWithUrls!.length - 1])
		} else {
			const currentIndex = songsWithUrls!.indexOf(currentSong!)
			setCurrentSong(songsWithUrls![currentIndex - 1])
		}
	}

	function nextSong() {
		const currentIndex = songsWithUrls!.indexOf(currentSong!)

		if (currentIndex === songsWithUrls!.length - 1) {
			setCurrentSong(songsWithUrls![0])
		} else {
			setCurrentSong(songsWithUrls![currentIndex + 1])
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
						title={currentSong?.title}
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

					<p className={styles.currentSong}>
						{currentSong ? currentSong.title : ""}
					</p>
				</div>

				<div className={styles.playlist}>
					<ul>
						{playlist.map((song: song, track: number) => (
							<li key={song.title}>
								{song.url ? (
									<button
										onClick={() => setCurrentSong(song)}
										className={styles.song}
										title={`Play ${song.title}`}
									>
										{track + 1}. {song.title}
									</button>
								) : (
									<p className={styles.titleOnly}>
										{track + 1}. {song.title}
									</p>
								)}
							</li>
						))}
					</ul>
				</div>
			</>
		</div>
	)
}
