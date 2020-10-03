import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CARDS } from '../utils/queries';

import CardList from '../components/CardList';
import CardCarousel from '../components/Carousel';
import CardToggle from '../components/CardToggle';


const Home = () => {

  const [viewSelected, setViewSelected] = useState(true);

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
        <h3 className="p-3">My cards</h3>
        <div className="col-12 p-0">
            <CardToggle
            viewSelected={viewSelected}
            setViewSelected={setViewSelected}
            />
        </div>
        <div className="col-12 mt-0 p-0 text-center" style={{ backgroundColor: "#6C757D", minHeight: "50vh" }}>
          { loading &&
          <div> Loading... </div>}
          {viewSelected ?
          (<CardList cards={ cards } />)
          :
          (<CardCarousel cards={ cards } />)
          
        }
        </div>
      </div>
    </main>
  );
};

export default Home;
