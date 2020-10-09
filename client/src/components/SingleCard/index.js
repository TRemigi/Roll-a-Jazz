import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CSSTransition } from 'react-transition-group';
import QrCode from '../QrCode';

import { Card } from 'react-bootstrap';

// when using the success modal, the message you want displayed needs to be passed in through the message prop
function SingleCardModal({ show, setShow, card }) {

    const [cardFlipped, setCardFlipped] = useState(false);

    const [inProp, setInProp] = useState(false);

    const handleFlip = () => {
        setInProp(true)
        setCardFlipped(!cardFlipped);
    };

    return (
        <>
            <Modal
            animation={false}
            show={show}
            onHide={() => setShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="scale-in"
            >
            {!cardFlipped ? 
            (
                <CSSTransition
                in={inProp} timeout={200} classNames="my-node"
                >

                <Card className="pointer"
                key={card._id}
                style={{ minHeight: "50vh" }}
                onClick={handleFlip}
                >
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
                        {/* <QrCode cardId={card._id}/> */}
                    </Card.Body>
                </Card>

                </CSSTransition>
            )
            :
            (
                <Card className="flip-in pointer"
                key={card._id}
                style={{ minHeight: "50vh" }}
                onClick={handleFlip}
                >
                    <Card.Body className="d-flex justify-content-center align-items-center">
                        <QrCode cardId={card._id}/>
                    </Card.Body>
                </Card>
            )
            }
        </Modal>
            </>
    );
};

export default SingleCardModal;