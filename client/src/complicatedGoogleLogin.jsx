import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./components/GoogleLogin";

const CLIENT_ID = "650511107339-a4avh4qp1i87h4a3ed4su7m43ddk10m1.apps.googleusercontent.com"

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