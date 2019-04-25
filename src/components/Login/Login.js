import './Login.scss';
import React, { Component } from 'react';
import {Form, FormControl} from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Login extends Component {
   render() {
     return (
       <div className="login">
        <div className="login-field">
         <Form>
          <Form.Group controlId="formGroupEmail">
           <FormControl type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
           <FormControl type="password" placeholder="Password" />
          </Form.Group>
          </Form>
          <Button id="login-button"> Log In </Button>
          <Link to="/Signup">
            <Button basic color="black" id="signup-button"> Don't have an account? Sign up! </Button>
          </Link>
          </div>
       </div>
     );
   }
}

export default Login;
