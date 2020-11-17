import React, { useState, lazy, Suspense } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_CARD } from "../../utils/mutations";
import { QUERY_CARDS, QUERY_ME } from "../../utils/queries";
import { Form, Button, Col, Row } from "react-bootstrap";
// import SuccessModal from "../SuccessModal";
// i'll need to import validatePhone as well.
import { validateEmail, validatePhone } from "../../utils/helpers";
import NumberFormat from "react-number-format";

const CardForm = () => {
  const SuccessModal = lazy(() => import("../SuccessModal"));
  const renderLoader = () => <p>Loading...</p>;

  const [formState, setFormState] = useState({
    // logoUrl: "",
    companyName: "",
    tagline: "",
    name: "",
    jobTitle: "",
    website: "",
    phone: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [addCard, { error }] = useMutation(ADD_CARD, {
    update(cache, { data: { addCard } }) {
      try {
        //could potentially not exist yet, so warap in a try...catch
        const { cards } = cache.readQuery({ query: QUERY_CARDS });
        cache.writeQuery({
          query: QUERY_CARDS,
          data: { cards: [addCard, ...cards] },
        });
      } catch (e) {
        console.error(e);
      }

      //update me object's cache, appending new card to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, cards: [...me.cards, addCard] } },
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
      //validate required fields
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
      await addCard({
        variables: { ...formState },
      });

      // clear form value
      setFormState({
        // logoUrl: "",
        companyName: "",
        tagline: "",
        name: "",
        jobTitle: "",
        website: "",
        phone: "",
        email: "",
      });

      // display SuccessModal
      setShow(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Suspense fallback={renderLoader()}>
        <SuccessModal
          show={show}
          setShow={setShow}
          message="Card successfully created!"
        />
      </Suspense>
      <Form className=" p-4 m-lg-5 mr-2" onSubmit={handleFormSubmit}>
        <h3 className="pb-4">Fill out the form below</h3>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Company Name:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Example Co"
              name="companyName"
              type="companyName"
              id="companyName"
              value={formState.companyName}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Company's Tagline:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="We're here for you"
              name="tagline"
              type="tagline"
              id="tagline"
              value={formState.tagline}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Full Name:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              placeholder="Riley Green"
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
          <Form.Label column sm="2">
            Job Title:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              placeholder="Sales Lead"
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
          <Form.Label column sm="2">
            Company Website:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="www.example.com"
              name="website"
              type="website"
              id="website"
              value={formState.website}
              onChange={handleChange}
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Phone Number:
          </Form.Label>
          <Col sm="10">
            <NumberFormat
              required
              placeholder="123-456-7890"
              format="###-###-####"
              name="phone"
              type="phone"
              id="phone"
              value={formState.phone}
              onChange={handleChange}
              className="col-12 form-control"
            ></NumberFormat>
            <Form.Text id="phoneHelpBlock" muted>
              Required
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Email Address:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              placeholder="rgreen@example.com"
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
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <Button type="submit" className="btn-border">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CardForm;
