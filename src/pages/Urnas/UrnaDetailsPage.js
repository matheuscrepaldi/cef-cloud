import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Header from "../../components/HeaderTitle";
import CardDetails from "../../components/CardDetails";
import Row from "../../components/Row";
import Column from "../../components/Column";
import Input from "../../components/Input";
import Text from "../../components/Text";
import Title from "../../components/Title";
import useDynamicForm from "../../hooks/useDynamicForm";
import Button from "../../components/Button";

function UrnaDetailsPage(props) {
	const { fields, setFields, handleInputChange } = useDynamicForm();
	const id = props.match.params.id;
	const isNew = id === "new";
	const session = JSON.parse(sessionStorage.getItem("session"));

	useEffect(() => {
		axios
			.get(`listarUrnaById/${id}`)
			.then(function (response) {
				setFields(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const handlePost = () => {
		const body = { ...fields };
		body.cdOwner = session && session.owner;
		delete body.id;

		axios
			.post(`cadastrarUrna`, body)
			.then(function (response) {
				toast.success("Urna cadastrada com sucesso");
				props.history.push("/urnas");
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handlePut = () => {
		const body = { ...fields };
		body.cdOwner = session && session.owner;
		// delete body.id;

		axios
			.put(`atualizarUrna/${id}`, body)
			.then(function (response) {
				toast.success("Urna atualizada com sucesso");
				props.history.push("/urnas");
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleDelete = () => {
		axios
			.delete(`deletarUrna/${id}`)
			.then(function (response) {
				toast.success("Urna excluída com sucesso");
				props.history.push("/urnas");
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleSaveUrna = () => {
		if (isNew) {
			handlePost();
		} else {
			handlePut();
		}
	};

	return (
		<>
			<Header>Cadastro da Urna</Header>
			<CardDetails>
				<Row>
					<Column>
						<Title>Referência: </Title>
						<Input
							id={"ref_urna"}
							type="text"
							defaultValue={fields.ref_urna}
							onChange={handleInputChange}
						/>
					</Column>
					<Column>
						<Text>Nome:</Text>
						<Input
							id={"nome_urna"}
							type="text"
							defaultValue={fields.nome_urna}
							onChange={handleInputChange}
						/>
					</Column>
					<Column>
						<Text>Tamanho:</Text>
						<Input
							id={"tamanho_urna"}
							type="text"
							defaultValue={fields.tamanho_urna}
							onChange={handleInputChange}
						/>
					</Column>
				</Row>
				<Row>
					<Column>
						<Text>Cor:</Text>
						<Input
							id={"cor_urna"}
							type="text"
							defaultValue={fields.cor_urna}
							onChange={handleInputChange}
						/>
					</Column>
					<Column>
						<Text>Tipo:</Text>
						<Input
							id={"classe_urna"}
							type="text"
							defaultValue={fields.classe_urna}
							onChange={handleInputChange}
						/>
					</Column>
					<Column>
						<Text>Estoque:</Text>
						<Input
							id={"quantidade"}
							type="number"
							defaultValue={fields.quantidade}
							onChange={handleInputChange}
						/>
					</Column>
				</Row>
				<Row>
					{!isNew && (
						<Button onClick={handleDelete} danger>
							Excluir
						</Button>
					)}

					<Button onClick={handleSaveUrna} success>
						Salvar
					</Button>
				</Row>
			</CardDetails>
		</>
	);
}

export default UrnaDetailsPage;
