import { NextApiRequest, NextApiResponse } from "next"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"

export default async function verifyPassword(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const hash = await bcrypt.hash(req.body.password, 10)
		const acceptedPassword: string = process.env.EPK_ACCESS_PASSWORD!
		const valid = await bcrypt.compare(acceptedPassword, hash)
		if (valid) res.status(200).json("ok")
		else res.status(401).json("not authorized")
	} catch (err) {
		res.status(400).json(`an error ocurred in get password hash: ${err}`)
	}
}
