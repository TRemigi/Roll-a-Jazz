import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
      }
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
        <Navbar bg="success" expand="lg">
            <Navbar.Brand href="/">Roll-a-jazz</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto" className="justify-content-end">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/create">Create</Nav.Link>
                    <Nav.Link href="/collection">Collection</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    {Auth.loggedIn () ? (
                        <>  
                            <Nav.Link href='/' onClick={logout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href='/login'>Login</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation