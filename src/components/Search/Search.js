import './Search.scss';
import React, { Component } from 'react';
import {Input, Button } from 'semantic-ui-react'
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import propTypes from "prop-types";
import { Link } from 'react-router-dom'

const API_KEY = "AIzaSyDFtzabY5k6-NOC6V1h3b-LjftEvZyW2MY";

class Search extends Component {

  constructor() {
    super();

    this.state = {
      query: '',
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value,
      value: event.target.value
    });
  }

  handleSelect = (event) => {
    this.setState({
      query: '',
      value: event.formatted_address
    })
  }

  render() {
    const {query, value} = this.state
    return (
      <div className="search">
        <p className="intro">
          Looking for a boba place?
          <br></br>
          Have no idea what to get at a boba shop?
          <br></br>
          Want to leave a review for specific boba at a place?
          <br></br>
          Search for a place to find boba places nearby. Login to leave reviews.
        </p>
        <ReactGoogleMapLoader
        params={{key: API_KEY,
        libraries: "places,geocode"}}
        render={googleMaps => googleMaps && (
          <div className="search-bar">
            <ReactGooglePlacesSuggest
            autocompletionRequest={{input: query}}
            googleMaps={googleMaps}
            onSelectSuggest={this.handleSelect}>
            <Input className="search-form"
            placeholder="Search for location (address, zip code..)"
            onChange={this.handleChange}
            value={value}/>
            </ReactGooglePlacesSuggest>
            <Link to={{
              pathname: "SearchForDrink",
              state: {
                place: value
              }}} >
              <Button className="search-button">Search</Button>
            </Link>
          </div>
        )}>
        </ReactGoogleMapLoader>
      </div>
    );
  }
}

Search.propTypes = {
  googleMaps: propTypes.object,
}

export default Search;
