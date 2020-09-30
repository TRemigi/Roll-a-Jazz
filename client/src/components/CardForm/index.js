import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CARD } from '../../utils/mutations';
import { QUERY_CARDS, QUERY_USER } from '../../utils/queries';
import { Form, Button } from 'react-bootstrap';

const CardForm = () => {
    const [formState, setFormState] = useState({ logoUrl: '', companyName: '', tagline: '', name: '', jobTitle: '', website: '', phone: '', email: ''});
    // const [addCard, { error }] = useMutation(ADD_CARD);

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

            //update user object's cache, appending new card to the end of the array
            const { user } = cache.readQuery({ query: QUERY_USER });
            cache.writeQuery({
                query: QUERY_USER,
                data: { user: { ...user, cards: [...user.cards, addCard] } }
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

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>

            {/* <Form onSubmit={handleFormSubmit}>

                <Form.Group>
                    <Form.File id="logoUrl" type="logoUrl" name="logoUrl" value={formState.logoUrl} onChange={handleChange} label="Import Logo File" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control id="companyName" type="companyName" name="companyName" value={formState.companyName} onChange={handleChange} placeholder="Enter your company name" />
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>

                <Form.Group id="tagline">
                    <Form.Label>Tagline</Form.Label>
                    <Form.Control type="tagline" name="tagline" placeholder="Enter your company's tagline" />
                    <Form.Text className="text-muted" value={formState.tagline} onChange={handleChange}>
                    </Form.Text>
                </Form.Group>

                <Form.Group id="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="name" name="name" placeholder="Enter your full name" />
                    <Form.Text className="text-muted" value={formState.name} onChange={handleChange}>
                    </Form.Text>
                </Form.Group>

                <Form.Group id="jobTitle">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control type="jobTitle" name="jobTitle" placeholder="Enter your job title" />
                    <Form.Text className="text-muted" value={formState.jobTitle} onChange={handleChange}>
                    </Form.Text>
                </Form.Group>

                <Form.Group id="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="website" name="website" placeholder="Enter your website url" />
                    <Form.Text className="text-muted" value={formState.website} onChange={handleChange}>
                    </Form.Text>
                </Form.Group>

                <Form.Group id="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone" name="phone" placeholder="Enter phone number" />
                    <Form.Text className="text-muted" value={formState.phone} onChange={handleChange}>
                    </Form.Text>
                </Form.Group>

                <Form.Group id="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email address" />
                    <Form.Text className="text-muted" value={formState.email} onChange={handleChange}>
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form> */}

        <Form onSubmit={handleFormSubmit}>

            <Form.Group>
            <label for="logoUrl">Upload Company Logo:</label>
            <input
                type="file"
                id="logoUrl"
                name="logoUrl"
                value={formState.logoUrl}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group>
            <input
                placeholder='Your company name'
                name='companyName'
                type='companyName'
                id='companyName'
                value={formState.companyName}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group>
            <input
                placeholder="Your company's tagline"
                name='tagline'
                type='tagline'
                id='tagline'
                value={formState.tagline}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group>
            <input
                placeholder='Your full name'
                name='name'
                type='name'
                id='name'
                value={formState.name}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group>
            <input
                placeholder='Your job title'
                name='jobTitle'
                type='jobTitle'
                id='jobTitle'
                value={formState.jobTitle}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group>
            <input
                placeholder="Your company's website"
                name='website'
                type='website'
                id='website'
                value={formState.website}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group>
            <input
                placeholder="Your phone number"
                name='phone'
                type='phone'
                id='phone'
                value={formState.phone}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group>
            <input   
                placeholder="Your email address"
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
            />
           </Form.Group>

            <button type='submit'>
                Submit
            </button>

            </Form>

            {error && <div>Card creation failed</div>}
        </div>

    )
}

export default CardForm;