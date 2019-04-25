import './Results.scss';
import React, { Component } from 'react';
import Header from '../Header/Header.js';
import axios from 'axios';
// import GoogleMapReact from 'google-map-react';

class Results extends Component {
  constructor() {
    super();

    this.state = {
      geo: {},
      results: [],
    }

    this.apiKey = '&key=AIzaSyDFtzabY5k6-NOC6V1h3b-LjftEvZyW2MY';

    this.geolocUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    this.searchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const {place} = this.props.location.state;

    let locUrl = `${this.geolocUrl}${place.replace(/\s/g,'+')}${this.apiKey}`;
    console.log(locUrl);
    axios.get(locUrl).then((response) => {
      this.setState({
        geo: response.data.results[0].geometry.location
      })

      // let resUrl = `${this.searchUrl}${this.state.geo.lat},${this.state.geo.lng}&rankby=distance&keyword=boba${this.apiKey}`;
      // console.log(resUrl);

      const placesRequest = {
        location: new window.google.maps.LatLng(this.state.geo.lat, this.state.geo.lng),
        query: '(bubble tea) OR (boba)',
        radius: 50,
      };

      let map = new window.google.maps.Map(document.createElement('div'));
      let service = new window.google.maps.places.PlacesService(map);

      service.textSearch(placesRequest, ((response) => {
        this.setState({
          results: response
        })
      }))
    }).catch((error) => {
      console.log(error);
    });

  }

   render() {
     return (
       <div className="results">
        <Header />
        <div className="cards">
          {this.state.results.map((boba, idx) =>
            <div className="bobaPlace" key={idx}>
              <p>{boba.name}</p>
              <p>Location: {boba.formatted_address}</p>

            </div>
          )}

        </div>
       </div>
     );
   }
}

export default Results;
