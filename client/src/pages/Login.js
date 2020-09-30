import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Container, Row, Col} from 'react-bootstrap'

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });

      Auth.login(data.login.token)
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="container">
      <Container>
        <Row>
          <Col>
          {/* <div className="row">
          <div>
            <h4>Login</h4>
            <div>
              <form onSubmit={handleFormSubmit}>
                <input
                  placeholder='Your email'
                  name='email'
                  type='email'
                  id='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  placeholder='******'
                  name='password'
                  type='password'
                  id='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <button type='submit'>
                  Submit
                </button>
              </form>
              {error && <div>Login failed</div>}
            </div>
          </div>
        </div> */}
        <h4>Login</h4>
        <Form border='primary' onSubmit={handleFormSubmit}>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name= "email" 
            type="email" 
            placeholder="Enter email" 
            value={formState.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            name="password"
            type="password" 
            placeholder="Password"
            id='password'
            value={formState.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {error && <div>Login failed</div>}


          </Col>
          <Col>
            {/* <div className= "row">
          <div>
            <h4>Sign Up</h4>
            <div>
              <form onSubmit={handleFormSubmit}>
                <input
                  placeholder='Your username'
                  name='username'
                  type='username'
                  id='username'
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  placeholder='Your email'
                  name='email'
                  type='email'
                  id='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  placeholder='******'
                  name='password'
                  type='password'
                  id='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <button type='submit'>
                  Submit
                </button>
              </form>
              {error && <div>Sign up failed</div>}
            </div>
          </div>
        </div> */}

          <h4>Sign Up</h4>
          <Form onSubmit={handleFormSubmit}>

          <Form.Group controlId="formSignupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name= "username" 
              type="username" 
              placeholder="Enter username" 
              value={formState.username}
              onChange={handleChange}
            />
          </Form.Group>

            <Form.Group controlId="formSignupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name= "email" 
              type="email" 
              placeholder="Enter email" 
              value={formState.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSignupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              name="password"
              type="password" 
              placeholder="Password"
              id='password'
              value={formState.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {error && <div>Login failed</div>}
          </Col>
        </Row>
      </Container>   
    </main>
  );
};

export default Login;
