import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { validateEmail } from "../../utils/helpers";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [contactFormState, setContactFormState] = useState({
    firstName: "",
    lastName: "",
    contactFormEmail: "",
    subject: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "contactFormEmail") {
      const isValid = validateEmail(value);
      console.log(isValid);

      if (!isValid) {
        setErrorMessage("Your email is invalid");
      } else {
        setErrorMessage("");
      }
    } else {
      if (!value.length) {
        setErrorMessage(`${name} is required.`);
      } else {
        setErrorMessage("");
      }
    }

    setContactFormState({
      ...contactFormState,
      [name]: value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (Object.values(contactFormState).filter((v) => v).length < 5) {
      setErrorMessage("You must enter a valid response for all fields");
      return;
    }

    console.log(contactFormState);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAIL_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setContactFormState({
      firstName: "",
      lastName: "",
      contactFormEmail: "",
      subject: "",
      message: "",
    });
  };
  return (
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
          <Form.Text id="firstNameHelpBlock" muted>
            Required
          </Form.Text>
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
          <Form.Text id="lastNameHelpBlock" muted>
            Required
          </Form.Text>
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
          <Form.Text id="emailHelpBlock" muted>
            Required
          </Form.Text>
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
          <Form.Text id="subjectHelpBlock" muted>
            Required
          </Form.Text>
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
          <Form.Text id="messageHelpBlock" muted>
            Required
          </Form.Text>
        </Form.Group>
      </Form.Row>
      {errorMessage && (
        <div>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}
      <Button variant="primary" type="submit" className="p-2 btn-border">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
