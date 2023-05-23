import {
	ChangeEvent,
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useRef,
	useState
} from "react"
import {
	BsFillPlayCircleFill,
	BsFillPauseCircleFill,
	BsPlayCircle,
	BsPauseCircle,
	BsFillVolumeUpFill
} from "react-icons/bs"
import styles from "./player.module.css"

type song = {
	title: string
	url: string
	progress: number
	length: number
}

type props = {
	songs: song[]
	setSongs: Dispatch<SetStateAction<song[]>>
	isPlaying: boolean
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	audioElem: MutableRefObject<any>
	currentSong: song
	setCurrentSong: Dispatch<SetStateAction<song>>
}

export default function Player({
	songs,
	setSongs,
	isPlaying,
	setIsPlaying,
	audioElem,
	currentSong,
	setCurrentSong
}: props) {
	const [isPlayHovered, setIsPlayHovered] = useState(false)
	const [isPauseHovered, setIsPauseHovered] = useState(false)
	const clickRef = useRef<HTMLDivElement>(null)
	let songTime = new Date(currentSong?.length * 1000)

	function playPause() {
		setIsPlaying(!isPlaying)
	}

	function checkWidth(e: any) {
		const width = clickRef.current?.clientWidth
		const offset = e.nativeEvent.offsetX
		let divProgress: number

		if (width && offset) {
			divProgress = (offset / width) * 100
			audioElem.current.currentTime = (divProgress / 100) * currentSong?.length
		}
	}

	function adjustVolume(e: ChangeEvent<HTMLInputElement>) {
		audioElem.current.volume = parseInt(e.target.value) / 100
	}

	function selectSong(selectedSong: song) {
		if (currentSong != selectedSong) {
			setCurrentSong(selectedSong)
			setIsPlaying(true)
		}
	}

	return (
		<div className={styles.player_container}>
			<div className={styles.title}>
				<p>Currently playing: {currentSong?.title}</p>
			</div>
			<div className={styles.navigation}>
				<div>
					{isPlaying ? (
						<>
							{isPauseHovered ? (
								<BsPauseCircle
									className={`${styles.btn_action} ${styles.pp}`}
									onClick={playPause}
									onMouseLeave={() => setIsPauseHovered(false)}
								/>
							) : (
								<BsFillPauseCircleFill
									className={`${styles.btn_action} ${styles.pp}`}
									onClick={playPause}
									onMouseEnter={() => setIsPauseHovered(true)}
								/>
							)}
						</>
					) : (
						<>
							{isPlayHovered ? (
								<BsPlayCircle
									className={`${styles.btn_action} ${styles.pp}`}
									onClick={playPause}
									onMouseLeave={() => setIsPlayHovered(false)}
								/>
							) : (
								<BsFillPlayCircleFill
									className={`${styles.btn_action} ${styles.pp}`}
									onClick={playPause}
									onMouseEnter={() => setIsPlayHovered(true)}
								/>
							)}
						</>
					)}
				</div>
				<p>0:00</p>
				<div
					className={styles.navigation_wrapper}
					onClick={checkWidth}
					ref={clickRef}
					style={{ margin: "0 10px" }}
				>
					<div
						className={styles.seek_bar}
						style={{
							width: `${`${currentSong?.progress}%`}`
						}}
					></div>
				</div>
				<p className="w-9">
					{songTime.getMinutes()}:{songTime.getSeconds()}
				</p>
				<div className="sm:flex items-center hidden">
					<label className="mr-1 ml-3" htmlFor="volume">
						<BsFillVolumeUpFill />
					</label>
					<input
						type="range"
						name="volume"
						id="volume"
						className={styles.volume}
						onChange={adjustVolume}
					/>
				</div>
			</div>
			<div className="flex justify-between w-full"></div>
			<ul>
				{songs.map((song: song, i: number) => (
					<li key={song.url}>
						<button className={styles.track} onClick={() => selectSong(song)}>
							{i + 1}. {song.title}
						</button>
					</li>
				))}
			</ul>

			<div className={styles.player_container}></div>
		</div>
	)
}
