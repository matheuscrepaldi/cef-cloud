import React from "react";

import styled from "styled-components";

import LogoImage from "../img/logo192.png";

const Link = styled.a`
	color: inherit;
	text-decoration: none;
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

function Menu(props) {
	const handleLogout = () => {
		sessionStorage.removeItem("session");
		props.history.push("/");
	};

	return (
		<Navbar>
			<Row>
				<Logo>
					<img src={LogoImage} width="40" height="40" alt="logo" />
				</Logo>
				<List>
					<Link href="#home">Home</Link>
					<Link href="#about">About</Link>
					<Link href="#contact">Contact</Link>
					<Link onClick={handleLogout} href="#contact">
						Sair
					</Link>
				</List>
			</Row>
		</Navbar>
	);
}

export default Menu;
