import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./Auth.css";

export default function Auth() {
  const { user, setUser , request} = useContext(AppContext);

  const [payload, setPayload] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const atobUtf = (str) =>
    new TextDecoder().decode(
      Uint8Array.from(
        atob(str.replace(/-/g, "+").replace(/_/g, "/")),
        (c) => c.charCodeAt(0)
      )
    );

  const btoaUtf = (str) =>
    btoa(String.fromCharCode(...new TextEncoder().encode(str)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const decodePayload = (jwt) => {
    try {
      const payloadBase64 = jwt.split(".")[1];
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
    const credentials = btoaUtf(`${login}:${password}`);

    request("/Cosmos/SignIn", {
        headers: {
        'Authorization': "Basic " + credentials,}
      })
      .then(data => {
          setUser({
            "token": data,
            "name": JSON.parse(atobUtf(data.split(".")[1])).nam
          });
        
        }).catch(_ => setUser(null)) 
  };

  const authBlock = () => (
    <div>
      <div>
        <label>Login:</label>
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Login"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </div>
      <button onClick={signInClick}>Войти</button>
    </div>
  );

  const payloadBlock = () => (
    <div>
      <h3>JWT Payload:</h3>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </div>
  );

  return (
  <div className="auth-container">
    {user == null ? (
      authBlock()
    ) : (
      <div>
        <p>Здравствуйте, {user.name}</p>
        <button onClick={() => { setUser(null); setPayload(null); }}>
          Выйти
        </button>
        {payloadBlock()}
      </div>
    )}
    <hr />
  </div>
);
}
