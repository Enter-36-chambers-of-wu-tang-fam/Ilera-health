//React
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

// Components
import App from './components/app.jsx';

// where our app will be rendered within index.html
let rootElement = document.getElementById('app');

ReactDOM.render(
  <App />
  , rootElement);