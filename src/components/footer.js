import { NavLink } from "react-router-dom";

const Footer = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="footer">
      <div>
        <h1>Navigation</h1>
        <ul onClick={handleClick}>
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/about">
            <li>About</li>
          </NavLink>
          <NavLink to="/games">
            <li>Games</li>
          </NavLink>
          <NavLink to="/tech">
            <li>Tech</li>
          </NavLink>
          <NavLink to="/contact">
            <li>Contact</li>
          </NavLink>
        </ul>
      </div>
      <div>
        <h1>
          Game<span>Reviewz</span>
        </h1>
        <p>
          Copyright © GameReviewz. We do not own any of the images used on this
          site.
        </p>
      </div>
    </div>
  );
};
export default Footer;
