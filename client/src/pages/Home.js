import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useQuery } from '@apollo/react-hooks';
import CardCarousel from '../components/Carousel';
import { QUERY_CARDS } from '../utils/queries';


const Home = () => {

  const testCards = [
    'card1',
    'card2',
    'card2'
  ];

const { loading, data } = useQuery(QUERY_CARDS);
  const cards = data?.cards || [];

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h3>My cards</h3>
        </div>
        <div className="col-12 p-5 m-3 text-center" style={{ backgroundColor: "grey", minHeight: "50vh" }}>
          { loading &&
          <div> Loading... </div>}
          <CardCarousel cards={ testCards } />
        </div>
      </div>
    </main>
  );
};

export default Home;
