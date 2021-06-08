import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	withRouter,
	// Redirect,
} from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<Router>
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
