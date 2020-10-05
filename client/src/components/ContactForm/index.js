import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap'

const ContactForm = () => {
    const [contactFormState, setContactFormState] =useState(
        { firstName: '', lastName: '', contactFormEmail: '', message:'' 
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setContactFormState({
          ...contactFormState,
          [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(contactFormState)

        // This is where we would hook it up to email I'm guessing.
    }
    return(
        <Form id="contact-form" onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control 
                placeholder="First Name" 
                name="firstName" 
                id="firstName" 
                value={contactFormState.firstName}
                onChange={handleChange}
            />
          </Form.Group>
      
          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
                placeholder="Last Name" 
                name="lastName" 
                id="lastName" 
                value={contactFormState.lastName}
                onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        
        <Form.Row>
            <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    name="contactFormEmail" 
                    id="contactFormEmail" 
                    value={contactFormState.contactFormEmail}
                    onChange={handleChange}
                />
            </Form.Group>
        </Form.Row>
      
        <Form.Row>
            <Form.Group as={Col}>
                <Form.Label>Message</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows="4" 
                    name="message" 
                    id="message"
                    value={contactFormState.message}
                    onChange={handleChange}
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