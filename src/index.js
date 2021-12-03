import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MoralisProvider } from "react-moralis";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import "./styleguide.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { serverUrl, appId } from './config/config';

ReactDOM.render(
  <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <React.StrictMode>
      <Router basename="/dev">
        <App />
      </Router>
    </React.StrictMode>
  </MoralisProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
