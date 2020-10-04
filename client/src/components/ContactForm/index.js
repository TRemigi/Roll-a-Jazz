import React from 'react';
import { Form, Button, Col } from 'react-bootstrap'

const ContactForm = () => {
    return(
        <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="First Name" />
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Last Name" />
          </Form.Group>
        </Form.Row>
        
        <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
        </Form.Row>
      
        <Form.Row>
            <Form.Group as={Col} controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows="4" />
            </Form.Group>
        </Form.Row>
      
        <Button variant="primary" type="submit" className="p-2">
          Submit
        </Button>
      </Form>   
    )
}

export default ContactForm