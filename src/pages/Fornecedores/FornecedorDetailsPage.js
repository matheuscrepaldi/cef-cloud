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
import uf from "../../utils/uf";

function FornecedorDetailsPage(props) {
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
				.get(`listarFornecedorById/${id}`)
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

	const checkCep = () => {
		//Nova variável "cep" somente com dígitos.
		const cep = fields.cep_forn.replace(/\D/g, "");

		//Verifica se campo cep possui valor informado.
		if (cep !== "") {
			//Expressão regular para validar o CEP.
			const validacep = /^[0-9]{8}$/;

			//Valida o formato do CEP.
			if (validacep.test(cep)) {
				setLoading(true);

				fetch(`http://viacep.com.br/ws/${fields.cep_forn}/json/`)
					.then((response) => response.json())
					.then((result) => {
						setFields({
							...fields,
							cep_forn: result.cep,
							cidade_forn: result.localidade,
							bairro_forn: result.bairro,
							end_forn: result.logradouro,
							uf_forn: result.uf,
						});
						setLoading(false);
					})
					.catch((e) => {
						console.log(e);
						setLoading(false);
					});
			} //end if.
			else {
				//cep é inválido.
				toast.error("Formato de CEP inválido");
			}
		}
	};

	const handlePost = () => {
		const body = { ...fields };
		body.cdOwner = session && session.owner;
		delete body.id;

		setLoading(true);

		axios
			.post(`cadastrarFornecedor`, body)
			.then(function (response) {
				toast.success("Fornecedor cadastrado com sucesso");
				props.history.push("/fornecedores");
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
			.put(`atualizarFornecedor/${id}`, body)
			.then(function (response) {
				toast.success("Fornecedor atualizado com sucesso");
				props.history.push("/fornecedores");
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
			.delete(`deletarFornecedor/${id}`)
			.then(function (response) {
				toast.success("Fornecedor excluído com sucesso");
				props.history.push("/fornecedores");
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
				<Header title="Cadastro de Fornecedor" />
				<CardDetails>
					<Loading loading={loading} absolute />
					<Row>
						<Column>
							<Text>Código: </Text>
							<Input
								id={"id_forn"}
								type="text"
								defaultValue={fields.id_forn}
								onChange={handleInputChange}
								disabled
							/>
						</Column>
						<Column>
							<Text>CNPJ:</Text>
							<Input
								id={"doc_forn"}
								type="text"
								maxLength={18}
								value={fields.doc_forn}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Nome:</Text>
							<Input
								id={"rz_forn"}
								type="text"
								defaultValue={fields.rz_forn}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>CEP:</Text>
							<Input
								id={"cep_forn"}
								type="text"
								maxLength={9}
								onBlur={checkCep}
								defaultValue={fields.cep_forn}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Endereço:</Text>
							<Input
								id={"end_forn"}
								type="text"
								defaultValue={fields.end_forn}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Bairro:</Text>
							<Input
								id={"bairro_forn"}
								type="text"
								defaultValue={fields.bairro_forn}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Cidade:</Text>
							<Input
								id={"cidade_forn"}
								type="text"
								defaultValue={fields.cidade_forn}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Estado:</Text>
							<Select
								id={"uf_forn"}
								value={fields.uf_forn}
								onChange={handleInputChange}
							>
								{uf.map((u) => {
									return (
										<option value={u.id}>{u.value}</option>
									);
								})}
							</Select>
						</Column>
						<Column>
							<Text>Telefone:</Text>
							<Input
								id={"tel_forn"}
								type="tel"
								defaultValue={fields.tel_forn}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>E-mail:</Text>
							<Input
								id={"email_forn"}
								type="email"
								defaultValue={fields.email_forn}
								onChange={handleInputChange}
							/>
						</Column>
					</Row>
					<Row>
						<Column>
							<Text>Obs:</Text>
							<TextArea
								id={"obs_forn"}
								maxLength={255}
								defaultValue={fields.obs_forn}
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

export default FornecedorDetailsPage;
