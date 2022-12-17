import type { NextApiRequest, NextApiResponse } from "next"

const verifyRecaptcha = async (token: string) => {
	const secretKey = process.env.RECAPTHA_SECRET_KEY

	var verificationUrl =
		"https://www.google.com/recaptcha/api/siteverify?secret=" +
		secretKey +
		"&response=" +
		token

	return await fetch(verificationUrl, {
		method: "POST",
		headers: {
			"Application-Type": "application/json"
		}
	})
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const token = req.body.token
		const response = await verifyRecaptcha(token)

		if (response) {
			const nodemailer = require("nodemailer")
			const transporter = nodemailer.createTransport({
				port: 465,
				host: "smtp.gmail.com",
				auth: {
					user: process.env.AUTH_USER,
					pass: process.env.AUTH_PASS
				},
				secure: true
			})

			const mailData = {
				from: process.env.AUTH_USER, // from, always set to user in auth
				to: process.env.EMAIL_TO, // where you want the email to send to
				subject: `Message From ${req.body.email}`,
				text: req.body.message,
				html: `
				<div>
					<p>Name: ${req.body.firstName} ${req.body.lastName}</p>
					<p>Email: ${req.body.email}</p>
					<p>Message: ${req.body.message}</p>
				</div>`
			}

			transporter.sendMail(mailData, function (err: Error, info: any) {
				if (err) {
					console.log(err)
				} else {
					console.log(info)
				}
			})

			return res
				.status(200)
				.json({ status: "Success", message: "Thank you for contacting us." })
		} else {
			return res.json({
				status: "Failed",
				message: "Something went wrong, please try again."
			})
		}
	} catch (error) {
		res.json({
			status: "Failed",
			message: "Something went wrong, please try again."
		})
	}
}
