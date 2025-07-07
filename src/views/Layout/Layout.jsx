import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./Layout.css";

export default function Layout() {
  const {user} = useContext(AppContext);
  return (
    <>
      <Outlet/>
    </>
  );
}
