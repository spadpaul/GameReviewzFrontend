import {
  ArrowRight,
  DoorClosed,
  Gear,
  Moon,
  PersonCircle,
} from "react-bootstrap-icons";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ## This component creates the dropdown.
export const Dropdown = () => {
  let toggleDropdown = document.getElementById("showdropdown");

  const handleMousedown = (e) => {
    if (
      e.target === toggleDropdown &&
      toggleDropdown.classList.contains("openmenu")
    ) {
      toggleDropdown.classList.toggle("openmenu");
    }
  };
  useEffect(() => {
    window.addEventListener("mousedown", handleMousedown);

    return () => {
      window.removeEventListener("mousedown", handleMousedown);
    };
  }, []);
  // useEffect(() => {
  //   handleDarkMode(darkMode);
  // }, []);

  const user = UserService.userInfo(); // Grabs User Info From LocalStorage
  let darkMode = user.theme === "dark" ? true : false;

  const toggledropdown = () => {
    let toggleDropdown = document.getElementById("showdropdown");

    toggleDropdown.classList.add("openmenu");
  };
  const toggleHideDropdown = () => {
    let toggleDropdown = document.getElementById("showdropdown");

    toggleDropdown.classList.toggle("openmenu");
  };

  const handleDarkMode = () => {
    const body = document.body;
    const user = JSON.parse(localStorage.getItem("user"));

    if (!darkMode) {
      body.classList.toggle("darkmode");
      user.theme = "dark";
      localStorage.setItem("user", JSON.stringify(user));
      darkMode = true;
    } else {
      body.classList.remove("darkmode");
      user.theme = "light";
      localStorage.setItem("user", JSON.stringify(user));
      darkMode = false;
    }
  };

  let navigate = useNavigate();

  return (
    <>
      <div
        className="profileside"
        id="dropdown"
        onMouseOver={toggledropdown}
        // onMouseOut={toggleHideDropdown}
        onClick={toggleHideDropdown}
      >
        <PersonCircle className="personcircle" />
        <div>My Profile</div>
      </div>
      <div
        className="dropdown"
        id="showdropdown"
        onMouseLeave={toggleHideDropdown}
      >
        <div className="profiletab">
          <PersonCircle />
          <div>{user.username}</div>
        </div>
        <hr />
        <div className="dropdowntab" onClick={() => navigate("/profile")}>
          <div>
            <PersonCircle />
            <div>My Profile</div>
          </div>
          <ArrowRight className="arrowdropdown" />
        </div>
        {/* <div className="dropdowntab">
          <div>
            <Gear />
            <div>Settings</div>
          </div>
          <ArrowRight className="arrowdropdown" />
        </div>
        <div className="dropdowntab" onClick={handleDarkMode}>
          <div>
            <Moon />
            <div>Dark Mode</div>
          </div>
          <ArrowRight className="arrowdropdown" />
        </div> */}
        <div className="dropdowntab" onClick={AuthService.logout}>
          <div>
            <DoorClosed />
            <div>Logout</div>
          </div>
          <ArrowRight className="arrowdropdown" />
        </div>
      </div>
    </>
  );
};
