import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../lib/models/User";
import { connectToDatabase } from "../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await connectToDatabase();

	const newUser = new User(JSON.parse(req.body));
	res.status(200).json(await newUser.save());
};
