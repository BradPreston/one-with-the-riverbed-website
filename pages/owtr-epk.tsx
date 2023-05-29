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
	return (
		<div className="flex justify-center items-center">
			<>{data && <AudioPlayer playlist={data}></AudioPlayer>}</>
		</div>
	)
}
