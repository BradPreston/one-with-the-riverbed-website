import { useState } from "react"
import { H1 } from "../components/headings"
import s from "../styles/Contact.module.css"
import Head from "next/head"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

export default function Contact() {
	const [firstName, setFirstName] = useState<string>()
	const [lastName, setLastName] = useState<string>()
	const [email, setEmail] = useState<string>()
	const [message, setMessage] = useState<string>()
	const { executeRecaptcha } = useGoogleReCaptcha()

	async function sendEmail(e: any) {
		e.preventDefault()
		const data = {
			firstname: firstName,
			lastname: lastName,
			email: email,
			message: message
		}

		if (!executeRecaptcha) {
			return
		}

		try {
			const token = await executeRecaptcha()
			if (!token) {
				return
			}

			const result = await fetch("/api/sendgrid", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})

			if (result) {
				setFirstName("")
				setLastName("")
				setEmail("")
				setMessage("")
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Head>
				<title>Show Dates | One with the Riverbed</title>
			</Head>
			<H1 title="Contact Us" />
			<section className="max-w-3xl mx-auto overflow-hidden">
				<form onSubmit={sendEmail}>
					<div className={s.personalInfo}>
						<p className={s.inputWrapper}>
							<label htmlFor="firstname">First Name:*</label>
							<input
								className={s.input}
								type="text"
								id="firstname"
								name="firstname"
								placeholder="Scott"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</p>
						<p className={s.inputWrapper}>
							<label htmlFor="lastname">Last Name:*</label>
							<input
								className={s.input}
								type="text"
								id="lastname"
								name="lastname"
								placeholder="Stapp"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</p>
						<p className={s.inputWrapper}>
							<label htmlFor="email">Email:*</label>
							<input
								className={s.input}
								type="email"
								id="email"
								name="email"
								placeholder="scott.stapp@creedrocks.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</p>
						<p className={s.inputWrapper}>
							<label htmlFor="message">Message:*</label>
							<textarea
								name="message"
								id="message"
								cols={30}
								rows={10}
								className={s.input}
								placeholder="Type your message here"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							></textarea>
						</p>
						<p>
							<input
								className={s.sendButton}
								type="submit"
								name="submit"
								id="submit"
								value="Send"
							/>
						</p>
					</div>
				</form>
			</section>
		</>
	)
}
