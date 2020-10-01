import React from 'react';
import { CardDeck, Card, Col } from 'react-bootstrap';

const CardList = ({ cards }) => {

    if(!cards.length) {
        return <h3>No Cards Yet!</h3>
    }

    return (

        <div className='m-5'>
            <h3>Your Business Cards</h3>
            <div>
            <CardDeck className="m-4">
            {cards && 
                cards.map(card => (
                    <Col sm key={card._id}>
                        <Card className="border m-2" key={card._id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={card.logoUrl} />
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
                    </Col>
                ))}
            </CardDeck>
            </div>
        </div>
    )
}

export default CardList;