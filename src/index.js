import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "./App";

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		<App />
		{/* <ToastContainer autoClose={3000} /> */}
	</Router>,
	document.getElementById("root")
);
