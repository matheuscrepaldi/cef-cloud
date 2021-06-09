const isLogin = () => {
	const session = sessionStorage.getItem("session");
	if (session) {
		return JSON.parse(session);
	}

	return false;
};

export { isLogin };
