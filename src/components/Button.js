import styled from "styled-components";

const Button = styled.button`
	font-weight: 600;
	text-align: center;
	font-size: 14px;
	color: #fff;
	background-color: #59bfff;
	width: 100%;
	height: 40px;
	border: none;
	border-radius: 4px;
	padding: 5px;
	cursor: pointer;
	overflow: hidden;
	transition: all 200ms ease-in-out;
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
	:hover {
		box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
	}
`;

export default Button;
