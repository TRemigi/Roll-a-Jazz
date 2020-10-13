import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ContactForm from '../components/ContactForm';

const Contact = () => {

    return (
        <main className="container">
            <div className="justify-content-center">
                <div className="row justify-content-center">
                    <h3 className="p-3 mt-sm-2 mt-5 page-header">Contact Us</h3>
                </div>
                
                <div className="row justify-content-center">
                    <p className="text-center m-4">Fill out the form below to contact us. We'd love to hear your questions, feedback, and ideas. After submiting this form, we will contact you as soon as possible.  </p>
                </div>
                <div className="col-12">
                    <ContactForm></ContactForm>
                </div>
            </div>
        </main>
    )
};

export default Contact;