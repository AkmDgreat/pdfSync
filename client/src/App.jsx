import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./components/GoogleLogin";
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

function App() {
	const [user, setUser] = useState();

	return (
		<GoogleOAuthProvider clientId={CLIENT_ID}>
			<div className="App">
				<GoogleLogin setUser={setUser}></GoogleLogin>
				{user && user.name}
				{user && user.email}
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;