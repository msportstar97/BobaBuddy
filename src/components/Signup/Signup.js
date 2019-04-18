import './Signup.scss';
import React, { Component } from 'react';
import {Form, FormControl} from 'react-bootstrap';
import Header from '../Header/Header.js';
import { Button } from 'semantic-ui-react'


class Signup extends Component {
   render() {
     return (
       <div className="signup">
        <Header />
        <div className="signup-field">
         <Form className="signup-input">
          <Form.Group controlId="formGroupEmail">
           <FormControl type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
           <FormControl type="password" className="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
           <FormControl type="password" className="confirmPassword" placeholder="Confirm Password" />
          </Form.Group>
          </Form>
          <Button id="signup-button"> Sign Up! </Button>
          </div>
       </div>
     );
   }
}

export default Signup;