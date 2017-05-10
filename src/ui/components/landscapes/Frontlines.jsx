import React from 'react';

import config from '../../config/chessConfig';
let {boardPadding, spacing} = config;

let barracadeLength = 6;
let paths = [
  `M -${3*barracadeLength} -${barracadeLength} H -${barracadeLength} V -${3*barracadeLength}`,
  `M ${3*barracadeLength} ${barracadeLength} H ${barracadeLength} V ${3*barracadeLength}`,
  `M -${3*barracadeLength} ${barracadeLength} H -${barracadeLength} V ${3*barracadeLength}`,
  `M ${3*barracadeLength} -${barracadeLength} H ${barracadeLength} V -${3*barracadeLength}`
].join(' ');

class Crosshair extends React.Component {
  render () {
    return (
      <g transform={this.props.transform}>
        {/* using fillOpacity avoid causing corner colors in the crosshair*/}
        <path d={paths} className="cross" fillOpacity="0.1"/>
      </g>
    )
  }
}

export default class Frontlines extends React.Component{
  constructor() {
    super();
    this.boardPadding = boardPadding;
    this.width = spacing * 8;
    this.height = spacing;
  }

  render() {
    let boardTranslation = `translate(${this.boardPadding}, ${this.boardPadding})`;
    let crosses = [
      {x: 1, y: 2},
      {x: 7, y: 2},

      {x: 0, y: 3},
      {x: 2, y: 3},
      {x: 4, y: 3},
      {x: 6, y: 3},
      {x: 8, y: 3},

      {x: 1, y: 7},
      {x: 7, y: 7},

      {x: 0, y: 6},
      {x: 2, y: 6},
      {x: 4, y: 6},
      {x: 6, y: 6},
      {x: 8, y: 6},
    ]

    return (
      <g className="frontlines" key="frontlines" stroke="#dd4444" fill="#fff" strokeWidth="1"
        transform={boardTranslation}
      >
        {crosses.map((cross, index) => 
          <Crosshair key={`cross-${index}`} 
            transform={`translate(${cross.x * 50}, ${cross.y * 50})`} 
          />
        )}        
      </g>
    )
  }
}