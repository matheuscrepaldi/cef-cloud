import styled from "styled-components";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Title from "./Title";
import Loading from "./Loading";
import Column from "./Column";
import Row from "./Row";
import Text from "./Text";

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
	min-width: 600px;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);

	@media (max-width: 1024px) {
		min-width: 300px;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: 80%;
	background-color: #e77681;
	color: #ffffff;
	padding-bottom: 10px;
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 20%;
	background-color: #dc3545;
	color: #ffffff;

	:hover {
		cursor: pointer;
		background: #a71d2a;
	}
`;

const HeaderRow = styled.div`
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

const TableColumn = styled(Column)`
	margin: 10px;
	color: #fff;
	align-items: center;

	@media (max-width: 1024px) {
		flex-direction: row;
		justify-content: flex-start;
	}
`;

const TableRow = styled(Row)`
	margin: 0;
	width: 90%;

	&.line {
		border-bottom: 1px solid #ccc;

		@media (max-width: 1024px) {
			flex-direction: column;
			border: 1px solid #fff;
			margin: 10px;
			background: #ffffff;
			box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
		}
	}

	&.header {
		border-bottom: 2px solid #fff;
		@media (max-width: 1024px) {
			display: none;
			flex-direction: column;
		}
	}
`;

const TableTitle = styled(Title)`
	display: none;

	@media (max-width: 1024px) {
		margin-left: 15px;
		display: flex;
	}
`;

const TableText = styled(Text)`
	color: #fff;

	@media (max-width: 1024px) {
		color: #808080;
	}
`;

const NoData = styled(Row)`
	justify-content: center;
`;

const DashboardTable = (props) => {
	return (
		<Card>
			<Loading loading={props.loading} absolute />
			<Header onClick={props.handleShowMore}>
				<HeaderRow>
					<Panel width={"70%"}>
						<Title textWhite medium>
							{props.title}
						</Title>
					</Panel>
					<Panel className={"right"} width={"30%"}>
						Ver mais
						<BsFillArrowRightCircleFill
							style={{ marginLeft: 10 }}
						/>
					</Panel>
				</HeaderRow>
			</Header>
			<Body>
				<TableRow className="header">
					<TableColumn>
						<Title style={{ color: "#fff" }}>Referência</Title>
					</TableColumn>
					<TableColumn>
						<Title style={{ color: "#fff" }}>Cor</Title>
					</TableColumn>
					<TableColumn>
						<Title style={{ color: "#fff" }}>Estoque</Title>
					</TableColumn>
					<TableColumn>
						<Title style={{ color: "#fff" }}>Fornecedor</Title>
					</TableColumn>
				</TableRow>

				{props.data && props.data.length > 0 ? (
					props.data.map((dt, i) => {
						return (
							<TableRow className="line" key={i}>
								<TableColumn>
									<TableTitle>Referência:</TableTitle>
									<TableText>{dt.ref_urna}</TableText>
								</TableColumn>

								<TableColumn>
									<TableTitle>Cor:</TableTitle>
									<TableText>{dt.cor_urna}</TableText>
								</TableColumn>
								<TableColumn>
									<TableTitle>Estoque:</TableTitle>
									<TableText>{dt.quantidade}</TableText>
								</TableColumn>
								<TableColumn>
									<TableTitle>Fornecedor:</TableTitle>
									<TableText>{dt.rz_forn}</TableText>
								</TableColumn>
							</TableRow>
						);
					})
				) : (
					<NoData>Sem dados</NoData>
				)}
			</Body>
		</Card>
	);
};

export default DashboardTable;
