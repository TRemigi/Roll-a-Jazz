import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap'

const ContactForm = () => {
    const [contactFormState, setContactFormState] =useState(
        { firstName: '', lastName: '', contactFormEmail: '', message:'' 
    });

    return(
        <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
                placeholder="First Name" 
                name="firstName" 
                id="firstName" 
                value={contactFormState.firstName}
            />
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
                placeholder="Last Name" 
                name="lastName" 
                id="lastName" 
                value={contactFormState.lastName}
            />
          </Form.Group>
        </Form.Row>
        
        <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    name="contactFormEmail" 
                    id="contactFormEmail" 
                    value={contactFormState.contactFormEmail}
                />
            </Form.Group>
        </Form.Row>
      
        <Form.Row>
            <Form.Group as={Col} controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows="4" 
                    name="message" 
                    id="message"
                    value={contactFormState.message}
                />
            </Form.Group>
        </Form.Row>
      
        <Button variant="primary" type="submit" className="p-2">
          Submit
        </Button>
      </Form>   
    )
}

export default ContactForm