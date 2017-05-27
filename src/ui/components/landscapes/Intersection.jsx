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

    const { cy, cx } = this.coord.location
    const { footprintColor } = this.coord
        
    return (
      <g className={className} key={className} onClick={this.props.selectIntersection}>
        <circle r="14"
          cy={cy}
          cx={cx}
          stroke={1}
        />
        { footprintColor && 
          <g className="footprint">
            <polygon points={`${cx+10},${cy+15} ${cx+15},${cy+10} ${cx+15},${cy+15}`} 
            style={{ fill: footprintColor, stroke: footprintColor, fillOpacity: 1 }} 
            />
            <polygon points={`${cx-10},${cy+15} ${cx-15},${cy+10} ${cx-15},${cy+15}`} 
              style={{ fill: footprintColor, stroke: footprintColor, fillOpacity: 1 }} 
            />
            <polygon points={`${cx+10},${cy-15} ${cx+15},${cy-10} ${cx+15},${cy-15}`} 
              style={{ fill: footprintColor, stroke: footprintColor, fillOpacity: 1 }} 
            />
            <polygon points={`${cx-10},${cy-15} ${cx-15},${cy-10} ${cx-15},${cy-15}`} 
              style={{ fill: footprintColor, stroke: footprintColor, fillOpacity: 1 }} 
            />
          </g>
        }
      </g>
    );
  }
}
