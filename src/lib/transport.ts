import { createTransport } from "nodemailer";

export const transporter = createTransport({
	service: "gmail",
	auth: {
		user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
		pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
	}
});
