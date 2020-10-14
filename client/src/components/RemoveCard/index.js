import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_CARD } from "../../utils/mutations";
import { useDispatch } from "react-redux";
import { REMOVE_CARDS } from "../../utils/actions";

const RemoveCard = ({ card }) => {
  const dispatch = useDispatch();

  const [removeCard, { error }] = useMutation(REMOVE_CARD);

  const removeCards = () => {
    dispatch({
      type: REMOVE_CARDS,
      removedCard: card,
    });
  };

  const handleRemoveCard = async (event) => {
    event.preventDefault();

    try {
      // remove card from database
      await removeCard({
        variables: { ...card },
      });
      removeCards();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [removeCard]);

  return (
    <>
      <Button
        className="remove-btn"
        onClick={handleRemoveCard}
        value={card}
        variant="danger"
      >
        Remove From Collection
      </Button>
    </>
  );
};

export default RemoveCard;
