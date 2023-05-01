import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/App.scss";
import Modal from "./modal";
import { Dropdown } from "./dropdown";

const Navbar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [login, setLogin] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")); // Gets user from localstorage.
  const navigate = useNavigate();

  return (
    <nav id="nav">
      <h1 id="logo" onClick={() => navigate("/")}>
        Game<span>Reviewz</span>
      </h1>
      <h1 id="logoShort" onClick={() => navigate("/")}>
        G<span>R</span>
      </h1>
      <ul className="navItems">
        <li>
          {/* activeClassName */}
          <NavLink className="navitem" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navitem" to="/games">
            &nbsp;Games
          </NavLink>
        </li>
        <li>
          <NavLink className="navitem" to="/tech">
            &nbsp;Tech
          </NavLink>
        </li>
        <li>
          <NavLink className="navitem" to="/about">
            &nbsp;About
          </NavLink>
        </li>
        <li>
          <NavLink className="navitem" to="/community">
            &nbsp;Community
          </NavLink>
        </li>
        <li>
          <NavLink className="navitem" to="/contact">
            &nbsp;Contact
          </NavLink>
        </li>
      </ul>
      {user ? (
        <Dropdown />
      ) : (
        <div className={"loginContainer"}>
          <button
            className="loginButton"
            onClick={() => {
              setModalShow(true);
              setLogin(true);
            }}
          >
            Login
          </button>
          <button
            className="loginButton signup"
            onClick={() => {
              setModalShow(true);
              setLogin(false);
            }}
          >
            Sign Up
          </button>
        </div>
      )}
      {modalShow && <Modal show={setModalShow} loginPage={login} />}
      {/* <form>
        {SearchBar()}
        <button type="submit">Search</button>
      </form> */}
    </nav>
  );
};
export default Navbar;

// export const SearchBar = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const handleChange = (e) => {
//     e.preventDefault();
//     setSearchInput(e.target.value);
//   };
//   return (
//     <>
//       <input
//         type="text"
//         className="searchinput"
//         placeholder="Search..."
//         onChange={handleChange}
//         value={searchInput}
//       />
//     </>
//   );
// };
