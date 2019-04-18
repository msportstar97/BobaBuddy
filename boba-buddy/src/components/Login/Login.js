import './Login.scss';
import React, { Component } from 'react';
import {Form, FormControl} from 'react-bootstrap';
import Header from '../Header/Header.js';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Login extends Component {
   render() {
     return (
       <div className="login">
        <Header />
        <div className = "login-field">
         <Form>
          <Form.Group controlId="formGroupEmail">
           <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
           <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          </Form>
          <Button id = "login-button"> Log In </Button>
          </div>
       </div>
     );
   }
}

export default Login;
