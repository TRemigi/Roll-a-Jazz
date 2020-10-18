import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faClone } from "@fortawesome/free-solid-svg-icons";

const CardToggle = ({ viewSelected, setViewSelected }) => {
  const handleToggle = () => {
    setViewSelected(!viewSelected);
  };

  return (
    <div
      variant="secondary"
      size="sm"
      onClick={handleToggle}
      className="pointer car-view pl-2"
    >
      {viewSelected ? (
        <>
          <FontAwesomeIcon icon={faClone} size="lg" />
          <span> Carousel View</span>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faThLarge} size="lg" />
          <span> Grid View</span>
        </>
      )}
    </div>
  );
};

export default CardToggle;
