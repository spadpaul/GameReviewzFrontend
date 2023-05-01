import "../styles/Article.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticlesService from "../services/ArticlesService";
import Comments from "../components/comments/Comments";
import UserService from "../services/UserService";
import { StarFill } from "react-bootstrap-icons";

function Article() {
  let { id } = useParams();
  const user = UserService.userInfo();

  const initialState = {
    id: null,
    title: "",
    review: "",
    reviewer: "",
    comments: 0,
    date: "",
  };

  const currDate = new Date();

  const date = {
    day: currDate.getDate(),
    month: currDate.getMonth() + 1,
    year: currDate.getFullYear(),
  };

  const [article, setArticle] = useState(initialState);
  const [images, setImages] = useState([]);

  const getArticle = (id) => {
    let path = window.location.pathname.substring(0, 6) === "/games"; // Could cause problems when move to AWS.
    if (path) {
      ArticlesService.getGamesById(id)
        .then((res) => {
          setArticle(res.data);
        })
        .catch((e) => {});
    } else {
      ArticlesService.getTechById(id)
        .then((res) => {
          setArticle(res.data);
        })
        .catch((e) => {});
    }
  };

  const getImages = (id) => {
    let path = window.location.pathname.substring(0, 6) === "/games";
    if (path) {
      ArticlesService.getGamesImagesById(id)
        .then((res) => {
          setImages(res.data);
        })
        .catch((e) => {});
    } else {
      ArticlesService.getTechImagesById(id)
        .then((res) => {
          setImages(res.data);
        })
        .catch((e) => {});
    }
  };

  useEffect(() => {
    if (id) {
      getArticle(id);
      getImages(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  const SplitReview = () => {
    const arr = article.review.split("@");
    const displayArticle = [];
    let i = 0;
    let k = 0;

    for (let i = 0; i < arr.length; i++) {
      let j = 0;
      let k = 0;
      while (arr[i].charAt(j) === "+") {
        displayArticle.push(
          <div className="articleIMG">
          <img
            key={images[k]?.id}
            className="articleImages"
            src={images[k]?.path}
            alt="images"
          />
          </div>
        );
        // images.shift();
        j++;
        k++;
      }
      displayArticle.push(
        <p key={i} className="actualArticle">
          {arr[i].substring(j)}
        </p>
      );
    }
    return <>{displayArticle}</>;
  };

  const SplitRating = () => {
    const arr = article.rating?.split("@");
    console.log(arr);
    const displayArticle = [];
    return arr?.map((item) => (
      <div>
        <div className="displayflex">
          <div className="ratings ">{item.substring(0, item.indexOf(" "))}</div>
          <StarFill className="starfill" />
        </div>
        <div className="ratings">{item.substring(item.indexOf(" ") + 1)}</div>
      </div>
    ));
  };

  return (
    <div>
      <br />
      <div className="backgroundPhotoCont">
        <img
          className={"blurredPhoto"}
          src={article.bgimage}
          alt={"Blurred BattleFront"}
        />
        <div className={"gameContainer"}>
          <img
            className={"gameBox"}
            src={article.path}
            alt={"BattleFront Box Art"}
          />
          <div className={"gameInfo"}>
            <p className={"gameTitle"}>{article.title}</p>
            <p
              className={"gameFacts"}
            >{`Release Date: ${article.releaseDate}`}</p>
            <p className={"gameFacts"}>{`Genre: ${article.genre}`}</p>
            <p className={"gameFacts"}>{`Author: ${article.reviewer}`}</p>
            <p className={"gameFacts"}>{`Date: ${article.datePosted}`}</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className={"bodyContainer"}>
        <div className={"articleContainer"}>
          <SplitReview />
          <SplitRating />
        </div>
        <div className={"possiblyAds"}>
          <div className={"unknown"}>
            <p className={"unknownTitle"}>Unknown</p>
          </div>
          <div className={"unknown"}>
            <p className={"unknownTitle"}>Unknown</p>
          </div>
          <div className={"unknown"}>
            <p className={"unknownTitle"}>Unknown</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <hr className={"articleHr"} />
      <Comments pageId={id} currentUserId={user?.id} />
    </div>
  );
}

export default Article;
