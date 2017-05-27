import './styles/main.css';

import React from 'react';
import Chessboard from './landscapes/Chessboard';
// import TransformersApp from './experiments/TransformersApp';

import AnalyzeLoader from './widgets/AnalyzeLoader'

const Thinker = player =>
  <div style={{
    height: 37,
    width: 25,
    position: 'absolute',
    top: 5,
    background: "url(images/thinker.gif) no-repeat fixed",
    backgroundSize: '10%',
    backgroundPosition: '780px 125px',
    opacity: player.faction === 'black' ? 1 : 0
  }}/>

class AppComponent extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="pt3">
          <Chessboard chessgame = {this.props.chessgame} />
        </div>
      </div>
    )
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
