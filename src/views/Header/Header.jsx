import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const handleLogout = () => {
    setUser(null);
    navigate("/"); 
  };

  return (
    <header className="header">
      <h1 className="header-title">My App</h1>
      <div className="header-buttons">
        {user ? (
        <>
            <span className="avatar">{user.name.charAt(0)}</span> 
            <button onClick={handleLogout} className="header-button">
                Выйти
            </button>
        </>
        ) : (
          <>
            <button onClick={() => navigate("/")} className="header-button">
              Войти
            </button>
            <button onClick={() => navigate("/signup")} className="header-button">
              Зарегистрироваться
            </button>
          </>
        )}
      </div>
    </header>
  );
}
