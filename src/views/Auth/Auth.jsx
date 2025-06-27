 import { useState } from "react";

 export default function Auth(){
     
    const [token, setToken] = useState(null);
    const [payload, setPayload] = useState(null);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const atobUtf = (str) => new TextDecoder().decode(Uint8Array.from(atob(str.replace(/\-/g, '+').replace(/\_/g, '/')), c => c.charCodeAt(0)));
    const btoaUtf = (str) => btoa(String.fromCharCode(...new TextEncoder().encode(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

 const decodePayload = (jwt) => {
  try {
    const payloadBase64 = jwt.split('.')[1];
    const payloadJson = atobUtf(payloadBase64);
    const parsedPayload = JSON.parse(payloadJson);

    parsedPayload.iat_human = new Date(parsedPayload.iat * 1000).toLocaleString();
    parsedPayload.exp_human = new Date(parsedPayload.exp * 1000).toLocaleString();

    return parsedPayload;
  } catch (e) {
    console.error("Invalid JWT:", e);
    return null;
  }
};
  
  const signInClick = () => {
    const credentials = btoaUtf(login + ':' + password);

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