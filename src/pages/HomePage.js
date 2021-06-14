import React, { useEffect, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";

function HomePage() {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get("listarUrnas")
			.then(function (response) {
				setData(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<>
			Home Page
			<br />
			{data.map((dt) => {
				return (
					<>
						<br />
						{dt.id} - {dt.nome_urna}
					</>
				);
			})}
			{data.map((dt) => {
				return (
					<>
						<br />
						{dt.id} - {dt.nome_urna}
					</>
				);
			})}
			{data.map((dt) => {
				return (
					<>
						<br />
						{dt.id} - {dt.nome_urna}
					</>
				);
			})}
			{data.map((dt) => {
				return (
					<>
						<br />
						{dt.id} - {dt.nome_urna}
					</>
				);
			})}
		</>
	);
}

export default HomePage;
