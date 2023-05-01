import Games from "./games";
import { useState, useEffect } from "react";
import ArticlesService from "../services/ArticlesService";
import Seriesx from "../assets/seriesx.jpg";
import iPad from "../assets/ipad9.jpg";
import iPhone from "../assets/iphone13problur.jpg";

export default function Tech() {
  const [articles, setArticles] = useState([]);

  const carouselDb = [
    {
      img: iPad,
      title: "iPad 9th Generation",
      id: 2,
      page: "tech",
    },
    {
      img: Seriesx,
      title: "Xbox Series X",
      id: 1,
      page: "tech",
    },
    {
      img: iPhone,
      title: "iPhone 13 Pro",
      id: 5,
      page: "tech",
    },
  ];

  const retrieveArticles = () => {
    ArticlesService.getAllTech()
      .then((response) => {
        setArticles(response.data);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    retrieveArticles();
  }, []);

  return (
    <>
      <Games articles={articles} page="Tech" carouselDb={carouselDb} />
    </>
  );
}
