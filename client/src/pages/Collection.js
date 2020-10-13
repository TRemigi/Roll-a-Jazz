import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_MY_COLLECTION } from "../utils/queries";
import { ADD_COLLECTED_CARD } from "../utils/mutations";
import CardList from "../components/CardList";
import Search from "../components/Search";
import { useDispatch } from "react-redux";
import { ADD_CARDS } from "../utils/actions";

// Page where the user can look at all cards in their collection
const Collection = () => {
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_MY_COLLECTION);
  let collectedCards = data?.me.collectedCards || [];

  // if data is queried add it to redux state as well
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

  // mutate card that will also update the DOM and cache
  const [addCollectedCard] = useMutation(ADD_COLLECTED_CARD, {
    update(cache, { data: { addCollectedCard } }) {
      try {
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
        <h3 className="p-3">Cards you've collected</h3>
        <div className="col-12">
          {loading ? <div>Loading..</div> : <CardList cards={collectedCards} />}
        </div>
      </div>
    </main>
  );
};

export default Collection;
