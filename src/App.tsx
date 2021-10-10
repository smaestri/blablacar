import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trip } from './Trip';

const URL : string = "https://public-api.blablacar.com/api/v3/trips?key=YzbiA8L6DcqxTvSna1lOFQQU66FosDVs&from_coordinate=48.8566%2C2.3522&to_coordinate=45.764043%2C4.835659&from_country=FR&to_country=FR&locale=fr-FR&start_date_local=2021-10-10T00:00:00&currency=EUR&count=100";
const ITEMS_PER_PAGE : number = 5;

function App() {

  const [trips, setTrips] = useState<Array<Trip>>([])
  const [currentTrips, setCurrentTrips] = useState<Array<Trip>>([])
  const [pageCount, setPagecount] = useState<number>(0)

  useEffect(() => {
    axios.get(URL).then((response:any) => {
      const trips: Array<Trip> = response.data.trips;
      const tripsWithIndex : Array<Trip> = trips.map((trip, index) => ({ ...trip, id: index + 1 }));
      setTrips(tripsWithIndex);
      setCurrentTrips(tripsWithIndex.slice(0, ITEMS_PER_PAGE))
      setPagecount(Math.ceil(trips.length / ITEMS_PER_PAGE))
    })
      .catch((error) => {
        console.log('An error occured + ')
      })

  }, [])


  const handlePageClick = (props: any) => {
    const beginIndex = props.selected * ITEMS_PER_PAGE;
    setCurrentTrips(trips.slice(beginIndex, beginIndex + ITEMS_PER_PAGE))
  }

  return (
    <div className="container">

      <h2>Trips from Paris to Lyon</h2>

      <table className="table"><thead><tr><th scope="col">Num</th><th scope="col">From</th><th scope="col">To</th><th scope="col">Price</th></tr></thead>
        {currentTrips.map((trip: Trip) => (
          <tbody>
          <tr>
            <th scope="row">{trip.id}</th>
            <td>{trip.waypoints[0].place.city}</td>
            <td>{trip.waypoints[1].place.city}</td>
            <td>{`${trip.price.amount} ${trip.price.currency}`}</td>
          </tr>
          </tbody>
        ))}
      </table>
        <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={ITEMS_PER_PAGE}
          onPageChange={handlePageClick}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
    </div>
  );
}

export default App;
