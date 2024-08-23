import React, { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";

function App() {
  const CLIENT_ID =
    "650511107339-frd6rhaali2jtn6jd29eku4qjnck8hce.apps.googleusercontent.com";
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const doNothing = () => {
    console.log("yoo");
  };

  const login = useGoogleLogin({
    clientId: CLIENT_ID,
    redirect_uri: "/home",
    onSuccess: async (googleUser) => {
      console.log("Inside onSuccess");
      setUser(googleUser);
      console.log("User is set");

      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/auth/google",
          {
            access_token: googleUser.access_token,
          }
        );
        console.log("Post request to backend made", res.data);
      } catch (error) {
        console.log(`Error during backend call: ${error}`);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
        <button onClick={() => login()}>Sign in with Google 🚀</button>
    </div>
    // <GoogleLogin
    //   onSuccess={(credentialResponse) => {
    //     console.log(credentialResponse);
    //   }}
    //   onError={() => {
    //     console.log("Login Failed");
    //   }}
    // />
  );
}

export default App;
