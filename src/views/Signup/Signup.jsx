import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { AppContext } from "../../context/AppContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [status, setStatus] = useState("");
  const [statusClass, setStatusClass] = useState("");
  const {request} = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !login || !password || !repeatPassword) {
      setStatus("Please fill in all fields.");
      setStatusClass("error");
      return;
    }

    if (password !== repeatPassword) {
      setStatus("Passwords do not match.");
      setStatusClass("error");
      return;
    }

    const formData = new FormData();
    formData.append("user-name", name);
    formData.append("user-login", login);
    formData.append("user-password", password);
    formData.append("user-repeat", repeatPassword);

    try {
      const response = request("/Cosmos/SignUp", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.status?.isOk) {
        setStatus("Registered successfully!");
        setStatusClass("success");
        setName("");
        setLogin("");
        setPassword("");
        setRepeatPassword("");

        setTimeout(() => navigate("/"), 1000);
      } else {
        setStatus(result.data || "Registration failed.");
        setStatusClass("error");
      }
    } catch (err) {
      setStatus("Error connecting to server.");
      setStatusClass("error");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label><br />
        <label>
          Login:
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        </label><br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label><br />
        <label>
          Repeat Password:
          <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
        </label><br />
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
      {status && <p className={statusClass}>{status}</p>}
    </div>
  );
}
