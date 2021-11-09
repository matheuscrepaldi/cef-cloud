import React, { useState } from "react";
import styled from "styled-components";
import { BsPlusLg, BsTrash } from "react-icons/bs";

import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Row from "./Row";
import Column from "./Column";
import Text from "./Text";
import { Input, Select } from "./Input";

const Title = styled.span`
	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	text-align: center;
	color: #282828;
	margin: 10px;
`;

export default function Filter(props) {
	const Dialog = styled.dialog`
		position: absolute;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		max-width: 80%;
		max-height: 80%;
		display: ${props.showFilter ? "flex" : "none"};
		background: #ffffff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		border-radius: 20px;
		border: 0;
		z-index: 2;
	`;

	const [rows, setRows] = useState([0]);

	const addLine = () => {
		const list = [...rows];
		const lastNumber = list.pop();
		const result = Number(lastNumber) + 1;

		setRows([...rows, result]);
	};

	const removeLine = (line) => {
		setRows(rows.filter((row) => row !== line));
	};

	return (
		<Dialog className="dialog">
			<Title>Filtro</Title>

			<Column style={{ overflowY: "auto", overflowX: "hidden" }}>
				{rows.map((row) => {
					return (
						<Row style={{ alignItems: "flex-end" }}>
							<Column>
								<Text>Campos</Text>
								<Select
									id={`campos${row}`}
									// value={fields.campos}
									// onChange={handleInputChange}
								>
									<option value="">Selecione</option>
									{props.fields.map((field) => {
										return (
											<option value={field.name}>
												{field.name}
											</option>
										);
									})}
								</Select>
							</Column>
							<Column>
								<Text>Tipos</Text>
								<Select
									id={`tipos${row}`}
									// value={fields.campos}
									// onChange={handleInputChange}
								>
									<option value="">Selecione</option>
									{props.fields.map((field) => {
										return (
											<option value={field.name}>
												{field.name}
											</option>
										);
									})}
								</Select>
							</Column>
							<Column>
								<Text>Valor </Text>
								<Input
									id={`valor${row}`}
									type="text"
									// defaultValue={fields.id_cli}
									// onChange={handleInputChange}
								/>
							</Column>
							<Column>
								{row === 0 ? (
									<Button
										small
										title="Adicionar Linha"
										success
										onClick={() => addLine()}
									>
										<BsPlusLg color={"ffffff"} />
									</Button>
								) : (
									<Button
										small
										danger
										title="Excluir Linha"
										onClick={() => removeLine(row)}
									>
										<BsTrash size={24} color={"ffffff"} />
									</Button>
								)}
							</Column>
						</Row>
					);
				})}
			</Column>

			<ButtonGroup>
				<Button type="button" onClick={props.handleToggleModal} cancel>
					Cancelar
				</Button>

				<Button type="button" onClick={props.handleConfirmFilter} info>
					Confirmar
				</Button>
			</ButtonGroup>
		</Dialog>
	);
}
