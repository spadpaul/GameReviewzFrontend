import "../styles/About.scss";
import HTML_logo from "../assets/HTML5_logo.png";
import CSS_logo from "../assets/CSS3_logo.png";
import Java_logo from "../assets/Java_logo.png";
import React_logo from "../assets/React_logo.png";
import Discord_logo from "../assets/discord_logo.png";
import Linkedin_logo from "../assets/Linkedin_Logo.png";
import Ty from "../assets/tyabout.jpeg";
import Paul from "../assets/paul_about.png";
import John from "../assets/john.jpg";
import { NavLink } from "react-router-dom";

function About() {
  return (
    <div>
      <br />
      <div id="container">
        <div className={"aboutPhoto"}></div>
        <div className="aboutUs">
          <p className="aboutTitle">About Us</p>
          <hr className={"hrAbout"} />
          <p className="aboutText">
            We are a group of aspiring Software Engineers who came together to
            work on a common interest and become better developers. <br />
            If you would like to read more about our process,
            <a
              style={{ textDecoration: "none", color: "##007bff" }}
              href="https://github.com/tydolla00/Game-Reviewz#readme"
              title="GameReviewz Github Repository"
            >
              {" "}
              click here
            </a>{" "}
            to go to our Github Repository!
          </p>
        </div>
      </div>

      <br />
      <br />
      <div>
        <Card />
      </div>
      <br />
      <br />
      <div id="container">
        <div className="technologies">
          <p className="technologiesTitleFont">Technologies</p>
          <hr className={"hrAbout"} />
          <div className="logosFit">
            {/* need to resize logos for responsiveness */}
            <img src={HTML_logo} alt={"HTML Logo"} />
            <img src={React_logo} alt={"React Logo"} />
            <img src={Java_logo} alt={"Java Logo"} />
            <img src={Discord_logo} alt={"Discord Logo"} />
            <img src={CSS_logo} alt={"CSS Logo"} />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
export default About;

function Card() {
  const collaborators = [
    {
      name: "Tyheir Brooks",
      url: "https://www.linkedin.com/in/tyheir",
      city: "Bronx, NY",
      path: "/portfolio/tyheir",
      img: Ty,
    },
    {
      name: "John Beltran",
      url: "https://www.linkedin.com/in/john-beltran/",
      city: "White Plains, NY",
      path: "/portfolio/john",
      img: John,
    },
    {
      name: "Paul Spadaccini",
      url: "https://www.linkedin.com/in/paul-spadaccini/",
      city: "Dobbs Ferry, NY",
      path: "/portfolio/paul",
      img: Paul,
    },
  ];
  return (
    <div className="membersContainer">
      {collaborators.map((item, index) => (
        <div key={index} className="cardContainer">
          <div className="flexContainer">
            <div className="profile">
              <img className="tyabout" src={item.img} alt="Developer" />
            </div>
          </div>
          <div className="nameText">{item.name}</div>
          <div className="nameText">{item.city}</div>
          <div className="bottomContainer">
            <a href={item.url}>
              <img
                className={"linkedIn"}
                src={Linkedin_logo}
                alt={"linkedin logo"}
              />
            </a>
            <NavLink to={item.path}>
              <button className="glow-on-hover" type="button">
                Personal Page
              </button>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}
