import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { PersonCircle } from "react-bootstrap-icons";
import "../styles/Profile.scss";

const user = UserService.userInfo();

const Profile = () => {
  const initialState = {
    id: null,
    firstName: "",
    lastName: "",
    realUsername: "",
    email: "",
  };

  const [userInfo, setuserInfo] = useState(initialState);

  const getUser = () => {
    UserService.getUserBoard(user?.id)
      .then((res) => {
        setuserInfo(res.data);
      })
      .catch(() => {
        return;
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="profileHeader">
        <div>
          <h1>Hello, {userInfo.realUsername}</h1>
          <div className="imgContainer">
            <PersonCircle className="profilepageimg" />
          </div>
        </div>
        <h2>
          {`
          Hello, and welcome to GameReviewz! This is a website where you can
          look up reviews on products left by our moderators and eventually by
          users! If you're seeing this you're here in our first deployment of the website. 
          It's a little ugly right now but we're working hard on a new and better design! So
          thank you for checking us out! If you have any comments, suggestions, 
          or would just like to tell us our site looks awesome please do so on the contact page!
          To check out some of our articles, click the GameReviewz logo, or home tab!
          `}
        </h2>
      </div>
    </div>
  );
};

export default Profile;
