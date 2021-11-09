import { BsBoxArrowLeft, BsPlusLg, BsFilter } from "react-icons/bs";
import HeaderTitle from "./HeaderTitle";
import Button from "./Button";
import styled from "styled-components";
import { withRouter } from "react-router";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex: 1;
`;

const LeftPanel = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 50%;
	margin-left: 15px;
`;
const RightPanel = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 50%;

	&.showBigButton {
		display: flex;
	}

	&.showSmallButton {
		display: none;
	}

	@media (max-width: 767px) {
		&.showBigButton {
			display: none;
		}

		&.showSmallButton {
			display: flex;
		}
	}
`;

const ArrowLeft = styled(BsBoxArrowLeft)`
	:hover {
		cursor: pointer;
		fill: #0da2ff;
	}
`;

const Header = (props) => {
	return (
		<Container>
			<LeftPanel style={{ width: !props.showNewButton && "100%" }}>
				<ArrowLeft
					size={28}
					color={"59bfff"}
					onClick={() => props.history.goBack()} // arrumar desgraça
				/>
				<HeaderTitle>{props.title}</HeaderTitle>
			</LeftPanel>
			{props.showNewButton && (
				<>
					<RightPanel className="showBigButton">
						<Button title="Filtro" onClick={props.handleFilter}>
							Filtro
						</Button>
						<Button title="Novo(a)" onClick={props.handleNew}>
							Novo(a)
						</Button>
					</RightPanel>
					<RightPanel className="showSmallButton">
						<Button
							title="Filtro"
							small
							onClick={props.handleFilter}
						>
							<BsFilter size={28} color={"ffffff"} />
						</Button>
						<Button title="Novo(a)" small onClick={props.handleNew}>
							<BsPlusLg color={"ffffff"} />
						</Button>
					</RightPanel>
				</>
			)}
		</Container>
	);
};

export default withRouter(Header);
