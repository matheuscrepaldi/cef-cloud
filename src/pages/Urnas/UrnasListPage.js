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

function UrnasListPage(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		axios
			.get("listarUrnas")
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
		props.history.push(`/urnas/${id}`);
	};

	return (
		<>
			<Header
				title="Lista de Urnas"
				handleNew={() => props.history.push("/urnas/new")}
				showNewButton
			/>

			<TableRow className="header">
				<TableColumn>
					<Title>Referência</Title>
				</TableColumn>
				<TableColumn>
					<Title>Nome</Title>
				</TableColumn>
				<TableColumn>
					<Title>Tamanho</Title>
				</TableColumn>
				<TableColumn>
					<Title>Cor</Title>
				</TableColumn>
				<TableColumn>
					<Title>Estoque</Title>
				</TableColumn>
				<TableColumn>
					<Title>Tipo</Title>
				</TableColumn>
			</TableRow>

			{loading ? (
				<Card>
					<Loading loading={loading} absolute />
				</Card>
			) : (
				data.map((dt) => {
					return (
						<TableRow
							className="line"
							onClick={() => handleCardClick(dt.id)}
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
								<TableTitle>Tamanho:</TableTitle>
								<Text>{dt.tamanho_urna}</Text>
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
								<TableTitle>Tipo:</TableTitle>
								<Text>{dt.classe_urna}</Text>
							</TableColumn>
						</TableRow>
					);
				})
			)}
		</>
	);
}

export default UrnasListPage;
