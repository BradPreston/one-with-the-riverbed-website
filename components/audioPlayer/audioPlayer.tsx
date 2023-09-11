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
	const [currentSong, setCurrentSong] = useState<song>(playlist[0])
	const [songsWithUrls, setSongsWithUrls] = useState<song[]>()
	let [currentSongIndex, setCurrentSongIndex] = useState(0)

	// refs
	const audioPlayer = useRef<HTMLAudioElement>(null) // reference audio component
	const animationRef = useRef<number>() // references the animation

	useEffect(() => {
		const songs: song[] = []
		playlist.forEach((song: song) => {
			if (song.url) songs.push(song)
		})
		setSongsWithUrls(songs)
	}, [playlist])

	useEffect(() => {
		if (currentSong && currentSong.url) {
			audioPlayer.current!.src = currentSong.url
		}
	}, [currentSong])

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
		if (audioPlayer.current!.title === "Burden") {
			if (audioPlayer!.current?.ended) {
				setIsPlaying(false)
				cancelAnimationFrame(animationRef.current!)
				setCurrentSongIndex(0)
				setCurrentSong(songsWithUrls![0])
				audioPlayer.current?.pause()
			}
		} else {
			if (audioPlayer!.current?.ended) {
				setCurrentSongIndex(++currentSongIndex)
				setCurrentSong(songsWithUrls![currentSongIndex])
				setIsPlaying(true)
				setTimeout(() => audioPlayer.current?.play(), 500)
			}
		}
	}

	function backTen() {
		audioPlayer.current!.currentTime -= 10
	}

	function forwardTen() {
		audioPlayer.current!.currentTime += 10
	}

	function prevSong() {
		animationRef.current = requestAnimationFrame(whilePlaying)

		if (currentSong == songsWithUrls![0]) {
			setCurrentSongIndex(2)
			setCurrentSong(songsWithUrls![2])
			setIsPlaying(true)
			setTimeout(() => audioPlayer.current?.play(), 500)
		} else {
			setCurrentSongIndex(--currentSongIndex)
			setCurrentSong(songsWithUrls![currentSongIndex])
			setIsPlaying(true)
			setTimeout(() => audioPlayer.current?.play(), 500)
		}
	}

	function chooseSong(song: song) {
		animationRef.current = requestAnimationFrame(whilePlaying)
		const currentIndex = songsWithUrls!.indexOf(song)
		setCurrentSongIndex(currentIndex)
		setCurrentSong(songsWithUrls![currentIndex])
		setIsPlaying(true)
		setTimeout(() => audioPlayer.current?.play(), 500)
	}

	function nextSong() {
		animationRef.current = requestAnimationFrame(whilePlaying)

		const currentIndex = songsWithUrls!.indexOf(currentSong!)

		if (currentIndex === songsWithUrls!.length - 1) {
			setCurrentSongIndex(0)
			setCurrentSong(songsWithUrls![0])
			setIsPlaying(true)
			setTimeout(() => audioPlayer.current?.play(), 500)
		} else {
			setCurrentSongIndex(++currentSongIndex)
			setCurrentSong(songsWithUrls![currentSongIndex])
			setIsPlaying(true)
			setTimeout(() => audioPlayer.current?.play(), 500)
		}
	}

	// function skipToEnd() {
	// 	audioPlayer.current!.currentTime = audioPlayer.current!.duration - 1
	// }

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
						{/* <button onClick={skipToEnd}>Skip to end</button> */}
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
										onClick={() => chooseSong(song)}
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
