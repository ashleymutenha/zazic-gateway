import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const LoginCard = ({ onLogin ,loginStatus }) => {
  const clientId = "244765945312-vpb3bque9eln4l3lcq6fj4t3e8cnv65v.apps.googleusercontent.com";

  const handleSuccess = (response) => {
    try {
      const decodedToken = jwtDecode(response.credential);
      const email = decodedToken.email; // Extract email

      console.log('Email:', email);
      console.log("Login successful:", response.credential);

      // Notify parent about login success and pass the email
      onLogin(true, email); 
    } catch (error) {
      console.error("Token decoding failed:", error);
      onLogin(false); // Notify parent about login failure
    }
  };

  const handleError = () => {
    console.error("Login failed.");
    onLogin(false); // Notify parent about login failure
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "40px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "30rem",
          }}
        >
{/* 
          {loginStatus ===false?<div style ={{color:"red"}}>
            User Not Found !
          </div>:null} */}

          <div style={{flex:2, background:"white", padding:"12px"}}>

<img src = "/logo.png" alt ="logo" style={{height:"40px",width:"auto",background:"transparent",cursor:"pointer"}} />
</div>
          <h2>ZAZIC Data Portal</h2>
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
