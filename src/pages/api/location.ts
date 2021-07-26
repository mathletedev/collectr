import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../lib/models/User";
import { connectToDatabase } from "../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await connectToDatabase();

	const body = JSON.parse(req.body);

	const user = await User.findById(body.id);
	user.latitude = body.latitude;
	user.longitude = body.longitude;
	user.accuracy = body.accuracy;
	await user.save();

	res.status(200);
};
