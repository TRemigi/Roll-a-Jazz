import React from 'react';
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_CARD } from '../../utils/mutations'
import { QUERY_CARDS, QUERY_ME } from '../../utils/queries'


const DeleteCard = ({ card }) => {

    const [deleteCard, { error }] = useMutation(DELETE_CARD, {
      update(cache, { data: { deleteCard } }) {
        try {
            //could potentially not exist yet, so warap in a try...catch
            const { cards } = cache.readQuery({ query: QUERY_CARDS });
            cache.writeQuery({
                query: QUERY_CARDS,
                data: { cards: [deleteCard, ...cards] }
            })
        } catch (e) {
            console.error(e);
        }

        //update me object's cache, appending new card to the end of the array
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, cards: [...me.cards, deleteCard] } },
        });
        console.log(...me.cards)
    }
    })

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