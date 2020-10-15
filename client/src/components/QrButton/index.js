import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { ADD_COLLECTED_CARD } from "../../utils/mutations";

const QrButton = () => {
  let oldResult;
  const [result, setResult] = useState(oldResult);
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  // use a mutation to add scanned card to database
  const [addCollectedCard, { addedData }] = useMutation(ADD_COLLECTED_CARD);

  const handleScan = (scannedData) => {
    if (scannedData) {
      // console.log(scannedData);
      oldResult = result;
      addCollectedCard({ variables: { _id: scannedData } });
      setResult(scannedData);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const reader = (
    <QrReader
      delay={300}
      onError={handleError}
      onScan={handleScan}
      className="mb-2"
    />
  );

  useEffect(() => {
    setToggle(false);
  }, [result]);

  useEffect(() => {
    // after qrscanner collapses and if you scanned a new code show the success modal
    if (!toggle && result !== oldResult) {
      setShow(true);
    }
  }, [toggle]);
  console.log(show);

  return (
    <div className="scanner">
      {toggle && reader}
      <Button
        className="col-12 mt-2 mb-3 btn-border scan-button"
        onClick={() => (toggle ? setToggle(false) : setToggle(true))}
      >
        {toggle ? "Close" : "Scan Code"}
      </Button>
    </div>
  );
};

export default QrButton;
