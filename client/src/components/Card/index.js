import React, { useState, lazy, Suspense } from "react";
import "./style.css";
import { Card } from "react-bootstrap";
import SingleCardModal from "../SingleCard";

const CardComponent = ({ card }) => {
  const [show, setShow] = useState(false);

  const cardClickHandler = () => {
    setShow(true);
  };

  return (
    <div>
      <SingleCardModal show={show} setShow={setShow} card={card} />
      <Card
        className="mt-1 mb-1 pointer"
        key={card._id}
        onClick={cardClickHandler}
      >
        <Card.Body className="text-center">
          <Card.Title className="card-title">{card.name}</Card.Title>
          <Card.Subtitle className=" card-sub mb-4">
            {card.jobTitle}
          </Card.Subtitle>
          <Card.Subtitle className=" card-sub">
            {card.companyName}
          </Card.Subtitle>
          <Card.Link
            rel={"external"}
            href={"https://" + card.website}
            target="_blank"
          >
            {card.website}
          </Card.Link>
          <Card.Text>"{card.tagline}"</Card.Text>
          <h5 className="card-contact ">Contact</h5>
          <Card.Link href={"mailto:" + card.email}>{card.email}</Card.Link>
          <br />
          <Card.Link href={"tel:+" + card.phone}>{card.phone}</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;
