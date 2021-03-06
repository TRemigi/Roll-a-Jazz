import React, { useState, useEffect, lazy, Suspense } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_USER_CARDS } from "../../utils/queries";
import { Form, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
// import ResultsModal from "../SearchResultsModal";
// import QrButton from "../QrButton";

const Search = ({ addCollectedCard, collectedCards }) => {
  const ResultsModal = lazy(() => import("../SearchResultsModal"));
  const QrButton = lazy(() => import("../QrButton"));
  const renderLoader = () => (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  const [searchCards, { data }] = useLazyQuery(QUERY_USER_CARDS);
  const initialResults = data?.userCards || [];

  let filteredResults = [];

  const [finalResults, setFinalResults] = useState(filteredResults);

  const filterResults = () => {
    filteredResults = [];

    for (let i = 0; i < initialResults.length; i++) {
      let isNewCard = true;

      for (let j = 0; j < collectedCards.length; j++) {
        if (initialResults[i]._id === collectedCards[j]._id) {
          isNewCard = false;
          break;
        } else {
          continue;
        }
      }

      if (isNewCard === false) {
        continue;
      } else {
        filteredResults.push(initialResults[i]);
      }
    }

    setFinalResults(filteredResults);
  };

  useEffect(() => {
    filterResults();
  }, [data]);

  // use State to handle ResultsModal
  // set initial show state to false
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await searchCards({
      variables: { name: e.target.nameInput.value },
    });

    setShow(true);
  };

  return (
    <div className="col-12">
      <Suspense fallback={renderLoader()}>
        <ResultsModal
          show={show}
          setShow={setShow}
          results={finalResults}
          addCollectedCard={addCollectedCard}
        />
      </Suspense>
      <Suspense fallback={renderLoader()}>
        <QrButton className="col-11 mb-3" style={{ width: "90%" }}>
          Scan Code
        </QrButton>
      </Suspense>
      <p className="text-center">or</p>
      <Form inline className="col-12 p-0 border-0" onSubmit={handleSubmit}>
        <Form.Label htmlFor="nameInput" srOnly>
          Name
        </Form.Label>
        <Form.Control
          className="mb-2 mr-lg-2 mt-0 searchbar"
          id="nameInput"
          placeholder="Enter a name to search for cards"
        />
        <Button type="submit" className="mb-2 mt-2 btn-border">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default Search;
