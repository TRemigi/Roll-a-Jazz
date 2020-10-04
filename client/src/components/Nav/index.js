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
        <Navbar className='navbar-css' expand="lg" >
            <Navbar.Brand className='title' href="/">Rolo<span>Jazz</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto" className='justify-content-end'>
                    <Nav.Link className='nav' href="/">Home</Nav.Link>
                    <Nav.Link className='nav' href="/create">Create</Nav.Link>
                    <Nav.Link className='nav' href="/collection">Collection</Nav.Link>
                    <Nav.Link className='nav' href="/contact">Contact</Nav.Link>
                    {Auth.loggedIn () ? (
                        <>  
                            <Nav.Link className='nav' href='/' onClick={logout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link className='nav' href='/login'>Login</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation