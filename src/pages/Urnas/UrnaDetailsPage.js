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
import { today } from "../../utils/convertDate";

function UrnaDetailsPage(props) {
	const { fields, setFields, handleInputChange } = useDynamicForm();
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fornecedores, setFornecedores] = useState([]);

	const id = props.match.params.id;
	const isNew = id === "new";
	const session = JSON.parse(sessionStorage.getItem("session"));

	useEffect(() => {
		async function getUrna() {
			setLoading(true);

			axios
				.get(`listarUrnaById/${id}`)
				.then(function (response) {
					setFields(response.data);
					setLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
				});
		}

		async function listarFornecedores() {
			axios
				.get(`listarFornecedores`)
				.then(function (response) {
					setFornecedores(response.data);
					setLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
				});
		}

		setLoading(true);
		listarFornecedores();

		if (!isNew) {
			getUrna();
		} else {
			setFields({ dt_hr_entrada: today() });
		}
	}, [id, setFields, isNew]);

	const handlePost = () => {
		const body = { ...fields };
		body.cdOwner = session && session.owner;
		// delete body.id;

		if (!body.dt_hr_entrada || body.dt_hr_entrada === "") {
			toast.error("Preencha a data");
			return;
		}

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
				<Header title="Cadastro da Urna" />
				<CardDetails>
					<Loading loading={loading} absolute />
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
							<Text>Fornecedor:</Text>
							<Select
								id={"idForn"}
								value={fields.idForn}
								onChange={handleInputChange}
							>
								<option value="">Selecione</option>
								{fornecedores.map((fornec) => {
									return (
										<option value={fornec.id_forn}>
											{fornec.rz_forn}
										</option>
									);
								})}
							</Select>
						</Column>
						<Column>
							<Text>Data/Hora:</Text>
							<Input
								id={"dt_hr_entrada"}
								type="datetime-local"
								defaultValue={fields.dt_hr_entrada}
								onChange={handleInputChange}
								disabled={!isNew}
							/>
						</Column>
						<Column>
							<Text>Estoque:</Text>
							<Input
								id={"quantidade"}
								type="number"
								defaultValue={fields.quantidade}
								onChange={handleInputChange}
								disabled={!isNew}
							/>
						</Column>
						<Column>
							<Text>Valor unitário:</Text>
							<Input
								id={"val_unit"}
								type="number"
								defaultValue={fields.val_unit}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Valor total:</Text>
							<Input
								id={"val_total"}
								type="number"
								defaultValue={
									fields.val_total &&
									fields.val_total.toFixed(2)
								}
								onChange={handleInputChange}
								disabled
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

export default UrnaDetailsPage;
