import React from 'react';
import './waves.css'
import config from '../../config/chessConfig';
let {boardPadding, spacing} = config;


export default class River extends React.Component{
  constructor() {
    super();

    this.boardPadding = boardPadding;
    this.riverPadding = spacing * 4;
    this.width = spacing * 8;
    this.height = spacing;
  }

  render() {
    let boardTranslation = `translate(${this.boardPadding}, ${this.boardPadding})`;
    let riverTranslation = `translate(0, ${this.riverPadding})`;

    const waveDim = { width: this.width + 'px', height: this.height+'px' }

    return (
      <g className="river" key="river" stroke="#dd4444" fill="#fff" strokeWidth="1"
        transform={boardTranslation}
      >
        <g className="riverContent" transform={riverTranslation}>
          {/*<rect className="waves1" {...waveDim} style={waveDim}></rect>
          <rect className="waves2" {...waveDim} style={waveDim}></rect>
          <rect className="waves3" {...waveDim} style={waveDim}></rect>*/}

          <rect width={this.width} height={this.height}/>
          <g className="kaiti" transform="rotate(270) translate(-40, 75)">
            <text> 楚 </text>
          </g>
          <g className="kaiti" transform="rotate(270) translate(-40, 150)">
            <text> 河 </text>
          </g>
          <g className="kaiti" transform="rotate(90) translate(10, -325)">
            <text> 漢 </text>
          </g>
          <g className="kaiti" transform="rotate(90) translate(10, -250)">
            <text> 界 </text>
          </g>
        </g>
      </g>
    )
  }
}