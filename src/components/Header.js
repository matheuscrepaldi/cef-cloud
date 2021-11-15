import { BsBoxArrowLeft, BsPlusLg, BsFilter } from "react-icons/bs";
import HeaderTitle from "./HeaderTitle";
import Button from "./Button";
import styled from "styled-components";
import { withRouter } from "react-router";
import { BsX } from "react-icons/bs";

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

const ButtonLeft = styled(Button)`
	&.left {
		margin-right: 0px;
		border-radius: 0;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}
`;

const ButtonRight = styled(Button)`
	margin-left: 0px;
	border-radius: 0;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
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
						<ButtonLeft
							title="Filtro"
							onClick={props.handleFilter}
							className={props.filterLength > 0 && "left"}
						>
							Filtro{" "}
							{props.filterLength > 0 &&
								`(${props.filterLength})`}
						</ButtonLeft>
						{props.filterLength > 0 && (
							<ButtonRight
								title="x"
								small
								danger
								onClick={props.handleResetFilter}
							>
								<BsX size={24} />
							</ButtonRight>
						)}
						<Button title="Novo(a)" onClick={props.handleNew}>
							Novo(a)
						</Button>
					</RightPanel>
					<RightPanel className="showSmallButton">
						<ButtonLeft
							className={props.filterLength > 0 && "left"}
							title="Filtro"
							small
							onClick={props.handleFilter}
						>
							<BsFilter size={28} color={"ffffff"} />
						</ButtonLeft>
						{props.filterLength > 0 && (
							<ButtonRight
								title="Remover filtro"
								small
								danger
								onClick={props.handleResetFilter}
							>
								<BsX size={24} />
							</ButtonRight>
						)}
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
