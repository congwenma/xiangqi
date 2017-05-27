import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';

import 'normalize.css'
import 'flexboxgrid'
import 'basscss/css/basscss.css'

// material
import theme from './theme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

// temporary
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();// Needed for onTouchTap

ReactDOM.render(
  <MuiThemeProvider muiTheme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
