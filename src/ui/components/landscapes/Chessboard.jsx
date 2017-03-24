import React from 'react';

import ChessPiece from './Chesspiece'
import River from './River'
import Frontlines from './Frontlines'
import Intersection from './Intersection'

import config from '../../config/chessConfig'

var {fieldHeight, fieldWidth, boardPadding} = config; 


class Chessboard extends React.Component {

  constructor({chessgame}) {
    super();
    window.chessboard = this;
    this.chessgame = chessgame;
    this.translatedBoardPadding = `translate(${boardPadding}, ${boardPadding})`
  }

  render() {
    return (
      <svg className="chessboard" height={fieldHeight} width={fieldWidth} tabIndex='10' onBlur={this.onBlur.bind(this)}
      >
        {this.chessgame.grid.render()}
        <River />
        <Frontlines />

        {this.renderChesspieces()}
        {this.renderIntersections()}
      </svg>
    );
  }

  renderChesspieces() {
    return (
      <g className="chesspieces" key="chesspieces" transform={this.translatedBoardPadding}
      >
        {this.chessgame.getAvatars.map((avatar, index)=> {
          return <ChessPiece transform={this.translatedBoardPadding}
            key={`avatar-${index}-${avatar.name}-横${avatar.location.cx}-竖${avatar.location.cy}`}
            {...avatar}
            avatar={avatar}
            selectChesspiece = {this.selectChesspiece.bind(this, avatar)}
          />
        })}
      </g>
    )
  }

  renderIntersections() {
    return (
      <g className="intersections" key="intersections" transform={this.translatedBoardPadding} 
      >
        {this.chessgame.coordinates.map((xSetVertical)=> {
          return xSetVertical.map((coord)=> {
            return <Intersection coord={coord} 
              selectIntersection={this.selectIntersection.bind(this, coord)}
            />;
          })
        })}
      </g>
    );
  }

  selectChesspiece (avatar) {
    this.chessgame.selectAvatar(avatar);
    this.forceUpdate();
  }

  selectIntersection (coord) {
    this.chessgame.selectMove(coord);
    this.forceUpdate();
  }

  onBlur() {
    this.chessgame.activePlayer.setSelectedAvatar = null;
    this.forceUpdate();
  }
}

Chessboard.defaultProps = {};

export default Chessboard;
