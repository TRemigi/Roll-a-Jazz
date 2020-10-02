import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_CARDS } from '../utils/queries'

import CardList from '../components/CardList'


const Collection = () => {
  const { loading, data } = useQuery(QUERY_CARDS);

  const cards = data?.cards || [];

  return (
    <main>
      <h3>Collection of All Business Cards Created</h3>
      <div>
        {loading ? (
          <div>Loading..</div>
        ) : (
          <CardList cards={cards}/>
        )}
      </div>
      
    </main>
  );
};

export default Collection;
