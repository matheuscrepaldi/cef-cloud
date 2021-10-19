import styled from "styled-components";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 10px;
	align-items: center;
	flex: 1;
	padding: 10px;
	border: 1px solid #59bfff;
	border-radius: 10px;
	background: #fff;

	:hover {
		cursor: pointer;
		border: 1px solid #0da2ff;
		background: #f2faff;
	}
`;

export default Card;
