import styled from "styled-components";

const Input = styled.input`
	min-width: 200px;
	font-size: 16px;
	line-height: 28px;
	padding: 5px;
	width: 100%;
	height: 40px;
	border: unset;
	border-radius: 4px;
	outline-color: #59bfff;
	background-color: rgb(255, 255, 255);
	box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;

	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export default Input;
