import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_CARD } from '../../utils/mutations'

const DeleteCard = ({ card }) => {

  const [deleteCard, { error }] = useMutation(DELETE_CARD)

  const handleDeleteCard = async event => {
      event.preventDefault();
    
      try {
        // delete card from database
        await deleteCard({
          variables: { ...card }
        });
    
      } catch (e) {
        console.error(e);
      }
    };

  return (
          <Button onClick={handleDeleteCard}>Delete Card</Button>
  )
}

export default DeleteCard;