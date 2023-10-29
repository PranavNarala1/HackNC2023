import Link from 'next/link';
import { useAuth } from "@clerk/nextjs";

import {fetchOpenRequests} from './api/api_endpoints.js';
import Map from '../components/map.js';

import Navbar from '../components/navbar.js';


export async function getServerSideProps() {
  const returned_data = await fetchOpenRequests();
  let geocoded_results = []
  for(let i = 0; i < returned_data.length; i++){
    //const apiUrl = 'https://geocode.maps.co/search?q=1504+Sabino+Drive+Cary+NC';
    console.log(returned_data[i])
    const apiUrl = 'https://geocode.maps.co/search?q=' + returned_data[i].end.replace(" ", "+") + "+NC";
                  // Make a GET request to the API
                  let geo_coded_data = await fetch(apiUrl)
                    .then(response => {
                      // Check if the response status is OK (200)
                      if (response.status === 200) {
                        // Parse the JSON response
                        return response.json();
                      } else {
                        // Handle the error if the status is not OK
                        throw new Error('Failed to fetch data from the API');
                      }
                    })
                    .then(data => {
                      // Do something with the API data
                      return data;
                    })
                    .catch(error => {
                      // Handle any errors that occurred during the fetch
                      console.error(error);
                    });
                    //console.log(geo_coded_data.lat);
                    geocoded_results.push(geo_coded_data);
  }
  
  return {
    props: {
      returned_data,
      geocoded_results
    },
  };
}
const mapStyles = {
  width: '100%',
  height: '50%'
};

export default function MapPage({returned_data, geocoded_results}) {
  let x = -1;
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const DEFAULT_CENTER = [38.907132, -77.036546]

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
    return (
      <div>
        <Navbar></Navbar>
<Map width="800" height="400" center={[geocoded_results[0][0].lat, geocoded_results[0][0].lon]} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                {returned_data.map((post) => {
                  x += 1;
                  
            return (
              <Marker position={[parseFloat(geocoded_results[x][0].lat),parseFloat(geocoded_results[x][0].lon)]}>
              <Popup>
              <b>ID: {post.id} </b>  <br></br>
              Deliver to: {post.end} <br></br>
              From: {post.start} <br></br>
              Order Info: {post.order_info} <br></br>
                Requester: {post.requester} <br></br>
              </Popup>
            </Marker>
            )
           })}
              </>
            )}
          </Map>

      </div>


      
    );

    }