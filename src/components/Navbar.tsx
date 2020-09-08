import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Navbar = (props) => {
  const logout = async () => {
    const body = await fetch(
      (process.env.REACT_APP_DOMAIN || "") + "/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    props.setToken("");
  };
  return (
    <div>
      <nav>
        {props.token ? (
          <>
            <Link to={"/login"} onClick={logout}>
              Logout
            </Link>
            <Link to={"/food/add"}>Add food</Link>
            <Link to={"/profile"}> My Profile</Link>
            <Link to="/profile/food">My food</Link>

            <Link to="/home">Home</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/singup">Signup</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
