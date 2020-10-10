import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import { REMOVE_CARD } from '../../utils/mutations'
import ResultsModal from '../SearchResultsModal';

const RemoveCard = ({ card }) => {


    const [removeCard, { error }] = useMutation(REMOVE_CARD)

    const handleRemoveCard = async event => {
        event.preventDefault();
        
        try {
            // remove card from database
            await removeCard({
            variables: { ...card }
            });
        
            } catch (e) {
                console.error(e);
            }
        };

    let isCollection;

    const pageCheck = () => {
        if (window.location.pathname === '/collection') {
            isCollection = true;
        } else {
            isCollection = false;
        }
    };

    pageCheck()

    return (
        <div>
            {isCollection && <Button onClick={handleRemoveCard}>Remove Card</Button>}
        </div>
  )
}

export default RemoveCard;