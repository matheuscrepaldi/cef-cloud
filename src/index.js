import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";

import App from "./App";
import "./index.css";

const history = createBrowserHistory();

axios.defaults.baseURL = "https://cef-cloud-dev.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
	<Router history={history}>
		<App />
		{/* <ToastContainer autoClose={3000} /> */}
	</Router>,
	document.getElementById("root")
);
