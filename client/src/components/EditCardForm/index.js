import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_CARD } from "../../utils/mutations";
import { QUERY_CARDS, QUERY_ME } from "../../utils/queries";
import { Form, Button, Col, Row } from "react-bootstrap";
import SuccessModal from "../SuccessModal";
import { validatePhone, validateEmail } from "../../utils/helpers";

const EditCardForm = ({ card, setIsEdit }) => {
  const { _id } = card;

  const [formState, setFormState] = useState({
    companyName: card.companyName,
    tagline: card.tagline,
    name: card.name,
    jobTitle: card.jobTitle,
    website: card.website,
    phone: card.phone,
    email: card.email,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [updateCard, { error }] = useMutation(UPDATE_CARD, {
    update(cache, { data: { updateCard } }) {
      try {
        //could potentially not exist yet, so wrap in a try...catch
        const { cards } = cache.readQuery({ query: QUERY_CARDS });
        cache.writeQuery({
          query: QUERY_CARDS,
          data: { cards: [updateCard, ...cards] },
        });
      } catch (e) {
        console.error(e);
      }

      //update me object's cache, appending new card to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, cards: [...me.cards] } },
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // use State to handle SuccessModal
  // set initial show state to false
  const [show, setShow] = useState(false);

  const isValidPhoneInput = (text) => {
    const isValid = validatePhone(text);
    return isValid;
  };

  const isValidEmailInput = (text) => {
    const isValid = validateEmail(text);
    return isValid;
  };

  //handler for the card form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const isValidPhone = isValidPhoneInput(formState.phone);
    const isValidEmail = isValidEmailInput(formState.email);
    const hasName = formState.name;
    const hasTitle = formState.jobTitle;

    try {
      // validate required fields
      if (!isValidEmail) {
        setErrorMessage("Please enter a valid email address.");
        return;
      } else if (!isValidPhone) {
        setErrorMessage("Please enter a valid phone number.");
        return;
      } else if (hasName.length < 3) {
        setErrorMessage("Please enter a full name.");
        return;
      } else if (hasTitle.length < 3) {
        setErrorMessage("Please enter a job title.");
        return;
      } else {
        setErrorMessage("");
      }
      //add card to database
      await updateCard({
        variables: { _id: _id, input: { ...formState } },
      });

      // display SuccessModal
      setShow(true);

      setTimeout(
        function () {
          setIsEdit(false);
        }.bind(this),
        3000
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <SuccessModal
        show={show}
        setShow={setShow}
        message="Card successfully edited!"
      />

      <Form className="border p-4 m-5" onSubmit={handleFormSubmit}>
        <h3 className="pb-4">Edit your card</h3>

        {/* <Form.Group as={Row}>
                <Form.Label column sm="2">Upload Company Logo:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="file"
                            id="logoUrl"
                            name="logoUrl"
                            value={formState.logoUrl}
                            onChange={handleChange}
                        ></Form.Control>
                    </Col>
                </Form.Group> */}

        <Form.Group as={Row}>
          <Form.Label column sm="12">
            Company Name:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              name="companyName"
              type="companyName"
              id="companyName"
              value={formState.companyName}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="12">
            Company's Tagline:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              name="tagline"
              type="tagline"
              id="tagline"
              value={formState.tagline}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="12">
            Full Name:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              required
              name="name"
              type="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
            ></Form.Control>
            <Form.Text id="nameHelpBlock" muted>
              Required
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="12">
            Job Title:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              required
              name="jobTitle"
              type="jobTitle"
              id="jobTitle"
              value={formState.jobTitle}
              onChange={handleChange}
            ></Form.Control>
            <Form.Text id="jobTitleHelpBlock" muted>
              Required
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="12">
            Company Website:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              name="website"
              type="website"
              id="website"
              value={formState.website}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="12">
            Phone Number:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              required
              name="phone"
              type="phone"
              id="phone"
              value={formState.phone}
              onChange={handleChange}
            ></Form.Control>
            <Form.Text id="nameHelpBlock" muted>
              Required
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="12">
            Email Address:
          </Form.Label>
          <Col sm="12">
            <Form.Control
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            ></Form.Control>
            <Form.Text id="emailHelpBlock" muted>
              Required
            </Form.Text>
          </Col>
        </Form.Group>

        <Button type="submit" className="btn-border">
          Submit
        </Button>
      </Form>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default EditCardForm;
