import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
	border: 1px solid;
	width: 100%;
	display: none;
`;

function Report(props) {
	return (
		<StyledTable ref={props.ref}>
			<tr>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
			</tr>
			<tr>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
			</tr>
			<tr>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
			</tr>
		</StyledTable>
	);
}

export default Report;
