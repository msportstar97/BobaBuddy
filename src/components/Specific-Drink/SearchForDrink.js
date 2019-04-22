import React, { Component } from 'react';
import Autosuggest from 'react-bootstrap-autosuggest';
import Header from '../Header/Header.js';
import { Button } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'

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
         <p> Search for one or more boba drinks. </p>
         <Dropdown
         placeholder = "boba drink"
         fluid
         multiple
         search
         selection
         options = {drinkOptions} />

         <Button> SKIP and show me all the boba places </Button>
         </div>
      </div>
    );
  }
}

export default SearchForDrink;
