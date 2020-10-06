import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_USER_CARDS } from "../../utils/queries";
import { Form, Button } from "react-bootstrap";
import ResultsModal from "../SearchResultsModal";
import QrButton from "../QrButton";

const AddCard = () => {
  const [searchCards, { data }] = useLazyQuery(QUERY_USER_CARDS);

  const cards = data?.userCards || [];

  useEffect(() => {
    if (cards) {
      console.log(cards);
    }
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
      <ResultsModal show={show} setShow={setShow} results={cards} />

      <Form inline className="col-12 p-0" onSubmit={handleSubmit}>
        <Form.Label htmlFor="nameInput" srOnly>
          Name
        </Form.Label>
        <Form.Control
          style={{ width: "90%" }}
          className="mb-2 mr-sm-2"
          id="nameInput"
          placeholder="Enter a name to search for cards"
        />
        <Button type="submit" className="mb-2">
          Search
        </Button>
      </Form>
      <QrButton />
    </div>
  );
};

export default AddCard;
