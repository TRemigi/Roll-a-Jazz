import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Theme";
import Toggle from "./components/Toggler";
import "./index.css";
import Auth from "./utils/auth";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";

// import Login from "./pages/Login";
// import NoMatch from "./pages/NoMatch";
// import Signup from "./pages/Signup";
// import Collection from "./pages/Collection";
// import Create from "./pages/Create";
// import Contact from "./pages/Contact";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Cards from "./pages/Cards";
// import Home from "./pages/Home";

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
  // import Login from "./pages/Login";
  const Login = lazy(() => import("./pages/Login"));
  // import NoMatch from "./pages/NoMatch";
  const NoMatch = lazy(() => import("./pages/NoMatch"));
  // import Signup from "./pages/Signup";
  const Signup = lazy(() => import("./pages/Signup"));
  // import Collection from "./pages/Collection";
  const Collection = lazy(() => import("./pages/Collection"));
  // import Create from "./pages/Create";
  const Create = lazy(() => import("./pages/Create"));
  // import Contact from "./pages/Contact";
  const Contact = lazy(() => import("./pages/Contact"));
  // import Cards from "./pages/Cards";
  const Cards = lazy(() => import("./pages/Cards"));
  // import Home from "./pages/Home";
  const Home = lazy(() => import("./pages/Home"));
  // import Header from "./components/Header";
  const Header = lazy(() => import("./components/Header"));
  // import Footer from "./components/Footer";
  const Footer = lazy(() => import("./components/Footer"));

  const renderLoader = () => <p>Loading...</p>;

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
                <Suspense fallback={renderLoader()}>
                  <Header></Header>
                  <div>
                    <Toggle theme={theme} toggleTheme={themeToggler} />

                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />
                      <Route exact path="/contact" component={Contact} />

                      {Auth.loggedIn() ? (
                        <Route exact path="/cards" component={Cards} />
                      ) : (
                        <Redirect to={{ pathname: "/login" }} />
                      )}
                      {Auth.loggedIn() ? (
                        <Route exact path="/create" component={Create} />
                      ) : (
                        <Redirect to={{ pathname: "/login" }} />
                      )}
                      {Auth.loggedIn() ? (
                        <Route
                          exact
                          path="/collection"
                          component={Collection}
                        />
                      ) : (
                        <Redirect to={{ pathname: "/login" }} />
                      )}
                      {Auth.loggedIn() && <Route component={NoMatch} />}
                    </Switch>
                  </div>
                  <Footer />
                </Suspense>
              </Provider>
            </div>
          </Router>
        </ApolloProvider>
      </>
    </ThemeProvider>
  );
}

export default App;
