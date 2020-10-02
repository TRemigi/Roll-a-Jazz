import React from 'react';
import { Card } from 'react-bootstrap';

const CardComponent = ({ card }) => {

    return (
        <div>
            <Card className="border m-2" key={card._id} style={{ width: '18rem' }}>
                {/* <Card.Img variant="top" src={card.logoUrl} /> */}
                <Card.Body>
                    <Card.Title>{card.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{card.companyName}</Card.Subtitle>
                    <Card.Link href={card.website} target="_blank">{card.website}</Card.Link>
                    <Card.Text>{card.tagline}</Card.Text>
                    <h5>Contact</h5>
                    <Card.Link href={'mailto:' + card.email} >{card.email}</Card.Link><br/>
                    <Card.Link href={'tel:+' + card.phone}>{card.phone}</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CardComponent;