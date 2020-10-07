import React from "react";

const QRCode = require("qrcode.react");


const QrCode = ({cardId}) => {
  return (
    <div>
      <QRCode value={cardId} />
    </div>
  );
};

export default QrCode;
