import { BsBoxArrowLeft } from "react-icons/bs";
import Row from "./Row";
import HeaderTitle from "./HeaderTitle";
import Button from "./Button";

const Header = (props) => {
	return (
		<Row>
			<BsBoxArrowLeft
				size={28}
				color={"59bfff"}
				// onClick={() => props.history.goBack()} // arrumar desgraça
			/>
			<HeaderTitle>{props.title}</HeaderTitle>
			<Button onClick={props.handleNew}>Novo Cadastro</Button>
		</Row>
	);
};

export default Header;
