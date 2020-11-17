import React, { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.css";
// import ContactForm from '../components/ContactForm';

const Contact = () => {
  const ContactForm = lazy(() => import("../components/ContactForm"));
  const renderLoader = () => <p>Loading...</p>;

  return (
    <main className="container">
      <div className="justify-content-center">
        <div className="row justify-content-center">
          <h3 className="p-3 mt-sm-2 mt-5 page-header">Contact Us</h3>
        </div>

        <div className="row justify-content-center">
          <p className="text-center m-4">
            Fill out the form below to contact us. We'd love to hear your
            questions, feedback, and ideas. After submiting this form, we will
            contact you as soon as possible.{" "}
          </p>
        </div>
        <div className="col-12">
          <Suspense fallback={renderLoader()}>
            <ContactForm></ContactForm>
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Contact;
