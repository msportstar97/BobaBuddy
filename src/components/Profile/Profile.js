import './Profile.scss';
import React, { Component } from 'react';
import {Form, FormControl} from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';
import StarRatings from 'react-star-ratings';

class Profile extends Component {
  _isMounted = false;
  constructor(props){
    super(props);

    this.state = {
        oldPassword: '',
        newPassword: '',
        message: '',
        edit: false,
        userReviews: []
    }

    this.editPassword = this.editPassword.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this);
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    let dbuser = {};
    let reviews;
    var realThis = this;
    let user = firebase.auth().currentUser.uid;
    let email = firebase.auth().currentUser.email;
    var uref = firebase.database().ref().child('users');
    uref.orderByChild('email').equalTo(email).on('value', function(snapshot){
        if (snapshot.exists()){
            dbuser = snapshot.child(user).val();
        }

        realThis.setState({
            userReviews: dbuser.reviews
        })

        //console.log(dbuser);

    });
  }

  editPassword() {

    this.setState({
      edit: true,
      message: ''
    })
  }

  handleChangeOldPassword(e) {
    this.setState({
      oldPassword: e.target.value
    });
  }

  handleChangeNewPassword(e) {
    this.setState({
      newPassword: e.target.value
    })
  }

  changePassword() {

    var user = firebase.auth().currentUser;

    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.oldPassword
    )

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
      user.updatePassword(this.state.newPassword)
      .then(this.handleChange(), (err)=>this.handleError(err))
      .catch(e=>this.handleError(e.message));
    }, (err)=>this.handleError(err)).catch(e=>this.handleError(e.message));
  }

  handleError(message) {
    this.setState({
      message: message.message,
      edit: true
    })
  }

  handleChange() {
    this.setState({
      message: 'Password Change Successful',
      edit: false
    })
  }

  render() {
    let button;
    let errorMessage = <p></p>
    let realThis = this;
    if (this.state.message) {
      errorMessage = <p className="errorMessage"> {this.state.message} </p>
    }

    if (this.state.edit) {
      button = <div>
                <Form>
                <Form.Group controlId="formGroupPassword">
                  <FormControl type="password" onChange={this.handleChangeOldPassword} placeholder="Current Password" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <FormControl type="password" onChange={this.handleChangeNewPassword} placeholder="New Password" />
                </Form.Group>
                </Form>
                <Button id="change-button" onClick={() => this.changePassword()}> Change Password </Button>
               </div>
    } else {
      button = <Button basic color="black" id="edit-password" onClick={() => this.editPassword()}> Edit Password </Button>
    }

    return (
      <div className="profileComponent">
        <h2 className="profileTitle"> Your Profile </h2>
        <div className="yourProfile">
          <p>Email: {firebase.auth().currentUser.email}</p>
          {errorMessage}
          {button}
        </div>
        <h2 className="profileTitle"> Your Reviews </h2>
        <div className = "yourReviews">
        {Object.keys(realThis.state.userReviews).map((review, idx) =>
          // <p key={idx}>{realThis.state.userReviews[idx]}</p>
          <div className = "reviewSection" key={idx}>
           {realThis.state.userReviews[review].}
           </div>
        )}
        </div>
      </div>
    );
  }
}

export default Profile;
