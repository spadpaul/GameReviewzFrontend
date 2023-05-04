import { useEffect, useRef } from "react";
import { Github, Linkedin } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import Typed from "typed.js";
import Moon from "../../assets/moon.png";
import Ty from "../../assets/ty.PNG";
import "../../styles/Portfolios.scss";
import { Globe } from "react-bootstrap-icons";
import { FiletypePdf } from "react-bootstrap-icons";
import { FolderFill } from "react-bootstrap-icons";
import { PersonCheckFill } from "react-bootstrap-icons";
import Resume from "../../assets/TyheirBrooks_Software EngineerPDF.pdf";

export default function TyPage() {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const nav = document.getElementById("nav");
    nav.style.display = "none";
    window.scrollTo(0, 0);

    const options = {
      strings: [
        "I am a coder",
        "I am a Software Developer",
        "I am a gamer",
        "I am your next hire",
        "Welcome to GameReviewz!",
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
    <div>
      <div className="tybackground">
        <div className="navbanner">
          <div className="navban">
            <a href="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
              <span>My</span>Portfolio
            </a>
          </div>
        </div>
        <div className="typedwrap">
          <h1 className="hiworld">Hello...</h1>
          <span ref={el} />
        </div>
        <div className="typictures">
          <img className="moon" src={Moon} alt="Moon" />
          <img className="tyMe" src={Ty} alt="Ty" />
        </div>
        <div className="sidelinks">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/tyheir">
                <Linkedin />
              </a>
            </li>
            <li>
              <a id="github" href="https://www.github.com/tydolla00">
                <Github />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="tybottombackground">
        <div className="tyRectangleContainer">
          <div className="tyRectangle">
            <div
              style={{
                height: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Globe className="tyicons" />
            </div>
            <h1 className="tyRectangleText">About Me</h1>
            <div className="tyRectangleText">
              I am from the Bronx, NY. I love gaming🎮, sports🏈🏀, and my dog
              Princess. 🐶
            </div>
          </div>
          <div className="tyRectangle">
            <div
              style={{
                height: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FiletypePdf className="tyicons" />
            </div>
            <h1 className="tyRectangleText">Resume</h1>
            <div className="tyRectangleText">
              Click{" "}
              <a href={Resume} target="_blank" rel="noopener noreferrer">
                here
              </a>{" "}
              to download a PDF of my resume!
            </div>
          </div>
          <div className="tyRectangle">
            <div
              style={{
                height: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FolderFill className="tyicons" />
            </div>
            <h1 className="tyRectangleText">Projects</h1>
            <div className="tyRectangleText">
              <a href="https://github.com/tydolla00/PaceEats">PaceEats,</a>{" "}
              <a href="https://github.com/tydolla00/Game-Reviewz">
                GameReviewz,
              </a>
            </div>
          </div>
          <div className="tyRectangle">
            <div
              style={{
                height: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PersonCheckFill className="tyicons" />
            </div>
            <h1 className="tyRectangleText">For Hire</h1>
            <div className="tyRectangleText">
              I am currently looking for roles as a Software Engineer.
              <br />
              <a href="mailto:ktyty9@aol.com">Contact Me!</a>
            </div>
          </div>
        </div>
        <div className="containercenter">
          <div className="aboutGameReviewz">
            Where Am I?
            <p>
              <i>
                Currently you are on my personal portfolio page! Click the
                button below to be redirected to the home page of my GameReviewz
                website! A website designed to provide users access to reviews
                on products so they know what they're getting before they
                purchase!
              </i>
            </p>
            <NavLink to="/#home">
              <button
                style={{ width: "50%", marginTop: "0px" }}
                className="glow-on-hover"
                type="button"
                onClick={() => window.scrollTo(0, 0)}
              >
                GameReviewz!
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "5px",
          width: "100%",
        }}
      />
    </div>
  );
}
