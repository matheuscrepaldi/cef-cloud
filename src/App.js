import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	// Route,
	withRouter,
	// Redirect,
} from "react-router-dom";
import Loading from "./components/Loading";

import axios from "axios";
import { isLogin } from "./routes/isLoggedIn";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UrnasListPage from "./pages/Urnas/UrnasListPage";
import UrnaDetailsPage from "./pages/Urnas/UrnaDetailsPage";

function App() {
	const [loading, setLoading] = useState(false);

	axios.defaults.baseURL = "https://cef-cloud-dev.herokuapp.com/";
	axios.defaults.headers.post["Content-Type"] = "application/json";
	axios.defaults.headers.put["Content-Type"] = "application/json";

	axios.interceptors.request.use(function (config) {
		setLoading(true);
		const session = isLogin();
		config.headers.Authorization = session && session.token;
		return config;
	});

	axios.interceptors.response.use(
		function (response) {
			// spinning hide
			// UPDATE: Add this code to hide global loading indicator
			setLoading(false);

			return response;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	return (
		<Router>
			<Loading loading={loading} absolute />
			<Switch>
				<PublicRoute
					restricted={false}
					component={LoginPage}
					path="/"
					exact
				/>
				{/* <PublicRoute
					restricted={true}
					component={SignIn}
					path="/signin"
					exact
				/>
				<PrivateRoute component={Dashboard} path="/dashboard" exact /> */}

				<Layout>
					<Switch>
						<PrivateRoute component={HomePage} path="/home" exact />
						<PrivateRoute
							component={UrnasListPage}
							path="/urnas"
							exact
						/>
						<PrivateRoute
							component={UrnaDetailsPage}
							path="/urnas/:id"
							exact
						/>
						{/* <Route
							exact
							path="/db/settings/computers"
							name="ComputersListPage"
							component={ComputersListPage}
						/>

						<Route component={NotFoundPage} /> */}
					</Switch>
				</Layout>
			</Switch>
		</Router>
	);
}

export default withRouter(App);
