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
		align-items: center;
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

function UsuariosListPage(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		axios
			.get("listarUsuarios")
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
		props.history.push(`/usuarios/${id}`);
	};

	return (
		<>
			<Header
				title="Lista de Usuários"
				handleNew={() => props.history.push("/usuarios/new")}
				showNewButton
			/>

			<TableRow className="header">
				<TableColumn>
					<Title>Código</Title>
				</TableColumn>
				<TableColumn>
					<Title>Usuário</Title>
				</TableColumn>
				<TableColumn>
					<Title>Funerária</Title>
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
							onClick={() => handleCardClick(dt.id)}
							key={i}
						>
							<TableColumn>
								<TableTitle>Código:</TableTitle>
								<Text>{dt.id}</Text>
							</TableColumn>
							<TableColumn>
								<TableTitle>Usuário:</TableTitle>
								<Text>{dt.username}</Text>
							</TableColumn>
							<TableColumn>
								<TableTitle>Funerária:</TableTitle>
								<Text>
									{dt.owner.cd_owner} - {dt.owner.nome_owner}
								</Text>
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

export default UsuariosListPage;
