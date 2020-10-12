import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_MY_COLLECTION } from "../utils/queries";
import { ADD_COLLECTED_CARD } from "../utils/mutations";
import CardList from "../components/CardList";
import Search from "../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { ADD_CARDS, ADD_ALL } from "../utils/actions";


const Collection = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { loading, data } = useQuery(QUERY_MY_COLLECTION);

  const { cards } = state;

  let collectedCards = data?.me.collectedCards || [];

  console.log(state);

  useEffect(() => {
    const addCards = () => {
      if (data) {
        dispatch({
          type: ADD_CARDS,
          collectedCards: data.me.collectedCards,
        });
      }
    };
    addCards();
  }, [data]);

  const [addCollectedCard] = useMutation(ADD_COLLECTED_CARD, {
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
          collectedCards={collectedCards || []}
        />
        <div className='container p-0'>
          <h3 className='text-center'>Cards you've collected</h3>
          <div>
            <div className="col-12 text-center list-container">
              {loading ? <div>Loading..</div> : <CardList cards={collectedCards} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Collection;
