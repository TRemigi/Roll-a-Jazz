import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_MY_COLLECTION, QUERY_ME } from '../utils/queries'
import { ADD_COLLECTED_CARD } from '../utils/mutations';
import CardList from '../components/CardList';
import Search from '../components/Search';



const Collection = () => {
  const { loading, data } = useQuery(QUERY_MY_COLLECTION);

  let cards = data?.me.collectedCards || [];
  
  const [collectedCards, setCollectedCards] = useState(cards);

  // const [addCollectedCard, { error }] = useMutation(ADD_COLLECTED_CARD);

  const [addCollectedCard, { error }] = useMutation(ADD_COLLECTED_CARD, {
    update(cache, { data: { addCollectedCard } }) {
        try {
            //could potentially not exist yet, so wrap in a try...catch
            const { me } = cache.readQuery({ query: QUERY_MY_COLLECTION });
            cache.writeQuery({
                query: QUERY_MY_COLLECTION,
                data: { me: { ...me, collectedCards: [addCollectedCard, ...collectedCards] } }
              })
              
        } catch (e) {
            console.error(e);
        }
    }
  })

  useEffect(() => {
    setCollectedCards(cards);
  }, [data, cards]);

  return (
    <main className="container">
      <div className="row justify-content-center">
        <Search addCollectedCard={addCollectedCard} collectedCards={collectedCards} />
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
