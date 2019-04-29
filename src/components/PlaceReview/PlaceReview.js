import './PlaceReview.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import createReactClass from 'create-react-class';
import * as firebase from 'firebase';

class PlaceReview extends Component {
  _isMounted = false;

  constructor() {
    super();

    this.state = {
      showMenuList: true,
      showMenuReview: false,
      selectedMenu: "",
      dummy: {},
      ourId: '',
    }

    this.handleMenu = this.handleMenu.bind(this);
    this.makeFakeDrinks = this.makeFakeDrinks.bind(this);
    this.makeAFakeDrink = this.makeAFakeDrink.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    // this.props.requestPageOfPlans();
    console.log('page loaded', this.props.location.state.place);
    const rootRef = firebase.database().ref();
    const placesRef = rootRef.child('places');
    const place = this.props.location.state.place;
    var realThis = this;

    var ourPlaceId = "";

    // let's check for dupes first!
    // var isDupe = false;
    placesRef.orderByChild('placeId').equalTo(place.id).on('value', function(snapshot) {
      console.log('snapshot', snapshot.val());
      var count = 0;
      if (snapshot.exists() && count === 0) {
        count++;
        snapshot.forEach(function(data) {
          // console.log('data key',data.key);
          ourPlaceId = data.key;
      });
        // ourPlaceId = snapshot.val();
        // isDupe = true;

        console.log('our place id', ourPlaceId);

        // view firebase db
        if (realThis._isMounted) {
          rootRef.on('value', snap=> {
            realThis.setState({
              dummy: snap.val(),
              ourId: ourPlaceId,
            });
          });
        }

      } else if (count === 0) {
        count++;
        // create a new id for firebase
        var newPlaceRef = placesRef.push();
        // add our prefix to the id
        ourPlaceId = "PLC" + newPlaceRef.key;

        // create fake drinks with our id and return an array of drink objIds
        const fakeDrinks = realThis.makeFakeDrinks(ourPlaceId);

        // create new place object
        var newPlace = {
          name: place.name,
          placeId: place.id,
          drinks: fakeDrinks
        }
        // send new place object to firebase
        placesRef.child(ourPlaceId).set(newPlace);

        console.log('our place id', ourPlaceId);

        // view firebase db
        if (realThis._isMounted) {
          rootRef.on('value', snap=> {
            realThis.setState({
              dummy: snap.val(),
              ourId: ourPlaceId,
            });
          });
        }

      }
    });




  }

  makeFakeDrinks(inPlaceId) {
    var fakeDrinksObjIds = [];

    var placeId = inPlaceId;
    var drinksRef = firebase.database().ref("drinks");

    // var newDrinkRef = drinksRef.push();
    // const ourDrinkId = "DRK" + newDrinkRef.key;

    // var oolong = {
    //     name: "Oolong Milk Tea",
    //     price: 3.29,
    //     place: placeId,
    //     reviews: ["init"]
    // }

    // drinksRef.child(ourDrinkId).set(oolong);

    var oolong = {
            name: "Oolong Milk Tea",
            price: 3.29,
            place: placeId,
            reviews: ["init"]
    };
    var classic = {
          name: "Classic Milk Tea",
          price: 3.29,
          place: placeId,
          reviews: ["init"]
    };
    var taro = {
        name: "Taro Milk Tea",
        price: 4.29,
        place: placeId,
        reviews: ["init"]
    };
    var green = {
        name: "Green Milk Tea",
        price: 3.50,
        place: placeId,
        reviews: ["init"]
    };

    fakeDrinksObjIds.push(this.makeAFakeDrink(oolong, drinksRef));
    fakeDrinksObjIds.push(this.makeAFakeDrink(classic, drinksRef));
    fakeDrinksObjIds.push(this.makeAFakeDrink(taro, drinksRef));
    fakeDrinksObjIds.push(this.makeAFakeDrink(green, drinksRef));

    return fakeDrinksObjIds;
  }

  makeAFakeDrink(drink, drinksRef) {
    var newDrinkRef = drinksRef.push();
    const ourDrinkId = "DRK" + newDrinkRef.key;

    drinksRef.child(ourDrinkId).set(drink);
    return {ourDrinkId};
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleMenu(e) {
    this.setState({selectedMenu: e.target.value});
    this.setState({showMenuList: false});
  }


  render() {
    console.log('dummy', this.state.dummy);
    const {place} = this.props.location.state;

    var createReactClass = require('create-react-class');

    var realThis = this;
    var MenuList = createReactClass({
      render: function() {
      return (
        <div id="menuList" >
          <p> MENU </p>
          <Button value = "menu1" onClick = {(e) => realThis.handleMenu(e)}> menu 1 </Button>
        </div>
      );
    }
  });

    var MenuReview = createReactClass({
      render: function() {
      return (
        <div id="menuReview">
          menu review
          <i className="arrow left icon"></i>
        </div>
      );
    }
  });

    //console.log({place})
    //console.log(place.place.name)
    let button;

    if (firebase.auth().currentUser) {
      button = <Link to={{
                pathname: "/WriteReview",
                state: {
                  place: place
                }}} >
                  <Button id="reviewButton"> Leave a Review </Button>
                </Link>
    } else {
      button = <p className="reviewLog"> Log in to leave a review </p>;
    }

    return (
      <div className = "placeReview">
        <div className = "placeInfo">
          <p> {place.name} </p>
          <p> {place.rating} </p>
          {button}
        </div>

        <div className = "menuInfo">
          { this.state.showMenuList ? <MenuList /> : <MenuReview /> }
        </div>
      </div>

    );
  }

}

export default PlaceReview;
