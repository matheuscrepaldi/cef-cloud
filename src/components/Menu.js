import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImage from "../img/logo192.png";

const StyledLink = styled(Link)`
	color: #ffffff;
	text-decoration: none;
	margin: 0px 10px;

	:hover {
		cursor: pointer;
		color: #d9d9d9;
	}
`;

const Navbar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	margin: auto;
	width: 100%;
	background: linear-gradient(
		90deg,
		rgba(0, 117, 191, 1) 0%,
		rgba(13, 162, 255, 1) 44%,
		rgba(89, 191, 255, 1) 100%
	);
	height: 80px;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	margin-right: 25px;
`;

const Logo = styled.div`
	padding: 15px;
	margin-left: 30px;
`;

const List = styled.div`
	display: flex;
	align-items: center;
	margin-right: 15px;
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
					<StyledLink to={"/movimentacoes"}>Movimentações</StyledLink>
					<StyledLink to={"/clientes"}>Clientes</StyledLink>
					<StyledLink to={"/fornecedores"}>Fornecedores</StyledLink>
					<StyledLink to={""} onClick={handleLogout}>
						Sair
					</StyledLink>
				</List>
			</Row>
		</Navbar>
	);
}

export default Menu;
