import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";
import Row from "../../components/Row";
import Column from "../../components/Column";
import { Input, Select, TextArea } from "../../components/Input";
import Text from "../../components/Text";
import useDynamicForm from "../../hooks/useDynamicForm";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import ButtonGroup from "../../components/ButtonGroup";

function ClienteDetailsPage(props) {
	const { fields, setFields, handleInputChange } = useDynamicForm();
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const id = props.match.params.id;
	const isNew = id === "new";
	const session = JSON.parse(sessionStorage.getItem("session"));

	useEffect(() => {
		if (!isNew) {
			setLoading(true);

			axios
				.get(`listarClienteById/${id}`)
				.then(function (response) {
					setFields(response.data);
					setLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
				});
		}
	}, [id, setFields, isNew]);

	useEffect(() => {
		if (fields.cep_cli && fields.cep_cli.length === 8) {
			// axios
			// 	.get(`http://viacep.com.br/ws/${fields.cep_cli}/json/`)
			// 	.then(function (response) {
			// 		// setFields(response.data);
			// 		console.log(response.data);
			// 		setLoading(false);
			// 	})
			// 	.catch(function (error) {
			// 		console.log(error);
			// 		setLoading(false);
			// 	});
		}
	}, [fields.cep_cli]);

	const handlePost = () => {
		const body = { ...fields };
		body.cdOwner = session && session.owner;
		delete body.id;

		setLoading(true);

		axios
			.post(`cadastrarCliente`, body)
			.then(function (response) {
				toast.success("Cliente cadastrado com sucesso");
				props.history.push("/clientes");
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	};

	const handlePut = () => {
		const body = { ...fields };
		body.cdOwner = session && session.owner;

		setLoading(true);

		axios
			.put(`atualizarCliente/${id}`, body)
			.then(function (response) {
				toast.success("Cliente atualizado com sucesso");
				props.history.push("/clientes");
				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				toast.error(error);
			});
	};

	const handleDelete = () => {
		setLoading(true);

		axios
			.delete(`deletarCliente/${id}`)
			.then(function (response) {
				toast.success("Cliente excluído com sucesso");
				props.history.push("/clientes");
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	};

	const handleSaveUrna = () => {
		if (isNew) {
			handlePost();
		} else {
			handlePut();
		}
	};

	const handleToggleModal = () => {
		setShowModal(!showModal);
	};

	const handleConfirmModalButton = () => {
		setShowModal(false);
		setLoading(true);
		handleDelete();
	};

	return (
		<>
			<Modal
				showModal={showModal}
				modalTitle="Tem certeza que deseja excluir este item?"
				modalBody="Caso continue, essas informações serão perdidas!"
				handleToggleModal={handleToggleModal}
				handleConfirmModalButton={handleConfirmModalButton}
			/>
			<Container showModal={showModal}>
				<Header title="Cadastro de Cliente" />
				<CardDetails>
					<Loading loading={loading} absolute />
					<Row>
						<Column>
							<Text>Código: </Text>
							<Input
								id={"id_cli"}
								type="text"
								defaultValue={fields.id_cli}
								onChange={handleInputChange}
								disabled
							/>
						</Column>
						<Column>
							<Text>Tipo:</Text>
							<Select
								id={"tipo_cli"}
								value={fields.tipo_cli}
								onChange={handleInputChange}
							>
								<option value="">Selecione</option>
								<option value="fisica">Pessoa Física</option>
								<option value="juridica">
									Pessoa Jurídica
								</option>
							</Select>
						</Column>
						<Column>
							<Text>CPF/CNPJ:</Text>
							<Input
								id={"doc_cli"}
								type="text"
								maxLength={18}
								value={fields.doc_cli}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Nome:</Text>
							<Input
								id={"nome_cli"}
								type="text"
								defaultValue={fields.nome_cli}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>CEP:</Text>
							<Input
								id={"cep_cli"}
								type="number"
								defaultValue={fields.cep_cli}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Endereço:</Text>
							<Input
								id={"end_cli"}
								type="text"
								defaultValue={fields.end_cli}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Telefone:</Text>
							<Input
								id={"tel_cli"}
								type="tel"
								defaultValue={fields.tel_cli}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>E-mail:</Text>
							<Input
								id={"email_cli"}
								type="email"
								defaultValue={fields.email_cli}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Obs:</Text>
							<TextArea
								id={"obs_cli"}
								defaultValue={fields.obs_cli}
								onChange={handleInputChange}
							/>
						</Column>
					</Row>
					<Row style={{ justifyContent: "center" }}>
						<ButtonGroup>
							{!isNew && (
								<Button onClick={handleToggleModal} danger>
									Excluir
								</Button>
							)}

							<Button onClick={handleSaveUrna} success>
								Salvar
							</Button>
						</ButtonGroup>
					</Row>
				</CardDetails>
			</Container>
		</>
	);
}

export default ClienteDetailsPage;
