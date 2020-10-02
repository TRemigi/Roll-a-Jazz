import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CARD } from '../../utils/mutations';
import { QUERY_CARDS, QUERY_ME } from '../../utils/queries';
import { Form, Button, Col, Row } from 'react-bootstrap';

const CardForm = () => {
    const [formState, setFormState] = useState({ logoUrl: '', companyName: '', tagline: '', name: '', jobTitle: '', website: '', phone: '', email: ''});

    const [addCard, { error }] = useMutation(ADD_CARD, {
        update(cache, { data: { addCard } }) {
            try {
                //could potentially not exist yet, so warap in a try...catch
                const { cards } = cache.readQuery({ query: QUERY_CARDS });
                cache.writeQuery({
                    query: QUERY_CARDS,
                    data: { cards: [addCard, ...cards] }
                })
            } catch (e) {
                console.error(e);
            }

            //update me object's cache, appending new card to the end of the array
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, cards: [...me.cards, addCard] } }
            });
        }
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    //handler for the card form
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            //add card to database
            await addCard({
                variables: { ...formState }
            });

            // clear form value
            setFormState('');

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='form-css'>

        <Form className="border p-4 m-5" onSubmit={handleFormSubmit}>

            <h3 className="pb-4">Create a Business Card!</h3>

            <Form.Group as={Row}>
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
            </Form.Group>

            <Form.Group as={Row}>
            <Form.Label column sm="2">Company Name:</Form.Label>
                <Col sm="10">
                    <Form.Control
                        name='companyName'
                        type='companyName'
                        id='companyName'
                        value={formState.companyName}
                        onChange={handleChange}
                    ></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
            <Form.Label column sm="2">Company's Tagline:</Form.Label>
                <Col sm="10">
                    <Form.Control
                        name='tagline'
                        type='tagline'
                        id='tagline'
                        value={formState.tagline}
                        onChange={handleChange}
                    ></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
            <Form.Label column sm="2">Full Name:</Form.Label>
                <Col sm="10">
                    <Form.Control
                        name='name'
                        type='name'
                        id='name'
                        value={formState.name}
                        onChange={handleChange}
                    ></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
            <Form.Label column sm="2">Job Title:</Form.Label>
                <Col sm="10">
                    <Form.Control
                        name='jobTitle'
                        type='jobTitle'
                        id='jobTitle'
                        value={formState.jobTitle}
                        onChange={handleChange}
                    ></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
            <Form.Label column sm="2">Company Website:</Form.Label>
                <Col sm="10">
                    <Form.Control
                        name='website'
                        type='website'
                        id='website'
                        value={formState.website}
                        onChange={handleChange}
                    ></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
            <Form.Label column sm="2">Phone Number:</Form.Label>
                <Col sm="10">
                    <Form.Control
                        name='phone'
                        type='phone'
                        id='phone'
                        value={formState.phone}
                        onChange={handleChange}
                    ></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
            <Form.Label column sm="2">Email Address:</Form.Label>
                <Col sm="10">
                    <Form.Control
                        name='email'
                        type='email'
                        id='email'
                        value={formState.email}
                        onChange={handleChange}
                    ></Form.Control>
                </Col>
           </Form.Group>

            <Button type='submit'>
                Submit
            </Button>

            </Form>

            {error && <div>Card creation failed</div>}
        </div>

    )
}

export default CardForm;