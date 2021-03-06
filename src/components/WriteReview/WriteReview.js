import './WriteReview.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import createReactClass from 'create-react-class';
import { Dropdown } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import * as firebase from 'firebase';

class WriteReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOptions: [
        {
          key: "mango oolong tea",
          value: "mango oolong tea",
          text: "Mango Oolong Tea"
        },
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
      ],
      selectedMenu: "",
      selectedSize: "",
      selectedIce: "",
      selectedSugar: "",
      selectedTopping: [],
      selectedRating: "",
      additionalReview: "",
      menuOC: 0,
      sizeOC: 0,
      iceOC: 0,
      sugarOC: 0,
      toppingOC: 0,
      ratingOC: 0,
      showMenuWarning: false,
      showSizeWarning: false,
      showIceWarning: false,
      showSugarWarning: false,
      showRatingWarning: false
    }

    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const placesRef = rootRef.child('places');
    const drinksRef = rootRef.child('drinks');
    const place = this.props.location.state.place;
    const ourPlaceId = this.props.location.state.ourPlaceId; //"PLC-" + this.props.location.state.place.place_id;
    var realThis = this;
    // console.log('get drinks', ourPlaceId);

    // var listOfDrinks = [];
    var arr = [];

    drinksRef.orderByChild('place').equalTo(ourPlaceId).on("value", function(snapshot) {
      // console.log('les drinks', snapshot.val());

      snapshot.forEach(function(data) {
        // console.log('data val', data.val(), data.key);
        arr.push({
          key: data.key,
          value: data.key,
          text: data.val().name,
        });
    });
    // console.log('arr', arr, realThis.state.menuOptions);
    realThis.setState({
      menuOptions: arr,
    });

  });



  }

  handleMenuSelection = (e, {value}) => {
    this.setState({selectedMenu: value})
    this.setState({menuOC: this.state.menuOC + 1});
    this.setState({showMenuWarning: false});
  }

  handleSizeSelection = (e, {value}) => {
    this.setState({selectedSize: value})
    this.setState({sizeOC: this.state.sizeOC + 1});
    this.setState({showSizeWarning: false});
  }

  handleIceSelection = (e, {value}) => {
    this.setState({selectedIce: value});
    this.setState({iceOC: this.state.iceOC + 1});
    this.setState({showIceWarning: false});
  }

  handleSugarSelection = (e, {value}) => {
    this.setState({selectedSugar: value});
    this.setState({sugarOC: this.state.sugarOC + 1})
    this.setState({showSugarWarning: false});
  }

  handleToppingSelection = (e, {value}) => {
    this.setState({selectedTopping: value});
    this.setState({toppingOC: this.state.toppingOC + 1})
  }

  handleRatingSelection = (e, {value}) => {
    this.setState({selectedRating: value});
    this.setState({ratingOC: this.state.ratingOC + 1})
    this.setState({showRatingWarning: false});
  }

  handleAdditionalReview = (e, {value}) => {
    this.setState({additionalReview: value})
  }

  handleSubmitReview = () => {
    if (this.state.menuOC === 0) {
      this.setState({showMenuWarning: true});
    }
    if (this.state.sizeOC === 0) {
      console.log("Select Size")
      this.setState({showSizeWarning: true});
    }
    if (this.state.iceOC === 0) {
      console.log("invalid ice")
      this.setState({showIceWarning: true});
    }
    if (this.state.sugarOC === 0) {
      console.log("invalid sugar")
      this.setState({showSugarWarning: true});
    }
    if (this.state.ratingOC === 0) {
      console.log("invalid rating")
      this.setState({showRatingWarning: true});
    }

    else {
      //submit review
      console.log('submit review for', this.state.selectedMenu);
      const rootRef = firebase.database().ref();
      const reviewsRef = rootRef.child('reviews');
      const drinksRef = rootRef.child('drinks');
      const place = this.props.location.state.place;
      var realThis = this;

      const ourDrinkId = this.state.selectedMenu;
      const ourPlaceId = this.props.location.state.ourPlaceId; //"PLC-" + this.props.location.state.place.place_id;
      const ourRating = this.state.selectedRating;
      let finalSelectedTopping = this.state.selectedTopping;
      if (this.state.selectedTopping.includes("no topping") && this.state.selectedTopping.length != 1) {
        finalSelectedTopping.splice(finalSelectedTopping.indexOf("no topping"), 1);
        console.log(finalSelectedTopping);
      }
      const ourOptions = {
        size: this.state.selectedSize,
        ice: this.state.selectedIce,
        sugar: this.state.selectedSugar,
        toppings: finalSelectedTopping,
      }
      const ourDescription = this.state.additionalReview;

      // make new review
      var newReviewRef = reviewsRef.push();
      const ourReviewId = "RVW" + newReviewRef.key;
      var newReview = {
        drinkId: ourDrinkId,
        placeId: ourPlaceId,
        options: ourOptions,
        rating: ourRating,
        description: ourDescription,
      }

      // send new review to firebase
      reviewsRef.child(ourReviewId).set(newReview);

      // update drinks array to contain ourReviewId
      drinksRef.child(ourDrinkId).child('reviews').child(ourReviewId).set(ourReviewId);

      // update user.reviews to contain ourReviewId
      rootRef.child('users').child(firebase.auth().currentUser.uid).child('reviews').child(ourReviewId).set(ourReviewId);
    }

  }


  render() {
    const place = this.props.location.state.place;
    // const menuOptions = this.state.menuOptions;
    // console.log('the real menu options', this.state.menuOptions);
    // console.log('this place ', this.props.location.state);
    // console.log('t', this.props.location);

    const iceOptions = [
      {
        key: "0%",
        value: "0%",
        text: "0%"
      },
      {
        key: "25%",
        value: "25%",
        text: "25%"
      },
      {
        key: "50%",
        value: "50%",
        text: "50%"
      },
      {
        key: "75%",
        value: "75%",
        text: "75%"
      },
      {
        key: "100%",
        value: "100%",
        text: "100%"
      },
      {
        key: "33%",
        value: "33%",
        text: "33%"
      },
      {
        key: "66%",
        value: "66%",
        text: "66%"
      }
    ];

    const sugarOptions = [
      {
        key: "0%",
        value: "0%",
        text: "0%"
      },
      {
        key: "25%",
        value: "25%",
        text: "25%"
      },
      {
        key: "50%",
        value: "50%",
        text: "50%"
      },
      {
        key: "75%",
        value: "75%",
        text: "75%"
      },
      {
        key: "100%",
        value: "100%",
        text: "100%"
      },
      {
        key: "less",
        value: "less",
        text: "less"
      },
      {
        key: "normal",
        value: "normal",
        text: "normal"
      },
      {
        key: "more",
        value: "more",
        text: "more"
      }

    ];

    const sizeOptions = [
      {
        key: "S",
        value: "S",
        text: "S"
      },
      {
        key: "M",
        value: "M",
        text: "M"
      },
      {
        key: "L",
        value: "L",
        text: "L"
      },
      {
        key: "XL",
        value: "XL",
        text: "XL"
      }
    ];

    const toppingOptions = [
      {
        key: "no topping",
        value: "no topping",
        text: "no topping"
      },
      {
        key: "pudding",
        value: "pudding",
        text: "pudding"
      },
      {
        key: "tapioca",
        value: "tapioca",
        text: "tapioca"
      },
      {
        key: "nata jelly",
        value: "nata jelly",
        text: "nata jelly"
      },
      {
        key: "red bean",
        value: "red bean",
        text: "red bean"
      },
      {
        key: "herbal jelly",
        value: "herbal jelly",
        text: "herbal jelly"
      },
      {
        key: "aloe jelly",
        value: "aloe jelly",
        text: "aloe jelly"
      },
      {
        key: "fig jelly",
        value: "fig jelly",
        text: "fig jelly"
      },
      {
        key: "oreo",
        value: "oreo",
        text: "oreo"
      }
    ];

    const ratingOptions = [
      {
        key: 1,
        value: 1,
        text: 1
      },
      {
        key: 2,
        value: 2,
        text: 2
      },
      {
        key: 3,
        value: 3,
        text: 3
      },
      {
        key: 4,
        value: 4,
        text: 4
      },
      {
        key: 5,
        value: 5,
        text: 5
      }
    ];

    var Warning = createReactClass({
      render: function() {
      return (
        <div id="warning" className="select-warning">
          Select
        </div>
      );
    }
  });




    return (
      <div className = "WriteReview">
        <div className = "review-section">
        <p id = "review-title"> Write a Review for {place.name} </p>
        Menu to review *
        { this.state.showMenuWarning ? <Warning /> : null }
        <Dropdown className = "dropdown"
        placeholder='Search | Select'
        fluid
        search
        selection

        options={this.state.menuOptions}
        onChange={(e, { value }) => this.handleMenuSelection(e, { value })}
        />
        Size Option *
        { this.state.showSizeWarning ? <Warning /> : null }
        <Dropdown className = "dropdown"
          placeholder='Select Size Option'
          fluid
          selection
          options={sizeOptions}
          onChange={(e, { value }) => this.handleSizeSelection(e, { value })}
        />
        Ice Level *
        { this.state.showIceWarning ? <Warning /> : null }
        <Dropdown className = "dropdown"
          placeholder='Select Ice Level'
          fluid
          selection
          options={iceOptions}
          onChange={(e, { value }) => this.handleIceSelection(e, { value })}
        />
        Sugar Level *
        { this.state.showSugarWarning ? <Warning /> : null }
        <Dropdown className = "dropdown"
          placeholder='Select Sugar Level'
          fluid
          selection
          options={sugarOptions}
          onChange={(e, { value }) => this.handleSugarSelection(e, { value })}
        />
        Topping(s) *
        <Dropdown className = "dropdown"
          placeholder='Search | Select Topping(s)'
          fluid
          selection
          multiple
          search
          options={toppingOptions}
          onChange={(e, { value }) => this.handleToppingSelection(e, { value })}
        />
        Rating *
        { this.state.showRatingWarning ? <Warning /> : null }
        <Dropdown className = "dropdown"
          placeholder='Rating'
          fluid
          selection
          options={ratingOptions}
          onChange={(e, { value }) => this.handleRatingSelection(e, { value })}
        />
        <Form>
          <Form.TextArea label='Additional Review'
          placeholder='Tell us more about your experience'
          onChange={(e, { value }) => this.handleAdditionalReview(e, { value })}
          />
        </Form>
        <div className = "button-row">
        <Link to={{
          pathname: "/PlaceReview",
          state: {
            place: this.props.location.state.place,
            search: this.props.location.state.search
          }}}>
          <Button onClick = {this.handleSubmitReview.bind(this)}> Submit </Button> <Button> Cancel </Button>
        </Link>
        </div>
        </div>
      </div>
    );
  }
}


export default WriteReview;
