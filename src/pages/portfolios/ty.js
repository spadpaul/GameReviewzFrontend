import { useEffect, useRef } from "react";
import { Github, Linkedin } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import Typed from "typed.js";
import Moon from "../../assets/moon.png";
import Ty from "../../assets/ty.PNG";
import "../../styles/Portfolios.scss";

export default function TyPage() {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const nav = document.getElementById("nav");
    nav.style.display = "none";

    const options = {
      strings: [
        "I am a coder",
        "I am a Software Developer",
        "I am your next hire",
        "I am a gamer",
      ],
      typeSpeed: 50,
      backSpeed: 50,
    };
    typed.current = new Typed(el.current, options);
    return () => {
      typed.current.destroy();
      nav.style.display = "";
    };
  }, []);

  return (
    <div className="tybackground">
      <div className="navbanner">
        <div className="navban">
          <a href="#" className="logo">
            <span>My</span>Portfolio
          </a>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/">About</NavLink>
            </li>
            <li>
              <NavLink to="/">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="typedwrap">
        <h1 className="hiworld">Hello...</h1>
        <span ref={el} />
      </div>
      <div className="typictures">
        <img className="moon" src={Moon} />
        <img className="tyMe" src={Ty} />
      </div>
      <div className="sidelinks">
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/tyheir">
              <Linkedin />
            </a>
          </li>
          <li>
            <a href="https://www.github.com/tydolla00">
              <Github />
            </a>
          </li>
          <li>
            <a to=""></a>
          </li>
          <li>
            <a to=""></a>
          </li>
        </ul>
      </div>
    </div>
  );
}
