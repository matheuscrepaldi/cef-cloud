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
import Loading from "../../components/Loading";
import ButtonGroup from "../../components/ButtonGroup";
import { today } from "../../utils/convertDate";

function MovimentacaoDetailsPage(props) {
	const { fields, setFields, handleInputChange } = useDynamicForm();
	const [loading, setLoading] = useState(false);
	const [urnas, setUrnas] = useState([]);
	const [clientes, setClientes] = useState([]);
	const [fornecedores, setFornecedores] = useState([]);

	const id = props.match.params.id;
	const isNew = id === "new";
	const session = JSON.parse(sessionStorage.getItem("session"));

	const podeCalcular =
		fields.tipo_mov &&
		fields.tipo_mov !== "" &&
		fields.id_urna &&
		fields.id_urna !== "";

	useEffect(() => {
		async function getMovimentacao() {
			setLoading(true);

			axios
				.get(`listarMovById/${id}`)
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

		if (!isNew) {
			getMovimentacao();
		} else {
			setFields({ dt_hr_mov: today(), qtde_mov: 0 });
		}
	}, [id, setFields, isNew]);

	useEffect(() => {
		if (fields.tipo_mov && fields.tipo_mov !== "") {
			const result = handleEntradaSaida(
				fields.quantidade,
				fields.qtde_mov
			);

			setFields({ ...fields, resumo_estoque: result });
		}

		if (fields.tipo_mov === "Saída") {
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
		} else if (fields.tipo_mov === "Entrada") {
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
		if (urnas.length > 0) {
			const result = urnas.find(
				(urna) => urna.id_urna === Number(fields.id_urna)
			);

			if (result) {
				setFields({
					...fields,
					nome_urna: result.nome_urna,
					tamanho_urna: result.tamanho_urna,
					classe_urna: result.classe_urna,
					quantidade: result.quantidade,
					resumo_estoque: handleEntradaSaida(
						result.quantidade,
						fields.qtde_mov
					),
				});
			}
		}
	}, [urnas]);

	useEffect(() => {
		if (fields.id_urna && fields.id_urna !== "") {
			const result = urnas.find(
				(urna) => urna.id_urna === Number(fields.id_urna)
			);

			if (result) {
				setFields({
					...fields,
					nome_urna: result.nome_urna,
					tamanho_urna: result.tamanho_urna,
					classe_urna: result.classe_urna,
					quantidade: result.quantidade,
					resumo_estoque: handleEntradaSaida(
						result.quantidade,
						fields.qtde_mov
					),
				});
			}
		} else if (fields.id_urna === "") {
			setFields({
				...fields,
				nome_urna: "",
				tamanho_urna: "",
				classe_urna: "",
				quantidade: "",
				resumo_estoque: "",
			});
		}
	}, [fields.id_urna]);

	useEffect(() => {
		if (fields.qtde_mov > 0) {
			let result = handleEntradaSaida(fields.quantidade, fields.qtde_mov);
			if (result < 0) {
				toast.error("Estoque indisponível");
			}
			setFields({ ...fields, resumo_estoque: result });
		}
	}, [fields.qtde_mov]);

	const handleEntradaSaida = (val1, val2) => {
		let result = 0;

		if (fields.tipo_mov && fields.tipo_mov !== "") {
			if (fields.tipo_mov === "Entrada") {
				result = Number(val1) + Number(val2);
			} else {
				result = Number(val1) - Number(val2);
			}
		}

		return result;
	};

	const handlePost = () => {
		const body = { ...fields };
		body.cdOwner = session && session.owner;
		// delete body.id;

		setLoading(true);

		axios
			.post(`gravarMovimentacao`, body)
			.then(function (response) {
				toast.success("Movimentação cadastrada com sucesso");
				props.history.push("/movimentacoes");
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				toast.error("Erro ao criar movimentação");
				setLoading(false);
			});
	};

	const handleSaveUrna = () => {
		if (isNew) {
			handlePost();
		}
	};

	const canFilter =
		fields.tipo_mov === "Entrada" &&
		fields.id_forn &&
		fields.id_forn !== "";
	const urnasFiltradas = canFilter
		? urnas.filter((urn) => urn.idForn === Number(fields.id_forn))
		: urnas;

	return (
		<Container>
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
							disabled={!isNew}
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
								id={"id_forn"}
								value={fields.id_forn}
								onChange={handleInputChange}
								disabled={!isNew}
							>
								<option value="">Selecione</option>
								{fornecedores.map((forn, i) => {
									return (
										<option key={i} value={forn.id_forn}>
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
								id={"id_cli"}
								value={fields.id_cli}
								onChange={handleInputChange}
								disabled={!isNew}
							>
								<option value="">Selecione</option>
								{clientes.map((cli, i) => {
									return (
										<option key={i} value={cli.id_cli}>
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
							id={"id_urna"}
							value={fields.id_urna}
							onChange={handleInputChange}
							disabled={!isNew}
						>
							<option value="">Selecione</option>
							{urnasFiltradas.map((urna, i) => {
								return (
									<option
										key={i}
										value={urna.id_urna}
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
						<Text>Estoque atual:</Text>
						<Input
							id={"quantidade"}
							type="number"
							defaultValue={fields.quantidade}
							onChange={handleInputChange}
							disabled
						/>
					</Column>
					<Column>
						<Text>
							Quantidade
							{fields.tipo_mov &&
								fields.tipo_mov !== "" &&
								` para ${fields.tipo_mov}`}
							:
						</Text>
						<Input
							id={"qtde_mov"}
							type="number"
							defaultValue={fields.qtde_mov}
							onChange={handleInputChange}
							disabled={!podeCalcular || !isNew}
						/>
					</Column>
					<Column>
						<Text>Resumo estoque:</Text>
						<Input
							id={"resumo_estoque"}
							type="number"
							className={fields.resumo_estoque < 0 && "danger"}
							defaultValue={fields.resumo_estoque}
							onChange={handleInputChange}
							disabled
						/>
					</Column>
					<Column>
						<Text>Data/Hora:</Text>
						<Input
							id={"dt_hr_mov"}
							type="datetime-local"
							defaultValue={fields.dt_hr_mov}
							onChange={handleInputChange}
							disabled={!isNew}
						/>
					</Column>
				</Row>
				{isNew && (
					<Row style={{ justifyContent: "center" }}>
						<ButtonGroup>
							<Button
								onClick={handleSaveUrna}
								success
								disabled={!isNew}
							>
								Salvar
							</Button>
						</ButtonGroup>
					</Row>
				)}
			</CardDetails>
		</Container>
	);
}

export default MovimentacaoDetailsPage;
