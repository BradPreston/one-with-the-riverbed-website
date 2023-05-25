import { NextApiRequest, NextApiResponse } from "next"
import { S3, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

type song = {
	title: string
	url: string
	progress: number
	length: number
}

export default async function GetSongs(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = JSON.parse(req.body)

	try {
		const client = new S3({
			region: process.env.NEXT_PUBLIC_AWS_REGION!,
			credentials: {
				accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID!,
				secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY!
			}
		})

		const params = {
			Bucket: "owtr",
			Key: `music/${body.awsTitle}`
		}

		const songTitle = body.songTitle

		const command = new GetObjectCommand(params)
		const url = await getSignedUrl(client, command, { expiresIn: 60000 })
		const song: song = {
			title: songTitle,
			url: await url,
			progress: 0,
			length: 0
		}
		res.setHeader("Access-Control-Allow-Origin", "*")
		res.status(200).json(song)
	} catch (err) {
		res.status(400).json(err)
	}
}
