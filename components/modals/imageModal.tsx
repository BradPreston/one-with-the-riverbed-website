import { Picture } from "../../types/Picture"
import { ActiveImageContext } from "../../context/ActiveImageContext"
import { useContext } from "react"
import Image from "next/image"
import styles from "./imageModal.module.css"

export default function ImageModal({ link }: Picture) {
	const { setActiveImage } = useContext(ActiveImageContext)

	return (
		<div className={styles.wrapper}>
			<div className={styles.inner}>
				<div
					className={styles.close}
					onClick={() => setActiveImage(null)}
					title="close"
				>
					&#x2715;
				</div>
				<Image src={link} alt={link} fill objectFit="contain" />
			</div>
		</div>
	)
}
