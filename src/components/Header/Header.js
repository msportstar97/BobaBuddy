import './Header.scss';
import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';

class Header extends Component {
  constructor() {
    super();

    var user = firebase.auth().currentUser;

    if (user){
      this.props.updatelogin(true)
    }

    this.signout = this.signout.bind(this);
  }

  signout(){
    var user = firebase.auth().currentUser;
    if (user){
      firebase.auth().signOut();
      console.log("Signing out user");
    }
    this.props.updatelogin(false);
   }

  render() {
    const loggedIn = this.props.loggedIn;
    let button;
    let hello;
    if (loggedIn) {
      button = <div className="buttons">
                <Link to="/">
                  <Icon id="signout-button" link name='sign out' size='big' onClick={() => this.signout()}/>
                </Link>
               </div>
      hello = <div className="username">
              Hello, {firebase.auth().currentUser.email}!
              </div>
    } else {
      button = <div className="buttons">
                <Link to="/Login">
                  <Button id="login-button" basic color='black'> Log In </Button>
                </Link>
                <Link to="/Signup">
                    <Button id="signup-button" basic color='black'> Sign Up </Button>
                </Link>
               </div>
    }
    return (
      <div className="Header">
        <Link to="/" className="title-box">
          <img src={require('./logo.png')} className="logo"></img>
          <div className="title"> Boba Buddy </div>
        </Link>
        {hello}
        {button}
      </div>
     );
   }
}

export default Header;
