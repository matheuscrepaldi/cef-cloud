import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";
import Row from "../../components/Row";
import Column from "../../components/Column";
import { Input, Select } from "../../components/Input";
import Text from "../../components/Text";
import useDynamicForm from "../../hooks/useDynamicForm";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import ButtonGroup from "../../components/ButtonGroup";

function UsuarioDetailsPage(props) {
	const { fields, setFields, handleInputChange } = useDynamicForm();
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [funerarias, setFunerarias] = useState([]);

	const id = props.match.params.id;
	const isNew = id === "new";

	useEffect(() => {
		setLoading(true);
		axios
			.get("listarFunerarias")
			.then(function (response) {
				setFunerarias(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});

		if (!isNew) {
			setLoading(true);

			axios
				.get(`listarUsuariosById/${id}`)
				.then(function (response) {
					const data = response.data || {};
					const owner = data.owner.cd_owner;
					delete data.ower;

					const result = {
						...data,
						cd_owner: owner,
					};

					setFields(result);
					setLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
				});
		}
	}, [id, setFields, isNew]);

	const handlePost = () => {
		const body = { ...fields, owner: { cd_owner: fields.cd_owner } };
		delete body.id;

		setLoading(true);

		axios
			.post(`signup`, body)
			.then(function (response) {
				toast.success("Usuário cadastrado com sucesso");
				props.history.push("/usuarios");
				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				if (error?.response?.status === 403) {
					toast.error(error.response?.data);
				}
			});
	};

	const handlePut = () => {
		const body = { ...fields };

		setLoading(true);

		axios
			.put(`atualizarUsuario/${id}`, body)
			.then(function (response) {
				toast.success("Usuário atualizado com sucesso");
				props.history.push("/usuarios");
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
			.delete(`deletarUsuario/${id}`)
			.then(function (response) {
				toast.success("Usuário excluído com sucesso");
				props.history.push("/usuarios");
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	};

	const handleSaveUsuario = () => {
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
				<Header title="Cadastro de Usuário" />
				<CardDetails>
					<Loading loading={loading} absolute />
					<Row>
						<Column>
							<Text>Código:</Text>
							<Input
								id={"id"}
								type="text"
								defaultValue={fields.id}
								onChange={handleInputChange}
								disabled
							/>
						</Column>
						<Column>
							<Text>Usuário:</Text>
							<Input
								id={"username"}
								type="text"
								value={fields.username}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Senha:</Text>
							<Input
								id={"password"}
								type="password"
								value={fields.password}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Funerária:</Text>
							<Select
								id={"cd_owner"}
								value={fields.cd_owner}
								onChange={handleInputChange}
								disabled={!isNew}
							>
								<option value="">Selecione</option>
								{funerarias.map((fun, i) => {
									return (
										<option
											key={i}
											value={fun.cd_owner}
										>{`${fun.cd_owner} - ${fun.nome_owner}`}</option>
									);
								})}
							</Select>
						</Column>
					</Row>

					<Row style={{ justifyContent: "center" }}>
						<ButtonGroup>
							{!isNew && (
								<Button onClick={handleToggleModal} danger>
									Excluir
								</Button>
							)}

							<Button onClick={handleSaveUsuario} success>
								Salvar
							</Button>
						</ButtonGroup>
					</Row>
				</CardDetails>
			</Container>
		</>
	);
}

export default UsuarioDetailsPage;
