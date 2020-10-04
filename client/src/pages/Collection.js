import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_CARDS, QUERY_MY_COLLECTION } from '../utils/queries'

import CardList from '../components/CardList';
import AddCard from '../components/AddCard';


const Collection = () => {
  const { loading, data } = useQuery(QUERY_MY_COLLECTION);

  const cards = data?.me.collectedCards || [];

  return (
    <main className="container">
      <div className="row justify-content-center">
        <AddCard />
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
