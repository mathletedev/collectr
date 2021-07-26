import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
	name: String,
	ip: String,
	latitude: Number,
	longitude: Number,
	accuracy: Number
});

export const User = models.User || model("User", UserSchema);
