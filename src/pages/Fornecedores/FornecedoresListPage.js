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
import Pagination from "../../components/Pagination";
import uf from "../../utils/uf";

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

function FornecedoresListPage(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [filterLength, setFilterLength] = useState(0);
	const [count, setCount] = useState(0);
	const [filter, setFilter] = useState("");
	const [pagination, setPagination] = useState("");

	useEffect(() => {
		setLoading(true);

		axios
			.get("listarFornecedores/search")
			.then(function (response) {
				setData(response.data);
				setCount(response?.data[0]?.count);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	}, []);

	const handleCardClick = (id) => {
		props.history.push(`/fornecedores/${id}`);
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
			.get(`listarFornecedores/search${url}`)
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
			.get("listarFornecedores/search")
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
			.get(`listarFornecedores/search${url}`)
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

	const fornecedores = data.map((dt) => {
		return {
			id: dt.rz_forn,
			value: dt.rz_forn,
		};
	});

	const filterColumns = [
		{ id: "rz_forn", value: "Fornecedor", list: fornecedores },
		{ id: "cidade_forn", value: "Cidade" },
		{
			id: "uf_forn",
			value: "Estado",
			list: uf,
		},
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
					title="Lista de Fornecedores"
					handleNew={() => props.history.push("/fornecedores/new")}
					showNewButton
					handleFilter={handleToggleModal}
					filterLength={filterLength}
					handleResetFilter={handleResetFilter}
				/>

				<TableRow className="header">
					<TableColumn>
						<Title>Código</Title>
					</TableColumn>
					<TableColumn>
						<Title>Razão Social</Title>
					</TableColumn>
					<TableColumn>
						<Title>CNPJ</Title>
					</TableColumn>
					<TableColumn>
						<Title>Telefone</Title>
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
								onClick={() => handleCardClick(dt.id_forn)}
								key={i}
							>
								<TableColumn>
									<TableTitle>Código:</TableTitle>
									<Text>{dt.id_forn}</Text>
								</TableColumn>
								<TableColumn>
									<TableTitle>Razão Social:</TableTitle>
									<Text>{dt.rz_forn}</Text>
								</TableColumn>
								<TableColumn>
									<TableTitle>CNPJ:</TableTitle>
									<Text>{dt.doc_forn}</Text>
								</TableColumn>
								<TableColumn>
									<TableTitle>Telefone:</TableTitle>
									<Text>{dt.tel_forn}</Text>
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

export default FornecedoresListPage;
