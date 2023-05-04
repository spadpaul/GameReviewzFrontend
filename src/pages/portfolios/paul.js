import "../../styles/Paul.scss";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Paul from "../../assets/paul_mobile_nobg.png";
import { Linkedin, Github, Envelope, Download } from "react-bootstrap-icons";
import LeetCode_logo from "../../assets/LeetCodeNoBG.png";
import HTML_logo from "../../assets/HTML5_logo.png";
import CSS_logo from "../../assets/CSS3_logo.png";
import Java_logo from "../../assets/Java_logo.png";
import React_logo from "../../assets/React_logo.png";
import SQL_logo from "../../assets/sql.png";
import JavaScript_logo from "../../assets/javascript.png";
import Resume from "../../assets/Paul_Spadaccini_Resume.pdf";

export default function PaulPage() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    nav.style.display = "none";

    return () => {
      nav.style.display = "";
      window.removeEventListener("scroll", this);
    };
  }, []);

  //Enable hidden nav bar
  {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      let currSrollY = window.scrollY;
      if (lastScrollY < currSrollY && window.pageYOffset > 125) {
        document.querySelector(".paulNav").style.top = "-75px";
      } else {
        document.querySelector(".paulNav").style.top = "0px";
      }

      lastScrollY = currSrollY;
    });
  }

  window.scrollTo(0, 0);

  return (
    <div className="paulContainer">
      <div className="paulNav">
        <br className="paulMobileBreak" />
        <ul>
          <li>
            <NavLink to="/portfolio/paul" className={"paulLogo"}>
              <span>Paul</span>Spad
            </NavLink>
          </li>
          <li>
            <a href="#paulAbout">About</a>
          </li>
          <li>
            <a href="#paulExperience">Experience</a>
          </li>
          <li>
            <a href="#paulResume">Resume</a>
          </li>
          <li>
            <a href="#paulContact">Contact</a>
          </li>
          <li>
            <NavLink to="/" className={"mainLogo"}>
              Game<span>Reviewz</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="paulHome">
        <div className="paulHeader">
          <div className="paulHeaderLeft">
            <p>Hi, my name is</p>
            <h1>Paul Spadaccini</h1>
            <p>- Freelance Software Engineer in Dobbs Ferry, NY</p>
            <a
              href="https://www.linkedin.com/in/paul-spadaccini/"
              className="paulLinkedLogos"
            >
              <Linkedin color="#0A66C2" />
            </a>
            <a href="https://github.com/spadpaul" className="paulLinkedLogos">
              <Github color="black" />
            </a>
            <a
              href="https://leetcode.com/spadpaul/"
              className="paulLinkedLogos"
            >
              <img src={LeetCode_logo} alt="LeeetCode Logo" />
            </a>
            <a href="mailto:spadpaul@gmail.com" className="paulLinkedLogos">
              <Envelope color="red" />
            </a>
          </div>
          <div className="paulHeaderPhoto">
            <img src={Paul} alt="Paul Spadaccini"></img>
          </div>
        </div>
      </div>

      <button id="paulAbout"></button>
      <div className="paulAbout">
        <h3 className="paulTitles">About Me</h3>
        <p>
          Hello! My name is Paul, and I am a software engineer. I am skilled in
          Java, HTML, JavaScript, and CSS. From a young age, I have always
          enjoyed math because I enjoy solving challenging tasks. When I
          graduated from high school, I knew I wanted to pursue a degree in
          computer science because of the problem-solving aspect. My favorite
          part about coding is the excitement of constantly learning new things
          and the satisfaction of completing a part of a program.
          <br />
          <br />I recently graduated from Pace University with a Bachelor of
          Science in Computer Science with a concentration in Software
          Engineering and a minor in Mathematics. I graduated Magna Cum Laude
          with a GPA of 3.83. During my academic career, I completed several
          internships and projects that developed my software programming skills
          using Java, HTML, CSS, & JavaScript, such as creating an Android
          Studio application in a team of four. I am seeking full-time software
          developer/engineer opportunities to apply and further develop these
          skills. Please
          <a href="#paulContact"> contact me </a>
          for any roles.
        </p>

        <div className="paulTechnologies">
          <h3 className="paulTitles">My Technologies</h3>
          <div className="mySkills">
            {/* need to resize logos for responsiveness */}
            <img src={Java_logo} alt={"Java Logo"} />
            <img src={HTML_logo} alt={"HTML Logo"} />
            <img src={CSS_logo} alt={"CSS Logo"} />
            <img src={JavaScript_logo} alt="JavaScript Logo" />
            <img src={SQL_logo} alt="SQL Logo" />
            <img src={React_logo} alt={"React Logo"} />
          </div>
        </div>
      </div>

      <button id="paulExperience"></button>
      <div className="paulExperience">
        <h4 className="paulTitles">My Experience</h4>
        <h1>EDUCATION</h1>
        <h3>
          Pace University, Seidenberg School Computer Science and Information
          Systems
        </h3>
        <p>
          Bachelor of Science (BS) in Computer Science | Concentration: Software
          Development | Minor: Mathematics | May 2022
        </p>
        <br />
        <p>
          Honors: Magna Cum Laude | Alpha Chi (Member) | Deans List (Fall 2018 -
          Spring 2022) | GPA: 3.83
        </p>

        <h1>EXPERIENCE</h1>
        <h2>Game Reviewz, Freelance Developer</h2>
        <p>January 2023 - Present</p>
        <ul>
          <li>
            Collaborate in team of three, engaging in bi-weekly sprints using
            React, JavaScript, Java, HTML, &amp; SCSS to create a user-friendly
            website hosting video game &amp; tech reviews, creating wireframes
            for each webpage using Figma prior to implementation
          </li>
          <li>
            Create tasks in a backlog &amp; and assign them based on priority
            &amp; size to manage SDLC, implementing code using{" "}
            <a href="https://github.com/tydolla00/Game-Reviewz">GitHub</a>
          </li>
        </ul>

        <h2>Blue CoLab, Web Developer</h2>
        <p>January 2022 - May 2022</p>
        <ul>
          <li>
            Collaborated in team of three to clean &amp; parse water/weather
            sensor data using Python to map data to sound, allowing users to
            interpret patterns related to changes in climate auditorily
          </li>
          <li>
            Deployed Django to create website, using HTML &amp; CSS to code
            front-end features, including play controls &amp; project
            information
          </li>
          <li>
            Created a{" "}
            <a href="https://bluecolab.pace.edu/everyone-deserves-real-time-water-data/">
              {" "}
              blog post{" "}
            </a>{" "}
            highlighting project's scope &amp; usefulness in identifying &amp;
            averting water-based crises
          </li>
        </ul>

        <h2>
          NYC Department of Youth &amp; Community Development, Application
          Support Intern
        </h2>
        <p>June 2021 - August 2021</p>
        <ul>
          <li>
            Supported organization employees in use &amp; operation of internal
            software applications, managing approximately 20 helpdesk tickets
            through ServiceDesk weekly &amp; providing virtual support to remote
            employees
          </li>
          <li>
            Managed user accounts deploying User Management &amp; PTS to create
            new accounts &amp; assign the appropriate level of system access, as
            well as deactivate &amp; unlock accounts as requested
          </li>
        </ul>

        <h1>ACADEMIC PROJECTS</h1>
        <h2>
          <a href="https://github.com/paceuniversity/cs389f2021team2">
            PaceEats Mobile Application
          </a>
        </h2>
        <p>October 2021 - December 2021</p>
        <ul>
          <li>
            Collaborated with team of four to design &amp; create mobile
            application using Android Studio, allowing Pace students to track
            food intake, calories, &amp; weight, using Google Firebase to store
            &amp; manage user data
          </li>
          <li>
            Coded application back-end using Java &amp; deployed XML to design
            user-friendly front-end, conducting demonstrations to showcase
            project progress after each sprint
          </li>
          <li>
            Implemented Agile Methodology for software development lifecycle
            (SDLC) by creating user stories in backlog, conducting Scrum
            meetings twice a week, &amp; collaborating on implementing code
          </li>
        </ul>
      </div>

      <button id="paulResume"></button>
      <div className="paulResume">
        <h3 className="paulTitles">Resume</h3>
        <button className="downloadButton">
          <a href={Resume} download>
            Download Resume
            <br />
            <Download />
          </a>
        </button>
      </div>

      <button id="paulContact"></button>
      <div className="paulContact">
        <h3 className="paulTitles">Contact</h3>
        <p>
          If you are interested in hiring me, I can be reached in the following
          ways!
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <a href="mailto:spadpaul@gmail.com">
                  <Envelope color="red" />
                </a>
              </td>
              <td className="paulTableText">
                <a href="mailto:spadpaul@gmail.com">spadpaul@gmail.com</a>
              </td>
            </tr>

            <tr>
              <td>
                <a href="https://www.linkedin.com/in/paul-spadaccini/">
                  <Linkedin color="#0A66C2" />
                </a>
              </td>
              <td className="paulTableText">
                <a href="https://www.linkedin.com/in/paul-spadaccini/">
                  linkedin.com/in/paul-spadaccini/
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
