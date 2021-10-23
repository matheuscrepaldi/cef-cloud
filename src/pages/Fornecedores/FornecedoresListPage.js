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
			border: 1px solid #59bfff;
			border-radius: 10px;
			background: #ffffff;

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

	useEffect(() => {
		setLoading(true);

		axios
			.get("listarFornecedores")
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
		props.history.push(`/fornecedores/${id}`);
	};

	return (
		<>
			<Header
				title="Lista de Fornecedores"
				handleNew={() => props.history.push("/fornecedores/new")}
				showNewButton
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
		</>
	);
}

export default FornecedoresListPage;
