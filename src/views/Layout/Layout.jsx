import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Link to="/">Auth</Link> 
      <hr />
      <Link to="/signup">Signup</Link>
      <hr />
      <Outlet />
    </>
  );
}
