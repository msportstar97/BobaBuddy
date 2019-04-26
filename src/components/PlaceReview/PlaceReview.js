import './PlaceReview.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class PlaceReview extends Component {

  render() {
    const {place} = this.props.location.state;
    console.log(place)

    return (
      <div className = "placeReview">
        <div className = "placeInfo">
          <p> {place.name} </p>
          <p> {place.rating} </p>
          <Button> Leave a Review </Button>
        </div>

        <div className = "menuInfo">

        </div>
      </div>

    );
  }

}

export default PlaceReview;
