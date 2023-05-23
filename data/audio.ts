import { S3, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const client = new S3({
	region: process.env.NEXT_PUBLIC_AWS_REGION!,
	credentials: {
		accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID!,
		secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY!
	}
})

type awsSong = {
	aws_title: string
	song_title: string
}

type song = {
	title: string
	url: string
	progress: number
	length: number
}

const awsSongs = [
	{
		aws_title: "pokemon_little_root.mp3",
		song_title: "Pokemon - Little Root"
	},
	{
		aws_title: "shovel_knight_stirke_the_earth.mp3",
		song_title: "Shovel Knight - Strike the Earth"
	}
]

const songData: song[] = []

awsSongs.forEach(({ aws_title, song_title }: awsSong) => {
	const params = {
		Bucket: "owtr",
		Key: `music/${aws_title}`
	}
	const command = new GetObjectCommand(params)

	getSignedUrl(client, command, { expiresIn: 60000 }).then((data: string) => {
		const newSong: song = {
			title: song_title,
			url: data,
			progress: 0,
			length: 0
		}
		songData.push(newSong)
	})
})

export default songData