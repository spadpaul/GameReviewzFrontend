import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/App.scss";
import Modal from "./modal/modal";
import { Dropdown } from "./dropdown/dropdown";
import UserService from "../services/UserService";
import SignupForm from "./modal/signup";
import LoginForm from "./modal/login";

const Navbar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const user = UserService.userInfo();

  const nav = [
    { text: "Home", link: "/" },
    { text: "Games", link: "/games" },
    { text: "Tech", link: "/tech" },
    { text: "About", link: "/about" },
    { text: "Community", link: "/community" },
    { text: "Contact", link: "/contact" },
  ];

  return (
    <nav id="nav">
      <h1 id="logo" onClick={() => navigate("/")}>
        Game<span>Reviewz</span>
      </h1>
      <h1 id="logoShort" onClick={() => navigate("/")}>
        G<span>R</span>
      </h1>
      <ul className="navItems">
        {nav.map((item) => (
          <li key={item.link}>
            <NavLink className="navitem" to={`${item.link}`}>
              {item.text}
            </NavLink>
          </li>
        ))}
        {user?.role === "ADMIN" && (
          <li>
            <NavLink className="navitem" to="/adminboard">
              Admin
            </NavLink>
          </li>
        )}
      </ul>
      {user ? (
        <Dropdown />
      ) : (
        <div className="loginContainer">
          <button
            className="loginButton"
            onClick={() => {
              setModalShow(true);
              setLogin(true);
              setSignUp(false);
            }}
          >
            Login
          </button>
          <button
            className="loginButton signup"
            onClick={() => {
              setModalShow(true);
              setSignUp(true);
              setLogin(false);
            }}
          >
            Sign Up
          </button>
          {modalShow && (
            <Modal show={setModalShow}>
              {signUp && <SignupForm show={setModalShow} />}
              {login && <LoginForm show={setModalShow} />}
            </Modal>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
