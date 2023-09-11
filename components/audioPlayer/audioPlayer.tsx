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
	let [currentSongIndex, setCurrentSongIndex] = useState(0);

	// refs
	const audioPlayer = useRef<HTMLAudioElement>(null) // reference audio component
	const animationRef = useRef<number>() // references the animation

	useEffect(() => {
		const songs: song[] = []
		playlist.forEach((song: song) => {
			if (song.url) songs.push(song)
		})
		setSongsWithUrls(songs)
		setCurrentSong(songs[currentSongIndex])
		if (currentSong && currentSong.url) {
			audioPlayer.current!.src = currentSong.url;
		}
	}, [playlist, currentSong, currentSongIndex])

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

		if (audioPlayer!.current?.ended) {
			setCurrentSongIndex(++currentSongIndex)
			if (currentSongIndex === songsWithUrls?.length) {
				setIsPlaying(false);
				audioPlayer.current?.pause();
			} else {
				setCurrentSong(songsWithUrls![currentSongIndex]);
				setIsPlaying(true);
				setTimeout(() => audioPlayer.current?.play(), 500);
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
		if (currentSong == songsWithUrls![0]) {
			setCurrentSongIndex(songsWithUrls!.length - 1);
			setCurrentSong(songsWithUrls![currentSongIndex])
			setIsPlaying(true);
			setTimeout(() => audioPlayer.current?.play(), 500);
		} else {
			setCurrentSongIndex(--currentSongIndex);
			setCurrentSong(songsWithUrls![currentSongIndex])
			setIsPlaying(true);
			setTimeout(() => audioPlayer.current?.play(), 500);
		}
	}

	function chooseSong(song: song) {
		setCurrentSongIndex(songsWithUrls!.indexOf(song))
		setCurrentSong(songsWithUrls![currentSongIndex])
		setIsPlaying(true);
		setTimeout(() => audioPlayer.current?.play(), 500);
	}

	function nextSong() {
		const currentIndex = songsWithUrls!.indexOf(currentSong!)

		if (currentIndex === songsWithUrls!.length - 1) {
			setCurrentSongIndex(0);
			setCurrentSong(songsWithUrls![currentSongIndex])
			setIsPlaying(true);
			setTimeout(() => audioPlayer.current?.play(), 500);
		} else {
			setCurrentSongIndex(++currentSongIndex);
			setCurrentSong(songsWithUrls![currentSongIndex])
			setIsPlaying(true);
			setTimeout(() => audioPlayer.current?.play(), 500);
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
