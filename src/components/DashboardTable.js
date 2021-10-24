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
	height: 100%;
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

const Header = styled.div`
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

const Panel = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding: 10px 10px 10px 50px;
	align-items: center;
	width: ${(props) => props.width};

	&.right {
		justify-content: flex-end;
	}
`;

const DashboardTable = (props) => {
	return (
		<Card>
			<Loading loading={props.loading} absolute />
			<Header onClick={props.handleShowMore}>
				<Row>
					<Panel width={"70%"}>
						<Title textWhite>{props.title}</Title>
					</Panel>
					<Panel className={"right"} width={"30%"}>
						Ver mais
						<BsFillArrowRightCircleFill
							style={{ marginLeft: 10 }}
						/>
					</Panel>
				</Row>
			</Header>
			<Body>
				<Row>tabela</Row>
			</Body>
		</Card>
	);
};

export default DashboardTable;
