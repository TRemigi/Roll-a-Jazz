import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_CARDS, ADD_ALL } from "../utils/actions";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

import CardList from "../components/CardList";
import CardCarousel from "../components/Carousel";
import CardToggle from "../components/CardToggle";

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

  useEffect(() => {
    addAll();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container">
      <div className="justify-content-center mr-0">
        <div className="row justify-content-center">
          <h3 className="p-3 mt-sm-2 mt-5 page-header">
            {user.username}'s cards {/*My created cards*/}
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
          {loading && <div> Loading... </div>}
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
