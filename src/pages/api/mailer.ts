import { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../lib/transport";

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log(process.env.NEXT_PUBLIC_EMAIL_USERNAME);
	transporter.sendMail(
		{
			from: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
			to: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
			subject: req.body.subject,
			text: req.body.text
		},
		(err, info) => {
			if (err) console.error(err);
			console.log(info);
		}
	);

	res.status(200);
};
