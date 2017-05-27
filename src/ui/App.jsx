import './App.css';
import './components/styles/BootstrapSiteWrapper.css'

import React, { Component } from 'react';
import Main from './components/main'
import AppDrawer from './components/widgets/AppDrawer'

import ChessGame from './components/models/ChessGame'
import DialogModal from './components/widgets/DialogModal'

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
        <DialogModal />
      </div>
    )
  }
}

export default App;
