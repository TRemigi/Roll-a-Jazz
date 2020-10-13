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
    <Navbar className="navbar-css" expand="lg">
      <Navbar.Brand className="title" href="/">
        Rolo<span>Jazz</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Link className="nav" as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link className="nav" as={Link} to="/create">
            Create
          </Nav.Link>
          <Nav.Link className="nav" as={Link} to="/collection">
            Collection
          </Nav.Link>
          {Auth.loggedIn() ? (
            <>
              <Nav.Link className="nav" as={Link} to="/" onClick={logout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
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
