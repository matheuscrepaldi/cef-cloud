import React from "react";

import useAuth from "../hooks/useAuth";

const AuthContext = React.createContext();

function AuthProvider(props) {
	const { session, login, logout } = useAuth(null);

	function handleLogin(username, password) {
		login(username, password);
	}

	function handleLogout() {
		logout();
	}

	return (
		<AuthContext.Provider
			value={{
				session,
				handleLogin,
				handleLogout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
