import React, { useEffect, useState } from "react";

import axios from "axios";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Row from "../../components/Row";
import Title from "../../components/Title";
import Text from "../../components/Text";

function UrnasListPage(props) {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get("listarUrnas")
			.then(function (response) {
				setData(response.data);
			})
			.catch(function (error) {
				console.log(error);
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
			/>
			{data.map((dt) => {
				return (
					<Card onClick={() => handleCardClick(dt.id)}>
						<Row>
							<Title>Referência: {dt.ref_urna}</Title>
							<Text>Nome: {dt.nome_urna}</Text>
							<Text>Tamanho: {dt.tamanho_urna}</Text>
							<Text>Cor: {dt.cor_urna}</Text>
							<Text>Tipo: {dt.classe_urna}</Text>
							<Text>Estoque: {dt.quantidade}</Text>
						</Row>
					</Card>
				);
			})}
		</>
	);
}

export default UrnasListPage;
