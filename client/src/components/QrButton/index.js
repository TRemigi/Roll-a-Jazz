import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Button } from 'react-bootstrap'
import { faRubleSign } from "@fortawesome/free-solid-svg-icons";


const QrButton = () => {
  const [result, setResult] = useState("No result");
  const [toggle, setToggle] = useState(false)

  const handleScan = (data) => {
    if (data) {
      setResult(data);
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
      style={{ width: "100%" }}
    />
  );

  return (
    <div>
      {toggle && reader}
      <Button className='mb-1 btn-border' onClick={() => (toggle ? setToggle(false) : setToggle(true))}>
        {console.log(toggle)}
        Scan QR Code
      </Button>
      <p>{result}</p>
    </div>
  );
};

export default QrButton;
