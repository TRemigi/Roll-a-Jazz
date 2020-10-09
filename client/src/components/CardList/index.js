import React from 'react';
import { CardDeck, Col } from 'react-bootstrap';
import CardComponent from '../Card'
import {useQuery} from '@apollo/react-hooks';
import {useEffect, } from 'react';

const CardList = ({ cards }) => {

    if(!cards.length) {
        return <h3>No Cards Yet!</h3>
    }

    

    return (
            <CardDeck className="m-4">
            {cards && 
                cards.map(card => (
                    <Col sm key={card._id}>
                        <CardComponent cards={card}/>
                    </Col>
                ))}
            </CardDeck>
    )
}

export default CardList;