const isLogin = () => {
	const sessionItem = sessionStorage.getItem("session");
	if (sessionItem) {
		return JSON.parse(sessionItem);
	}

	return false;
};

export { isLogin };
