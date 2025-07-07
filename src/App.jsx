import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './views/Layout/Layout';
import Signup from './views/Signup/Signup';
import Auth from './views/Auth/Auth';
import './App.css';
import { AppContext } from './context/AppContext';
 import { useState } from "react";
import Header from './views/Header/Header';
import { jsxs } from 'react/jsx-runtime';

function App() {
  const [user, setUser] = useState(null);

  const request = (url, ini) =>{
    if(url.startsWith('/'))
    {
      url = "https://pv311num6-b9hbdbfsc3gdbfer.canadacentral-01.azurewebsites.net" + url;
      // url = "http://localhost:5173/Cosmos/SignIn" + url;
    }
    if(user != null){
      
    }
    return new Promise((resolve, reject) =>{
      fetch(url, ini).then(r=>r.json()).then(j=>{
        if(j.status.isOk){
          resolve(j.data);
        }
        else {
          console.error(j);
          reject(j);
        }
      });
    });
  }

  return (
    <AppContext.Provider value ={{user, setUser, request}}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Auth />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
