import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import CardForm from '../components/CardForm';

const Create = () => {

    return (
        <main className="container">
            <div className="row justify-content-center">
                <h3 className="p-3">Create a card</h3>
                <div className="col-12">
                    <CardForm />
                </div>
            </div>
        </main>
    )
};

export default Create;