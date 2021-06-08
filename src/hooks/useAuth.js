import { useState } from "react";

import axios from "axios";
import md5 from "../utils/md5";

export default function useAuth() {
	const [session, setSession] = useState(getSessionStorage());

	async function login(email, password = "") {
		const body = JSON.stringify({
			user: email,
			pass: md5(password),
		});

		const response = await axios.post(
			`${process.env.REACT_APP_LOGIN_BACK_END_URL}login`,
			body
		);

		const { data } = response;

		if (data) {
			const session = response.data;

			setSessionStorage({
				...session,
				status: response.status,
			});
		}
	}

	async function logout() {
		setSessionStorage(null);
	}

	function setSessionStorage(session) {
		if (session) {
			sessionStorage.setItem("session", JSON.stringify(session));
		} else {
			sessionStorage.removeItem("session");
		}

		setSession(session);
	}

	function getSessionStorage() {
		const sessionItem = sessionStorage.getItem("session");
		if (sessionItem) {
			return JSON.parse(sessionItem);
		}

		return null;
	}

	return {
		session,
		login,
		logout,
	};
}
