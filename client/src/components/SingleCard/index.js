import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import QrCode from "../QrCode";
import EditCardForm from "../EditCardForm";
// import ReactCardFlip
// docs: https://github.com/AaronCCWong/react-card-flip
import ReactCardFlip from "react-card-flip";

function SingleCardModal({ show, setShow, card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const [inProp, setInProp] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const handleFlip = () => {
    setInProp(true);
    setIsFlipped(!isFlipped);
  };

  let isHome;

  const pageCheck = () => {
    if (window.location.href === "http://localhost:3000/") {
      isHome = true;
    } else {
      isHome = false;
    }
  };

  pageCheck();

  const editCard = () => {
    console.log("editing card");
    setShow(false);
    setIsEdit(true);
  };

  return (
    <>
      {isEdit && (
        <div className="row justify-content-center">
          <EditCardForm card={card} setIsEdit={setIsEdit} />
        </div>
      )}
      {!isEdit && (
        <Modal
          animation={false}
          show={show}
          onHide={() => setShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="scale-in border-0"
          style={{ backgroundColor: "rgba(14, 14, 14, 0.3)" }}
        >
          <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection="horizontal"
            containerStyle={{ backgroundColor: "rgb(14, 14, 14)" }}
          >
            <Card
              className="pointer border-0 single-card"
              key={card._id}
              key="front"
              onClick={handleFlip}
            >
              {/* <Card.Img variant="top" src={card.logoUrl} /> */}
              <Card.Body className="text-center">
                <Card.Title>{card.name}</Card.Title>
                <Card.Subtitle>{card.companyName}</Card.Subtitle>
                <Card.Link href={card.website} target="_blank">
                  {card.website}
                </Card.Link>
                <Card.Text>{card.tagline}</Card.Text>
                <h5 className="card-contact ">Contact</h5>
                <Card.Link href={"mailto:" + card.email}>
                  {card.email}
                </Card.Link>
                <br />
                <Card.Link href={"tel:+" + card.phone}>{card.phone}</Card.Link>
                {/* <QrCode cardId={card._id}/> */}
              </Card.Body>
            </Card>

            <Card
              className="flip-in pointer border-0 single-card"
              key={card._id}
              key="back"
              onClick={handleFlip}
            >
              <Card.Body className="d-flex justify-content-center align-items-center qr-body">
                <QrCode cardId={card._id} />
              </Card.Body>
              {/* Kailey's delete button will go here */}
              {isHome ? (
                <ButtonGroup
                  className="justify-content-between"
                  aria-label="home-btns"
                >
                  <Button
                    className="edit-btn"
                    value={card}
                    variant="primary"
                    onClick={() => editCard()}
                  >
                    <img src="https://img.icons8.com/metro/36/d4af37/edit.png" />
                  </Button>
                  <Button className="delete-btn" variant="danger">
                    <img src="https://img.icons8.com/windows/48/d4af37/delete-forever.png" />
                  </Button>
                </ButtonGroup>
              ) : (
                <Button value={card} variant="danger">
                  Remove From Collection
                </Button>
              )}
            </Card>
          </ReactCardFlip>
        </Modal>
      )}
    </>
  );
}

export default SingleCardModal;
