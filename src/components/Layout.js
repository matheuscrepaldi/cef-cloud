import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Menu from "./Menu";

function Layout(props) {
	const Container = styled.div`
		min-height: 100vh;
		max-height: 100vh;
		overflow: auto;
		background: #f2f2f2;
		display: flex;
		flex-direction: column;
		margin: 0;
	`;

	const Body = styled.div`
		flex-grow: 1;
		padding: 30px;
		max-width: 100%;
		margin-top: 80px;
	`;

	return (
		<Container>
			<Menu />
			<Body>{props.children}</Body>
		</Container>
	);
}
export default withRouter(Layout);
