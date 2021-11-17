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
import { convertDate } from "../../utils/convertDate";
import Filter from "../../components/Filter";

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

function MovimentacoesListPage(props) {
	const [data, setData] = useState([]);
	const [urnas, setUrnas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [filterLength, setFilterLength] = useState(0);

	useEffect(() => {
		setLoading(true);

		axios
			.get("listarUrnas")
			.then(function (response) {
				setUrnas(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});

		axios
			.get("listarMovimentacoes")
			.then(function (response) {
				setData(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	}, []);

	const handleCardClick = (id) => {
		props.history.push(`/movimentacoes/${id}`);
	};

	const handleToggleModal = () => {
		setShowFilter(!showFilter);
	};

	const handleConfirmFilter = (filter, size) => {
		setLoading(true);
		setShowFilter(false);

		setFilterLength(size);

		axios
			.get(`listarMovimentacoes/${filter}`)
			.then(function (response) {
				setData(response.data);
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

		axios
			.get("listarMovimentacoes")
			.then(function (response) {
				setData(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	};

	const filterColumns = [
		{ id: "cor_urna", value: "Cor" },
		{ id: "dt_hr_mov", value: "Data" },
		{
			id: "tipo_mov",
			value: "Movimentação",
			list: [
				{ id: "Entrada", value: "Entrada" },
				{ id: "Saída", value: "Saída" },
			],
		},
		{ id: "ref_urna", value: "Referência" },
	];

	return (
		<>
			<Filter
				showModal={showFilter}
				handleToggleModal={handleToggleModal}
				fields={filterColumns}
				handleConfirmFilter={handleConfirmFilter}
			/>
			<Header
				title="Histórico de Movimentações"
				handleNew={() => props.history.push("/movimentacoes/new")}
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
					<Title>Movimentação</Title>
				</TableColumn>
				<TableColumn>
					<Title>Referência</Title>
				</TableColumn>
				<TableColumn>
					<Title>Cor</Title>
				</TableColumn>
				<TableColumn>
					<Title>Quantidade</Title>
				</TableColumn>
				<TableColumn>
					<Title>Data/Hora</Title>
				</TableColumn>
			</TableRow>

			{loading ? (
				<Card>
					<Loading loading={loading} absolute />
				</Card>
			) : data.length > 0 ? (
				data.map((dt, i) => {
					const urna =
						urnas.find((ur) => ur.id_urna === dt.id_urna) || {};

					return (
						<TableRow
							className="line"
							onClick={() => handleCardClick(dt.id_mov)}
							key={i}
						>
							<TableColumn>
								<TableTitle>Código:</TableTitle>
								<Text>{dt.id_mov}</Text>
							</TableColumn>
							<TableColumn>
								<TableTitle>Movimentação:</TableTitle>
								<Text>{dt.tipo_mov}</Text>
							</TableColumn>
							<TableColumn>
								<TableTitle>Referência:</TableTitle>
								<Text>{urna.ref_urna}</Text>
							</TableColumn>
							<TableColumn>
								<TableTitle>Cor:</TableTitle>
								<Text>{urna.cor_urna}</Text>
							</TableColumn>
							<TableColumn>
								<TableTitle>Quantidade:</TableTitle>
								<Text>{dt.qtde_mov}</Text>
							</TableColumn>
							<TableColumn>
								<TableTitle>Data/Hora:</TableTitle>
								<Text>{convertDate(dt.dt_hr_mov)}</Text>
							</TableColumn>
						</TableRow>
					);
				})
			) : (
				<NoData>Sem dados</NoData>
			)}
		</>
	);
}

export default MovimentacoesListPage;
