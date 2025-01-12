import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
const LoginCard = () => {
  const clientId = "244765945312-vpb3bque9eln4l3lcq6fj4t3e8cnv65v.apps.googleusercontent.com";

  const handleSuccess = (response) => {
    const decodedToken = jwtDecode(response.credential);

        // Extract the email address (it's typically in the 'email' field in the payload)
        const email = decodedToken.email;

        console.log('Email:', email);
    console.log("Login successful:", response.credential);
  };

  const handleError = () => {
    console.error("Login failed.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h2>Login</h2>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginCard;
