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

function FunerariaDetailsPage(props) {
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
				.get(`listarFunerariaById/${id}`)
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
		const cep = fields.cep_owner.replace(/\D/g, "");

		//Verifica se campo cep possui valor informado.
		if (cep !== "") {
			//Expressão regular para validar o CEP.
			const validacep = /^[0-9]{8}$/;

			//Valida o formato do CEP.
			if (validacep.test(cep)) {
				setLoading(true);

				fetch(`http://viacep.com.br/ws/${fields.cep_owner}/json/`)
					.then((response) => response.json())
					.then((result) => {
						setFields({
							...fields,
							cep_owner: result.cep,
							cidade_owner: result.localidade,
							bairro_owner: result.bairro,
							end_owner: result.logradouro,
							estado_owner: result.uf,
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
			.post(`cadastrarFuneraria`, body)
			.then(function (response) {
				toast.success("Funerária cadastrada com sucesso");
				props.history.push("/funerarias");
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
			.put(`atualizarFuneraria/${id}`, body)
			.then(function (response) {
				toast.success("Funerária atualizada com sucesso");
				props.history.push("/funerarias");
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
			.delete(`deletarFuneraria/${id}`)
			.then(function (response) {
				toast.success("Funerária excluída com sucesso");
				props.history.push("/funerarias");
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	};

	const handleSaveFuneraria = () => {
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
				<Header title="Cadastro de Funerária" />
				<CardDetails>
					<Loading loading={loading} absolute />
					<Row>
						<Column>
							<Text>Código: </Text>
							<Input
								id={"cd_owner"}
								type="text"
								defaultValue={fields.cd_owner}
								onChange={handleInputChange}
								disabled
							/>
						</Column>
						<Column>
							<Text>CNPJ:</Text>
							<Input
								id={"cnpj_owner"}
								type="text"
								maxLength={18}
								value={fields.cnpj_owner}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Nome:</Text>
							<Input
								id={"nome_owner"}
								type="text"
								defaultValue={fields.nome_owner}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>CEP:</Text>
							<Input
								id={"cep_owner"}
								type="text"
								maxLength={9}
								onBlur={checkCep}
								defaultValue={fields.cep_owner}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Endereço:</Text>
							<Input
								id={"end_owner"}
								type="text"
								defaultValue={fields.end_owner}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Bairro:</Text>
							<Input
								id={"bairro_owner"}
								type="text"
								defaultValue={fields.bairro_owner}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Cidade:</Text>
							<Input
								id={"cidade_owner"}
								type="text"
								defaultValue={fields.cidade_owner}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>Estado:</Text>
							<Select
								id={"estado_owner"}
								value={fields.estado_owner}
								onChange={handleInputChange}
							>
								<option value="AC">Acre</option>
								<option value="AL">Alagoas</option>
								<option value="AP">Amapá</option>
								<option value="AM">Amazonas</option>
								<option value="BA">Bahia</option>
								<option value="CE">Ceará</option>
								<option value="DF">Distrito Federal</option>
								<option value="ES">Espírito Santo</option>
								<option value="GO">Goiás</option>
								<option value="MA">Maranhão</option>
								<option value="MT">Mato Grosso</option>
								<option value="MS">Mato Grosso do Sul</option>
								<option value="MG">Minas Gerais</option>
								<option value="PA">Pará</option>
								<option value="PB">Paraíba</option>
								<option value="PR">Paraná</option>
								<option value="PE">Pernambuco</option>
								<option value="PI">Piauí</option>
								<option value="RJ">Rio de Janeiro</option>
								<option value="RN">Rio Grande do Norte</option>
								<option value="RS">Rio Grande do Sul</option>
								<option value="RO">Rondônia</option>
								<option value="RR">Roraima</option>
								<option value="SC">Santa Catarina</option>
								<option value="SP">São Paulo</option>
								<option value="SE">Sergipe</option>
								<option value="TO">Tocantins</option>
							</Select>
						</Column>
						<Column>
							<Text>Telefone:</Text>
							<Input
								id={"tel_owner"}
								type="tel"
								defaultValue={fields.tel_owner}
								onChange={handleInputChange}
							/>
						</Column>
						<Column>
							<Text>E-mail:</Text>
							<Input
								id={"email_owner"}
								type="email"
								defaultValue={fields.email_owner}
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

							<Button onClick={handleSaveFuneraria} success>
								Salvar
							</Button>
						</ButtonGroup>
					</Row>
				</CardDetails>
			</Container>
		</>
	);
}

export default FunerariaDetailsPage;
