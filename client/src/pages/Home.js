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

const Home = () => {
  const [viewSelected, setViewSelected] = useState(true);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { username: userParam } = useParams();

  let { cards } = state;

  let { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
    pollInterval: 500,
  });
  console.log("state:");
  console.log(state);
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

  if (userParam) {
    // redirect to personal profile page if username is the logged-in user's
    if (
      Auth.loggedIn() &&
      Auth.getProfile().data.username.toLowerCase() === userParam.toLowerCase()
    ) {
      return <Redirect to="/home" />;
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div className="text-center m-4">
        <h1 className="home-title">
          Welcome to Rolo<span>Jazz</span> !
        </h1>
        <h4>Join a community of business professionals.</h4>
        <p>Login in or sign-up to get started!</p>
        <Button className="start-btn" as={Link} to="/login">
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <main className="container">
      <div className="row justify-content-center mr-0">
        <h3 className="p-3">My cards</h3>
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

export default Home;
