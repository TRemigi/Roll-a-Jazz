import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CardComponent from '../Card';
import AddCardButton from '../AddCard/Button';
import { Card } from 'react-bootstrap';

// when using the success modal, the message you want displayed needs to be passed in through the message prop
function ResultsModal({ show, setShow, results }) {

    return (
        <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header
            style={ {backgroundColor: "#D4AF37"}}>
            <Modal.Title id="contained-modal-title-vcenter">
                Search Results:
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row justify-content-start">
                        {results.map(card => (
                            <div className="col-6 pb-2 text-center" key={card._id}>
                                <CardComponent card={card} />
                                <AddCardButton id={card._id} />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResultsModal;