import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_MY_COLLECTION, QUERY_ME } from "../utils/queries";
import { ADD_COLLECTED_CARD } from "../utils/mutations";
import CardList from "../components/CardList";
import Search from "../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { ADD_CARDS, ADD_ALL } from '../utils/actions';

const Collection = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const { loading, data } = useQuery(QUERY_MY_COLLECTION);

  const { cards, collectedCards } = state;
  console.log(state)

  // let collectedCards = data?.me.collectedCards || [];

  const addAll = () => {
    if (data) {
      dispatch({
        type: ADD_ALL,
        cards: cards,
        collectedCards: data.me.collectedCards,
      });
    }
  };

  useEffect(() => {
    addAll();
  }, [data]);

  const [addCollectedCard, { error }] = useMutation(ADD_COLLECTED_CARD, {
    update(cache, { data: { addCollectedCard } }) {
      try {
        //could potentially not exist yet, so wrap in a try...catch
        const { me } = cache.readQuery({ query: QUERY_MY_COLLECTION });
        cache.writeQuery({
          query: QUERY_MY_COLLECTION,
          data: {
            me: {
              ...me,
              collectedCards: [addCollectedCard, ...collectedCards],
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <main className="container">
      <div className="row justify-content-center">
        <Search
          addCollectedCard={addCollectedCard}
          collectedCards={collectedCards}
        />
        <h3 className="p-3">Cards you've collected</h3>
        <div className="col-12">
          {loading ? <div>Loading..</div> : <CardList cards={collectedCards} />}
        </div>
      </div>
    </main>
  );
};

export default Collection;
