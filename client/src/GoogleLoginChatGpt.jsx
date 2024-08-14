import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const CLIENT_ID = "650511107339-a4avh4qp1i87h4a3ed4su7m43ddk10m1.apps.googleusercontent.com";

const GoogleLoginButton = () => {
  const handleSuccess = async (response) => {
    const token = response.credential;

    try {
      // Send the token to your backend
      const res = await axios.post('http://localhost:8000/api/v1/auth/google', { token });

      // Handle the backend response (e.g., save the JWT token or session info)
      console.log('User authenticated:', res.data);
    } catch (error) {
      console.error('Error authenticating user:', error);
    }

    
  };

  const handleFailure = (error) => {
    console.error('Google Login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
