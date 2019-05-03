import './Signup.scss';
import React, { Component } from 'react';
import {Form, FormControl} from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase';

// misterred250@gmail.com

class Signup extends Component {
  constructor(props) {
      super(props);

      this.state = {
        dummy: 'hello world',
        email: '',
        password: '',
        confirmPassword: '',
        redirect: false,
        message: ''
      }


      this.signup = this.signup.bind(this);
      this.handlelogin = this.handlelogin.bind(this);
      this.handleError = this.handleError.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
      
  }

  signup() {
    console.log('let\'s do some firebase');
    
    var email = this.state.email;
    var password = this.state.password;
    var confirmPassword = this.state.confirmPassword;
      
    const auth = firebase.auth();
    const ref = firebase.database().ref('users');
    

    if (email !== '' && password !== '' && confirmPassword !== '' 
      && password === confirmPassword) {
      // ref.push({
      //   name: email,
      //   password: password
      // });
      
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise
            .catch(e=>this.handleError(e.message));
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User logged in already or has just logged in.
                console.log("created user uid in database", user.uid);
                ref.child(user.uid).set({
                    email: email,
                    reviews: ["init"] 
                });
                this.handlelogin();
            } 
        });
      
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

  handleChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

   render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/Profile'/>
      )
    }
    let errorMessage = <p></p>
    if (this.state.message) {
       errorMessage = <p className="errorMessage"> {this.state.message} </p>
    }
    return (
       <div className="signup">
        <div className="signup-field">
         {errorMessage}
         <Form className="signup-input">
          <Form.Group controlId="formGroupEmail">
           <FormControl type="email" className="email" onChange={this.handleChangeEmail} placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
           <FormControl type="password" className="password" onChange={this.handleChangePassword} placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
           <FormControl type="password" className="confirmPassword" onChange={this.handleChangeConfirmPassword} placeholder="Confirm Password" />
          </Form.Group>
          </Form>
          <Button id="signup-button" onClick={() => this.signup()}> Sign Up! </Button>
          </div>
       </div>
     );
   }
}

export default Signup;
