import React, { useState } from "react";
import { CardDeck, Col } from "react-bootstrap";
import CardComponent from "../Card";
import "../../assets/css/style.css";

const CardList = ({ cards }) => {
  if (!cards.length) {
    return <h3>No Cards Yet!</h3>;
  }

  return (
    <CardDeck className="pl-0 slit">
      {cards &&
        cards.map((card) => (
          <Col className="col-lg-6 col-sm-12 card-column" key={card._id}>
            <CardComponent card={card} />
          </Col>
        ))}
    </CardDeck>
  );
};

export default CardList;
