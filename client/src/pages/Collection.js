import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Auth from '../utils/auth';

import { QUERY_CARDS } from '../utils/queries'

import CardForm from '../components/CardForm'
import CardList from '../components/CardList'


const Collection = () => {

  const { loading, data } = useQuery(QUERY_CARDS);

  const cards = data?.cards || [];
  const loggedIn = Auth.loggedIn();

  return (
    <main>

      {loggedIn && (
      <div>
        <CardForm />
      </div>
      )}

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
