import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './components/main'
import './App.css';
import 'bootstrap-css-only'
import './components/styles/BootstrapSiteWrapper.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>XiangQi</h3>
        </div>
        <Main />
      </div>
    );
  }
}

export default App;
