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

    let isHome;

    const pageCheck = () => {
        if (window.location.pathname === '/') {
            isHome = true;
        } else {
            isHome = false;
        }
    };

    pageCheck()

    return (
        <div>
            {isHome && <Button onClick={handleDeleteCard}>Delete Card</Button>}
        </div>
  )
}

export default DeleteCard;