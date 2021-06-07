import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const StyledCard = styled.div`
	display: flex;
	background: #ffffff;
	border-radius: 10px;
	box-shadow: 0 10px 40px -14px rgba(0, 0, 0, 0.25);
	padding: 30px;
	margin: 10px;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	width: 400px;
	height: 500px;
	border-radius: 20px;
	z-index: 0;
	overflow: hidden;
	position: relative;
`;

const Row = styled.div`
	display: flex;
	width: 100%;
	margin: 10px;
`;

const Title = styled.h1`
	/* font-size: 18px; */
`;

const Version = styled.span`
	position: absolute;
	bottom: 10px;
	color: #ccc;
`;

function LoginPage() {
	return (
		<Container>
			<StyledCard>
				<Title>Login</Title>
				<Row>Usuário</Row>
				<Row>
					<Input />
				</Row>
				<Row>Senha</Row>
				<Row>
					<Input type="password" />
				</Row>
				<Row>
					<Button>Entrar</Button>
				</Row>
				<Version>v1.0.0</Version>
			</StyledCard>
		</Container>
	);
}

export default LoginPage;
