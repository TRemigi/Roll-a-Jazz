import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";

const AddCardButton = ({ addCollectedCard, id }) => {
  const handleAddCollectedCard = async () => {
    try {
      await addCollectedCard({
        variables: { _id: id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleAddCollectedCard}
      className="btn-border"
    >
      Add to Collection
    </Button>
  );
};

export default AddCardButton;
