import config from '../../config/chessConfig'
import tools from 'surgeonkit'

var {spacing} = config;

class Coordinate {
  constructor (xPoint, yPoint) {
    this.xPoint = xPoint;
    this.yPoint = yPoint;
    this.avatar = null;
  }

  get location() {
    return {
      cx: spacing * this.xPoint,
      cy: spacing * this.yPoint
    }
  }

  get xy() {
    return {x: this.xPoint, y: this.yPoint }
  }

  get x() {
    return this.xPoint;
  }

  get y() {
    return this.yPoint;
  }

  set setAvatar(avatar) {
    this.avatar = avatar || null;
  }

  get show() {
    return `Coord x: ${this.xPoint}, y: ${this.yPoint}`;
  }

  isHighlighted () {
    return !this.isHidden();
  }

}

tools.defineState(Coordinate, ['hidden', 'redHighlighted', 'blackHighlighted'])

export default Coordinate;