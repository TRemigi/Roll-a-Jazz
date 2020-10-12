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
        // <div className='m-5'>
        //     <div>
            <CardDeck className='pl-0'>
            {cards && 
                cards.map(card => (
                    <Col className='col-lg-6 col-sm-12 card-column' key={card._id}>
                        <CardComponent card={card}/>
                    </Col>
                ))}
            </CardDeck>
        //     </div>
        // </div>
    )
}

export default CardList;