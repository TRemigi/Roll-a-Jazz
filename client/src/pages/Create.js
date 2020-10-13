import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import CardForm from '../components/CardForm';

const Create = () => {

    return (
        <main className="container">
            <div className="row justify-content-center">
                <h3 className="p-3 mt-sm-2 mt-5 page-header">Create a Business Card</h3>

                <div className="col-12">
                    <CardForm />
                </div>
            </div>
        </main>
    )
};

export default Create;