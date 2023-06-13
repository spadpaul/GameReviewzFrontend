import "../styles/Article.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticlesService from "../services/ArticlesService";
import Comments from "../components/comments/Comments";
import UserService from "../services/UserService";
import { StarFill } from "react-bootstrap-icons";
import Modal from "../components/modal/modal";

function Article() {
  const initialState = {
    id: null,
    title: "",
    review: "",
    reviewer: "",
    comments: 0,
    date: "",
  };

  const [article, setArticle] = useState(initialState);
  const [images, setImages] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [imgPath, setImgPath] = useState("");

  let { id } = useParams();
  const user = UserService.userInfo();

  useEffect(() => {
    if (id) {
      getArticle(id);
      getImages(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  // Get The Article in the DB by the id.
  const getArticle = (id) => {
    let path = window.location.pathname.substring(0, 6) === "/games";
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

  // Get the images for the current article by it's id.
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

  // Format the Article based by +, @ syntax. Sets the article how it is to be displayed.
  const SplitReview = () => {
    const arr = article.review.split("@");
    const displayArticle = [];
    let k = 0;

    for (let i = 0; i < arr.length; i++) {
      let j = 0;
      while (arr[i].charAt(j) === "+") {
        const img = images[k];
        displayArticle.push(
          <>
            <div className="articleIMG">
              <img
                key={images[k]?.id}
                onClick={() => {
                  setModalShow(true);
                  setImgPath(img.path);
                }}
                className="articleImages"
                src={images[k]?.path}
                alt="images"
              />
            </div>
          </>
        );
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

  // Add stars for the ratings.
  const addStars = (item) => {
    let stars = item.charAt(item.indexOf(":") + 1);
    let j = 1;
    const displayArticle = [];
    while (j <= stars) {
      displayArticle.push(<StarFill className="starfill" />);
      j++;
    }
    while (j < 6) {
      displayArticle.push(
        <StarFill className="starfill" style={{ color: "#333333" }} />
      );
      j++;
    }
    return <>{displayArticle}</>;
  };

  // Split the ratings. Based off formatting.
  const SplitRating = () => {
    const arr = article.rating?.split("@");
    return arr?.map((item) => (
      <div key={item}>
        <div className="displayflex">
          <div className="ratings ">{item.substring(0, item.indexOf(" "))}</div>
          {addStars(item)}
        </div>
        <div className="ratings">{item.substring(item.indexOf(" ") + 1)}</div>
      </div>
    ));
  };

  return (
    <div>
      <br />
      {modalShow && (
        <Modal show={setModalShow}>
          <img className="modalImg" src={imgPath} alt="images" />
        </Modal>
      )}
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
            <p className={"gameFacts"}>
              {`Release Date: ${article.releaseDate}`}
            </p>
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
