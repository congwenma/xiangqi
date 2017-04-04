import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './components/main'
import './App.css';
import 'bootstrap-css-only'
import './components/styles/BootstrapSiteWrapper.css'

const Title = () =>
  <div className="App-header">
    <h1 className="kaiti inline"
      style={{
        border: '1px outset white',
        padding: 5,
        margin: '0 10px 0',
        boxShadow: 'white 2px 1px 1px'
      }}
    >象</h1>
    <h3 className="inline">XiangQi with AI</h3>
  </div>

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <Main />
      </div>
    )
  }
}

export default App;
