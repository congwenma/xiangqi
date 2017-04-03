import 'normalize.css';
import './styles/App.css';

import React from 'react';
import Chessboard from './landscapes/Chessboard';
import ChessGame from './models/ChessGame'
import Timer from './widgets/Timer';
import Toggler from './commons/Toggler'
// import TransformersApp from './experiments/TransformersApp';

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
  constructor() {
    super();
    this.chessgame = window.chessgame = new ChessGame(this);
  }

  render() {

    return (
      <div>
        <div className="inline">
          <Chessboard chessgame = {this.chessgame} />
        </div>
        <div className="inline menu">
          <Toggler className='inline'
            label="Graphic Avatars"
            model={this.chessgame.config}
            attr='svgAvatar'
            callback={this.forceUpdate.bind(this)}
          />

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Turn of:</h3>
            </div>
            <div className={`panel-body ${this.chessgame.activePlayer.faction === 'red' ? 'text-danger' : 'text-muted' }`}
              style={{ position: 'relative' }}
            >
              {this.chessgame.activePlayer.faction === 'red' ? 'Player' : 'Computer'}
              <div style={{
                height: 37,
                width: 25,
                position: 'absolute',
                top: 5,
                background: "url(images/thinker.gif) no-repeat fixed",
                backgroundSize: '10%',
                backgroundPosition: '780px 125px',
                opacity: this.chessgame.activePlayer.faction === 'black' ? 1 : 0
              }}/>
            </div>
          </div>

          <Timer stat={this.chessgame.stat}/>

          <div>
            <button className="btn btn-warning" onClick={this.chessgame.reset.bind(this.chessgame, this)}>Reset</button>
          <button className="btn" onClick={()=> {}}>Undo</button>
          </div>
        </div>
      </div>
    )
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
