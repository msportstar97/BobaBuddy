import React, { Component } from 'react';
import Autosuggest from 'react-bootstrap-autosuggest';
import Header from '../Header/Header.js';
import { Button } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import './SearchForDrink.scss';
import { Link } from 'react-router-dom'

class SearchForDrink extends Component {
  //once we get drinks database
  /*
    const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
    key: addressDefinitions.state_abbr[index],
    text: state,
    value: addressDefinitions.state_abbr[index],
  }))
  */

  render() {
    const bobaDrinks = [{name: "Oolong Milk Tea"}, {name: "Oolong Peach Tea"}, {name: "Oolong Tea"}, {name: "Green Tea"}]
    const drinkOptions = bobaDrinks.map(item => ({
    key: item.name,
    text: item.name,
    value: item.name
  }))
    return (

      <div className="SearchForDrink">
        <Header />
        <div className = "SearchSection">
         <p id = "instruction"> Search for one or more boba drinks. </p>
         <p></p>
         <Dropdown id = "search-bar"
         placeholder = "Boba drink"
         fluid
         multiple
         search
         selection
         options = {drinkOptions} />
         <Link to={{
              pathname: "/Results",
              state: {
                place: this.props.location.state.place
              }}}>
           <Button className="search-button">Search</Button>
         </Link>
         <Link to={{
              pathname: "/Results",
              state: {
                place: this.props.location.state.place 
              }}}>
          <Button id = "skip-button"> SKIP and show me all the boba places </Button>
         </Link>
         </div>
      </div>
    );
  }
}

export default SearchForDrink;
