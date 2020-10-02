import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Navigation from '../Nav';
import { Container } from 'react-bootstrap';

const Header = () => {

  // const logout = event => {
  //   event.preventDefault();
  //   Auth.logout();
  // }

  return (
    <Container className="space-between">
      <header >
      <div>
        <Link to= '/'>
          <h1>Roll-a-jazz</h1>
        </Link>
        
        <Navigation />
        {/* <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to='/profile'>Profile</Link>
                <a href='/' onClick={logout}>
                  Logout
                </a>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
              </>
          )}
        </nav> */}
      </div>
    </header>
    </Container>
    
  );
};

export default Header;
