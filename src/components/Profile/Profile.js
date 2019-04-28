import './Profile.scss';
import React, { Component } from 'react';
import {Form, FormControl} from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';

class Profile extends Component {

  render() {
    return (
      <div className="profileComponent">
        <h2 className="profileTitle"> Your Profile </h2>
        <div className="yourProfile">
          <p>Email: {firebase.auth().currentUser.email}</p>
          <Button basic color="black" id="edit-password"> Edit Password </Button>
        </div>
        <h2 className="profileTitle"> Your Reviews </h2>
        <div className="yourReviews">
        
        </div>
      </div>
    );
  }
}

export default Profile;