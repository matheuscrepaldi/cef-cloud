import React, { useState } from "react";

import axios from "axios";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";

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

function LoginPage(props) {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// useEffect(() => {
	// 	if (session && session.status === 200) {
	// 		props.history.push("/modules");
	// 	}

	// 	setLoading(false);
	// }, [session, props.history, loading]);

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	async function handleLoginFormSubmit(e) {
		e.preventDefault();
		setLoading(true);

		const body = {
			login: email,
			senha: password,
		};

		const response = await axios.post(`login`, body);

		const status = response.status || {};
		setLoading(false);

		// if (status === 200) {
		// 	toast.success("Grupo criado com sucesso");
		// 	props.history.push("/db/settings/groups");
		// }
	}

	return (
		<Container>
			<StyledCard>
				<Loading loading={loading} absolute />
				<Title>Login</Title>
				<Row>Usuário</Row>
				<Row>
					<Input onClick={handleEmailChange} />
				</Row>
				<Row>Senha</Row>
				<Row>
					<Input onClick={handlePasswordChange} type="password" />
				</Row>
				<Row>
					<Button onClick={handleLoginFormSubmit}>Entrar</Button>
				</Row>
				<Version>v1.0.0</Version>
			</StyledCard>
		</Container>
	);
}

export default LoginPage;
