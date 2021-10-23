import React from "react";
import Card from "../components/Card";
import Row from "../components/Row";
import DashboardCard from "../components/DashboardCard";

function HomePage() {
	return (
		<>
			<Row>
				<DashboardCard>Total de Urnas</DashboardCard>
				<DashboardCard>Total de Clientes</DashboardCard>
				<DashboardCard>Total de Fornecedores</DashboardCard>
			</Row>
			<Row>
				<Card>Estoque em baixa</Card>
				<Card>Últimas Movimentações</Card>
			</Row>
		</>
	);
}

export default HomePage;
