import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import * as firebase from 'firebase';
import 'typeface-gugi';

var config = {
    apiKey: "AIzaSyBeSlCn1ILfNQBg975d47IqsmavBAJRaKc",
    authDomain: "webdev-final-project-mk-i.firebaseapp.com",
    databaseURL: "https://webdev-final-project-mk-i.firebaseio.com",
    projectId: "webdev-final-project-mk-i",
    storageBucket: "webdev-final-project-mk-i.appspot.com",
    messagingSenderId: "257965645347"
  };

//require('typeface-gugi');
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
