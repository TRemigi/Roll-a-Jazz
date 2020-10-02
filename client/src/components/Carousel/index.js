import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
// import Card from '../Card';


const CardCarousel = ({ cards }) => {

    if (!cards.length) {
        return <h3>No Cards Yet</h3>;
    }

    return (
        <Carousel
        interval={null}
        >
            {cards &&
            cards.map(card => (
                <Carousel.Item key={ cards.indexOf(card) }>
                    {/* <Card cardData={ card } /> */}
                    <h3>card</h3>
                </Carousel.Item>
            )) }
        </Carousel>  
    )
}

export default CardCarousel;