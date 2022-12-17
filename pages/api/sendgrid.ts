import { NextApiRequest, NextApiResponse } from "next"
import sendgrid from "@sendgrid/mail"
sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

export default async function sendEmail(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await sendgrid
			.send({
				to: process.env.EMAIL_TO!,
				replyTo: req.body.email,
				from: process.env.EMAIL_TO!,
				subject: "New Email!",
				html: `<div>
        <p>Name: ${req.body.firstname} ${req.body.firstname}</p>
        <p>Email: ${req.body.email}</p>
        <p>Message: ${req.body.message}</p>
        </div>`
			})
			.then(() => {
				console.log("email sent!")
			})
	} catch (error: any) {
		console.log(error)
		return res.status(error.statusCode || 500).json({ error: error.message })
	}

	return res.status(200).send("OK")
}
