import React from "react";
import { withRouter } from "react-router-dom";

// import Sidebar from "../Layout/Sidebar/Sidebar";

import styled from "styled-components";

function Layout(props) {
	const Container = styled.div`
		min-height: 100vh;
		max-height: 100vh;
		overflow: auto;
		background: #f2f2f2;
		display: flex;
		flex-direction: row;
		margin: 0;
	`;

	const LeftPanel = styled.div`
		height: 100vh;
		position: sticky;
		top: 0;
		width: 3%;
		min-width: 50px;
	`;

	const RightPanel = styled.div`
		flex-grow: 1;
		padding: 30px;
		width: calc(100% - 110px);
	`;

	// const { session } = useContext(AuthContext);
	// const [user, setUser] = useState({ name: "", initials: "" });

	// useEffect(() => {
	// 	function getInitials(name) {
	// 		let initials = name.match(/\b\w/g) || [];
	// 		initials = (
	// 			(initials.shift() || "") + (initials.pop() || "")
	// 		).toUpperCase();
	// 		return initials;
	// 	}

	// 	if (!session) {
	// 		props.history.push("/login");
	// 	} else {
	// 		setUser({
	// 			name: session.name,
	// 			initials: getInitials(session.name),
	// 		});
	// 	}
	// }, [session, props]);

	return (
		<>
			<Container>
				<LeftPanel>{/* <Sidebar user={user} /> */}</LeftPanel>
				<RightPanel>{props.children}</RightPanel>
			</Container>
		</>
	);
}
export default withRouter(Layout);
