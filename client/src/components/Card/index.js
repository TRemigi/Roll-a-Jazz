import React, { useState } from "react";
import './style.css';
import { Card } from "react-bootstrap";
import SingleCardModal from '../SingleCard';
import QrCode from "../QrCode";
import { useDispatch, useReducer } from "react-redux";
import DeleteCard from "../DeleteCard";
import RemoveCard from "../RemoveCard";
import ResultsModal from "../SearchResultsModal"

const CardComponent = ({ card }) => {

  const [show, setShow] = useState(false);

  const cardClickHandler = () => {
    
    setShow(true);
  }

  return (
    <div>
      {/* <SingleCardModal show={show} setShow={setShow} card={card} /> */}
      <Card className="border m-1 pointer" key={card._id} style={{ minHeight: "50vh" }}
      onClick={cardClickHandler}
      >
        {/* <Card.Img variant="top" src={card.logoUrl} /> */}
        <Card.Body>
          <Card.Title className='card-title'>{card.name}</Card.Title>
          <Card.Subtitle className="mb-2 card-sub">
            {card.companyName}
          </Card.Subtitle>
          <Card.Link href={card.website} target="_blank">
            {card.website}
          </Card.Link>
          <Card.Text>"{card.tagline}"</Card.Text>
          <h5>Contact</h5>
          <Card.Link href={"mailto:" + card.email}>{card.email}</Card.Link>
          <br />
          <Card.Link href={"tel:+" + card.phone}>{card.phone}</Card.Link>
          {/* <QrCode cardId={card._id}/> */}
          <br />
          <DeleteCard card={card}/>
          <RemoveCard card={card}/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;
