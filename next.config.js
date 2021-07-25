require("dotenv-safe").config();

module.exports = {
	reactStrictMode: true,
	env: {
		EMAIL_USERNAME: process.env.EMAIL_USERNAME,
		EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
	}
};
