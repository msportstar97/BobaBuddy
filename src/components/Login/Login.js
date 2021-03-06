import './Login.scss';
import React, { Component } from 'react';
import {Form, FormControl} from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import * as firebase from 'firebase';

class Login extends Component {
   constructor(props){
       super(props);
       
       this.state = {
           email: '',
           password: '',
           redirect: false,
           message: '',
       }
       
       this.login = this.login.bind(this);
       this.handlelogin = this.handlelogin.bind(this);
       this.handleError = this.handleError.bind(this);
       this.handleChangeEmail = this.handleChangeEmail.bind(this);
       this.handleChangePassword = this.handleChangePassword.bind(this);
   }
    
  login() {
    var email = this.state.email;
    var password = this.state.password;
    const auth = firebase.auth();

    if (email !== '' && password !== '') {
      // ref.push({
      //   name: email,
      //   password: password
      // });
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.handlelogin();
        } 
      })
      
      const promise = auth.signInWithEmailAndPassword(email, password);
      promise
          .catch(e=>this.handleError(e.message));
      
    } else {
      this.handleError('invalid email/password');
    }
  }

  handlelogin() {
    this.props.updatelogin(true);
    this.setState({
      redirect: true
    });
  }

  handleError(message) {
    this.setState({
      message: message
    })
  }
    
  handleChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
    
   render() {
     if (this.state.redirect) {
       return (
         <Redirect to='/Profile'/>
        //  <Link to={{
        //   pathname: "/Results/" + value,
        //   state: {
        //     place: value
        //   }}} >
        //   <Button className = "ui color2 button">Search</Button>
        // </Link>
       )
     }
     let errorMessage = <p></p>
     if (this.state.message) {
        errorMessage = <p className="errorMessage"> {this.state.message} </p>
     }
     return (
       <div className="login">
        <div className="login-field">
        {errorMessage}
         <Form>
          <Form.Group controlId="formGroupEmail">
           <FormControl type="email" onChange={this.handleChangeEmail} placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
           <FormControl type="password" onChange={this.handleChangePassword} placeholder="Password" />
          </Form.Group>
          </Form>
          <Button id="login-button" onClick={() => this.login()}> Log In </Button>
          <Link to="/Signup">
            <Button basic color="black" id="signup-button"> Don't have an account? Sign up! </Button>
          </Link>
          </div>
       </div>
     );
   }
}

export default Login;
