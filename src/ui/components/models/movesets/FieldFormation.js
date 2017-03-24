import Moveset from './Moveset';
import matrix from '../coordinateMatrix';


export default class FieldFormation extends Moveset {
  constructor(avatar) {
    super(avatar)
  }

  get getPotentialOptions() {
    var upperRight = this._checkMove(matrix.coord(this.x+2 , this.y-2) , matrix.coord(this.x+1 , this.y-1))
    var upperLeft  = this._checkMove(matrix.coord(this.x-2 , this.y-2) , matrix.coord(this.x-1 , this.y-1))
    var bottomRight = this._checkMove(matrix.coord(this.x+2 , this.y+2) , matrix.coord(this.x+1 , this.y+1))
    var bottomLeft  = this._checkMove(matrix.coord(this.x-2 , this.y+2) , matrix.coord(this.x-1 , this.y+1))

    return [
      upperRight, upperLeft, bottomRight, bottomLeft
    ].filter(coord => {
      if (!coord) { return false; }
      // is behind frontier
      return this.avatar.belongsToTopFaction ? coord.yPoint <= 4 : coord.yPoint >= 5;
    })
  }

  get getMoveOptions() {
    this.x = this.avatar.coordinate.xPoint;
    this.y = this.avatar.coordinate.yPoint;

    // remove coords outside of matrix and those with an avatar in it
    return this.getPotentialOptions.filter((opt) => {
      return !opt.avatar;
    });
  }

  _checkMove (destination, obstacle) {
    if (destination && obstacle && !obstacle.avatar) {
      return destination;
    }
  }

  get getKillOptions() {
    this.x = this.avatar.coordinate.xPoint;
    this.y = this.avatar.coordinate.yPoint;

    let options = this.getPotentialOptions.filter((coord) => {
      return coord.avatar && coord.avatar.player !== this.avatar.player;
    })
    return options;
  }

}
