import './Results.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import { Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Search from '../Search/Search.js';
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import propTypes from "prop-types";

const API_KEY = "AIzaSyDFtzabY5k6-NOC6V1h3b-LjftEvZyW2MY";

class Results extends Component {
  constructor() {
    super();

    this.state = {
      geo: {},
      results: [],
      filterOption: "Sort By Distance",
      showDrinkDropdown: false,
      drinkFilterOption: "",
      query: '',
      value: ''
    }

    this.apiKey = '&key=AIzaSyDFtzabY5k6-NOC6V1h3b-LjftEvZyW2MY';

    this.geolocUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    this.searchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    //console.log(this.props)
    const {place} = this.props.location.state;

    this.setState({
      query: place,
      value: place
    })

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state !== this.props.location.state) {
      let place = nextProps.location.state.place;
      this.setState({
        query: place,
        value: place
      });
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
  }

  filterOptions = [
    {
      key: "distance",
      value: "distance",
      text: "Sort By Distance"
    },
    {
      key: "rating",
      value: "rating",
      text: "Sort By Rating"
    },
    {
      key: "drink rating",
      value: "drink rating",
      text: "Sort By Drink Rating"
    }
  ]

  handleFilter = (e, {value}) => {
    console.log(value);
    if (value === "distance") {
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


    if (value === "rating") {
      this.state.results.sort((a,b) => b.rating - a.rating);
      this.setState({showDrinkDropdown: false});
    }

    if (value === "drink rating") {
      this.setState({showDrinkDropdown: true});
    }


  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value,
      value: event.target.value
    });
  }

  handleSelect = (event) => {
    this.setState({
      query: event.formatted_address,
      value: event.formatted_address
    })
  }

   render() {
     console.log(this.props.location);
     let {query, value} = this.state;
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
              placeholder='Search for Drink'
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

    // console.log('results', this.state.results);

    let cardView;

    if (this.state.results.length === 0) {
      cardView = <p className="noResults"> Sorry, there are no boba places from this search </p>;
    } else { 
      cardView = <div className="cards">
                  {this.state.results.map((boba, idx) =>
                    <Link to={{
                      pathname: "/PlaceReview",
                      state: {
                        place: boba,
                        search: value
                      }}} key={idx} >
                    <div className="bobaPlace">
                      <p id = "place_name"> {boba.name} </p>
                      <p>{boba.vicinity}</p>
                      <span id = "place_rating"> {boba.rating} / 5.0 </span>
                      <StarRatings
                        rating={boba.rating}
                        starDimension="15px"
                        starSpacing="2px"
                        starRatedColor="#6FB59B"
                        starEmptyColor = "#D9D9D9"
                      />
                    </div>
                    </Link>
                  )}
                </div>;
    }

     return (
       <div className="results">
        <div className = "top">
           <div className="searchAgain">

             <ReactGoogleMapLoader
             params={{key: API_KEY,
             libraries: "places,geocode"}}
             render={googleMaps => googleMaps && (
               <div className="searchAgainBar">
                 <ReactGooglePlacesSuggest
                 autocompletionRequest={{input: query}}
                 googleMaps={googleMaps}
                 onSelectSuggest={this.handleSelect}>
                 <Input className="searchAgainForm"
                 placeholder="Search for location (address, zip code..)"
                 onChange={this.handleChange}
                 value={value}/>
                 </ReactGooglePlacesSuggest>
                 <Link to={{
                   pathname: "/Results/" + value,
                   state: {
                     place: value
                   }}} >
                   <Button className="searchAgainButton">Search</Button>
                 </Link>
               </div>
             )}>
             </ReactGoogleMapLoader>
           </div>
            <div className="filterDropdown" style = {{zIndex: 1}}>
                <Dropdown className="order-select" onChange={(e, {value}) => this.handleFilter(e, { value })}
                placeholder={this.state.filterOption}
                fluid
                selection
                options={this.filterOptions} />

                { this.state.showDrinkDropdown ? <DrinkDropdown /> : null }
            </div>
          </div>
        {cardView}
       </div>
     );
   }
}

export default Results;
