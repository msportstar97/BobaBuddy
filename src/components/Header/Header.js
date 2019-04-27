import './Header.scss';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';

class Header extends Component {
   signout(){
       var user = firebase.auth().currentUser;
       if (user){
         firebase.auth().signOut();
         console.log("Signing out user");
       }
   }
    
   render() {
     return (
       <div className="Header">
        <Link to="/" className="title-box">
          <div className="title"> Boba Buddy </div>
        </Link>
        <div className="username">
        </div>
        <div className="buttons">
          <Link to="/Login">
            <Button id="login-button" basic color='black'> Log In </Button>
          </Link>
          <Link to="/Signup">
            <Button id="signup-button" basic color='black'> Sign Up </Button>
          </Link>
          <Link to="/Home">
            <Button id="signout-button" basic color='black' onClick={() => this.signout()}> Sign Out </Button>
          </Link>
        </div>
       </div>
     );
   }
}

export default Header;
