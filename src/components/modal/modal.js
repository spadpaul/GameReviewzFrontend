import { useEffect, useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import SignupForm from "./signup";
import LoginForm from "./login";

const Modal = ({ show, loginPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false); // Show Login or Signup Page

  const handleChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePassChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleScroll = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return false;
  };

  // ## When Modal Loads, adds event listeners to listen for clicks outside modal and esc key.
  useEffect(() => {
    setLogin(loginPage);
    const handleEsc = (event) => {
      let modal = document.getElementById("modal");
      if (event.key === "Escape" || event.target === modal) show(false);
    };
    window.addEventListener("mousedown", handleEsc);
    window.addEventListener("keydown", handleEsc);
    document.getElementById("root").addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("mousedown", handleEsc);
      document
        .getElementById("root")
        .removeEventListener("wheel", handleScroll);
    };
  }, [loginPage, show]);
  return (
    <>
      <div id="modal" className="modalContainer">
        <div className="modal animate">
          <div className="modalX" onClick={() => show(false)}>
            <XCircleFill />
          </div>
          <h1 id="text-center">
            {login ? "Please Login To Join GameReviewz" : "Please Sign Up"}
          </h1>
          <div className="modalBody">
            {login ? (
              <LoginForm
                username={username}
                handleChange={handleChange}
                password={password}
                handlePassChange={handlePassChange}
                setLogin={setLogin}
              />
            ) : (
              <SignupForm setLogin={setLogin} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
