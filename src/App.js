import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import 'bootstrap/dist/css/bootstrap.min.css';


const URL = "https://public-api.blablacar.com/api/v3/trips?key=YzbiA8L6DcqxTvSna1lOFQQU66FosDVs&from_coordinate=48.8566%2C2.3522&to_coordinate=45.764043%2C4.835659&from_country=FR&to_country=FR&locale=fr-FR&start_date_local=2021-10-10T00:00:00&currency=EUR&count=100";

function App() {


  const [trips, setTrips] = useState([])
  const [currentTrips, setCurrentTrips] = useState([])
  const [pageCount, setPagecount] = useState(0)

  useEffect(()=> {
    console.log('useeffect')
    axios.get(URL).then(response => {
      console.log('response' + JSON.stringify(response.data))
      const trips = response.data.trips;
      const tripsWithIndex = trips.map((trip, index) => ({ ...trip, index:  index +1 }));
      setTrips(tripsWithIndex);
      setCurrentTrips(tripsWithIndex.slice(0, 5))
      setPagecount(Math.ceil(trips.length / 5))
      console.log('pageCount' + pageCount)
    })
    .catch((error) => {
      alert('error')
    })

  }, [])


  const handlePageClick = (props) => {
    console.log('selected page' + props.selected)
    setCurrentTrips(trips.slice(props.selected *5, ( 5*props.selected) + 5 ))
  }

console.log('trips: ' + JSON.stringify(trips))
  return (
    <div className="App">
      <table border="1"><tr style={{fontWeight: 'bold'}}><td>Num</td><td>From</td><td>To</td><td>Price</td></tr>
      {currentTrips.map((trip) => (
        <tr>
          <td>{trip.index}</td>
          <td>{trip.waypoints[0].place.city}</td>
          <td>{trip.waypoints[1].place.city}</td>
          <td>{`${trip.price.amount} ${trip.price.currency}` }</td>

          </tr>
        ))}
      </table>
      <div id="react-paginate">
      <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          breakClassName={'page-item'}
 breakLinkClassName={'page-link'}
 containerClassName={'pagination'}
 pageClassName={'page-item'}
 pageLinkClassName={'page-link'}
 previousClassName={'page-item'}
 previousLinkClassName={'page-link'}
 nextClassName={'page-item'}
 nextLinkClassName={'page-link'}
 activeClassName={'active'}
        />
        </div>
<div>
DEBUG
<table border="1"><tr style={{fontWeight: 'bold'}}><td>Num</td><td>From</td><td>To</td><td>Price</td></tr>
      {trips.map((trip, index) => (
        <tr>
          <td>{index+1}</td>
          <td>{trip.waypoints[0].place.city}</td>
          <td>{trip.waypoints[1].place.city}</td>
          <td>{`${trip.price.amount} ${trip.price.currency}` }</td>

          </tr>
        ))}
      </table>
</div>



    </div>
  );
}

export default App;
