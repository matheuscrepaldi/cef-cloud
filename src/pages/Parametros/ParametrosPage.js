import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";

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

const LeftPanel = styled(Column)`
	align-items: flex-end;
	margin: 10px;
`;

const RightPanel = styled(Column)`
	align-items: flex-start;
	margin: 10px;
`;

function ParametrosPage() {
	const { fields, setFields, handleInputChange } = useDynamicForm();
	const [loading, setLoading] = useState(false);
	const session = JSON.parse(sessionStorage.getItem("session"));

	useEffect(() => {
		setLoading(true);

		axios
			.get(`listarPlanos`)
			.then(function (response) {
				setFields(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
				setLoading(false);
			});
	}, [setFields]);

	const handlePut = () => {
		const body = { ...fields };
		body.cdOwner = session && session.owner;

		setLoading(true);

		axios
			.put(`atualizarPlano/${fields.id_config}`, body)
			.then(function (response) {
				toast.success(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				toast.error(error);
			});
	};

	const handleSaveUrna = () => {
		handlePut();
	};

	return (
		<Container>
			<Row style={{ justifyContent: "center" }}>
				Parâmetros {`(${fields.plano_owner})`}
			</Row>
			<CardDetails>
				<Loading loading={loading} absolute />
				<Row style={{ justifyContent: "center" }}>
					<LeftPanel>
						<Text>Limite de usuários:</Text>
					</LeftPanel>
					<RightPanel>
						<Input
							id={"limite_usu_config"}
							type="text"
							defaultValue={fields.limite_usu_config}
							onChange={handleInputChange}
							disabled={fields.plano_owner !== "enterprise"}
						/>
					</RightPanel>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<LeftPanel>
						<Text>Limite de urnas:</Text>
					</LeftPanel>
					<RightPanel>
						<Input
							id={"limite_urna_config"}
							type="text"
							defaultValue={fields.limite_urna_config}
							onChange={handleInputChange}
							disabled
						/>
					</RightPanel>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<LeftPanel>
						<Text>Relatório + balanço:</Text>
					</LeftPanel>
					<RightPanel>
						<Input
							id={"relatorio_config"}
							type="text"
							value={fields.relatorio_config ? "Sim" : "Não"}
							onChange={handleInputChange}
							disabled
						/>
					</RightPanel>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<LeftPanel>
						<Text>Backup(dias):</Text>
					</LeftPanel>
					<RightPanel>
						<Input
							id={"backup_config"}
							type="text"
							defaultValue={fields.backup_config}
							onChange={handleInputChange}
							disabled
						/>
					</RightPanel>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<LeftPanel>
						<Text>Suporte(dias úteis):</Text>
					</LeftPanel>
					<RightPanel>
						<Input
							id={"suporte_config"}
							type="text"
							defaultValue={fields.suporte_config}
							onChange={handleInputChange}
							disabled
						/>
					</RightPanel>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<LeftPanel>
						<Text>Desenvolvimento(horas):</Text>
					</LeftPanel>
					<RightPanel>
						<Input
							id={"dev_nova_func_config"}
							type="number"
							defaultValue={fields.dev_nova_func_config}
							onChange={handleInputChange}
						/>
					</RightPanel>
				</Row>
				<Row style={{ justifyContent: "center" }}>
					<LeftPanel>
						<Text>Email:</Text>
					</LeftPanel>
					<RightPanel>
						<Input
							id={"notifica_email_config"}
							type="text"
							value={fields.notifica_email_config ? "Sim" : "Não"}
							onChange={handleInputChange}
							disabled
						/>
					</RightPanel>
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
