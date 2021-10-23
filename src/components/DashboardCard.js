import styled from "styled-components";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 10px;
	align-items: center;
	flex: 1;
	height: 150px;
	background: #fff;
	position: relative;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
`;

const Body = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 80%;
	background-color: #59bfff;
	color: #ffffff;
`;

const Footer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 20%;
	background-color: #0da2ff;
	color: #ffffff;

	:hover {
		cursor: pointer;
		background: #0076c0;
	}
`;

const DashboardCard = () => {
	return (
		<Card>
			<Body>body</Body>
			<Footer>
				Ver mais{" "}
				<BsFillArrowRightCircleFill style={{ marginLeft: 10 }} />
			</Footer>
		</Card>
	);
};

export default DashboardCard;
