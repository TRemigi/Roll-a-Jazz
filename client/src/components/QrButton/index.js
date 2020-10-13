import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_COLLECTED_CARD } from "../../utils/mutations";
import ResultsModal from '../SearchResultsModal'
import SuccessModal from '../SuccessModal';

const QrButton = () => {
  const [result, setResult] = useState("No result");
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false)

  // use a mutation to add scanned card to database
  const [addCollectedCard, { addedData }] = useMutation(ADD_COLLECTED_CARD);

  const handleScan = (scannedData) => {
    if (scannedData) {
      console.log(scannedData);
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
      className='mb-2'
    />
  );

  useEffect(() => {
    setToggle(false);
  }, [result]);
  
  useEffect(() => {
    setShow(true);
  }, [addedData]);

  return (
    <div className='scanner'>
      {toggle && reader}
      <SuccessModal show={addedData?true:false} setShow={setShow} message={"You did it!!!"}/>
      <Button
        className="col-12 mb-3 btn-border scan-button"
        style={{ width: "100%" }}
        onClick={() => (toggle ? setToggle(false) : setToggle(true))}
      >
        Scan Code
      </Button>
      <p>{result}</p>
    </div>
  );
};

export default QrButton;
