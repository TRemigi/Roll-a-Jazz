import React, { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import "../../assets/css/style.css";
// import CardComponent from "../Card";

const CardCarousel = ({ cards }) => {
  const CardComponent = lazy(() => import("../Card"));
  const renderLoader = () => (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  if (!cards.length) {
    return <h3>No Cards Yet!</h3>;
  }

  return (
    <Carousel interval={null} className="slit">
      {cards &&
        cards.map((card) => (
          <Carousel.Item key={card._id}>
            <Suspense fallback={renderLoader()}>
              <CardComponent className="caro-single" card={card} />
            </Suspense>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default CardCarousel;
