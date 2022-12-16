import { FormEvent } from "react"
import { H1 } from "../components/headings"
import s from "../styles/Contact.module.css"
import Head from "next/head"

export default function Contact() {
	function sendEmail(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
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
