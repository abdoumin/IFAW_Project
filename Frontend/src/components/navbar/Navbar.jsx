import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AuthenticationService from "../../pages/login/AuthenticationService"

const Navbar = () => {
  let isLoggedIn = true
  const username = AuthenticationService.getLoggedInUserName();
  if(username =="")
  {
    isLoggedIn = false;
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        {isLoggedIn ? username : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
