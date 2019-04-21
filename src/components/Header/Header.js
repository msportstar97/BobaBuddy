import './Header.scss';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Header extends Component {
   render() {
     return (
       <div className="Header">
        <Link to="/" className="title-box">
          <div className="title"> Boba Buddy </div>
        </Link>
        <div className="buttons">
          <Link to="/Login">
            <Button id="login-button" basic color='black'> Log In </Button>
          </Link>
          <Link to="/Signup">
            <Button id="signup-button" basic color='black'> Sign Up </Button>
          </Link>
        </div>
       </div>
     );
   }
}

export default Header;
