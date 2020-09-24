import React from "react";
import { Link } from "react-router-dom";
import { StyledNavbar, StyledNavOptions, StyledLink } from "./styles";
const margin = "20px";
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
    <StyledNavbar>
      {props.token ? (
        <StyledNavOptions>
          <StyledLink>
            {" "}
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to={"/food/add"}
            >
              Add food
            </Link>
          </StyledLink>
          <StyledLink>
            {" "}
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to={"/profile"}
            >
              {" "}
              My Profile
            </Link>
          </StyledLink>
          <StyledLink>
            {" "}
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to="/profile/food"
            >
              My food
            </Link>
          </StyledLink>
          <StyledLink>
            {" "}
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to="/home"
            >
              Home
            </Link>
          </StyledLink>
          <StyledLink>
            {" "}
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to={"/login"}
              onClick={logout}
            >
              Logout
            </Link>
          </StyledLink>
        </StyledNavOptions>
      ) : (
        <>
          {/*   <Link to="/login">Login</Link>
            <Link to="/singup">Signup</Link> */}
        </>
      )}
    </StyledNavbar>
  );
};

export default Navbar;
