import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap'
import { validateEmail } from '../../utils/helpers'
import emailjs from 'emailjs-com';

const ContactForm = () => {
    const [contactFormState, setContactFormState] =useState(
        { firstName: '', lastName: '', contactFormEmail: '', subject: '', message:'' 
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        // if (event.target.name === 'contactFormEmail') {
        //     const isValid = validateEmail(event.target.value);
        //     console.log(isValid);

        //     if (!isValid) {
        //         setErrorMessage('Your email is invalid');
        //     } else {
        //         setErrorMessage('');
        //     }
        // } else {
        //     if (!event.target.value.length) {
        //         setErrorMessage(`${event.target.name} is required.`);
        //     } else {
        //         setErrorMessage('');
        //     }
        // }
    
        // if (!errorMessage) {
            setContactFormState({
                ...contactFormState,
                [event.target.name]: event.target.value,
            });
        // }
    }

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(contactFormState)
    
        // these values are hardcoded and need to be changed eventually.

        emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAIL_USER_ID)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        setContactFormState({
            firstName: '',
            lastName: '',
            contactFormEmail: '',
            subject: '',
            message: ''
        })
    }
    return(
        <Form id="contact-form" onSubmit={sendEmail}>
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
                <Form.Label>Subject</Form.Label>
                <Form.Control 
                    placeholder="Enter a subject line" 
                    name="subject" 
                    id="subject" 
                    value={contactFormState.subject}
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
        {/* {errorMessage && (
            <div>
                <p className="error-text">{errorMessage}</p>
            </div>
        )} */}
        <Button variant="primary" type="submit" className="p-2">
          Submit
        </Button>
      </Form>   
    )
}

export default ContactForm