import React, { useEffect, useState } from "react";

import axios from "axios";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Row from "../../components/Row";
import Title from "../../components/Title";
import Text from "../../components/Text";
import Loading from "../../components/Loading";

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

			<Card>
				<Row>
					<Title>Referência</Title>
					<Title>Nome</Title>
					<Title>Tamanho</Title>
					<Title>Cor</Title>
					<Title>Tipo</Title>
					<Title>Estoque</Title>
				</Row>
			</Card>

			{loading ? (
				<Card>
					<Loading loading={loading} absolute />
				</Card>
			) : (
				data.map((dt) => {
					return (
						<Card onClick={() => handleCardClick(dt.id)}>
							<Row>
								<Text>{dt.ref_urna}</Text>
								<Text>{dt.nome_urna}</Text>
								<Text>{dt.tamanho_urna}</Text>
								<Text>{dt.cor_urna}</Text>
								<Text>{dt.classe_urna}</Text>
								<Text>{dt.quantidade}</Text>
							</Row>
						</Card>
					);
				})
			)}
		</>
	);
}

export default UrnasListPage;
