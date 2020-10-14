import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    // <nav>
    //   {Auth.loggedIn() ? (
    //     <>
    //       <Link to='/profile'>Profile</Link>
    //         <a href='/' onClick={logout}>
    //           Logout
    //         </a>
    //     </>
    //   ) : (
    //     <>
    //       <Link to='/login'>Login</Link>
    //       <Link to='/signup'>Signup</Link>
    //       </>
    //   )}
    // </nav>
    <Navbar collapseOnSelect expand="lg" className="navbar-css">
      <Navbar.Brand className="title" as={Link} to="/">
        Rolo<span>Deck</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Link className="nav" as={Link} to="/">
            {Auth.loggedIn() ? "My cards" : "Home"}
          </Nav.Link>

          {Auth.loggedIn() ? (
            <>
              <Nav.Link className="nav" as={Link} to="/create">
                Create
              </Nav.Link>
              <Nav.Link className="nav" as={Link} to="/collection">
                Collection
              </Nav.Link>
              <Nav.Link className="nav" as={Link} to="/" onClick={logout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link className="nav" as={Link} to="/signup">
                Sign up
              </Nav.Link>
              <Nav.Link className="nav" as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
