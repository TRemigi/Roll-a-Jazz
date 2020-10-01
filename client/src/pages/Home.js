import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useQuery } from '@apollo/react-hooks';

const Home = () => {

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h3>My cards</h3>
        </div>
        <div className="col-12">
          <div>cards will be displayed here</div>
        </div>
      </div>
    </main>
  );
};

export default Home;
