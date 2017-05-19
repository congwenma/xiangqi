import React from 'react';
import tools from 'surgeonkit'
import '../styles/Intersection.css';

export default class Intersection extends React.Component{
  constructor({coord}) {
    super();
    this.coord = coord;
    this.coord.view = this;
  }

  render() {
    let className = tools.cx({
      'intersection': true,
      [`intersection-${this.coord.location.cx}-${this.coord.location.cy}`]: true,
      'occupied': !!this.coord.avatar,
      [`highlighted ${this.coord.state}`]: this.coord.isHighlighted(),
    });

    return (
      <g className={className} key={className} onClick={this.props.selectIntersection}>
        <circle r="14"
          cy={this.coord.location.cy}
          cx={this.coord.location.cx}
          stroke={1}
        />
      </g>
    );
  }
}
