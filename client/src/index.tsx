import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import {rootReducer} from './store/reducers/rootReducer'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "https://bartek-e-commerce.herokuapp.com" : "http://localhost:4000";

const store = createStore(rootReducer, applyMiddleware(thunk,logger));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
