import './Header.scss';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class Header extends Component {
   render() {
     return (
       <div className="Header">
        <div className = "title"> Boba Buddy </div>
        <div className = "buttons">
          <Button id = "login-button" variant="outline-dark"> Log In </Button>
          <Button id = "signup-button" variant="outline-dark"> Sign Up </Button>
        </div>
       </div>
     );
   }
}

export default Header;
