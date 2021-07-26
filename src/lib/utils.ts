import { connect } from "mongoose";

export const connectToDatabase = () =>
	connect(process.env.NEXT_PUBLIC_MONGO_URI!, {
		dbName: "connectr",
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
