import tools from 'surgeonkit'
import React, {Component} from 'react';

import config from '../../config/chessConfig';
let {boardPadding, spacing} = config;

class Grid extends Component{

  constructor() { //9, 8, 50
    super()
    this.translatedBoardPadding = `translate(${boardPadding}, ${boardPadding})`;
    this.horizontalCount = 9;
    this.verticalCount = 10;

    this.horizontalGrids = tools.expand(this.horizontalCount);
    this.verticalGrids = tools.expand(this.verticalCount);

    this.paintLines();
  }

  paintLines () {
    this.verticalLines = this.horizontalGrids.map((x)=> {
      return {
        key: `x${x}`,
        x1: x * spacing,
        y1: 0,
        x2: x * spacing,
        y2: spacing * (this.verticalCount-1),
      }
    })

    this.horizontalLines = this.verticalGrids.map((y)=> {
      return {
        key: `y${y}`,
        x1: 0,
        y1: y * spacing,
        x2: spacing * (this.horizontalCount-1),
        y2: y * spacing
      }
    })

    this.campLines = [
      {x1: 3 * spacing, y1: 0, x2: 4 * spacing, y2: spacing},
      {x1: 5 * spacing, y1: 0, x2: 4 * spacing, y2: spacing},
      {x1: 3 * spacing, y1: 2 * spacing, x2: 4 * spacing, y2: spacing},
      {x1: 5 * spacing, y1: 2 * spacing, x2: 4 * spacing, y2: spacing},

      {x1: 3 * spacing, y1: 9 * spacing, x2: 4 * spacing, y2: 8 * spacing},
      {x1: 5 * spacing, y1: 9 * spacing, x2: 4 * spacing, y2: 8 * spacing},
      {x1: 3 * spacing, y1: 7 * spacing, x2: 4 * spacing, y2: 8 * spacing},
      {x1: 5 * spacing, y1: 7 * spacing, x2: 4 * spacing, y2: 8 * spacing}
    ]
  }

  render() {
    return [
      <g className="xGrid-group"
        key="xGrid"
        stroke="#dd4444"
        fill="white"
        strokeWidth="1"
        transform={this.translatedBoardPadding} >
        {
          this.verticalLines.map((verticalLineParams)=> {
            return <line {...verticalLineParams}/>
          })
        }
      </g>,

      <g className="yGrid-group"
        key="yGrid"
        stroke="#dd4444"
        fill="white"
        strokeWidth="1"
        transform={this.translatedBoardPadding} >
        {
          this.horizontalLines.map((horizontalLineParams)=> {
            return <line {...horizontalLineParams}/>
          })
        }
      </g>,

      this.renderCampLines()
    ];
  }

  renderCampLines() {
    return (
      <g className="camp"
        key="camp"
        stroke="#dd4444"
        fill="#eee"
        strokeWidth="1"
        transform={this.translatedBoardPadding} >
        {
          this.campLines.map(function (lineAttr, index) {
            return <line {...lineAttr} key={`campLine${index}`} strokeDasharray="2, 4"/>

          })
        }
      </g>
    );
  }

}

export default Grid;