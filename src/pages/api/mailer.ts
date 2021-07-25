import "dotenv-safe/config";
import { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../lib/transport";

export default (req: NextApiRequest, res: NextApiResponse) => {
	transporter.sendMail(
		{
			from: process.env.EMAIL_USERNAME,
			to: process.env.EMAIL_USERNAME,
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
