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
import DashboardTable2 from "../components/DashboardTable2";
import Container from "../components/Container";
import AdminModal from "../components/AdminModal";
import { isLogin } from "../routes/isLoggedIn";
import Button from "../components/Button";

const TableRow = styled(Row)`
	align-items: flex-start;
`;

function HomePage(props) {
	const [showModal, setShowModal] = useState(false);
	const [funerarias, setFunerarias] = useState([]);
	const [loadingModal, setLoadingModal] = useState(false);
	const [loading, setLoading] = useState({
		Urnas: true,
		Clientes: true,
		Fornecedores: true,
		EstoqueBaixo: true,
		Movimentacoes: true,
	});
	const [data, setData] = useState({
		totalUrnas: 0,
		totalClientes: 0,
		totalFornecedores: 0,
		totalEstoqueBaixo: [],
		totalMovimentacoes: [],
	});

	const session = isLogin();
	const isAdmin =
		session && session.role === "ROLE_ADMIN" && session.owner === "";

	const handleToggleModal = () => {
		if (!showModal) {
			setLoadingModal(true);
			axios
				.get("listarFunerarias")
				.then(function (response) {
					setFunerarias(response.data);
					setLoadingModal(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoadingModal(false);
				});
		}

		setShowModal(!showModal);
	};

	const handleConfirmModalButton = () => {
		const funeraria = document.querySelector("#cd_owner").value;

		const obj = {
			...session,
			owner: funeraria,
		};

		sessionStorage.setItem("session", JSON.stringify(obj));
		handleToggleModal();
		window.location.reload();
	};

	useEffect(() => {
		if (isAdmin) {
			handleToggleModal();

			return;
		}

		const list = [
			"Urnas",
			"Clientes",
			"Fornecedores",
			"EstoqueBaixo",
			"Movimentacoes",
		];

		async function getAll() {
			for (const [index, item] of list.entries()) {
				let tableSizeEstoque = 0;

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

						if (item === "EstoqueBaixo") {
							total = response.data;
							tableSizeEstoque = total.length;
						}

						if (item === "Movimentacoes") {
							tableSizeEstoque =
								tableSizeEstoque < 5 ? 5 : tableSizeEstoque;

							total = response.data.slice(0, tableSizeEstoque);
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
						setLoading((prevState) => ({
							...prevState,
							[`${item}`]: false,
						}));
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
			<AdminModal
				showModal={showModal}
				title="Atenção"
				loading={loadingModal}
				funerarias={funerarias}
				subtitle="Escolha uma opção para prosseguir"
				handleToggleModal={handleToggleModal}
				handleConfirmModalButton={handleConfirmModalButton}
			/>
			<Container showModal={showModal}>
				<Row>
					<Title big style={{ marginLeft: 10 }}>
						Dashboard
					</Title>
					{session && session.role === "ROLE_ADMIN" && (
						<Button onClick={() => handleToggleModal()}>
							Trocar Funerária
						</Button>
					)}
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
						handleShowMore={() =>
							props.history.push("/fornecedores")
						}
					/>
				</Row>

				<TableRow>
					<DashboardTable
						title={"Estoque em baixa"}
						loading={loading.EstoqueBaixo}
						handleShowMore={() => props.history.push("/urnas")}
						data={data.totalEstoqueBaixo}
					/>
					<DashboardTable2
						title={"Últimas Movimentações"}
						loading={loading.Movimentacoes}
						handleShowMore={() =>
							props.history.push("/movimentacoes")
						}
						data={data.totalMovimentacoes}
					/>
				</TableRow>
			</Container>
		</>
	);
}

export default withRouter(HomePage);
