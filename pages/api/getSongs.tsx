import { NextApiRequest, NextApiResponse } from "next"
import { S3, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import Cors from "cors"

type song = {
	title: string
	url: string
	progress: number
	length: number
}

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
	methods: ["POST", "GET", "HEAD"],
	origin: "*",
	allowedHeaders: ["Access-Control-Allow-Origin"]
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: Function
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result)
			}

			res.setHeader("Access-Control-Allow-Origin", "*")

			return resolve(result)
		})
	})
}

export default async function GetSongs(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await runMiddleware(req, res, cors)
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
