import React from 'react';
import tools from 'surgeonkit'

import '../styles/ChessPiece.css';

class ChessPiece extends React.Component {

  constructor() {
    super();
  }

  render() {
    var classNames = tools.cx({
      'chess-piece': true,
      [this.props.faction]: true,
      selected: this.props.player.selectedAvatar === this.props.avatar,
      haloed: this.props.avatar.isHaloed()
    })

    return !this.props.avatar.isDeceased() && (
      <g className={classNames}
        onClick={this.props.selectChesspiece}
      >

        <circle className="piece-outline"
          cy={this.props.avatar.location.cy}
          cx={this.props.avatar.location.cx}
          r="20"
        />

        <circle className="piece-inline"
          cy={this.props.avatar.location.cy}
          cx={this.props.avatar.location.cx}
          r="15"
        />

        <circle className="piece-block"
          cy={this.props.avatar.location.cy}
          cx={this.props.avatar.location.cx}
          r="15"
        />

        {!window.chessgame.config.svgAvatar &&
          <text x={this.props.avatar.location.cx-10} y={this.props.avatar.location.cy+7}>
            {this.props.avatar.getName}
          </text>
        }

        {window.chessgame.config.svgAvatar &&
          <image
            x={this.props.avatar.location.cx-15}
            y={this.props.avatar.location.cy-15}
            width="30"
            height="30"
            xlinkHref={this.props.avatar.getPictograph} >
          </image>
        }


        <circle className="piece-halo"
          r='22'
          cy={this.props.avatar.location.cy}
          cx={this.props.avatar.location.cx}
          fill={this.props.avatar.player.opponent.faction}
        />
      </g>
    );
  }
}

export default ChessPiece
