import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Row from "../../components/Row";
import Title from "../../components/Title";
import Text from "../../components/Text";
import Loading from "../../components/Loading";
import Column from "../../components/Column";
import Filter from "../../components/Filter";
import Container from "../../components/Container";
import { convertDate } from "../../utils/convertDate";
import Pagination from "../../components/Pagination";
import generatePDF from "../../components/Report";

const TableColumn = styled(Column)`
	margin: 10px;

	@media (max-width: 1024px) {
		flex-direction: row;
		justify-content: flex-start;
	}
`;

const TableRow = styled(Row)`
	&.line {
		border-bottom: 1px solid #ccc;
		:hover {
			background: #cccccc;
			cursor: pointer;
		}

		@media (max-width: 1024px) {
			flex-direction: column;
			border: 1px solid #fff;
			background: #ffffff;
			box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);

			:hover {
				background: #d9d9d9;
			}
		}
	}

	&.header {
		border-bottom: 2px solid #59bfff;
		@media (max-width: 1024px) {
			display: none;
			flex-direction: column;
		}
	}
`;

const TableTitle = styled(Title)`
	display: none;
	@media (max-width: 1024px) {
		margin-left: 15px;
		display: flex;
	}
`;

const NoData = styled(Row)`
	justify-content: center;
`;

function UrnasListPage(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [filterLength, setFilterLength] = useState(0);
	const [fornecedores, setFornecedores] = useState([]);
	const [count, setCount] = useState(0);
	const [filter, setFilter] = useState("");
	const [pagination, setPagination] = useState("");

	useEffect(() => {
		setLoading(true);

		axios
			.get("listarUrnas/search")
			.then(function (response) {
				setData(response.data);
				setCount(response?.data[0]?.count);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});

		axios
			.get("listarFornecedores")
			.then(function (response) {
				const result = response.data.map((dt) => {
					dt.id = dt.rz_forn;
					dt.value = dt.rz_forn;

					return dt;
				});

				setFornecedores(result);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const handleCardClick = (id) => {
		props.history.push(`/urnas/${id}`);
	};

	const handleToggleModal = () => {
		setShowFilter(!showFilter);
	};

	const handleConfirmFilter = (fields, size) => {
		setLoading(true);
		setShowFilter(false);
		setFilterLength(size);

		const url = buildUrl(fields, "page=0");
		setFilter(fields);

		axios
			.get(`listarUrnas/search${url}`)
			.then(function (response) {
				setData(response.data);
				setCount(response?.data[0]?.count);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	};

	const handleResetFilter = () => {
		setLoading(true);
		setFilterLength(0);
		setFilter("");
		setPagination("");

		axios
			.get("listarUrnas/search")
			.then(function (response) {
				setData(response.data);
				setCount(response?.data[0]?.count);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	};

	const handlePaginationChange = (page) => {
		setLoading(true);
		const url = buildUrl(filter, page);
		setPagination(page);

		axios
			.get(`listarUrnas/search${url}`)
			.then(function (response) {
				setData(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	};

	const buildUrl = (filter, pagination) => {
		let url = "";

		if (filter === "" && pagination === "") {
			return;
		} else if (filter === "" && pagination !== "") {
			url = `?${pagination}`;
		} else if (filter !== "" && pagination === "") {
			url = `?${filter}`;
		} else if (filter !== "" && pagination !== "") {
			url = `?${filter}&${pagination}`;
		}

		return url;
	};

	const filterColumns = [
		{ id: "cor_urna", value: "Cor" },
		{ id: "dt_hr_entrada", value: "Data" },
		{ id: "rz_forn", value: "Fornecedor", list: fornecedores },
		{ id: "nome_urna", value: "Nome" },
		{ id: "ref_urna", value: "Referência" },
		{ id: "tamanho_urna", value: "Tamanho" },
		{ id: "classe_urna", value: "Tipo" },
	];

	return (
		<>
			<Filter
				showModal={showFilter}
				handleToggleModal={handleToggleModal}
				fields={filterColumns}
				handleConfirmFilter={handleConfirmFilter}
			/>
			<Container showModal={showFilter}>
				<Header
					title="Lista de Urnas"
					handleNew={() => props.history.push("/urnas/new")}
					handleFilter={handleToggleModal}
					showNewButton
					filterLength={filterLength}
					handleResetFilter={handleResetFilter}
					handleReport={() =>
						generatePDF(
							["Id", "Referência", "Nome", "Quantidade"],
							data,
							"Urnas"
						)
					}
				/>

				<TableRow className="header">
					<TableColumn>
						<Title>Referência</Title>
					</TableColumn>
					<TableColumn>
						<Title>Nome</Title>
					</TableColumn>
					<TableColumn>
						<Title>Tipo</Title>
					</TableColumn>
					<TableColumn>
						<Title>Cor</Title>
					</TableColumn>
					<TableColumn>
						<Title>Estoque</Title>
					</TableColumn>
					<TableColumn>
						<Title>Data</Title>
					</TableColumn>
				</TableRow>

				{loading ? (
					<Card>
						<Loading loading={loading} absolute />
					</Card>
				) : data.length > 0 ? (
					data.map((dt, i) => {
						return (
							<TableRow
								className="line"
								onClick={() => handleCardClick(dt.id_urna)}
								key={i}
							>
								<TableColumn>
									<TableTitle>Referência:</TableTitle>
									<Text>{dt.ref_urna}</Text>
								</TableColumn>
								<TableColumn>
									<TableTitle>Nome:</TableTitle>
									<Text>{dt.nome_urna}</Text>
								</TableColumn>
								<TableColumn>
									<TableTitle>Tipo:</TableTitle>
									<Text>{dt.classe_urna}</Text>
								</TableColumn>
								<TableColumn>
									<TableTitle>Cor:</TableTitle>
									<Text>{dt.cor_urna}</Text>
								</TableColumn>
								<TableColumn>
									<TableTitle>Estoque:</TableTitle>
									<Text>{dt.quantidade}</Text>
								</TableColumn>
								<TableColumn>
									<TableTitle>Data:</TableTitle>
									<Text>{convertDate(dt.dt_hr_entrada)}</Text>
								</TableColumn>
							</TableRow>
						);
					})
				) : (
					<NoData>Sem dados</NoData>
				)}
				<Pagination
					count={count}
					handlePaginationChange={handlePaginationChange}
				/>
			</Container>
		</>
	);
}

export default UrnasListPage;
