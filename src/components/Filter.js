import React, { useState } from "react";
import styled from "styled-components";
import { BsPlusLg, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Row from "./Row";
import Column from "./Column";
import Text from "./Text";
import { Input, Select } from "./Input";
import DialogContainer from "./DialogContainer";

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

function Filter(props) {
	const [rows, setRows] = useState([{ id: 1, field: "", value: "" }]);

	const addLine = () => {
		const list = [...rows];
		const lastNumber = list.pop();
		const result = { id: Number(lastNumber.id) + 1, field: "", value: "" };

		setRows([...rows, result]);
	};

	const removeLine = (id) => {
		setRows(rows.filter((row) => row.id !== id));
	};

	const resetFilter = () => {
		setRows([{ id: 1, field: "", value: "" }]);
	};

	const handleInputChange = (e, id) => {
		e.preventDefault();

		const fieldType = e.target.id; // campos1
		const value = e.target.value; //rz_forn

		const result = rows.map((row) => {
			if (row.id === id) {
				if (fieldType.includes("valorInicial")) {
					row.value = value;
				} else if (fieldType.includes("valorFinal")) {
					row.value2 = value;
				} else if (fieldType.includes("campo")) {
					row.field = value;
				} else {
					row.value = value;
				}
			}

			return row;
		});

		setRows(result);
	};

	const handleConfirmFilter = () => {
		const empty = rows.find((row) => row.field === "" || row.value === "");

		if (empty) {
			toast.error("Preencha todos os campos");
			return;
		}

		let url = "";

		rows.map((row, i) => {
			i === 0 ? (url += "") : (url += "&");

			if (row.field.includes("dt_hr")) {
				url += `dt_ini=${row.value}T00:00&dt_fim=${row.value2}T23:59`;
				return row;
			}

			url += `${row.field}=${row.value}`;

			return row;
		});

		props.handleConfirmFilter &&
			props.handleConfirmFilter(url.toLowerCase(), rows.length);
	};

	const hasList = (id) => {
		const result = props.fields.find((f) => f.id === id && f.list);
		return result;
	};

	return (
		<DialogContainer showModal={props.showModal} className="dialog">
			<Title>Filtro</Title>

			<Column
				style={{ overflowY: "auto", overflowX: "hidden", margin: 0 }}
			>
				{rows.map((row, key) => {
					const obj = hasList(row.field);

					return (
						<Row key={key} style={{ alignItems: "flex-end" }}>
							<Column style={{ margin: "10px 20px" }}>
								<Text>Campos</Text>
								<Select
									id={`campo${row.id}`}
									value={row.field}
									onChange={(e) =>
										handleInputChange(e, row.id)
									}
								>
									<option value=""></option>
									{props.fields.map((field) => {
										return (
											<option value={field.id}>
												{field.value}
											</option>
										);
									})}
								</Select>
							</Column>
							{row.field.includes("dt_hr") ? (
								<>
									<Column style={{ margin: "10px 20px" }}>
										<Text>Data Inicial</Text>
										<Input
											style={{ width: "auto" }}
											id={`valorInicial${row.id}`}
											type="date"
											defaultValue={row.value}
											onChange={(e) =>
												handleInputChange(e, row.id)
											}
										/>
									</Column>
									<Column style={{ margin: "10px 20px" }}>
										<Text>Data Final</Text>
										<Input
											style={{ width: "auto" }}
											id={`valorFinal${row.id}`}
											type="date"
											defaultValue={row.value2}
											onChange={(e) =>
												handleInputChange(e, row.id)
											}
										/>
									</Column>
								</>
							) : (
								<Column style={{ margin: "10px 20px" }}>
									<Text>Valor</Text>
									{obj ? (
										<Select
											id={`valor${row.id}`}
											value={row.value}
											onChange={(e) =>
												handleInputChange(e, row.id)
											}
										>
											<option value=""></option>
											{obj?.list?.map((item) => {
												return (
													<option value={item.id}>
														{item.value}
													</option>
												);
											})}
										</Select>
									) : (
										<Input
											id={`valor${row.id}`}
											type="text"
											value={row.value}
											onChange={(e) =>
												handleInputChange(e, row.id)
											}
										/>
									)}
								</Column>
							)}

							<Column style={{ margin: "10px 20px" }}>
								{row.id === 1 ? (
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
										onClick={() => removeLine(row.id)}
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
				<Button type="button" onClick={resetFilter} info>
					Limpar
				</Button>
				<Button type="button" onClick={props.handleToggleModal} cancel>
					Cancelar
				</Button>
				<Button type="button" onClick={handleConfirmFilter} success>
					Confirmar
				</Button>
			</ButtonGroup>
		</DialogContainer>
	);
}

export default Filter;
