import React from "react";
import styled from "styled-components";

import Text from "./Text";

export default function Checkbox(props) {
	const Checkbox = styled.input.attrs({
		type: "checkbox",
	})`
		margin: 10px 10px 10px 10px;
		transform: scale(1.5);
	`;

	return (
		<>
			<Checkbox
				id={props.id}
				checked={props.checked}
				onChange={props.onChange}
				value={props.value}
				disabled={props.disabled}
			/>
			<Text margin={"10px 10px 10px 0px"}>{props.label}</Text>
		</>
	);
}
