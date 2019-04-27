import './Results.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

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
    //console.log(this.props)
    const {place} = this.props.location.state;

    let locUrl = `${this.geolocUrl}${place.replace(/\s/g,'+')}${this.apiKey}`;

    axios.get(locUrl).then((response) => {
      this.setState({
        geo: response.data.results[0].geometry.location
      })

      var placesRequest = {
        location: new window.google.maps.LatLng(this.state.geo.lat, this.state.geo.lng),
        keyword: '(bubble tea) OR (boba)',
        rankBy: window.google.maps.places.RankBy.DISTANCE,
      };

      let map = new window.google.maps.Map(document.createElement('div'));
      let service = new window.google.maps.places.PlacesService(map);

      service.search(placesRequest, ((response) => {
        this.setState({
          results: response
        })
        //console.log(this.state.results);
      }))
    }).catch((error) => {
      console.log(error);
    });

  }

  handleFilter = (e) => {
    if (e.target.value === "distance") {
      this.setState({showDrinkDropdown: false});
      var placesRequest = {
        location: new window.google.maps.LatLng(this.state.geo.lat, this.state.geo.lng),
        keyword: '(bubble tea) OR (boba)',
        rankBy: window.google.maps.places.RankBy.DISTANCE,
      };

      let map = new window.google.maps.Map(document.createElement('div'));
      let service = new window.google.maps.places.PlacesService(map);

      service.search(placesRequest, ((response) => {
        this.setState({
          results: response
        })
        //console.log(this.state.results);
      }))
    }



    if (e.target.value === "rating") {
      this.state.results.sort((a,b) => b.rating - a.rating);
      this.setState({showDrinkDropdown: false});
    }

    if (e.target.value === "drink-rating") {
      this.setState({showDrinkDropdown: true});
    }


  }



   render() {
     console.log(this.state.results)

     const drinkOptions = [
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
              options={drinkOptions}
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
            <Link to={{
              pathname: "/PlaceReview",
              state: {
                place: boba
              }}}  >
            <div className="bobaPlace" key={idx}>
              <p id = "drink_name">{boba.name}</p>
              <span id = "place_rating"> {boba.rating} / 5.0
              </span>
              <StarRatings
                rating={boba.rating}
                starDimension="15px"
                starSpacing="2px"
                starRatedColor="#6FB59B"
                starEmptyColor = "#D9D9D9"
              />
              <p>{boba.vicinity}</p>
            </div>
            </Link>
          )}
        </div>
       </div>
     );
   }
}

export default Results;
