import React from "react";
import { Card } from "react-bootstrap";

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import QrCode from "../QrCode";
import DeleteCard from '../DeleteCard'
import RemoveCard from '../RemoveCard'
import Auth from '../../utils/auth'

const CardComponent = ({ card }) => {

  // show only user's unique cards
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });
  const user = data?.me || data?.user || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card className="border m-1" key={card._id} style={{ minHeight: "50vh" }}>
        {/* <Card.Img variant="top" src={card.logoUrl} /> */}
        <Card.Body>
          <Card.Title>{card.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {card.companyName}
          </Card.Subtitle>
          <Card.Link href={card.website} target="_blank">
            {card.website}
          </Card.Link>
          <Card.Text>{card.tagline}</Card.Text>
          <h5>Contact</h5>
          <Card.Link href={"mailto:" + card.email}>{card.email}</Card.Link>
          <br />
          <Card.Link href={"tel:+" + card.phone}>{card.phone}</Card.Link>
          <QrCode cardId={card._id}/>
        </Card.Body>
        <DeleteCard/>
      </Card>
    </div>
  );
};

export default CardComponent;
