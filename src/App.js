import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import LoginCard from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
  const [userEmail, setUserEmail] = useState(null); // Store user's email

  const handleLogin = (status, email = null) => {
    setIsLoggedIn(status); // Update login status
    if (status) {
      setUserEmail(email); // Store email on successful login
    }
  };

  return (
    <div className="App">
      {/* <Header /> */}
      {!isLoggedIn ? (
        <LoginCard onLogin={handleLogin} loginStatus={true} />
      ) : (
        <Body email={userEmail} /> // Pass email as a prop to Body
      )}
    </div>
  );
}

export default App;
