import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CSSTransition } from 'react-transition-group';
import QrCode from '../QrCode';
import CardComponent from '../Card'
import { Card } from 'react-bootstrap';

// when using the success modal, the message you want displayed needs to be passed in through the message prop
function SingleCardModal({ show, setShow, card }) {

    const [cardFlipped, setCardFlipped] = useState(false);

    const [inProp, setInProp] = useState(false);

    const handleFlip = () => {
        setInProp(true)
        setCardFlipped(!cardFlipped);
    };

    let isHome;

    const pageCheck = () => {
        if (window.location.href === 'http://localhost:3000/') {
            isHome = true;
        } else {
            isHome = false;
        }
    };

    pageCheck();


    return (
        <>
            <Modal
            animation={false}
            show={show}
            onHide={() => setShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="scale-in border-0"
            >
            {!cardFlipped ? 
            (
                <CSSTransition
                in={inProp} timeout={200} classNames="my-node"
                >

                <Card className="pointer border-0 single-card"
                key={card._id}
                onClick={handleFlip}
                >
                {/* <Card.Img variant="top" src={card.logoUrl} /> */}
                    <Card.Body className='text-center'>
                        <Card.Title>{card.name}</Card.Title>
                        <Card.Subtitle>
                            {card.companyName}
                        </Card.Subtitle>
                        <Card.Link href={card.website} target="_blank">
                            {card.website}
                        </Card.Link>
                        <Card.Text>{card.tagline}</Card.Text>
                        <h5 className='card-contact '>Contact</h5>
                        <Card.Link href={"mailto:" + card.email}>{card.email}</Card.Link>
                        <br />
                        <Card.Link href={"tel:+" + card.phone}>{card.phone}</Card.Link>
                        {/* <QrCode cardId={card._id}/> */}
                    </Card.Body>
                </Card>

                </CSSTransition>
            )
            :
            (
                <Card className="flip-in pointer border-0 single-card"
                key={card._id}
                onClick={handleFlip}
                >
                    <Card.Body className="d-flex justify-content-center align-items-center qr-body">
                        <QrCode cardId={card._id}/>
                    </Card.Body>
                    {/* Kailey's delete button will go here */}
                    {isHome &&
                    <Button className='delete-btn' variant="danger">
                        <img src="https://img.icons8.com/windows/48/d4af37/delete-forever.png"/></Button>
                    }
                </Card>
            )
            }
        </Modal>
            </>
    );
};

export default SingleCardModal;