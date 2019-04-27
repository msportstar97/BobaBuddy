import './PlaceReview.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import createReactClass from 'create-react-class';

class PlaceReview extends Component {

  constructor() {
    super();

    this.state = {
      showMenuList: true,
      showMenuReview: false,
      selectedMenu: ""
    }

    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu = (e) => {
    console.log("a");
    // this.setState({selectedMenu: e.target.value});
    // this.setState({showMenuList: false});
  }


  render() {

    const {place} = this.props.location.state;

    var createReactClass = require('create-react-class');

    function handleMenu (e) {
      console.log(e.target.value);

    }
    var MenuList = createReactClass({
      render: function() {
      return (
        <div id="menuList" >
          <p> MENU </p>
          <Button value = "menu1" onClick = {(e) => handleMenu(e)}> menu 1 </Button>
        </div>
      );
    }
  });

    var MenuReview = createReactClass({
      render: function() {
      return (
        <div id="results" className="search-results">
          menu review
          <i class="arrow left icon"></i>
        </div>
      );
    }
  });

    //console.log({place})
    //console.log(place.place.name)


    return (
      <div className = "placeReview">
        <div className = "placeInfo">
          <p> {place.name} </p>
          <p> {place.rating} </p>
          <Button> Leave a Review </Button>
        </div>

        <div className = "menuInfo">
          { this.state.showMenuList ? <MenuList /> : <MenuReview /> }
        </div>
      </div>

    );
  }

}

export default PlaceReview;
