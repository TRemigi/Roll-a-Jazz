import React, { lazy, Suspense } from "react";
import { CardDeck, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
// import CardComponent from "../Card";
import "../../assets/css/style.css";

const CardList = ({ cards }) => {
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
    <CardDeck className="pl-0 slit">
      {cards &&
        cards.map((card) => (
          <Col className="col-lg-6 col-sm-12 card-column" key={card._id}>
            <Suspense fallback={renderLoader()}>
              <CardComponent card={card} />
            </Suspense>
          </Col>
        ))}
    </CardDeck>
  );
};

export default CardList;
