import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import CardForm from "../components/CardForm";

const Create = () => {
  return (
    <main className="container">
      <div className=" row justify-content-center p-3">
        <h2>Create a business card</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <CardForm />
        </div>
      </div>
    </main>
  );
};

export default Create;
