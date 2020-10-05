import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_MY_COLLECTION, QUERY_ME } from '../utils/queries'
import { ADD_COLLECTED_CARD } from '../utils/mutations';
import CardList from '../components/CardList';
import AddCard from '../components/AddCard';


const Collection = () => {
  const { loading, data } = useQuery(QUERY_MY_COLLECTION);

  const cards = data?.me.collectedCards || [];

  // const [addCollectedCard, { error }] = useMutation(ADD_COLLECTED_CARD);

  const [addCollectedCard, { error }] = useMutation(ADD_COLLECTED_CARD, {
    update(cache, { data: { addCollectedCard } }) {
        try {
            //could potentially not exist yet, so wrap in a try...catch
            const { me } = cache.readQuery({ query: QUERY_MY_COLLECTION });
            cache.writeQuery({
                query: QUERY_MY_COLLECTION,
                data: { me: { ...me, collectedCards: [addCollectedCard, ...me.collectedCards] } }
              })
              
        } catch (e) {
            console.error(e);
        }
    }
})

  return (
    <main className="container">
      <div className="row justify-content-center">
        <AddCard addCollectedCard={addCollectedCard} collectedCards={cards} />
        <h3 className="p-3">Cards you've collected</h3>
        <div className="col-12">
          {loading ? (
            <div>Loading..</div>
            ) : (
              <CardList cards={cards}/>
              )}
        </div>
      </div>
      
    </main>
  );
};

export default Collection;
