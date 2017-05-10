import './App.css';
import 'bootstrap-css-only'
import './components/styles/BootstrapSiteWrapper.css'

import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './components/main'
import AppDrawer from './components/widgets/AppDrawer'

import ChessGame from './components/models/ChessGame'

class App extends Component {
  constructor(props) {
    super(props)
    const chessgame = window.chessgame = new ChessGame(this);
    this.state = { isOpen: true, chessgame }
  }

  handleToggleDrawer = () => {
    this.setState({isOpen: !this.state.isOpen});
  }
  handleAppUpdate = () => this.forceUpdate()

  render() {
    const { isOpen, chessgame } = this.state
    return (
      <div className="App">
        <AppDrawer
          className="align-left"
          onTouchTap={this.handleToggleDrawer}
          isOpen={isOpen}
          isToggleable={false}
          chessgame={chessgame}
          onAppUpdate={this.handleAppUpdate}
        />
        <Main className={`Main ${isOpen ? "is-open" : ""}`} 
          chessgame={chessgame}
        />
      </div>
    )
  }
}

export default App;
