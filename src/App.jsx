import { useState } from 'react';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [payload, setPayload] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const decodePayload = (jwt) => {
    try {
      const payloadBase64 = jwt.split('.')[1];
      const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      const parsedPayload = JSON.parse(payloadJson);

      // Человекочитаемые даты
      parsedPayload.iat_human = new Date(parsedPayload.iat * 1000).toLocaleString();
      parsedPayload.exp_human = new Date(parsedPayload.exp * 1000).toLocaleString();

      return parsedPayload;
    } catch (e) {
      console.error("Invalid JWT:", e);
      return null;
    }
  };

  const signInClick = () => {
    const credentials = btoa(login + ':' + password);

    fetch("https://pv311num6-b9hbdbfsc3gdbfer.canadacentral-01.azurewebsites.net/Cosmos/SignIn", {
      headers: {
        'Authorization': 'Basic ' + credentials
      }
    })
    .then(r => r.json())
    .then(j => {
      if (j.status && j.status.isOk) {
        const jwt = j.data;
        const parsedPayload = decodePayload(jwt);
        setToken(jwt);
        setPayload(parsedPayload);
        setName(parsedPayload.nam || "User");
      } else {
        alert("❌ Login failed");
      }
    })
    .catch(err => {
      console.error(err);
      alert("❌ Connection error");
    });
  };

  const authBlock = () => (
    <>
      <span>Login:</span><input value={login} onChange={e => setLogin(e.target.value)} /><br />
      <span>Password:</span><input value={password} onChange={e => setPassword(e.target.value)} type="password" /><br />
      <button onClick={signInClick}>Sign In</button>
    </>
  );

  const payloadBlock = () => (
    <>
      <h3>JWT Payload:</h3>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </>
  );

  return (
    <>
      {token == null ? authBlock() :
        <>
          <span>Hello, {name}</span><br />
          <button onClick={() => { setToken(null); setPayload(null); }}>Sign out</button>
          {payloadBlock()}
        </>
      }
      <hr />
    </>
  );
}

export default App;
