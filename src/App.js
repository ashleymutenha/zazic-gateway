import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Header from './components/Header';
import Site from './components/Site';
import Body from './components/Body';
import LoginCard from './components/Login'
import { gapi } from 'gapi-script';
function App() {

  const clientId = "221447692001-8ffn4d1tuomjg1b0hep8v6k01gptp2pa.apps.googleusercontent.com";

  // useEffect(()=>{
  //     gapi.client.init({
  //       clientId:clientId
  //     })
  // })
  return (
    <div className="App">
     <Header/>
     {/* <Body/> */}

     <LoginCard/>
    </div>
  );
}

export default App;
