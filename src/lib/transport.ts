import { createTransport } from "nodemailer";

export const transporter = createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD
	}
});
