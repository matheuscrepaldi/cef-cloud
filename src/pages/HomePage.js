import React, { useEffect, useState } from "react";
import { BsInboxesFill, BsPeopleFill, BsCart4 } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";

import Row from "../components/Row";
import DashboardCard from "../components/DashboardCard";
import Title from "../components/Title";
import { withRouter } from "react-router";
import DashboardTable from "../components/DashboardTable";

const TableRow = styled(Row)`
	height: ${(props) => `calc(100% - ${props.offset}px)`};

	@media (max-width: 1023px) {
		height: 100%;
	}
`;

function HomePage(props) {
	const [loading, setLoading] = useState({
		Urnas: true,
		Clientes: true,
		Fornecedores: true,
	});
	const [data, setData] = useState({
		totalUrnas: 0,
		totalClientes: 0,
		totalFornecedores: 0,
	});

	const page = document.getElementById("container");
	const scrollOffset = page && page.scrollHeight - page.offsetHeight;

	useEffect(() => {
		const list = ["Urnas", "Clientes", "Fornecedores"];

		async function getAll() {
			for (const [index, item] of list.entries()) {
				await axios
					.get(`listar${item}`)
					.then((response) => {
						let total = response.data.length;

						if (item === "Urnas") {
							total = 0;
							response.data.map((urn) => {
								total += urn.quantidade;

								return urn;
							});
						}

						setData((prevState) => ({
							...prevState,
							[`total${item}`]: total,
						}));
						setLoading((prevState) => ({
							...prevState,
							[`${item}`]: false,
						}));
					})
					.catch((err) => {
						setLoading({ ...loading, [`${item}`]: false });
						toast.error(
							`Erro ao carregar os dados dos(as) ${item}`,
							{
								closeOnClick: true,
								autoClose: false,
							}
						);
					});
			}
		}

		getAll();
	}, []);

	return (
		<>
			<Row>
				<Title big style={{ marginLeft: 10 }}>
					Dashboard
				</Title>
			</Row>
			<Row>
				<DashboardCard
					total={data.totalUrnas}
					text={"Disponível em estoque"}
					icon={<BsInboxesFill size={32} />}
					loading={loading.Urnas}
					handleShowMore={() => props.history.push("/urnas")}
				/>
				<DashboardCard
					total={data.totalClientes}
					text={"Clientes cadastrados"}
					icon={<BsPeopleFill size={32} />}
					loading={loading.Clientes}
					handleShowMore={() => props.history.push("/clientes")}
				/>
				<DashboardCard
					total={data.totalFornecedores}
					text={"Fornecedores cadastrados"}
					icon={<BsCart4 size={32} />}
					loading={loading.Fornecedores}
					handleShowMore={() => props.history.push("/fornecedores")}
				/>
			</Row>

			<TableRow offset={scrollOffset}>
				<DashboardTable
					title={"Estoque em baixa"}
					handleShowMore={() => props.history.push("/urnas")}
				/>
				<DashboardTable
					title={"Últimas Movimentações"}
					handleShowMore={() => props.history.push("/movimentacoes")}
				/>
			</TableRow>
		</>
	);
}

export default withRouter(HomePage);
