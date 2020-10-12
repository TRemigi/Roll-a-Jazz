import React from 'react';
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
        <>
          <Button onClick={handleDeleteCard} className='delete-btn' variant="danger">
                <img src="https://img.icons8.com/windows/48/d4af37/delete-forever.png" />
          </Button>
        </>
  )
}

export default DeleteCard;