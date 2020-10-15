import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";

const Home = () => {

    // redirect to my cards page if username is the logged-in user's
    if (Auth.loggedIn()) {
        return <Redirect to="/cards" />;
    }

    return (
        <div className="text-center m-4">
            <h1 className="home-title">
                Welcome to Rolo<span>Deck</span> !
        </h1>
            <h4>Join a community of business professionals.</h4>
            <p>Login in or sign-up to get started!</p>
            <Button className="start-btn" as={Link} to="/login">
                Get Started
        </Button>
        </div>
    )
};

export default Home;