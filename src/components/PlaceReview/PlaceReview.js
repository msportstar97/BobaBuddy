import './PlaceReview.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import createReactClass from 'create-react-class';
import * as firebase from 'firebase';
import StarRatings from 'react-star-ratings';

class PlaceReview extends Component {
  _isMounted = false;

  constructor() {
    super();

    this.state = {
      showMenuList: true,
      showMenuReview: false,
      selectedId: "",
      selectedMenu: "no selected menu",
      selectedReview: [],
      selectedPrice: 0,
      dummy: {},
      ourId: '',
      drinkArr: []
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
      // console.log('snapshot', snapshot.val());
      var count = 0;
      if (snapshot.exists() && count === 0) {
        count++;
        snapshot.forEach(function(data) {
          // console.log('data key',data.key);
          ourPlaceId = data.key;
      });
        // ourPlaceId = snapshot.val();
        // isDupe = true;

        // console.log('our place id', ourPlaceId);

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

        // console.log('our place id', ourPlaceId);

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

  handleMenu(e, {value}, {drinkArr}) {
    var realThis = this;
    let revArr = {};
    console.log('click review', e, value, drinkArr);

    firebase.database().ref().child('reviews').orderByChild('drinkId').equalTo(value[0]).on('value', function(snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function(data) {
          revArr[data.key] = data.val();

        });
      }

      console.log('revArr', revArr);

      realThis.setState({
        selectedMenu: value[1].name,
        selectedPrice: value[1].price,
        selectedReview: revArr,
        showMenuList: false
      });
    })
  }

  backButtonPressed(e) {
    this.setState({showMenuList: true});
    console.log(this.state.selectedReview);
  }

mapDrinks() {
  if (this.state.dummy === undefined || this.state.dummy === null) {
      return <li> no menu </li>
  }
  else {
    let drinkArr = this.state.dummy.drinks;
    // let drinkArr = {};
    let buffer = [];

      for (var key in drinkArr) {
        if (drinkArr[key].place === this.state.ourId)
                buffer.push(
                <div className = "menuRow" key={key}>
                <Button basic color='grey' className = "singleMenu" value = {[key, drinkArr[key]]} onClick = {(e, {value}) =>
                  this.handleMenu(e, {value}, {drinkArr})}>
                  <p className = "drinkName"> {drinkArr[key].name} </p>
                  <p className = "drinkDetails">{"$" + drinkArr[key].price} </p>
                  </Button>
                  </div>);
        }
        console.log('buffer', buffer);

    return buffer;
  }
}

mapToppings(tArr) {
  let tBuffer = ""
  for (var i = 0; i < tArr.length -1; i++) {
    tBuffer +=  tArr[i] + ", "
  }
  tBuffer += tArr[tArr.length -1];
  console.log(tBuffer)
  return tBuffer;
}


  render() {
    console.log('dummy', this.state.dummy);
    // console.log('user', firebase.auth().currentUser);

    const {place, search} = this.props.location.state;

    var createReactClass = require('create-react-class');

    var realThis = this;

    var MenuList = createReactClass({
      render: function() {
        //console.log("that")
      return (
        <div id="menuList" >
          <p> MENU </p>
          {realThis.mapDrinks()}

        </div>
      );
    }
  });

    var MenuReview = createReactClass({
      render: function() {
        //console.log("this")
      return (
        <div id="menuReview">
          <Button onClick = {(e) => realThis.backButtonPressed(e)} id="goBackMenuButton" icon ='left arrow' content = ""/>
          <div className = "selectedMenu">
            {realThis.state.selectedMenu}
            </div>
            <div className = "selectedDetails">
              ${realThis.state.selectedPrice}
            </div>
          <div className = "selectedReview">
            {Object.keys(realThis.state.selectedReview).map((review, idx) =>
              // <p key={idx}>{realThis.state.selectedReview[idx]}</p>
              <div className = "reviewSection" key={idx}>
               <p> {realThis.state.selectedReview[review].rating}
               <StarRatings
                 rating={realThis.state.selectedReview[review].rating}
                 starDimension="15px"
                 starSpacing="2px"
                 starRatedColor="#6FB59B"
                 starEmptyColor = "#D9D9D9"
               />
               </p>
              <p id = "optionsSection"> Size [{realThis.state.selectedReview[review].options.size}] ·
              Ice [{realThis.state.selectedReview[review].options.ice}] ·
              Sugar [{realThis.state.selectedReview[review].options.sugar}] ·
              Toppings [{realThis.mapToppings(realThis.state.selectedReview[review].options.toppings)}] </p>

              <p> {realThis.state.selectedReview[review].description} </p>
              </div>
            )}
          </div>


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
                  place: place,
                  search: search,
                  ourPlaceId: this.state.ourId
                }}} >
                  <Button id="reviewButton" > Leave a Review </Button>
                </Link>
    } else {
      button = <p className="reviewLog"> Log in to leave a review </p>;
    }

    return (
      <div className = "placeReview">
         <Link to={{
                   pathname: "/Results/" + this.props.location.state.search,
                   state: {
                     place: this.props.location.state.search
                   }}} >
                   <Button id="goBack" icon ='left arrow' content='Go Back'  labelPosition='left'/>
                 </Link>
        <div className = "placeInfo">
          <p className = "placeInfoRow"> <span id = "placeName"> {place.name} </span> {button}</p>
          <p> Rating: {place.rating} </p>

        </div>

        <div className = "menuInfo">
          { this.state.showMenuList ? <MenuList /> : <MenuReview /> }
        </div>
      </div>

    );
  }

}

export default PlaceReview;
