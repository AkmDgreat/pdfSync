import React from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { googleAuth } from "../services/api.mjs";
                              
export default (props) => {
	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				console.log(authResult.code);
				const result = await googleAuth(authResult.code);
				props.setUser(result.data.data.user);
				alert("successfuly logged in");
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	// log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        props.setUser(null);
    };

	return (
		<div>
			<button
				style={{
					padding: "10px 20px",
				}}
				onClick={googleLogin}
			>
				Sign in with Google
			</button>
			<button onClick={logOut}>Log out</button>
		</div>
	);
};