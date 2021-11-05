import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	// Route,
	withRouter,
	// Redirect,
} from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import FunerariasListPage from "./pages/Funerarias/FunerariasListPage";
import FunerariaDetailsPage from "./pages/Funerarias/FunerariaDetailsPage";
import UsuariosListPage from "./pages/Usuarios/UsuariosListPage";
import UrnasListPage from "./pages/Urnas/UrnasListPage";
import UrnaDetailsPage from "./pages/Urnas/UrnaDetailsPage";
import MovimentacoesListPage from "./pages/Movimentacoes/MovimentacoesListPage";
import MovimentacaoDetailsPage from "./pages/Movimentacoes/MovimentacaoDetailsPage";
import ClientesListPage from "./pages/Clientes/ClientesListPage";
import ClienteDetailsPage from "./pages/Clientes/ClienteDetailsPage";
import FornecedoresListPage from "./pages/Fornecedores/FornecedoresListPage";
import FornecedorDetailsPage from "./pages/Fornecedores/FornecedorDetailsPage";

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
						<PrivateRoute component={HomePage} path="/home" exact />
						<PrivateRoute
							component={FunerariasListPage}
							path="/funerarias"
							exact
						/>
						<PrivateRoute
							component={FunerariaDetailsPage}
							path="/funerarias/:id"
							exact
						/>
						<PrivateRoute
							component={UsuariosListPage}
							path="/usuarios"
							exact
						/>
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
						<PrivateRoute
							component={MovimentacoesListPage}
							path="/movimentacoes"
							exact
						/>
						<PrivateRoute
							component={MovimentacaoDetailsPage}
							path="/movimentacoes/:id"
							exact
						/>
						<PrivateRoute
							component={ClientesListPage}
							path="/clientes"
							exact
						/>
						<PrivateRoute
							component={ClienteDetailsPage}
							path="/clientes/:id"
							exact
						/>
						<PrivateRoute
							component={FornecedoresListPage}
							path="/fornecedores"
							exact
						/>
						<PrivateRoute
							component={FornecedorDetailsPage}
							path="/fornecedores/:id"
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
