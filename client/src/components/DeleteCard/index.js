import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_CARD } from "../../utils/mutations";
import { useDispatch } from "react-redux";
import { DELETE_CARDS } from "../../utils/actions";

const DeleteCard = ({ card }) => {
  const dispatch = useDispatch();

  const [deleteCard, { error }] = useMutation(DELETE_CARD);

  const deleteCards = () => {
    dispatch({
      type: DELETE_CARDS,
      deletedCard: card,
    });
  };

  const handleDeleteCard = async (event) => {
    event.preventDefault();

    try {
      // delete card from database
      await deleteCard({
        variables: { ...card },
      });
      deleteCards();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [deleteCard]);

  return (
    <>
      <Button
        onClick={handleDeleteCard}
        className="delete-btn"
        variant="danger"
      >
        <img src="https://img.icons8.com/windows/48/d4af37/delete-forever.png" />
      </Button>
    </>
  );
};

export default DeleteCard;
