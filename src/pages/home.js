import Macbook from "../assets/macbookblur.jpg";
import MW from "../assets/mwblurII.jpg";
import iPad from "../assets/ipad9.jpg";
import Seriesx from "../assets/seriesx.jpg";
import "../styles/Home.scss";
import { useEffect, useState } from "react";
import ArticlesService from "../services/ArticlesService";
import { NavLink } from "react-router-dom";
import CarouselComponent from "../components/carousel";

//Notes for Paul, when defining a class use className, class is reserved for classes in React.
// Maybe turn the container into a grid??? Can also be called from the database, maybe add columnPriority as a column and then give a priority number,
// then in database select top 16 from columnPriority
function Home() {
  const carouselDb = [
    {
      img: MW,
      title: "Call of Duty: Modern Warfrare II",
      id: 8,
      page: "games",
    },
    {
      img: Seriesx,
      title: "Xbox Series X",
      id: 1,
      page: "tech",
    },
    {
      img: iPad,
      title: "iPad 9th Generation",
      id: 2,
      page: "tech",
    },
  ];

  let demodb = [];
  const [articles, setArticles] = useState([]);
  const [techArticles, setTechArticles] = useState([]);
  demodb = articles.concat(techArticles);
  shuffleArray(demodb);

  useEffect(() => {
    retrieveArticles();
  }, []);

  const retrieveArticles = () => {
    ArticlesService.getAllGames()
      .then((response) => {
        setArticles(response.data);
      })
      .then(() => {
        ArticlesService.getAllTech().then((response) => {
          setTechArticles(response.data);
        });
      })
      .catch((e) => {
        return <div>Hello You have found an error</div>;
      });
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  return (
    <>
      <CarouselComponent array={carouselDb} />
      <div className="homeContainer">
        {/* <CarouselComponent img1={Zelda} img2={Seriesx} img3={Pixel} /> */}
        <div className="cardsContainer">
          <Cards db={demodb} />
        </div>
        <Sidebar />
        {/* <CarouselContainer/> */}
      </div>
      <br />
    </>
  );
}
export default Home;

const Cards = (props) => {
  return props.db.map((item) => (
    <div key={item.id + item.base}>
      <NavLink to={`/${item.base}/` + item.id} className="navlink">
        <div key={item.id} className="card">
          <img className="cardimg" src={item.path} alt={item.title} />
          <div id="title">{item.title}</div>
        </div>
      </NavLink>
    </div>
  ));
};

// This can be reworked to function/look better.
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="releasesList">
        <h2 className="sidebarHeader">Upcoming Releases</h2>
        <br />
        <ul className="releases">
          <li className="games">
            Spongebob Squarepants: The Cosmic Shake -{" "}
            <span className="date">January 31st</span>
          </li>
          <br />
          <br />
          <li className="games">
            Hogwarts Legacy - <span className="date">February 10</span>
          </li>
          <br />
          <br />
          <li className="games">
            Star Wars Jedi Survivor - <span className="date">March 17</span>
          </li>
          <br />
          <br />
          <li className="games">
            The Legend of Zelda: Tears of the Kingdom -{" "}
            <span className="date">May 12</span>
          </li>
          <br />
          <br />
          <li className="games">
            Suicide Squad: Kill the Justice League -{" "}
            <span className="date">May 26</span>
          </li>
          <br />
        </ul>
      </div>
    </div>
  );
};
