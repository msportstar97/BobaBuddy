import './PlaceReview.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import createReactClass from 'create-react-class';
import * as firebase from 'firebase';

class PlaceReview extends Component {

  constructor() {
    super();

    this.state = {
      showMenuList: true,
      showMenuReview: false,
      selectedMenu: "", 
      dummy: {}
    }

    this.handleMenu = this.handleMenu.bind(this);
    this.makeFakeDrinks = this.makeFakeDrinks.bind(this);
  }

  componentDidMount() {
    // this.props.requestPageOfPlans();
    console.log('page loaded', this.props.location.state.place);
    const rootRef = firebase.database().ref();
    const placesRef = rootRef.child('places');
    const place = this.props.location.state.place;

    var newPlaceRef = placesRef.push();
    // console.log('newplaceref', newPlaceRef);
    const ourPlaceId = "PLC" + newPlaceRef.key;

    var newPlace = {
      name: place.name,
      placeId: place.id,
    }

    placesRef.child(ourPlaceId).set(newPlace);

    // newPlaceRef.set(newPlace);

    // placesRef.child('testPlace').set ({
    //     name: place.name,
    //     placeId: place.id,
    // });
    this.makeFakeDrinks('testPlace');

    rootRef.on('value', snap=> {
          this.setState({
            dummy: snap.val()
          });
      });
    
    //if firebase does not have our place 

  //   
  //   const usersRef = rootRef.child('users');
  // //   usersRef.push ({
  // //     name: "John",
  // //     number: 1,
  // //     age: 30
  // //  });
  




    // this.setState({
    //   place: this.props.location.state.place,
    // });
  }

  makeFakeDrinks(inPlaceId) {
    var placeId = {inPlaceId}
    var drinkRef = firebase.database().ref("drinks")

    var oolong = {
        name: "Oolong Milk Tea",
        price: 3.25,
        place: placeId,
        ratings: ["init"]
    }
    var classic = {
        name: "Classic Milk Tea",
        price: 3.25,
        place: placeId,
        ratings: ["init"]
    }
    var taro = {
        name: "Taro Milk Tea",
        price: 4.25,
        place: placeId,
        ratings: ["init"]
    }
    var green = {
        name: "Green Milk Tea",
        price: 3.50,
        place: placeId,
        ratings: ["init"]
    }

    drinkRef.push(oolong);
    drinkRef.push(classic);
    drinkRef.push(taro);
    drinkRef.push(green);
  }

  handleMenu = (e) => {
    console.log("a");
    // this.setState({selectedMenu: e.target.value});
    // this.setState({showMenuList: false});
  }


  render() {
    console.log('dummy', this.state.dummy);
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
