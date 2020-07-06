import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import {getToken} from './utils/tokenHandler'

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "https://bartek-e-commerce.herokuapp.com" : "http://localhost:4000";
axios.defaults.headers = { Authorization: "Bearer " + getToken() };


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
