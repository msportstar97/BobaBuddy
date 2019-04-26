import './Results.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
// import GoogleMapReact from 'google-map-react';

class Results extends Component {
  constructor() {
    super();

    this.state = {
      geo: {},
      results: [],
      filterOption: "distance",
      showDrinkDropdown: false,
      drinkFilterOption: ""
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

      var placesRequest = {
        location: new window.google.maps.LatLng(this.state.geo.lat, this.state.geo.lng),
        query: 'bubble tea or boba',
        rankBy: window.google.maps.places.RankBy.DISTANCE,
      };

      let map = new window.google.maps.Map(document.createElement('div'));
      let service = new window.google.maps.places.PlacesService(map);

      service.textSearch(placesRequest, ((response) => {
        this.setState({
          results: response
        })
        console.log(this.state.results);
      }))
    }).catch((error) => {
      console.log(error);
    });

  }

  handleFilter = (e) => {

    if (e.target.value == "drink-rating") {
      this.setState({showDrinkDropdown: true});
    }

  }



   render() {

     const filterOptions = [
       {
         key: "peach oolong tea",
         value: "peach oolong tea",
         text: "Peach Oolong Tea"
       },
       {
         key: "oolong tea",
         value: "oolong tea",
         text: "Oolong Tea"
       },
       {
         key: "oolong milk tea",
         value: "oolong milk tea",
         text: "Oolong Milk Tea"
       }
     ]

     function handleDrinkFilter(e, {value}) {
       //this.setState({drinkFilterOption: {value}})
       console.log({value})
     }



      var createReactClass = require('create-react-class');


      var DrinkDropdown = createReactClass({
        render: function() {
        return (
          <div id="results" className="search-results">
            <Dropdown
              placeholder='Select Drink'
              fluid
              search
              selection
              options={filterOptions}
              onChange={(e, { value }) => handleDrinkFilter(e, { value })}
            />
          </div>
        );
      }
    });




     return (
       <div className="results">
        <div className = "filterDropdown">
          <span> Sort By </span>
            <select className = "order-select" onChange={(e) => this.handleFilter(e)}>
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
              <option value="drink-rating">Drink Rating</option>
            </select>
            { this.state.showDrinkDropdown ? <DrinkDropdown /> : null }
        </div>

        <div className="cards">
          {this.state.results.map((boba, idx) =>
            <div className="bobaPlace" key={idx}>
              <p>{boba.name}</p>
              <p id = "place_rating"> {boba.rating} / 5.0 </p>
              <p>{boba.formatted_address}</p>

            </div>
          )}

        </div>
       </div>
     );
   }
}

export default Results;
