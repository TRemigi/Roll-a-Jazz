import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Theme";
import Toggle from "./components/Toggler";
import "./index.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Collection from "./pages/Collection";
import Create from "./pages/Create";
import SingleCard from "./pages/SingleCard";
import Contact from './pages/Contact'

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import { Provider } from 'react-redux';
import store from './utils/store';


const client = new ApolloClient({
  // retrieves token from local storage
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <ApolloProvider client={client}>
          <Router>
            <div>
              <Provider store={store}>
                <Header></Header>
                <div>
                  <Toggle theme={theme} toggleTheme={themeToggler} />

                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/collection" component={Collection} />
                    <Route
                      exact
                      path="/profile:username?"
                      component={Profile}
                    />
                    {/* <Route exact path="/single-card" component={SingleCard} /> */}
                    <Route exact path="/contact" component={Contact} />

                    <Route component={NoMatch} />
                  </Switch>
                </div>
                <Footer />
              </Provider>
            </div>
          </Router>
        </ApolloProvider>
      </>
    </ThemeProvider>
  );
}

export default App;
