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

    this.state = {
      menu: false
    };

    this.signout = this.signout.bind(this);
    this.dropdown = this.dropdown.bind(this);
    this.hide = this.hide.bind(this);
  }

  signout(){
    var user = firebase.auth().currentUser;
    if (user){
      firebase.auth().signOut();
      console.log("Signing out user");
    }
    this.props.updatelogin(false);
   }

  dropdown() {
    this.setState({
      menu: !this.state.menu
    }, () => {
      document.addEventListener('click', this.hide);
    });
  }

  hide(e) {
    this.setState({
      menu: false
    }, () => {
      document.removeEventListener('click', this.hide);
    });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    let button;
    let hello;
    if (loggedIn) {
      button = <div className="buttons">
                <Icon id="menu" link name='bars' size='big' 
                onClick={() => this.dropdown()}/>
                {
                  this.state.menu && 
                  (
                    <ul className="dropdown-menu options">
                    <Link to="/Profile">
                      <li> Profile </li>
                    </Link>
                    <Link to="/">
                      <li onClick={() => this.signout()}> Sign Out </li>
                    </Link>
                    </ul>
                  )
                }
               </div>
      hello = <div className="username">
              {firebase.auth().currentUser.email}!
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
          <span className="title"> Boba Buddy </span>
        </Link>
        <div className="userProfile">
          {hello}
          {button}
        </div>
      </div>
     );
   }
}

export default Header;
