import styled from "styled-components";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 10px;
	align-items: center;
	flex: 1;
	min-height: 40px;
	padding: 5px 10px;
	border: 1px solid #59bfff;
	border-radius: 10px;
	background: #fff;
	position: relative;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);

	:hover {
		cursor: pointer;
		border: 1px solid #0da2ff;
		background: #f2faff;
	}
`;

export default Card;
