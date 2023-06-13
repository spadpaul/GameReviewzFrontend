import { useRef } from "react";
import Ty from "../assets/tyabout.jpeg";
import "../assets/wwdc.png";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
const SlideContainer = ({ cards, offset }) => {
  return (
    <div ref={offset} className="slideContainer">
      {cards.map((card) => (
        <Slide
          title={card.title}
          img={card.img}
          desc={card.desc}
          id={card.id}
          page={card.page}
        />
      ))}
    </div>
  );
};

const Slide = ({ title, img, desc, id, page }) => {
  return (
    <div className="slide">
      <NavLink to={`/${page}/` + id} className="navlink">
        <img
          style={{ height: "250px", width: "100%", objectFit: "cover" }}
          src={img}
          alt={id}
        />
        <div>
          <p>{title}</p>
          <p>
            <i>{desc}</i>
          </p>
        </div>
      </NavLink>
    </div>
  );
};

const Slider = (props) => {
  const ref = useRef(null);
  const data = props.data || [
    {
      title: "Apple WWDC Review",
      img: Ty,
      desc: "Apple's long anticipated developer conference is finally here and it did not dissapoint.",
    },
    {
      title: "Card 2",
      img: Ty,
      desc: "Hello World",
    },
    {
      title: "Card 3",
      img: Ty,
      desc: "Hello World",
    },
    {
      title: "Card 4",
      img: Ty,
      desc: "Hello World",
    },
    {
      title: "Card 5",
      img: Ty,
      desc: "Hello World",
    },
  ];
  const scroll = (offset) => {
    ref.current.scrollLeft += offset;
  };
  return (
    <>
      <h1 style={{ marginLeft: "2%" }}>Trending Topics 🔥</h1>
      <div style={{ display: "flex" }}>
        <ArrowLeftCircle
          style={{
            fontSize: "30px",
            cursor: "pointer",
            position: "absolute",
            left: 0,
            top: 650,
          }}
          onClick={() => scroll(-300)}
        />
        <div>
          <SlideContainer offset={ref} cards={data} />
        </div>
        <ArrowRightCircle
          style={{
            fontSize: "30px",
            cursor: "pointer",
            position: "absolute",
            right: 0,
            top: 650,
          }}
          onClick={() => scroll(300)}
        />
      </div>
    </>
  );
};
export default Slider;
