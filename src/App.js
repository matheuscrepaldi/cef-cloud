import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	withRouter,
	Redirect,
} from "react-router-dom";

import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" name="LoginPage" component={LoginPage} />

				{/* <Route
					path="/modules"
					exact
					name="ModulesPage"
					component={ModulesPage}
				/>
				<Route
					path="/app-module"
					name="AppModulePage"
					component={AppModulePage}
				/>

				<Redirect
					push
					from="/db/settings"
					exact
					to="/db/settings/computers"
				/> */}

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
