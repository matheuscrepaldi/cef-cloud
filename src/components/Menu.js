import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImage from "../img/logo.png";
import MenuImg from "../img/menu.svg";

const StyledLink = styled(Link)`
	color: #ffffff;
	text-decoration: none;
	margin: 0px 10px;

	:hover {
		cursor: pointer;
		color: #d9d9d9;
	}

	@media (max-width: 1023px) {
		padding: 15px;
		text-decoration: none;
		font-size: 36px;
		display: block;
		transition: 0.3s;
		font-family: Poppins;
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 22px;

		&.closebtn {
			display: flex;
			justify-content: flex-start;
			margin: 10px;
			font-size: 45px;
		}

		:hover {
			color: #d9d9d9;
			cursor: pointer;
		}
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
	width: 100%;
`;

const Logo = styled.div`
	display: flex;
	flex-flow: row;
	padding: 15px;

	@media (min-width: 1023px) {
		margin-left: 30px;
	}

	@media (max-width: 1023px) {
		width: 100%;
		justify-content: space-between;
	}
`;

const List = styled.div`
	display: flex;
	align-items: center;
	margin-right: 15px;

	@media (max-width: 1023px) {
		display: none;
	}
`;

const MenuHeader = styled.div`
	display: flex;
	flex-direction: row;
	display: flex;
	align-items: center;
	margin-right: 15px;
`;

const MenuIcon = styled.img`
	width: 45px;
	height: 45px;
	display: none;
	:hover {
		cursor: pointer;
	}

	@media (max-width: 1023px) {
		display: flex;
	}
`;

const MenuContainer = styled.div`
	height: 100%;
	width: 0;
	position: fixed; /* Stay in place */
	z-index: 999; /* Sit on top */
	left: 0;
	top: 0;
	background-color: #2c8dff;
	overflow-x: hidden;
	transition: 0.5s;

	@media (max-width: 767px) {
		display: flex;
	}
`;

const MenuLink = styled.a`
	padding: 15px;
	text-decoration: none;
	font-size: 36px;
	color: #fff;
	display: block;
	transition: 0.3s;

	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 22px;

	&.closebtn {
		display: flex;
		justify-content: flex-start;
		margin: 10px;
		font-size: 45px;
	}

	:hover {
		color: #d9d9d9;
		cursor: pointer;
	}
`;

const MenuContent = styled.div`
	position: relative;
	top: 25%;
	width: 100%;
	text-align: center;
	margin-top: 30px;
`;

function Menu() {
	const handleLogout = () => {
		showMenu();
		sessionStorage.removeItem("session");
	};

	const openNav = () => {
		document.getElementById("myNav").style.display = "flex";
		document.getElementById("myNav").style.width = "100%";
	};

	const closeNav = () => {
		document.getElementById("myNav").style.width = "0%";
	};
	const showMenu = () => {
		var x = document.getElementsByClassName("menu");
		var menu = x[0].style;
		if (menu.display === "none") {
			menu.display = "flex";
		} else {
			menu.display = "none";
		}
	};

	return (
		<>
			<Navbar>
				<Row>
					<Logo>
						<MenuHeader>
							<MenuIcon onClick={openNav} src={MenuImg} />
						</MenuHeader>
						<img
							src={LogoImage}
							width="40"
							height="40"
							alt="logo"
						/>
					</Logo>
					<List>
						<StyledLink to={"/home"}>Home</StyledLink>
						<StyledLink to={"/funerarias"}>Funerárias</StyledLink>
						<StyledLink to={"/usuarios"}>Usuários</StyledLink>
						<StyledLink to={"/urnas"}>Urnas</StyledLink>
						<StyledLink to={"/movimentacoes"}>
							Movimentações
						</StyledLink>
						<StyledLink to={"/clientes"}>Clientes</StyledLink>
						<StyledLink to={"/fornecedores"}>
							Fornecedores
						</StyledLink>
						<StyledLink to={""} onClick={handleLogout}>
							Sair
						</StyledLink>
					</List>
				</Row>
			</Navbar>

			<MenuContainer id="myNav" className="menu">
				<MenuLink className="closebtn" onClick={closeNav}>
					&times;
				</MenuLink>
				<MenuContent>
					<StyledLink onClick={showMenu} to={"/home"}>
						Home
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/funerarias"}>
						Funerárias
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/usuarios"}>
						Usuários
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/urnas"}>
						Urnas
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/movimentacoes"}>
						Movimentações
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/clientes"}>
						Clientes
					</StyledLink>
					<StyledLink onClick={showMenu} to={"/fornecedores"}>
						Fornecedores
					</StyledLink>
					<StyledLink to={""} onClick={handleLogout}>
						Sair
					</StyledLink>
				</MenuContent>
			</MenuContainer>
		</>
	);
}

export default Menu;
