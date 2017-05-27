// ui
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

const defineState = (klass, states, stateChangeCallback) => {
  if (!states.length) {throw new Error('need multiple states'); }
  else if(!klass.name) { throw new Error('constructor doesnt have a name'); }
  else if (!klass) {throw new Error('class undefined') }

  klass.STATES = {};
  states.forEach((stateName)=> {
    let capState =  stateName[0].toUpperCase() + stateName.slice(1);

    klass.STATES[stateName] = stateName;

    // Define isStateofcompletion();
    klass.prototype[`is${capState}`] = function () {
      return this.state === klass.STATES[stateName]
    };

    // define change state
    klass.prototype[stateName] = function (localCallback) {
      this.state = klass.STATES[stateName];
      stateChangeCallback && stateChangeCallback.call(this, stateName);
      localCallback && localCallback.call(this, stateName);
    }

    // initialize state to first of states
    klass.prototype.state = klass.prototype.state || klass.STATES[stateName];
  });
}

defineState(Coordinate, ['hidden', 'redHighlighted', 'blackHighlighted'])

export default Coordinate;