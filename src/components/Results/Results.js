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
import * as firebase from 'firebase';

const API_KEY = "AIzaSyDFtzabY5k6-NOC6V1h3b-LjftEvZyW2MY";

class Results extends Component {
  constructor() {
    super();

    this.state = {
      geo: {},
      results: [],
      ratings: [],
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
    console.log(locUrl);
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
    if (nextProps.location.state && nextProps.location.state !== this.props.location.state) {
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
      text: "Sort By Place Rating"
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

  handleDrinkFilter = (e, {value}) => {
    //this.setState({drinkFilterOption: {value}})
    console.log({value})
    let pref = firebase.database().ref().child('places');
    let ratings = [];
    this.state.results.map((place, idx) => {
      console.log(place);
     pref.orderByChild('placeId').equalTo(place.id).limitToFirst(1).once('value', function(snapshot) {
       var count = 0;
       var placeId = "";
       var drinksArr = [];
       if (snapshot.exists() && count === 0) {
         count++;
         snapshot.forEach(function(data) {
           placeId = data.key;
         });
         drinksArr = snapshot.child(placeId).val().drinks;
         var drinkid;
         if (value === 'Oolong Milk Tea') {
           drinkid = drinksArr[0].ourDrinkId;
         } else if (value === 'Classic Milk Tea') {
           drinkid = drinksArr[1].ourDrinkId;
         } else if (value === 'Taro Milk Tea') {
           drinkid = drinksArr[2].ourDrinkId;
         } else {
           drinkid = drinksArr[3].ourDrinkId;
         }

         var drinksRef = firebase.database.ref('drinks');
         drinksRef.orderByKey().equalTo(drinkid).on('value', function(snap) {
          //  ratings.push(snap.)
           this.setState({
             ratings: ratings
           });
         });
         // this.state.ratings.push()
       }
     });

    });
  }

   render() {
     let {query, value} = this.state;
     const drinkOptions = [
       {
         key: "oolong milk tea",
         value: "oolong milk tea",
         text: "Oolong Milk Tea"
       },
       {
         key: "classic milk tea",
         value: "classic milk tea",
         text: "Classic Milk Tea"
       },
       {
         key: "taro milk tea",
         value: "taro milk tea",
         text: "Taro Milk Tea"
       },
       {
        key: "milk green tea",
        value: "milk green tea",
        text: "Milk Green Tea"
      }
     ]

    //  function handleDrinkFilter(e, {value}) {
    //    //this.setState({drinkFilterOption: {value}})
    //    console.log({value})
    //    let pref = firebase.database().ref().child('places');
       
    //    for (var place in this.state.results) {
    //     pref.orderByChild('placeId').equalTo(place.id).on('value', function(snapshot) {
    //       if (snapshot.exists()) {
    //         console.log(snapshot);
    //         // this.state.ratings.push()
    //       }
    //     });

    //    }
    //  }

      var createReactClass = require('create-react-class');


    //   var DrinkDropdown = createReactClass({
    //     render: function() {
    //     return (
    //       <div id="results" className="search-results">
    //         <Dropdown
    //           placeholder='Search for Drink'
    //           fluid
    //           search
    //           selection
    //           options={drinkOptions}
    //           onChange={(e, { value }) => handleDrinkFilter(e, { value })}
    //         />
    //       </div>
    //     );
    //   }
    // });

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

                { this.state.showDrinkDropdown ?           
                  <div id="results" className="search-results">
                    <Dropdown
                      placeholder='Search for Drink'
                      fluid
                      search
                      selection
                      options={drinkOptions}
                      onChange={(e, { value }) => this.handleDrinkFilter(e, { value })}
                    />
                  </div>: null }
            </div>
          </div>
        {cardView}
       </div>
     );
   }
}

export default Results;
