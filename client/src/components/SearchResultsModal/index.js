import React, { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// import CardComponent from "../Card";
// import AddCardButton from "../Search/Button";

// when using the success modal, the message you want displayed needs to be passed in through the message prop
function ResultsModal({ show, setShow, results, addCollectedCard }) {
  const CardComponent = lazy(() => import("../Card"));
  const AddCardButton = lazy(() => import("../Search/Button"));
  const renderLoader = () => (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Search Results:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row justify-content-start">
            {!results.length && (
              <h3 style={{ color: "black" }}>No results found...</h3>
            )}
            {results.map((card) => (
              <div className="col-12 pb-2 text-center" key={card._id}>
                <Suspense fallback={renderLoader()}>
                  <CardComponent card={card} />
                  <AddCardButton
                    addCollectedCard={addCollectedCard}
                    id={card._id}
                  />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-border"
          variant="secondary"
          onClick={() => setShow(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultsModal;
