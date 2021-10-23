import React from "react";
import Card from "../components/Card";
import Row from "../components/Row";
import DashboardCard from "../components/DashboardCard";
import Title from "../components/Title";

function HomePage() {
	return (
		<>
			<Row>
				<Title style={{ fontSize: "2em", marginLeft: 10 }}>
					Dashboard
				</Title>
			</Row>
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
