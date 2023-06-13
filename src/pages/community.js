import "../styles/Community.scss";
import { Person } from "react-bootstrap-icons";
import { BalloonFill } from "react-bootstrap-icons";
import { Alarm } from "react-bootstrap-icons";
import UserService from "../services/UserService";
import ReleasesService from "../services/ReleasesService";
import { useEffect, useState } from "react";

const MostListUsers = (props) => {
  return props.db.map((item) => (
    <div key={item.id}>
      <div className="mostSection">
        <Person />
        {item.user} {" - "}
        {item.value}
      </div>
    </div>
  ));
};

const Birthdays = (props) => {
  return props.db.map((item) => (
    <div key={item.id}>
      <div className="mostSection">
        <BalloonFill color="red" />
        {item.user} {" - "}
        {item.birthday}
      </div>
    </div>
  ));
};

const Releases = (props) => {
  return props.db.map((item) => (
    <div key={item.id}>
      <div className="mostSection">
        <Alarm />
        {item.product} {" - "}
        <i>{item.releaseDate}</i>
      </div>
    </div>
  ));
};

export default function Community() {
  const [releases, setReleases] = useState([]);

  let i = 0;
  const gameReleases = releases.filter(function(obj) {
    if(obj.base === 'games' && i < 5)
    {
      i++;
      return true;
    }
    return false;
  })

  let j = 0;
  const techReleases = releases.filter(function(obj) {
    if(obj.base === 'tech' && j < 5)
    {
      j++;
      return true;
    }
    return false;
  })
  

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
        const t = Date.parse(today);
        const limitedArray = sortedArray.filter(function(obj) {
          let objDate = Date.parse(obj.releaseDate);
          const d = new Date(objDate);
          return t <= d;
        })
        setReleases(limitedArray);
      })
      .catch((e) => {
        return <div>Error Occured</div>
      })
  }

  const [pollOption, setpollOption] = useState("option1");
  const [isError, setIsError] = useState("");
  const user = UserService.userInfo();

  const handleSubmit = (e) => {
    const obj = {
      pollOption: pollOption,
    };
    e.preventDefault();
    if (user) {
      UserService.addVote(obj)
        .then(() => setIsError("Thanks For Voting!"))
        .catch((error) => setIsError(error.response.data));
    } else {
      setIsError("Please Login, To Vote!");
    }
  };

  const db = [
    { user: "spadpaul", value: 27, id: 1 },
    { user: "tybrooks", value: 19, id: 2 },
    { user: "johnb", value: 18, id: 3 },
    { user: "ace", value: 9, id: 4 },
  ];

  const birthdayDB = [
    { user: "tybroooks", birthday: "April 2", id: 1 },
    { user: "iamsith69", birthday: "June 6", id: 2 },
    { user: "johnbboy", birthday: "June 22", id: 3 },
    { user: "spadpaul", birthday: "July 23", id: 4 },
  ];

  const gamesDB = [
    { game: "Hogwarts Legacy", date: "2/10/23", id: 1 },
    { game: "Jedi Survivor", date: "3/17/23", id: 2 },
    { game: "Zelda: Tears of the Kingdom", date: "5/12/23", id: 3 },
    { game: "Suicide Squad: Kill the Justice League", date: "5/26/23", id: 4 },
  ];

  const techDB = [
    { game: "iPhone 15", date: "2/10/23", id: 1 },
    { game: "Google Pixel 11", date: "3/17/23", id: 2 },
    { game: "Macbook Pro 2023", date: "5/12/23", id: 3 },
    { game: "Microsoft Surface 6", date: "5/26/23", id: 4 },
  ];

  return (
    <>
      <div className="communityPage">
        <div className="poll voter">
          <h3 className="question">
            What game are you most looking forward to in 2023?
          </h3>
          <h1 style={{ color: "red" }}>{isError}</h1>
          <form className="pollOptions" onSubmit={handleSubmit}>
            <li className="option zelda">
              <input
                type="radio"
                name="answer"
                value="option1"
                onChange={() => setpollOption("option1")}
              ></input>
              <label id="zelda">Zelda Tears of the Kingdom</label>
            </li>
            <li className="option jedi">
              <input
                type="radio"
                name="answer"
                value="option2"
                onChange={() => setpollOption("option2")}
              ></input>
              <label id="jedi">Jedi Survivor</label>
            </li>
            <li className="option spongebob">
              <input
                type="radio"
                name="answer"
                value="option3"
                onChange={() => setpollOption("option3")}
              ></input>
              <label id="spongebob">Spongebob Cosmic Shake</label>
            </li>
            <li className="option hogwarts">
              <input
                type="radio"
                name="answer"
                value="option4"
                onChange={() => setpollOption("option4")}
              ></input>
              <label id="hogwarts">Hogwarts Legacy</label>
            </li>
            <div id="submitButton">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>

        <div className="poll results">
          {/* Isn't a valid class ^ */}
          <h3 className="question">What was your favorite game of 2022?</h3>
          <ul className="pollOptions">
            <li className="eldenring">
              <span id="zelda">
                {/* What's the point of the id*/}
                WINNER: <b>38% </b>Elden Ring
              </span>
            </li>
            <li className="option">
              <span id="jedi">
                <b>25% </b>God of War: Ragnorok
              </span>
            </li>
            <li className="option">
              <span id="spongebob">
                <b>20% </b>Lego Star Wars: Skywalker Saga
              </span>
            </li>
            <li className="option">
              <span id="hogwarts">
                <b>17% </b>Call of Duty: Modern Warfare II
              </span>
            </li>
          </ul>
        </div>

        {/* 
          <div id="topMembersTitle">
            Top Game Reviews Members
          </div> */}

        <div className="topMembers">
          <div className="columns">
            <div className="column">
              <b className="mosts">Top Rated Games</b>
              <ul className="userNames">
                <MostListUsers db={db} />
              </ul>
            </div>

            <div className="column">
              <b className="mosts">Most Articles Written</b>
              <ul className="userNames">
                <MostListUsers db={db} />
              </ul>
            </div>

            <div className="column gameReleases">
              <b className="mosts">Upcoming Game Releases</b>
              <ul className="userNames">
                <Releases db={gameReleases} />
              </ul>
            </div>

            <div className="column">
              <b className="mosts">Most Comments</b>
              <ul className="userNames">
                <MostListUsers db={db} />
              </ul>
            </div>

            <div className="column birthdays">
              <b className="mosts">Upcoming User Birthdays</b>
              <ul className="userNames">
                <Birthdays db={birthdayDB}></Birthdays>
              </ul>
            </div>

            <div className="column techReleases">
              <b className="mosts">Upcoming Tech Releases</b>
              <ul className="userNames">
                <Releases db={techReleases} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
