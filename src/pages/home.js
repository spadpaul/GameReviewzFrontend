import MW from "../assets/mwblurII.jpg";
import iPad from "../assets/ipad9.jpg";
import Seriesx from "../assets/seriesx.jpg";
import "../styles/Home.scss";
import { useEffect, useState } from "react";
import ArticlesService from "../services/ArticlesService";
import { NavLink } from "react-router-dom";
import CarouselComponent from "../components/carousel";
import ReleasesService from "../services/ReleasesService";

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
  const [releases, setReleases] = useState([]);
  const [techArticles, setTechArticles] = useState([]);
  demodb = articles.concat(techArticles);
  shuffleArray(demodb);

  useEffect(() => {
    retrieveArticles();
  }, []);

  useEffect(() => {
    retrieveReleases();
  }, []);

  const retrieveReleases = () => {
    ReleasesService.getAllReleases()
      .then((response) => {
        let sortedArray = response.data;
        sortedArray.sort(function(a,b){
          return new Date(a.releaseDate) - new Date(b.releaseDate);
        });
        
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        console.log(today);
        const limitedArray = sortedArray.filter(function(obj) {
          return obj.releaseDate >= today;
        })

        console.log(limitedArray);
        setReleases(sortedArray.splice(0, 10));
      })
      .catch((e) => {
        return <div>Error Occured</div>
      })
  }



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
      <div className="homeContainer" id="home">
        {/* <CarouselComponent img1={Zelda} img2={Seriesx} img3={Pixel} /> */}
        <div className="cardsContainer">
          <Cards db={demodb} />
        </div>
        <Sidebar db={releases} />
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

const Releases = (props, i) => {
  return props.db.map((item) => (
    <div key={item.id}>
      <li className="games">
        {item.product} -{" "}
        <span className="date"> {item.releaseDate}</span>
      </li>
      <br />
      <br />
    </div>
  ))
}

// This can be reworked to function/look better.
const Sidebar = ({db}) => {
  return (
    <div className="sidebar">
      <div className="releasesList">
        <h2 className="sidebarHeader">Upcoming Releases</h2>
        <br />
        <ul className="releases">
          <Releases db={db} />
        </ul>
      </div>
    </div>
  )
};
