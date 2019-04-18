import './Search.scss';
import React, { Component } from 'react';
import {Input, Button } from 'semantic-ui-react'
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import propTypes from "prop-types";

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
          <Button className="search-button">Search</Button>
        </div>
       )}>
      </ReactGoogleMapLoader>
    );
  }
}

Search.propTypes = {
  googleMaps: propTypes.object,
}

export default Search;
