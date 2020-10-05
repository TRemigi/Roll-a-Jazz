import React, { useState } from "react";
import QrReader from "react-qr-reader";

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
      <button onClick={() => (toggle ? setToggle(false) : setToggle(true))}>
        {console.log(toggle)}
        Scan QR Code
      </button>
      <p>{result}</p>
    </div>
  );
};

export default QrButton;
