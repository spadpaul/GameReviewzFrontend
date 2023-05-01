import { SearchBar } from "../components/navigation";
import ArticlesService from "../services/ArticlesService";
import { useState, useEffect } from "react";
import MW from "../assets/mwblurII.jpg";
import ScarletViolet from "../assets/scarletvioletblur.jpg";
import Fortnite from "../assets/fortnitecarousel.jpeg";
import RocketLeague from "../assets/rocketleagueblur.jpeg";
import "../styles/Games.scss";
import { NavLink } from "react-router-dom";
import CarouselComponent from "../components/carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ChatFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Games = (props) => {
  // ## Static Array for the Games Carousel component.
  let carouselDb = [
    {
      img: ScarletViolet,
      title: "Pokemon Scarlet and Violet",
      id: 7,
      page: "games",
    },
    {
      img: Fortnite,
      title: "Fortnite",
      id: 1,
      page: "games",
    },
    {
      img: MW,
      title: "Call of Duty: Modern Warfrare II",
      id: 8,
      page: "games",
    },
    {
      img: RocketLeague,
      title: "Rocket League",
      id: 9,
      page: "games",
    },
  ];

  if (props.carouselDb != undefined) carouselDb = props.carouselDb;

  // API will return array of objects so initialize state as an array.
  const [article, setArticles] = useState([]);

  // useEffect is called whenever the page is rendered/rerendered. [] allows for API to only be called once.
  useEffect(() => {
    retrieveArticles();
  }, []);

  // gets all Articles from the Database. Calls getMethod from API which returns rows in database, then pass the data into Articles
  const retrieveArticles = () => {
    ArticlesService.getAllGames()
      .then((response) => {
        setArticles(response.data);
      })
      .catch((e) => {});
  };

  return (
    <>
      <CarouselComponent array={carouselDb} />
      {/* Sort Here */}
      <br />
      <Articles db={props.articles == null ? article : props.articles} />
    </>
  );
};
export default Games;

// Currently working on getting the correct images in place.
export const Articles = (props) => {
  const navigate = useNavigate();
  const page = window.location.pathname;
  return props.db.map((item) => (
    <div key={item.id} className="articleboxcontainer">
      <div className="articleBox">
        <NavLink to={`${page}/` + item.id}>
          <img src={item.path} className="articleStyle" alt="A Game" />
        </NavLink>
        <div className="vl"></div>
        <div
          className="bottomArticleBox"
          onClick={() => navigate(`${page}/${item.id}`)}
        >
          <h1>{`${item.title}? Worth It? Find Out More!`}</h1>
          {/* <p className="articleText">{item.review.split("@")[0] + "..."}</p> */}
          <p className="articleText">{item.review.substring(0, 500) + "..."}</p>
          <div className="">
            <p id="bottom">Game: {item.title}</p>
            <p id="bottom">Reviewer: {item.reviewer}</p>
            <p id="bottom">
              <ChatFill />: {item.comments}
            </p>
          </div>
        </div>
      </div>
      <hr className="gline" />
    </div>
  ));
};
