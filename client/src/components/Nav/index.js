import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { Nav } from 'react-bootstrap';

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
        <Nav>
            {/* This might need to behave like a 'prolie' page. Letting a user only
            have access to this info if they are logged in */}
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/create">Create</Nav.Link>
            </Nav.Item>
            {/* This may need to be the '/' so that it is the first thing that
            non-logged in users see */}
            <Nav.Item>
                <Nav.Link href="/collection">Collection</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav.Item>
            {Auth.loggedIn () ? (
                <>
                    <Nav.Item>
                        <Nav.Link href='/profile'>Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item href='/' onClick={logout}>
                        <Nav.Link>Logout</Nav.Link>
                    </Nav.Item>
                </>
            ) : (
                <>
                    <Nav.Item>
                        <Nav.Link href='/login'>Login</Nav.Link>
                    </Nav.Item>
                </>
            )}
            

        </Nav>
    );
};

export default Navigation