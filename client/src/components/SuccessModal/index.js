import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";

// when using the success modal, the message you want displayed needs to be passed in through the message prop
function SuccessModal({ show, setShow, message }) {

    let isCreatePage;

    const pageCheck = () => {
        if (window.location.pathname === "/create") {
            isCreatePage = true;
        } else {
            isCreatePage = false;
        }
    };

    pageCheck();

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='modal-header'
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Success!
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{ color: "black" }}>
                    {message}
                </p>
            </Modal.Body>
            <Modal.Footer className='justify-content-between'>
                {isCreatePage ? (
                    <>
                        <Button type='button' className='btn-border see-card-btn' variant="secondary" as={Link} to="/">View Cards</Button>
                        <Button className='btn-border mr-2' variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    </>
                ) : (
                        <Button className='btn-border' variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    )}
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;