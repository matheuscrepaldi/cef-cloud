import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImage from "../img/logo192.png";

const StyledLink = styled(Link)`
	color: #f2f2f2;
	text-decoration: none;
	margin: 0px 10px;
	:hover {
		cursor: pointer;
	}
`;

const Navbar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	margin: auto;
	width: 100%;
	background-color: #59bfff;
	height: 80px;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
`;

const Logo = styled.div`
	padding: 15px;
`;

const List = styled.div`
	display: flex;
	align-items: center;
`;

function Menu() {
	const handleLogout = () => {
		sessionStorage.removeItem("session");
	};

	return (
		<Navbar>
			<Row>
				<Logo>
					<img src={LogoImage} width="40" height="40" alt="logo" />
				</Logo>
				<List>
					<StyledLink to={"/home"}>Home</StyledLink>
					<StyledLink to={"/urnas"}>Urnas</StyledLink>
					<StyledLink onClick={handleLogout}>Sair</StyledLink>
				</List>
			</Row>
		</Navbar>
	);
}

export default Menu;
