import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";
import Row from "../../components/Row";
import Column from "../../components/Column";
import { Input, Select } from "../../components/Input";
import Text from "../../components/Text";
import Title from "../../components/Title";
import useDynamicForm from "../../hooks/useDynamicForm";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import ButtonGroup from "../../components/ButtonGroup";

function MovimentacaoDetailsPage(props) {
	const { fields, setFields, handleInputChange } = useDynamicForm();
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [urnas, setUrnas] = useState([]);
	const [clientes, setClientes] = useState([]);
	const [fornecedores, setFornecedores] = useState([]);

	const id = props.match.params.id;
	const isNew = id === "new";
	const session = JSON.parse(sessionStorage.getItem("session"));

	useEffect(() => {
		if (!isNew) {
			setLoading(true);

			axios
				.get(`listarMovimentacao/${id}`)
				.then(function (response) {
					setFields(response.data);
					setLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
				});
		}

		async function getUrnas() {
			axios
				.get(`listarUrnas/`)
				.then(function (response) {
					setUrnas(response.data);
					setLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
				});
		}

		setLoading(true);
		getUrnas();
	}, [id, setFields, isNew]);

	useEffect(() => {
		if (fields.tipo_mov === "Saída" && clientes.length === 0) {
			setLoading(true);
			axios
				.get(`listarClientes/`)
				.then(function (response) {
					setClientes(response.data);
					setLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
				});
		} else if (fields.tipo_mov === "Entrada" && fornecedores.length === 0) {
			setLoading(true);
			axios
				.get(`listarFornecedores/`)
				.then(function (response) {
					setFornecedores(response.data);
					setLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
				});
		}
	}, [fields.tipo_mov]);

	useEffect(() => {
		if (fields.idUrna !== "") {
			const result = urnas.find(
				(urna) => urna.id === Number(fields.idUrna)
			);

			if (result) {
				setFields({
					...fields,
					nome_urna: result.nome_urna,
					tamanho_urna: result.tamanho_urna,
					classe_urna: result.classe_urna,
				});
			}
		} else {
			setFields({
				...fields,
				nome_urna: "",
				tamanho_urna: "",
				classe_urna: "",
			});
		}
	}, [fields.idUrna]);

	const handlePost = () => {
		const body = { ...fields };
		body.cdOwner = session && session.owner;
		delete body.id;

		setLoading(true);

		axios
			.post(`cadastrarUrna`, body)
			.then(function (response) {
				toast.success("Urna cadastrada com sucesso");
				props.history.push("/urnas");
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
		// delete body.id;

		setLoading(true);

		axios
			.put(`atualizarUrna/${id}`, body)
			.then(function (response) {
				toast.success("Urna atualizada com sucesso");
				props.history.push("/urnas");
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
			.delete(`deletarUrna/${id}`)
			.then(function (response) {
				toast.success("Urna excluída com sucesso");
				props.history.push("/urnas");
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
				<Header title="Nova Movimentação" />
				<CardDetails>
					<Loading loading={loading} absolute />
					<Row>
						<Column>
							<Text>Movimentação:</Text>
							<Select
								id={"tipo_mov"}
								value={fields.tipo_mov}
								onChange={handleInputChange}
							>
								<option value="">Selecione</option>
								<option value="Entrada">Entrada</option>
								<option value="Saída">Saída</option>
							</Select>
						</Column>
						{fields.tipo_mov === "Entrada" && (
							<Column>
								<Text>Fornecedor:</Text>
								<Select
									id={"idForn"}
									value={fields.idForn}
									onChange={handleInputChange}
								>
									<option value="">Selecione</option>
									{fornecedores.map((forn) => {
										return (
											<option value={forn.id_forn}>
												{forn.rz_forn}
											</option>
										);
									})}
								</Select>
							</Column>
						)}
						{fields.tipo_mov === "Saída" && (
							<Column>
								<Text>Cliente:</Text>
								<Select
									id={"idCli"}
									value={fields.idCli}
									onChange={handleInputChange}
								>
									<option value="">Selecione</option>
									{clientes.map((cli) => {
										return (
											<option value={cli.id_cli}>
												{cli.nome_cli}
											</option>
										);
									})}
								</Select>
							</Column>
						)}
						<Column>
							<Text>Referência:</Text>
							<Select
								id={"idUrna"}
								value={fields.idUrna}
								onChange={handleInputChange}
							>
								<option value="">Selecione</option>
								{urnas.map((urna) => {
									return (
										<option
											value={urna.id}
										>{`${urna.ref_urna} - ${urna.cor_urna}`}</option>
									);
								})}
							</Select>
						</Column>
						<Column>
							<Text>Descrição:</Text>
							<Input
								id={"nome_urna"}
								type="text"
								defaultValue={fields.nome_urna}
								onChange={handleInputChange}
								disabled
							/>
						</Column>
						<Column>
							<Text>Tamanho:</Text>
							<Input
								id={"tamanho_urna"}
								type="text"
								defaultValue={fields.tamanho_urna}
								onChange={handleInputChange}
								disabled
							/>
						</Column>
						<Column>
							<Text>Tipo:</Text>
							<Input
								id={"classe_urna"}
								type="text"
								defaultValue={fields.classe_urna}
								onChange={handleInputChange}
								disabled
							/>
						</Column>
						<Column>
							<Text>Quantidade:</Text>
							<Input
								id={"qtde_mov"}
								type="number"
								defaultValue={fields.qtde_mov}
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

export default MovimentacaoDetailsPage;
