import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_ALL } from "../utils/actions";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import CardList from "../components/CardList";
import CardCarousel from "../components/Carousel";
import CardToggle from "../components/CardToggle";
import { idbPromise } from "../utils/helpers";

const Cards = () => {
  const [viewSelected, setViewSelected] = useState(true);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { username: userParam } = useParams();

  let { cards } = state;

  let { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
    pollInterval: 5000,
  });

  let user = data?.me || data?.user || {};

  const addAll = () => {
    dispatch({
      type: ADD_ALL,
      cards: user.cards,
      collectedCards: user.collectedCards,
    });
  };

  // set up idbUser object
  let idbUser = { username: "", cards: [], collectedCards: [] };

  useEffect(() => {
    addAll();
    if (user.cards) {
      // add username to idb object store
      idbPromise("username", "put", user.username);
      // add user's cards to idb object store
      user.cards.forEach((card) => {
        idbPromise("cards", "put", card);
      });
    }
    if (user.collectedCards) {
      // add user's collected cards to idb object store
      user.collectedCards.forEach((collectedCard) => {
        idbPromise("collectedCards", "put", collectedCard);
      });
    } else if (!loading) {
      // get cache from idb
      idbPromise("cards", "get").then((indexedCards) => {
        idbUser.cards = indexedCards;
      });
      idbPromise("collectedCards", "get").then((indexedCollectedCards) => {
        idbUser.collectedCards = indexedCollectedCards;
      });
      idbPromise("username", "get").then((indexedUsername) => {
        idbUser.username = indexedUsername;
      });

      // send indexedDB user data to global state
      dispatch({
        type: ADD_ALL,
        cards: idbUser.cards,
        collectedCards: idbUser.collectedCards,
      });
    }
  }, [user]);

  return (
    <main className="container">
      <div className="justify-content-center mr-0">
        <div className="row justify-content-center">
          <h3 className="p-3 mt-sm-2 mt-5 page-header">
            {user.username ? (
              <>{user.username}'s Cards</>
            ) : (
              <> {idbUser.username}'s Cards</>
            )}
          </h3>
        </div>

        <div className="row justify-content-center">
          <p>Tap card to view. Tap again to edit.</p>
        </div>

        <div className="col-12 p-0">
          <CardToggle
            viewSelected={viewSelected}
            setViewSelected={setViewSelected}
          />
        </div>
        <div className="col-12 mt-0 p-0 text-center">
          {loading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {viewSelected ? (
            <CardList cards={cards || []} />
          ) : (
            <CardCarousel cards={cards || []} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Cards;
