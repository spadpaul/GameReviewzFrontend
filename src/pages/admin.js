import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import Table from "../components/table";
import Modal from "../components/modal/modal";

const Admin = () => {
  const [contact, setContact] = useState([]);
  const [finished, setFinished] = useState(false);
  const [gamesArticles, setGamesArticles] = useState([]);
  const [gameReviews, setGameReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [polls, setPolls] = useState([]);
  const [techArticles, setTechArticles] = useState([]);
  const [techReviews, setTechReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const data = [
    {
      data: contact,
      columns: ["id", "email", "fullname", "message", "subject", "username"],
      headers: ["Id", "Email", "Full Name", "Message", "Subject", "Username"],
      heading: "Contact",
    },
    {
      data: gamesArticles,
      columns: [
        "id",
        "comments",
        "path",
        "review",
        "reviewer",
        "title",
        "base",
        "datePosted",
        "genre",
        "releaseDate",
        "bgimage",
        "rating",
      ],
      headers: [
        "Id",
        "Comments",
        "Path",
        "Review",
        "Reviewer",
        "Title",
        "Base",
        "Date",
        "Genre",
        "Release Date",
        "BG Image",
        "Rating",
      ],
      heading: "Game Articles",
    },
    {
      data: gameReviews,
      columns: [
        "id",
        "comment",
        "createdAt",
        "gamesId",
        "likes",
        "parentId",
        "userId",
        "username",
      ],
      headers: [
        "Id",
        "Comment",
        "CreatedAt",
        "GamesId",
        "Likes",
        "ParentId",
        "UserId",
        "Username",
      ],
      heading: "Game Reviews",
    },
    {
      data: images,
      columns: ["imageId", "path", "gameId", "techId"],
      headers: ["ImageId", "Path", "GamesId", "TechId"],
      heading: "Images",
    },
    {
      data: polls,
      columns: [
        "Id",
        "option1Votes",
        "option1",
        "option2Votes",
        "option2",
        "option3Votes",
        "option3",
        "option4Votes",
        "option4",
      ],
      headers: [
        "Id",
        "option1_votes",
        "option1",
        "option2_votes",
        "option2",
        "option3_votes",
        "option3",
        "option4_votes",
        "option4",
      ],
      heading: "Polls",
    },
    {
      data: techArticles,
      columns: [
        "id",
        "bgimage",
        "comments",
        "path",
        "review",
        "reviewer",
        "title",
        "base",
        "datePosted",
        "genre",
        "releaseDate",
        "rating",
      ],
      headers: [
        "Id",
        "BgImage",
        "Comments",
        "Path",
        "Review",
        "Reviewer",
        "Title",
        "Base",
        "Date",
        "Genre",
        "Release Date",
        "Rating",
      ],
      heading: "Tech Articles",
    },
    {
      data: techReviews,
      columns: [
        "id",
        "comments",
        "createdAt",
        "likes",
        "parentId",
        "techId",
        "userId",
        "username",
      ],
      headers: [
        "Id",
        "Comments",
        "CreatedAt",
        "Likes",
        "ParentId",
        "TechId",
        "UserId",
        "Username",
      ],
      heading: "Tech Reviews",
    },
    {
      data: users,
      columns: [
        "id",
        "email",
        "firstName",
        "lastName",
        "role",
        "username",
        "voted",
      ],
      headers: [
        "Id",
        "Email",
        "First Name",
        "Last Name",
        "Role",
        "Username",
        "Voted",
      ],
      heading: "Users",
    },
  ];

  useEffect(() => {
    (async () => {
      await Promise.all([
        AdminService.getContactTable().then((res) => setContact(res.data)),
        AdminService.getGameArticlesTable().then((res) =>
          setGamesArticles(res.data)
        ),
        AdminService.getGameReviewsTable().then((res) =>
          setGameReviews(res.data)
        ),
        AdminService.getImagesTable().then((res) => setImages(res.data)),
        AdminService.getPollsTable().then((res) => setPolls(res.data)),
        AdminService.getTechArticlesTable().then((res) =>
          setTechArticles(res.data)
        ),
        AdminService.getTechReviewsTable().then((res) =>
          setTechReviews(res.data)
        ),
        AdminService.getUsersTable().then((res) => setUsers(res.data)),
      ]);
    })();
    setFinished(true);
  }, []);

  return (
    <div>
      <button className="glow-on-hover" onClick={() => setShowModal(true)}>
        New Query
      </button>
      {showModal && (
        <Modal show={setShowModal}>
          <div
            style={{
              width: "80%",
              height: "600px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <h1>Hello World</h1>
          </div>
        </Modal>
      )}
      {finished ? (
        <div>
          <Table data={contact} sql={data[0]} />
          <Table data={gamesArticles} sql={data[1]} />
          <Table data={gameReviews} sql={data[2]} />
          <Table data={images} sql={data[3]} />
          <Table data={polls} sql={data[4]} />
          <Table data={techArticles} sql={data[5]} />
          <Table data={techReviews} sql={data[6]} />
          <Table data={users} sql={data[7]} />
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};
export default Admin;
