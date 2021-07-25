require("dotenv-safe").config();

module.exports = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_EMAIL_USERNAME: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
		NEXT_PUBLIC_EMAIL_PASSWORD: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
	}
};
