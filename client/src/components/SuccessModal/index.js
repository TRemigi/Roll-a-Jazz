import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// when using the success modal, the message you want displayed needs to be passed in through the message prop
function SuccessModal({ show, setShow, message }) {

    return (
        <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header
            closeButton
            style={ {backgroundColor: "#28A745"}}>
            <Modal.Title id="contained-modal-title-vcenter">
                Success!
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{color: "black"}}>
                    { message }
                </p>
            </Modal.Body>
            <Modal.Footer>
            <Button className='btn-border' variant="secondary" onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;