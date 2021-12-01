import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";
import Row from "../../components/Row";
import Column from "../../components/Column";
import { Input } from "../../components/Input";
import Text from "../../components/Text";
import useDynamicForm from "../../hooks/useDynamicForm";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import ButtonGroup from "../../components/ButtonGroup";

function ParametrosPage(props) {
	const { fields, setFields, handleInputChange } = useDynamicForm();
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

	const handleSaveUrna = () => {
		if (isNew) {
			handlePost();
		} else {
			handlePut();
		}
	};

	return (
		<Container>
			<Row>Parâmetros</Row>
			<CardDetails>
				<Loading loading={loading} absolute />
				<Row>
					<Text>Limite de usuários:</Text>
					<Input
						id={"limite_usu_config"}
						type="text"
						defaultValue={fields.limite_usu_config}
						onChange={handleInputChange}
						disabled
					/>
				</Row>
				<Row>
					<Text>Limite de urnas:</Text>
					<Input
						id={"limite_urna_config"}
						type="text"
						defaultValue={fields.limite_urna_config}
						onChange={handleInputChange}
						disabled
					/>
				</Row>
				<Row>
					<Text>Relatório + balanço:</Text>
					<Input
						id={"relatorio_config"}
						type="text"
						defaultValue={fields.relatorio_config}
						onChange={handleInputChange}
						disabled
					/>
				</Row>
				<Row>
					<Text>Backup:</Text>
					<Input
						id={"backup_config"}
						type="text"
						defaultValue={fields.backup_config}
						onChange={handleInputChange}
						disabled
					/>
				</Row>
				<Row>
					<Text>Suporte:</Text>
					<Input
						id={"suporte_config"}
						type="text"
						defaultValue={fields.suporte_config}
						onChange={handleInputChange}
						disabled
					/>
				</Row>
				<Row>
					<Text>Desenvolvimento:</Text>
					<Input
						id={"dev_nova_func_config"}
						type="text"
						defaultValue={fields.dev_nova_func_config}
						onChange={handleInputChange}
						disabled
					/>
				</Row>
				<Row>
					<Text>Notificação(email):</Text>
					<Input
						id={"notifica_email_config"}
						type="text"
						defaultValue={fields.notifica_email_config}
						onChange={handleInputChange}
						disabled
					/>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<ButtonGroup>
						<Button onClick={handleSaveUrna} success>
							Salvar
						</Button>
					</ButtonGroup>
				</Row>
			</CardDetails>
		</Container>
	);
}

export default ParametrosPage;
