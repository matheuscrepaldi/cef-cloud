import styled from "styled-components";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Title from "./Title";
import Loading from "./Loading";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 10px;
	align-items: center;
	flex: 1;
	height: 200px;
	background: #fff;
	position: relative;
	min-width: 300px;
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

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	width: 100%;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 10px 10px 50px;
	align-items: flex-start;
	width: ${(props) => props.width};

	&.icon {
		align-items: center;
	}
`;

const DashboardCard = (props) => {
	return (
		<Card>
			<Loading loading={props.loading} absolute />
			<Body>
				<Row>
					<Column width={"70%"}>
						<Title textWhite big>
							{props.total}
						</Title>
						<Title textWhite>{props.text}</Title>
					</Column>
					<Column className={"icon"} width={"30%"}>
						{props.icon}
					</Column>
				</Row>
			</Body>
			<Footer onClick={props.handleShowMore}>
				Ver mais
				<BsFillArrowRightCircleFill style={{ marginLeft: 10 }} />
			</Footer>
		</Card>
	);
};

export default DashboardCard;
