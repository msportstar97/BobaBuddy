import './Login.scss';
import React, { Component } from 'react';
import {Button, Form, FormControl} from 'react-bootstrap';
import Header from '../Header/Header.js';
import { Link } from 'react-router-dom'


class Login extends Component {
   render() {
     return (
       <div className="login">
        <Header />

         <Form>
          <Form.Group controlId="formGroupEmail">
           <Form.Label>Email address</Form.Label>
           <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          </Form>;
       </div>
     );
   }
}

export default Login;
