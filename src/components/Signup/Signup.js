import './Signup.scss';
import React, { Component } from 'react';
import {Form, FormControl} from 'react-bootstrap';
import Header from '../Header/Header.js';
import { Button } from 'semantic-ui-react'
import * as firebase from 'firebase';

// misterred250@gmail.com

class Signup extends Component {
  constructor(props) {
      super(props);

      this.state = {
        dummy: 'hello world',
        email: '',
        password: '',
        confirmPassword: ''
      }


      this.signup = this.signup.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
      
  }



  // componentDidMount() {
  //   const rootRef = firebase.database().ref();
  //   const usersRef = rootRef.child('users');
  // //   usersRef.push ({
  // //     name: "John",
  // //     number: 1,
  // //     age: 30
  // //  });
  // usersRef.on('value', snap=> {
  //     this.setState({
  //       dummy: snap.val()
  //     });
  //   });
  // }

  signup() {
    console.log('let\'s do some firebase');
    var ref = firebase.database().ref('users');
    
    var email = this.state.email;
    var confirmPassword = this.state.confirmPassword;

    if (email !== '' && this.state.password !== '' && confirmPassword !== '' 
      && this.state.password === confirmPassword) {
      // ref.push({
      //   name: email,
      //   password: password
      // });
      ref.child(email).set ({
        password: this.state.password,
     });
      
    } else {
      console.log('invalid email/password');
    }

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
    //  console.log('dummy', this.state.dummy);
     return (
       <div className="signup">
        <Header />
        <div className="signup-field">
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
