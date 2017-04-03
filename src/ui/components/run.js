// TODO: to be removed.
// import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './main';
import '../styles/BootstrapSiteWrapper.css';

require('bootstrap-css-only');

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
