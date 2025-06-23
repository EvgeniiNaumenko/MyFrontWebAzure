import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [token,setToken] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState ("");

  const signInClick =() =>{
    const credentials = btoa(login + ':' + password);

    fetch("https://pv311num6-b9hbdbfsc3gdbfer.canadacentral-01.azurewebsites.net/Cosmos/SignIn", {
        headers: {
            'Authorization': 'Basic ' + credentials
        }
    }).then(r => r.json())
        .then(j => {
            if (j.status && j.status.isOk) {
                console.log(j.data);
                setToken(j.data);
                setName(JSON.parse(atob(j.data.split('.')[1])).nam);
                // statusBox.textContent = "✅ Entered!";
                // statusBox.classList.remove("text-danger");
                // statusBox.classList.add("text-success");
            } else {
                // statusBox.textContent = "❌ " + (j.data || "Aut error");
                // statusBox.classList.remove("text-success");
                // statusBox.classList.add("text-danger");
            }
        })
        .catch(err => {
            // statusBox.textContent = "❌ Connection error";
            // statusBox.classList.remove("text-success");
            // statusBox.classList.add("text-danger");
            console.error(err);
        });
  }

  const authBlock = () => <> 
      <span>Login:</span><input value={login} onChange={ e=> setLogin(e.target.value)}></input>
      <br/>
      <span>Password:</span><input value={password} onChange={ e=> setPassword(e.target.value)}></input>
      <br/>
      <button onClick={signInClick}>Sign In</button>
     </>;

  return (
    <>
      {token == null ? authBlock() : 
        <>
          <span>Hello, {name} </span>
          <br />
          <button onClick={() => setToken(null)}>Sign out</button>
        </>
      }
    </>
  ); 
}

export default App
